
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedSection from '@/components/home/FeaturedSection';
import ProjectCard from '@/components/projects/ProjectCard';
import ProfileCard from '@/components/profile/ProfileCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Sample data for projects
  const featuredProjects = [
    {
      id: '1',
      title: 'AI-Powered Research Assistant',
      description: 'An innovative research assistant that uses natural language processing to help researchers find relevant papers and insights.',
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      tags: ['AI', 'NLP', 'Research'],
      stats: { views: 1243, stars: 89, forks: 12 }
    },
    {
      id: '2',
      title: 'Smart Collaboration Dashboard',
      description: 'A dashboard for teams to collaborate more effectively using data-driven insights and AI suggestions.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbGxhYm9yYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      tags: ['Collaboration', 'Dashboard', 'Teams'],
      stats: { views: 956, stars: 72, forks: 8 }
    },
    {
      id: '3',
      title: 'CV Optimization Engine',
      description: 'AI tool that helps job seekers optimize their resumes for specific job postings by analyzing requirements and suggesting improvements.',
      imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3VtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      tags: ['Career', 'Resume', 'ML'],
      stats: { views: 782, stars: 56, forks: 4 }
    }
  ];

  // Sample data for profiles
  const featuredProfiles = [
    {
      id: '1',
      name: 'Alex Chen',
      title: 'AI Research Scientist',
      location: 'San Francisco, CA',
      company: 'TechInnovate AI',
      education: 'Stanford University',
      skills: ['Machine Learning', 'Python', 'NLP', 'Computer Vision', 'TensorFlow'],
      stats: { projects: 14, followers: 728, following: 156 }
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      title: 'Full Stack Developer',
      location: 'New York, NY',
      company: 'CodeCraft Solutions',
      education: 'MIT',
      skills: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'AWS'],
      stats: { projects: 32, followers: 512, following: 203 }
    },
    {
      id: '3',
      name: 'Michael Park',
      title: 'UX/UI Designer',
      location: 'London, UK',
      company: 'DesignNova',
      education: 'Royal College of Art',
      skills: ['UI Design', 'Figma', 'Prototyping', 'User Research', 'Interaction Design'],
      stats: { projects: 27, followers: 891, following: 124 }
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      title: 'Data Scientist',
      location: 'Austin, TX',
      company: 'DataDriven Analytics',
      education: 'UC Berkeley',
      skills: ['Data Analysis', 'R', 'Python', 'Visualization', 'Statistics'],
      stats: { projects: 19, followers: 423, following: 217 }
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedSection />

        {/* Featured Projects Section */}
        <section className="section-container bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <h2 className="font-bold mb-2">Featured Projects</h2>
                <p className="text-muted-foreground text-lg">
                  Discover innovative projects from our community
                </p>
              </div>
              <Button 
                variant="ghost" 
                className="mt-4 md:mt-0"
              >
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  className={`animate-slide-up animate-delay-${(index + 1) * 100}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Professionals Section */}
        <section className="section-container">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <h2 className="font-bold mb-2">Featured Professionals</h2>
                <p className="text-muted-foreground text-lg">
                  Connect with talented professionals in your field
                </p>
              </div>
              <Button 
                variant="ghost" 
                className="mt-4 md:mt-0"
              >
                View All Professionals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProfiles.map((profile, index) => (
                <ProfileCard
                  key={profile.id}
                  {...profile}
                  className={`animate-slide-up animate-delay-${(index + 1) * 100}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-container bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="font-bold mb-4">Ready to Elevate Your Professional Journey?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community of innovators, collaborators, and professionals to discover new opportunities and connections.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="rounded-full text-lg px-6">
                  Get Started Now
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-6">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
