import fs from "fs";
import path from "path";
import {
  extractHeadings,
  estimateReadingTime,
  processContent,
  formatMarkdownToSections,
} from "@/lib/markdown";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import HeroSection from "@/components/HeroSection";
import TableOfContents from "@/components/TableOfContents";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ReferencesSection from "@/components/ReferencesSection";
import Footer from "@/components/Footer";
import ReadingSettingsPanel from "@/components/ReadingSettingsPanel";
import ExportButtons from "@/components/ExportButtons";
import InteractiveExamen from "@/components/InteractiveExamen";

interface Reference {
  id: number;
  text: string;
  url: string;
}

function parseReferences(markdown: string): {
  articleContent: string;
  references: Reference[];
} {
  // Split at the references section
  const refMarker = "Nguồn trích dẫn";
  const refIndex = markdown.indexOf(refMarker);

  if (refIndex === -1) {
    return { articleContent: markdown, references: [] };
  }

  const articleContent = markdown.substring(0, refIndex).trim();
  const referencesRaw = markdown.substring(refIndex + refMarker.length).trim();

  // Parse references: each reference is a pair of lines (title, url)
  const lines = referencesRaw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const references: Reference[] = [];
  let refId = 1;

  for (let i = 0; i < lines.length; i += 2) {
    const text = lines[i] || "";
    const url = lines[i + 1] || "";
    if (text) {
      references.push({
        id: refId++,
        text: text.replace(/^[\d]+\.\s*/, ""), // Remove leading numbers if any
        url: url.startsWith("http") ? url : "",
      });
    }
  }

  return { articleContent, references };
}

function addMarkdownHeadings(content: string): string {
  // The original markdown file has no ## markers.
  // We need to identify section headings and add ## markers.
  // Section headings in this document are lines that are:
  // - All-caps-like (Vietnamese title case) 
  // - Short lines (< 120 chars) that appear between paragraphs
  // - Not starting with common paragraph starters

  const lines = content.split("\n");
  const processed: string[] = [];

  // Known section heading patterns from the document
  const h2Headings = [
    "Giới Thiệu Tổng Quan Về Linh Đạo I-nhã Và Phương Pháp Xét Mình",
    "Bối Cảnh Lịch Sử, Kinh Nghiệm Hoán Cải Và Nguồn Gốc Của Linh Thao",
    "Nền Tảng Thần Học Và Triết Lý Của Sự Phản Tỉnh (Reflectivity)",
    "Phẫu Thuật Nội Tâm: Xét Mình Riêng (Particular Examen)",
    "Lăng Kính Toàn Cảnh: Xét Mình Chung (General Examen)",
    "Phân Biệt Tế Nhị: Xét Ngắm (Review of Prayer) Và Động Lực Học Phân Định",
    "Phút Hồi Tâm (Awareness Examen) Trong Đời Sống Hiện Đại",
    "Đổi Mới Và Mở Rộng: Reimagining the Ignatian Examen",
    "Phân Tích Chuyên Sâu Và Tầm Nhìn Bao Quát",
    "Điểm Giao Thoa: Việc Xưng Tội Chung (General Confession)",
  ];

  const h3Headings = [
    "Nguyên Tắc \"Chia Để Trị\" Khắc Phục Sự Nản Lòng",
    "Cơ Chế Thực Hành: Ba Thì Và Hai Lần Xét Mình",
    "Biểu Đồ Đo Lường (g=) Và Cử Chỉ Thể Lý",
    "Sự Thẩm Định Sâu Sắc Về Tội Lỗi (Tư Tưởng, Lời Nói, Việc Làm)",
    "Trình Tự Năm Bước Của Xét Mình Chung",
    "Bảng 1: Phân Tích So Sánh Giữa Xét Mình Riêng Và Xét Mình Chung",
    "Bảng 2: So Sánh Phút Hồi Tâm I-nhã Và Việc Xét Mình Truyền Thống",
  ];

  for (const line of lines) {
    const trimmed = line.trim();

    if (h2Headings.some((h) => trimmed === h)) {
      processed.push(`## ${trimmed}`);
    } else if (h3Headings.some((h) => trimmed === h)) {
      processed.push(`### ${trimmed}`);
    } else {
      processed.push(line);
    }
  }

  return processed.join("\n");
}

