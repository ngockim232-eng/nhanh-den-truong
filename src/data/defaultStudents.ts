import { DialogueScript, Student } from '../types';

// Soft pastel-harmonized Ca Dong indigo, slate, plum & sage tunic bases
const OUTFIT_PALETTE = [
  '#3f4d6b', // Pastel indigo navy
  '#4d5a78', // Soft slate blue
  '#5c4966', // Muted plum indigo
  '#3f5e5a', // Deep mountain sage-indigo
  '#4b4b68', // Twilight periwinkle-indigo
  '#574852', // Warm charcoal-plum
];

// Soft harmonious pastel backpack colors
const BACKPACK_PALETTE = [
  '#f28b82', // Pastel coral rose
  '#81c995', // Pastel mint sage
  '#fdd663', // Pastel buttercup
  '#8ab4f8', // Pastel sky blue
  '#f48fb1', // Pastel blossom pink
  '#ffab76', // Pastel apricot
];

const ACCENT_PALETTE = [
  '#fde68a', // Soft butter yellow
  '#fca5a5', // Soft rose
  '#a7f3d0', // Soft mint
  '#bae6fd', // Soft sky
  '#fbcfe8', // Soft sakura
  '#fed7aa', // Soft peach
];

const HAIR_COLORS = [
  '#3b2f2f', // Warm cocoa espresso
  '#4a3728', // Soft chestnut brown
  '#2f3245', // Soft midnight indigo
  '#523a34', // Honey dark brown
  '#3e323c', // Soft plum charcoal
  '#44362d', // Roasted walnut
];

const EYE_COLORS = [
  '#4b3328',
  '#3b4263',
  '#5b3e31',
  '#364f47',
  '#513847',
  '#493a2b',
];

export function createStudentRecord(
  name: string,
  index = 0,
  avatarUrl?: string,
): Student {
  const cleanName = name.trim();
  return {
    id: `stu-${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${index}`,
    name: cleanName,
    avatarUrl,
    hairStyle: index % 6,
    hairColor: HAIR_COLORS[index % HAIR_COLORS.length],
    eyeColor: EYE_COLORS[index % EYE_COLORS.length],
    outfitColor: OUTFIT_PALETTE[index % OUTFIT_PALETTE.length],
    backpackColor: BACKPACK_PALETTE[index % BACKPACK_PALETTE.length],
    accentColor: ACCENT_PALETTE[index % ACCENT_PALETTE.length],
  };
}

export function normalizeStudentRecord(raw: Partial<Student>, index: number): Student {
  return {
    id: raw.id || `stu-mig-${index}-${Date.now()}`,
    name: raw.name || `Học sinh ${index + 1}`,
    avatarUrl: raw.avatarUrl,
    hairStyle: typeof raw.hairStyle === 'number' ? raw.hairStyle % 6 : index % 6,
    hairColor: raw.hairColor || HAIR_COLORS[index % HAIR_COLORS.length],
    eyeColor: raw.eyeColor || EYE_COLORS[index % EYE_COLORS.length],
    outfitColor: raw.outfitColor || OUTFIT_PALETTE[index % OUTFIT_PALETTE.length],
    backpackColor: raw.backpackColor || BACKPACK_PALETTE[index % BACKPACK_PALETTE.length],
    accentColor: raw.accentColor || ACCENT_PALETTE[index % ACCENT_PALETTE.length],
  };
}

export const DEFAULT_STUDENTS: Student[] = [
  createStudentRecord('Hồ Văn Tùng', 0),
  createStudentRecord('Hồ Thị Mai', 1),
  createStudentRecord('Đinh Văn Nam', 2),
  createStudentRecord('Đinh Thị Lan', 3),
  createStudentRecord('Hồ Văn Hải', 4),
  createStudentRecord('Đinh Thị Hoa', 5),
  createStudentRecord('Hồ Văn Minh', 6),
  createStudentRecord('Hồ Thị Thu', 7),
  createStudentRecord('Đinh Văn Long', 8),
  createStudentRecord('Hồ Thị Ngọc', 9),
  createStudentRecord('Đinh Văn Bảo', 10),
  createStudentRecord('Hồ Thị Hương', 11),
];

export const ROAD_DIALOGUE_SCRIPTS: DialogueScript[] = [
  {
    id: 'script-flowers',
    lines: [
      'Ôi! Dọc đường hôm nay nở nhiều hoa dã quỳ đẹp quá!',
      'Đợi mình hái một bông hoa vàng xinh tặng cô giáo nhé!',
      'Nhanh chân lên bạn ơi, sắp đến giờ vào lớp rồi!',
    ],
  },
  {
    id: 'script-butterfly',
    lines: [
      'Nhìn kìa, đàn bướm sặc sỡ đang bay quanh khóm hoa!',
      'Mình thử giơ tay bắt nhẹ một chú bướm xem sao!',
      'Cẩn thận kẻo chuông trường Lý Tự Trọng reo là đóng cổng đấy!',
    ],
  },
  {
    id: 'script-gate',
    lines: [
      'Các bạn ơi, cổng trường đang mở đón chúng mình kìa!',
      'Ai chạy nhanh vào sân trường trước khi chuông reo nào!',
      'Chờ mình với, mình mải ngắm hoa nên đi chậm quá!',
    ],
  },
  {
    id: 'script-quiz',
    lines: [
      'Hôm nay chúng mình sẽ cùng khởi động đầu giờ thật vui nhé!',
      'Bạn nào đến cổng trễ nhất sẽ được mời trả lời câu hỏi đấy!',
    ],
  },
];

export const CLOSING_PROMPT_TEXT =
  'Reng... reng... reng! Chuông đã reo và cổng Trường PTDTBT TH&THCS Lý Tự Trọng đã đóng lại! Xin mời bạn đến trễ cùng đứng lên chia sẻ câu trả lời của mình nhé!';
