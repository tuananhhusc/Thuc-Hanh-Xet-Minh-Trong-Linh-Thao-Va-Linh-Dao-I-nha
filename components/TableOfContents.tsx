'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the TOC container when active item changes
  useEffect(() => {
    if (activeId && scrollContainerRef.current) {
      const activeLink = scrollContainerRef.current.querySelector(`a[href="#${activeId}"]`);
      if (activeLink) {
        activeLink.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const visibleEntries = entries.filter(e => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    // Observe all heading elements
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 96; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      setActiveId(id);
      setIsOpen(false);
    }
  }, []);

  const tocLinks = (
    <nav aria-label="Mục lục bài viết">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block py-1.5 text-sm transition-all duration-200 relative ${
                item.level === 3 ? 'pl-6 text-xs' : 'pl-3'
              } ${
                activeId === item.id
                  ? 'font-semibold translate-x-1'
                  : 'hover:translate-x-1'
              }`}
              style={{
                color: activeId === item.id ? 'var(--accent-main)' : 'var(--text-main)',
              }}
            >
              {activeId === item.id && (
                <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-[var(--accent-main)]"></span>
              )}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile TOC Floating Button & Drawer */}
      <div className="lg:hidden no-print">
        {/* Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-full shadow-lg border border-[var(--border-subtle)] transition-transform hover:scale-105"
          style={{ backgroundColor: 'var(--bg-card)', color: 'var(--accent-main)' }}
          aria-label="Mở mục lục"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="9" y2="9"/>
            <line x1="4" x2="20" y1="15" y2="15"/>
            <line x1="4" x2="14" y1="21" y2="21"/>
            <line x1="4" x2="14" y1="3" y2="3"/>
          </svg>
        </button>

        {/* Drawer Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Drawer Content */}
        <div
          className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 shadow-2xl border-r border-[var(--border-subtle)] p-6 flex flex-col transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-gold)' }} className="text-sm">✦</span>
              <h2
                className="font-[family-name:var(--font-serif)] text-base font-bold tracking-widest uppercase"
                style={{ color: 'var(--accent-main)' }}
              >
                Mục Lục Nghiên Cứu
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[var(--text-muted)] hover:text-[var(--accent-main)] p-1 text-lg"
              aria-label="Đóng mục lục"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 toc-scrollbar">
            {tocLinks}
          </div>
        </div>
      </div>

      {/* Desktop TOC */}
      <aside className="hidden lg:block relative h-full" aria-label="Mục lục">
        <div 
          ref={scrollContainerRef}
          className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto toc-scrollbar rounded-2xl p-6 shadow-sm border border-[var(--border-subtle)] transition-all duration-300 hover:shadow-md"
          style={{ backgroundColor: 'var(--bg-card)', backdropFilter: 'blur(8px)' }}
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-subtle)]">
            <span style={{ color: 'var(--color-gold)' }} className="text-sm">✦</span>
            <h2
              className="font-[family-name:var(--font-serif)] text-lg font-bold tracking-widest uppercase"
              style={{ color: 'var(--accent-main)' }}
            >
              Mục Lục
            </h2>
          </div>
          {tocLinks}
        </div>
      </aside>
    </>
  );
}
