
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Smile, Link, Send } from 'lucide-react';
import { toast } from 'sonner';

interface PostEditorProps {
  onPostSubmit?: (content: string, media: string[]) => void;
  placeholder?: string;
}

const PostEditor = ({ 
  onPostSubmit, 
  placeholder = "Share your thoughts, research, or ask a question..." 
}: PostEditorProps) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!content.trim() && media.length === 0) {
      toast.error("Please add some content to your post");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onPostSubmit) {
        onPostSubmit(content, media);
      }
      toast.success("Post submitted successfully!");
      setContent('');
      setMedia([]);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleMediaUpload = () => {
    // Simulating media upload by adding a placeholder image
    const sampleImages = [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWklMjByZXNlYXJjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    ];
    
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setMedia([...media, randomImage]);
    toast.success("Image uploaded successfully!");
  };

  const removeMedia = (index: number) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 mb-4">
      <Textarea 
        placeholder={placeholder}
        className="min-h-24 border-none p-0 focus-visible:ring-0 text-base resize-none mb-3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      {media.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {media.map((url, index) => (
            <div key={index} className="relative">
              <img 
                src={url} 
                alt={`Uploaded media ${index + 1}`}
                className="rounded-lg w-full h-32 object-cover"
              />
              <button 
                className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => removeMedia(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <Button
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground" 
            onClick={handleMediaUpload}
          >
            <Image className="h-4 w-4 mr-1" />
            Photo
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Smile className="h-4 w-4 mr-1" />
            Emoji
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Link className="h-4 w-4 mr-1" />
            Link
          </Button>
        </div>
        <Button 
          size="sm"
          disabled={(!content.trim() && media.length === 0) || isSubmitting}
          onClick={handleSubmit}
        >
          <Send className="h-4 w-4 mr-1" />
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
