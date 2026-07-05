'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface CitationTooltipProps {
  id: string;
  referenceText?: string;
  children: React.ReactNode;
}

export default function CitationTooltip({ id, referenceText, children }: CitationTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calculate centered position above the trigger
      let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      let top = triggerRect.top - tooltipRect.height - 10;
      
      // Ensure tooltip stays within viewport
      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      
      // If no space above, show below
      if (top < 10) {
        top = triggerRect.bottom + 10;
      }
      
      setPosition({ top: top + window.scrollY, left: left + window.scrollX });
    }
  }, [isVisible]);

  return (
    <>
      <a
        ref={triggerRef}
        href={`#ref-${id}`}
        className="citation-ref"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById(`ref-${id}`);
          if (target) {
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
            // Highlight the target temporarily
            target.classList.add('bg-[var(--bg-highlight)]');
            setTimeout(() => target.classList.remove('bg-[var(--bg-highlight)]'), 2000);
          }
        }}
      >
        {children}
      </a>
      
      {isVisible && referenceText && typeof window !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          className="absolute z-50 p-3 text-sm rounded-lg shadow-xl border border-[var(--border-subtle)] max-w-xs pointer-events-none"
          style={{
            top: position.top,
            left: position.left,
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-main)',
            backdropFilter: 'blur(8px)'
          }}
        >
          {referenceText}
        </div>,
        document.body
      )}
    </>
  );
}
