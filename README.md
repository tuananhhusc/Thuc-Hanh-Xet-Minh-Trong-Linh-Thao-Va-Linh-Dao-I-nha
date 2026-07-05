# 📖 Thực Hành Xét Mình Trong Linh Thao Và Linh Đạo I-nhã

Một ứng dụng web đọc tài liệu học thuật (Long-form Reading Application) được xây dựng bằng **Next.js** và **Tailwind CSS**. Ứng dụng này biến một bài báo cáo nghiên cứu dạng Markdown tĩnh thành một trải nghiệm sách điện tử (e-book) tương tác toàn diện, với thiết kế giao diện mang đậm tính học thuật, trang nghiêm và tối ưu cho cả trải nghiệm máy tính lẫn thiết bị di động.

![Giao diện chính](public/favicon.ico) *(Thay thế bằng hình ảnh thực tế của ứng dụng nếu cần)*

## ✨ Các Tính Năng Nổi Bật (Key Features)

Dự án không chỉ hiển thị nội dung tĩnh mà còn tích hợp hàng loạt các tiện ích nhằm cá nhân hóa và làm phong phú trải nghiệm đọc:

*   **Tùy Chỉnh Giao Diện (Reading Settings Panel):**
    *   Hỗ trợ 3 chế độ màu (Theme): **Parchment (Giấy da)** mang phong cách hoài cổ, **White (Sáng)** hiện đại, và **Dark (Tối)** bảo vệ mắt.
    *   Tùy biến Cỡ chữ (Base, Large, Extra Large).
    *   Tùy biến Phông chữ (Serif chuẩn học thuật hoặc Sans-serif dễ đọc).
    *   *Tự động lưu cấu hình của người dùng qua `localStorage`.*
*   **Chú Thích Tương Tác (Citation Tooltips):**
    *   Hệ thống Parsing tự động nhận diện các con số chú thích sát chữ cái Tiếng Việt (bằng Regex Unicode `\p{L}`).
    *   Hiển thị nội dung nguồn trích dẫn ngay tại chỗ dưới dạng Popup nổi (sử dụng React Portal) khi rê chuột, không cần phải cuộn xuống cuối trang.
*   **Chia Sẻ Trích Dẫn (Highlight to Share):**
    *   Người đọc bôi đen (highlight) bất kỳ đoạn văn nào sẽ tự động xuất hiện thanh công cụ nhỏ cho phép **Sao chép** (Copy) hoặc **Chia sẻ ngay lên Facebook**.
*   **Mục Lục Động & Tối Ưu Mobile (Auto-scroll TOC):**
    *   **Desktop:** Thanh mục lục bên trái tự động cuộn (auto-scroll) và tô sáng (highlight) dựa trên vị trí người dùng đang đọc (Intersection Observer).
    *   **Mobile:** Nút Floating cố định ở góc dưới bên trái, trượt ra (slide-over) một ngăn kéo (drawer) Mục lục tinh tế không chiếm diện tích màn hình.
*   **Trình Hướng Dẫn Tĩnh Nguyện (Interactive Examen):**
    *   Một ứng dụng nhỏ (mini-app) được tích hợp ngay cuối bài viết để hướng dẫn người dùng thực hành 5 bước "Phút Hồi Tâm".
    *   Đi kèm với đồng hồ đếm ngược, thanh tiến trình và âm thanh nền (sóng vỗ) để tạo không gian thinh lặng.
*   **Tối Ưu Xuất PDF / In Ấn (Print-Optimized):**
    *   Nút "Lưu PDF / In" loại bỏ hoàn toàn các thành phần UI (sidebar, nút cài đặt, thanh tiến trình) và chỉ định dạng lại văn bản để có bản in sạch sẽ nhất.
*   **Chuẩn SEO Tối Đa:** Khai báo đầy đủ Open Graph Metadata, Twitter Card, và Semantic HTML.

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

*   **Framework:** [Next.js](https://nextjs.org/) (phiên bản 16 - App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Ngôn ngữ:** TypeScript
*   **Quản lý State:** React Context API & Local Storage
*   **Markdown Parsing:** Custom Regex và thuật toán DOM manipulation (không phụ thuộc thư viện nặng như `react-markdown`).
*   **Font chữ:** Google Fonts (`Playfair Display`, `Lora`, `Inter`) tích hợp qua `next/font`.

## 📂 Cấu Trúc Thư Mục (Folder Structure)

```text
app/
├── app/
│   ├── context/
│   │   └── ReadingContext.tsx       # State toàn cục quản lý Theme & Cỡ chữ
│   ├── globals.css                  # CSS Variables động & quy tắc Print
│   ├── layout.tsx                   # Layout gốc chứa Metadata SEO và Provider
│   └── page.tsx                     # Trang chủ tổng hợp các components
├── components/
│   ├── CitationTooltip.tsx          # Component Popup chú thích (dùng React Portal)
│   ├── ExportButtons.tsx            # Nút In/Xuất PDF
│   ├── Footer.tsx
│   ├── HeroSection.tsx              # Tiêu đề và ảnh bìa bài viết
│   ├── InteractiveExamen.tsx        # Trình hướng dẫn tĩnh nguyện 5 bước
│   ├── MarkdownRenderer.tsx         # Xử lý và hiển thị văn bản Markdown
│   ├── ReadingProgressBar.tsx       # Thanh tiến trình cuộn trang
│   ├── ReadingSettingsPanel.tsx     # Bảng tùy chỉnh giao diện nổi
│   ├── ReferencesSection.tsx        # Danh sách nguồn tài liệu tham khảo
│   ├── ShareQuoteTooltip.tsx        # Popup chia sẻ khi bôi đen văn bản
│   └── TableOfContents.tsx          # Mục lục động (Desktop Sidebar & Mobile Drawer)
├── lib/
│   └── markdown.ts                  # Các hàm Regex parse Markdown & đếm giờ đọc
└── XMTLDIN.md                       # File tài liệu Markdown gốc của bài báo cáo
```

## 🚀 Cài Đặt Và Khởi Chạy (Getting Started)

Làm theo các bước sau để chạy dự án trên máy cục bộ của bạn:

1. **Clone repository này về máy:**
   ```bash
   git clone <repository_url>
   cd XMTLDIN
   ```

2. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```

3. **Chạy Server phát triển (Development Server):**
   ```bash
   npm run dev
   ```

4. **Trải nghiệm:** Mở trình duyệt và truy cập vào [http://localhost:3000](http://localhost:3000).

## 📄 Bản Quyền & Giấy Phép (License)

Nội dung báo cáo nghiên cứu thuộc về tác giả nguyên bản. Mã nguồn giao diện được phân phối dưới giấy phép MIT. Bạn có thể tự do sửa đổi và sử dụng cho mục đích cá nhân hoặc phi thương mại.
