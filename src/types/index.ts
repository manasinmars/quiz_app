export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface QuizContextType {
  topic: string;
  setTopic: (topic: string) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  answers: Record<number, string>;
  setAnswers: (answers: Record<number, string>) => void;
  score: number;
  setScore: (score: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
}

export interface AIResponse {
  questions?: Question[];
  feedback?: string;
  error?: string;
}
