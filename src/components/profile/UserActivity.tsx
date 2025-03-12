
import React from 'react';
import { MessageSquare, ThumbsUp, Share2, BookmarkPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ActivityPost {
  id: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
  author: {
    name: string;
    avatar: string;
  };
}

const UserActivity = () => {
  const activities: ActivityPost[] = [
    {
      id: '1',
      content: "Just published a new research paper on advanced neural network architectures! Check it out on arXiv.",
      date: "2 hours ago",
      likes: 42,
      comments: 12,
      shares: 8,
      author: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
      }
    },
    {
      id: '2',
      content: "Excited to share my latest project on computer vision applications in healthcare!",
      date: "1 day ago",
      likes: 38,
      comments: 15,
      shares: 5,
      author: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
      }
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      {activities.map((activity) => (
        <Card key={activity.id} className="hover-scale">
          <CardHeader className="flex flex-row space-x-4 items-start">
            <Avatar>
              <AvatarImage src={activity.author.avatar} alt={activity.author.name} />
              <AvatarFallback>{activity.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-base font-medium">{activity.author.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{activity.date}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{activity.content}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {activity.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                {activity.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                {activity.shares}
              </Button>
              <Button variant="ghost" size="sm">
                <BookmarkPlus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserActivity;
