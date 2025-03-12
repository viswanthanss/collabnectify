
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus, LinkedIn } from 'lucide-react';

interface Connection {
  id: string;
  name: string;
  role: string;
  avatar: string;
  mutual: number;
}

const UserConnections = () => {
  const connections: Connection[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'ML Engineer at Google',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      mutual: 12
    },
    {
      id: '2',
      name: 'Michael Park',
      role: 'Data Scientist at Meta',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      mutual: 8
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recommended Connections</CardTitle>
        <Button variant="outline" size="sm">
          <LinkedIn className="h-4 w-4 mr-2" />
          Connect LinkedIn
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        {connections.map((connection) => (
          <div key={connection.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={connection.avatar} alt={connection.name} />
                <AvatarFallback>{connection.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-medium">{connection.name}</h4>
                <p className="text-xs text-muted-foreground">{connection.role}</p>
                <p className="text-xs text-muted-foreground">{connection.mutual} mutual connections</p>
              </div>
            </div>
            <Button size="sm" variant="secondary">
              <UserPlus className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserConnections;
