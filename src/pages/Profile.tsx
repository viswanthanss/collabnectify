import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User, Mail, MapPin, Briefcase, Book, Calendar, Link as LinkIcon, PenSquare, LinkedIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/projects/ProjectCard';
import BadgesSection from '@/components/profile/BadgesSection';
import UserActivity from '@/components/profile/UserActivity';
import UserConnections from '@/components/profile/UserConnections';

const Profile = () => {
  // Sample user data
  const user = {
    name: 'Alex Chen',
    title: 'AI Research Scientist',
    bio: 'Passionate about pushing the boundaries of artificial intelligence and machine learning. Focusing on neural networks and natural language processing.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    email: 'alex.chen@example.com',
    location: 'San Francisco, CA',
    company: 'TechInnovate AI',
    education: 'Stanford University - Ph.D. in Computer Science',
    joined: 'January 2022',
    website: 'https://alexchen.example.com',
    skills: ['Machine Learning', 'Python', 'NLP', 'Computer Vision', 'TensorFlow', 'Deep Learning', 'Data Analysis', 'Research'],
    stats: { projects: 14, followers: 728, following: 156 }
  };

  // Sample projects
  const userProjects = [
    {
      id: '1',
      title: 'Neural Network Optimization Framework',
      description: 'A framework for optimizing neural network architectures using advanced search algorithms and parallel processing.',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5ldXJhbCUyMG5ldHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      tags: ['Neural Networks', 'Optimization', 'Python'],
      stats: { views: 2156, stars: 132, forks: 28 }
    },
    {
      id: '2',
      title: 'Real-time NLP Analysis Tool',
      description: 'A tool for analyzing natural language in real-time, with applications in sentiment analysis, content categorization, and text summarization.',
      imageUrl: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJhbCUyMGxhbmd1YWdlJTIwcHJvY2Vzc2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      tags: ['NLP', 'Real-time', 'Analysis'],
      stats: { views: 1873, stars: 97, forks: 21 }
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Profile Header */}
        <div className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20"></div>
              <div className="p-6 md:p-8 relative">
                <div className="absolute -top-16 left-8 w-32 h-32 rounded-full overflow-hidden border-4 border-card">
                  {user.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-4xl">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="mt-16 md:mt-4 md:ml-36 flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-1">{user.name}</h1>
                    <p className="text-xl text-muted-foreground mb-4">{user.title}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {user.skills.slice(0, 5).map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                      {user.skills.length > 5 && (
                        <span className="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          +{user.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-4 md:mt-0">
                    <Button>
                      Follow
                    </Button>
                    <Button variant="outline">
                      Message
                    </Button>
                    <Button variant="ghost" size="icon">
                      <PenSquare className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">About</h3>
                <p className="text-muted-foreground mb-6">{user.bio}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{user.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p>{user.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Book className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Education</p>
                      <p>{user.education}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p>{user.joined}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <LinkIcon className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a href={user.website} className="text-primary hover:underline">{user.website.replace('https://', '')}</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <div className="font-semibold text-xl">{user.stats.projects}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <div className="font-semibold text-xl">{user.stats.followers}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <div className="font-semibold text-xl">{user.stats.following}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                </div>
              </div>
              
              {/* Add LinkedIn Banner */}
              <div className="glass-card rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Connect on LinkedIn</h3>
                  <LinkedIn className="h-5 w-5 text-[#0077B5]" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your LinkedIn profile to expand your professional network
                </p>
                <Button className="w-full" variant="outline">
                  <LinkedIn className="h-4 w-4 mr-2" />
                  Connect Profile
                </Button>
              </div>
              
              <UserConnections />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Badges & Achievements Section */}
              <div className="mb-8">
                <BadgesSection />
              </div>
              
              {/* Activity Section */}
              <div className="glass-card rounded-2xl p-6 mb-8">
                <UserActivity />
              </div>
              
              {/* Projects Section */}
              <div className="glass-card rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-6">Projects</h3>
                <div className="space-y-6">
                  {userProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      {...project}
                    />
                  ))}
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

export default Profile;
