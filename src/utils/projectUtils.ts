
import { Project } from "@/types/project";

export const filterProjects = (
  projects: Project[],
  searchTerm: string,
  categories: string[],
  sortOption: string
): Project[] => {
  // Step 1: Filter by search term
  let filteredProjects = projects;
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredProjects = filteredProjects.filter(
      project => 
        project.title.toLowerCase().includes(searchLower) || 
        project.description.toLowerCase().includes(searchLower) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  }

  // Step 2: Filter by categories
  if (categories.length > 0 && !categories.includes('All')) {
    filteredProjects = filteredProjects.filter(
      project => project.tags && project.tags.some(tag => categories.includes(tag))
    );
  }

  // Step 3: Sort projects
  switch (sortOption) {
    case 'Most Recent':
      // Assuming newer projects have higher IDs
      return [...filteredProjects].sort((a, b) => parseInt(b.id) - parseInt(a.id));
    case 'Most Popular':
      return [...filteredProjects].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0));
    case 'Most Liked':
      return [...filteredProjects].sort((a, b) => (b.stats?.stars || 0) - (a.stats?.stars || 0));
    case 'Alphabetical (A-Z)':
      return [...filteredProjects].sort((a, b) => a.title.localeCompare(b.title));
    case 'Alphabetical (Z-A)':
      return [...filteredProjects].sort((a, b) => b.title.localeCompare(a.title));
    default:
      return filteredProjects;
  }
};
