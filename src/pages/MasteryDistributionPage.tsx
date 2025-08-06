
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const MasteryDistributionPage = () => {
  // Mock mastery data
  const masteryData = [
    { name: 'Mastery', value: 14, color: 'hsl(142, 76%, 36%)', percentage: 54 },
    { name: 'Near Mastery', value: 8, color: 'hsl(38, 92%, 50%)', percentage: 31 },
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

          <Card>
            <CardHeader>
              <CardTitle>Mastery Levels Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {masteryData.map((level) => (
                <div key={level.name} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: level.color }}
                    />
                    <div>
                      <p className="font-medium text-foreground">{level.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {level.value} students
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
                <Bar dataKey="mastery" stackId="a" fill="hsl(142, 76%, 36%)" name="Mastery" />
                <Bar dataKey="nearMastery" stackId="a" fill="hsl(38, 92%, 50%)" name="Near Mastery" />
                <Bar dataKey="belowMastery" stackId="a" fill="hsl(0, 75%, 60%)" name="Below Mastery" />
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
                      <div className="p-2 bg-green-50 rounded-lg">
                        <p className="font-semibold text-green-800">{standard.mastery}</p>
                        <p className="text-green-600">Mastery</p>
                      </div>
                      <div className="p-2 bg-yellow-50 rounded-lg">
                        <p className="font-semibold text-yellow-800">{standard.nearMastery}</p>
                        <p className="text-yellow-600">Near Mastery</p>
                      </div>
                      <div className="p-2 bg-red-50 rounded-lg">
                        <p className="font-semibold text-red-800">{standard.belowMastery}</p>
                        <p className="text-red-600">Below Mastery</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${(standard.mastery / total) * 100}%` }}
                        />
                        <div 
                          className="bg-yellow-500" 
                          style={{ width: `${(standard.nearMastery / total) * 100}%` }}
                        />
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${(standard.belowMastery / total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasteryDistributionPage;
