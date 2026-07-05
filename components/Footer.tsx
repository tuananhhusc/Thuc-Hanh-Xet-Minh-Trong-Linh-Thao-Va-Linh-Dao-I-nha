export default function Footer() {
  return (
    <footer className="mt-20 py-12 px-6 text-center" style={{ borderTop: '1px solid #E8E2D8' }}>
      <div className="max-w-2xl mx-auto">
        {/* Decorative cross */}
        <div className="mb-6" aria-hidden="true">
          <svg width="40" height="50" viewBox="0 0 40 50" className="mx-auto opacity-20">
            <rect x="16" y="2" width="8" height="46" rx="2" fill="#722F37" />
            <rect x="4" y="14" width="32" height="8" rx="2" fill="#722F37" />
          </svg>
        </div>
        
        <p
          className="font-[family-name:var(--font-serif)] text-sm italic mb-2"
          style={{ color: '#2D3748' }}
        >
          &quot;Ad Maiorem Dei Gloriam&quot;
        </p>
        <p
          className="font-[family-name:var(--font-sans)] text-xs"
          style={{ color: '#718096' }}
        >
          Vì Vinh Danh Cao Cả Hơn Của Thiên Chúa
        </p>
        <p
          className="font-[family-name:var(--font-sans)] text-xs mt-4"
          style={{ color: '#A0AEC0' }}
        >
          © {new Date().getFullYear()} · Nghiên Cứu Linh Đạo I-nhã
        </p>
      </div>
    </footer>
  );
}
