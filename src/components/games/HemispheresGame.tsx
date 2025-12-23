import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HemispheresGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface ColorWord {
  text: string;
  color: string;
}

const HemispheresGame = ({ onComplete, onClose }: HemispheresGameProps) => {
  const [currentWord, setCurrentWord] = useState<ColorWord>({ text: '', color: '' });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);

  const colors = [
    { name: 'КРАСНЫЙ', value: 'text-red-600' },
    { name: 'СИНИЙ', value: 'text-blue-600' },
    { name: 'ЗЕЛЁНЫЙ', value: 'text-green-600' },
    { name: 'ЖЁЛТЫЙ', value: 'text-yellow-600' },
    { name: 'ФИОЛЕТОВЫЙ', value: 'text-purple-600' },
  ];

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      finishGame();
    }
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    if (gameStarted) {
      generateWord();
    }
  }, [gameStarted, score]);

  const generateWord = () => {
    const randomText = colors[Math.floor(Math.random() * colors.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentWord({
      text: randomText.name,
      color: randomColor.value,
    });
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
  };

  const handleAnswer = (isColorCorrect: boolean) => {
    const textMatches = currentWord.text === colors.find((c) => c.value === currentWord.color)?.name;
    
    if ((isColorCorrect && textMatches) || (!isColorCorrect && !textMatches)) {
      const points = 10 + Math.floor(streak / 3) * 5;
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setStreak(0);
    }
  };

  const finishGame = () => {
    setGameStarted(false);
    onComplete(score);
  };

  if (!gameStarted && timeLeft === 40) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🧩</div>
          <h2 className="text-3xl font-bold mb-4">Цвет и слово</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Нажми "Совпадает", если цвет текста совпадает с написанным словом. <br />
            Нажми "Не совпадает", если цвет и слово разные. <br />
            Тренирует оба полушария мозга одновременно!
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

  if (!gameStarted && timeLeft === 0) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-3xl font-bold mb-4">Потрясающе!</h2>
          <p className="text-5xl font-bold text-primary mb-4">{score} очков</p>
          <p className="text-lg text-muted-foreground mb-6">Оба полушария работали на отлично!</p>
          <Button onClick={onClose} size="lg" className="text-lg px-8">
            Завершить
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-muted-foreground">Очки</p>
          <p className="text-2xl font-bold text-primary">{score}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Серия</p>
          <p className="text-2xl font-bold">{streak} 🔥</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Время</p>
          <p className={`text-2xl font-bold ${timeLeft < 10 ? 'text-destructive' : ''}`}>{timeLeft}с</p>
        </div>
      </div>

      <div className="text-center mb-12">
        <p className="text-lg text-muted-foreground mb-6">Совпадает ли цвет текста с написанным словом?</p>
        <div className="bg-gray-50 rounded-3xl p-12 mb-8 inline-block">
          <p className={`text-7xl font-bold ${currentWord.color}`}>{currentWord.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
        <Button
          onClick={() => handleAnswer(true)}
          size="lg"
          className="h-24 text-2xl bg-green-500 hover:bg-green-600"
        >
          ✓ Совпадает
        </Button>
        <Button
          onClick={() => handleAnswer(false)}
          size="lg"
          variant="destructive"
          className="h-24 text-2xl"
        >
          ✗ Не совпадает
        </Button>
      </div>
    </Card>
  );
};

export default HemispheresGame;
