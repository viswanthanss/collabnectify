
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-28 md:pt-32 pb-16 md:pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* Animated gradient blob */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-pulse-soft" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-70 animate-pulse-soft animate-delay-200" />
      
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-fade-in">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6">
              The future of professional networking
            </span>
          </div>
          
          <h1 className="animate-slide-up text-balance font-bold tracking-tight mb-6">
            Connect, Collaborate, and Grow with 
            <span className="text-gradient"> AI-Powered Networking</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 md:mb-10 animate-slide-up animate-delay-100 text-balance max-w-2xl mx-auto">
            Showcase your projects, connect with professionals, and discover opportunities—all enhanced by AI.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up animate-delay-200">
            <Button size="lg" className="rounded-full text-lg px-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg px-6">
              Explore Projects
            </Button>
          </div>
          
          <div className="mt-16 md:mt-20 animate-fade-in animate-delay-300">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
              Trusted by innovative professionals
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-70">
              <div className="h-8 w-auto">Company Logo 1</div>
              <div className="h-8 w-auto">Company Logo 2</div>
              <div className="h-8 w-auto">Company Logo 3</div>
              <div className="h-8 w-auto">Company Logo 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
