
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post, Comment } from '@/types/project';
import { 
  MessageSquare, ThumbsUp, Share, Bookmark, 
  MoreHorizontal, Heart, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface PostCardProps {
  post: Post;
  className?: string;
  style?: React.CSSProperties;
}

const PostCard = ({ post, className, style }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(post.saved);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [commentsData, setCommentsData] = useState<Comment[]>([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1);
    
    if (!isLiked) {
      toast.success("Post liked!");
    }
  };
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    
    if (!isSaved) {
      toast.success("Post saved!");
    } else {
      toast.success("Post unsaved");
    }
  };
  
  const handleShare = () => {
    // Simulate sharing functionality
    toast.success("Post shared!");
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
    
    // Simulate loading comments on first open
    if (!showComments && commentsData.length === 0) {
      setTimeout(() => {
        setCommentsData([
          {
            id: `comment-${post.id}-1`,
            postId: post.id,
            authorId: 'user-1',
            author: {
              name: 'Emma Watson',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
              title: 'Data Scientist'
            },
            content: 'This is fascinating research! Have you considered applying this to healthcare datasets?',
            createdAt: '2 hours ago',
            likes: 4
          },
          {
            id: `comment-${post.id}-2`,
            postId: post.id,
            authorId: 'user-2',
            author: {
              name: 'James Roberts',
              avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
              title: 'ML Engineer'
            },
            content: 'I'd be interested in collaboration opportunities. DM me if you're looking for partners.',
            createdAt: '45 minutes ago',
            likes: 2
          }
        ]);
      }, 500);
    }
  };
  
  const submitComment = () => {
    if (!commentContent.trim()) return;
    
    setIsSubmittingComment(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: `comment-${post.id}-${Date.now()}`,
        postId: post.id,
        authorId: 'current-user',
        author: {
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
          title: 'AI Researcher'
        },
        content: commentContent,
        createdAt: 'Just now',
        likes: 0
      };
      
      setCommentsData([...commentsData, newComment]);
      setCommentContent('');
      setIsSubmittingComment(false);
      toast.success("Comment posted!");
    }, 800);
  };

  return (
    <div 
      className={`rounded-xl border border-border bg-card overflow-hidden animate-slide-up ${className || ''}`}
      style={style}
    >
      <div className="p-4 md:p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <Link to={`/profile/${post.author.name.toLowerCase().replace(' ', '-')}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div>
              <Link to={`/profile/${post.author.name.toLowerCase().replace(' ', '-')}`}>
                <h4 className="font-semibold hover:text-primary">{post.author.name}</h4>
              </Link>
              <p className="text-sm text-muted-foreground">{post.author.title}</p>
              <p className="text-xs text-muted-foreground">{post.createdAt}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Post Content */}
        <div className="mb-4">
          <p className="whitespace-pre-line">{post.content}</p>
        </div>
        
        {/* Post Images */}
        {post.media && post.media.length > 0 && (
          <div className={`mb-4 grid ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
            {post.media.map((image, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden ${post.media && post.media.length === 1 ? 'aspect-video' : 'aspect-square'}`}
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
          <span>{likesCount} likes</span>
          <div className="space-x-2">
            <span>{post.comments} comments</span>
            <span>{post.views} views</span>
          </div>
        </div>
        
        {/* Post Actions */}
        <div className="flex border-t border-border pt-4">
          <Button 
            variant="ghost" 
            className={`flex-1 flex items-center justify-center gap-1 ${isLiked ? 'text-primary' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            Like
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={toggleComments}
          >
            <MessageSquare className="h-4 w-4" />
            Comment
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button 
            variant="ghost" 
            className={`flex items-center justify-center gap-1 ${isSaved ? 'text-primary' : ''}`}
            onClick={handleSave}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
        
        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-border">
            <h5 className="font-medium mb-3">Comments</h5>
            
            {/* Comment list */}
            <div className="space-y-4 mb-4">
              {commentsData.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={comment.author.avatar} 
                      alt={comment.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-xl p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{comment.createdAt}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                    <div className="flex gap-3 mt-1 ml-1">
                      <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {comment.likes || 0}
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-foreground">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add comment */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="Your avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <Textarea
                  placeholder="Write a comment..."
                  className="min-h-10 py-2 resize-none text-sm flex-1"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <Button 
                  size="icon" 
                  disabled={!commentContent.trim() || isSubmittingComment}
                  onClick={submitComment}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
