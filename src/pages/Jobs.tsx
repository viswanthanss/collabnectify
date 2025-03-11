
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Briefcase, Building, MapPin, ArrowRight, Star, Filter } from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';

const Jobs = () => {
  // Sample jobs data
  const recommendedJobs = [
    {
      id: '1',
      title: 'AI Research Scientist',
      company: 'TechInnovate AI',
      location: 'San Francisco, CA',
      salary: '$120K - $160K',
      type: 'Full-time',
      postedDate: '3 days ago',
      description: 'Join our research team to develop cutting-edge machine learning models for natural language processing and computer vision applications.',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'NLP'],
      matchPercentage: 94,
      logoUrl: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: '2',
      title: 'Machine Learning Engineer Intern',
      company: 'DataVision Inc.',
      location: 'Remote',
      salary: '$45/hr',
      type: 'Internship',
      postedDate: '1 day ago',
      description: 'Summer internship opportunity to work on real-world machine learning projects with guidance from senior ML engineers.',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'Deep Learning'],
      matchPercentage: 89,
      logoUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    },
  ];
  
  const allJobs = [
    {
      id: '3',
      title: 'Senior AI Product Manager',
      company: 'CloudTech Solutions',
      location: 'Seattle, WA',
      salary: '$150K - $180K',
      type: 'Full-time',
      postedDate: '1 week ago',
      description: 'Lead the development of AI-powered cloud solutions from conception to launch, working with cross-functional teams.',
      skills: ['Product Management', 'AI', 'Cloud Technologies', 'Agile'],
      matchPercentage: 78,
      logoUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: '4',
      title: 'Computer Vision Researcher',
      company: 'Autonomous Systems Lab',
      location: 'Boston, MA',
      salary: '$110K - $140K',
      type: 'Full-time',
      postedDate: '2 days ago',
      description: 'Conduct research in computer vision with applications in autonomous vehicles and robotics.',
      skills: ['Computer Vision', 'Deep Learning', 'PyTorch', 'C++'],
      matchPercentage: 85,
      logoUrl: 'https://images.unsplash.com/photo-1671417649141-32c353f7cba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: '5',
      title: 'NLP Data Scientist',
      company: 'Language Tech Inc.',
      location: 'New York, NY',
      salary: '$115K - $145K',
      type: 'Full-time',
      postedDate: '5 days ago',
      description: 'Build and improve machine learning models for natural language processing applications.',
      skills: ['NLP', 'Python', 'BERT', 'Data Science'],
      matchPercentage: 72,
      logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: '6',
      title: 'Research Collaboration Opportunity',
      company: 'Stanford University',
      location: 'Stanford, CA',
      salary: 'Grant Funded',
      type: 'Research',
      postedDate: '1 week ago',
      description: 'Collaborate on a multidisciplinary research project focusing on AI applications in climate science.',
      skills: ['Research', 'Climate Science', 'AI', 'Data Analysis'],
      matchPercentage: 81,
      logoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">AI-Powered Job Matching</h1>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up animate-delay-100">
                Find your next opportunity with smart recommendations tailored to your skills and career goals
              </p>
              
              {/* Search Bar */}
              <div className="glass-card p-2 rounded-full flex items-center max-w-2xl mx-auto mb-6 animate-slide-up animate-delay-200">
                <Search className="ml-2 mr-1 h-5 w-5 text-muted-foreground shrink-0" />
                <Input 
                  type="text" 
                  placeholder="Search jobs by title, company, or keyword..." 
                  className="border-0 focus-visible:ring-0 bg-transparent"
                />
                <Button size="sm" className="rounded-full">
                  Search
                </Button>
              </div>
              
              {/* Quick Filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 animate-slide-up animate-delay-300">
                <Button variant="outline" size="sm" className="rounded-full">
                  All Jobs
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Remote
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Full-time
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Internship
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Research
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Recommended Jobs */}
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">AI-Recommended for You</h2>
              <p className="text-muted-foreground">Personalized matches based on your skills and experience</p>
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" /> Refine matches
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {recommendedJobs.map((job, index) => (
              <JobCard
                key={job.id}
                {...job}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
          
          {/* All Jobs */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">All Opportunities</h2>
              <p className="text-muted-foreground">Browse jobs, internships, and research collaborations</p>
            </div>
            <Button variant="ghost" className="flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job, index) => (
              <JobCard
                key={job.id}
                {...job}
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

export default Jobs;
