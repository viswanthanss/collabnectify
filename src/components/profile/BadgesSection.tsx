
import React from 'react';
import { Award, Trophy, Star, Lightbulb, Bot, Code, BookOpen, Heart, BarChart, Target } from 'lucide-react';

interface BadgeProps {
  icon: React.ElementType;
  name: string;
  description: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: boolean;
}

const Badge = ({ icon: Icon, name, description, level, unlocked }: BadgeProps) => {
  const levelColors = {
    bronze: 'bg-amber-700/10 text-amber-700 border-amber-700/20',
    silver: 'bg-slate-400/10 text-slate-400 border-slate-400/20',
    gold: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    platinum: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  };
  
  return (
    <div className={`rounded-xl border p-4 text-center ${unlocked ? levelColors[level] : 'bg-muted/20 text-muted-foreground border-border'}`}>
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-background mb-3">
        <Icon className={`h-6 w-6 ${unlocked ? '' : 'opacity-40'}`} />
      </div>
      <h4 className="text-sm font-medium">{name}</h4>
      <p className="text-xs mt-1 text-muted-foreground">{description}</p>
    </div>
  );
};

const BadgesSection = () => {
  const badges: BadgeProps[] = [
    {
      icon: Award,
      name: 'Early Adopter',
      description: 'Joined during the platform's beta phase',
      level: 'gold',
      unlocked: true,
    },
    {
      icon: Trophy,
      name: 'Top Contributor',
      description: 'Among the top 5% most active members',
      level: 'platinum',
      unlocked: true,
    },
    {
      icon: Star,
      name: 'Rising Star',
      description: 'Rapid skill growth in the first 3 months',
      level: 'silver',
      unlocked: true,
    },
    {
      icon: Lightbulb,
      name: 'Innovator',
      description: 'Created 5+ innovative projects',
      level: 'gold',
      unlocked: false,
    },
    {
      icon: Bot,
      name: 'AI Expert',
      description: 'Demonstrated expertise in AI technologies',
      level: 'platinum',
      unlocked: true,
    },
    {
      icon: Code,
      name: 'Code Master',
      description: 'Completed 10+ coding challenges',
      level: 'silver',
      unlocked: false,
    },
    {
      icon: BookOpen,
      name: 'Knowledge Seeker',
      description: 'Participated in 15+ learning events',
      level: 'bronze',
      unlocked: true,
    },
    {
      icon: Heart,
      name: 'Mentor',
      description: 'Helped 20+ community members',
      level: 'gold',
      unlocked: false,
    },
    {
      icon: BarChart,
      name: 'Data Wizard',
      description: 'Expert in data analysis and visualization',
      level: 'silver',
      unlocked: true,
    },
    {
      icon: Target,
      name: 'Goal Achiever',
      description: 'Completed all profile milestones',
      level: 'bronze',
      unlocked: true,
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-6">Badges & Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {badges.map((badge, index) => (
          <Badge key={index} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default BadgesSection;
