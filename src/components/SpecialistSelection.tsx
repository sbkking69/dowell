import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Check } from 'lucide-react';

interface Specialist {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  isOnline: boolean;
  rating: number;
  specialties: string[];
}

interface SpecialistSelectionProps {
  specialists: Specialist[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SpecialistSelection({
  specialists,
  selectedId,
  onSelect,
}: SpecialistSelectionProps) {
  return (
    <div className="space-y-2">
      {specialists.map((specialist) => {
        const isSelected = selectedId === specialist.id;
        const initials = specialist.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

        return (
          <button
            key={specialist.id}
            onClick={() => onSelect(specialist.id)}
            className={`w-full p-3 rounded-lg border transition-all ${
              isSelected
                ? 'border-primary bg-accent'
                : 'border-border hover:bg-accent/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={specialist.avatarUrl} alt={specialist.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                {specialist.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-card" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm">{specialist.name}</h4>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{specialist.title}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs">⭐ {specialist.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <div className="flex flex-wrap gap-1">
                    {specialist.specialties.slice(0, 2).map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
