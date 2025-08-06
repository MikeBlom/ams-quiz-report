
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, TrendingDown } from 'lucide-react';

const StandardsAnalysis = () => {
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
