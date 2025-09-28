import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  current: number;
  total: number;
  showPercentage?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showPercentage = true,
  className = '',
}) => {
  const percentage = Math.min((current / total) * 100, 100);
  const classes = `progress-bar ${className}`.trim();

  return (
    <div className={classes}>
      <div className="progress-bar__info">
        <span className="progress-bar__label">
          Question {current} of {total}
        </span>
        {showPercentage && (
          <span className="progress-bar__percentage">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
