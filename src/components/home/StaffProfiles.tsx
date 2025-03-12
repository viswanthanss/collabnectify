
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  expertise: string[];
  bio: string;
}

const StaffProfiles = () => {
  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Dr. Emma Richardson',
      role: 'Chief AI Researcher',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      expertise: ['Neural Networks', 'Computer Vision', 'NLP'],
      bio: 'Dr. Richardson leads our AI research initiatives, focusing on developing cutting-edge solutions for professional connectivity.'
    },
    {
      id: '2',
      name: 'James Wilson',
      role: 'Technical Director',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      expertise: ['Cloud Architecture', 'System Design', 'DevOps'],
      bio: 'With over 15 years of experience, James oversees the technical infrastructure that powers our platform.'
    },
    {
      id: '3',
      name: 'Sophia Chen',
      role: 'UX/UI Design Lead',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      expertise: ['User Experience', 'Interface Design', 'Accessibility'],
      bio: 'Sophia ensures our platform is intuitive, accessible, and visually appealing for all users.'
    },
    {
      id: '4',
      name: 'Marcus Johnson',
      role: 'Community Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      expertise: ['Community Building', 'Content Strategy', 'User Engagement'],
      bio: 'Marcus fosters our growing community, creating opportunities for meaningful connections among members.'
    }
  ];

  return (
    <section className="section-container">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="font-bold mb-2">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg">
              The experts behind ConnectAI's innovation and growth
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="mt-4 md:mt-0"
          >
            View All Team Members
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {staffMembers.map((staff, index) => (
            <Card key={staff.id} className={`overflow-hidden hover-scale animate-slide-up animate-delay-${(index + 1) * 100}`}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20">
                    <AvatarImage src={staff.avatar} alt={staff.name} />
                    <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="font-semibold text-xl mb-1">{staff.name}</h3>
                  <p className="text-primary text-sm mb-3">{staff.role}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {staff.expertise.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {staff.bio}
                  </p>
                  
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link to={`/team/${staff.id}`}>View Profile</Link>
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffProfiles;
