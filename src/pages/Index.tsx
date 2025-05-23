
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Dumbbell, Target, TrendingUp } from 'lucide-react';
import WorkoutForm from '@/components/WorkoutForm';
import ExerciseList from '@/components/ExerciseList';
import WorkoutStats from '@/components/WorkoutStats';

export interface Exercise {
  id: string;
  name: string;
  weight: number;
  rpe: number;
  sets: number;
  reps: number;
  date: string;
}

const Index = () => {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: '1',
      name: 'Agachamento',
      weight: 50,
      rpe: 8,
      sets: 2,
      reps: 10,
      date: new Date().toISOString().split('T')[0]
    }
  ]);
  const [showForm, setShowForm] = useState(false);

  const addExercise = (exercise: Omit<Exercise, 'id' | 'date'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setExercises(prev => [newExercise, ...prev]);
    setShowForm(false);
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
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

        {/* Stats Cards */}
        <WorkoutStats exercises={exercises} />

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
              exercises={exercises}
              onDelete={deleteExercise}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
