
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, ThumbsUp, Share, Bookmark, Image, Smile, Link2, Users, Paperclip, TrendingUp, HandshakeIcon, MicIcon, Trophy, Flame, Calendar, List, BookOpen } from 'lucide-react';
import PostCard from '@/components/feed/PostCard';
import ResearchTrendsSection from '@/components/feed/ResearchTrendsSection';
import TeamCollabSection from '@/components/feed/TeamCollabSection';
import LiveQASection from '@/components/feed/LiveQASection';
import ChallengesSection from '@/components/feed/ChallengesSection';
import PostEditor from '@/components/community/PostEditor';

const Feed = () => {
  // Sample posts data
  const posts = [
    {
      id: '1',
      author: {
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        title: 'AI Research Scientist at TechInnovate AI'
      },
      content: "Just published my latest research paper on optimizing neural networks for natural language processing. Check it out and let me know your thoughts!",
      images: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWklMjByZXNlYXJjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'],
      postedAt: '2 hours ago',
      likes: 34,
      comments: 12,
      shares: 5,
      saved: false
    },
    {
      id: '2',
      author: {
        name: 'Maya Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        title: 'Machine Learning Engineer at DataVision Inc.'
      },
      content: "I'm looking for collaborators on a new project focused on applying machine learning to climate data. If you have experience with environmental datasets or time series forecasting, please reach out!",
      images: [],
      postedAt: '5 hours ago',
      likes: 21,
      comments: 8,
      shares: 3,
      saved: true
    },
    {
      id: '3',
      author: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        title: 'PhD Candidate at Stanford University'
      },
      content: "Excited to share that I've been selected for a research grant to study the ethics of AI in healthcare! Looking forward to diving deeper into this important area.",
      images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoY2FyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60', 'https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhbHRoY2FyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'],
      postedAt: '1 day ago',
      likes: 87,
      comments: 24,
      shares: 15,
      saved: false
    }
  ];

  const [activeTab, setActiveTab] = useState("feed");

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Tabs defaultValue="feed" className="w-full mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-6 p-1.5 gap-1">
              <TabsTrigger 
                value="feed" 
                className="text-lg py-3 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <TrendingUp className="h-5 w-5 mr-2 md:inline-block hidden" />
                Main Feed
              </TabsTrigger>
              <TabsTrigger 
                value="research" 
                className="text-lg py-3 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BookOpen className="h-5 w-5 mr-2 md:inline-block hidden" />
                Research Trends
              </TabsTrigger>
              <TabsTrigger 
                value="collab" 
                className="text-lg py-3 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="h-5 w-5 mr-2 md:inline-block hidden" />
                Team Collab
              </TabsTrigger>
              <TabsTrigger 
                value="qa" 
                className="text-lg py-3 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageSquare className="h-5 w-5 mr-2 md:inline-block hidden" />
                Live Q&A
              </TabsTrigger>
              <TabsTrigger 
                value="challenges" 
                className="text-lg py-3 font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Trophy className="h-5 w-5 mr-2 md:inline-block hidden" />
                Challenges
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar */}
                <div className="hidden lg:block">
                  <div className="glass-card rounded-2xl p-6 sticky top-24">
                    <h3 className="text-lg font-semibold mb-4">Communities</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 hover:bg-secondary/50 p-2 rounded-lg cursor-pointer">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">AI Researchers</p>
                          <p className="text-xs text-muted-foreground">1.2K members</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 hover:bg-secondary/50 p-2 rounded-lg cursor-pointer">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Data Science Hub</p>
                          <p className="text-xs text-muted-foreground">3.4K members</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 hover:bg-secondary/50 p-2 rounded-lg cursor-pointer">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">ML Engineers</p>
                          <p className="text-xs text-muted-foreground">2.8K members</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Discover Communities
                    </Button>
                  </div>
                </div>
                
                {/* Main Feed */}
                <div className="lg:col-span-2">
                  {/* Create Post */}
                  <PostEditor 
                    placeholder="Share your thoughts, research, or ask a question..."
                    onPostSubmit={(content, media) => {
                      console.log("Post submitted:", { content, media });
                    }}
                  />
                  
                  {/* Posts */}
                  <div className="space-y-6">
                    {posts.map((post, index) => (
                      <PostCard
                        key={post.id}
                        {...post}
                        style={{ animationDelay: `${index * 100}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="research">
              <ResearchTrendsSection />
            </TabsContent>
            
            <TabsContent value="collab">
              <TeamCollabSection />
            </TabsContent>
            
            <TabsContent value="qa">
              <LiveQASection />
            </TabsContent>
            
            <TabsContent value="challenges">
              <ChallengesSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Feed;
