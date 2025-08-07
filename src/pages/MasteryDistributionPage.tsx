
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ArrowLeft, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const MasteryDistributionPage = () => {
  const [selectedDrillDown, setSelectedDrillDown] = useState<{
    type: 'overall' | 'standard';
    masteryLevel: 'Mastery' | 'Near Mastery' | 'Below Mastery';
    standard?: string;
    students: string[];
  } | null>(null);

  // Student data with mastery levels
  const studentData = [
    { name: 'Bruce Jones', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Near Mastery', 'Graphing Functions': 'Mastery', 'Systems of Equations': 'Mastery' } },
    { name: 'Emily Boone', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Mastery', 'Systems of Equations': 'Mastery' } },
    { name: 'Alex Thompson', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Near Mastery', 'Systems of Equations': 'Mastery' } },
    { name: 'Emma Davis', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Mastery', 'Systems of Equations': 'Mastery' } },
    { name: 'Olivia Johnson', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Nathan Miller', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Mastery', 'Systems of Equations': 'Mastery' } },
    { name: 'Sophia Lee', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Mastery', 'Systems of Equations': 'Mastery' } },
    { name: 'Madison Taylor', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Near Mastery', 'Graphing Functions': 'Mastery', 'Systems of Equations': 'Mastery' } },
    { name: 'Michael Rodriguez', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Near Mastery', 'Graphing Functions': 'Near Mastery', 'Systems of Equations': 'Mastery' } },
    { name: 'Ethan Moore', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Mastery', 'Systems of Equations': 'Mastery' } },
    { name: 'Sarah Chen', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Near Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Ryan Martinez', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Near Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Near Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Jackson Wilson', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Near Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Near Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Grace Thomas', overallMastery: 'Mastery', standardMastery: { 'Algebraic Expressions': 'Near Mastery', 'Linear Equations': 'Mastery', 'Graphing Functions': 'Near Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Nora Sanderson', overallMastery: 'Near Mastery', standardMastery: { 'Algebraic Expressions': 'Below Mastery', 'Linear Equations': 'Near Mastery', 'Graphing Functions': 'Near Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Jessica Williams', overallMastery: 'Near Mastery', standardMastery: { 'Algebraic Expressions': 'Near Mastery', 'Linear Equations': 'Near Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Tyler Brown', overallMastery: 'Near Mastery', standardMastery: { 'Algebraic Expressions': 'Near Mastery', 'Linear Equations': 'Below Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Kevin Anderson', overallMastery: 'Near Mastery', standardMastery: { 'Algebraic Expressions': 'Below Mastery', 'Linear Equations': 'Below Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'David Kim', overallMastery: 'Near Mastery', standardMastery: { 'Algebraic Expressions': 'Below Mastery', 'Linear Equations': 'Below Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Chloe Garcia', overallMastery: 'Near Mastery', standardMastery: { 'Algebraic Expressions': 'Below Mastery', 'Linear Equations': 'Below Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Near Mastery' } },
    { name: 'Isabella Wright', overallMastery: 'Near Mastery', standardMastery: { 'Algebraic Expressions': 'Near Mastery', 'Linear Equations': 'Near Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Below Mastery' } },
    { name: 'Lucas Johnson', overallMastery: 'Near Mastery', standardMastery: { 'Algebraic Expressions': 'Near Mastery', 'Linear Equations': 'Near Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Below Mastery' } },
    { name: 'Mia Thompson', overallMastery: 'Below Mastery', standardMastery: { 'Algebraic Expressions': 'Below Mastery', 'Linear Equations': 'Below Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Below Mastery' } },
    { name: 'Noah Davis', overallMastery: 'Below Mastery', standardMastery: { 'Algebraic Expressions': 'Below Mastery', 'Linear Equations': 'Below Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Below Mastery' } },
    { name: 'Ava Martinez', overallMastery: 'Below Mastery', standardMastery: { 'Algebraic Expressions': 'Below Mastery', 'Linear Equations': 'Below Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Below Mastery' } },
    { name: 'Liam Wilson', overallMastery: 'Below Mastery', standardMastery: { 'Algebraic Expressions': 'Below Mastery', 'Linear Equations': 'Below Mastery', 'Graphing Functions': 'Below Mastery', 'Systems of Equations': 'Below Mastery' } },
  ];

  const getStudentsByMastery = (masteryLevel: 'Mastery' | 'Near Mastery' | 'Below Mastery') => {
    return studentData.filter(student => student.overallMastery === masteryLevel).map(student => student.name);
  };

  const getStudentsByStandardMastery = (standard: string, masteryLevel: 'Mastery' | 'Near Mastery' | 'Below Mastery') => {
    return studentData.filter(student => student.standardMastery[standard] === masteryLevel).map(student => student.name);
  };

  const handleOverallMasteryClick = (masteryLevel: 'Mastery' | 'Near Mastery' | 'Below Mastery') => {
    const students = getStudentsByMastery(masteryLevel);
    setSelectedDrillDown({
      type: 'overall',
      masteryLevel,
      students
    });
  };

  const handleStandardMasteryClick = (standard: string, masteryLevel: 'Mastery' | 'Near Mastery' | 'Below Mastery') => {
    const students = getStudentsByStandardMastery(standard, masteryLevel);
    setSelectedDrillDown({
      type: 'standard',
      masteryLevel,
      standard,
      students
    });
  };

  const getMasteryBadge = (mastery: string) => {
    switch (mastery) {
      case 'Mastery':
        return <Badge variant="outline" className="performance-mastery">Mastery</Badge>;
      case 'Near Mastery':
        return <Badge variant="outline" className="performance-near-mastery">Near Mastery</Badge>;
      case 'Below Mastery':
        return <Badge variant="outline" className="performance-below-mastery">Below Mastery</Badge>;
      default:
        return <Badge variant="outline" className="performance-not-assessed">Not Assessed</Badge>;
    }
  };

  // Mock mastery data
  const masteryData = [
    { name: 'Mastery', value: 14, color: 'hsl(142, 76%, 36%)', percentage: 54 },
    { name: 'Near Mastery', value: 8, color: 'hsl(40, 89%, 60%)', percentage: 31 },
    { name: 'Below Mastery', value: 4, color: 'hsl(0, 75%, 60%)', percentage: 15 },
  ];

  const standardsMastery = [
    { standard: 'Algebraic Expressions', mastery: 18, nearMastery: 6, belowMastery: 2 },
    { standard: 'Linear Equations', mastery: 22, nearMastery: 3, belowMastery: 1 },
    { standard: 'Graphing Functions', mastery: 12, nearMastery: 8, belowMastery: 6 },
    { standard: 'Systems of Equations', mastery: 15, nearMastery: 8, belowMastery: 3 }
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header with Breadcrumbs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/">Assessment Overview</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Mastery Distribution</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-2xl font-bold text-foreground">
                  Mastery Distribution Analysis
                </h1>
                <p className="text-muted-foreground">
                  Learning objectives mastery tracking across standards and students
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Overview
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Overall Mastery Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Mastery Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">Click on any pie slice to see student names</p>
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
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    onClick={(data) => handleOverallMasteryClick(data.name as 'Mastery' | 'Near Mastery' | 'Below Mastery')}
                    style={{ cursor: 'pointer' }}
                  >
                    {masteryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        onClick={() => handleOverallMasteryClick(entry.name as 'Mastery' | 'Near Mastery' | 'Below Mastery')}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mastery Levels Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {masteryData.map((level) => (
                <div 
                  key={level.name} 
                  className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleOverallMasteryClick(level.name as 'Mastery' | 'Near Mastery' | 'Below Mastery')}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: level.color }}
                    />
                    <div>
                      <p className="font-medium text-foreground">{level.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {level.value} students - Click to view names
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{level.percentage}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Standards Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Mastery by Learning Standard</CardTitle>
            <p className="text-sm text-muted-foreground">Click on any bar section to see student names</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={standardsMastery}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="standard" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="mastery" 
                  stackId="a" 
                  fill="hsl(142, 76%, 36%)" 
                  name="Mastery"
                  onClick={(data) => handleStandardMasteryClick(data.standard, 'Mastery')}
                  style={{ cursor: 'pointer' }}
                />
                <Bar 
                  dataKey="nearMastery" 
                  stackId="a" 
                  fill="hsl(40, 89%, 60%)" 
                  name="Near Mastery"
                  onClick={(data) => handleStandardMasteryClick(data.standard, 'Near Mastery')}
                  style={{ cursor: 'pointer' }}
                />
                <Bar 
                  dataKey="belowMastery" 
                  stackId="a" 
                  fill="hsl(0, 75%, 60%)" 
                  name="Below Mastery"
                  onClick={(data) => handleStandardMasteryClick(data.standard, 'Below Mastery')}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Standards Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Standards Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {standardsMastery.map((standard, index) => {
                const total = standard.mastery + standard.nearMastery + standard.belowMastery;
                const masteryPercentage = Math.round((standard.mastery / total) * 100);
                
                return (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{standard.standard}</h3>
                      <span className="text-lg font-semibold text-primary">{masteryPercentage}% Mastery</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div 
                        className="p-2 bg-success/10 rounded-lg cursor-pointer hover:bg-success/20 transition-colors"
                        onClick={() => handleStandardMasteryClick(standard.standard, 'Mastery')}
                      >
                        <p className="font-semibold text-success">{standard.mastery}</p>
                        <p className="text-success">Mastery</p>
                        <p className="text-xs text-muted-foreground">Click to view students</p>
                      </div>
                      <div 
                        className="p-2 bg-warning/10 rounded-lg cursor-pointer hover:bg-warning/20 transition-colors"
                        onClick={() => handleStandardMasteryClick(standard.standard, 'Near Mastery')}
                      >
                        <p className="font-semibold text-warning">{standard.nearMastery}</p>
                        <p className="text-warning">Near Mastery</p>
                        <p className="text-xs text-muted-foreground">Click to view students</p>
                      </div>
                      <div 
                        className="p-2 bg-destructive/10 rounded-lg cursor-pointer hover:bg-destructive/20 transition-colors"
                        onClick={() => handleStandardMasteryClick(standard.standard, 'Below Mastery')}
                      >
                        <p className="font-semibold text-destructive">{standard.belowMastery}</p>
                        <p className="text-destructive">Below Mastery</p>
                        <p className="text-xs text-muted-foreground">Click to view students</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-success cursor-pointer" 
                          style={{ width: `${(standard.mastery / total) * 100}%` }}
                          onClick={() => handleStandardMasteryClick(standard.standard, 'Mastery')}
                        />
                        <div 
                          className="bg-warning cursor-pointer" 
                          style={{ width: `${(standard.nearMastery / total) * 100}%` }}
                          onClick={() => handleStandardMasteryClick(standard.standard, 'Near Mastery')}
                        />
                        <div 
                          className="bg-destructive cursor-pointer" 
                          style={{ width: `${(standard.belowMastery / total) * 100}%` }}
                          onClick={() => handleStandardMasteryClick(standard.standard, 'Below Mastery')}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Student Drill-Down Modal */}
        <Dialog open={!!selectedDrillDown} onOpenChange={() => setSelectedDrillDown(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>
                  {selectedDrillDown?.type === 'overall' 
                    ? `Students with ${selectedDrillDown.masteryLevel}` 
                    : `${selectedDrillDown?.standard} - ${selectedDrillDown?.masteryLevel}`
                  }
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedDrillDown(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {selectedDrillDown && getMasteryBadge(selectedDrillDown.masteryLevel)}
                  <span className="text-sm text-muted-foreground">
                    {selectedDrillDown?.students.length} students
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedDrillDown?.students.map((studentName, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {studentName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{studentName}</span>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MasteryDistributionPage;
