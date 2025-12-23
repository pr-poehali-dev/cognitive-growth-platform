import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ThinkingGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const ThinkingGame = ({ onComplete, onClose }: ThinkingGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const questions: Question[] = [
    {
      question: 'Что лишнее в этом ряду?',
      options: ['Яблоко', 'Груша', 'Морковь', 'Банан'],
      correct: 2,
      explanation: 'Морковь — это овощ, а остальные — фрукты',
    },
    {
      question: 'Как связаны слова "книга" и "страница"?',
      options: ['Часть целого', 'Противоположности', 'Синонимы', 'Рифма'],
      correct: 0,
      explanation: 'Страница — это часть книги',
    },
    {
      question: 'Если все розы — цветы, а некоторые цветы красные, то...',
      options: [
        'Все розы красные',
        'Некоторые розы могут быть красными',
        'Все цветы — розы',
        'Розы не могут быть красными',
      ],
      correct: 1,
      explanation: 'Мы знаем только, что розы — это цветы, но не все цветы — розы',
    },
    {
      question: 'Что может быть причиной того, что трава мокрая?',
      options: ['Прошёл дождь', 'Полили из шланга', 'Выпала роса', 'Всё вышеперечисленное'],
      correct: 3,
      explanation: 'Трава может быть мокрой по разным причинам',
    },
    {
      question: 'Какое слово не подходит к остальным?',
      options: ['Радость', 'Счастье', 'Веселье', 'Стол'],
      correct: 3,
      explanation: 'Стол — это предмет, а остальные слова описывают эмоции',
    },
  ];

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    if (answerIndex === questions[currentQuestion].correct) {
      setScore((prev) => prev + 25);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameStarted(false);
    onComplete(score);
  };

  if (!gameStarted) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">💡</div>
          <h2 className="text-3xl font-bold mb-4">Задачи на мышление</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Реши логические задачи и покажи свои навыки критического мышления. <br />
            Всего {questions.length} вопросов!
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={startGame} size="lg" className="text-lg px-8">
              Начать игру
            </Button>
            <Button onClick={onClose} variant="outline" size="lg">
              Назад
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (!gameStarted && currentQuestion >= questions.length) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-3xl font-bold mb-4">Отличная работа!</h2>
          <p className="text-5xl font-bold text-primary mb-4">{score} очков</p>
          <p className="text-lg text-muted-foreground mb-6">
            Правильных ответов: {score / 25} из {questions.length}
          </p>
          <Button onClick={onClose} size="lg" className="text-lg px-8">
            Завершить
          </Button>
        </div>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Очки</p>
          <p className="text-2xl font-bold text-primary">{score}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Вопрос</p>
          <p className="text-2xl font-bold">
            {currentQuestion + 1} / {questions.length}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl text-left text-lg font-medium transition-all ${
                showFeedback
                  ? index === question.correct
                    ? 'bg-green-100 text-green-700 border-2 border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-100 text-red-700 border-2 border-red-500'
                    : 'bg-gray-50 text-gray-400'
                  : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <div className="mb-6">
          <div
            className={`p-4 rounded-xl ${
              selectedAnswer === question.correct ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}
          >
            <p className="font-semibold mb-2">
              {selectedAnswer === question.correct ? '✓ Правильно!' : 'Объяснение:'}
            </p>
            <p>{question.explanation}</p>
          </div>
        </div>
      )}

      {showFeedback && (
        <Button onClick={nextQuestion} size="lg" className="w-full text-lg">
          {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
        </Button>
      )}
    </Card>
  );
};

export default ThinkingGame;
