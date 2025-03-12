
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationProps {
  notification: {
    id: string;
    title: string;
    description: string;
    time: string;
    type: string;
    read: boolean;
    icon: LucideIcon;
  };
}

const NotificationItem = ({ notification }: NotificationProps) => {
  const Icon = notification.icon;
  
  const getBgColor = (type: string) => {
    switch (type) {
      case 'internship':
        return 'bg-blue-100 text-blue-600';
      case 'achievement':
        return 'bg-green-100 text-green-600';
      case 'insight':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div 
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg mb-2 transition-colors hover:bg-muted cursor-pointer',
        notification.read ? 'opacity-70' : ''
      )}
    >
      <div className={cn('rounded-full p-2', getBgColor(notification.type))}>
        <Icon className="h-4 w-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h5 className="font-medium text-sm truncate pr-2 mb-0.5">
            {notification.title}
          </h5>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {notification.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {notification.time}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
