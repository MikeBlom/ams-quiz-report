
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, Users, Target, BookOpen, TrendingUp } from 'lucide-react';
import MetricsOverview from './MetricsOverview';
import StudentAnalysis from './StudentAnalysis';
import ItemAnalysis from './ItemAnalysis';
import StandardsAnalysis from './StandardsAnalysis';
import ExportDialog from './ExportDialog';
import FilterPanel from './FilterPanel';

const AssessmentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // Mock data for demonstration
  const assessmentData = {
    title: "Unit 3: Algebraic Expressions Quiz",
    date: "March 15, 2024",
    totalStudents: 28,
    completed: 26,
    averageScore: 78,
    timeSpent: "00:24:36"
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Assessment Reports
                </h1>
                <p className="text-muted-foreground mt-1">
                  {assessmentData.title} • {assessmentData.date}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  className="filter-button"
                  aria-label="Open filters panel"
                >
                  <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                  Filters
                </Button>
                <Button
                  onClick={() => setShowExport(true)}
                  className="export-button"
                  aria-label="Export report data"
                >
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger 
              value="overview"
              className="flex items-center space-x-2"
              aria-label="Overview tab"
            >
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="students"
              className="flex items-center space-x-2"
              aria-label="Student Analysis tab"
            >
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger 
              value="items"
              className="flex items-center space-x-2"
              aria-label="Item Analysis tab"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Items</span>
            </TabsTrigger>
            <TabsTrigger 
              value="standards"
              className="flex items-center space-x-2"
              aria-label="Standards Analysis tab"
            >
              <Target className="h-4 w-4" aria-hidden="true" />
              <span>Standards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <MetricsOverview data={assessmentData} />
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <StudentAnalysis />
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <ItemAnalysis />
          </TabsContent>

          <TabsContent value="standards" className="space-y-6">
            <StandardsAnalysis />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <FilterPanel 
        open={showFilters} 
        onOpenChange={setShowFilters}
      />
      <ExportDialog 
        open={showExport} 
        onOpenChange={setShowExport}
      />
    </div>
  );
};

export default AssessmentDashboard;
