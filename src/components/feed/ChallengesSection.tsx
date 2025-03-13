
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Flame, Calendar, Users, List, Clock, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const ChallengesSection = () => {
  const [currentTab, setCurrentTab] = useState('active');
  
  const challenges = {
    active: [
      {
        id: '1',
        title: 'AI Ethics Implementation',
        description: 'Develop a solution that addresses bias in AI systems using the latest fairness techniques.',
        category: 'AI Ethics',
        difficulty: 'Intermediate',
        participants: 187,
        daysLeft: 5,
        progress: 65,
        streak: 3,
      },
      {
        id: '2',
        title: 'Weekly Paper Implementation',
        description: 'Implement the key algorithm from this week\'s featured research paper on efficient transformers.',
        category: 'Research',
        difficulty: 'Advanced',
        participants: 124,
        daysLeft: 3,
        progress: 40,
        streak: 2,
      },
      {
        id: '3',
        title: 'Optimize Processing Pipeline',
        description: 'Improve the efficiency of a data processing pipeline for large-scale text analysis.',
        category: 'Data Engineering',
        difficulty: 'Beginner',
        participants: 246,
        daysLeft: 6,
        progress: 80,
        streak: 5,
      }
    ],
    leaderboard: [
      {
        rank: 1,
        user: {
          name: 'Alex Chen',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        },
        points: 1250,
        completedChallenges: 12,
        streak: 14,
      },
      {
        rank: 2,
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        },
        points: 1120,
        completedChallenges: 10,
        streak: 8,
      },
      {
        rank: 3,
        user: {
          name: 'Michael Park',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        },
        points: 980,
        completedChallenges: 9,
        streak: 6,
      },
      {
        rank: 4,
        user: {
          name: 'Emily Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        },
        points: 830,
        completedChallenges: 8,
        streak: 4,
      },
      {
        rank: 5,
        user: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        },
        points: 710,
        completedChallenges: 7,
        streak: 3,
      }
    ],
    yourStats: {
      rank: 18,
      points: 385,
      completedChallenges: 4,
      streak: 3,
      name: 'Your Profile',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Challenges & Streaks
          </h2>
          <p className="text-muted-foreground">Build consistent participation with daily and weekly challenges</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={currentTab === 'active' ? 'default' : 'outline'} 
            onClick={() => setCurrentTab('active')}
          >
            Active Challenges
          </Button>
          <Button 
            variant={currentTab === 'leaderboard' ? 'default' : 'outline'}
            onClick={() => setCurrentTab('leaderboard')}
          >
            Leaderboard
          </Button>
        </div>
      </div>

      {currentTab === 'active' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.active.map(challenge => (
            <Card key={challenge.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-1">
                  <Badge>{challenge.category}</Badge>
                  <Badge variant="outline" className="bg-secondary/20">
                    {challenge.difficulty}
                  </Badge>
                </div>
                <CardTitle>{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                
                <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-orange-500 font-medium">
                      {challenge.streak} day streak!
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-sm">
                    <span>Your progress</span>
                    <span className="font-medium">{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full" onClick={() => toast.success("Challenge details loaded")}>
                  Continue Challenge
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Challenge Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenges.leaderboard.map((entry) => (
                    <div 
                      key={entry.rank}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          entry.rank === 1 ? 'bg-yellow-500 text-black' :
                          entry.rank === 2 ? 'bg-gray-300 text-black' :
                          entry.rank === 3 ? 'bg-amber-700 text-white' : 'bg-secondary text-foreground'
                        }`}>
                          {entry.rank}
                        </div>
                        <Avatar>
                          <AvatarImage src={entry.user.avatar} />
                          <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{entry.user.name}</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="font-bold">{entry.points}</div>
                          <div className="text-xs text-muted-foreground">Points</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{entry.completedChallenges}</div>
                          <div className="text-xs text-muted-foreground">Completed</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="font-bold">{entry.streak}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => toast.info("Loading full leaderboard")}>
                  View Full Leaderboard
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={challenges.yourStats.avatar} />
                    <AvatarFallback>{challenges.yourStats.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{challenges.yourStats.name}</div>
                    <div className="text-sm text-muted-foreground">Rank #{challenges.yourStats.rank}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Card className="p-3 text-center">
                    <p className="text-3xl font-bold">{challenges.yourStats.points}</p>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                  </Card>
                  <Card className="p-3 text-center">
                    <p className="text-3xl font-bold">{challenges.yourStats.completedChallenges}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </Card>
                </div>
                
                <Card className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Streak</div>
                      <div className="text-2xl font-bold flex items-center gap-1">
                        <Flame className="h-5 w-5 text-orange-500" />
                        {challenges.yourStats.streak} days
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="bg-background/80 backdrop-blur-sm"
                      onClick={() => toast.success("Daily challenge completed!")}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Today's Challenge
                    </Button>
                  </div>
                </Card>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-2">NLP Fine-tuning Competition</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Fine-tune a language model for specialized domain tasks and submit your results.
                </p>
                <div className="flex justify-between text-sm mb-1">
                  <span>4 days remaining</span>
                  <span>150+ participants</span>
                </div>
                <Button className="w-full" onClick={() => toast.info("Weekly challenge details loaded")}>
                  View Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengesSection;
