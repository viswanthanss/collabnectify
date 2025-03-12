
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { TrendingUp, Star, Briefcase, Users } from 'lucide-react';

const StatsWidget = () => {
  const stats = [
    { title: 'Total Projects', value: '2,543', icon: Briefcase, change: '+12.5%', changeType: 'positive' },
    { title: 'Active Users', value: '8,294', icon: Users, change: '+18.2%', changeType: 'positive' },
    { title: 'Avg. Engagement', value: '65%', icon: TrendingUp, change: '+5.4%', changeType: 'positive' },
    { title: 'Top Rated', value: '126', icon: Star, change: '+22.1%', changeType: 'positive' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover-scale">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h4 className="text-2xl font-bold">{stat.value}</h4>
                <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="rounded-full p-2 bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const ProjectTrendsWidget = () => {
  const data = [
    { name: 'Jan', AI: 65, Web3: 40, Mobile: 35 },
    { name: 'Feb', AI: 59, Web3: 38, Mobile: 40 },
    { name: 'Mar', AI: 80, Web3: 42, Mobile: 45 },
    { name: 'Apr', AI: 81, Web3: 50, Mobile: 48 },
    { name: 'May', AI: 90, Web3: 55, Mobile: 52 },
    { name: 'Jun', AI: 105, Web3: 60, Mobile: 55 },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2 hover-scale">
      <CardHeader>
        <CardTitle>Project Category Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="AI" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="Web3" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="Mobile" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const UserEngagementWidget = () => {
  const data = [
    { name: 'Mon', value: 20 },
    { name: 'Tue', value: 35 },
    { name: 'Wed', value: 48 },
    { name: 'Thu', value: 42 },
    { name: 'Fri', value: 55 },
    { name: 'Sat', value: 30 },
    { name: 'Sun', value: 25 },
  ];

  return (
    <Card className="hover-scale">
      <CardHeader>
        <CardTitle>Weekly Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const SkillDistributionWidget = () => {
  const data = [
    { name: 'AI/ML', value: 35 },
    { name: 'Web Dev', value: 25 },
    { name: 'Data Science', value: 20 },
    { name: 'Mobile Dev', value: 15 },
    { name: 'UI/UX', value: 10 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

  return (
    <Card className="hover-scale">
      <CardHeader>
        <CardTitle>Skill Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const Widgets = () => {
  return (
    <section className="section-container bg-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-bold mb-6">Platform Insights</h2>
        
        <div className="space-y-6">
          <StatsWidget />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <ProjectTrendsWidget />
            <UserEngagementWidget />
            <SkillDistributionWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Widgets;
