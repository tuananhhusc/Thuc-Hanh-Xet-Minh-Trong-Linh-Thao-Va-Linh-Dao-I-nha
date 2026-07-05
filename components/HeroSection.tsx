interface HeroSectionProps {
  title: string;
  readingTime: number;
}

export default function HeroSection({ title, readingTime }: HeroSectionProps) {
  return (
    <header className="relative overflow-hidden py-20 md:py-28 px-6">
      {/* Subtle cross watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <svg width="300" height="400" viewBox="0 0 300 400" className="opacity-[0.035]">
          <rect x="125" y="20" width="50" height="360" rx="6" fill="#722F37" />
          <rect x="40" y="110" width="220" height="50" rx="6" fill="#722F37" />
        </svg>
      </div>
      
      {/* Decorative top arch - gothic window shape */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
        <svg width="200" height="100" viewBox="0 0 200 100" className="opacity-[0.04]">
          <path d="M20,100 L20,40 Q100,0 180,40 L180,100" fill="none" stroke="#B8860B" strokeWidth="3" />
          <path d="M40,100 L40,50 Q100,15 160,50 L160,100" fill="none" stroke="#B8860B" strokeWidth="2" />
          <line x1="100" y1="20" x2="100" y2="100" stroke="#B8860B" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Subtitle label */}
        <p className="font-[family-name:var(--font-sans)] text-xs md:text-sm tracking-[0.25em] uppercase mb-6 md:mb-8" style={{ color: '#B8860B' }}>
          — Báo Cáo Nghiên Cứu Chuyên Sâu —
        </p>

        {/* Main title */}
        <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 md:mb-8" style={{ color: '#722F37' }}>
          {title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8">
          <span className="font-[family-name:var(--font-sans)] text-sm" style={{ color: '#2D3748' }}>
            Nghiên Cứu Học Thuật · Linh Đạo I-nhã
          </span>
          <span className="hidden sm:inline" style={{ color: '#B8860B' }}>✦</span>
          <span 
            className="font-[family-name:var(--font-sans)] text-xs px-4 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(114, 47, 55, 0.08)', color: '#722F37' }}
          >
            ⏱ {readingTime} phút đọc
          </span>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #B8860B)' }} />
          <span style={{ color: '#B8860B' }} className="text-lg">✦</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #B8860B)' }} />
        </div>
      </div>
    </header>
  );
}
