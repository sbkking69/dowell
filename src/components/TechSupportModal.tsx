import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { MessageCircle, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

interface TechSupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TechSupportModal({ open, onOpenChange }: TechSupportModalProps) {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      // Simulate submission
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setMessage('');
        onOpenChange(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Tech Support
          </DialogTitle>
          <DialogDescription>
            We're here to help you with any issues
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm">Message sent successfully!</p>
            <p className="text-xs text-muted-foreground">
              We'll get back to you soon
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Response time</p>
                  <p className="text-xs text-muted-foreground">
                    Usually within 2-4 hours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Email support</p>
                  <p className="text-xs text-muted-foreground">
                    support@dowell.app
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Describe your issue</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's wrong..."
                className="min-h-[120px] resize-none"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={!message.trim()}
            >
              Send Message
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
