
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';

const ItemAnalysis = () => {
  // Mock item analysis data
  const itemData = [
    {
      id: 1,
      question: 'Solve for x: 2x + 5 = 13',
      standard: 'Linear Equations',
      difficulty: 'Medium',
      correctRate: 85,
      discrimination: 0.67,
      pValue: 0.85,
      distractorAnalysis: [
        { option: 'A', text: 'x = 4 (Correct)', selected: 22, isCorrect: true },
        { option: 'B', text: 'x = 6', selected: 3, isCorrect: false },
        { option: 'C', text: 'x = 9', selected: 1, isCorrect: false },
        { option: 'D', text: 'x = 3', selected: 0, isCorrect: false }
      ]
    },
    {
      id: 2,
      question: 'Which expression is equivalent to 3(x + 2)?',
      standard: 'Algebraic Expressions',
      difficulty: 'Easy',
      correctRate: 92,
      discrimination: 0.43,
      pValue: 0.92,
      distractorAnalysis: [
        { option: 'A', text: '3x + 6 (Correct)', selected: 24, isCorrect: true },
        { option: 'B', text: '3x + 2', selected: 2, isCorrect: false },
        { option: 'C', text: '6x + 3', selected: 0, isCorrect: false },
        { option: 'D', text: '3x + 5', selected: 0, isCorrect: false }
      ]
    },
    {
      id: 3,
      question: 'Graph the function f(x) = 2x - 1',
      standard: 'Graphing Functions',
      difficulty: 'Hard',
      correctRate: 58,
      discrimination: 0.78,
      pValue: 0.58,
      distractorAnalysis: [
        { option: 'A', text: 'Graph A (Correct)', selected: 15, isCorrect: true },
        { option: 'B', text: 'Graph B', selected: 8, isCorrect: false },
        { option: 'C', text: 'Graph C', selected: 2, isCorrect: false },
        { option: 'D', text: 'Graph D', selected: 1, isCorrect: false }
      ]
    }
  ];

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return <Badge className="bg-green-100 text-green-800">Easy</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'hard':
        return <Badge className="bg-red-100 text-red-800">Hard</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  const getPerformanceIcon = (correctRate: number) => {
    if (correctRate >= 80) {
      return <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />;
    } else if (correctRate >= 60) {
      return <AlertTriangle className="h-4 w-4 text-warning" aria-hidden="true" />;
    } else {
      return <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            <span>Item Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {itemData.map((item) => (
            <div key={item.id} className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-2">
                    Question {item.id}: {item.question}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{item.standard}</Badge>
                    {getDifficultyBadge(item.difficulty)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {getPerformanceIcon(item.correctRate)}
                  <span className="text-lg font-semibold text-primary">
                    {item.correctRate}%
                  </span>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-t border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">P-Value</p>
                  <p className="text-lg font-medium text-foreground">{item.pValue}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Discrimination</p>
                  <p className="text-lg font-medium text-foreground">{item.discrimination}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Correct Rate</p>
                  <p className="text-lg font-medium text-foreground">{item.correctRate}%</p>
                </div>
              </div>

              {/* Distractor Analysis */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Answer Choice Analysis</h4>
                <div className="space-y-2">
                  {item.distractorAnalysis.map((option) => (
                    <div 
                      key={option.option}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        option.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-sm w-6">
                          {option.option}.
                        </span>
                        <span className="text-sm text-foreground">{option.text}</span>
                        {option.isCorrect && (
                          <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-border rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              option.isCorrect ? 'bg-success' : 'bg-muted-foreground'
                            }`}
                            style={{ 
                              width: `${(option.selected / 26) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">
                          {option.selected}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemAnalysis;
