
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, User } from 'lucide-react';

const StudentAnalysis = () => {
  const [expandedStudent, setExpandedStudent] = useState<string | null>('1');

  // Mock student data
  const studentData = [
    {
      id: '1',
      name: 'Bruce Jones',
      initials: 'BJ',
      score: 89,
      timeSpent: '00:23:45',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' }
      ]
    },
    {
      id: '2',
      name: 'Emily Boone',
      initials: 'EB',
      score: 92,
      timeSpent: '00:28:12',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 10, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 9, total: 11, mastery: 'mastery' }
      ]
    },
    {
      id: '3',
      name: 'Nora Sanderson',
      initials: 'NS',
      score: 67,
      timeSpent: '00:31:28',
      attempts: 2,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 6, total: 11, mastery: 'below-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' }
      ]
    }
  ];

  const getMasteryBadge = (mastery: string) => {
    switch (mastery) {
      case 'mastery':
        return <Badge className="performance-mastery">Mastery</Badge>;
      case 'near-mastery':
        return <Badge className="performance-near-mastery">Near Mastery</Badge>;
      case 'below-mastery':
        return <Badge className="performance-below-mastery">Below Mastery</Badge>;
      default:
        return <Badge className="performance-not-assessed">Not Assessed</Badge>;
    }
  };

  const toggleStudent = (studentId: string) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" aria-hidden="true" />
            <span>Student Performance Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {studentData.map((student) => (
            <div key={student.id} className="border border-border rounded-lg p-4 space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleStudent(student.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleStudent(student.id);
                  }
                }}
                aria-expanded={expandedStudent === student.id}
                aria-controls={`student-details-${student.id}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {student.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {student.score}% • {student.timeSpent} • {student.attempts} attempt(s)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getMasteryBadge(student.mastery.toLowerCase().replace(' ', '-'))}
                  {expandedStudent === student.id ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {expandedStudent === student.id && (
                <div 
                  id={`student-details-${student.id}`}
                  className="pt-4 border-t border-border animate-fade-in"
                >
                  <h4 className="font-medium text-foreground mb-3">Standards Performance</h4>
                  <div className="space-y-3">
                    {student.standards.map((standard, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {standard.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {standard.score}/{standard.total} correct
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                standard.mastery === 'mastery' ? 'bg-success' :
                                standard.mastery === 'near-mastery' ? 'bg-warning' :
                                'bg-destructive'
                              }`}
                              style={{ 
                                width: `${(standard.score / standard.total) * 100}%` 
                              }}
                            />
                          </div>
                          {getMasteryBadge(standard.mastery)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAnalysis;
