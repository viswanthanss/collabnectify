
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  CheckCircle2, 
  Moon, 
  Palette, 
  Sun, 
  Type, 
  Monitor, 
  Layout, 
  Smartphone 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DisplaySettings() {
  const [activeTheme, setActiveTheme] = useState('system');
  const [fontSize, setFontSize] = useState(16);
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Display settings updated",
      description: "Your display preferences have been saved successfully.",
    });
  };

  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'system', name: 'System', icon: Monitor },
  ];
  
  const colorSchemes = [
    { id: 'blue', color: '#2563eb', name: 'Blue' },
    { id: 'purple', color: '#8b5cf6', name: 'Purple' },
    { id: 'green', color: '#10b981', name: 'Green' },
    { id: 'orange', color: '#f97316', name: 'Orange' },
    { id: 'pink', color: '#ec4899', name: 'Pink' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Display & UI</h2>
        <p className="text-muted-foreground">
          Customize the appearance and behavior of your interface.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Theme</h3>
        
        <div className="grid gap-4 md:grid-cols-3">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <Card 
                key={theme.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  activeTheme === theme.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setActiveTheme(theme.id)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      activeTheme === theme.id ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        activeTheme === theme.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <span className="font-medium">{theme.name}</span>
                  </div>
                  
                  {activeTheme === theme.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Color Scheme</h3>
        
        <div className="grid grid-cols-5 gap-4">
          {colorSchemes.map((scheme) => (
            <div 
              key={scheme.id}
              className="flex flex-col items-center gap-2"
            >
              <button 
                className={`h-12 w-12 rounded-full border-2 transition-all ${
                  scheme.id === 'purple' ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
                }`}
                style={{ backgroundColor: scheme.color }}
                aria-label={`${scheme.name} color scheme`}
              >
                {scheme.id === 'purple' && (
                  <CheckCircle2 className="h-6 w-6 text-white" />
                )}
              </button>
              <span className="text-sm">{scheme.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Font Settings</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="fontSize">Font Size ({fontSize}px)</Label>
              <span className="text-sm text-muted-foreground">{
                fontSize < 14 ? 'Small' : fontSize < 18 ? 'Medium' : 'Large'
              }</span>
            </div>
            <div className="flex items-center gap-4">
              <Type className="h-4 w-4 text-muted-foreground" />
              <Slider 
                id="fontSize"
                min={12} 
                max={20} 
                step={1} 
                value={[fontSize]} 
                onValueChange={(value) => setFontSize(value[0])}
                className="flex-1"
              />
              <Type className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <select 
              id="fontFamily" 
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option>System Default</option>
              <option>Sans Serif</option>
              <option>Serif</option>
              <option>Monospace</option>
            </select>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Layout & Interface</h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="reduceMotion">Reduced Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations throughout the interface
              </p>
            </div>
            <Switch id="reduceMotion" />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="focusMode">Focus Mode</Label>
              <p className="text-sm text-muted-foreground">
                Hide non-essential elements to reduce distractions
              </p>
            </div>
            <Switch id="focusMode" />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="compactView">Compact View</Label>
              <p className="text-sm text-muted-foreground">
                Display more content with reduced spacing
              </p>
            </div>
            <Switch id="compactView" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="defaultView">Default Landing Page</Label>
            <select 
              id="defaultView" 
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option>Home</option>
              <option>Feed</option>
              <option>Projects</option>
              <option>Messages</option>
            </select>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Appearance Preview</h3>
        
        <div className="bg-muted/30 border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                C
              </div>
              <span className="font-semibold">ConnectAI</span>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded-full bg-muted" />
              <div className="w-4 h-4 rounded-full bg-muted" />
              <div className="w-4 h-4 rounded-full bg-muted" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="h-10 bg-muted rounded-md w-1/3" />
            <div className="h-4 bg-muted rounded-md w-full" />
            <div className="h-4 bg-muted rounded-md w-5/6" />
            <div className="h-4 bg-muted rounded-md w-3/4" />
            <div className="h-10 bg-primary rounded-md w-1/4 mt-4" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Default</Button>
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
}
