
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Target, TrendingUp, TrendingDown } from 'lucide-react';

const StandardsAnalysis = () => {
  // Student performance data - each student's performance on each standard
  const studentPerformanceData = [
    { student: 'Bruce Jones', 'Algebraic Expressions': 89, 'Linear Equations': 78, 'Graphing Functions': 85, 'Systems of Equations': 82 },
    { student: 'Emily Boone', 'Algebraic Expressions': 95, 'Linear Equations': 92, 'Graphing Functions': 88, 'Systems of Equations': 90 },
    { student: 'Alex Thompson', 'Algebraic Expressions': 98, 'Linear Equations': 95, 'Graphing Functions': 82, 'Systems of Equations': 93 },
    { student: 'Emma Davis', 'Algebraic Expressions': 92, 'Linear Equations': 89, 'Graphing Functions': 90, 'Systems of Equations': 87 },
    { student: 'Olivia Johnson', 'Algebraic Expressions': 88, 'Linear Equations': 85, 'Graphing Functions': 62, 'Systems of Equations': 75 },
    { student: 'Nathan Miller', 'Algebraic Expressions': 91, 'Linear Equations': 88, 'Graphing Functions': 86, 'Systems of Equations': 84 },
    { student: 'Sophia Lee', 'Algebraic Expressions': 96, 'Linear Equations': 94, 'Graphing Functions': 91, 'Systems of Equations': 93 },
    { student: 'Madison Taylor', 'Algebraic Expressions': 86, 'Linear Equations': 79, 'Graphing Functions': 83, 'Systems of Equations': 81 },
    { student: 'Michael Rodriguez', 'Algebraic Expressions': 84, 'Linear Equations': 76, 'Graphing Functions': 73, 'Systems of Equations': 78 },
    { student: 'Ethan Moore', 'Algebraic Expressions': 97, 'Linear Equations': 93, 'Graphing Functions': 89, 'Systems of Equations': 95 },
    { student: 'Sarah Chen', 'Algebraic Expressions': 81, 'Linear Equations': 83, 'Graphing Functions': 79, 'Systems of Equations': 77 },
    { student: 'Ryan Martinez', 'Algebraic Expressions': 79, 'Linear Equations': 82, 'Graphing Functions': 71, 'Systems of Equations': 73 },
    { student: 'Jackson Wilson', 'Algebraic Expressions': 77, 'Linear Equations': 80, 'Graphing Functions': 68, 'Systems of Equations': 72 },
    { student: 'Grace Thomas', 'Algebraic Expressions': 80, 'Linear Equations': 78, 'Graphing Functions': 70, 'Systems of Equations': 74 },
    { student: 'Nora Sanderson', 'Algebraic Expressions': 68, 'Linear Equations': 72, 'Graphing Functions': 65, 'Systems of Equations': 69 },
    { student: 'Jessica Williams', 'Algebraic Expressions': 74, 'Linear Equations': 71, 'Graphing Functions': 58, 'Systems of Equations': 66 },
    { student: 'Tyler Brown', 'Algebraic Expressions': 73, 'Linear Equations': 67, 'Graphing Functions': 55, 'Systems of Equations': 64 },
    { student: 'Kevin Anderson', 'Algebraic Expressions': 65, 'Linear Equations': 63, 'Graphing Functions': 52, 'Systems of Equations': 58 },
    { student: 'David Kim', 'Algebraic Expressions': 61, 'Linear Equations': 59, 'Graphing Functions': 48, 'Systems of Equations': 55 },
    { student: 'Chloe Garcia', 'Algebraic Expressions': 58, 'Linear Equations': 56, 'Graphing Functions': 45, 'Systems of Equations': 52 },
    { student: 'Isabella Wright', 'Algebraic Expressions': 76, 'Linear Equations': 74, 'Graphing Functions': 61, 'Systems of Equations': 67 },
    { student: 'Lucas Johnson', 'Algebraic Expressions': 75, 'Linear Equations': 73, 'Graphing Functions': 60, 'Systems of Equations': 66 },
    { student: 'Mia Thompson', 'Algebraic Expressions': 55, 'Linear Equations': 53, 'Graphing Functions': 42, 'Systems of Equations': 49 },
    { student: 'Noah Davis', 'Algebraic Expressions': 54, 'Linear Equations': 52, 'Graphing Functions': 41, 'Systems of Equations': 48 },
    { student: 'Ava Martinez', 'Algebraic Expressions': 53, 'Linear Equations': 51, 'Graphing Functions': 40, 'Systems of Equations': 47 },
    { student: 'Liam Wilson', 'Algebraic Expressions': 52, 'Linear Equations': 50, 'Graphing Functions': 39, 'Systems of Equations': 46 },
  ];

  // Transform data for scatter plot with jittering to prevent overlapping
  const scatterData = useMemo(() => {
    const standards = ['Algebraic Expressions', 'Linear Equations', 'Graphing Functions', 'Systems of Equations'];
    const data: Array<{x: number, y: number, student: string, standard: string, score: number}> = [];
    
    standards.forEach((standard, standardIndex) => {
      // Group students by score ranges to create clusters
      const scoreGroups: {[key: string]: typeof studentPerformanceData} = {};
      
      studentPerformanceData.forEach(student => {
        const score = student[standard as keyof typeof student] as number;
        const scoreRange = Math.floor(score / 5) * 5; // Group by 5-point ranges
        if (!scoreGroups[scoreRange]) scoreGroups[scoreRange] = [];
        scoreGroups[scoreRange].push(student);
      });
      
      // Add jittering within each score group
      Object.entries(scoreGroups).forEach(([scoreRange, students]) => {
        students.forEach((student, studentIndex) => {
          const score = student[standard as keyof typeof student] as number;
          const jitterX = (studentIndex % 3 - 1) * 0.1; // Horizontal jitter
          const jitterY = (studentIndex % 2) * 2 - 1; // Vertical jitter
          
          data.push({
            x: standardIndex + jitterX,
            y: score + jitterY,
            student: student.student,
            standard,
            score
          });
        });
      });
    });
    
    return data;
  }, [studentPerformanceData]);

  // Custom tooltip for scatter plot
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground">{data.student}</p>
          <p className="text-sm text-muted-foreground">{data.standard}</p>
          <p className="text-sm font-medium text-primary">{data.score}%</p>
        </div>
      );
    }
    return null;
  };

  // Mock standards data
  const standardsData = [
    {
      id: 'A.SSE.1',
      name: 'Algebraic Expressions',
      description: 'Interpret expressions that represent a quantity in terms of its context',
      totalQuestions: 4,
      averageScore: 78,
      masteryLevel: 'Near Mastery',
      studentsAtMastery: 18,
      studentsNearMastery: 6,
      studentsBelowMastery: 2,
      trend: 'up',
      trendValue: 5
    },
    {
      id: 'A.REI.3',
      name: 'Linear Equations',
      description: 'Solve linear equations and inequalities in one variable',
      totalQuestions: 3,
      averageScore: 85,
      masteryLevel: 'Mastery',
      studentsAtMastery: 22,
      studentsNearMastery: 3,
      studentsBelowMastery: 1,
      trend: 'up',
      trendValue: 8
    },
    {
      id: 'F.IF.7',
      name: 'Graphing Functions',
      description: 'Graph functions expressed symbolically and show key features',
      totalQuestions: 3,
      averageScore: 65,
      masteryLevel: 'Below Mastery',
      studentsAtMastery: 12,
      studentsNearMastery: 8,
      studentsBelowMastery: 6,
      trend: 'down',
      trendValue: 3
    },
    {
      id: 'A.REI.6',
      name: 'Systems of Equations',
      description: 'Solve systems of linear equations exactly and approximately',
      totalQuestions: 2,
      averageScore: 72,
      masteryLevel: 'Near Mastery',
      studentsAtMastery: 15,
      studentsNearMastery: 8,
      studentsBelowMastery: 3,
      trend: 'up',
      trendValue: 2
    }
  ];

  const getMasteryBadge = (mastery: string) => {
    switch (mastery.toLowerCase()) {
      case 'mastery':
        return <Badge className="performance-mastery">Mastery</Badge>;
      case 'near mastery':
        return <Badge className="performance-near-mastery">Near Mastery</Badge>;
      case 'below mastery':
        return <Badge className="performance-below-mastery">Below Mastery</Badge>;
      default:
        return <Badge className="performance-not-assessed">Not Assessed</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-success" aria-hidden="true" />;
    } else if (trend === 'down') {
      return <TrendingDown className="h-4 w-4 text-destructive" aria-hidden="true" />;
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Student Performance Scatter Plot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" aria-hidden="true" />
            <span>Student Performance by Standard</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Each dot represents a student's performance on that standard. Hover to see details.
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full relative">
            {/* Gradient Background */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'linear-gradient(to bottom, hsl(142, 76%, 36%) 0%, hsl(40, 89%, 60%) 50%, hsl(0, 75%, 60%) 100%)',
                opacity: 0.1
              }}
            />
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={scatterData} margin={{ top: 20, right: 30, bottom: 60, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[-0.5, 3.5]}
                  ticks={[0, 1, 2, 3]}
                  tickFormatter={(value) => {
                    const standards = ['Algebraic Expressions', 'Linear Equations', 'Graphing Functions', 'Systems of Equations'];
                    return standards[value] || '';
                  }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[30, 100]}
                  label={{ value: 'Performance (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter 
                  data={scatterData} 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.7}
                  r={4}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" aria-hidden="true" />
            <span>Standards & Outcomes Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {standardsData.map((standard) => (
            <div key={standard.id} className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">
                      {standard.name} ({standard.id})
                    </h3>
                    {getMasteryBadge(standard.masteryLevel)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {standard.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {standard.totalQuestions} questions assessed
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl font-bold text-primary">
                      {standard.averageScore}%
                    </span>
                    {getTrendIcon(standard.trend)}
                    <span className={`text-sm ${
                      standard.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {standard.trend === 'up' ? '+' : '-'}{standard.trendValue}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    vs. previous assessment
                  </p>
                </div>
              </div>

              {/* Mastery Distribution */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground text-sm">Student Mastery Distribution</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-lg font-bold text-green-800">
                      {standard.studentsAtMastery}
                    </p>
                    <p className="text-xs text-green-700">Mastery</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <p className="text-lg font-bold text-yellow-800">
                      {standard.studentsNearMastery}
                    </p>
                    <p className="text-xs text-yellow-700">Near Mastery</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-lg font-bold text-red-800">
                      {standard.studentsBelowMastery}
                    </p>
                    <p className="text-xs text-red-700">Below Mastery</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Class Progress</span>
                  <span className="font-medium text-foreground">{standard.averageScore}%</span>
                </div>
                <Progress 
                  value={standard.averageScore} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StandardsAnalysis;
