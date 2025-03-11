
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { SearchProvider } from '@/context/SearchContext';
import ProjectSearch from '@/components/projects/ProjectSearch';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectSort from '@/components/projects/ProjectSort';
import { filterProjects } from '@/utils/projectUtils';
import { useSearch } from '@/context/SearchContext';

// Sample projects data
const projectsData = [
  {
    id: '1',
    title: 'Neural Network Optimization Framework',
    description: 'A framework for optimizing neural network architectures using advanced search algorithms and parallel processing.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5ldXJhbCUyMG5ldHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    tags: ['Neural Networks', 'Optimization', 'Python', 'AI'],
    stats: { views: 2156, stars: 132, forks: 28 }
  },
  {
    id: '2',
    title: 'Real-time NLP Analysis Tool',
    description: 'A tool for analyzing natural language in real-time, with applications in sentiment analysis, content categorization, and text summarization.',
    imageUrl: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJhbCUyMGxhbmd1YWdlJTIwcHJvY2Vzc2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['NLP', 'Real-time', 'Analysis', 'Machine Learning'],
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
    tags: ['Career', 'Resume', 'ML', 'NLP'],
    stats: { views: 782, stars: 56, forks: 4 }
  },
  {
    id: '6',
    title: 'Knowledge Graph Generator',
    description: 'A tool that automatically creates knowledge graphs from research papers and academic resources.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGtub3dsZWRnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Knowledge Graph', 'Academic', 'Research', 'Machine Learning'],
    stats: { views: 645, stars: 41, forks: 6 }
  },
  {
    id: '7',
    title: 'Generative AI Image Tool',
    description: 'Advanced tool for generating realistic images using the latest generative AI techniques.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    tags: ['Generative AI', 'Computer Vision', 'AI'],
    stats: { views: 1589, stars: 112, forks: 17 }
  },
  {
    id: '8',
    title: 'Robotics Control System',
    description: 'A sophisticated control system for autonomous robots in industrial settings.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5ldXJhbCUyMG5ldHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    tags: ['Robotics', 'Control Systems', 'Automation'],
    stats: { views: 892, stars: 75, forks: 9 }
  }
];

const ProjectsContent = () => {
  const { searchTerm, selectedCategories, sortOption } = useSearch();
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      const filtered = filterProjects(
        projectsData,
        searchTerm,
        selectedCategories,
        sortOption
      );
      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategories, sortOption]);

  return (
    <>
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
            <ProjectSearch />
          </div>
          <div className="flex gap-3">
            <ProjectFilters />
            <ProjectSort />
          </div>
        </div>
      </div>
      
      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div 
              key={index} 
              className="rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse h-[300px]"
            ></div>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              className={`animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reset all filters
          </Button>
        </div>
      )}
      
      {/* Load More Button - show only if there are results */}
      {filteredProjects.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </div>
      )}
    </>
  );
};

const Projects = () => {
  return (
    <SearchProvider>
      <Navbar />
      <main className="pt-24">
        <div className="container mx-auto px-4 md:px-6 pb-16">
          <ProjectsContent />
        </div>
      </main>
      <Footer />
    </SearchProvider>
  );
};

export default Projects;
