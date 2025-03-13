
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, GitBranch, Clock, HandshakeIcon, Briefcase, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const TeamCollabSection = () => {
  const collaborationOpportunities = [
    {
      id: '1',
      title: 'Computer Vision Research Project',
      description: 'Looking for ML engineers and data scientists to collaborate on an advanced object recognition system for medical imaging.',
      skillsNeeded: ['Python', 'TensorFlow', 'Computer Vision', 'Medical Domain Knowledge'],
      timeCommitment: '10+ hours/week',
      duration: '3 months',
      creator: {
        name: 'Dr. Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        role: 'Research Lead'
      },
      teamSize: 4,
      openPositions: 2,
    },
    {
      id: '2',
      title: 'Generative AI for Music Composition',
      description: 'Developing a novel approach to music generation using transformer-based models and reinforcement learning.',
      skillsNeeded: ['PyTorch', 'Music Theory', 'Audio Processing', 'Transformers'],
      timeCommitment: '15+ hours/week',
      duration: '6 months',
      creator: {
        name: 'Michael Park',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        role: 'AI Engineer'
      },
      teamSize: 3,
      openPositions: 2,
    },
    {
      id: '3',
      title: 'AI Ethics Research Group',
      description: 'Exploring the ethical implications of large language models and developing guidelines for responsible AI deployment.',
      skillsNeeded: ['Ethics', 'AI/ML Knowledge', 'Policy', 'Research Writing'],
      timeCommitment: '8+ hours/week',
      duration: 'Ongoing',
      creator: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        role: 'Ethics Researcher'
      },
      teamSize: 6,
      openPositions: 3,
    }
  ];

  const handleJoinRequest = (projectId: string, projectTitle: string) => {
    toast.success(`Request to join "${projectTitle}" sent successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Team Collaboration Opportunities
          </h2>
          <p className="text-muted-foreground">Connect with others and join exciting research projects</p>
        </div>
        <Button>Post New Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborationOpportunities.map(opportunity => (
          <Card key={opportunity.id} className="border-2 hover:border-primary transition-colors duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-primary/10 text-primary border-primary hover:bg-primary/20">
                  {opportunity.openPositions} open positions
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{opportunity.timeCommitment}</span>
                </div>
              </div>
              <CardTitle className="text-xl">{opportunity.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground mb-4">{opportunity.description}</p>
              
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={opportunity.creator.avatar} />
                  <AvatarFallback>{opportunity.creator.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{opportunity.creator.name}</div>
                  <div className="text-xs text-muted-foreground">{opportunity.creator.role}</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.skillsNeeded.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-secondary/50">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{opportunity.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Team of {opportunity.teamSize}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button 
                variant="outline" 
                className="flex-1 mr-2"
                onClick={() => toast.info(`Chatting with ${opportunity.creator.name} about "${opportunity.title}"`)}
              >
                Message
              </Button>
              <Button 
                className="flex-1"
                onClick={() => handleJoinRequest(opportunity.id, opportunity.title)}
              >
                Join Project
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Your Collaboration Profile</h3>
        <p className="text-muted-foreground mb-4">
          Complete your skills profile to get matched with the most relevant collaboration opportunities.
        </p>
        <Button>Update Skills Profile</Button>
      </div>
    </div>
  );
};

export default TeamCollabSection;
