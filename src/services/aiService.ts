import { AIResponse } from '../types';
import { safeParse, safeParseFeedback, retryWithFallback } from '../utils/parseAIResponse';

// Google Gemini API configuration
const AI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const AI_API_KEY = 'AIzaSyDpYZhkXFqnWgsgVT7SPOm2pzNQySXk1-A';

// Fallback questions for when API fails
const fallbackQuestions: Record<string, any[]> = {
  'Wellness': [
    {
      question: "What is the recommended daily water intake for adults?",
      options: ["6-8 glasses", "10-12 glasses", "4-6 glasses", "8-10 glasses"],
      answer: "8-10 glasses"
    },
    {
      question: "Which vitamin is primarily obtained from sunlight?",
      options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
      answer: "Vitamin D"
    },
    {
      question: "What is the recommended amount of sleep for adults?",
      options: ["6-7 hours", "7-9 hours", "9-10 hours", "5-6 hours"],
      answer: "7-9 hours"
    },
    {
      question: "Which exercise is best for cardiovascular health?",
      options: ["Weight lifting", "Running", "Yoga", "Stretching"],
      answer: "Running"
    },
    {
      question: "What percentage of the human body is water?",
      options: ["50-60%", "60-70%", "70-80%", "40-50%"],
      answer: "60-70%"
    }
  ],
  'Tech Trends': [
    {
      question: "What does AI stand for?",
      options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Integration", "Algorithmic Intelligence"],
      answer: "Artificial Intelligence"
    },
    {
      question: "Which technology is used for decentralized digital currencies?",
      options: ["Cloud Computing", "Blockchain", "Machine Learning", "IoT"],
      answer: "Blockchain"
    },
    {
      question: "What is the primary purpose of machine learning?",
      options: ["Data storage", "Pattern recognition", "Network security", "User interface design"],
      answer: "Pattern recognition"
    },
    {
      question: "Which company developed ChatGPT?",
      options: ["Google", "Microsoft", "OpenAI", "Meta"],
      answer: "OpenAI"
    },
    {
      question: "What does IoT stand for?",
      options: ["Internet of Things", "Integration of Technology", "Intelligent Operations Tool", "Internet Operations Team"],
      answer: "Internet of Things"
    }
  ],
  'History': [
    {
      question: "When did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      answer: "1945"
    },
    {
      question: "Who was the first person to walk on the moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
      answer: "Neil Armstrong"
    },
    {
      question: "Which ancient wonder was located in Alexandria?",
      options: ["Hanging Gardens", "Lighthouse", "Colossus", "Mausoleum"],
      answer: "Lighthouse"
    },
    {
      question: "In which year did the Berlin Wall fall?",
      options: ["1987", "1988", "1989", "1990"],
      answer: "1989"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
      answer: "Leonardo da Vinci"
    }
  ],
  'Science': [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      answer: "Au"
    },
    {
      question: "What is the speed of light in vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      answer: "300,000 km/s"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the smallest unit of matter?",
      options: ["Molecule", "Atom", "Electron", "Proton"],
      answer: "Atom"
    },
    {
      question: "What gas makes up most of Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Nitrogen"
    }
  ],
  'Geography': [
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      answer: "Canberra"
    },
    {
      question: "Which is the largest ocean?",
      options: ["Atlantic", "Pacific", "Indian", "Arctic"],
      answer: "Pacific"
    },
    {
      question: "What is the longest river in the world?",
      options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
      answer: "Nile"
    },
    {
      question: "Which country has the most time zones?",
      options: ["Russia", "United States", "China", "Brazil"],
      answer: "Russia"
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "Liechtenstein", "San Marino"],
      answer: "Vatican City"
    }
  ],
  'Sports': [
    {
      question: "How many players are on a basketball team?",
      options: ["4", "5", "6", "7"],
      answer: "5"
    },
    {
      question: "Which sport is played at Wimbledon?",
      options: ["Tennis", "Golf", "Cricket", "Badminton"],
      answer: "Tennis"
    },
    {
      question: "What is the duration of a football (soccer) match?",
      options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
      answer: "90 minutes"
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["Germany", "Brazil", "France", "Argentina"],
      answer: "France"
    },
    {
      question: "In which sport would you perform a slam dunk?",
      options: ["Volleyball", "Basketball", "Tennis", "Badminton"],
      answer: "Basketball"
    }
  ]
};

export const generateQuestions = async (topic: string): Promise<AIResponse> => {
  return retryWithFallback(
    async () => {
      try {
        const prompt = `Generate 5 multiple-choice questions about ${topic}.
Return ONLY JSON in this format:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "correct_option_text"
  }
]`;

        console.log('Generating questions for topic:', topic);
        
        const response = await fetch(`${AI_API_URL}?key=${AI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          }),
        });

        console.log('API Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response data:', data);
        
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        if (!text) {
          throw new Error('No response from AI');
        }

        console.log('AI Generated text:', text);
        return safeParse(text);
      } catch (error) {
        console.error('Error in generateQuestions:', error);
        throw error;
      }
    },
    3,
    { error: 'Failed to generate questions. Please try again.' }
  ).catch(() => {
    // Fallback to predefined questions if API fails
    console.log('Using fallback questions for topic:', topic);
    const questions = fallbackQuestions[topic] || fallbackQuestions['Tech Trends'];
    return { questions };
  });
};

export const generateFeedback = async (score: number, total: number, topic: string): Promise<AIResponse> => {
  return retryWithFallback(
    async () => {
      const percentage = Math.round((score / total) * 100);
      const prompt = `Generate a personalized, encouraging feedback message for a quiz score of ${score}/${total} (${percentage}%) in ${topic}.
The feedback should be motivational and specific to the topic. Keep it concise but engaging.
Return ONLY JSON in this format:
{
  "feedback": "Your personalized feedback message here"
}`;

      const response = await fetch(`${AI_API_URL}?key=${AI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      if (!text) {
        throw new Error('No response from AI');
      }

      return safeParseFeedback(text);
    },
    3,
    { error: 'Failed to generate feedback' }
  ).catch(() => {
    // Fallback feedback if API fails
    const percentage = Math.round((score / total) * 100);
    let feedback: string;
    
    if (percentage >= 90) {
      feedback = "Outstanding! You're a true expert in this field! 🌟";
    } else if (percentage >= 80) {
      feedback = "Excellent work! You have a strong understanding of the topic! 🎉";
    } else if (percentage >= 70) {
      feedback = "Great job! You're well on your way to mastering this subject! 👍";
    } else if (percentage >= 60) {
      feedback = "Good effort! Keep learning and you'll improve even more! 📚";
    } else if (percentage >= 50) {
      feedback = "Not bad! There's always room for growth and learning! 💪";
    } else {
      feedback = "Keep studying! Every expert was once a beginner! 🚀";
    }
    
    return { feedback };
  });
};

