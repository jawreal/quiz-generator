import {
  GraduationCap,
  Layers,
  Zap,
  Flame, 
  ListChecks,
  Keyboard,
  Shuffle 
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const difficultyIcons: Record<string, LucideIcon> = {
  beginner: GraduationCap,
  intermediate: Layers,
  advanced: Zap,
  expert: Flame
};

const quizTypeIcons: Record<string, LucideIcon> = {
  "multiple choice": ListChecks,
  identification: Keyboard,
  mixed: Shuffle
};

 export { difficultyIcons, quizTypeIcons };
