import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Clock, Dumbbell } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  weight: number;
  sets: number;
  reps: number;
  rpe: number;
}

interface WorkoutDay {
  day: string;
  muscleGroup: string;
  estimatedDuration: number; // in minutes
  exercises: Exercise[];
}

const muscleGroups = [
  'Ombros', 'Quadríceps', 'Costas', 'Peito', 'Bíceps', 'Tríceps', 
  'Glúteos', 'Panturrilha', 'Abdome', 'Isquiotibiais'
];

const daysOfWeek = [
  'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 
  'Sexta-feira', 'Sábado', 'Domingo'
];

const WorkoutPlanner = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [estimatedDuration, setEstimatedDuration] = useState<number>(60);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutDay | null>(null);

  // Load workout plan from localStorage on component mount
  useEffect(() => {
    const savedWorkoutPlan = localStorage.getItem('workoutPlan');
    if (savedWorkoutPlan) {
      setWorkoutPlan(JSON.parse(savedWorkoutPlan));
    }
  }, []);

  // Save workout plan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
  }, [workoutPlan]);

  const addWorkoutDay = () => {
    if (!selectedDay || !selectedMuscleGroup) return;

    const newWorkout: WorkoutDay = {
      day: selectedDay,
      muscleGroup: selectedMuscleGroup,
      estimatedDuration,
      exercises: []
    };

    setWorkoutPlan(prev => [...prev.filter(w => w.day !== selectedDay), newWorkout]);
    setSelectedDay('');
    setSelectedMuscleGroup('');
    setEstimatedDuration(60);
  };

  const removeWorkoutDay = (day: string) => {
    setWorkoutPlan(prev => prev.filter(w => w.day !== day));
  };

  const addExercise = (workoutDay: string) => {
    const workout = workoutPlan.find(w => w.day === workoutDay);
    if (!workout || workout.exercises.length >= 6) return;

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      weight: 0,
      sets: 1,
      reps: 1,
      rpe: 5
    };

    setWorkoutPlan(prev => prev.map(w => 
      w.day === workoutDay 
        ? { ...w, exercises: [...w.exercises, newExercise] }
        : w
    ));
  };

  const updateExercise = (workoutDay: string, exerciseId: string, field: keyof Exercise, value: string | number) => {
    setWorkoutPlan(prev => prev.map(w =>
      w.day === workoutDay
        ? {
            ...w,
            exercises: w.exercises.map(ex =>
              ex.id === exerciseId ? { ...ex, [field]: value } : ex
            )
          }
        : w
    ));
  };

  const removeExercise = (workoutDay: string, exerciseId: string) => {
    setWorkoutPlan(prev => prev.map(w =>
      w.day === workoutDay
        ? { ...w, exercises: w.exercises.filter(ex => ex.id !== exerciseId) }
        : w
    ));
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}min` : ''}` : `${mins}min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Meus Treinos
            </h1>
          </div>
          <p className="text-slate-400 text-lg">Planeje sua rotina semanal de treinos</p>
        </div>

        {/* Add Workout Form */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Adicionar Treino</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Dia da semana" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day} className="text-white hover:bg-slate-600">
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Grupo muscular" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {muscleGroups.map(group => (
                    <SelectItem key={group} value={group} className="text-white hover:bg-slate-600">
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(Number(e.target.value))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Duração (min)"
                />
              </div>

              <Button 
                onClick={addWorkoutDay}
                disabled={!selectedDay || !selectedMuscleGroup}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workout Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workoutPlan.map((workout) => (
            <Card key={workout.day} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{workout.day}</CardTitle>
                    <p className="text-orange-400">{workout.muscleGroup}</p>
                    <p className="text-slate-400 text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(workout.estimatedDuration)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeWorkoutDay(workout.day)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Exercises */}
                {workout.exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-slate-700/50 p-4 rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Nome do exercício"
                        value={exercise.name}
                        onChange={(e) => updateExercise(workout.day, exercise.id, 'name', e.target.value)}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                      <div className="flex items-center justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExercise(workout.day, exercise.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <label className="text-xs text-slate-400">Peso (kg)</label>
                        <Input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => updateExercise(workout.day, exercise.id, 'weight', Number(e.target.value))}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Séries</label>
                        <Input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(workout.day, exercise.id, 'sets', Number(e.target.value))}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Repetições</label>
                        <Input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(workout.day, exercise.id, 'reps', Number(e.target.value))}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">RPE</label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={exercise.rpe}
                          onChange={(e) => updateExercise(workout.day, exercise.id, 'rpe', Number(e.target.value))}
                          className="bg-slate-600 border-slate-500 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Exercise Button */}
                {workout.exercises.length < 6 && (
                  <Button
                    onClick={() => addExercise(workout.day)}
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Exercício ({workout.exercises.length}/6)
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {workoutPlan.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <Dumbbell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">Nenhum treino planejado ainda. Comece adicionando um treino acima!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlanner;
