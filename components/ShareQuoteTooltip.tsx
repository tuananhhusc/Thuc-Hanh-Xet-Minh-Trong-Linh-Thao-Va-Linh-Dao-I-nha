'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ShareQuoteTooltip({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<{ text: string, top: number, left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const activeSelection = window.getSelection();
        if (activeSelection && activeSelection.toString().trim().length > 0 && containerRef.current) {
          // Check if selection is within our container
          if (containerRef.current.contains(activeSelection.anchorNode)) {
            const range = activeSelection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            setSelection({
              text: activeSelection.toString().trim(),
              top: rect.top + window.scrollY - 50, // 50px above selection
              left: rect.left + window.scrollX + (rect.width / 2) // Center tooltip (translateX(-50%) handles offset)
            });
          } else {
            setSelection(null);
          }
        } else {
          setSelection(null);
        }
      }, 50); // Small delay to let selection finish
    };

    document.addEventListener('mouseup', handleMouseUp);
    // Also handle touchend for mobile
    document.addEventListener('touchend', handleMouseUp);
    
    // Clear on mousedown
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      // Don't clear if clicking on the tooltip itself
      const target = e.target as HTMLElement;
      if (!target.closest('.share-tooltip')) {
        setSelection(null);
      }
    };
    
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleMouseDown);
    };
  }, []);

  const handleCopy = () => {
    if (selection) {
      navigator.clipboard.writeText(`"${selection.text}" - Trích từ Thực Hành Xét Mình Trong Linh Thao`);
      setSelection(null);
      alert("Đã sao chép trích dẫn!");
    }
  };

  const handleShareFacebook = () => {
    if (selection) {
      const url = encodeURIComponent(window.location.href);
      const quote = encodeURIComponent(`"${selection.text}"`);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank', 'width=600,height=400');
      setSelection(null);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {children}
      
      {selection && typeof window !== 'undefined' && createPortal(
        <div 
          className="share-tooltip absolute z-50 flex items-center gap-1 p-1 rounded-lg shadow-xl border border-[var(--border-subtle)] no-print"
          style={{
            position: 'absolute',
            top: selection.top,
            left: selection.left,
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            transform: 'translateX(-50%)', // Ensure centering based on calculated left
          }}
        >
          <button 
            onClick={handleCopy}
            className="p-2 rounded-md hover:bg-[var(--accent-main)] hover:text-white transition-colors text-[var(--text-main)]"
            title="Sao chép"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
          </button>
          <div className="w-px h-5 bg-[var(--border-subtle)]" />
          <button 
            onClick={handleShareFacebook}
            className="p-2 rounded-md hover:bg-[#1877F2] hover:text-white transition-colors text-[var(--text-main)]"
            title="Chia sẻ Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          
          {/* Triangle pointer */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[var(--border-subtle)]"></div>
          <div className="absolute -bottom-[7px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-[var(--bg-card)]"></div>
        </div>,
        document.body
      )}
    </div>
  );
}
