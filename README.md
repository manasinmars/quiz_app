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

## Implementation Notes

### Prompts Used and Refinements

Questions prompt (sent to AI):

```text
Generate 5 multiple-choice questions about <TOPIC>.
Return ONLY JSON in this format:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "correct_option_text"
  }
]
```

Feedback prompt (sent to AI):

```text
Generate a personalized, encouraging feedback message for a quiz score of <SCORE>/<TOTAL> (<PERCENTAGE>%) in <TOPIC>.
The feedback should be motivational and specific to the topic. Keep it concise but engaging.
Return ONLY JSON in this format:
{
  "feedback": "Your personalized feedback message here"
}
```

Refinements and safeguards:
- The AI response is cleaned to remove code fences and then parsed via `utils/parseAIResponse.ts`.
- Strict structure validation; if malformed, a controlled error is returned and a retry mechanism is used (`retryWithFallback`).
- If retries still fail (e.g., CORS/network), a local fallback provides deterministic questions and feedback so the app remains usable.

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

- `components/`: Pure, reusable UI elements (`Button`, `Loader`, `ProgressBar`, `QuestionCard`).
- `screens/`: Feature-level pages orchestrating UI and behavior (`TopicSelection`, `QuizScreen`, `ResultScreen`).
- `context/QuizContext.tsx`: Centralized app state (topic, questions, answers, score, loading, feedback). Context was chosen over Redux/Zustand due to the small surface area, simple data flow, and need for cross-screen access without prop drilling.
- `services/aiService.ts`: Boundary to the AI provider (Gemini). Encapsulates request/response, retries, and fallbacks.
- `utils/parseAIResponse.ts`: Parsing, validation, and retry utilities to enforce JSON-only contracts from AI.
- `App.tsx`: Minimal step-based navigation (topic -> quiz -> result) driven by state, avoiding router overhead.

State choices:
- Answers stored as `Record<number, string>` keyed by question index for O(1) updates.
- `currentIndex` controls navigation and progress; derived progress avoids duplicate state.
- `isLoading` lives in context so screens/components can reflect global loading states consistently.


### Known Issues and Potential Improvements

Known issues:
- Calling Gemini directly from the browser can hit CORS or expose the API key. A thin backend proxy is recommended for production.
- AI responses can still occasionally deviate from spec; we mitigate with parsing and fallbacks, but a schema-based validator (e.g., Zod) would be stronger.
- The progress and navigation assume a fixed set of 5 MCQs; dynamic counts are supported but lightly tested.

Potential improvements:
- Add a small Node/Express proxy with server-side API key storage and rate limiting.
- Strengthen validation with Zod schemas and richer error reporting.
- Persist quiz attempts to `localStorage` and/or an API for history and analytics.
- Shuffle options per question and randomize question order with a stable seed.
- Add accessibility enhancements (roving tabindex for options, ARIA live regions for feedback).
- Add unit tests for `utils` and integration tests for screen flows.
- Internationalization (i18n) and right-to-left (RTL) layout support.
- Theme switch (light/dark) and configurable color tokens.



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

