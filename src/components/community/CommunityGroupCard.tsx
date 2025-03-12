
import React from 'react';
import { Link } from 'react-router-dom';
import { CommunityGroup } from '@/types/project';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommunityGroupCardProps {
  group: CommunityGroup;
  isActive?: boolean;
  onClick?: () => void;
}

const CommunityGroupCard = ({ group, isActive, onClick }: CommunityGroupCardProps) => {
  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isActive ? 'bg-secondary' : 'hover:bg-secondary/50'
      }`}
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-xl">
        {group.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{group.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="h-3 w-3 mr-1" />
          <span>{group.members.toLocaleString()} members</span>
        </div>
      </div>
      {!isActive && (
        <Button size="sm" variant="ghost" className="h-8 px-2">
          Join
        </Button>
      )}
    </div>
  );
};

export default CommunityGroupCard;
