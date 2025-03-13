
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Calendar, Clock, Users, Video, Mic } from 'lucide-react';
import { toast } from 'sonner';

const LiveQASection = () => {
  const upcomingSessions = [
    {
      id: '1',
      title: 'Advanced Techniques in Deep Learning',
      host: {
        name: 'Dr. Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        title: 'AI Research Scientist'
      },
      date: 'Tomorrow',
      time: '3:00 PM - 4:30 PM',
      attendees: 42,
      topics: ['Neural Networks', 'Optimization', 'Model Architecture'],
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Q&A: Ethical Considerations in AI Development',
      host: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        title: 'Ethics Researcher'
      },
      date: 'Today',
      time: '5:00 PM - 6:00 PM',
      attendees: 37,
      topics: ['Bias', 'Fairness', 'Transparency'],
      status: 'live'
    },
    {
      id: '3',
      title: 'Machine Learning for Computer Vision',
      host: {
        name: 'Michael Park',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        title: 'Computer Vision Expert'
      },
      date: 'June 18, 2023',
      time: '2:00 PM - 3:30 PM',
      attendees: 25,
      topics: ['Object Detection', 'Image Classification', 'CNNs'],
      status: 'upcoming'
    }
  ];

  const ongoingDiscussions = [
    {
      id: '1',
      title: 'Optimizing Transformer Models for Production',
      participants: 8,
      messages: 32,
      lastActive: '2 minutes ago'
    },
    {
      id: '2',
      title: 'Best practices for data augmentation in small datasets',
      participants: 12,
      messages: 47,
      lastActive: '15 minutes ago'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Live Q&A Sessions
          </h2>
          <p className="text-muted-foreground">Join interactive discussions with experts and peers</p>
        </div>
        <Button>Schedule a Session</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium mb-4">Upcoming & Live Sessions</h3>
          <div className="space-y-4">
            {upcomingSessions.map(session => (
              <Card key={session.id} className={`border-2 ${session.status === 'live' ? 'border-red-500 animate-pulse' : 'hover:border-primary'} transition-colors duration-300`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{session.title}</CardTitle>
                    {session.status === 'live' && (
                      <Badge className="bg-red-500 text-white">LIVE NOW</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={session.host.avatar} />
                      <AvatarFallback>{session.host.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{session.host.name}</div>
                      <div className="text-sm text-muted-foreground">{session.host.title}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{session.attendees} attending</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {session.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {session.status === 'live' ? (
                    <Button className="w-full bg-red-500 hover:bg-red-600">
                      <Video className="h-4 w-4 mr-2" />
                      Join Live Session
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => toast.success(`Reminder set for "${session.title}"`)}>
                      Set Reminder
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ongoing Text Discussions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ongoingDiscussions.map(discussion => (
                <div 
                  key={discussion.id}
                  className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                  onClick={() => toast.info(`Joining discussion: ${discussion.title}`)}
                >
                  <h4 className="font-medium text-sm mb-2">{discussion.title}</h4>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{discussion.participants} participants</span>
                    <span>{discussion.messages} messages</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Last active: {discussion.lastActive}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => toast.info("Loading more discussions")}>
                View All Discussions
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Start Your Own Q&A</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Share your expertise or ask questions by starting a new Q&A session with your connections.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => toast.info("Voice session setup started")}>
                  <Mic className="h-4 w-4 mr-2" />
                  Voice
                </Button>
                <Button onClick={() => toast.info("Video session setup started")}>
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveQASection;
