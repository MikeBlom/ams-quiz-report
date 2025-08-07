
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, User, Grid, List } from 'lucide-react';

const StudentAnalysis = () => {
  const [expandedStudent, setExpandedStudent] = useState<string | null>('1');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');

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
    },
    {
      id: '4',
      name: 'Alex Thompson',
      initials: 'AT',
      score: 95,
      timeSpent: '00:19:33',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 11, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 10, total: 11, mastery: 'mastery' }
      ]
    },
    {
      id: '5',
      name: 'Sarah Chen',
      initials: 'SC',
      score: 78,
      timeSpent: '00:26:47',
      attempts: 1,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 8, total: 11, mastery: 'near-mastery' }
      ]
    },
    {
      id: '6',
      name: 'Michael Rodriguez',
      initials: 'MR',
      score: 84,
      timeSpent: '00:32:15',
      attempts: 2,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 8, total: 11, mastery: 'near-mastery' }
      ]
    },
    {
      id: '7',
      name: 'Jessica Williams',
      initials: 'JW',
      score: 71,
      timeSpent: '00:29:52',
      attempts: 1,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' }
      ]
    },
    {
      id: '8',
      name: 'David Kim',
      initials: 'DK',
      score: 58,
      timeSpent: '00:35:41',
      attempts: 3,
      status: 'Completed',
      mastery: 'Below Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 5, total: 11, mastery: 'below-mastery' },
        { name: 'Linear Equations', score: 6, total: 11, mastery: 'below-mastery' }
      ]
    },
    {
      id: '9',
      name: 'Emma Davis',
      initials: 'ED',
      score: 91,
      timeSpent: '00:24:18',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 10, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 9, total: 11, mastery: 'mastery' }
      ]
    },
    {
      id: '10',
      name: 'Ryan Martinez',
      initials: 'RM',
      score: 76,
      timeSpent: '00:27:39',
      attempts: 2,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' }
      ]
    },
    {
      id: '11',
      name: 'Olivia Johnson',
      initials: 'OJ',
      score: 87,
      timeSpent: '00:21:56',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 9, total: 11, mastery: 'mastery' }
      ]
    },
    {
      id: '12',
      name: 'Kevin Anderson',
      initials: 'KA',
      score: 63,
      timeSpent: '00:33:24',
      attempts: 2,
      status: 'Completed',
      mastery: 'Below Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 6, total: 11, mastery: 'below-mastery' },
        { name: 'Linear Equations', score: 6, total: 11, mastery: 'below-mastery' }
      ]
    },
    {
      id: '13',
      name: 'Sophia Lee',
      initials: 'SL',
      score: 93,
      timeSpent: '00:22:07',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 10, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 10, total: 11, mastery: 'mastery' }
      ]
    },
    {
      id: '14',
      name: 'Tyler Brown',
      initials: 'TB',
      score: 69,
      timeSpent: '00:30:45',
      attempts: 2,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 6, total: 11, mastery: 'below-mastery' }
      ]
    },
    {
      id: '15',
      name: 'Madison Taylor',
      initials: 'MT',
      score: 82,
      timeSpent: '00:25:33',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 8, total: 11, mastery: 'near-mastery' }
      ]
    },
    {
      id: '16',
      name: 'Jackson Wilson',
      initials: 'JWi',
      score: 74,
      timeSpent: '00:28:59',
      attempts: 1,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' }
      ]
    },
    {
      id: '17',
      name: 'Chloe Garcia',
      initials: 'CG',
      score: 55,
      timeSpent: '00:37:12',
      attempts: 3,
      status: 'Completed',
      mastery: 'Below Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 5, total: 11, mastery: 'below-mastery' },
        { name: 'Linear Equations', score: 5, total: 11, mastery: 'below-mastery' }
      ]
    },
    {
      id: '18',
      name: 'Nathan Miller',
      initials: 'NM',
      score: 88,
      timeSpent: '00:23:41',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 9, total: 11, mastery: 'mastery' }
      ]
    },
    {
      id: '19',
      name: 'Grace Thomas',
      initials: 'GT',
      score: 77,
      timeSpent: '00:26:28',
      attempts: 2,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' }
      ]
    },
    {
      id: '20',
      name: 'Ethan Moore',
      initials: 'EM',
      score: 96,
      timeSpent: '00:20:15',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 11, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 10, total: 11, mastery: 'mastery' }
      ]
    }
  ];

  const getMasteryBadge = (mastery: string) => {
    switch (mastery) {
      case 'mastery':
        return <Badge variant="outline" className="performance-mastery">Mastery</Badge>;
      case 'near-mastery':
        return <Badge variant="outline" className="performance-near-mastery">Near Mastery</Badge>;
      case 'below-mastery':
        return <Badge variant="outline" className="performance-below-mastery">Below Mastery</Badge>;
      default:
        return <Badge variant="outline" className="performance-not-assessed">Not Assessed</Badge>;
    }
  };

  const toggleStudent = (studentId: string) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const renderTableView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" aria-hidden="true" />
            <span>Student Performance Analysis</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Cards
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4 mr-2" />
              Table
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Time Spent</TableHead>
              <TableHead>Attempts</TableHead>
              <TableHead>Overall Mastery</TableHead>
              <TableHead>Algebraic Expressions</TableHead>
              <TableHead>Linear Equations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {student.initials}
                      </span>
                    </div>
                    <span className="font-medium">{student.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{student.score}%</span>
                </TableCell>
                <TableCell>{student.timeSpent}</TableCell>
                <TableCell>{student.attempts}</TableCell>
                <TableCell>
                  {getMasteryBadge(student.mastery.toLowerCase().replace(' ', '-'))}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{student.standards[0].score}/{student.standards[0].total}</span>
                    {getMasteryBadge(student.standards[0].mastery)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{student.standards[1].score}/{student.standards[1].total}</span>
                    {getMasteryBadge(student.standards[1].mastery)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderCardView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" aria-hidden="true" />
            <span>Student Performance Analysis</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Cards
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4 mr-2" />
              Table
            </Button>
          </div>
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
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {viewMode === 'table' ? renderTableView() : renderCardView()}
    </div>
  );
};

export default StudentAnalysis;
