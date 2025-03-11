
import React from 'react';
import { Brain, Users, Briefcase, Star } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturedSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Profiles',
      description: 'Our AI analyzes your skills and experience to create the perfect professional profile.',
    },
    {
      icon: Users,
      title: 'Smart Networking',
      description: 'Connect with like-minded professionals based on AI-driven compatibility matching.',
    },
    {
      icon: Briefcase,
      title: 'Project Collaboration',
      description: 'Find the perfect teammates for your next big idea with our collaboration tools.',
    },
    {
      icon: Star,
      title: 'Opportunity Discovery',
      description: 'Discover job opportunities and projects that perfectly match your unique skillset.',
    },
  ];

  return (
    <section className="section-container">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-bold mb-4">Elevate Your Professional Journey</h2>
          <p className="text-xl text-muted-foreground text-balance">
            Our platform combines cutting-edge AI with thoughtful design to transform how professionals connect and collaborate.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={`animate-slide-up animate-delay-${(index + 1) * 100}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
