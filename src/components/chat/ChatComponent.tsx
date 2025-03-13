import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, X, ChevronLeft, Image, Plus, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import FriendSearch from './FriendSearch';
import UserStories from './UserStories';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'friend';
  timestamp: Date;
}

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
  hasUnreadStory?: boolean;
}

const ChatComponent = () => {
  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [showFriendSearch, setShowFriendSearch] = useState(false);
  const [showMobileChatList, setShowMobileChatList] = useState(true);
  const [activeTab, setActiveTab] = useState('chats');
  const [showStoriesView, setShowStoriesView] = useState(false);
  const [selectedStoryUser, setSelectedStoryUser] = useState<Friend | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock friends data with usernames
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      status: 'online',
      hasUnreadStory: true
    },
    {
      id: '2',
      name: 'Michael Park',
      username: 'michaelp',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'away',
      lastSeen: '5m ago',
      hasUnreadStory: true
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      username: 'emilyr',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'offline',
      lastSeen: '2h ago'
    },
    {
      id: '4',
      name: 'David Kim',
      username: 'davidk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'online',
      hasUnreadStory: true
    },
    {
      id: '5',
      name: 'Jennifer Lee',
      username: 'jenniferl',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      status: 'online'
    }
  ];

  // Enhanced sample chat messages with more content
  const chats: Record<string, ChatMessage[]> = {
    '1': [
      {
        id: '1',
        text: "Hi there! How's your AI research going?",
        sender: 'friend',
        timestamp: new Date(Date.now() - 3600000 * 5)
      },
      {
        id: '2',
        text: "It's going well! I'm making progress on the neural network optimization framework.",
        sender: 'user',
        timestamp: new Date(Date.now() - 3600000 * 4.5)
      },
      {
        id: '3',
        text: "That sounds exciting! Are you using a new approach?",
        sender: 'friend',
        timestamp: new Date(Date.now() - 3600000 * 4)
      },
      {
        id: '4',
        text: "Yes, I'm implementing a gradient-based meta-learning algorithm that should improve efficiency by about 30%.",
        sender: 'user',
        timestamp: new Date(Date.now() - 3600000 * 3.5)
      },
      {
        id: '5',
        text: "Impressive! Would love to hear more about it when you have time.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 3600000 * 3)
      },
      {
        id: '6',
        text: "Thanks! I'll send you the paper once it's ready for review. How's your work going?",
        sender: 'user',
        timestamp: new Date(Date.now() - 3600000 * 2.5)
      },
      {
        id: '7',
        text: "Pretty good! I'm working on a new computer vision model for medical imaging. The results are promising so far.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 3600000 * 2)
      },
      {
        id: '8',
        text: "That's fantastic! Medical imaging is such an important application of AI. Are you using transformer architecture?",
        sender: 'user',
        timestamp: new Date(Date.now() - 3600000 * 1.5)
      },
      {
        id: '9',
        text: "Yes, we're using a modified vision transformer with some custom layers for the specific imaging modalities we're targeting.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 3600000 * 1)
      },
      {
        id: '10',
        text: "Smart approach. The attention mechanism should help with identifying subtle patterns in the images.",
        sender: 'user',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '11',
        text: "Exactly! That's what we're seeing in our initial results. The model is picking up details that traditional CNNs miss.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 1200000)
      },
      {
        id: '12',
        text: "Would you be interested in collaborating on a joint paper? Our techniques might complement each other well.",
        sender: 'user',
        timestamp: new Date(Date.now() - 900000)
      },
      {
        id: '13',
        text: "That's a great idea! Let's set up a call next week to discuss the details.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 600000)
      },
      {
        id: '14',
        text: "Perfect! I'll send you some available time slots.",
        sender: 'user',
        timestamp: new Date(Date.now() - 300000)
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
      },
      {
        id: '3',
        text: "Great! What did you think about the methodology they used?",
        sender: 'friend',
        timestamp: new Date(Date.now() - 79200000)
      },
      {
        id: '4',
        text: "I thought it was innovative but had some limitations in the experimental design.",
        sender: 'user',
        timestamp: new Date(Date.now() - 75600000)
      },
      {
        id: '5',
        text: "I noticed that too. The sample size seemed a bit small for their claims.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 72000000)
      },
      {
        id: '6',
        text: "Exactly. I'd like to see it replicated with a larger dataset.",
        sender: 'user',
        timestamp: new Date(Date.now() - 68400000)
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
      },
      {
        id: '4',
        text: "Should we invite the design team as well?",
        sender: 'user',
        timestamp: new Date(Date.now() - 162000000)
      },
      {
        id: '5',
        text: "Good idea. I'll send them an invite.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 158400000)
      }
    ],
    '4': [
      {
        id: '1',
        text: "Hi David, I saw your presentation at the conference last week. It was impressive!",
        sender: 'user',
        timestamp: new Date(Date.now() - 432000000)
      },
      {
        id: '2',
        text: "Thanks! I appreciate you attending. Did you have any questions about the research?",
        sender: 'friend',
        timestamp: new Date(Date.now() - 428400000)
      },
      {
        id: '3',
        text: "Yes, I was wondering about the computational complexity of your algorithm. How does it scale with larger inputs?",
        sender: 'user',
        timestamp: new Date(Date.now() - 424800000)
      },
      {
        id: '4',
        text: "Good question. The algorithm is O(n log n) in the average case, but can degrade to O(n²) in worst-case scenarios.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 421200000)
      }
    ],
    '5': [
      {
        id: '1',
        text: "Jennifer, do you have time to review my code PR this week?",
        sender: 'user',
        timestamp: new Date(Date.now() - 259200000)
      },
      {
        id: '2',
        text: "Sure! I can look at it tomorrow afternoon. Is there anything specific you want me to focus on?",
        sender: 'friend',
        timestamp: new Date(Date.now() - 255600000)
      },
      {
        id: '3',
        text: "Mainly the optimization in the data processing pipeline. I think there might be a more efficient approach.",
        sender: 'user',
        timestamp: new Date(Date.now() - 252000000)
      }
    ]
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, chats]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    // This would typically be handled by a backend, but for demo purposes we'll just show a toast
    const newMessage: ChatMessage = {
      id: String(Date.now()),
      text: messageInput,
      sender: 'user',
      timestamp: new Date()
    };
    
    console.log("Message sent:", newMessage);
    toast.success("Message sent successfully!");
    
    // Clear input after sending
    setMessageInput('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getActiveFriend = () => {
    return friends.find(friend => friend.id === activeChat);
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    setShowMobileChatList(false); // Hide chat list on mobile when a chat is selected
  };

  const handleStoryClick = (friend: Friend) => {
    setSelectedStoryUser(friend);
    setShowStoriesView(true);
  };

  const handleAddStory = () => {
    toast.success("Story added successfully!");
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
          <FriendSearch onAddFriend={() => {
            toast.success("Friend request sent!");
            setShowFriendSearch(false);
          }} />
        </div>
      ) : showStoriesView && selectedStoryUser ? (
        <div className="h-full flex flex-col">
          <div className="border-b p-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowStoriesView(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={selectedStoryUser.avatar} />
                <AvatarFallback>{selectedStoryUser.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedStoryUser.name}</h3>
                <p className="text-xs text-muted-foreground">@{selectedStoryUser.username}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 flex items-center justify-center bg-black/80">
            <div className="relative w-full max-w-lg">
              <img 
                src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmVzZWFyY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" 
                alt="Story"
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white">Working on a new machine learning project today!</p>
                <span className="text-xs text-white/80">4 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Chat header */}
          <div className="border-b p-4 flex justify-between items-center">
            {!showMobileChatList && activeChat && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden mr-2" 
                onClick={() => setShowMobileChatList(true)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center space-x-3">
              {activeChat && getActiveFriend() && !showMobileChatList ? (
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
                      @{getActiveFriend()?.username} • {getActiveFriend()?.status === 'online' 
                        ? 'Online' 
                        : `Last seen ${getActiveFriend()?.lastSeen}`}
                    </p>
                  </div>
                </>
              ) : (
                <h3 className="font-medium">Messages</h3>
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
            {/* Chat list sidebar - hidden on mobile when a chat is active */}
            <div className={`${showMobileChatList ? 'w-full md:w-72' : 'hidden md:block w-72'} border-r`}>
              <Tabs defaultValue="chats" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chats">Chats</TabsTrigger>
                  <TabsTrigger value="stories">Stories</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chats" className="mt-0">
                  <ScrollArea className="h-[530px]">
                    <div className="p-3">
                      <h3 className="text-sm font-medium mb-2 px-2">Recent Chats</h3>
                      {friends.map(friend => (
                        <div 
                          key={friend.id}
                          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors mb-1 ${
                            activeChat === friend.id ? 'bg-primary/10' : 'hover:bg-secondary/50'
                          }`}
                          onClick={() => handleChatSelect(friend.id)}
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
                            <div className="flex justify-between">
                              <p className="font-medium text-sm truncate">{friend.name}</p>
                              <p className="text-xs text-muted-foreground">12m</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-xs text-muted-foreground truncate">
                                @{friend.username} • {chats[friend.id]?.[chats[friend.id].length - 1]?.text || 'No messages yet'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="stories" className="mt-0">
                  <ScrollArea className="h-[530px]">
                    <div className="p-3">
                      <div className="mb-4">
                        <button 
                          className="flex flex-col items-center w-full p-2 hover:bg-secondary/20 rounded-lg transition-colors"
                          onClick={handleAddStory}
                        >
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary flex items-center justify-center mb-1">
                            <Plus className="h-6 w-6 text-primary" />
                          </div>
                          <span className="text-xs font-medium">Add Story</span>
                        </button>
                      </div>

                      <h3 className="text-sm font-medium mb-2 px-2">Recent Stories</h3>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {friends.filter(f => f.hasUnreadStory).map(friend => (
                          <button 
                            key={friend.id}
                            className="flex flex-col items-center"
                            onClick={() => handleStoryClick(friend)}
                          >
                            <div className="relative mb-1">
                              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500">
                                <Avatar className="w-full h-full border-2 border-background">
                                  <AvatarImage src={friend.avatar} alt={friend.name} />
                                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                                </Avatar>
                              </div>
                            </div>
                            <span className="text-xs text-center leading-tight">{friend.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>

                      <h3 className="text-sm font-medium mb-2 px-2">All Contacts</h3>
                      {friends.map(friend => (
                        <div 
                          key={friend.id}
                          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors mb-1"
                          onClick={() => handleStoryClick(friend)}
                        >
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={friend.avatar} alt={friend.name} />
                              <AvatarFallback>{friend.name[0]}</AvatarFallback>
                            </Avatar>
                            {friend.hasUnreadStory && (
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{friend.name}</p>
                            <p className="text-xs text-muted-foreground">@{friend.username}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Image className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Chat messages - shown on mobile only when a chat is selected */}
            <div className={`flex-1 flex flex-col ${!showMobileChatList ? 'block' : 'hidden md:block'}`}>
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
                    <div ref={messagesEndRef} />
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
                      className="rounded-full hidden sm:flex"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="min-h-[40px] max-h-[120px] resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                    </div>
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="ghost"
                      className="rounded-full hidden sm:flex"
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

