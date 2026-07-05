'use client';

import React, { useState, useEffect, useRef } from 'react';

const EXAMEN_STEPS = [
  {
    title: "1. Tạ Ơn",
    description: "Nhớ lại những ơn lành bạn nhận được trong ngày hôm nay. Dừng lại ở một vài ơn lành khiến bạn cảm thấy biết ơn nhất và dâng lời tạ ơn Chúa.",
    duration: 120 // 2 minutes
  },
  {
    title: "2. Xin Ơn Soi Sáng",
    description: "Xin Chúa Thánh Thần soi sáng để bạn có thể nhìn lại ngày sống của mình bằng đôi mắt của Chúa, không phải để phán xét mà để nhận ra sự hiện diện của Ngài.",
    duration: 60 // 1 minute
  },
  {
    title: "3. Duyệt Xét Ngày Sống",
    description: "Lướt qua các sự kiện trong ngày như một thước phim. Bạn đã phản ứng thế nào? Cảm xúc nào đã nổi lên? Chúa đã ở đâu trong những khoảnh khắc đó?",
    duration: 180 // 3 minutes
  },
  {
    title: "4. Xin Tha Thứ",
    description: "Nhận ra những lúc bạn đã yếu đuối, đã từ chối lời mời gọi của tình yêu. Thành tâm xin Chúa thứ tha và chữa lành.",
    duration: 120 // 2 minutes
  },
  {
    title: "5. Dốc Lòng Chừa & Hướng Về Tương Lai",
    description: "Xin ơn Chúa để ngày mai bạn sống tốt hơn, cộng tác tích cực hơn với ân sủng của Ngài. Kết thúc bằng việc đọc một Kinh Lạy Cha.",
    duration: 120 // 2 minutes
  }
];

export default function InteractiveExamen() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAMEN_STEPS[0].duration);
  const [isPaused, setIsPaused] = useState(false);
  
  // Ambient sound (public domain/free nature sound url for demo)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && !isPaused && timeLeft === 0) {
      // Auto-advance to next step
      if (currentStep < EXAMEN_STEPS.length - 1) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentStep(prev => prev + 1);
        setTimeLeft(EXAMEN_STEPS[currentStep + 1].duration);
      } else {
        // Finished
        setIsActive(false);
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft, currentStep]);

  const startExamen = () => {
    setIsActive(true);
    setIsPaused(false);
    setCurrentStep(0);
    setTimeLeft(EXAMEN_STEPS[0].duration);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(e => console.log("Audio play prevented by browser", e));
    }
  };

  const stopExamen = () => {
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="mt-16 mb-8 rounded-2xl p-5 sm:p-8 border border-[var(--border-subtle)] shadow-sm relative overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-main)] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      
      {/* Hidden audio element for ambient sound */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg" 
        preload="none"
      />

      {!isActive ? (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-main)] text-white mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h3 className="font-[family-name:var(--font-serif)] text-2xl font-bold mb-3" style={{ color: 'var(--accent-main)' }}>
            Thực hành Phút Hồi Tâm
          </h3>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto mb-8">
            Dành 10 phút tĩnh lặng để nhìn lại ngày sống của bạn. Trình hướng dẫn này sẽ đồng hành cùng bạn qua 5 bước của phương pháp I-nhã với nhạc nền êm dịu.
          </p>
          <button 
            onClick={startExamen}
            className="px-8 py-3 rounded-full bg-[var(--accent-main)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors shadow-md"
          >
            Bắt đầu cầu nguyện
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full min-h-[300px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--accent-main)]">
              Bước {currentStep + 1} / 5
            </h3>
            <button 
              onClick={stopExamen}
              className="text-[var(--text-muted)] hover:text-[var(--accent-main)] text-sm font-medium"
            >
              Kết thúc sớm
            </button>
          </div>

          <div className="flex-1 text-center flex flex-col justify-center max-w-xl mx-auto">
            <h4 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-bold mb-6 text-[var(--text-main)]">
              {EXAMEN_STEPS[currentStep].title}
            </h4>
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-8 sm:mb-12">
              {EXAMEN_STEPS[currentStep].description}
            </p>
            
            <div className="text-4xl sm:text-5xl font-light tabular-nums tracking-tight text-[var(--accent-main)] mb-8">
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-auto">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border-subtle)] text-[var(--text-main)] hover:bg-[var(--bg-highlight)] transition-colors"
              title={isPaused ? "Tiếp tục" : "Tạm dừng"}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              )}
            </button>
            
            <button 
              onClick={() => {
                if (currentStep < EXAMEN_STEPS.length - 1) {
                  setCurrentStep(prev => prev + 1);
                  setTimeLeft(EXAMEN_STEPS[currentStep + 1].duration);
                } else {
                  stopExamen();
                }
              }}
              className="px-6 py-2 rounded-full border border-[var(--border-subtle)] text-[var(--text-main)] hover:bg-[var(--bg-highlight)] transition-colors font-medium text-sm"
            >
              {currentStep < EXAMEN_STEPS.length - 1 ? 'Chuyển bước tiếp theo' : 'Hoàn thành'}
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-[var(--border-subtle)] w-full">
            <div 
              className="h-full bg-[var(--accent-main)] transition-all duration-1000 ease-linear"
              style={{ width: `${((EXAMEN_STEPS[currentStep].duration - timeLeft) / EXAMEN_STEPS[currentStep].duration) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
