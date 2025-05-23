
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Edit2 } from 'lucide-react';
import { useState } from 'react';

interface TodayWorkoutCardProps {
  workoutName: string;
  onWorkoutNameChange: (name: string) => void;
}

const TodayWorkoutCard = ({ workoutName, onWorkoutNameChange }: TodayWorkoutCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(workoutName);

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSave = () => {
    onWorkoutNameChange(tempName);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      setTempName(workoutName);
      setIsEditing(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 text-orange-400 text-sm">
          <Calendar className="h-4 w-4" />
          <span className="capitalize">{today}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-300 text-sm">Treino de hoje</p>
            {isEditing ? (
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyPress}
                className="text-2xl font-bold bg-transparent border-0 p-0 h-auto text-white focus-visible:ring-0"
                autoFocus
              />
            ) : (
              <h2 className="text-2xl font-bold text-white cursor-pointer hover:text-orange-400 transition-colors" 
                  onClick={() => setIsEditing(true)}>
                {workoutName}
              </h2>
            )}
          </div>
          <Edit2 
            className="h-5 w-5 text-slate-400 hover:text-orange-400 cursor-pointer transition-colors"
            onClick={() => setIsEditing(true)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayWorkoutCard;
