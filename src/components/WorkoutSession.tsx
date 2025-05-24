
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Save, X, Timer } from 'lucide-react';
import type { Exercise } from '@/pages/Index';

interface WorkoutExercise {
  id: string;
  name: string;
  plannedWeight: number;
  plannedSets: number;
  plannedReps: number;
  plannedRpe: number;
  actualWeight: number;
  actualSets: number;
  actualReps: number;
  actualRpe: number;
  completed: boolean;
}

interface WorkoutSessionProps {
  workoutName: string;
  plannedExercises: Array<{
    id: string;
    name: string;
    weight: number;
    sets: number;
    reps: number;
    rpe: number;
  }>;
  onComplete: (exercises: Exercise[]) => void;
  onCancel: () => void;
}

const WorkoutSession = ({ workoutName, plannedExercises, onComplete, onCancel }: WorkoutSessionProps) => {
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    // Initialize exercises with planned values
    setExercises(plannedExercises.map(ex => ({
      ...ex,
      plannedWeight: ex.weight,
      plannedSets: ex.sets,
      plannedReps: ex.reps,
      plannedRpe: ex.rpe,
      actualWeight: ex.weight,
      actualSets: ex.sets,
      actualReps: ex.reps,
      actualRpe: ex.rpe,
      completed: false
    })));
  }, [plannedExercises]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(Math.floor((new Date().getTime() - startTime.getTime()) / 1000 / 60));
    }, 60000);

    return () => clearInterval(interval);
  }, [startTime]);

  const updateExercise = (id: string, field: keyof WorkoutExercise, value: number | boolean) => {
    setExercises(prev => prev.map(ex =>
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const toggleExerciseComplete = (id: string) => {
    setExercises(prev => prev.map(ex =>
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ));
  };

  const handleComplete = () => {
    const completedExercises: Exercise[] = exercises
      .filter(ex => ex.completed)
      .map(ex => ({
        id: Date.now().toString() + Math.random(),
        name: ex.name,
        weight: ex.actualWeight,
        sets: ex.actualSets,
        reps: ex.actualReps,
        rpe: ex.actualRpe,
        date: new Date().toISOString().split('T')[0],
        workoutName,
        duration,
        caloriesBurned: Math.round(duration * 8) // Rough estimate
      }));

    onComplete(completedExercises);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const completedCount = exercises.filter(ex => ex.completed).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-800/50 to-blue-800/50 border-green-600 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Timer className="h-5 w-5 text-green-400" />
                {workoutName} - Em Andamento
              </CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-green-400">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(duration)}</span>
                </div>
                <Badge variant="secondary" className="bg-green-700 text-green-100">
                  {completedCount}/{exercises.length} concluídos
                </Badge>
              </div>
            </div>
            <Button
              onClick={onCancel}
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Exercises */}
      <div className="space-y-3">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className={`border transition-all ${
            exercise.completed 
              ? 'bg-green-800/20 border-green-600' 
              : 'bg-slate-800/50 border-slate-700'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">{exercise.name}</h3>
                <Button
                  onClick={() => toggleExerciseComplete(exercise.id)}
                  variant={exercise.completed ? "default" : "outline"}
                  size="sm"
                  className={exercise.completed ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {exercise.completed ? 'Concluído' : 'Marcar'}
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Peso (kg)</label>
                  <Input
                    type="number"
                    value={exercise.actualWeight}
                    onChange={(e) => updateExercise(exercise.id, 'actualWeight', Number(e.target.value))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-500 mt-1">Planejado: {exercise.plannedWeight}kg</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Séries</label>
                  <Input
                    type="number"
                    value={exercise.actualSets}
                    onChange={(e) => updateExercise(exercise.id, 'actualSets', Number(e.target.value))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-500 mt-1">Planejado: {exercise.plannedSets}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Repetições</label>
                  <Input
                    type="number"
                    value={exercise.actualReps}
                    onChange={(e) => updateExercise(exercise.id, 'actualReps', Number(e.target.value))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-500 mt-1">Planejado: {exercise.plannedReps}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400">RPE</label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={exercise.actualRpe}
                    onChange={(e) => updateExercise(exercise.id, 'actualRpe', Number(e.target.value))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-500 mt-1">Planejado: {exercise.plannedRpe}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Complete Workout Button */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <Button
            onClick={handleComplete}
            disabled={completedCount === 0}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3"
          >
            <Save className="h-5 w-5 mr-2" />
            Finalizar Treino ({completedCount} exercícios)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutSession;
