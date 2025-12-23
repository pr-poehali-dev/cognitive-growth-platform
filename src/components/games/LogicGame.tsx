import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LogicGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const LogicGame = ({ onComplete, onClose }: LogicGameProps) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const shapes = ['🔴', '🔵', '🟡', '🟢', '🟣', '⭐', '❤️', '🔶'];

  const generateSequence = () => {
    const patternLength = 3 + level;
    const pattern: string[] = [];
    
    const selectedShapes = shapes.slice(0, Math.min(3 + level, shapes.length));
    
    for (let i = 0; i < patternLength; i++) {
      pattern.push(selectedShapes[i % selectedShapes.length]);
    }
    
    setSequence(pattern);
    
    const nextInSequence = selectedShapes[pattern.length % selectedShapes.length];
    setCorrectAnswer(nextInSequence);
    
    const wrongOptions = selectedShapes.filter((s) => s !== nextInSequence);
    const shuffled = [nextInSequence, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setFeedback(null);
  };

  useEffect(() => {
    if (gameStarted) {
      generateSequence();
    }
  }, [level, gameStarted]);

  const handleAnswer = (answer: string) => {
    if (answer === correctAnswer) {
      setFeedback('correct');
      setScore((prev) => prev + level * 15);
      setTimeout(() => {
        setLevel((prev) => prev + 1);
      }, 1000);
    } else {
      setFeedback('wrong');
      setScore((prev) => Math.max(0, prev - 10));
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLevel(1);
  };

  const finishGame = () => {
    setGameStarted(false);
    onComplete(score);
  };

  if (!gameStarted) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🧩</div>
          <h2 className="text-3xl font-bold mb-4">Продолжи последовательность</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Найди закономерность и выбери следующий элемент в ряду. <br />
            С каждым уровнем задачи становятся сложнее!
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

  if (level > 10) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold mb-4">Невероятно!</h2>
          <p className="text-5xl font-bold text-primary mb-4">{score} очков</p>
          <p className="text-lg text-muted-foreground mb-6">Ты прошёл все 10 уровней!</p>
          <Button onClick={finishGame} size="lg" className="text-lg px-8">
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
          <p className="text-sm text-muted-foreground">Уровень</p>
          <p className="text-2xl font-bold">{level} / 10</p>
        </div>
        <Button onClick={finishGame} variant="outline">
          Завершить
        </Button>
      </div>

      <div className="mb-8">
        <p className="text-center text-lg font-semibold mb-4">Какой элемент будет следующим?</p>
        <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
          {sequence.map((shape, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-4xl shadow-sm"
            >
              {shape}
            </div>
          ))}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl font-bold border-2 border-dashed border-primary">
            ?
          </div>
        </div>
      </div>

      {feedback && (
        <div
          className={`text-center py-4 rounded-xl mb-6 ${
            feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          <p className="text-lg font-bold">{feedback === 'correct' ? '✓ Правильно!' : '✗ Попробуй ещё раз'}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={feedback !== null}
            className="aspect-square bg-white hover:bg-gray-50 rounded-2xl flex items-center justify-center text-5xl shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {option}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default LogicGame;
