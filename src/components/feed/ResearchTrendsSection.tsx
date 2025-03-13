
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star, BookOpen } from 'lucide-react';

const ResearchTrendsSection = () => {
  const researchTrends = [
    {
      id: '1',
      title: 'Advances in Large Language Models',
      description: 'Recent innovations in LLMs are pushing the boundaries of AI capabilities and applications.',
      imageUrl: 'https://images.unsplash.com/photo-1677442135132-75ab584b15f4?q=80&w=1932&auto=format&fit=crop',
      category: 'AI Research',
      date: 'June 12, 2023',
      readTime: '8 min read',
      popularity: 'Trending',
    },
    {
      id: '2',
      title: 'Quantum Computing Breakthroughs',
      description: 'New quantum algorithms demonstrating practical quantum advantage in specific computational tasks.',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
      category: 'Quantum Computing',
      date: 'May 28, 2023',
      readTime: '10 min read',
      popularity: 'Hot',
    },
    {
      id: '3',
      title: 'Sustainable Machine Learning',
      description: 'How researchers are reducing the carbon footprint of training large AI models.',
      imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop',
      category: 'Green Tech',
      date: 'June 5, 2023',
      readTime: '7 min read',
      popularity: 'Rising',
    },
    {
      id: '4',
      title: 'Neuromorphic Computing Advancements',
      description: 'Brain-inspired computing architectures that promise energy efficiency and new capabilities.',
      imageUrl: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1964&auto=format&fit=crop',
      category: 'Computing',
      date: 'June 10, 2023',
      readTime: '9 min read',
      popularity: 'New',
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Research & Innovation Trends
          </h2>
          <p className="text-muted-foreground">Stay updated with the latest breakthroughs in your field</p>
        </div>
        <Button>All Trends</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {researchTrends.map(trend => (
          <Card key={trend.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={trend.imageUrl} 
                alt={trend.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  {trend.popularity}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-2 text-lg">{trend.title}</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">{trend.category}</Badge>
                <span>{trend.date}</span>
                <span>•</span>
                <span>{trend.readTime}</span>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <CardDescription className="line-clamp-3">
                {trend.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button variant="ghost" size="sm" className="gap-1">
                <BookOpen className="h-4 w-4" />
                Read More
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <Star className="h-4 w-4" />
                Save
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Weekly Research Digest</h3>
        <p className="text-muted-foreground mb-4">
          Get a curated list of the most important research papers and innovation news delivered to your inbox every week.
        </p>
        <Button>Subscribe to Digest</Button>
      </div>
    </div>
  );
};

export default ResearchTrendsSection;
