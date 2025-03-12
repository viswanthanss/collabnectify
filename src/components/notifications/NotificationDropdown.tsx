
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Briefcase, Award } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import NotificationItem from './NotificationItem';

const NotificationDropdown = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const notifications = [
    {
      id: '1',
      title: 'New Internship Opportunity',
      description: 'Apply now for Software Engineering Internship at Google',
      time: '10 minutes ago',
      type: 'internship',
      read: false,
      icon: Briefcase
    },
    {
      id: '2',
      title: 'Project Milestone Reached',
      description: 'Your AI project has reached 100 stars on GitHub!',
      time: '2 hours ago',
      type: 'achievement',
      read: false,
      icon: Award
    },
    {
      id: '3',
      title: 'New Internship Available',
      description: 'Summer AI Research Internship at OpenAI is now open',
      time: '1 day ago',
      type: 'internship',
      read: true,
      icon: Briefcase
    },
    {
      id: '4',
      title: 'Daily Insight: Machine Learning',
      description: 'New ML frameworks gaining traction in 2023',
      time: '3 days ago',
      type: 'insight',
      read: true,
      icon: Bell
    }
  ];

  const clearAllNotifications = () => {
    toast.success('All notifications cleared');
  };

  const markAllAsRead = () => {
    toast.success('All notifications marked as read');
  };

  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-4 pb-2">
        <h4 className="font-medium">Notifications</h4>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
            Clear all
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="h-[300px] px-4 py-2">
          <TabsContent value="all" className="m-0">
            {notifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </TabsContent>
          
          <TabsContent value="internships" className="m-0">
            {notifications
              .filter(n => n.type === 'internship')
              .map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </TabsContent>
          
          <TabsContent value="insights" className="m-0">
            {notifications
              .filter(n => n.type === 'insight')
              .map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <div className="border-t mt-2 pt-2 px-4">
        <Button variant="outline" size="sm" className="w-full">
          View all notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
