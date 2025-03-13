
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Bell, Mail, MessageSquare, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CollaborationSettings() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Notification settings updated",
      description: "Your collaboration and notification preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Collaboration & Notifications</h2>
        <p className="text-muted-foreground">
          Manage how you connect with others and receive updates.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Project Invitations</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="receiveInvites">Receive Project Invites</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to invite you to collaborate on projects
              </p>
            </div>
            <Switch id="receiveInvites" defaultChecked={true} />
          </div>
          
          <div>
            <Label htmlFor="invitePrivacy">Who can invite you?</Label>
            <select 
              id="invitePrivacy" 
              className="w-full mt-1 p-2.5 rounded-md border bg-background"
            >
              <option>Anyone</option>
              <option>Connections only</option>
              <option>Connections and their connections</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="autoAcceptTrusted">Auto-accept from trusted connections</Label>
              <p className="text-sm text-muted-foreground">
                Automatically accept invites from connections you've worked with before
              </p>
            </div>
            <Switch id="autoAcceptTrusted" defaultChecked={false} />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Email Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
            <Mail className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <h4 className="font-medium">Email Digest Frequency</h4>
              <RadioGroup defaultValue="daily" className="mt-2 flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="realtime" id="realtime" />
                  <Label htmlFor="realtime">Real-time (as they happen)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily summary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly digest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None (web notifications only)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="projectUpdates">Project Updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about updates to projects you're part of
              </p>
            </div>
            <Switch id="projectUpdates" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="directMessages">Direct Messages</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new direct messages
              </p>
            </div>
            <Switch id="directMessages" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="mentionNotif">Mentions</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails when someone mentions you
              </p>
            </div>
            <Switch id="mentionNotif" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="networkUpdates">Network Updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new connections and follows
              </p>
            </div>
            <Switch id="networkUpdates" defaultChecked={false} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="marketingEmails">Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">
                Receive promotional emails and product updates
              </p>
            </div>
            <Switch id="marketingEmails" defaultChecked={false} />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Push Notifications</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Mobile Notifications</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="pushMessages">Messages</Label>
                  <Switch id="pushMessages" defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <Label htmlFor="pushInvites">Project Invites</Label>
                  <Switch id="pushInvites" defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <Label htmlFor="pushComments">Comments & Replies</Label>
                  <Switch id="pushComments" defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <Label htmlFor="pushMentions">Mentions</Label>
                  <Switch id="pushMentions" defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Desktop Notifications</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="desktopMessages">Messages</Label>
                  <Switch id="desktopMessages" defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <Label htmlFor="desktopInvites">Project Invites</Label>
                  <Switch id="desktopInvites" defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <Label htmlFor="desktopComments">Comments & Replies</Label>
                  <Switch id="desktopComments" defaultChecked={false} />
                </div>
                
                <div className="flex justify-between items-center">
                  <Label htmlFor="desktopMentions">Mentions</Label>
                  <Switch id="desktopMentions" defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Quiet Hours</h4>
              <p className="text-sm text-muted-foreground">
                Mute notifications during specific times
              </p>
            </div>
            <Switch id="quietHours" defaultChecked={false} />
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <select id="startTime" className="w-full p-2 rounded-md border bg-background" disabled>
                <option>10:00 PM</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <select id="endTime" className="w-full p-2 rounded-md border bg-background" disabled>
                <option>7:00 AM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
}
