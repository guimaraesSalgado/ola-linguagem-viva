
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Activity, Flame } from 'lucide-react';
import type { Exercise } from '@/pages/Index';

interface MetricsGridProps {
  exercises: Exercise[];
}

const MetricsGrid = ({ exercises }: MetricsGridProps) => {
  // Calculate metrics
  const today = new Date().toISOString().split('T')[0];
  const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const recentExercises = exercises.filter(ex => ex.date >= last7Days);
  const workoutDays = new Set(recentExercises.map(ex => ex.date)).size;
  
  const avgWorkoutTime = recentExercises.length > 0 
    ? Math.round(recentExercises.reduce((sum, ex) => sum + (ex.duration || 0), 0) / workoutDays || 0)
    : 0;
    
  const totalCardioTime = recentExercises.reduce((sum, ex) => sum + (ex.cardioTime || 0), 0);
  const totalCalories = recentExercises.reduce((sum, ex) => sum + (ex.caloriesBurned || 0), 0);

  const metrics = [
    {
      title: 'Dias Ativos',
      subtitle: 'últimos 7 dias',
      value: workoutDays,
      icon: Calendar,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Tempo Médio',
      subtitle: 'por treino',
      value: `${avgWorkoutTime}min`,
      icon: Clock,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'Cardio Total',
      subtitle: 'esta semana',
      value: `${totalCardioTime}min`,
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30'
    },
    {
      title: 'Calorias',
      subtitle: 'queimadas',
      value: totalCalories.toLocaleString(),
      icon: Flame,
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className={`bg-gradient-to-br ${metric.bgColor} ${metric.borderColor} backdrop-blur-sm`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-300 text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                {metric.value}
              </p>
              <p className="text-slate-400 text-xs">
                {metric.subtitle}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;
