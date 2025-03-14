import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, X, ChevronLeft, Image, Plus, MoreVertical, Search, Star, Forward, Trash, Bell, BellOff, Users, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import FriendSearch from './FriendSearch';
import UserStories from './UserStories';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'friend';
  timestamp: Date;
  isStarred?: boolean;
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

interface ChatComponentProps {
  initialMobileChatListVisible?: boolean;
}

const ChatComponent = ({ initialMobileChatListVisible = false }: ChatComponentProps) => {
  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [showFriendSearch, setShowFriendSearch] = useState(false);
  const [showMobileChatList, setShowMobileChatList] = useState(initialMobileChatListVisible);
  const [activeTab, setActiveTab] = useState('chats');
  const [showStoriesView, setShowStoriesView] = useState(false);
  const [selectedStoryUser, setSelectedStoryUser] = useState<Friend | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [selectedFriendsForGroup, setSelectedFriendsForGroup] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [localChats, setLocalChats] = useState<Record<string, ChatMessage[]>>({});
  const [mutedChats, setMutedChats] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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
    },
    {
      id: 'group1',
      name: 'AI Research Team',
      username: 'ai-team',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      status: 'online'
    }
  ];

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
        timestamp: new Date(Date.now() - 3600000 * 3),
        isStarred: true
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
    ],
    'group1': [
      {
        id: '1',
        text: "Team, I've shared the latest research paper on transformer architectures in our shared drive.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 172800000)
      },
      {
        id: '2',
        text: "Thanks for sharing! I'll review it today.",
        sender: 'user',
        timestamp: new Date(Date.now() - 169200000)
      },
      {
        id: '3',
        text: "Has anyone implemented the attention mechanism they described? It looks promising.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 162000000)
      },
      {
        id: '4',
        text: "I tried something similar last month. It works well but requires a lot of computational resources.",
        sender: 'user',
        timestamp: new Date(Date.now() - 158400000)
      },
      {
        id: '5',
        text: "Let's discuss this in our next meeting. I think we can optimize it further.",
        sender: 'friend',
        timestamp: new Date(Date.now() - 144000000)
      }
    ]
  };

  useEffect(() => {
    setLocalChats(chats);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, localChats]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile) {
        setShowMobileChatList(true);
      } else if (isMobile && initialMobileChatListVisible === false) {
        setShowMobileChatList(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, initialMobileChatListVisible]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    const newMessage: ChatMessage = {
      id: String(Date.now()),
      text: messageInput,
      sender: 'user',
      timestamp: new Date()
    };
    
    setLocalChats(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    
    console.log("Message sent:", newMessage);
    toast.success("Message sent successfully!");
    
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
    if (isMobile) {
      setShowMobileChatList(false);
    }
  };

  const handleStoryClick = (friend: Friend) => {
    setSelectedStoryUser(friend);
    setShowStoriesView(true);
  };

  const handleAddStory = () => {
    toast.success("Story added successfully!");
  };

  const toggleStarMessage = (chatId: string, messageId: string) => {
    setLocalChats(prev => {
      const updatedChat = prev[chatId].map(msg => 
        msg.id === messageId 
          ? { ...msg, isStarred: !msg.isStarred } 
          : msg
      );
      return { ...prev, [chatId]: updatedChat };
    });
    
    toast.success("Message starred!");
  };

  const forwardMessage = (message: ChatMessage, targetChatId: string) => {
    if (!targetChatId) return;
    
    const forwardedMessage: ChatMessage = {
      id: String(Date.now()),
      text: message.text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setLocalChats(prev => ({
      ...prev,
      [targetChatId]: [...(prev[targetChatId] || []), forwardedMessage]
    }));
    
    toast.success("Message forwarded successfully!");
  };

  const deleteConversation = (chatId: string) => {
    setLocalChats(prev => {
      const newChats = { ...prev };
      delete newChats[chatId];
      return newChats;
    });
    
    if (activeChat === chatId) {
      setActiveChat(null);
    }
    
    toast.success("Conversation deleted successfully!");
  };

  const toggleMuteChat = (chatId: string) => {
    setMutedChats(prev => 
      prev.includes(chatId) 
        ? prev.filter(id => id !== chatId) 
        : [...prev, chatId]
    );
    
    toast.success(
      mutedChats.includes(chatId) 
        ? "Chat notifications enabled" 
        : "Chat notifications muted"
    );
  };

  const reportSpam = (chatId: string) => {
    toast.success("Message reported as spam. Thank you for keeping our community safe.");
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedFriendsForGroup.length === 0) {
      toast.error("Please enter a group name and select at least one friend");
      return;
    }
    
    const newGroupId = `group-${Date.now()}`;
    
    // Create new friend entry for the group
    const newGroupFriend: Friend = {
      id: newGroupId,
      name: groupName,
      username: groupName.toLowerCase().replace(/\s+/g, '-'),
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      status: 'online'
    };
    
    // Create empty chat history for the group
    const welcomeMessage: ChatMessage = {
      id: '1',
      text: `Welcome to the group "${groupName}"!`,
      sender: 'friend',
      timestamp: new Date()
    };
    
    // Update state
    // In a real app, you would update these through APIs
    // This is just for demonstration
    friends.push(newGroupFriend);
    
    setLocalChats(prev => ({
      ...prev,
      [newGroupId]: [welcomeMessage]
    }));
    
    setActiveChat(newGroupId);
    setShowNewGroupDialog(false);
    setGroupName('');
    setSelectedFriendsForGroup([]);
    
    toast.success("Group chat created successfully!");
  };

  const filteredFriends = friends.filter(friend => {
    const nameMatch = friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    const usernameMatch = friend.username.toLowerCase().includes(searchTerm.toLowerCase());
    const messageMatch = localChats[friend.id]?.some(msg => 
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return nameMatch || usernameMatch || messageMatch;
  });

  const sampleStories: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      stories: [
        {
          id: '1',
          image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmVzZWFyY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
          text: 'Working on a new machine learning project today!',
          timestamp: '4 hours ago'
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Michael Park',
      username: 'michaelp',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      stories: [
        {
          id: '1',
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
          text: 'Exploring the latest in AI technology!',
          timestamp: '2 hours ago'
        }
      ]
    },
    '4': {
      id: '4',
      name: 'David Kim',
      username: 'davidk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      stories: [
        {
          id: '1',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
          text: 'Checking out the new quantum computing lab!',
          timestamp: '1 day ago'
        }
      ]
    }
  };

  const viewUserStory = (userId: string) => {
    if (sampleStories[userId]) {
      return (
        <UserStories 
          user={sampleStories[userId]} 
          onClose={() => setShowStoriesView(false)} 
        />
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl h-full flex flex-col">
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
        viewUserStory(selectedStoryUser.id)
      ) : (
        <>
          <div className="border-b p-4 flex justify-between items-center">
            {(!showMobileChatList || isMobile) && activeChat && (
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
              {activeChat && getActiveFriend() && !showMobileChatList && isMobile ? (
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
            
            <div className="flex space-x-2">
              <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="hidden sm:flex"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    New Group
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Group Chat</DialogTitle>
                    <DialogDescription>
                      Select friends to add to your group chat
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Group Name</label>
                      <Input 
                        placeholder="Enter group name" 
                        value={groupName} 
                        onChange={(e) => setGroupName(e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Select Friends</label>
                      <div className="max-h-60 overflow-y-auto space-y-2 mt-2">
                        {friends.filter(f => !f.id.startsWith('group')).map(friend => (
                          <div 
                            key={friend.id} 
                            className="flex items-center space-x-3 p-2 hover:bg-muted rounded-md"
                          >
                            <input 
                              type="checkbox" 
                              id={`friend-${friend.id}`} 
                              checked={selectedFriendsForGroup.includes(friend.id)} 
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFriendsForGroup(prev => [...prev, friend.id]);
                                } else {
                                  setSelectedFriendsForGroup(prev => prev.filter(id => id !== friend.id));
                                }
                              }} 
                              className="rounded"
                            />
                            <label htmlFor={`friend-${friend.id}`} className="flex items-center space-x-2 cursor-pointer flex-1">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={friend.avatar} alt={friend.name} />
                                <AvatarFallback>{friend.name[0]}</AvatarFallback>
                              </Avatar>
                              <span>{friend.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewGroupDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateGroup}>
                      Create Group
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setShowFriendSearch(true)}
              >
                <UserPlus className="h-4 w-4 mr-2 sm:inline-block hidden" />
                <span className="sm:inline-block hidden">Find People</span>
                <UserPlus className="h-4 w-4 sm:hidden" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            <div className={`${(showMobileChatList || !isMobile) ? 'block md:w-72 w-full' : 'hidden md:block md:w-72'} border-r`}>
              <Tabs defaultValue="chats" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chats">Chats</TabsTrigger>
                  <TabsTrigger value="stories">Stories</TabsTrigger>
                </TabsList>
                
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search messages..." 
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <TabsContent value="chats" className="mt-0">
                  <ScrollArea className={`${isMobile ? 'h-[calc(100vh-320px)]' : 'h-[530px]'}`}>
                    <div className="p-3">
                      <h3 className="text-sm font-medium mb-2 px-2">Recent Chats</h3>
                      {filteredFriends.map(friend => (
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
                            {mutedChats.includes(friend.id) && (
                              <span className="absolute -top-1 -right-1 w-4 h-4 bg-muted rounded-full flex items-center justify-center border border-background">
                                <BellOff className="h-3 w-3 text-muted-foreground" />
                              </span>
                            )}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between">
                              <p className="font-medium text-sm truncate">{friend.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {localChats[friend.id]?.[localChats[friend.id].length - 1]?.timestamp &&
                                  formatTime(localChats[friend.id][localChats[friend.id].length - 1].timestamp)}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-xs text-muted-foreground truncate">
                                {friend.id.startsWith('group') ? '👥 ' : ''}
                                {localChats[friend.id]?.[localChats[friend.id].length - 1]?.text || 'No messages yet'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="stories" className="mt-0">
                  <ScrollArea className={`${isMobile ? 'h-[calc(100vh-320px)]' : 'h-[530px]'}`}>
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
            
            <div className={`flex-1 flex flex-col ${(showMobileChatList && isMobile) ? 'hidden' : 'block'}`}>
              {activeChat && getActiveFriend() ? (
                <>
                  <div className="p-2 border-b hidden md:flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={getActiveFriend()?.avatar} alt={getActiveFriend()?.name} />
                        <AvatarFallback>{getActiveFriend()?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{getActiveFriend()?.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {getActiveFriend()?.id.startsWith('group') ? 'Group Chat' : `@${getActiveFriend()?.username}`} 
                          {!getActiveFriend()?.id.startsWith('group') && (
                            getActiveFriend()?.status === 'online' 
                              ? ' • Online' 
                              : ` • Last seen ${getActiveFriend()?.lastSeen}`
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleMuteChat(activeChat)}>
                          {mutedChats.includes(activeChat) ? (
                            <>
                              <Bell className="mr-2 h-4 w-4" />
                              <span>Unmute Notifications</span>
                            </>
                          ) : (
                            <>
                              <BellOff className="mr-2 h-4 w-4" />
                              <span>Mute Notifications</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteConversation(activeChat)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete Conversation</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => reportSpam(activeChat)}>
                          <span>Report as Spam</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-6">
                      {localChats[activeChat]?.map(message => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`relative group max-w-[75%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'} rounded-xl p-3`}>
                            <div className="flex justify-between items-start gap-4">
                              <p>{message.text}</p>
                              {message.isStarred && (
                                <Star className="h-3 w-3 text-yellow-500 ml-2 mt-0.5" fill="currentColor" />
                              )}
                            </div>
                            <div className="text-xs opacity-70 mt-1 text-right">
                              {formatTime(message.timestamp)}
                            </div>
                            
                            <div className="absolute -right-1 -top-10 bg-background shadow-md rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => toggleStarMessage(activeChat, message.id)}
                              >
                                <Star className={`h-4 w-4 ${message.isStarred ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                              </Button>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Forward className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                  <DropdownMenuLabel>Forward to</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {friends.filter(f => f.id !== activeChat).map(friend => (
                                    <DropdownMenuItem 
                                      key={friend.id}
                                      onClick={() => forwardMessage(message, friend.id)}
                                    >
                                      <Avatar className="h-6 w-6 mr-2">
                                        <AvatarImage src={friend.avatar} alt={friend.name} />
                                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <span>{friend.name}</span>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  <div className="p-3 border-t">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="flex-shrink-0"
                      >
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Textarea 
                        placeholder="Type a message..." 
                        value={messageInput}
                        onChange={e => setMessageInput(e.target.value)}
                        className="min-h-10 flex-1"
                        rows={1}
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="flex-shrink-0"
                      >
                        <Smile className="h-5 w-5" />
                      </Button>
                      <Button 
                        type="submit" 
                        variant="default" 
                        size="icon" 
                        className="flex-shrink-0"
                        disabled={!messageInput.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
                  <Users className="h-12 w-12 mb-4" />
                  <h3 className="font-medium text-lg mb-1">No chat selected</h3>
                  <p className="max-w-xs">Select a chat from the sidebar or start a new conversation</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
