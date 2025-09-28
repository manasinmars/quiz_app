# AI-Assisted Knowledge Quiz

A modern, interactive quiz application built with React and TypeScript that uses AI to generate questions and provide personalized feedback.

## Features

- 🎯 **Topic Selection**: Choose from various topics like Wellness, Tech Trends, History, and more
- 🤖 **AI-Generated Questions**: Dynamic question generation using AI services
- 📊 **Interactive Quiz**: Navigate through questions with progress tracking
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 📱 **Mobile-First**: Optimized for all device sizes
- 🎉 **Personalized Feedback**: AI-generated feedback based on your performance
- 📈 **Detailed Results**: Complete breakdown of your quiz performance

## Tech Stack

- **React 18** with TypeScript
- **Context API** for state management
- **CSS3** with modern features (Grid, Flexbox, Custom Properties)
- **Mock AI Service** (easily replaceable with real AI APIs)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Loader.tsx
│   ├── ProgressBar.tsx
│   └── QuestionCard.tsx
├── screens/            # Main application screens
│   ├── TopicSelection.tsx
│   ├── QuizScreen.tsx
│   └── ResultScreen.tsx
├── context/            # Global state management
│   └── QuizContext.tsx
├── services/           # AI service integration
│   └── aiService.ts
├── utils/              # Utility functions
│   └── parseAIResponse.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-quiz-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Configuration

### AI Service Integration

The app currently uses a mock AI service for demonstration. To integrate with a real AI service:

1. Update `src/services/aiService.ts`
2. Uncomment the real AI service implementation
3. Set your API URL and key in environment variables:
   ```bash
   REACT_APP_AI_API_URL=your_api_url
   REACT_APP_AI_API_KEY=your_api_key
   ```

### Adding New Topics

To add new quiz topics, update the `TOPICS` array in `src/screens/TopicSelection.tsx`:

```typescript
const TOPICS = [
  // ... existing topics
  {
    id: 'YourTopic',
    title: 'Your Topic',
    description: 'Description of your topic',
    icon: '🎯',
    color: '#your-color'
  }
];
```

## Features in Detail

### 1. Topic Selection Screen
- Grid layout of available topics
- Hover effects and smooth transitions
- Loading states during AI question generation
- Error handling with retry functionality

### 2. Quiz Screen
- One question at a time display
- Progress bar showing completion percentage
- Previous/Next navigation
- Answer selection with visual feedback
- Real-time statistics

### 3. Results Screen
- Circular progress indicator
- Detailed score breakdown
- AI-generated personalized feedback
- Question-by-question review
- Option to restart quiz

### 4. Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## Customization

### Styling
- All styles are in individual CSS files
- CSS Custom Properties for easy theming
- Consistent design system across components

### State Management
- React Context for global state
- Type-safe state updates
- Easy to extend with additional features

### AI Integration
- Modular service architecture
- Error handling and retry logic
- Easy to swap AI providers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- React team for the amazing framework
- TypeScript team for excellent type safety
- All contributors and testers
