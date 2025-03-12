
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectSearch from '@/components/projects/ProjectSearch';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectSort from '@/components/projects/ProjectSort';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus, X } from 'lucide-react';
import { useSearch } from '@/context/SearchContext';
import { filterProjects } from '@/utils/projectUtils';
import { Project } from '@/types/project';

const Projects = () => {
  // Sample projects data
  const [initialProjects, setInitialProjects] = useState<Project[]>([
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
      title: 'Computer Vision Dataset Generator',
      description: 'A tool for generating synthetic datasets for computer vision tasks, with configurable parameters for diversity and complexity.',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXB1dGVyJTIwdmlzaW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      tags: ['Computer Vision', 'Dataset', 'Synthetic Data'],
      stats: { views: 1532, stars: 76, forks: 15 }
    },
    {
      id: '4',
      title: 'Reinforcement Learning Environment',
      description: 'A customizable environment for testing and benchmarking reinforcement learning algorithms across various domains.',
      imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cm9ib3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      tags: ['Reinforcement Learning', 'Benchmark', 'AI'],
      stats: { views: 1985, stars: 124, forks: 32 }
    },
    {
      id: '5',
      title: 'Generative AI Art Platform',
      description: 'A platform for creating and sharing AI-generated art using various generative models and style transfer techniques.',
      imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z2VuZXJhdGl2ZSUyMGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      tags: ['Generative AI', 'Art', 'Creative'],
      stats: { views: 3241, stars: 187, forks: 43 }
    },
    {
      id: '6',
      title: 'Collaborative Research Platform',
      description: 'A platform for AI researchers to collaborate on projects, share findings, and contribute to open research initiatives.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbGxhYm9yYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      tags: ['Collaboration', 'Research', 'Open Science'],
      stats: { views: 1678, stars: 89, forks: 24 }
    }
  ]);
  
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects);
  const { searchTerm, selectedCategories, sortOption } = useSearch();
  
  useEffect(() => {
    const filtered = filterProjects(initialProjects, searchTerm, selectedCategories, sortOption);
    setFilteredProjects(filtered);
  }, [initialProjects, searchTerm, selectedCategories, sortOption]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Explore Projects</h1>
              <p className="text-muted-foreground">
                Discover innovative AI and machine learning projects from researchers around the world
              </p>
            </div>
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <ProjectSearch />
            </div>
            <div className="flex gap-2">
              <ProjectFilters />
              <ProjectSort />
            </div>
          </div>
          
          {/* Selected filters */}
          {selectedCategories.length > 0 && selectedCategories[0] !== 'All' && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map(category => (
                <div key={category} className="bg-secondary text-secondary-foreground text-sm rounded-full px-3 py-1 flex items-center">
                  {category}
                  <button className="ml-2 hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => window.location.reload()}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
