
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Weight, Calendar } from 'lucide-react';
import type { Exercise } from '@/pages/Index';

interface WorkoutStatsProps {
  exercises: Exercise[];
}

const WorkoutStats = ({ exercises }: WorkoutStatsProps) => {
  const today = new Date().toISOString().split('T')[0];
  const todayExercises = exercises.filter(ex => ex.date === today);
  
  const totalWeight = exercises.reduce((sum, ex) => sum + (ex.weight * ex.sets * ex.reps), 0);
  const avgRPE = exercises.length > 0 
    ? (exercises.reduce((sum, ex) => sum + ex.rpe, 0) / exercises.length).toFixed(1)
    : 0;
  
  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);

  const stats = [
    {
      title: 'Treino Hoje',
      value: todayExercises.length,
      subtitle: 'exercícios',
      icon: Calendar,
      color: 'text-blue-400'
    },
    {
      title: 'Volume Total',
      value: `${totalWeight.toLocaleString()}kg`,
      subtitle: 'peso levantado',
      icon: Weight,
      color: 'text-green-400'
    },
    {
      title: 'RPE Médio',
      value: avgRPE,
      subtitle: 'intensidade',
      icon: Target,
      color: 'text-orange-400'
    },
    {
      title: 'Total de Séries',
      value: totalSets,
      subtitle: 'realizadas',
      icon: TrendingUp,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-400 text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-slate-500 text-xs">
                {stat.subtitle}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkoutStats;
