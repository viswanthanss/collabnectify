
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Shell } from "@/components/settings/Shell";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { PersonalizationSettings } from "@/components/settings/PersonalizationSettings";
import { CollaborationSettings } from "@/components/settings/CollaborationSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { DisplaySettings } from "@/components/settings/DisplaySettings";
import { AccountControls } from "@/components/settings/AccountControls";
import { ExtraFeatures } from "@/components/settings/ExtraFeatures";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const location = useLocation();

  // Set active tab based on hash in URL if present
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['profile', 'personalization', 'collaboration', 'security', 'display', 'account', 'extra'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Scroll to top when changing tabs on mobile
    window.scrollTo(0, 0);
  };

  return (
    <Shell>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Settings</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <Card className={`${isMobile ? 'w-full' : 'lg:w-80 w-full'} h-fit ${!isMobile && 'sticky top-24'}`}>
            <Tabs
              defaultValue="profile"
              value={activeTab}
              onValueChange={handleTabChange}
              orientation={isMobile ? "horizontal" : "vertical"}
              className="w-full"
            >
              <TabsList className={`${isMobile ? 'flex flex-row overflow-x-auto' : 'flex flex-col'} h-auto w-full bg-transparent space-y-1 p-2`}>
                <TabsTrigger 
                  value="profile" 
                  className="justify-start w-full text-left py-3 px-4"
                >
                  Profile & Account
                </TabsTrigger>
                <TabsTrigger 
                  value="personalization" 
                  className="justify-start w-full text-left py-3 px-4"
                >
                  Personalization
                </TabsTrigger>
                <TabsTrigger 
                  value="collaboration" 
                  className="justify-start w-full text-left py-3 px-4"
                >
                  Collaboration & Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="justify-start w-full text-left py-3 px-4"
                >
                  Security & Privacy
                </TabsTrigger>
                <TabsTrigger 
                  value="display" 
                  className="justify-start w-full text-left py-3 px-4"
                >
                  Display & UI
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="justify-start w-full text-left py-3 px-4"
                >
                  Account Controls
                </TabsTrigger>
                <TabsTrigger 
                  value="extra" 
                  className="justify-start w-full text-left py-3 px-4"
                >
                  Extra Features
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>
          
          <div className="flex-1">
            <Card className="p-6">
              <TabsContent value="profile" className="mt-0">
                <ProfileSettings />
              </TabsContent>
              
              <TabsContent value="personalization" className="mt-0">
                <PersonalizationSettings />
              </TabsContent>
              
              <TabsContent value="collaboration" className="mt-0">
                <CollaborationSettings />
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <SecuritySettings />
              </TabsContent>
              
              <TabsContent value="display" className="mt-0">
                <DisplaySettings />
              </TabsContent>
              
              <TabsContent value="account" className="mt-0">
                <AccountControls />
              </TabsContent>
              
              <TabsContent value="extra" className="mt-0">
                <ExtraFeatures />
              </TabsContent>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default Settings;
