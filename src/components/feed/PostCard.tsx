
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MessageSquare, ThumbsUp, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostAuthor {
  name: string;
  avatar: string;
  title: string;
}

interface PostCardProps {
  id: string;
  author: PostAuthor;
  content: string;
  images?: string[];
  postedAt: string;
  likes: number;
  comments: number;
  shares: number;
  saved: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const PostCard = ({
  id,
  author,
  content,
  images,
  postedAt,
  likes,
  comments,
  shares,
  saved,
  className,
  style,
}: PostCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl overflow-hidden animate-slide-up",
        className
      )}
      style={style}
    >
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <Link to={`/profile/${author.name.toLowerCase().replace(' ', '-')}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={author.avatar} 
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div>
              <Link to={`/profile/${author.name.toLowerCase().replace(' ', '-')}`}>
                <h4 className="font-semibold hover:text-primary">{author.name}</h4>
              </Link>
              <p className="text-sm text-muted-foreground">{author.title}</p>
              <p className="text-xs text-muted-foreground">{postedAt}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Post Content */}
        <div className="mb-4">
          <p className="whitespace-pre-line">{content}</p>
        </div>
        
        {/* Post Images */}
        {images && images.length > 0 && (
          <div className={`mb-4 grid ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden ${images.length === 1 ? 'aspect-video' : 'aspect-square'}`}
              >
                <img 
                  src={image} 
                  alt={`Post image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Post Stats */}
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <span>{likes} likes</span>
          <div className="space-x-2">
            <span>{comments} comments</span>
            <span>{shares} shares</span>
          </div>
        </div>
        
        {/* Post Actions */}
        <div className="flex border-t border-border pt-4">
          <Button variant="ghost" className="flex-1 flex items-center justify-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            Like
          </Button>
          <Button variant="ghost" className="flex-1 flex items-center justify-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" className="flex-1 flex items-center justify-center gap-1">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" className="flex items-center justify-center gap-1">
            <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
            {saved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
