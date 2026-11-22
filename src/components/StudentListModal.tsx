import React, { useEffect, useMemo, useState } from 'react';
import {
  Eraser,
  ListPlus,
  RotateCcw,
  Save,
  UserCheck,
  X,
} from 'lucide-react';
import { createStudentRecord, DEFAULT_STUDENTS } from '../data/defaultStudents';
import { Student } from '../types';

interface StudentListModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  calledIds: Set<string>;
  onUpdateStudents: (next: Student[], shouldResetToIdle?: boolean) => void;
  onResetRound: () => void;
}

function parseBulkStudentNames(rawText: string): string[] {
  if (!rawText.trim()) return [];
  return rawText
    .split(/[\r\n,;\t]+/)
    .map((line) =>
      line
        .replace(/^\s*(?:\d+\s*[.)\-:/]|[-•*+]\s*)+/, '')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter((name) => name.length > 0);
}

export const StudentListModal: React.FC<StudentListModalProps> = ({
  isOpen,
  onClose,
  students,
  calledIds,
  onUpdateStudents,
  onResetRound,
}) => {
  const [bulkText, setBulkText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setBulkText(students.map((s) => s.name).join('\n'));
    }
  }, [isOpen, students]);

  const parsedBulkNames = useMemo(
    () => parseBulkStudentNames(bulkText),
    [bulkText],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveAndShow = () => {
    if (parsedBulkNames.length === 0) return;

    // Preserve existing avatar/style if a student with the same name already existed
    const existingByName = new Map<string, Student>();
    students.forEach((s) => {
      existingByName.set(s.name.trim().toLowerCase(), s);
    });

    const nextStudents = parsedBulkNames.map((name, i) => {
      const match = existingByName.get(name.toLowerCase());
      if (match) {
        return { ...match, name };
      }
      return createStudentRecord(name, i);
    });

    onUpdateStudents(nextStudents, true);
    onClose();
  };

  const handleRestoreSample = () => {
    const sample = DEFAULT_STUDENTS.map((s, i) => createStudentRecord(s.name, i));
    setBulkText(sample.map((s) => s.name).join('\n'));
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/70 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="roster-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-amber-50 border-b border-amber-200 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <ListPlus className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2
                id="roster-title"
                className="text-lg sm:text-xl font-bold text-stone-900 truncate"
              >
                Nhập Nhanh Danh Sách Học Sinh
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 truncate">
                Đang hiển thị {students.length} học sinh · Nhập hoặc dán danh sách cả lớp
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-600 hover:bg-amber-200/60 hover:text-stone-900 transition-colors cursor-pointer shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Utility Toolbar */}
        <div className="px-5 sm:px-6 py-2.5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBulkText('')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 font-semibold cursor-pointer"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Xóa trắng để dán mới</span>
            </button>

            <button
              type="button"
              onClick={handleRestoreSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-200/70 hover:text-stone-900 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Danh sách mẫu</span>
            </button>
          </div>

          {calledIds.size > 0 && (
            <button
              type="button"
              onClick={onResetRound}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-semibold cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Làm mới lượt gọi ({calledIds.size})</span>
            </button>
          )}
        </div>

        {/* Quick Bulk Class Input Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 custom-scrollbar">
          <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-3.5 text-xs sm:text-sm text-stone-700 space-y-1">
            <p className="font-bold text-amber-950">
              Hướng dẫn nhập nhanh cả lớp:
            </p>
            <p>
              Nhập hoặc dán danh sách tên học sinh (mỗi em 1 dòng, hoặc ngăn cách bằng dấu phẩy / dấu chấm phẩy). Số thứ tự như <span className="font-semibold">1. Hồ Văn Tùng</span> sẽ tự được bỏ gọn.
            </p>
          </div>

          <textarea
            rows={8}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder={'Ví dụ:\n1. Hồ Văn Tùng\n2. Hồ Thị Mai\n3. Đinh Văn Nam\nhoặc: Hồ Văn Hải, Đinh Thị Hoa, Hồ Văn Minh'}
            className="w-full p-3.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
            autoFocus
          />

          {/* Live Parsed Student Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
              {parsedBulkNames.length > 0 ? (
                <span className="text-emerald-700">
                  Đã nhận diện {parsedBulkNames.length} học sinh sẵn sàng hiển thị:
                </span>
              ) : (
                <span className="text-red-600">
                  Vui lòng nhập ít nhất 1 tên học sinh để lưu.
                </span>
              )}
            </div>

            {parsedBulkNames.length > 0 && (
              <div className="max-h-32 overflow-y-auto p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap gap-1.5">
                {parsedBulkNames.map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-800"
                  >
                    {i + 1}. {name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-sm cursor-pointer"
          >
            Hủy
          </button>

          <button
            type="button"
            disabled={parsedBulkNames.length === 0}
            onClick={handleSaveAndShow}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-45 text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Lưu &amp; Hiện lên màn hình ({parsedBulkNames.length} em)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
