
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import type { Exercise } from '@/pages/Index';

interface ProgressionTrackerProps {
  exercises: Exercise[];
  exerciseName: string;
}

const ProgressionTracker = ({ exercises, exerciseName }: ProgressionTrackerProps) => {
  // Filter exercises by name and sort by date
  const exerciseHistory = exercises
    .filter(ex => ex.name.toLowerCase() === exerciseName.toLowerCase())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (exerciseHistory.length < 2) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4 text-center">
          <Target className="h-8 w-8 text-slate-500 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">
            Dados insuficientes para mostrar progressão.
            <br />
            Complete mais treinos para ver o progresso!
          </p>
        </CardContent>
      </Card>
    );
  }

  const latest = exerciseHistory[exerciseHistory.length - 1];
  const previous = exerciseHistory[exerciseHistory.length - 2];

  const weightDiff = latest.weight - previous.weight;
  const setsDiff = latest.sets - previous.sets;
  const repsDiff = latest.reps - previous.reps;
  const rpeDiff = latest.rpe - previous.rpe;

  const getProgressIcon = (diff: number) => {
    if (diff > 0) return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (diff < 0) return <TrendingDown className="h-4 w-4 text-red-400" />;
    return <Minus className="h-4 w-4 text-slate-400" />;
  };

  const getProgressColor = (diff: number) => {
    if (diff > 0) return 'text-green-400';
    if (diff < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-orange-500" />
          Progressão - {exerciseName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-700/30 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Peso</span>
              {getProgressIcon(weightDiff)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{latest.weight}kg</span>
              <span className={`text-sm ${getProgressColor(weightDiff)}`}>
                {weightDiff !== 0 && (weightDiff > 0 ? '+' : '')}{weightDiff}kg
              </span>
            </div>
          </div>

          <div className="bg-slate-700/30 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Séries</span>
              {getProgressIcon(setsDiff)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{latest.sets}</span>
              <span className={`text-sm ${getProgressColor(setsDiff)}`}>
                {setsDiff !== 0 && (setsDiff > 0 ? '+' : '')}{setsDiff}
              </span>
            </div>
          </div>

          <div className="bg-slate-700/30 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Repetições</span>
              {getProgressIcon(repsDiff)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{latest.reps}</span>
              <span className={`text-sm ${getProgressColor(repsDiff)}`}>
                {repsDiff !== 0 && (repsDiff > 0 ? '+' : '')}{repsDiff}
              </span>
            </div>
          </div>

          <div className="bg-slate-700/30 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">RPE</span>
              {getProgressIcon(-rpeDiff)} {/* Inverted for RPE - lower is better */}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{latest.rpe}</span>
              <span className={`text-sm ${getProgressColor(-rpeDiff)}`}>
                {rpeDiff !== 0 && (rpeDiff > 0 ? '+' : '')}{rpeDiff}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Badge variant="outline" className="border-slate-600 text-slate-300">
            {exerciseHistory.length} sessões registradas
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressionTracker;
