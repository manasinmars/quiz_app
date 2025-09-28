import React from 'react';
import './QuestionCard.css';

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  selectedAnswer,
  onSelect,
  questionNumber,
  totalQuestions,
  className = '',
}) => {
  const classes = `question-card ${className}`.trim();

  return (
    <div className={classes}>
      <div className="question-card__header">
        <span className="question-card__number">
          {questionNumber} / {totalQuestions}
        </span>
      </div>
      
      <div className="question-card__content">
        <h2 className="question-card__question">{question}</h2>
        
        <div className="question-card__options">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const optionClasses = `question-card__option ${
              isSelected ? 'question-card__option--selected' : ''
            }`.trim();
            
            return (
              <button
                key={index}
                className={optionClasses}
                onClick={() => onSelect(option)}
                type="button"
              >
                <span className="question-card__option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="question-card__option-text">{option}</span>
                {isSelected && (
                  <span className="question-card__option-check">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
