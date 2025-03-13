
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, RefreshCw, Send, ThumbsUp, Lightbulb, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ExtraFeatures() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('feedback');
  const { toast } = useToast();
  
  const handleReset = () => {
    toast({
      title: "Settings reset",
      description: "All settings have been reset to their default values.",
    });
  };

  const handleFeedbackSubmit = () => {
    toast({
      title: feedbackType === 'feedback' ? "Feedback submitted" : "Feature request submitted",
      description: "Thank you for your feedback. We appreciate your input!",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Extra Features</h2>
        <p className="text-muted-foreground">
          Additional tools and options to enhance your experience.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Reset Settings</h3>
        <div className="bg-muted/30 p-6 rounded-lg text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <RefreshCw className="h-6 w-6 text-primary" />
          </div>
          <h4 className="text-lg font-medium mb-2">Reset to Default Settings</h4>
          <p className="text-muted-foreground mb-4">
            This will reset all your customized settings back to the system defaults. This action cannot be undone.
          </p>
          <Button variant="outline" onClick={handleReset}>
            Reset All Settings
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Help Chatbot</h3>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              AI Support Assistant
            </CardTitle>
            <CardDescription>
              Get instant help with your questions and issues
            </CardDescription>
          </CardHeader>
          
          {!isChatOpen ? (
            <CardContent className="text-center py-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-medium mb-2">Need Help?</h4>
              <p className="text-muted-foreground mb-4">
                Our AI assistant can answer your questions and help you navigate the platform.
              </p>
              <Button onClick={() => setIsChatOpen(true)}>
                Start Chat
              </Button>
            </CardContent>
          ) : (
            <CardContent className="px-0 pb-0">
              <div className="border-t border-b">
                <div className="max-h-80 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">
                        Hi there! I'm your AI assistant. How can I help you today?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">You</span>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">
                        I need help with my account settings. How do I change my email address?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">
                        To change your email address, go to "Profile & Account Settings" tab and look for the "Email Address" field. Enter your new email and save the changes. You'll need to verify the new email address by clicking a link sent to it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex items-center gap-2">
                <Input 
                  placeholder="Type your message..." 
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Feedback & Feature Requests</h3>
        
        <Card>
          <CardHeader>
            <div className="flex gap-6 mb-2">
              <button 
                className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                  feedbackType === 'feedback' 
                    ? 'border-primary text-foreground' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setFeedbackType('feedback')}
              >
                <ThumbsUp className="h-4 w-4" />
                Feedback
              </button>
              
              <button 
                className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                  feedbackType === 'feature' 
                    ? 'border-primary text-foreground' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setFeedbackType('feature')}
              >
                <Lightbulb className="h-4 w-4" />
                Feature Request
              </button>
            </div>
            
            <CardDescription>
              {feedbackType === 'feedback' 
                ? 'Share your thoughts on your experience with the platform'
                : 'Suggest new features or improvements you'd like to see'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {feedbackType === 'feedback' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="feedback-type">What kind of feedback do you have?</Label>
                  <Select defaultValue="general">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Feedback</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="ux">User Experience</SelectItem>
                      <SelectItem value="performance">Performance Issues</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="satisfaction">How satisfied are you with the platform?</Label>
                  <RadioGroup defaultValue="satisfied" className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="very-dissatisfied" id="very-dissatisfied" className="sr-only" />
                      <Label 
                        htmlFor="very-dissatisfied" 
                        className="flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100"
                      >
                        <span>😠</span>
                        <span className="text-xs">Very Dissatisfied</span>
                      </Label>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="dissatisfied" id="dissatisfied" className="sr-only" />
                      <Label 
                        htmlFor="dissatisfied" 
                        className="flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100"
                      >
                        <span>😕</span>
                        <span className="text-xs">Dissatisfied</span>
                      </Label>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
                      <Label 
                        htmlFor="neutral" 
                        className="flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100"
                      >
                        <span>😐</span>
                        <span className="text-xs">Neutral</span>
                      </Label>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="satisfied" id="satisfied" className="sr-only" />
                      <Label 
                        htmlFor="satisfied" 
                        className="flex flex-col items-center gap-1 cursor-pointer opacity-100"
                      >
                        <span>😊</span>
                        <span className="text-xs">Satisfied</span>
                      </Label>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="very-satisfied" id="very-satisfied" className="sr-only" />
                      <Label 
                        htmlFor="very-satisfied" 
                        className="flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100"
                      >
                        <span>😍</span>
                        <span className="text-xs">Very Satisfied</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="feature-type">Feature Category</Label>
                <Select defaultValue="profile">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profile">Profile & Account</SelectItem>
                    <SelectItem value="project">Projects & Collaboration</SelectItem>
                    <SelectItem value="messaging">Messaging & Communication</SelectItem>
                    <SelectItem value="ui">User Interface</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="feedback-title">
                {feedbackType === 'feedback' ? 'Feedback Title' : 'Feature Request Title'}
              </Label>
              <Input 
                id="feedback-title" 
                placeholder={feedbackType === 'feedback' 
                  ? 'Summarize your feedback in a few words' 
                  : 'Give your feature idea a name'
                } 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback-details">
                {feedbackType === 'feedback' ? 'Detailed Feedback' : 'Feature Description'}
              </Label>
              <Textarea 
                id="feedback-details" 
                placeholder={feedbackType === 'feedback' 
                  ? 'Please share more details about your experience...' 
                  : 'Describe the feature you'd like to see and how it would help you...'
                }
                className="min-h-32"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleFeedbackSubmit}>
              {feedbackType === 'feedback' ? 'Submit Feedback' : 'Submit Request'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
