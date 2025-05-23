
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Weight, Target, RotateCcw, Hash } from 'lucide-react';
import type { Exercise } from '@/pages/Index';

interface ExerciseListProps {
  exercises: Exercise[];
  onDelete: (id: string) => void;
}

const ExerciseList = ({ exercises, onDelete }: ExerciseListProps) => {
  const getRPEColor = (rpe: number) => {
    if (rpe <= 3) return 'bg-green-500';
    if (rpe <= 6) return 'bg-yellow-500';
    if (rpe <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (exercises.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Weight className="h-16 w-16 text-slate-500 mb-4" />
          <p className="text-slate-400 text-lg text-center">
            Nenhum exercício registrado ainda.<br />
            Adicione seu primeiro treino!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Meus Treinos</h2>
        <Badge variant="secondary" className="bg-slate-700 text-slate-200">
          {exercises.length} exercícios
        </Badge>
      </div>

      <div className="space-y-3">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg font-bold">
                    {exercise.name}
                  </CardTitle>
                  <p className="text-slate-400 text-sm mt-1">
                    {formatDate(exercise.date)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(exercise.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-slate-400 text-xs">Peso</p>
                    <p className="text-white font-semibold">{exercise.weight}kg</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-400" />
                  <div>
                    <p className="text-slate-400 text-xs">RPE</p>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold">{exercise.rpe}</p>
                      <div className={`w-2 h-2 rounded-full ${getRPEColor(exercise.rpe)}`} />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-green-400" />
                  <div>
                    <p className="text-slate-400 text-xs">Séries</p>
                    <p className="text-white font-semibold">{exercise.sets}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-purple-400" />
                  <div>
                    <p className="text-slate-400 text-xs">Repetições</p>
                    <p className="text-white font-semibold">{exercise.reps}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                <p className="text-slate-300 text-sm">
                  <span className="font-semibold text-white">{exercise.name}</span> - 
                  <span className="text-blue-400"> {exercise.weight}kg</span> - 
                  <span className="text-orange-400"> RPE {exercise.rpe}</span> - 
                  <span className="text-green-400"> {exercise.sets} séries</span> - 
                  <span className="text-purple-400"> {exercise.reps} repetições</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
