import React from 'react';
import { useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import './QuizScreen.css';

interface QuizScreenProps {
  onComplete?: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const {
    questions,
    currentIndex,
    setCurrentIndex,
    answers,
    setAnswers,
    setScore,
    topic
  } = useQuiz();

  const currentQuestion = questions[currentIndex];
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswered = answers[currentIndex] !== undefined;

  const handleAnswerSelect = (answer: string) => {
    setAnswers({
      ...answers,
      [currentIndex]: answer
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    onComplete?.();
  };

  // Calculate progress
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (!currentQuestion) {
    return (
      <div className="quiz-screen">
        <div className="quiz-screen__container">
          <div className="quiz-screen__error">
            <h2>No questions available</h2>
            <p>Please go back and select a topic.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-screen">
      <div className="quiz-screen__container">
        <div className="quiz-screen__header">
          <div className="quiz-screen__topic">
            <span className="quiz-screen__topic-label">Topic:</span>
            <span className="quiz-screen__topic-name">{topic}</span>
          </div>
          <div className="quiz-screen__progress">
            <ProgressBar
              current={currentIndex + 1}
              total={questions.length}
              showPercentage={true}
            />
          </div>
        </div>

        <div className="quiz-screen__content">
          <QuestionCard
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedAnswer={answers[currentIndex]}
            onSelect={handleAnswerSelect}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
          />
        </div>

        <div className="quiz-screen__navigation">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={isFirstQuestion}
            className="quiz-screen__nav-button"
          >
            ← Previous
          </Button>

          <div className="quiz-screen__nav-info">
            <span className="quiz-screen__nav-text">
              {hasAnswered ? '✓ Answered' : 'Not answered'}
            </span>
          </div>

          {isLastQuestion ? (
            <Button
              onClick={handleFinish}
              variant="primary"
              disabled={!hasAnswered}
              className="quiz-screen__nav-button quiz-screen__nav-button--finish"
            >
              Finish Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="primary"
              disabled={!hasAnswered}
              className="quiz-screen__nav-button"
            >
              Next →
            </Button>
          )}
        </div>

        <div className="quiz-screen__footer">
          <div className="quiz-screen__stats">
            <div className="quiz-screen__stat">
              <span className="quiz-screen__stat-label">Answered:</span>
              <span className="quiz-screen__stat-value">
                {Object.keys(answers).length} / {questions.length}
              </span>
            </div>
            <div className="quiz-screen__stat">
              <span className="quiz-screen__stat-label">Progress:</span>
              <span className="quiz-screen__stat-value">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
