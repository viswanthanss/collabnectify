
import { Post, Comment, CommunityGroup } from "@/types/project";

// Sample user avatars
const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
];

// Sample post images
const postImages = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWklMjByZXNlYXJjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
];

// Sample names and titles
const authors = [
  { name: "Alex Chen", title: "AI Research Scientist" },
  { name: "Maya Johnson", title: "Machine Learning Engineer" },
  { name: "David Kim", title: "PhD Candidate" },
  { name: "Sophia Lee", title: "Data Scientist" },
  { name: "James Wilson", title: "Computer Vision Specialist" },
  { name: "Emma Brown", title: "NLP Researcher" },
  { name: "Michael Scott", title: "Robotics Engineer" },
  { name: "Lisa Taylor", title: "AI Ethics Researcher" }
];

// Generate random posts for different groups
export const generatePostsForGroup = (groupId: string, count: number): Post[] => {
  const posts: Post[] = [];
  
  for (let i = 0; i < count; i++) {
    const authorIndex = Math.floor(Math.random() * authors.length);
    const hasMedia = Math.random() > 0.3;
    const mediaCount = hasMedia ? Math.floor(Math.random() * 2) + 1 : 0;
    
    const media = [];
    if (mediaCount > 0) {
      for (let j = 0; j < mediaCount; j++) {
        media.push(postImages[Math.floor(Math.random() * postImages.length)]);
      }
    }
    
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));
    
    posts.push({
      id: `${groupId}-post-${i}`,
      authorId: `author-${authorIndex}`,
      author: {
        name: authors[authorIndex].name,
        avatar: avatars[authorIndex % avatars.length],
        title: authors[authorIndex].title
      },
      content: getRandomPostContent(groupId),
      media: mediaCount > 0 ? media : undefined,
      groupId,
      createdAt: getRandomTimeAgo(),
      likes: Math.floor(Math.random() * 200),
      comments: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 1000) + 200,
      shares: Math.floor(Math.random() * 30),
      saved: Math.random() > 0.7
    });
  }
  
  return posts;
};

// Helper to get a random "time ago" string
function getRandomTimeAgo(): string {
  const units = ["minutes", "hours", "days", "weeks"];
  const unit = units[Math.floor(Math.random() * units.length)];
  const value = Math.floor(Math.random() * 20) + 1;
  return `${value} ${unit} ago`;
}

// Generate content based on the group
function getRandomPostContent(groupId: string): string {
  const aiResearchPosts = [
    "Just published our latest research on transformer architecture improvements. We've achieved a 17% increase in efficiency while maintaining the same level of accuracy. Check out the paper link in comments!",
    "Excited to share that our team's work on few-shot learning has been accepted to NeurIPS this year! Looking for collaborators on extending this to multi-modal applications.",
    "Question for AI researchers: What's your take on the recent developments in retrieval-augmented generation models? Are they genuinely improving reasoning capabilities or just better at information retrieval?",
    "I've been exploring the trade-offs between model size and specialization. Preliminary results suggest that domain-specific medium-sized models often outperform much larger general models for specialized tasks.",
    "Just released our Python library for efficient fine-tuning of large language models on consumer-grade hardware. Feedback welcome!"
  ];
  
  const dataAnalysisPosts = [
    "Interesting finding in our latest data analysis: user engagement patterns show significant regional variations that weren't captured in previous models. Time to rethink our approach!",
    "Working on a new visualization technique for high-dimensional data. Early results are promising for identifying clusters that traditional methods miss.",
    "Question for data folks: What's your preferred method for dealing with highly imbalanced datasets when the minority class is the one of interest?",
    "Just completed an analysis of public health data across 50 cities. The correlation between green space access and mental health outcomes is stronger than we expected.",
    "How do you effectively communicate uncertainty in your data visualizations to non-technical stakeholders? Looking for practical approaches that have worked for you."
  ];
  
  const ethicsPosts = [
    "We need to talk about the carbon footprint of training large AI models. Our team is working on a framework to assess environmental impact alongside performance metrics.",
    "Concerned about the recent trend of companies releasing powerful AI models with minimal safety testing. What accountability mechanisms should we be pushing for as a community?",
    "I'm looking for collaborators on a project to develop fairness metrics specifically tailored to educational technology applications. DM if interested!",
    "Important question: How do we balance open research with responsible deployment when it comes to dual-use AI technologies?",
    "Just published a case study on how seemingly neutral recommendation algorithms reinforced existing societal biases in job matching applications."
  ];
  
  const careerPosts = [
    "After 5 years in industry, I'm transitioning back to academia to focus on research. Happy to share insights with anyone considering a similar move!",
    "What skills do you find most valuable for AI researchers today that weren't emphasized in your formal education?",
    "Mentoring opportunity: I have space for 2 more mentees interested in AI ethics and policy. Particularly looking to support underrepresented groups in AI.",
    "Just opened 3 positions on my team for ML engineers with experience in computer vision. Remote-friendly, flexible hours. DM for details!",
    "For those early in their AI careers: Don't underestimate the value of understanding data infrastructure and engineering practices. It's made a huge difference in my effectiveness."
  ];
  
  const interviewPosts = [
    "Common mistake I see in technical interviews: candidates rushing to code before fully understanding the problem. Take your time to clarify requirements!",
    "For those interviewing for AI research positions: be prepared to explain your research to both technical and non-technical interviewers. Practice is key.",
    "Just updated my repository of ML system design interview questions with 10 new examples based on recent interview experiences. Link in comments!",
    "What's your approach to assessing a candidate's potential beyond their current skills? Looking for innovative interview techniques.",
    "I've interviewed over 100 ML engineers this year. The strongest candidates all demonstrate one key quality: they can explain complex concepts simply."
  ];
  
  if (groupId === "ai-research") {
    return aiResearchPosts[Math.floor(Math.random() * aiResearchPosts.length)];
  } else if (groupId === "data-analysis") {
    return dataAnalysisPosts[Math.floor(Math.random() * dataAnalysisPosts.length)];
  } else if (groupId === "ai-ethics") {
    return ethicsPosts[Math.floor(Math.random() * ethicsPosts.length)];
  } else if (groupId === "career-growth") {
    return careerPosts[Math.floor(Math.random() * careerPosts.length)];
  } else if (groupId === "interview-prep") {
    return interviewPosts[Math.floor(Math.random() * interviewPosts.length)];
  } else {
    return "Sharing my thoughts on the latest developments in AI and machine learning. What are your thoughts?";
  }
}

