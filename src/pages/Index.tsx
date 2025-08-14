import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { 
  User, 
  Target, 
  Clock, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Users,
  Settings 
} from 'lucide-react';

interface WidgetData {
  id: string;
  title: string;
  description: string;
  value: string | number;
  subtitle: string;
  link: string;
  sparkline: {
    values: number[];
    trend: 'up' | 'down';
    trendValue: number;
  };
  priority: 'high' | 'medium' | 'low';
}

const Index = () => {
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);

  // Assessment data - preserving exact same functionality
  const assessmentData = {
    title: "Unit 3: Algebraic Expressions Quiz",
    date: "March 15, 2024",
    totalStudents: 28,
    completed: 26,
    averageScore: 78,
    timeSpent: "00:24:36"
  };

  // Metrics overview data
  const metricsData = [
    {
      icon: User,
      value: `${assessmentData.completed}/${assessmentData.totalStudents}`,
      label: 'Students Completed',
      color: 'hsl(142, 76%, 36%)'
    },
    {
      icon: Target,
      value: `${assessmentData.averageScore}%`,
      label: 'Average Score',
      color: 'hsl(199, 89%, 48%)'
    },
    {
      icon: Clock,
      value: assessmentData.timeSpent,
      label: 'Average Time',
      color: 'hsl(40, 89%, 60%)'
    },
    {
      icon: FileText,
      value: '12',
      label: 'Total Items',
      color: 'hsl(280, 50%, 50%)'
    }
  ];

  // Widget cards data - preserving exact same functionality
  const [widgets, setWidgets] = useState<WidgetData[]>([
    {
      id: 'students',
      title: 'Student Performance',
      description: 'Individual student analysis and performance breakdown',
      value: '26/28',
      subtitle: 'Students Completed',
      link: '/assessment/students',
      sparkline: { 
        values: [65, 72, 78, 82, 89, 85, 78], 
        trend: 'up', 
        trendValue: 5 
      },
      priority: 'high'
    },
    {
      id: 'mastery',
      title: 'Mastery Distribution',
      description: 'Learning objectives mastery tracking across standards',
      value: '78%',
      subtitle: 'Average Mastery',
      link: '/assessment/mastery',
      sparkline: { 
        values: [68, 70, 75, 74, 78, 76, 78], 
        trend: 'up', 
        trendValue: 3 
      },
      priority: 'high'
    },
    {
      id: 'items',
      title: 'Item Analysis',
      description: 'Question-level statistics and distractor patterns',
      value: '12',
      subtitle: 'Total Items',
      link: '/assessment/items',
      sparkline: { 
        values: [85, 82, 78, 85, 88, 84, 82], 
        trend: 'down', 
        trendValue: 2 
      },
      priority: 'medium'
    },
    {
      id: 'standards',
      title: 'Standards Analysis',
      description: 'Learning standards performance and outcomes',
      value: '4',
      subtitle: 'Standards Assessed',
      link: '/assessment/standards',
      sparkline: { 
        values: [72, 75, 78, 74, 79, 82, 78], 
        trend: 'up', 
        trendValue: 2 
      },
      priority: 'medium'
    }
  ]);

  // Performance insights data
  const performanceInsights = [
    {
      type: 'success',
      title: 'Strong Performance',
      description: 'Linear equations showing excellent mastery rates (85% average)',
      action: 'View detailed analysis',
      link: '/assessment/standards'
    },
    {
      type: 'warning',
      title: 'Attention Needed',
      description: 'Graphing functions below target (65% average)',
      action: 'Review problem areas',
      link: '/assessment/items'
    },
    {
      type: 'info',
      title: 'Assessment Progress',
      description: '26 of 28 students completed the assessment',
      action: 'Follow up with incomplete',
      link: '/assessment/students'
    }
  ];

  // Mastery distribution data for overview chart
  const masteryOverview = [
    { name: 'Mastery', value: 14, color: 'hsl(142, 76%, 36%)' },
    { name: 'Near Mastery', value: 8, color: 'hsl(40, 89%, 60%)' },
    { name: 'Below Mastery', value: 4, color: 'hsl(0, 75%, 60%)' }
  ];

  // Standards performance data
  const standardsPerformance = [
    { standard: 'Algebraic Expressions', score: 78 },
    { standard: 'Linear Equations', score: 85 },
    { standard: 'Graphing Functions', score: 65 },
    { standard: 'Systems of Equations', score: 72 }
  ];

  // Drag and drop handlers - preserving exact functionality
  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    setDraggedWidget(widgetId);
    e.dataTransfer.setData('text/plain', widgetId);
  };

  const handleDragEnd = () => {
    setDraggedWidget(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    
    if (sourceId !== targetId) {
      setWidgets(prev => {
        const newWidgets = [...prev];
        const sourceIndex = newWidgets.findIndex(w => w.id === sourceId);
        const targetIndex = newWidgets.findIndex(w => w.id === targetId);
        
        const [removed] = newWidgets.splice(sourceIndex, 1);
        newWidgets.splice(targetIndex, 0, removed);
        
        return newWidgets;
      });
    }
  };

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-success" /> : 
      <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'hsl(142, 76%, 36%)';
      case 'warning': return 'hsl(40, 89%, 60%)';
      case 'info': return 'hsl(199, 89%, 48%)';
      default: return 'hsl(210, 11%, 45%)';
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">
                  Assessment Overview
                </h1>
                <p className="text-muted-foreground">
                  {assessmentData.title} • {assessmentData.date}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${metric.color}15` }}
                    >
                      <IconComponent 
                        className="h-6 w-6" 
                        style={{ color: metric.color }}
                      />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance Overview Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mastery Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Mastery Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={masteryOverview}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {masteryOverview.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Standards Performance Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Standards Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={standardsPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="standard" 
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceInsights.map((insight, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getInsightColor(insight.type) }}
                  />
                  <div>
                    <p className="font-medium text-foreground">{insight.title}</p>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={insight.link}>{insight.action}</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Analysis Modules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Analysis Modules</span>
              <span className="text-sm font-normal text-muted-foreground">
                Drag to reorder • Click to explore
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {widgets.map((widget) => (
                <div
                  key={widget.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, widget.id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, widget.id)}
                  className={`cursor-move transition-all ${
                    draggedWidget === widget.id ? 'opacity-50' : ''
                  }`}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">
                              {widget.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {widget.description}
                            </p>
                          </div>
                          <Badge variant="outline" className={
                            widget.priority === 'high' ? 'border-destructive text-destructive' :
                            widget.priority === 'medium' ? 'border-warning text-warning' :
                            'border-muted-foreground text-muted-foreground'
                          }>
                            {widget.priority}
                          </Badge>
                        </div>

                        {/* Metrics */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-primary">{widget.value}</p>
                            <p className="text-sm text-muted-foreground">{widget.subtitle}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(widget.sparkline.trend)}
                            <span className={`text-sm font-medium ${
                              widget.sparkline.trend === 'up' ? 'text-success' : 'text-destructive'
                            }`}>
                              {widget.sparkline.trend === 'up' ? '+' : '-'}{widget.sparkline.trendValue}%
                            </span>
                          </div>
                        </div>

                        {/* Sparkline */}
                        <div className="h-16">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={widget.sparkline.values.map((value, index) => ({ value, index }))}>
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke={widget.sparkline.trend === 'up' ? 'hsl(142, 76%, 36%)' : 'hsl(0, 75%, 60%)'} 
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Action Button */}
                        <Button className="w-full" asChild>
                          <Link to={widget.link}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Explore Analysis
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;