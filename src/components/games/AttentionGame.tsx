import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AttentionGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const AttentionGame = ({ onComplete, onClose }: AttentionGameProps) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetShape, setTargetShape] = useState<string>('');
  const [shapes, setShapes] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  const shapeOptions = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'];

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      finishGame();
    }
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setGameActive(true);
    generateLevel();
  };

  const generateLevel = () => {
    const target = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
    setTargetShape(target);
    
    const gridSize = 16 + level * 4;
    const newShapes: string[] = [];
    const targetCount = 2 + level;
    
    for (let i = 0; i < targetCount; i++) {
      newShapes.push(target);
    }
    
    while (newShapes.length < gridSize) {
      const randomShape = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
      if (randomShape !== target) {
        newShapes.push(randomShape);
      }
    }
    
    setShapes(newShapes.sort(() => Math.random() - 0.5));
  };

  const handleShapeClick = (shape: string, index: number) => {
    if (!gameActive) return;
    
    if (shape === targetShape) {
      setScore((prev) => prev + 10);
      const newShapes = [...shapes];
      newShapes[index] = '✓';
      setShapes(newShapes);
      
      const remainingTargets = newShapes.filter((s) => s === targetShape).length;
      if (remainingTargets === 0) {
        setLevel((prev) => prev + 1);
        setTimeout(() => {
          generateLevel();
        }, 500);
      }
    } else {
      setScore((prev) => Math.max(0, prev - 5));
    }
  };

  const finishGame = () => {
    setGameActive(false);
    onComplete(score);
  };

  if (!gameActive && timeLeft === 30) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">👁️</div>
          <h2 className="text-3xl font-bold mb-4">Найди все фигуры!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Найди и нажми на все фигуры указанного цвета. <br />
            Будь внимателен — за ошибки снимаются очки!
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

  if (!gameActive && timeLeft === 0) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Отличная работа!</h2>
          <p className="text-5xl font-bold text-primary mb-4">{score} очков</p>
          <p className="text-lg text-muted-foreground mb-6">Уровень достигнут: {level}</p>
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
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Очки</p>
            <p className="text-2xl font-bold text-primary">{score}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Уровень</p>
            <p className="text-2xl font-bold">{level}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Найди все</p>
          <p className="text-5xl">{targetShape}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Время</p>
          <p className={`text-2xl font-bold ${timeLeft < 10 ? 'text-destructive' : ''}`}>{timeLeft}с</p>
        </div>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-8 gap-2 mb-4">
        {shapes.map((shape, index) => (
          <button
            key={index}
            onClick={() => handleShapeClick(shape, index)}
            className={`aspect-square text-3xl md:text-4xl rounded-lg transition-all hover:scale-110 ${
              shape === '✓'
                ? 'bg-green-100 text-green-600 cursor-default'
                : 'bg-gray-50 hover:bg-gray-100 active:scale-95'
            }`}
            disabled={shape === '✓'}
          >
            {shape}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default AttentionGame;
