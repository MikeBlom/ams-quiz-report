
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Filter, Users, Target, BookOpen, TrendingUp, ChevronRight } from 'lucide-react';
import MetricsOverview from './MetricsOverview';
import StudentAnalysis from './StudentAnalysis';
import ItemAnalysis from './ItemAnalysis';
import StandardsAnalysis from './StandardsAnalysis';
import ExportDialog from './ExportDialog';
import FilterPanel from './FilterPanel';

const AssessmentDashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Refs for scrolling to sections
  const overviewRef = useRef<HTMLDivElement>(null);
  const studentsRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const assessmentData = {
    title: "Unit 3: Algebraic Expressions Quiz",
    date: "March 15, 2024",
    totalStudents: 28,
    completed: 26,
    averageScore: 78,
    timeSpent: "00:24:36"
  };

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: TrendingUp,
      ref: overviewRef,
      description: 'Performance metrics and key insights'
    },
    {
      id: 'students',
      title: 'Student Analysis',
      icon: Users,
      ref: studentsRef,
      description: 'Individual student performance breakdown'
    },
    {
      id: 'items',
      title: 'Item Analysis',
      icon: BookOpen,
      ref: itemsRef,
      description: 'Question-level performance and statistics'
    },
    {
      id: 'standards',
      title: 'Standards Analysis',
      icon: Target,
      ref: standardsRef,
      description: 'Learning standards mastery tracking'
    }
  ];

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>, sectionId: string) => {
    setActiveSection(sectionId);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach((section) => {
      const element = section.ref.current;
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
        }
      }
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 py-8">
        {/* Sidebar Navigation */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-32">
            <Card className="p-4">
              <h2 className="font-semibold text-foreground mb-4">Report Sections</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.ref, section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{section.title}</p>
                          <p className={`text-xs truncate mt-1 ${
                            activeSection === section.id 
                              ? 'text-primary-foreground/70' 
                              : 'text-muted-foreground'
                          }`}>
                            {section.description}
                          </p>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${
                          activeSection === section.id ? 'rotate-90' : 'group-hover:translate-x-1'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-12">
          {/* Overview Section */}
          <section ref={overviewRef} id="overview" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
                <span>Performance Overview</span>
              </h2>
              <p className="text-muted-foreground mt-1">
                High-level metrics and performance trends across the assessment
              </p>
            </div>
            <MetricsOverview data={assessmentData} />
          </section>

          {/* Student Analysis Section */}
          <section ref={studentsRef} id="students" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                <Users className="h-5 w-5" aria-hidden="true" />
                <span>Student Analysis</span>
              </h2>
              <p className="text-muted-foreground mt-1">
                Individual student performance and detailed breakdowns
              </p>
            </div>
            <StudentAnalysis />
          </section>

          {/* Item Analysis Section */}
          <section ref={itemsRef} id="items" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                <span>Item Analysis</span>
              </h2>
              <p className="text-muted-foreground mt-1">
                Question-level statistics, difficulty analysis, and distractor patterns
              </p>
            </div>
            <ItemAnalysis />
          </section>

          {/* Standards Analysis Section */}
          <section ref={standardsRef} id="standards" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                <Target className="h-5 w-5" aria-hidden="true" />
                <span>Standards Analysis</span>
              </h2>
              <p className="text-muted-foreground mt-1">
                Learning standards mastery tracking and outcome analysis
              </p>
            </div>
            <StandardsAnalysis />
          </section>
        </div>
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
