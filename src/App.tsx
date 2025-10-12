import { useState, useEffect } from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { ChatView } from './components/ChatView';
import { SpecialistSelection } from './components/SpecialistSelection';
import { SettingsModal } from './components/SettingsModal';
import { TechSupportModal } from './components/TechSupportModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { MessageSquare, Users } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'specialist' | 'system';
  timestamp: Date;
  senderName?: string;
  senderAvatar?: string;
}

interface Specialist {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  isOnline: boolean;
  rating: number;
  specialties: string[];
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [aiModel, setAiModel] = useState('recommended');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [techSupportOpen, setTechSupportOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>('1');

  // Mock user data (from Telegram)
  const userData = {
    nickname: 'Alex Johnson',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  };

  // Mock specialists
  const specialists: Specialist[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      title: 'AI Psychology Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      isOnline: true,
      rating: 4.9,
      specialties: ['Mental Health', 'Counseling'],
    },
    {
      id: '2',
      name: 'Mark Davidson',
      title: 'Business Strategy AI',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      isOnline: true,
      rating: 4.8,
      specialties: ['Business', 'Strategy'],
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Health & Wellness Coach',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      isOnline: false,
      rating: 4.7,
      specialties: ['Fitness', 'Nutrition'],
    },
  ];

  // Mock messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to doWell! Your conversation is now encrypted.',
      sender: 'system',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      content: 'Hello! I\'m Dr. Sarah Chen, your AI psychology specialist. How can I help you today?',
      sender: 'specialist',
      timestamp: new Date(Date.now() - 3000000),
      senderName: 'Dr. Sarah Chen',
    },
    {
      id: '3',
      content: 'Hi! I\'ve been feeling stressed lately and would like some advice on managing it.',
      sender: 'user',
      timestamp: new Date(Date.now() - 2400000),
    },
    {
      id: '4',
      content: 'I understand. Stress is very common, and there are several effective techniques we can explore. First, let\'s talk about what\'s been causing you stress. Can you tell me more about your situation?',
      sender: 'specialist',
      timestamp: new Date(Date.now() - 1800000),
      senderName: 'Dr. Sarah Chen',
    },
  ]);

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);

    // Simulate specialist response
    setTimeout(() => {
      const specialist = specialists.find((s) => s.id === selectedSpecialist);
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for sharing that. Let me help you with this...',
        sender: 'specialist',
        timestamp: new Date(),
        senderName: specialist?.name,
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  const currentSpecialist = specialists.find((s) => s.id === selectedSpecialist);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <BackgroundAnimation enabled={animationEnabled} />

      <div className="relative z-10 h-full flex flex-col max-w-md mx-auto">
        <ProfileHeader
          nickname={userData.nickname}
          avatarUrl={userData.avatarUrl}
          onSettingsClick={() => setSettingsOpen(true)}
          onHowItWorksClick={() => setHowItWorksOpen(true)}
          onTechSupportClick={() => setTechSupportOpen(true)}
        />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="specialists" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Specialists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 m-0 overflow-hidden">
            <ChatView
              messages={messages}
              onSendMessage={handleSendMessage}
              specialistName={currentSpecialist?.name}
              specialistAvatar={currentSpecialist?.avatarUrl}
              userAvatar={userData.avatarUrl}
            />
          </TabsContent>

          <TabsContent
            value="specialists"
            className="flex-1 m-0 overflow-y-auto px-4 py-4"
          >
            <div className="space-y-4">
              <div>
                <h3>Available Specialists</h3>
                <p className="text-sm text-muted-foreground">
                  Select a specialist to start chatting
                </p>
              </div>
              <SpecialistSelection
                specialists={specialists}
                selectedId={selectedSpecialist}
                onSelect={(id) => {
                  setSelectedSpecialist(id);
                  setActiveTab('chat');
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        theme={theme}
        onThemeChange={setTheme}
        animationEnabled={animationEnabled}
        onAnimationChange={setAnimationEnabled}
        aiModel={aiModel}
        onAiModelChange={setAiModel}
      />

      <TechSupportModal
        open={techSupportOpen}
        onOpenChange={setTechSupportOpen}
      />

      <HowItWorksModal
        open={howItWorksOpen}
        onOpenChange={setHowItWorksOpen}
      />
    </div>
  );
}
