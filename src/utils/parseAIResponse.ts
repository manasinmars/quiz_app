import { Question, AIResponse } from '../types';

export const safeParse = (text: string): AIResponse => {
  try {
    // Clean the text to extract JSON
    const cleanedText = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const parsed = JSON.parse(cleanedText);
    
    // Validate the structure
    if (Array.isArray(parsed)) {
      const questions: Question[] = parsed.map((item, index) => ({
        question: item.question || `Question ${index + 1}`,
        options: Array.isArray(item.options) ? item.options : ['A', 'B', 'C', 'D'],
        answer: item.answer || item.options?.[0] || 'A'
      }));
      
      return { questions };
    }
    
    return { error: 'Invalid response format' };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    return { error: 'Failed to parse response' };
  }
};

export const safeParseFeedback = (text: string): AIResponse => {
  try {
    const cleanedText = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const parsed = JSON.parse(cleanedText);
    
    if (parsed.feedback) {
      return { feedback: parsed.feedback };
    }
    
    // If it's just a string
    if (typeof parsed === 'string') {
      return { feedback: parsed };
    }
    
    return { error: 'Invalid feedback format' };
  } catch (error) {
    console.error('Failed to parse AI feedback:', error);
    return { error: 'Failed to parse feedback' };
  }
};

export const retryWithFallback = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  fallback: T
): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === maxRetries - 1) {
        return fallback;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return fallback;
};
