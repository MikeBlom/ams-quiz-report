
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import StudentAnalysis from '@/components/StudentAnalysis';

const StudentAnalysisPage = () => {
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
                      <BreadcrumbPage>Student Analysis</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-2xl font-bold text-foreground">
                  Student Performance Analysis
                </h1>
                <p className="text-muted-foreground">
                  Individual student performance and detailed breakdowns
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StudentAnalysis />
      </div>
    </div>
  );
};

export default StudentAnalysisPage;
