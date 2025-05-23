
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, Calendar, Dumbbell, Clock } from 'lucide-react';
import type { Exercise } from '@/pages/Index';

interface WorkoutHistoryProps {
  exercises: Exercise[];
}

const WorkoutHistory = ({ exercises }: WorkoutHistoryProps) => {
  // Group exercises by date and workout name
  const workoutsByDate = exercises.reduce((acc, exercise) => {
    const key = `${exercise.date}-${exercise.workoutName || 'Treino'}`;
    if (!acc[key]) {
      acc[key] = {
        date: exercise.date,
        workoutName: exercise.workoutName || 'Treino',
        exercises: [],
        duration: exercise.duration || 0,
        caloriesBurned: exercise.caloriesBurned || 0
      };
    }
    acc[key].exercises.push(exercise);
    return acc;
  }, {} as Record<string, {
    date: string;
    workoutName: string;
    exercises: Exercise[];
    duration: number;
    caloriesBurned: number;
  }>);

  const workoutHistory = Object.values(workoutsByDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5); // Show last 5 workouts

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  if (workoutHistory.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <History className="h-16 w-16 text-slate-500 mb-4" />
          <p className="text-slate-400 text-lg text-center">
            Nenhum histórico de treino ainda.<br />
            Complete seu primeiro treino para ver o histórico!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <History className="h-5 w-5 text-orange-500" />
            Histórico de Treinos
          </CardTitle>
          <Badge variant="secondary" className="bg-slate-700 text-slate-200">
            {workoutHistory.length} treinos recentes
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workoutHistory.map((workout, index) => (
            <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-lg">{workout.workoutName}</h3>
                    {isToday(workout.date) && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        Hoje
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(workout.date)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-400 text-sm mb-1">
                    <Clock className="h-4 w-4" />
                    <span>{workout.duration}min</span>
                  </div>
                  <div className="text-orange-400 text-sm">
                    {workout.caloriesBurned} cal
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Dumbbell className="h-4 w-4 text-blue-400" />
                <span>{workout.exercises.length} exercícios</span>
                <span className="text-slate-500">•</span>
                <span>{workout.exercises.reduce((sum, ex) => sum + ex.sets, 0)} séries totais</span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {workout.exercises.slice(0, 3).map((exercise, idx) => (
                  <Badge key={idx} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                    {exercise.name}
                  </Badge>
                ))}
                {workout.exercises.length > 3 && (
                  <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                    +{workout.exercises.length - 3} mais
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutHistory;
