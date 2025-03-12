
import React, { useState } from 'react';
import { Search, UserPlus, UserCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  isConnected?: boolean;
}

interface FriendSearchProps {
  onAddFriend?: () => void;
}

const FriendSearch = ({ onAddFriend }: FriendSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Friend[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
    },
    {
      id: '5',
      name: 'Jennifer Lee',
      username: 'jenniferl',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'online'
    },
    {
      id: '6',
      name: 'Alex Chen',
      username: 'alexc',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'online'
    },
    {
      id: '7',
      name: 'Maria Garcia',
      username: 'mariag',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'away'
    },
    {
      id: '8',
      name: 'James Wilson',
      username: 'jamesw',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'offline'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const filtered = allFriends.filter(friend => 
        friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Add random connection status for demo purposes
      const resultsWithConnectionStatus = filtered.map(friend => ({
        ...friend,
        isConnected: Math.random() > 0.7
      }));
      
      setResults(resultsWithConnectionStatus);
      setIsSearching(false);
    }, 800);
  };

  const handleConnect = (friendId: string) => {
    setResults(prev => 
      prev.map(friend => 
        friend.id === friendId 
          ? { ...friend, isConnected: true } 
          : friend
      )
    );
    
    toast.success("Connection request sent!");
    if (onAddFriend) onAddFriend();
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
        <Button type="submit" disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
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
              {friend.isConnected ? (
                <Button size="sm" variant="secondary" disabled>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Connected
                </Button>
              ) : (
                <Button size="sm" variant="outline" onClick={() => handleConnect(friend.id)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {searchQuery && results.length === 0 && !isSearching && (
        <div className="text-center p-4 text-muted-foreground">
          No users found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default FriendSearch;