// Community Groups data
export const communityGroups: CommunityGroup[] = [
  {
    id: "ai-research",
    name: "AI Research",
    description: "Discuss the latest in artificial intelligence research and breakthroughs",
    icon: "🧠",
    members: 3240,
    posts: []
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Share techniques and insights for analyzing complex datasets",
    icon: "📊",
    members: 2876,
    posts: []
  },
  {
    id: "ai-ethics",
    name: "AI Ethics & Policy",
    description: "Exploring the ethical implications and policy needs for AI development",
    icon: "⚖️",
    members: 1982,
    posts: []
  },
  {
    id: "career-growth",
    name: "Career Growth",
    description: "Strategies and advice for advancing your career in AI and tech",
    icon: "📈",
    members: 4125,
    posts: []
  },
  {
    id: "interview-prep",
    name: "Interview Preparation",
    description: "Resources and tips for technical interviews in AI and ML roles",
    icon: "💼",
    members: 3567,
    posts: []
  }
];

// Initialize posts for each group
communityGroups.forEach(group => {
  group.posts = generatePostsForGroup(group.id, 20);
});

// Sort posts by different criteria
export const sortPosts = (posts: Post[], sortOption: string): Post[] => {
  switch (sortOption) {
    case 'Most Recent':
      // This is a simple simulation - in a real app you'd compare actual dates
      return [...posts].sort((a, b) => {
        const aTime = parseInt(a.createdAt.split(' ')[0]);
        const bTime = parseInt(b.createdAt.split(' ')[0]);
        const aUnit = a.createdAt.split(' ')[1];
        const bUnit = b.createdAt.split(' ')[1];
        
        // Simple sorting logic - could be more sophisticated with real dates
        if (aUnit === bUnit) {
          return aTime - bTime;
        } else {
          const unitWeight = { minutes: 1, hours: 2, days: 3, weeks: 4, months: 5 };
          return (unitWeight[aUnit as keyof typeof unitWeight] || 0) - (unitWeight[bUnit as keyof typeof unitWeight] || 0);
        }
      });
      
    case 'Most Liked':
      return [...posts].sort((a, b) => b.likes - a.likes);
      
    case 'Most Viewed':
      return [...posts].sort((a, b) => b.views - a.views);
      
    default:
      return posts;
  }
};

// Filter posts by search term
export const filterPosts = (posts: Post[], searchTerm: string): Post[] => {
  if (!searchTerm) return posts;
  
  const term = searchTerm.toLowerCase();
  return posts.filter(post => 
    post.content.toLowerCase().includes(term) || 
    post.author.name.toLowerCase().includes(term) ||
    post.author.title.toLowerCase().includes(term)
  );
};

// Get all posts from all groups
export const getAllPosts = (): Post[] => {
  return communityGroups.flatMap(group => group.posts);
};
