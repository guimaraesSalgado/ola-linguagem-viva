
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, X } from 'lucide-react';

interface WorkoutFormProps {
  onSubmit: (exercise: {
    name: string;
    weight: number;
    rpe: number;
    sets: number;
    reps: number;
    duration?: number;
    cardioTime?: number;
    caloriesBurned?: number;
  }) => void;
  onCancel: () => void;
}

const WorkoutForm = ({ onSubmit, onCancel }: WorkoutFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    rpe: '',
    sets: '',
    reps: '',
    duration: '45',
    cardioTime: '10',
    caloriesBurned: '300'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.weight || !formData.rpe || !formData.sets || !formData.reps) {
      return;
    }

    onSubmit({
      name: formData.name,
      weight: Number(formData.weight),
      rpe: Number(formData.rpe),
      sets: Number(formData.sets),
      reps: Number(formData.reps),
      duration: Number(formData.duration) || 45,
      cardioTime: Number(formData.cardioTime) || 0,
      caloriesBurned: Number(formData.caloriesBurned) || 300
    });

    setFormData({
      name: '',
      weight: '',
      rpe: '',
      sets: '',
      reps: '',
      duration: '45',
      cardioTime: '10',
      caloriesBurned: '300'
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-200">Nome do Exercício</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="ex: Agachamento"
          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-slate-200">Peso (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder="50"
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rpe" className="text-slate-200">RPE (1-10)</Label>
          <Input
            id="rpe"
            type="number"
            min="1"
            max="10"
            value={formData.rpe}
            onChange={(e) => handleChange('rpe', e.target.value)}
            placeholder="8"
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="sets" className="text-slate-200">Séries</Label>
          <Input
            id="sets"
            type="number"
            value={formData.sets}
            onChange={(e) => handleChange('sets', e.target.value)}
            placeholder="3"
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reps" className="text-slate-200">Repetições</Label>
          <Input
            id="reps"
            type="number"
            value={formData.reps}
            onChange={(e) => handleChange('reps', e.target.value)}
            placeholder="10"
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-slate-200 text-sm">Duração (min)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
            placeholder="45"
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardioTime" className="text-slate-200 text-sm">Cardio (min)</Label>
          <Input
            id="cardioTime"
            type="number"
            value={formData.cardioTime}
            onChange={(e) => handleChange('cardioTime', e.target.value)}
            placeholder="10"
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="caloriesBurned" className="text-slate-200 text-sm">Calorias</Label>
          <Input
            id="caloriesBurned"
            type="number"
            value={formData.caloriesBurned}
            onChange={(e) => handleChange('caloriesBurned', e.target.value)}
            placeholder="300"
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default WorkoutForm;
