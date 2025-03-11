
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Briefcase, MapPin, Clock, Star, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  description: string;
  skills: string[];
  matchPercentage: number;
  logoUrl?: string;
  className?: string;
  style?: React.CSSProperties;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  type,
  postedDate,
  description,
  skills,
  matchPercentage,
  logoUrl,
  className,
  style,
}: JobCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl overflow-hidden hover-scale animate-slide-up",
        className
      )}
      style={style}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {logoUrl && (
            <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary/50 flex-shrink-0">
              <img 
                src={logoUrl} 
                alt={company}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-muted-foreground">{company}</p>
          </div>
          
          <div className={`text-sm font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${matchPercentage >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 'bg-primary/10 text-primary'}`}>
            <Star className="h-3.5 w-3.5" />
            {matchPercentage}% match
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            {type}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {postedDate}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Salary / Compensation</div>
          <div className="text-lg font-semibold">{salary}</div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <span 
              key={index}
              className="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Button className="flex-1">
            Apply Now
          </Button>
          <Link to={`/jobs/${id}`}>
            <Button variant="outline" size="icon">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
