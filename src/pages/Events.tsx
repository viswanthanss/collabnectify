
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, MapPin, ArrowRight, Star } from 'lucide-react';
import EventCard from '@/components/events/EventCard';

const Events = () => {
  // Sample events data
  const upcomingEvents = [
    {
      id: '1',
      title: 'AI Innovation Summit 2023',
      description: 'Join industry leaders to discuss the latest advancements in artificial intelligence and machine learning.',
      date: 'November 15, 2023',
      time: '9:00 AM - 5:00 PM',
      location: 'San Francisco, CA',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      tags: ['AI', 'Machine Learning', 'Innovation'],
      format: 'In-person',
      attendees: 342,
      recommended: true
    },
    {
      id: '2',
      title: 'Web3 & Blockchain Conference',
      description: 'Explore the future of decentralized technologies and their impact on various industries.',
      date: 'December 3, 2023',
      time: '10:00 AM - 4:00 PM',
      location: 'Virtual',
      imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      tags: ['Blockchain', 'Web3', 'Cryptocurrency'],
      format: 'Online',
      attendees: 512,
      recommended: false
    },
    {
      id: '3',
      title: 'UX/UI Design Workshop',
      description: 'Hands-on workshop focusing on creating intuitive and engaging user experiences for digital products.',
      date: 'November 28, 2023',
      time: '1:00 PM - 5:00 PM',
      location: 'New York, NY',
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      tags: ['Design', 'UX', 'UI'],
      format: 'Hybrid',
      attendees: 125,
      recommended: true
    },
  ];

  const recommendedForYou = [
    {
      id: '4',
      title: 'AI in Healthcare Symposium',
      description: 'Explore how artificial intelligence is transforming healthcare delivery and research.',
      date: 'December 8, 2023',
      time: '9:00 AM - 3:00 PM',
      location: 'Boston, MA',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      tags: ['Healthcare', 'AI', 'Research'],
      format: 'In-person',
      attendees: 218,
      recommended: true
    },
    {
      id: '5',
      title: 'Python Developer Conference',
      description: 'Connect with fellow Python developers and learn about the latest libraries and frameworks.',
      date: 'January 12, 2024',
      time: '10:00 AM - 6:00 PM',
      location: 'Virtual',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      tags: ['Python', 'Development', 'Programming'],
      format: 'Online',
      attendees: 456,
      recommended: true
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">Discover Events & Webinars</h1>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up animate-delay-100">
                AI-powered recommendations for industry talks, networking events, and professional development opportunities
              </p>
              
              {/* Search Bar */}
              <div className="glass-card p-2 rounded-full flex items-center max-w-2xl mx-auto mb-6 animate-slide-up animate-delay-200">
                <Search className="ml-2 mr-1 h-5 w-5 text-muted-foreground shrink-0" />
                <Input 
                  type="text" 
                  placeholder="Search events by keyword, location, or speaker..." 
                  className="border-0 focus-visible:ring-0 bg-transparent"
                />
                <Button size="sm" className="rounded-full">
                  Search
                </Button>
              </div>
              
              {/* Quick Filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 animate-slide-up animate-delay-300">
                <Button variant="outline" size="sm" className="rounded-full">
                  All Events
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Virtual
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  In-person
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Free
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  This Weekend
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  AI & ML
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Recommended Events */}
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">AI-Recommended for You</h2>
              <p className="text-muted-foreground">Based on your skills, interests, and professional goals</p>
            </div>
            <Button variant="ghost" className="flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
            {recommendedForYou.map((event, index) => (
              <EventCard
                key={event.id}
                {...event}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
          
          {/* Upcoming Events */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events</h2>
              <p className="text-muted-foreground">Browse and register for the latest industry events</p>
            </div>
            <Button variant="ghost" className="flex items-center gap-1">
              View calendar <Calendar className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={event.id}
                {...event}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Events;
