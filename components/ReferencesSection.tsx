interface Reference {
  id: number;
  text: string;
  url: string;
}

interface ReferencesSectionProps {
  references: Reference[];
}

export default function ReferencesSection({ references }: ReferencesSectionProps) {
  return (
    <section id="references" className="mt-16 pt-12" style={{ borderTop: '2px solid #E8E2D8' }}>
      {/* Section header */}
      <div className="flex items-center justify-center gap-4 max-w-[200px] mx-auto mb-2">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #B8860B)' }} />
        <span style={{ color: '#B8860B' }} className="text-sm">✦</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #B8860B)' }} />
      </div>
      <h2
        className="font-[family-name:var(--font-serif)] text-2xl font-bold mb-8 text-center"
        style={{ color: '#722F37' }}
      >
        Nguồn Trích Dẫn
      </h2>

      <div className="space-y-3">
        {references.map((ref) => (
          <div
            key={ref.id}
            className="flex gap-3 text-sm py-2 px-3 rounded transition-colors hover:bg-[#F3EFE9]"
            id={`ref-${ref.id}`}
          >
            <span
              className="font-[family-name:var(--font-sans)] font-semibold shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-xs"
              style={{ backgroundColor: 'rgba(114, 47, 55, 0.08)', color: '#722F37' }}
            >
              {ref.id}
            </span>
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-body)]" style={{ color: '#2D3748', lineHeight: 1.6 }}>
                {ref.text}
              </p>
              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs break-all underline underline-offset-2 mt-1 inline-block transition-colors"
                  style={{ color: '#722F37' }}
                >
                  {ref.url}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
