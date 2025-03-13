
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Heart, MessageSquare, Send } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface Story {
  id: string;
  image: string;
  text?: string;
  timestamp: string;
}

interface UserWithStories {
  id: string;
  name: string;
  username: string;
  avatar: string;
  stories: Story[];
}

interface UserStoriesProps {
  user: UserWithStories;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const UserStories = ({ user, onClose, onNext, onPrevious }: UserStoriesProps) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [comment, setComment] = useState('');

  const currentStory = user.stories[currentStoryIndex];
  const totalStories = user.stories.length;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          if (currentStoryIndex < totalStories - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setProgress(0);
            return 0;
          }
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [currentStoryIndex, totalStories]);

  const handleNext = () => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else if (onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      toast.success(`Comment sent to ${user.name}`);
      setComment('');
    }
  };

  const handleLike = () => {
    toast.success(`You liked ${user.name}'s story`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative max-w-md w-full h-[80vh] bg-black overflow-hidden rounded-lg shadow-xl">
        {/* Progress indicators */}
        <div className="absolute top-0 left-0 right-0 z-10 p-2 flex space-x-1">
          {user.stories.map((_, index) => (
            <Progress 
              key={index} 
              value={index === currentStoryIndex ? progress : index < currentStoryIndex ? 100 : 0} 
              className="h-1 flex-1" 
            />
          ))}
        </div>
        
        {/* User info */}
        <div className="absolute top-4 left-0 right-0 z-10 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8 border border-white">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white text-sm font-medium">{user.name}</p>
              <p className="text-white/70 text-xs">@{user.username} • {currentStory.timestamp}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Story content */}
        <div className="h-full flex items-center justify-center">
          <img 
            src={currentStory.image} 
            alt={`${user.name}'s story`}
            className="w-full h-full object-cover" 
          />
          
          {/* Text overlay */}
          {currentStory.text && (
            <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white">{currentStory.text}</p>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <button 
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 h-12 w-12 rounded-full flex items-center justify-center bg-black/30 text-white hover:bg-black/50 transition-colors"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button 
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 h-12 w-12 rounded-full flex items-center justify-center bg-black/30 text-white hover:bg-black/50 transition-colors"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Comment input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-transparent to-black/70">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={handleLike}
            >
              <Heart className="h-5 w-5" />
            </Button>
            <div className="flex-1 bg-white/20 rounded-full overflow-hidden flex items-center">
              <input 
                type="text" 
                placeholder="Reply to story..." 
                className="border-none bg-transparent text-white px-4 py-2 w-full focus:outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={handleSendComment}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStories;
