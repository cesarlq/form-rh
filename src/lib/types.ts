export interface CandidateInfo {
  name: string;
  interviewer: string;
  date: string;
  position: string;
}

export interface Criterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  score: number;
  points: number;
}

export interface Category {
  id: string;
  name: string;
  criteria: Criterion[];
}

export interface EvaluationData {
  candidateInfo: CandidateInfo;
  categories: Category[];
  totalScore: number;
}

export interface EvaluationResult {
  score: number;
  status: 'rockstar' | 'solid' | 'reject';
  message: string;
  className: string;
}
