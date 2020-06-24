import { Option } from './Option';

export interface QuizQuestion {
  questionId: number;
  questionText: string;
  options: Option[];
  selectedOption: string;
}