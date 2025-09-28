import React from 'react';
import './Loader.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  message = 'Loading...',
  className = '',
}) => {
  const sizeClasses = `loader--${size}`;
  const classes = `loader ${sizeClasses} ${className}`.trim();

  return (
    <div className={classes}>
      <div className="loader__spinner">
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
      </div>
      {message && <p className="loader__message">{message}</p>}
    </div>
  );
};

export default Loader;
