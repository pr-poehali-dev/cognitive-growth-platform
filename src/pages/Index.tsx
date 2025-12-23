import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedTasks: number;
  achievements: string[];
}

interface TrainingCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  tasks: number;
}

const Index = () => {
  const [userProgress] = useState<UserProgress>({
    level: 5,
    xp: 340,
    xpToNextLevel: 500,
    completedTasks: 47,
    achievements: ['Первый шаг', 'Неделя подряд', 'Мастер внимания'],
  });

  const categories: TrainingCategory[] = [
    {
      id: 'attention',
      name: 'Внимание',
      icon: 'Eye',
      color: 'bg-blue-500',
      description: 'Упражнения на концентрацию и фокус',
      tasks: 12,
    },
    {
      id: 'memory',
      name: 'Память',
      icon: 'Brain',
      color: 'bg-purple-500',
      description: 'Развитие кратковременной и долговременной памяти',
      tasks: 15,
    },
    {
      id: 'hemispheres',
      name: 'Межполушарные связи',
      icon: 'Puzzle',
      color: 'bg-pink-500',
      description: 'Синхронизация работы полушарий мозга',
      tasks: 10,
    },
    {
      id: 'reading',
      name: 'Скорочтение',
      icon: 'BookOpen',
      color: 'bg-green-500',
      description: 'Увеличение скорости чтения и понимания',
      tasks: 8,
    },
    {
      id: 'thinking',
      name: 'Мышление',
      icon: 'Lightbulb',
      color: 'bg-yellow-500',
      description: 'Развитие креативного и критического мышления',
      tasks: 11,
    },
    {
      id: 'logic',
      name: 'Логика',
      icon: 'Boxes',
      color: 'bg-orange-500',
      description: 'Решение логических задач и головоломок',
      tasks: 13,
    },
  ];

  const achievements = [
    { name: 'Первый шаг', icon: 'Star', earned: true },
    { name: 'Неделя подряд', icon: 'Calendar', earned: true },
    { name: 'Мастер внимания', icon: 'Eye', earned: true },
    { name: 'Гений памяти', icon: 'Brain', earned: false },
    { name: 'Марафонец', icon: 'Trophy', earned: false },
    { name: 'Чемпион логики', icon: 'Award', earned: false },
  ];

  const leaderboard = [
    { name: 'Алиса М.', level: 12, xp: 2450, rank: 1 },
    { name: 'Максим К.', level: 10, xp: 2100, rank: 2 },
    { name: 'София Л.', level: 9, xp: 1890, rank: 3 },
    { name: 'Ты', level: userProgress.level, xp: userProgress.xp, rank: 15 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">КогниКидс 🧠</h1>
              <p className="text-muted-foreground text-lg">Платформа развития когнитивных способностей</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Icon name="Zap" size={20} className="mr-2" />
                {userProgress.xp} XP
              </Badge>
              <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500">
                Уровень {userProgress.level}
              </Badge>
            </div>
          </div>

          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-lg">Прогресс до следующего уровня</span>
              <span className="text-muted-foreground">
                {userProgress.xp} / {userProgress.xpToNextLevel} XP
              </span>
            </div>
            <Progress value={(userProgress.xp / userProgress.xpToNextLevel) * 100} className="h-4" />
          </Card>
        </header>

        <Tabs defaultValue="training" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-14">
            <TabsTrigger value="training" className="text-base">
              <Icon name="Dumbbell" size={20} className="mr-2" />
              Тренировка
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-base">
              <Icon name="TrendingUp" size={20} className="mr-2" />
              Прогресс
            </TabsTrigger>
            <TabsTrigger value="rating" className="text-base">
              <Icon name="Trophy" size={20} className="mr-2" />
              Рейтинг
            </TabsTrigger>
            <TabsTrigger value="help" className="text-base">
              <Icon name="HelpCircle" size={20} className="mr-2" />
              Справка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 bg-white/80 backdrop-blur"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${category.color} rounded-2xl p-4 text-white`}>
                      <Icon name={category.icon as any} size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-1">{category.name}</h3>
                      <Badge variant="outline">{category.tasks} заданий</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button className="w-full text-lg py-6" size="lg">
                    Начать тренировку
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="CheckCircle2" size={32} />
                  <span className="text-4xl font-bold">{userProgress.completedTasks}</span>
                </div>
                <p className="text-blue-100 text-lg">Выполненных заданий</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Target" size={32} />
                  <span className="text-4xl font-bold">{userProgress.level}</span>
                </div>
                <p className="text-purple-100 text-lg">Текущий уровень</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Award" size={32} />
                  <span className="text-4xl font-bold">{userProgress.achievements.length}</span>
                </div>
                <p className="text-green-100 text-lg">Достижений получено</p>
              </Card>
            </div>

            <Card className="p-6 bg-white/80 backdrop-blur">
              <h3 className="text-2xl font-bold mb-6">Твои достижения</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.name}
                    className={`p-6 rounded-2xl text-center transition-all ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg animate-scale-in'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Icon name={achievement.icon as any} size={48} className="mx-auto mb-3" />
                    <p className="font-semibold">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur">
              <h3 className="text-2xl font-bold mb-6">Прогресс по категориям</h3>
              <div className="space-y-6">
                {categories.map((category) => {
                  const progress = Math.floor(Math.random() * 100);
                  return (
                    <div key={category.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`${category.color} rounded-lg p-2 text-white`}>
                            <Icon name={category.icon as any} size={20} />
                          </div>
                          <span className="font-semibold">{category.name}</span>
                        </div>
                        <span className="text-muted-foreground">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rating" className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-white/80 backdrop-blur">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Trophy" size={28} className="text-yellow-500" />
                Таблица лидеров
              </h3>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      player.name === 'Ты'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div
                      className={`text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center ${
                        player.rank === 1
                          ? 'bg-yellow-400 text-yellow-900'
                          : player.rank === 2
                          ? 'bg-gray-300 text-gray-700'
                          : player.rank === 3
                          ? 'bg-orange-400 text-orange-900'
                          : player.name === 'Ты'
                          ? 'bg-white text-purple-600'
                          : 'bg-white text-gray-600'
                      }`}
                    >
                      {player.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg">{player.name}</p>
                      <p className={player.name === 'Ты' ? 'text-blue-100' : 'text-muted-foreground'}>
                        Уровень {player.level} • {player.xp} XP
                      </p>
                    </div>
                    {player.rank <= 3 && (
                      <Icon
                        name="Medal"
                        size={32}
                        className={
                          player.rank === 1
                            ? 'text-yellow-500'
                            : player.rank === 2
                            ? 'text-gray-400'
                            : 'text-orange-500'
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4">Твоё место в рейтинге</h3>
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <div className="text-6xl font-bold text-primary mb-2">15</div>
                <p className="text-muted-foreground text-lg mb-4">место из 150 участников</p>
                <p className="text-sm text-muted-foreground">
                  До топ-10 нужно ещё <span className="font-bold text-primary">230 XP</span>
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-white/80 backdrop-blur">
              <h3 className="text-2xl font-bold mb-6">Как пользоваться платформой?</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-100 rounded-full p-3 h-fit">
                    <Icon name="Dumbbell" size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Выбирай тренировки</h4>
                    <p className="text-muted-foreground">
                      Выбери категорию навыка, который хочешь развить. Каждая тренировка содержит упражнения разной
                      сложности.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-100 rounded-full p-3 h-fit">
                    <Icon name="Star" size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Зарабатывай опыт</h4>
                    <p className="text-muted-foreground">
                      За каждое выполненное задание ты получаешь XP. Накапливай опыт, чтобы повышать уровень и
                      открывать новые достижения.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-100 rounded-full p-3 h-fit">
                    <Icon name="TrendingUp" size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Отслеживай прогресс</h4>
                    <p className="text-muted-foreground">
                      Смотри свою статистику в разделе "Прогресс" и следи за развитием каждого навыка.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-yellow-100 rounded-full p-3 h-fit">
                    <Icon name="Trophy" size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Соревнуйся с друзьями</h4>
                    <p className="text-muted-foreground">
                      Проверяй своё место в рейтинге и старайся попасть в топ лучших учеников!
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-500 to-pink-500 text-white">
              <h3 className="text-2xl font-bold mb-3">💡 Совет дня</h3>
              <p className="text-lg text-orange-50">
                Занимайся регулярно по 15-20 минут в день — это лучше, чем один длинный сеанс в неделю. Твой мозг
                лучше усваивает информацию при регулярных тренировках!
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
