
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PersonalizationSettings() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Preferences updated",
      description: "Your personalization preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Personalization</h2>
        <p className="text-muted-foreground">
          Customize your experience and content preferences.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Content Preferences</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="recommendations">Personalized Recommendations</Label>
              <p className="text-sm text-muted-foreground">
                Receive content recommendations based on your interests and activity
              </p>
            </div>
            <Switch id="recommendations" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="trendingTopics">Trending Topics</Label>
              <p className="text-sm text-muted-foreground">
                See trending topics in your field on your feed
              </p>
            </div>
            <Switch id="trendingTopics" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="newSletter">Newsletter Subscription</Label>
              <p className="text-sm text-muted-foreground">
                Receive weekly newsletters with latest updates and trends
              </p>
            </div>
            <Switch id="newSletter" defaultChecked={false} />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Skill Assessments</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="skillSuggestions">Skill Suggestions</Label>
              <p className="text-sm text-muted-foreground">
                Receive suggestions for skills you might want to learn or improve
              </p>
            </div>
            <Switch id="skillSuggestions" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="assessmentInvites">Assessment Invitations</Label>
              <p className="text-sm text-muted-foreground">
                Receive invitations to verify your skills through assessments
              </p>
            </div>
            <Switch id="assessmentInvites" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="showBadges">Display Skill Badges</Label>
              <p className="text-sm text-muted-foreground">
                Show verified skill badges on your profile
              </p>
            </div>
            <Switch id="showBadges" defaultChecked={true} />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Feed Preferences</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <h4 className="font-medium">Content Type Priority</h4>
                <p className="text-sm text-muted-foreground">
                  Choose what type of content you want to see more of
                </p>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Industry News</Label>
                  <select className="p-2 rounded-md border bg-background text-sm">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center">
                  <Label>Project Updates</Label>
                  <select className="p-2 rounded-md border bg-background text-sm">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center">
                  <Label>Job Opportunities</Label>
                  <select className="p-2 rounded-md border bg-background text-sm">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center">
                  <Label>Learning Resources</Label>
                  <select className="p-2 rounded-md border bg-background text-sm">
                    <option>Medium</option>
                    <option>High</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <h4 className="font-medium">Interest Areas</h4>
                <p className="text-sm text-muted-foreground">
                  Select topics you're interested in
                </p>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="webDev" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="webDev">Web Development</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="ai" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="ai">Artificial Intelligence</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="dataSci" className="rounded border-gray-300" />
                  <Label htmlFor="dataSci">Data Science</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="design" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="design">UI/UX Design</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="mobile" className="rounded border-gray-300" />
                  <Label htmlFor="mobile">Mobile Development</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="devops" className="rounded border-gray-300" />
                  <Label htmlFor="devops">DevOps</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Language & Region</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <select id="language" className="w-full p-2.5 rounded-md border bg-background">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
              <option>Chinese (Simplified)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <select id="region" className="w-full p-2.5 rounded-md border bg-background">
              <option>United States</option>
              <option>European Union</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>India</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
}
