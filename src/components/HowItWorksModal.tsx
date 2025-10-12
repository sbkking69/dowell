import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { UserCircle, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';

interface HowItWorksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HowItWorksModal({ open, onOpenChange }: HowItWorksModalProps) {
  const steps = [
    {
      icon: UserCircle,
      title: 'Choose a Specialist',
      description: 'Select from our verified AI specialists based on your needs',
    },
    {
      icon: MessageSquare,
      title: 'Start Chatting',
      description: 'Begin your conversation in a secure, encrypted environment',
    },
    {
      icon: Sparkles,
      title: 'Get Expert Help',
      description: 'Receive intelligent, personalized responses powered by advanced AI',
    },
    {
      icon: ShieldCheck,
      title: 'Stay Protected',
      description: 'Your conversations are private and encrypted end-to-end',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How doWell Works</DialogTitle>
          <DialogDescription>
            Connect with AI specialists securely and easily
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-center text-muted-foreground">
              🔒 Your privacy is our priority. All conversations are encrypted and
              secure.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
