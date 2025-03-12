
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Eye, Star, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[]; // Made optional with the ? symbol
  stats: {
    views: number;
    stars: number;
    forks: number;
  };
  className?: string;
  style?: React.CSSProperties;
}

const ProjectCard = ({
  id,
  title,
  description,
  imageUrl,
  tags = [], // Provide a default empty array when tags is not provided
  stats,
  className,
  style,
}: ProjectCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl overflow-hidden hover-scale",
        className
      )}
      style={style}
    >
      {imageUrl && (
        <div className="aspect-video w-full relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {stats.views}
            </span>
            <span className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              {stats.stars}
            </span>
            <span className="flex items-center">
              <GitBranch className="h-4 w-4 mr-1" />
              {stats.forks}
            </span>
          </div>
        </div>
        
        <Link to={`/projects/${id}`}>
          <Button variant="secondary" className="w-full rounded-xl">
            View Project
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
