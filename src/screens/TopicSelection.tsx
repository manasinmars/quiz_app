import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { generateQuestions } from '../services/aiService';
import Button from '../components/Button';
import Loader from '../components/Loader';
import './TopicSelection.css';

const TOPICS = [
  {
    id: 'Wellness',
    title: 'Wellness',
    description: 'Health, fitness, and lifestyle questions',
    icon: '🏃‍♀️',
    color: '#10b981'
  },
  {
    id: 'Tech Trends',
    title: 'Tech Trends',
    description: 'AI, blockchain, and modern technology',
    icon: '💻',
    color: '#3b82f6'
  },
  {
    id: 'History',
    title: 'History',
    description: 'Historical events and figures',
    icon: '📚',
    color: '#8b5cf6'
  },
  {
    id: 'Science',
    title: 'Science',
    description: 'Physics, chemistry, and biology',
    icon: '🔬',
    color: '#f59e0b'
  },
  {
    id: 'Geography',
    title: 'Geography',
    description: 'Countries, capitals, and landmarks',
    icon: '🌍',
    color: '#06b6d4'
  },
  {
    id: 'Sports',
    title: 'Sports',
    description: 'Athletes, teams, and competitions',
    icon: '⚽',
    color: '#ef4444'
  }
];

const TopicSelection: React.FC = () => {
  const { setTopic, setIsLoading, setQuestions, setCurrentIndex, setAnswers, setScore, setFeedback, isLoading } = useQuiz();
  const [error, setError] = useState<string>('');

  const handleTopicSelect = async (topicId: string) => {
    try {
      console.log('Topic selected:', topicId);
      setError('');
      setIsLoading(true);
      setTopic(topicId);
      
      // Reset quiz state
      setCurrentIndex(0);
      setAnswers({});
      setScore(0);
      setFeedback('');
      
      console.log('Generating questions...');
      const response = await generateQuestions(topicId);
      console.log('Response received:', response);
      
      if (response.error) {
        console.error('Error in response:', response.error);
        setError(response.error);
        setIsLoading(false);
        return;
      }
      
      if (response.questions) {
        console.log('Questions generated:', response.questions);
        setQuestions(response.questions);
        setIsLoading(false);
        // Navigation will be handled by parent component
      } else {
        console.error('No questions in response');
        setError('No questions generated. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error in handleTopicSelect:', err);
      setError('Failed to generate questions. Please try again.');
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="topic-selection">
        <div className="topic-selection__container">
          <div className="topic-selection__error">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <Button onClick={() => setError('')} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-selection">
      <div className="topic-selection__container">
        <div className="topic-selection__header">
          <h1 className="topic-selection__title">
            Choose Your Quiz Topic
          </h1>
          <p className="topic-selection__subtitle">
            Select a topic and test your knowledge with AI-generated questions
          </p>
        </div>

        <div className="topic-selection__grid">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              className="topic-selection__card"
              onClick={() => handleTopicSelect(topic.id)}
              disabled={isLoading}
              style={{ '--topic-color': topic.color } as React.CSSProperties}
            >
              <div className="topic-selection__card-icon">
                {topic.icon}
              </div>
              <h3 className="topic-selection__card-title">
                {topic.title}
              </h3>
              <p className="topic-selection__card-description">
                {topic.description}
              </p>
              <div className="topic-selection__card-arrow">
                →
              </div>
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="topic-selection__loading">
            <Loader 
              size="large" 
              message="AI is generating your quiz questions..." 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicSelection;
