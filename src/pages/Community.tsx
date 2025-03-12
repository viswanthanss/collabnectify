
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, Bell, Plus } from 'lucide-react';
import CommunityGroupCard from '@/components/community/CommunityGroupCard';
import PostCard from '@/components/community/PostCard';
import PostEditor from '@/components/community/PostEditor';
import PostSorter from '@/components/community/PostSorter';
import { Post, CommunityGroup } from '@/types/project';
import { communityGroups, sortPosts, filterPosts, getAllPosts } from '@/utils/postUtils';
import { toast } from 'sonner';

const Community = () => {
  const [activeGroup, setActiveGroup] = useState<CommunityGroup | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortOption, setSortOption] = useState('Most Recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredPosts: Post[];
      
      if (activeGroup) {
        filteredPosts = [...activeGroup.posts];
      } else {
        filteredPosts = getAllPosts();
      }
      
      // Apply search filter
      filteredPosts = filterPosts(filteredPosts, searchTerm);
      
      // Apply sorting
      filteredPosts = sortPosts(filteredPosts, sortOption);
      
      setPosts(filteredPosts);
      setIsLoading(false);
    }, 500);
  }, [activeGroup, sortOption, searchTerm]);
  
  const handleGroupSelect = (group: CommunityGroup) => {
    setActiveGroup(group);
  };
  
  const handleClearGroup = () => {
    setActiveGroup(null);
  };
  
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  
  const handlePostSubmit = (content: string, media: string[]) => {
    const newPost: Post = {
      id: `new-post-${Date.now()}`,
      authorId: 'current-user',
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        title: 'AI Researcher'
      },
      content,
      media: media.length > 0 ? media : undefined,
      groupId: activeGroup?.id,
      createdAt: 'Just now',
      likes: 0,
      comments: 0,
      views: 1,
      shares: 0,
      saved: false
    };
    
    setPosts([newPost, ...posts]);
  };
  
  const handleNotificationClick = () => {
    toast.success("No new notifications!");
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Community</h1>
              <p className="text-muted-foreground">
                Connect with AI researchers and professionals, share insights, and collaborate on projects
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleNotificationClick} variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button>
                <Plus className="h-5 w-5 mr-1" />
                New Post
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Community Groups */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Communities</h3>
                  <Button variant="ghost" size="sm" onClick={handleClearGroup} disabled={!activeGroup}>
                    View All
                  </Button>
                </div>
                
                <div className="space-y-2 mb-4">
                  {communityGroups.map((group) => (
                    <CommunityGroupCard 
                      key={group.id}
                      group={group}
                      isActive={activeGroup?.id === group.id}
                      onClick={() => handleGroupSelect(group)}
                    />
                  ))}
                </div>
                
                <Button variant="outline" className="w-full">
                  <Users className="h-5 w-5 mr-2" />
                  Create Community
                </Button>
              </div>
            </div>
            
            {/* Main Content - Posts */}
            <div className="lg:col-span-3">
              {/* Group Header */}
              {activeGroup && (
                <div className="glass-card rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">
                      {activeGroup.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">{activeGroup.name}</h2>
                      <p className="text-muted-foreground">{activeGroup.description}</p>
                    </div>
                    <Button>Join Community</Button>
                  </div>
                </div>
              )}
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <PostSorter onSortChange={handleSortChange} currentSort={sortOption} />
              </div>
              
              {/* Post Editor */}
              <PostEditor onPostSubmit={handlePostSubmit} />
              
              {/* Posts List */}
              <div className="space-y-6">
                {isLoading ? (
                  // Loading state
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="rounded-xl border border-border bg-card p-6 animate-pulse">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-muted"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-muted rounded"></div>
                          <div className="h-3 w-24 bg-muted rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-3/4 bg-muted rounded"></div>
                      </div>
                      <div className="h-40 bg-muted rounded-xl mb-4"></div>
                      <div className="flex justify-between pt-4 border-t border-border">
                        <div className="h-8 w-16 bg-muted rounded"></div>
                        <div className="h-8 w-16 bg-muted rounded"></div>
                        <div className="h-8 w-16 bg-muted rounded"></div>
                      </div>
                    </div>
                  ))
                ) : posts.length > 0 ? (
                  posts.map((post, index) => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      style={{ animationDelay: `${index * 100}ms` }}
                    />
                  ))
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm 
                        ? "No posts matching your search criteria" 
                        : activeGroup 
                          ? `No posts in ${activeGroup.name} yet` 
                          : "No posts available"}
                    </p>
                    <Button onClick={() => setSearchTerm('')}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Community;
