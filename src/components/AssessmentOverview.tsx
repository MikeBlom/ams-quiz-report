
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  Target, 
  PieChart, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  GripVertical,
  Settings,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WidgetCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  value: string | number;
  subtitle: string;
  link: string;
  trend?: {
    direction: 'up' | 'down';
    value: number;
  };
  priority?: 'high' | 'medium' | 'low';
}

interface AssessmentOverviewProps {
  userRole?: 'teacher' | 'admin' | 'district';
}

const AssessmentOverview: React.FC<AssessmentOverviewProps> = ({ 
  userRole = 'teacher' 
}) => {
  const [widgets, setWidgets] = useState<WidgetCardProps[]>([
    {
      id: 'students',
      title: 'Student Performance',
      description: 'Individual student analysis and performance breakdown',
      icon: Users,
      value: '26/28',
      subtitle: 'Students Completed',
      link: '/assessment/students',
      trend: { direction: 'up', value: 5 },
      priority: 'high'
    },
    {
      id: 'mastery',
      title: 'Mastery Distribution',
      description: 'Learning objectives mastery tracking across standards',
      icon: PieChart,
      value: '78%',
      subtitle: 'Average Mastery',
      link: '/assessment/mastery',
      trend: { direction: 'up', value: 3 },
      priority: 'high'
    },
    {
      id: 'items',
      title: 'Item Analysis',
      description: 'Question-level statistics and distractor patterns',
      icon: BookOpen,
      value: '12',
      subtitle: 'Total Items',
      link: '/assessment/items',
      priority: 'medium'
    },
    {
      id: 'standards',
      title: 'Standards Analysis',
      description: 'Learning standards performance and outcomes',
      icon: Target,
      value: '4',
      subtitle: 'Standards Assessed',
      link: '/assessment/standards',
      trend: { direction: 'up', value: 2 },
      priority: userRole === 'admin' ? 'high' : 'medium'
    }
  ]);

  const [isDragging, setIsDragging] = useState(false);

  // Mock assessment data
  const assessmentData = {
    title: "Unit 3: Algebraic Expressions Quiz",
    date: "March 15, 2024",
    totalStudents: 28,
    completed: 26,
    averageScore: 78,
    timeSpent: "00:24:36"
  };

  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    e.dataTransfer.setData('text/plain', widgetId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedIndex = widgets.findIndex(w => w.id === draggedId);
    
    if (draggedIndex !== -1 && draggedIndex !== dropIndex) {
      const newWidgets = [...widgets];
      const [draggedWidget] = newWidgets.splice(draggedIndex, 1);
      newWidgets.splice(dropIndex, 0, draggedWidget);
      setWidgets(newWidgets);
    }
    setIsDragging(false);
  };

  const WidgetCard: React.FC<WidgetCardProps & { index: number }> = ({ 
    title, 
    description, 
    icon: Icon, 
    value, 
    subtitle, 
    link, 
    trend,
    priority,
    index,
    id
  }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, id)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
      className={`group transition-all duration-200 ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary">
        <Link to={link} className="block h-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  {priority === 'high' && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Priority
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
              {trend && (
                <div className={`flex items-center text-sm ${
                  trend.direction === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    trend.direction === 'down' ? 'rotate-180' : ''
                  }`} />
                  {trend.direction === 'up' ? '+' : '-'}{trend.value}%
                </div>
              )}
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Assessment Overview
                </h1>
                <p className="text-muted-foreground mt-1">
                  {assessmentData.title} • {assessmentData.date}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                  Customize
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{assessmentData.completed}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{assessmentData.averageScore}%</p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{assessmentData.timeSpent}</p>
                  <p className="text-xs text-muted-foreground">Avg Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Total Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Widgets */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Analysis Modules
            </h2>
            <p className="text-sm text-muted-foreground">
              Drag to reorder • Click to explore
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {widgets.map((widget, index) => (
              <WidgetCard
                key={widget.id}
                {...widget}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Role-based recommendations */}
        {userRole === 'teacher' && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <Target className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Review struggling students in Graphing Functions
                    </p>
                    <p className="text-xs text-blue-700">
                      6 students scored below 60% on this standard
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Strong performance in Linear Equations
                    </p>
                    <p className="text-xs text-green-700">
                      85% class average - consider advancing to complex problems
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AssessmentOverview;
