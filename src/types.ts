export type ChibiExpression =
  | 'happy'
  | 'surprised'
  | 'sad'
  | 'curious'
  | 'thinking'
  | 'waving'
  | 'running';

export type ChibiAction =
  | 'idle'
  | 'run'
  | 'pick_flower'
  | 'catch_butterfly'
  | 'wave_greet'
  | 'bow_greet'
  | 'inside_yard'
  | 'late_caught';

export interface Student {
  id: string;
  name: string;
  avatarUrl?: string;
  hairStyle: number; // 0..5 distinct fluffy Chibi hairstyles
  hairColor: string;
  eyeColor: string;
  outfitColor: string; // Pastel-harmonized Ca Dong tunic base
  backpackColor: string;
  accentColor: string;
}

export type GamePhase = 'idle' | 'walking' | 'closing' | 'selected';

export type SelectionMode = 'random' | 'manual';

export interface DialogueScript {
  id: string;
  lines: string[];
}

export type SurpriseEventType =
  | 'wind_petals'
  | 'butterfly_swarm'
  | 'giant_flower_find'
  | 'golden_sunbeam'
  | 'quick_sprint'
  | 'teacher_greet';

export interface SurpriseEvent {
  id: string;
  type: SurpriseEventType;
  title: string;
  description: string;
  affectedStudentId?: string;
  greetStudentIds?: string[];
  greetActions?: Record<string, 'wave_greet' | 'bow_greet'>;
  isManual?: boolean;
}
