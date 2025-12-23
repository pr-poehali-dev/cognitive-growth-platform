import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReadingGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const ReadingGame = ({ onComplete, onClose }: ReadingGameProps) => {
  const [grid, setGrid] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameStarted, setGameStarted] = useState(false);
  const [gridSize, setGridSize] = useState(5);

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

  const generateGrid = () => {
    const numbers = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1);
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    setGrid(shuffled);
    setCurrentNumber(1);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    generateGrid();
  };

  const handleNumberClick = (number: number) => {
    if (number === currentNumber) {
      setScore((prev) => prev + 5);
      setCurrentNumber((prev) => prev + 1);
      
      if (currentNumber === gridSize * gridSize) {
        setGridSize((prev) => prev + 1);
        setTimeout(() => {
          generateGrid();
        }, 500);
      }
    } else {
      setScore((prev) => Math.max(0, prev - 2));
    }
  };

  const finishGame = () => {
    setGameStarted(false);
    onComplete(score);
  };

  if (!gameStarted && timeLeft === 45) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-3xl font-bold mb-4">Таблица Шульте</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Найди все числа по порядку от 1 до 25. <br />
            Эта игра развивает скорочтение и периферическое зрение!
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
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold mb-4">Отличный результат!</h2>
          <p className="text-5xl font-bold text-primary mb-4">{score} очков</p>
          <p className="text-lg text-muted-foreground mb-6">Размер сетки: {gridSize}×{gridSize}</p>
          <Button onClick={onClose} size="lg" className="text-lg px-8">
            Завершить
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Очки</p>
          <p className="text-2xl font-bold text-primary">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Найди число</p>
          <p className="text-5xl font-bold text-primary">{currentNumber}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Время</p>
          <p className={`text-2xl font-bold ${timeLeft < 10 ? 'text-destructive' : ''}`}>{timeLeft}с</p>
        </div>
      </div>

      <div
        className="grid gap-2 max-w-lg mx-auto"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((number, index) => (
          <button
            key={index}
            onClick={() => handleNumberClick(number)}
            className={`aspect-square rounded-lg text-xl md:text-2xl font-bold transition-all ${
              number < currentNumber
                ? 'bg-green-100 text-green-400 cursor-default'
                : number === currentNumber
                ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg hover:scale-105'
                : 'bg-white hover:bg-gray-50 text-gray-700 shadow hover:shadow-md'
            }`}
            disabled={number < currentNumber}
          >
            {number}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default ReadingGame;
