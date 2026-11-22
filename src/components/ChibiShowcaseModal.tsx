import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Flower2, Sparkles, X } from 'lucide-react';
import { ChibiExpression, Student } from '../types';
import { ChibiCharacterSVG } from './ChibiCharacterSVG';

interface ChibiShowcaseModalProps {
  student: Student | null;
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onClose: () => void;
}

const EXPRESSION_OPTIONS: {
  id: ChibiExpression;
  label: string;
}[] = [
  { id: 'happy', label: 'Vui vẻ, cười tươi' },
  { id: 'surprised', label: 'Ngạc nhiên, mắt mở to' },
  { id: 'sad', label: 'Buồn nhẹ, đáng thương' },
  { id: 'curious', label: 'Tò mò, tinh nghịch' },
  { id: 'thinking', label: 'Đang suy nghĩ' },
  { id: 'waving', label: 'Đang vẫy tay chào' },
  { id: 'running', label: 'Đang chạy nhảy' },
];

export const ChibiShowcaseModal: React.FC<ChibiShowcaseModalProps> = ({
  student,
  students,
  onSelectStudent,
  onClose,
}) => {
  const [expression, setExpression] = useState<ChibiExpression>('happy');
  const [holdingFlower, setHoldingFlower] = useState(true);
  const [bgMode, setBgMode] = useState<'white' | 'transparent'>('white');
  const [animTime, setAnimTime] = useState(0);

  const activeStudent =
    student ? students.find((s) => s.id === student.id) ?? student : null;

  useEffect(() => {
    if (!activeStudent) return;
    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setAnimTime((now - start) / 1000);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeStudent?.id]);

  useEffect(() => {
    if (!activeStudent) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeStudent, onClose]);

  if (!activeStudent) return null;

  const currentIdx = students.findIndex((s) => s.id === activeStudent.id);

  const handleStep = (delta: number) => {
    if (students.length === 0) return;
    const safeIdx = currentIdx >= 0 ? currentIdx : 0;
    const nextIdx = (safeIdx + delta + students.length) % students.length;
    onSelectStudent(students[nextIdx]);
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-stone-950/70 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chibi-showcase-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header (strictly outside character frame) */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 bg-rose-50/80 border-b border-rose-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {activeStudent.avatarUrl ? (
              <img
                src={activeStudent.avatarUrl}
                alt={activeStudent.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow shrink-0"
              />
            ) : (
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0 shadow"
                style={{ backgroundColor: activeStudent.backpackColor }}
              >
                <Sparkles className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0">
              <h2
                id="chibi-showcase-title"
                className="text-base sm:text-xl font-extrabold text-stone-900 truncate"
              >
                Chibi Ca Dong · {activeStudent.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 truncate">
                Toàn thân 2D Pastel · Thử 7 biểu cảm &amp; tư thế
                {students.length > 0 && currentIdx >= 0
                  ? ` · Bạn ${currentIdx + 1}/${students.length}`
                  : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {students.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => handleStep(-1)}
                  className="w-9 h-9 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 flex items-center justify-center cursor-pointer"
                  aria-label="Học sinh trước"
                  title="Học sinh trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStep(1)}
                  className="w-9 h-9 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 flex items-center justify-center cursor-pointer"
                  aria-label="Học sinh tiếp theo"
                  title="Học sinh tiếp theo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-600 hover:bg-rose-100 hover:text-stone-900 cursor-pointer"
              aria-label="Đóng xem Chibi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: Pure Clean Full-Body Preview + Expression Switcher */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Full-body Centered Chibi Mascot Frame — Zero Text, Zero Logo, Zero Cropping */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div
              className="w-full max-w-[270px] aspect-[268/334] rounded-2xl border border-stone-200 shadow-inner flex items-center justify-center p-2 overflow-hidden"
              style={
                bgMode === 'white'
                  ? { backgroundColor: '#ffffff' }
                  : {
                      backgroundColor: '#f8fafc',
                      backgroundImage:
                        'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    }
              }
            >
              <ChibiCharacterSVG
                student={activeStudent}
                expression={expression}
                action={expression === 'running' ? 'run' : 'idle'}
                holdingFlower={holdingFlower}
                animTime={animTime}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Expression & Background Controls */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                7 Biểu cảm &amp; chuyển động
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {EXPRESSION_OPTIONS.map((opt) => {
                  const active = expression === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setExpression(opt.id)}
                      className={`px-3.5 py-2.5 rounded-xl border text-left text-sm font-semibold transition-colors cursor-pointer ${
                        active
                          ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={() => setHoldingFlower((v) => !v)}
                className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  holdingFlower
                    ? 'bg-amber-50 border-amber-400 text-amber-900'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Flower2 className="w-4 h-4" />
                <span>{holdingFlower ? 'Đang cầm hoa rừng' : 'Không cầm hoa'}</span>
              </button>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 border border-stone-200">
                <button
                  type="button"
                  onClick={() => setBgMode('white')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    bgMode === 'white'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Nền trắng
                </button>
                <button
                  type="button"
                  onClick={() => setBgMode('transparent')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    bgMode === 'transparent'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Trong suốt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
