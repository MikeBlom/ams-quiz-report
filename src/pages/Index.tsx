
import React from 'react';
import AssessmentOverview from '@/components/AssessmentOverview';

const Index = () => {
  console.log('Index page rendering');
  
  try {
    return <AssessmentOverview userRole="teacher" />;
  } catch (error) {
    console.error('Error in Index page:', error);
    return <div>Error loading assessment overview</div>;
  }
};

export default Index;
