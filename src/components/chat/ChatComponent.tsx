
import React, { useState } from 'react';
import { Send, Paperclip, Smile, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import FriendSearch from './FriendSearch';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'friend';
  timestamp: Date;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

const ChatComponent = () => {
  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [showFriendSearch, setShowFriendSearch] = useState(false);
  
  // Mock friends data
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      status: 'online'
    },
    {
      id: '2',
      name: 'Michael Park',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'away',
      lastSeen: '5m ago'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'offline',
      lastSeen: '2h ago'
    }
  ];

  // Sample chat messages
  const chats: Record<string, ChatMessage[]> = {
    '1': [
      {
        id: '1',
        text: "Hi there! How's your AI research going?",
        sender: 'friend',
        timestamp: new Date(Date.now() - 3600000 * 2)
      },
      {
        id: '2',
        text: "It's going well! I'm making progress on the neural network optimization framework.",
        sender: 'user',
        timestamp: new Date(Date.now() - 3600000 * 1.5)
      },
      {
        id: '3',
        text: "That sounds exciting! Are you using a new approach?",
        sender: 'friend',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '4',
        text: "Yes, I'm implementing a gradient-based meta-learning algorithm that should improve efficiency by about 30%.",
        sender: 'user',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '5',
        text: "Impressive! Would love to hear more about it when you have time.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 600000)
      }
    ],
    '2': [
      {
        id: '1',
        text: "Hey, did you check out that paper I sent?",
        sender: 'friend',
        timestamp: new Date(Date.now() - 86400000)
      },
      {
        id: '2',
        text: "Yes, it was really insightful. Thanks for sharing!",
        sender: 'user',
        timestamp: new Date(Date.now() - 82800000)
      }
    ],
    '3': [
      {
        id: '1',
        text: "Are we still meeting for the project discussion tomorrow?",
        sender: 'friend',
        timestamp: new Date(Date.now() - 172800000)
      },
      {
        id: '2',
        text: "Yes, 2 PM works for me. I'll prepare the slides.",
        sender: 'user',
        timestamp: new Date(Date.now() - 169200000)
      },
      {
        id: '3',
        text: "Perfect! Looking forward to it.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 165600000)
      }
    ]
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    // This would typically be handled by a backend, but for demo purposes we'll update local state
    const newMessage: ChatMessage = {
      id: String(Date.now()),
      text: messageInput,
      sender: 'user',
      timestamp: new Date()
    };
    
    // For demo purposes, we'll just update the first chat
    console.log("Message sent:", newMessage);
    
    // Clear input after sending
    setMessageInput('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getActiveFriend = () => {
    return friends.find(friend => friend.id === activeChat);
  };

  return (
    <div className="glass-card rounded-2xl h-[600px] flex flex-col">
      {showFriendSearch ? (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Find Connections</h3>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setShowFriendSearch(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <FriendSearch />
        </div>
      ) : (
        <>
          {/* Chat header */}
          <div className="border-b p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {activeChat && getActiveFriend() ? (
                <>
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={getActiveFriend()?.avatar} alt={getActiveFriend()?.name} />
                      <AvatarFallback>{getActiveFriend()?.name[0]}</AvatarFallback>
                    </Avatar>
                    <span 
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        getActiveFriend()?.status === 'online' ? 'bg-green-500' : 
                        getActiveFriend()?.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}
                    ></span>
                  </div>
                  <div>
                    <h3 className="font-medium">{getActiveFriend()?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {getActiveFriend()?.status === 'online' 
                        ? 'Online' 
                        : `Last seen ${getActiveFriend()?.lastSeen}`}
                    </p>
                  </div>
                </>
              ) : (
                <p>Select a chat</p>
              )}
            </div>
            
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setShowFriendSearch(true)}
            >
              Find People
            </Button>
          </div>
          
          {/* Chat main area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Chat list sidebar */}
            <div className="w-72 border-r hidden md:block">
              <ScrollArea className="h-full">
                <div className="p-3">
                  <h3 className="text-sm font-medium mb-2 px-2">Recent Chats</h3>
                  {friends.map(friend => (
                    <div 
                      key={friend.id}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors mb-1 ${
                        activeChat === friend.id ? 'bg-primary/10' : 'hover:bg-secondary/50'
                      }`}
                      onClick={() => setActiveChat(friend.id)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <span 
                          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                            friend.status === 'online' ? 'bg-green-500' : 
                            friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`}
                        ></span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-medium text-sm truncate">{friend.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {chats[friend.id]?.[chats[friend.id].length - 1]?.text || 'No messages yet'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                {activeChat && chats[activeChat] ? (
                  <div className="space-y-4">
                    {chats[activeChat].map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`
                          max-w-[80%] rounded-xl p-3 
                          ${message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground ml-auto' 
                            : 'bg-secondary'}
                        `}>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <p>Select a chat to start messaging</p>
                  </div>
                )}
              </ScrollArea>
              
              {/* Message input */}
              {activeChat && (
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="ghost"
                      className="rounded-full"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="ghost"
                      className="rounded-full"
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button type="submit" size="icon" className="rounded-full">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
