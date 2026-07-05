'use client';

import { useState, useEffect } from 'react';
import { useReadingSettings } from '@/app/context/ReadingContext';

export default function ReadingSettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, fontSize, setFontSize, fontFamily, setFontFamily } = useReadingSettings();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Settings Panel */}
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 mb-2 w-72 rounded-2xl p-5 shadow-xl border border-[var(--border-subtle)]"
          style={{ backgroundColor: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}
        >
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--border-subtle)]">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--accent-main)]">Tùy chỉnh giao diện</h3>
            <button onClick={() => setIsOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--accent-main)]">
              ✕
            </button>
          </div>

          {/* Theme Selection */}
          <div className="mb-4">
            <label className="block text-xs text-[var(--text-muted)] mb-2 font-medium">MÀU NỀN</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setTheme('parchment')}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${theme === 'parchment' ? 'border-[var(--accent-main)] scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: '#F9F6F0' }}
                title="Giấy da"
              />
              <button 
                onClick={() => setTheme('white')}
                className={`w-8 h-8 rounded-full border-2 border-gray-200 transition-transform ${theme === 'white' ? 'border-[var(--accent-main)] scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: '#FFFFFF' }}
                title="Sáng"
              />
              <button 
                onClick={() => setTheme('dark')}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${theme === 'dark' ? 'border-[var(--accent-main)] scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: '#121212' }}
                title="Tối"
              />
            </div>
          </div>

          {/* Font Size Selection */}
          <div className="mb-4">
            <label className="block text-xs text-[var(--text-muted)] mb-2 font-medium">CỠ CHỮ</label>
            <div className="flex gap-2">
              {(['base', 'large', 'xl'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`flex-1 py-1.5 rounded-md text-sm border transition-colors ${
                    fontSize === size 
                      ? 'bg-[var(--accent-main)] text-white border-[var(--accent-main)]' 
                      : 'border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--accent-main)]'
                  }`}
                >
                  {size === 'base' ? 'Aa' : size === 'large' ? 'Aa+' : 'Aa++'}
                </button>
              ))}
            </div>
          </div>

          {/* Font Family Selection */}
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-2 font-medium">PHÔNG CHỮ</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFontFamily('serif')}
                className={`flex-1 py-1.5 rounded-md text-sm font-serif border transition-colors ${
                  fontFamily === 'serif' 
                    ? 'bg-[var(--accent-main)] text-white border-[var(--accent-main)]' 
                    : 'border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--accent-main)]'
                }`}
              >
                Serif
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`flex-1 py-1.5 rounded-md text-sm font-sans border transition-colors ${
                  fontFamily === 'sans' 
                    ? 'bg-[var(--accent-main)] text-white border-[var(--accent-main)]' 
                    : 'border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--accent-main)]'
                }`}
              >
                Sans
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-105 border border-[var(--border-subtle)]"
        style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-main)' }}
        aria-label="Cài đặt giao diện"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
    </div>
  );
}
