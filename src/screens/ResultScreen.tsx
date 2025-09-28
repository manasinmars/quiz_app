import React, { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { generateFeedback } from '../services/aiService';
import Button from '../components/Button';
import Loader from '../components/Loader';
import './ResultScreen.css';

interface ResultScreenProps {
  onRestart?: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ onRestart }) => {
  const {
    questions,
    answers,
    score,
    topic,
    feedback,
    setFeedback,
    setTopic,
    setQuestions,
    setCurrentIndex,
    setAnswers,
    setScore
  } = useQuiz();

  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [error, setError] = useState<string>('');

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    const generateFeedbackMessage = async () => {
      if (!feedback && !isGeneratingFeedback) {
        setIsGeneratingFeedback(true);
        try {
          const response = await generateFeedback(score, totalQuestions, topic);
          if (response.error) {
            setError(response.error);
          } else if (response.feedback) {
            setFeedback(response.feedback);
          }
        } catch (err) {
          setError('Failed to generate feedback');
        } finally {
          setIsGeneratingFeedback(false);
        }
      }
    };

    generateFeedbackMessage();
  }, [score, totalQuestions, feedback, isGeneratingFeedback, setFeedback, topic]);

  const handleRestart = () => {
    // Reset all state
    setTopic('');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setScore(0);
    setFeedback('');
    setError('');
    onRestart?.();
  };

  const getScoreColor = () => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return 'Outstanding!';
    if (percentage >= 80) return 'Excellent!';
    if (percentage >= 70) return 'Great job!';
    if (percentage >= 60) return 'Good work!';
    if (percentage >= 50) return 'Not bad!';
    return 'Keep learning!';
  };

  const getScoreEmoji = () => {
    if (percentage >= 90) return '🎉';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '👍';
    if (percentage >= 60) return '👏';
    if (percentage >= 50) return '💪';
    return '📚';
  };

  return (
    <div className="result-screen">
      <div className="result-screen__container">
        <div className="result-screen__header">
          <h1 className="result-screen__title">Quiz Complete!</h1>
          <p className="result-screen__subtitle">
            Here's how you did on the {topic} quiz
          </p>
        </div>

        <div className="result-screen__score">
          <div className="result-screen__score-circle">
            <div 
              className="result-screen__score-fill"
              style={{ 
                '--score-color': getScoreColor(),
                '--percentage': percentage 
              } as React.CSSProperties}
            >
              <div className="result-screen__score-content">
                <span className="result-screen__score-emoji">
                  {getScoreEmoji()}
                </span>
                <span className="result-screen__score-percentage">
                  {percentage}%
                </span>
                <span className="result-screen__score-fraction">
                  {score}/{totalQuestions}
                </span>
              </div>
            </div>
          </div>
          <h2 className="result-screen__score-message">
            {getScoreMessage()}
          </h2>
        </div>

        <div className="result-screen__details">
          <div className="result-screen__detail-card">
            <h3>Correct Answers</h3>
            <p className="result-screen__detail-value">{score}</p>
          </div>
          <div className="result-screen__detail-card">
            <h3>Total Questions</h3>
            <p className="result-screen__detail-value">{totalQuestions}</p>
          </div>
          <div className="result-screen__detail-card">
            <h3>Accuracy</h3>
            <p className="result-screen__detail-value">{percentage}%</p>
          </div>
        </div>

        {isGeneratingFeedback && (
          <div className="result-screen__feedback-loading">
            <Loader 
              size="medium" 
              message="Generating personalized feedback..." 
            />
          </div>
        )}

        {feedback && !isGeneratingFeedback && (
          <div className="result-screen__feedback">
            <h3>AI Feedback</h3>
            <p className="result-screen__feedback-text">{feedback}</p>
          </div>
        )}

        {error && (
          <div className="result-screen__error">
            <p>{error}</p>
          </div>
        )}

        <div className="result-screen__actions">
          <Button
            onClick={handleRestart}
            variant="primary"
            size="large"
            className="result-screen__action-button"
          >
            Take Another Quiz
          </Button>
        </div>

        <div className="result-screen__breakdown">
          <h3>Question Breakdown</h3>
          <div className="result-screen__questions">
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.answer;
              
              return (
                <div 
                  key={index}
                  className={`result-screen__question ${
                    isCorrect ? 'result-screen__question--correct' : 'result-screen__question--incorrect'
                  }`}
                >
                  <div className="result-screen__question-header">
                    <span className="result-screen__question-number">
                      Q{index + 1}
                    </span>
                    <span className="result-screen__question-status">
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  <p className="result-screen__question-text">
                    {question.question}
                  </p>
                  <div className="result-screen__question-answers">
                    <div className="result-screen__answer">
                      <span className="result-screen__answer-label">Your answer:</span>
                      <span className="result-screen__answer-text">{userAnswer || 'Not answered'}</span>
                    </div>
                    {!isCorrect && (
                      <div className="result-screen__answer">
                        <span className="result-screen__answer-label">Correct answer:</span>
                        <span className="result-screen__answer-text">{question.answer}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
