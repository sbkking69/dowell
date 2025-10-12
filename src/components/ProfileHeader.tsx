import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Settings, HelpCircle, LifeBuoy } from 'lucide-react';
import { Button } from './ui/button';

interface ProfileHeaderProps {
  nickname: string;
  avatarUrl?: string;
  onSettingsClick: () => void;
  onHowItWorksClick: () => void;
  onTechSupportClick: () => void;
}

export function ProfileHeader({
  nickname,
  avatarUrl,
  onSettingsClick,
  onHowItWorksClick,
  onTechSupportClick,
}: ProfileHeaderProps) {
  const initials = nickname
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={nickname} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">{nickname}</p>
          <p className="text-xs text-muted-foreground">@{nickname.toLowerCase().replace(/\s/g, '_')}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onTechSupportClick}
          className="h-9 w-9"
        >
          <LifeBuoy className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onHowItWorksClick}
          className="h-9 w-9"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="h-9 w-9"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