function processTableBlocks(content: string): string {
  // The original markdown has table-like content without markdown table syntax.
  // We need to identify the two comparison tables and convert them.

  // Table 1: Between "Bảng 1:" heading and the paragraph starting with "Hai phương pháp"
  let processed = content;

  // Table 1 data
  const table1Start = processed.indexOf(
    "### Bảng 1: Phân Tích So Sánh Giữa Xét Mình Riêng Và Xét Mình Chung"
  );
  if (table1Start !== -1) {
    const afterTable1Heading = processed.indexOf("\n", table1Start) + 1;
    const table1End = processed.indexOf("Hai phương pháp này hoàn toàn");

    if (table1End !== -1) {
      const table1Md = `
| Đặc Điểm Phân Tích | Xét Mình Riêng (Particular Examen) | Xét Mình Chung (General Examen) |
|---|---|---|
| **Mục tiêu cốt lõi** | Nhổ rễ một tội, một khuyết điểm cụ thể, hoặc trau dồi một nhân đức đơn lẻ | Thanh tẩy toàn diện tâm hồn, rà soát tổng quan ngày sống, chuẩn bị để xưng tội |
| **Phạm vi duyệt xét** | Một yếu điểm hoặc mục tiêu duy nhất (ví dụ: tính nóng giận, sự cẩu thả trong giờ thinh lặng) | Toàn bộ tư tưởng, lời nói, và việc làm, dựa trên Mười Điều Răn và lề luật |
| **Cấu trúc phương pháp** | 3 thì (sáng, trưa, tối), tập trung vào việc đếm và ghi chép số lần sa ngã | 5 bước cầu nguyện (Tạ ơn, Xin ơn, Duyệt xét, Xin tha thứ, Dốc lòng chừa) |
| **Công cụ và kỹ thuật** | Sử dụng biểu đồ đo lường (g=) để so sánh; thực hiện cử chỉ đặt tay lên ngực | Không dùng biểu đồ; dựa vào trí nhớ dưới sự soi sáng của ân sủng; kết thúc bằng Kinh Lạy Cha |
| **Vị trí trong sách Linh Thao** | Các số 24-31 (Tuần Thứ Nhất) | Các số 32-43 (Tuần Thứ Nhất) |

`;
      processed =
        processed.substring(0, afterTable1Heading) +
        table1Md +
        processed.substring(table1End);
    }
  }

  // Table 2 data
  const table2Start = processed.indexOf(
    "### Bảng 2: So Sánh Phút Hồi Tâm I-nhã Và Việc Xét Mình Truyền Thống"
  );
  if (table2Start !== -1) {
    const afterTable2Heading = processed.indexOf("\n", table2Start) + 1;
    const table2End = processed.indexOf(
      "Bảng phân tích trên cho thấy"
    );

    if (table2End !== -1) {
      const table2Md = `
| Yếu Tố Khác Biệt | Phút Hồi Tâm I-nhã (Awareness Examen) | Xét Mình Truyền Thống (Traditional Examination of Conscience) |
|---|---|---|
| **Trọng tâm nội tâm** | Tập trung vào sự hiện diện của Thiên Chúa, hồng ân, và các chuyển động thiêng liêng (an ủi/sầu khổ) | Tập trung vào hành vi luân lý cá nhân, rà soát các vi phạm lề luật, định vị tội lỗi |
| **Cảm thức chủ đạo** | Lòng biết ơn (Gratitude), sự bình an và nhận định ý Chúa | Lòng ăn năn, thống hối (Contrition), buồn bã vì tội lỗi |
| **Mục tiêu thực hành** | Tìm Chúa trong mọi sự, phát triển tương quan tình yêu thân mật với Đấng Tạo Hóa | Chuẩn bị một danh sách tội lỗi rõ ràng để lãnh nhận Bí tích Hòa Giải (xưng tội) |
| **Chiều kích thời gian** | Ôm trọn cả quá khứ, hiện tại và hướng về dự phóng tương lai với niềm hy vọng vững vàng | Hầu như chỉ giới hạn ở việc đánh giá các hành vi đã xảy ra trong quá khứ |

`;
      processed =
        processed.substring(0, afterTable2Heading) +
        table2Md +
        processed.substring(table2End);
    }
  }

  return processed;
}

export default function HomePage() {
  // Read the markdown file
  const markdownPath = path.join(process.cwd(), "XMTLDIN.md");
  const rawMarkdown = fs.readFileSync(markdownPath, "utf-8");

  // Extract title (first line)
  const title = rawMarkdown.split("\n")[0].trim();

  // Parse references from the end of the document
  const { articleContent, references } = parseReferences(rawMarkdown);

  // Process the article content: add heading markers and format tables
  let processedContent = formatMarkdownToSections(articleContent);
  processedContent = addMarkdownHeadings(processedContent);
  processedContent = processTableBlocks(processedContent);
  processedContent = processContent(processedContent);

  // Extract headings for TOC
  const headings = extractHeadings(processedContent);

  // Estimate reading time
  const readingTime = estimateReadingTime(articleContent);

  return (
    <>
      <ReadingProgressBar />
      <ReadingSettingsPanel />

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection title={title} readingTime={readingTime} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Mobile TOC */}
          <div className="lg:hidden">
            <TableOfContents items={headings} />
          </div>

          {/* Desktop layout: Center both article and TOC together */}
          <div className="flex flex-col lg:flex-row justify-center gap-8 xl:gap-16 relative">
            {/* Desktop TOC Sidebar (Left) */}
            <div className="hidden lg:block w-[320px] shrink-0">
              <TableOfContents items={headings} />
            </div>

            {/* Article Content (Right) */}
            <article className="flex-1 min-w-0">
              <div className="flex justify-end mb-8">
                <ExportButtons />
              </div>
              <MarkdownRenderer content={processedContent} references={references} />
              <InteractiveExamen />
              <ReferencesSection references={references} />
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
