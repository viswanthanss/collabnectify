
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, Star, GitBranch, Share, MessageSquare, Heart, ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // This would normally come from an API or database
  // For now we'll use mock data
  const project = {
    id,
    title: 'Neural Network Optimization Framework',
    description: 'A framework for optimizing neural network architectures using advanced search algorithms and parallel processing. This project aims to automate the process of architecture selection and hyperparameter tuning, significantly reducing the time required for model development.',
    longDescription: `
      Neural networks have become the cornerstone of modern AI applications, yet finding the optimal architecture and hyperparameters remains a challenging and time-consuming task. This framework addresses this challenge by providing:

      1. Automated architecture search using evolutionary algorithms and Bayesian optimization
      2. Distributed training capabilities across multiple GPUs and machines
      3. Intelligent early stopping and pruning mechanisms
      4. Visualization tools for architecture comparison
      
      The framework is designed to be framework-agnostic, supporting PyTorch, TensorFlow, and JAX backends.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5ldXJhbCUyMG5ldHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    tags: ['Neural Networks', 'Optimization', 'Python', 'TensorFlow', 'PyTorch', 'Machine Learning'],
    stats: { views: 2156, stars: 132, forks: 28 },
    team: [
      { name: 'Sarah Chen', role: 'Lead Developer', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'David Kim', role: 'ML Engineer', avatar: 'https://i.pravatar.cc/150?img=2' },
      { name: 'Rachel Patel', role: 'Data Scientist', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    discussions: [
      { id: '1', author: 'Michael Johnson', avatar: 'https://i.pravatar.cc/150?img=4', content: 'Have you considered implementing ENAS as one of the search strategies?', timestamp: '2 days ago', likes: 8, replies: 3 },
      { id: '2', author: 'Li Wei', avatar: 'https://i.pravatar.cc/150?img=5', content: 'The distributed training module is working great. I was able to scale across 8 GPUs with near-linear speedup.', timestamp: '5 days ago', likes: 12, replies: 2 }
    ],
    updates: [
      { title: 'Added JAX support', date: 'October 15, 2023', description: 'Implemented JAX backend for faster training on TPUs' },
      { title: 'Version 2.0 Release', date: 'September 27, 2023', description: 'Major update with improved search algorithms and UI' }
    ]
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate('/projects')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          
          {/* Project Header */}
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <div className="aspect-video w-full relative">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h1>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="rounded-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Star
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground mt-4">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {project.stats.views} views
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {project.stats.stars} stars
                </span>
                <span className="flex items-center">
                  <GitBranch className="h-4 w-4 mr-1" />
                  {project.stats.forks} forks
                </span>
              </div>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="about">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">About this project</h2>
                    <div className="prose dark:prose-invert">
                      <p className="whitespace-pre-line">{project.longDescription}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="discussions" className="space-y-6">
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Discussions</h2>
                      <Button>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        New Discussion
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {project.discussions.map((discussion) => (
                        <div key={discussion.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={discussion.avatar} alt={discussion.author} />
                              <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium">{discussion.author}</h4>
                                <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                              </div>
                              <p className="text-sm mb-3">{discussion.content}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {discussion.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  {discussion.replies} Replies
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="updates" className="space-y-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Project Updates</h2>
                    <div className="space-y-6">
                      {project.updates.map((update, index) => (
                        <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="font-semibold">{update.date.split(' ')[0].slice(0, 3)}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">{update.title}</h3>
                              <div className="text-xs text-muted-foreground mb-2">{update.date}</div>
                              <p className="text-sm">{update.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar - 1/3 width on large screens */}
            <div className="space-y-8">
              {/* Team Section */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Team</h2>
                <div className="space-y-4">
                  {project.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-sm">{member.name}</h4>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Similar Projects - Would be populated from API/recommendations */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Similar Projects</h2>
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">You might also be interested in:</p>
                  <ul className="space-y-2">
                    <li className="hover:text-primary transition-colors">
                      <a href="#" className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        Distributed Neural Architecture Search
                      </a>
                    </li>
                    <li className="hover:text-primary transition-colors">
                      <a href="#" className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        Automated Machine Learning Platform
                      </a>
                    </li>
                    <li className="hover:text-primary transition-colors">
                      <a href="#" className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        GPU-Accelerated Model Training
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetail;
