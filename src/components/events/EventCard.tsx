
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Users, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  tags: string[];
  format: 'In-person' | 'Online' | 'Hybrid';
  attendees: number;
  recommended?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  location,
  imageUrl,
  tags,
  format,
  attendees,
  recommended = false,
  className,
  style,
}: EventCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl overflow-hidden hover-scale animate-slide-up",
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
          {recommended && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="h-3 w-3" />
              Recommended for you
            </div>
          )}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {format}
          </div>
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
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{date} • {time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{attendees} attending</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button className="flex-1">
            Register
          </Button>
          <Link to={`/events/${id}`}>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
