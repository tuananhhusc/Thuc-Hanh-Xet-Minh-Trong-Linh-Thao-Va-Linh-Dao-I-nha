'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import type { Components } from 'react-markdown';
import CitationTooltip from './CitationTooltip';
import ShareQuoteTooltip from './ShareQuoteTooltip';

interface Reference {
  id: number;
  text: string;
  url: string;
}

interface MarkdownRendererProps {
  content: string;
  references?: Reference[];
}

export default function MarkdownRenderer({ content, references = [] }: MarkdownRendererProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="sr-only">{children}</h1>
    ),
    h2: ({ children, id, ...props }) => {
      const headingId = id || String(children)
        .toLowerCase()
        .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF]/g, '')
        .replace(/\s+/g, '-');
      return (
        <>
          <div className="flex items-center justify-center gap-4 max-w-[200px] mx-auto mt-16 mb-2">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--color-gold))' }} />
            <span style={{ color: 'var(--color-gold)' }} className="text-sm">✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, var(--color-gold))' }} />
          </div>
          <h2
            id={headingId}
            className="font-[family-name:var(--font-serif)] text-2xl md:text-[1.75rem] font-bold mt-4 mb-6 scroll-mt-24 pb-3"
            style={{
              color: 'var(--accent-main)',
              borderBottom: '2px solid',
              borderImage: 'linear-gradient(to right, var(--color-gold), transparent) 1',
            }}
            {...props}
          >
            {children}
          </h2>
        </>
      );
    },
    h3: ({ children, id, ...props }) => {
      const headingId = id || String(children)
        .toLowerCase()
        .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF]/g, '')
        .replace(/\s+/g, '-');
      return (
        <h3
          id={headingId}
          className="font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] font-semibold mt-8 mb-4 scroll-mt-24"
          style={{ color: 'var(--text-main)' }}
          {...props}
        >
          {children}
        </h3>
      );
    },
    blockquote: ({ children }) => (
      <blockquote
        className="relative my-6 pl-6 pr-4 py-4 rounded-r-lg italic"
        style={{
          borderLeft: '4px solid var(--accent-main)',
          backgroundColor: 'var(--bg-highlight)',
        }}
      >
        <span
          className="absolute -top-2 left-2 text-4xl leading-none pointer-events-none select-none"
          style={{ color: 'var(--color-gold)', opacity: 0.2 }}
          aria-hidden="true"
        >
          ❝
        </span>
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto rounded-lg shadow-sm" style={{ border: '1px solid var(--border-subtle)' }}>
        <table className="w-full border-collapse text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead style={{ backgroundColor: 'var(--accent-main)' }} className="text-white">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-sm font-[family-name:var(--font-sans)]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        className="px-4 py-3 text-sm"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        {children}
      </td>
    ),
    tr: ({ children, ...props }) => {
      return (
        <tr
          className="transition-colors hover:bg-[var(--border-subtle)]"
          {...props}
        >
          {children}
        </tr>
      );
    },
    a: ({ href, children }) => {
      const isExternal = href?.startsWith('http');
      return (
        <a
          href={href}
          className="underline underline-offset-2 transition-colors hover:text-[var(--accent-hover)]"
          style={{ color: 'var(--accent-main)' }}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
    sup: ({ children, ...props }) => {
      const className = (props as Record<string, unknown>).className as string | undefined;
      if (className?.includes('citation-ref')) {
        const citeId = (props as Record<string, unknown>)['data-cite'] as string;
        const refObj = references.find(r => r.id.toString() === citeId);
        
        return (
          <CitationTooltip id={citeId} referenceText={refObj?.text}>
            {children}
          </CitationTooltip>
        );
      }
      return <sup {...props}>{children}</sup>;
    },
    // Style list items
    ul: ({ children }) => (
      <ul className="my-4 space-y-2 list-none pl-0">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 space-y-2 list-decimal pl-6 text-[var(--text-main)]">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="relative pl-5 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)] before:text-xs before:top-[0.35em]" style={{ lineHeight: '1.85' }}>
        {children}
      </li>
    ),
    p: ({ children }) => (
      <p className="my-4" style={{ lineHeight: '1.85', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong style={{ color: 'var(--text-main)', fontWeight: 700 }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em style={{ color: 'var(--text-main)' }}>{children}</em>
    ),
  };

  return (
    <div className="prose prose-lg max-w-none">
      <ShareQuoteTooltip>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </ShareQuoteTooltip>
    </div>
  );
}
