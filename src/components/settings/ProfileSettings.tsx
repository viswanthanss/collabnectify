
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Camera, File, Trash2, Upload, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProfileSettings() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
    });
  };

  const handleResumeUpload = () => {
    toast({
      title: "Resume uploaded",
      description: "Your resume has been uploaded successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Profile & Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your personal information, privacy, and profile visibility.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            </div>
            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h3 className="font-medium">Profile Photo</h3>
            <p className="text-sm text-muted-foreground">
              This will be displayed on your profile
            </p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline">
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                Upload
              </Button>
              <Button size="sm" variant="outline" className="text-destructive">
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Remove
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="John" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Doe" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="johndoe" />
            <p className="text-xs text-muted-foreground">
              This will be your unique identifier on the platform
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input id="title" defaultValue="Software Engineer" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue="San Francisco, CA" />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">About Me</h3>
        <textarea 
          className="w-full min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Tell others about yourself, your interests, and your expertise..."
          defaultValue="I'm a passionate software engineer with 5+ years of experience in web development, specializing in React and TypeScript. I love building user-friendly, accessible applications."
        />
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Resume & Documents</h3>
        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <File className="h-8 w-8 text-muted-foreground" />
          <div className="flex-1">
            <div className="font-medium">Resume_JohnDoe_2023.pdf</div>
            <div className="text-sm text-muted-foreground">Uploaded on May 15, 2023</div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Upload className="h-3.5 w-3.5 mr-1.5" />
              Update
            </Button>
            <Button size="sm" variant="outline" className="text-destructive">
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Delete
            </Button>
          </div>
        </div>
        <Button variant="outline" onClick={handleResumeUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Upload New Document
        </Button>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">JavaScript</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">UI/UX Design</Badge>
          <Badge variant="secondary">Git</Badge>
          <Badge variant="secondary">+ Add Skill</Badge>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Privacy Controls</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <Label className="font-medium">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">Who can see your profile</p>
            </div>
            <div className="space-x-2">
              <select className="px-3 py-1.5 rounded-md border bg-background text-sm">
                <option>Everyone</option>
                <option>Connections Only</option>
                <option>Private</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="showEmail">Show Email Address</Label>
              <p className="text-sm text-muted-foreground">Allow others to see your email</p>
            </div>
            <Switch id="showEmail" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="showLocation">Show Location</Label>
              <p className="text-sm text-muted-foreground">Display your location on profile</p>
            </div>
            <Switch id="showLocation" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="allowConnect">Allow Connection Requests</Label>
              <p className="text-sm text-muted-foreground">Receive connection requests from others</p>
            </div>
            <Switch id="allowConnect" defaultChecked={true} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
