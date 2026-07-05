export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+$/, "");
    headings.push({ id, text, level });
  }

  return headings;
}

export function estimateReadingTime(text: string): number {
  // Vietnamese reading speed ~200 words per minute
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function processContent(markdown: string): string {
  // Convert the first line (title) to h1
  let processed = markdown;
  
  // Process citation markers like [cite: x] or just numbers at end of sentences
  // The markdown has inline numbers like ...Đấng Tạo Hóa1. or ...hiện đại4.
  // We need to detect patterns like: text followed by a number then period/comma/space
  // Match superscript citation numbers (standalone numbers that are citations attached to words/punctuation)
  processed = processed.replace(
    /([\p{L})"'])(\d{1,2})([.,;:)"'\s]|$)/gu,
    (match, before, num, after) => {
      return `${before}<sup class="citation-ref" data-cite="${num}">${num}</sup>${after}`;
    }
  );

  return processed;
}

export function formatMarkdownToSections(markdown: string): string {
  // Add proper markdown heading markers
  const lines = markdown.split('\n');
  const processed: string[] = [];
  let isFirstLine = true;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (isFirstLine && trimmed.length > 0) {
      // First non-empty line is the title - make it h1
      processed.push(`# ${trimmed}`);
      isFirstLine = false;
      continue;
    }
    
    if (isFirstLine && trimmed.length === 0) {
      processed.push(line);
      continue;
    }
    
    isFirstLine = false;
    processed.push(line);
  }
  
  return processed.join('\n');
}
