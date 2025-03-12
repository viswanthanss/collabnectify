
import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

const FriendSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Friend[]>([]);

  // Mock friends data
  const allFriends: Friend[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      status: 'online'
    },
    {
      id: '2',
      name: 'Michael Park',
      username: 'michaelp',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'away'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      username: 'emilyr',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'offline'
    },
    {
      id: '4',
      name: 'David Kim',
      username: 'davidk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'online'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = allFriends.filter(friend => 
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by username or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {results.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium mb-2">Search Results</h3>
          {results.map(friend => (
            <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                    friend.status === 'online' ? 'bg-green-500' : 
                    friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  } border-2 border-white`}></span>
                </div>
                <div>
                  <p className="font-medium text-sm">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">@{friend.username}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <UserPlus className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendSearch;
