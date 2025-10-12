import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Moon, Sun, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
  animationEnabled: boolean;
  onAnimationChange: (enabled: boolean) => void;
  aiModel: string;
  onAiModelChange: (model: string) => void;
}

const AI_MODELS = [
  { value: 'recommended', label: 'Recommended (GPT-4)' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5', label: 'GPT-3.5 Turbo' },
  { value: 'claude', label: 'Claude 3' },
  { value: 'gemini', label: 'Gemini Pro' },
];

export function SettingsModal({
  open,
  onOpenChange,
  theme,
  onThemeChange,
  animationEnabled,
  onAnimationChange,
  aiModel,
  onAiModelChange,
}: SettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your doWell experience
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Theme toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                Theme
              </Label>
              <p className="text-xs text-muted-foreground">
                {theme === 'dark' ? 'Dark mode' : 'Light mode'}
              </p>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) =>
                onThemeChange(checked ? 'dark' : 'light')
              }
            />
          </div>

          {/* Animation toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Background Animation</Label>
              <p className="text-xs text-muted-foreground">
                Falling numbers effect
              </p>
            </div>
            <Switch
              checked={animationEnabled}
              onCheckedChange={onAnimationChange}
            />
          </div>

          {/* AI Model selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Model
            </Label>
            <Select value={aiModel} onValueChange={onAiModelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI model" />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose which AI model to use for responses
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
