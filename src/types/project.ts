
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[];
  stats?: {
    views?: number;
    stars?: number;
    forks?: number;
  };
}
