
import React, { useState } from 'react';
import { View } from '@instructure/ui-view';
import { Text } from '@instructure/ui-text';
import { Heading } from '@instructure/ui-heading';
import { Button } from '@instructure/ui-buttons';
import { Flex } from '@instructure/ui-flex';
import { Grid } from '@instructure/ui-grid';
import { 
  IconUserLine, 
  IconBookLine, 
  IconTargetLine, 
  IconAnalyticsLine, 
  IconTrendUpwardLine, 
  IconClockLine,
  IconSettingsLine
} from '@instructure/ui-icons';
import AssessmentInsights from './AssessmentInsights';
import EnhancedWidgetCard from './EnhancedWidgetCard';

interface WidgetCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  value: string | number;
  subtitle: string;
  link: string;
  sparkline?: {
    values: number[];
    trend: 'up' | 'down';
    trendValue: number;
  };
  priority?: 'high' | 'medium' | 'low';
}

interface AssessmentOverviewProps {
  userRole?: 'teacher' | 'admin' | 'district';
}

const AssessmentOverview: React.FC<AssessmentOverviewProps> = ({ 
  userRole = 'teacher' 
}) => {
  const [widgets, setWidgets] = useState<WidgetCardProps[]>([
    {
      id: 'students',
      title: 'Student Performance',
      description: 'Individual student analysis and performance breakdown',
      icon: IconUserLine,
      value: '26/28',
      subtitle: 'Students Completed',
      link: '/assessment/students',
      sparkline: { 
        values: [65, 72, 78, 82, 89, 85, 78], 
        trend: 'up', 
        trendValue: 5 
      },
      priority: 'high'
    },
    {
      id: 'mastery',
      title: 'Mastery Distribution',
      description: 'Learning objectives mastery tracking across standards',
      icon: IconAnalyticsLine,
      value: '78%',
      subtitle: 'Average Mastery',
      link: '/assessment/mastery',
      sparkline: { 
        values: [68, 70, 75, 74, 78, 76, 78], 
        trend: 'up', 
        trendValue: 3 
      },
      priority: 'high'
    },
    {
      id: 'items',
      title: 'Item Analysis',
      description: 'Question-level statistics and distractor patterns',
      icon: IconBookLine,
      value: '12',
      subtitle: 'Total Items',
      link: '/assessment/items',
      sparkline: { 
        values: [85, 82, 78, 85, 88, 84, 82], 
        trend: 'down', 
        trendValue: 2 
      },
      priority: 'medium'
    },
    {
      id: 'standards',
      title: 'Standards Analysis',
      description: 'Learning standards performance and outcomes',
      icon: IconTargetLine,
      value: '4',
      subtitle: 'Standards Assessed',
      link: '/assessment/standards',
      sparkline: { 
        values: [72, 75, 78, 74, 79, 82, 78], 
        trend: 'up', 
        trendValue: 2 
      },
      priority: userRole === 'admin' ? 'high' : 'medium'
    }
  ]);

  const [isDragging, setIsDragging] = useState(false);

  // Mock assessment data
  const assessmentData = {
    title: "Unit 3: Algebraic Expressions Quiz",
    date: "March 15, 2024",
    totalStudents: 28,
    completed: 26,
    averageScore: 78,
    timeSpent: "00:24:36"
  };

  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    e.dataTransfer.setData('text/plain', widgetId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedIndex = widgets.findIndex(w => w.id === draggedId);
    
    if (draggedIndex !== -1 && draggedIndex !== dropIndex) {
      const newWidgets = [...widgets];
      const [draggedWidget] = newWidgets.splice(draggedIndex, 1);
      newWidgets.splice(dropIndex, 0, draggedWidget);
      setWidgets(newWidgets);
    }
    setIsDragging(false);
  };

  return (
    <View as="div" minHeight="100vh" background="secondary">
      {/* Header */}
      <View
        as="header"
        background="primary"
        borderWidth="0 0 small 0"
        padding="medium"
      >
        <View maxWidth="1200px" margin="0 auto">
          <Flex direction="row" justifyItems="space-between" alignItems="center">
            <Flex.Item shouldGrow>
              <Heading level="h1" margin="0 0 xx-small 0">
                Assessment Overview
              </Heading>
              <Text color="secondary">
                {assessmentData.title} • {assessmentData.date}
              </Text>
            </Flex.Item>
            <Flex.Item>
              <Button
                color="secondary"
                size="small"
                renderIcon={IconSettingsLine}
              >
                Customize
              </Button>
            </Flex.Item>
          </Flex>
        </View>
      </View>

      <View maxWidth="1200px" margin="0 auto" padding="large">
        {/* Insights Section - Now at the top */}
        <AssessmentInsights userRole={userRole} />

        {/* Quick Stats */}
        <View as="section" margin="0 0 large 0">
          <Grid>
            <Grid.Row>
              <Grid.Col width={3}>
                <View
                  as="div"
                  borderWidth="small"
                  borderRadius="medium"
                  padding="medium"
                  background="primary"
                  textAlign="center"
                >
                  <Flex direction="row" alignItems="center" justifyItems="center">
                    <Flex.Item margin="0 small 0 0">
                      <IconUserLine color="brand" />
                    </Flex.Item>
                    <Flex.Item>
                      <Text size="large" weight="bold" color="brand">
                        {assessmentData.completed}
                      </Text>
                      <View as="div">
                        <Text size="small" color="secondary">
                          Completed
                        </Text>
                      </View>
                    </Flex.Item>
                  </Flex>
                </View>
              </Grid.Col>
              
              <Grid.Col width={3}>
                <View
                  as="div"
                  borderWidth="small"
                  borderRadius="medium"
                  padding="medium"
                  background="primary"
                  textAlign="center"
                >
                  <Flex direction="row" alignItems="center" justifyItems="center">
                    <Flex.Item margin="0 small 0 0">
                      <IconTargetLine color="brand" />
                    </Flex.Item>
                    <Flex.Item>
                      <Text size="large" weight="bold" color="brand">
                        {assessmentData.averageScore}%
                      </Text>
                      <View as="div">
                        <Text size="small" color="secondary">
                          Avg Score
                        </Text>
                      </View>
                    </Flex.Item>
                  </Flex>
                </View>
              </Grid.Col>

              <Grid.Col width={3}>
                <View
                  as="div"
                  borderWidth="small"
                  borderRadius="medium"
                  padding="medium"
                  background="primary"
                  textAlign="center"
                >
                  <Flex direction="row" alignItems="center" justifyItems="center">
                    <Flex.Item margin="0 small 0 0">
                      <IconClockLine color="brand" />
                    </Flex.Item>
                    <Flex.Item>
                      <Text size="large" weight="bold" color="brand">
                        {assessmentData.timeSpent}
                      </Text>
                      <View as="div">
                        <Text size="small" color="secondary">
                          Avg Time
                        </Text>
                      </View>
                    </Flex.Item>
                  </Flex>
                </View>
              </Grid.Col>

              <Grid.Col width={3}>
                <View
                  as="div"
                  borderWidth="small"
                  borderRadius="medium"
                  padding="medium"
                  background="primary"
                  textAlign="center"
                >
                  <Flex direction="row" alignItems="center" justifyItems="center">
                    <Flex.Item margin="0 small 0 0">
                      <IconBookLine color="brand" />
                    </Flex.Item>
                    <Flex.Item>
                      <Text size="large" weight="bold" color="brand">
                        12
                      </Text>
                      <View as="div">
                        <Text size="small" color="secondary">
                          Total Items
                        </Text>
                      </View>
                    </Flex.Item>
                  </Flex>
                </View>
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </View>

        {/* Analysis Widgets */}
        <View as="section">
          <Flex direction="row" justifyItems="space-between" alignItems="center" margin="0 0 medium 0">
            <Flex.Item>
              <Heading level="h2">
                Analysis Modules
              </Heading>
            </Flex.Item>
            <Flex.Item>
              <Text size="small" color="secondary">
                Drag to reorder • Click to explore
              </Text>
            </Flex.Item>
          </Flex>
          
          <Grid>
            <Grid.Row>
              {widgets.map((widget, index) => (
                <Grid.Col key={widget.id} width={6}>
                  <View margin="0 0 medium 0">
                    <EnhancedWidgetCard
                      {...widget}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  </View>
                </Grid.Col>
              ))}
            </Grid.Row>
          </Grid>
        </View>
      </View>
    </View>
  );
};

export default AssessmentOverview;
