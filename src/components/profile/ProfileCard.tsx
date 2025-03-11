
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Book, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProfileCardProps {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  location?: string;
  company?: string;
  education?: string;
  skills: string[];
  stats: {
    projects: number;
    followers: number;
    following: number;
  };
  className?: string;
}

const ProfileCard = ({
  id,
  name,
  title,
  avatarUrl,
  location,
  company,
  education,
  skills,
  stats,
  className,
}: ProfileCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-6 hover-scale",
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-muted-foreground mb-3">{title}</p>
        
        <div className="w-full space-y-2 mb-4 text-sm">
          {location && (
            <div className="flex items-center justify-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
          )}
          
          {company && (
            <div className="flex items-center justify-center text-muted-foreground">
              <Briefcase className="h-4 w-4 mr-1" />
              {company}
            </div>
          )}
          
          {education && (
            <div className="flex items-center justify-center text-muted-foreground">
              <Book className="h-4 w-4 mr-1" />
              {education}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {skills.slice(0, 4).map((skill, index) => (
            <span 
              key={index}
              className="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              +{skills.length - 4} more
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4 w-full text-center mb-4 border-t border-b py-3">
          <div>
            <div className="font-medium">{stats.projects}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div>
            <div className="font-medium">{stats.followers}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div>
            <div className="font-medium">{stats.following}</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
        </div>
        
        <Link to={`/profile/${id}`} className="w-full">
          <Button variant="outline" className="w-full rounded-xl">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
