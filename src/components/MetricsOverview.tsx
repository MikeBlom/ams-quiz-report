
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Clock, Target, BookOpen } from 'lucide-react';

interface MetricsOverviewProps {
  data: {
    totalStudents: number;
    completed: number;
    averageScore: number;
    timeSpent: string;
  };
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ data }) => {
  // Mock data for charts
  const performanceData = [
    { standard: 'Algebraic Expressions', score: 85, students: 24 },
    { standard: 'Linear Equations', score: 72, students: 26 },
    { standard: 'Graphing Functions', score: 68, students: 25 },
    { standard: 'Systems of Equations', score: 79, students: 23 }
  ];

  const masteryData = [
    { name: 'Mastery', value: 14, color: 'hsl(142, 76%, 36%)' },
    { name: 'Near Mastery', value: 8, color: 'hsl(38, 92%, 50%)' },
    { name: 'Below Mastery', value: 4, color: 'hsl(0, 75%, 60%)' },
    { name: 'Not Assessed', value: 2, color: 'hsl(210, 11%, 71%)' }
  ];

  const scoreDistribution = [
    { range: '90-100%', count: 6 },
    { range: '80-89%', count: 8 },
    { range: '70-79%', count: 7 },
    { range: '60-69%', count: 3 },
    { range: 'Below 60%', count: 2 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {data.completed}/{data.totalStudents}
                </p>
                <p className="text-sm text-muted-foreground">Students Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Target className="h-6 w-6 text-success" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{data.averageScore}%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Clock className="h-6 w-6 text-info" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{data.timeSpent}</p>
                <p className="text-sm text-muted-foreground">Avg Time Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-warning" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance by Standard */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance by Standard</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="standard" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}%`,
                    name === 'score' ? 'Average Score' : name
                  ]}
                />
                <Bar 
                  dataKey="score" 
                  fill="hsl(var(--chart-primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mastery Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Mastery Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={masteryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {masteryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Score Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={scoreDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="range" type="category" />
              <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--chart-secondary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
