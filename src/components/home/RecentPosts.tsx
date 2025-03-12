
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  commentCount: number;
  likeCount: number;
}

const RecentPosts = () => {
  const posts: Post[] = [
    {
      id: '1',
      title: 'How AI is Transforming Professional Networking',
      excerpt: 'Discover how artificial intelligence is changing the way professionals connect and collaborate in today's digital landscape.',
      date: 'June 12, 2023',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        role: 'AI Researcher'
      },
      commentCount: 15,
      likeCount: 47
    },
    {
      id: '2',
      title: '10 Project Ideas to Boost Your Portfolio',
      excerpt: 'Looking to enhance your professional portfolio? Here are ten innovative project ideas that will help you stand out.',
      date: 'May 28, 2023',
      author: {
        name: 'Michael Park',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        role: 'Senior Developer'
      },
      commentCount: 23,
      likeCount: 89
    },
    {
      id: '3',
      title: 'The Future of Remote Collaboration Tools',
      excerpt: 'As remote work becomes the norm, collaboration tools are evolving. Find out what's next in this space.',
      date: 'May 15, 2023',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        role: 'Product Manager'
      },
      commentCount: 8,
      likeCount: 32
    }
  ];

  return (
    <section className="section-container bg-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="font-bold mb-2">Recent Posts</h2>
            <p className="text-muted-foreground text-lg">
              Stay up to date with the latest insights and discussions
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="mt-4 md:mt-0"
            as={Link}
            to="/feed"
          >
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <Card key={post.id} className={`animate-slide-up animate-delay-${(index + 1) * 100} hover-scale overflow-hidden`}>
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-xs text-muted-foreground">{post.author.role}</div>
                  </div>
                </div>
                <CardTitle className="line-clamp-2 hover:text-primary">
                  <Link to={`/feed/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="text-xs">{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-xs text-muted-foreground">
                  {post.commentCount} comments • {post.likeCount} likes
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/feed/${post.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
