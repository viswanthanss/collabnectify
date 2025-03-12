
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[]; // Make sure tags are optional here too
  stats?: {
    views?: number;
    stars?: number;
    forks?: number;
  };
}

export interface Post {
  id: string;
  authorId: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  content: string;
  media?: string[];
  groupId?: string;
  createdAt: string;
  likes: number;
  comments: number;
  views: number;
  shares: number;
  saved: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  members: number;
  posts: Post[];
}
