
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import { Search, Filter, ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Projects = () => {
  // Sample projects data
  const projects = [
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
    },
    {
      id: '3',
      title: 'AI-Powered Research Assistant',
      description: 'An innovative research assistant that uses natural language processing to help researchers find relevant papers and insights.',
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      tags: ['AI', 'NLP', 'Research'],
      stats: { views: 1243, stars: 89, forks: 12 }
    },
    {
      id: '4',
      title: 'Smart Collaboration Dashboard',
      description: 'A dashboard for teams to collaborate more effectively using data-driven insights and AI suggestions.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbGxhYm9yYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      tags: ['Collaboration', 'Dashboard', 'Teams'],
      stats: { views: 956, stars: 72, forks: 8 }
    },
    {
      id: '5',
      title: 'CV Optimization Engine',
      description: 'AI tool that helps job seekers optimize their resumes for specific job postings by analyzing requirements and suggesting improvements.',
      imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3VtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      tags: ['Career', 'Resume', 'ML'],
      stats: { views: 782, stars: 56, forks: 4 }
    },
    {
      id: '6',
      title: 'Knowledge Graph Generator',
      description: 'A tool that automatically creates knowledge graphs from research papers and academic resources.',
      imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGtub3dsZWRnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      tags: ['Knowledge Graph', 'Academic', 'Research'],
      stats: { views: 645, stars: 41, forks: 6 }
    }
  ];

  // Filter tags
  const filterTags = ['All', 'AI', 'Machine Learning', 'NLP', 'Data Analysis', 'Collaboration', 'Career'];

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="container mx-auto px-4 md:px-6 pb-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-bold mb-4">Explore Projects</h1>
            <p className="text-xl text-muted-foreground">
              Discover innovative projects from professionals around the world
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="glass-card rounded-2xl p-4 md:p-6 mb-10">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  type="search" 
                  placeholder="Search projects..." 
                  className="pl-10 rounded-xl"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Filter className="h-5 w-5 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <ArrowDownUp className="h-5 w-5 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {filterTags.map((tag, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  className={`rounded-full text-sm ${index === 0 ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                  size="sm"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
