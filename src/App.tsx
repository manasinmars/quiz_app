import React, { useState, useEffect } from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import TopicSelection from './screens/TopicSelection';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import './App.css';

type AppStep = 'topic-selection' | 'quiz' | 'result';

const AppContent: React.FC = () => {
  const { questions, isLoading } = useQuiz();
  const [currentStep, setCurrentStep] = useState<AppStep>('topic-selection');

  // Navigate to quiz when questions are loaded
  useEffect(() => {
    if (questions.length > 0 && !isLoading && currentStep === 'topic-selection') {
      setCurrentStep('quiz');
    }
  }, [questions, isLoading, currentStep]);

  // Navigate to result when quiz is completed
  const handleQuizComplete = () => {
    setCurrentStep('result');
  };

  // Navigate back to topic selection
  const handleRestart = () => {
    setCurrentStep('topic-selection');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'topic-selection':
        return <TopicSelection />;
      case 'quiz':
        return <QuizScreen onComplete={handleQuizComplete} />;
      case 'result':
        return <ResultScreen onRestart={handleRestart} />;
      default:
        return <TopicSelection />;
    }
  };

  return (
    <div className="app">
      <div className="app__container">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
};

export default App;
