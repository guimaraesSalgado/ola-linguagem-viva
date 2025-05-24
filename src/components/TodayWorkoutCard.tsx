
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Target, Dumbbell, Play } from 'lucide-react';
import { useState } from 'react';

interface WorkoutDay {
  day: string;
  muscleGroup: string;
  estimatedDuration: number;
  exercises: Array<{
    id: string;
    name: string;
    weight: number;
    sets: number;
    reps: number;
    rpe: number;
  }>;
}

interface TodayWorkoutCardProps {
  workoutName: string;
  onWorkoutNameChange: (name: string) => void;
  todayWorkoutPlan?: WorkoutDay | null;
  onStartWorkout?: () => void;
}

const TodayWorkoutCard = ({ workoutName, onWorkoutNameChange, todayWorkoutPlan, onStartWorkout }: TodayWorkoutCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(workoutName);

  const handleSave = () => {
    onWorkoutNameChange(tempName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(workoutName);
    setIsEditing(false);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}min` : ''}` : `${mins}min`;
  };

  return (
    <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-orange-500" />
            <div>
              <CardTitle className="text-white text-xl">Treino de Hoje</CardTitle>
              <p className="text-slate-400 text-sm">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          {todayWorkoutPlan && (
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{formatDuration(todayWorkoutPlan.estimatedDuration)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-slate-400 text-sm">Nome do Treino</label>
            {isEditing ? (
              <div className="flex gap-2 mt-1">
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Nome do treino"
                />
                <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                  Salvar
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between mt-1">
                <h3 className="text-2xl font-bold text-white">{workoutName}</h3>
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  Editar
                </Button>
              </div>
            )}
          </div>

          {todayWorkoutPlan && todayWorkoutPlan.exercises.length > 0 && (
            <>
              <div>
                <h4 className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Exercícios Planejados
                </h4>
                <div className="grid gap-2">
                  {todayWorkoutPlan.exercises.map((exercise) => (
                    <div key={exercise.id} className="bg-slate-700/30 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{exercise.name}</span>
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <span>{exercise.weight}kg</span>
                          <span>{exercise.sets}x{exercise.reps}</span>
                          <span>RPE {exercise.rpe}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={onStartWorkout}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3"
              >
                <Play className="h-5 w-5 mr-2" />
                Iniciar Treino
              </Button>
            </>
          )}

          {(!todayWorkoutPlan || todayWorkoutPlan.exercises.length === 0) && (
            <div className="text-center py-8">
              <Dumbbell className="h-12 w-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">
                Nenhum treino planejado para hoje.
                <br />
                Configure seus treinos na aba "Meus Treinos".
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayWorkoutCard;
