import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MemoryGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = ({ onComplete, onClose }: MemoryGameProps) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const emojis = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉', '🍑', '🥝'];

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
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setTimeout(() => finishGame(), 1000);
    }
  }, [cards]);

  const initializeGame = () => {
    const selectedEmojis = emojis.slice(0, 8);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    const shuffled = cardPairs
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setGameStarted(true);
    setScore(0);
    setMoves(0);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      const firstCard = newCards.find((c) => c.id === first);
      const secondCard = newCards.find((c) => c.id === second);

      if (firstCard?.emoji === secondCard?.emoji) {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === first || c.id === second ? { ...c, isMatched: true } : c
            )
          );
          setScore((prev) => prev + 20);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === first || c.id === second ? { ...c, isFlipped: false } : c
            )
          );
          setScore((prev) => Math.max(0, prev - 5));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const finishGame = () => {
    setGameStarted(false);
    const finalScore = Math.max(0, score - moves * 2);
    onComplete(finalScore);
  };

  if (!gameStarted && cards.length === 0) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-3xl font-bold mb-4">Парные карточки</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Найди все пары одинаковых карточек. <br />
            Чем меньше ходов — тем больше очков!
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={initializeGame} size="lg" className="text-lg px-8">
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

  if (!gameStarted && cards.length > 0) {
    const finalScore = Math.max(0, score - moves * 2);
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Молодец!</h2>
          <p className="text-5xl font-bold text-primary mb-4">{finalScore} очков</p>
          <p className="text-lg text-muted-foreground mb-6">Ходов сделано: {moves}</p>
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
        <div>
          <p className="text-sm text-muted-foreground">Ходы</p>
          <p className="text-2xl font-bold">{moves}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Время</p>
          <p className={`text-2xl font-bold ${timeLeft < 10 ? 'text-destructive' : ''}`}>{timeLeft}с</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-2xl text-5xl flex items-center justify-center transition-all transform ${
              card.isFlipped || card.isMatched
                ? 'bg-white shadow-lg'
                : 'bg-gradient-to-br from-blue-500 to-purple-500 hover:scale-105 active:scale-95'
            } ${card.isMatched ? 'opacity-50' : ''}`}
            disabled={card.isMatched}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '?'}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default MemoryGame;
