
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Dumbbell, Target, TrendingUp } from 'lucide-react';
import WorkoutForm from '@/components/WorkoutForm';
import ExerciseList from '@/components/ExerciseList';
import WorkoutStats from '@/components/WorkoutStats';
import TodayWorkoutCard from '@/components/TodayWorkoutCard';
import MetricsGrid from '@/components/MetricsGrid';
import WorkoutHistory from '@/components/WorkoutHistory';

export interface Exercise {
  id: string;
  name: string;
  weight: number;
  rpe: number;
  sets: number;
  reps: number;
  date: string;
  workoutName?: string;
  duration?: number; // in minutes
  cardioTime?: number; // in minutes
  caloriesBurned?: number;
}

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

const daysOfWeek = [
  'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 
  'Sexta-feira', 'Sábado', 'Domingo'
];

const Index = () => {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: '1',
      name: 'Agachamento',
      weight: 50,
      rpe: 8,
      sets: 2,
      reps: 10,
      date: new Date().toISOString().split('T')[0],
      workoutName: 'Pernas',
      duration: 45,
      cardioTime: 10,
      caloriesBurned: 380
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [todayWorkoutName, setTodayWorkoutName] = useState('');
  const [todayWorkoutPlan, setTodayWorkoutPlan] = useState<WorkoutDay | null>(null);

  // Get current day of week
  const getCurrentDayOfWeek = () => {
    const today = new Date();
    const dayIndex = today.getDay();
    const dayMap = [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];
    return dayMap[dayIndex];
  };

  // Load workout plan from localStorage and find today's workout
  useEffect(() => {
    const savedWorkoutPlan = localStorage.getItem('workoutPlan');
    if (savedWorkoutPlan) {
      const workoutPlan: WorkoutDay[] = JSON.parse(savedWorkoutPlan);
      const currentDay = getCurrentDayOfWeek();
      const todayWorkout = workoutPlan.find(workout => workout.day === currentDay);
      
      if (todayWorkout) {
        setTodayWorkoutPlan(todayWorkout);
        setTodayWorkoutName(todayWorkout.muscleGroup);
      } else {
        setTodayWorkoutName('Treino Livre');
      }
    } else {
      setTodayWorkoutName('Treino Livre');
    }
  }, []);

  // Convert planned exercises to display format
  const getTodayExercises = (): Exercise[] => {
    if (!todayWorkoutPlan) return exercises;
    
    const plannedExercises: Exercise[] = todayWorkoutPlan.exercises.map(exercise => ({
      id: exercise.id,
      name: exercise.name,
      weight: exercise.weight,
      rpe: exercise.rpe,
      sets: exercise.sets,
      reps: exercise.reps,
      date: new Date().toISOString().split('T')[0],
      workoutName: todayWorkoutPlan.muscleGroup,
      duration: todayWorkoutPlan.estimatedDuration,
      cardioTime: 10,
      caloriesBurned: Math.round(todayWorkoutPlan.estimatedDuration * 8.5) // Rough estimate
    }));

    // Combine with any completed exercises for today
    const completedToday = exercises.filter(ex => ex.date === new Date().toISOString().split('T')[0]);
    
    // If there are completed exercises, show them, otherwise show planned exercises
    return completedToday.length > 0 ? completedToday : plannedExercises;
  };

  const addExercise = (exercise: Omit<Exercise, 'id' | 'date'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      workoutName: todayWorkoutName
    };
    setExercises(prev => [newExercise, ...prev]);
    setShowForm(false);
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const displayExercises = getTodayExercises();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Gym Tracker
            </h1>
          </div>
          <p className="text-slate-400 text-lg">Registre seus treinos e acompanhe seu progresso</p>
        </div>

        {/* Today's Workout Card */}
        <TodayWorkoutCard 
          workoutName={todayWorkoutName} 
          onWorkoutNameChange={setTodayWorkoutName}
        />

        {/* Metrics Grid */}
        <MetricsGrid exercises={exercises} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout Form */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-orange-500" />
                  {showForm ? 'Novo Exercício' : 'Adicionar Treino'}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {showForm ? 'Preencha os dados do exercício' : 'Comece seu treino de hoje'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showForm ? (
                  <WorkoutForm 
                    onSubmit={addExercise}
                    onCancel={() => setShowForm(false)}
                  />
                ) : (
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Adicionar Exercício
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Exercise List */}
          <div className="lg:col-span-2">
            <ExerciseList 
              exercises={displayExercises}
              onDelete={deleteExercise}
            />
          </div>
        </div>

        {/* Workout History */}
        <WorkoutHistory exercises={exercises} />
      </div>
    </div>
  );
};

export default Index;
