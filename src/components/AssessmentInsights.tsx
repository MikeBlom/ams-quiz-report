
import React from 'react';
import { View } from '@instructure/ui-view';
import { Text } from '@instructure/ui-text';
import { Heading } from '@instructure/ui-heading';
import { Button } from '@instructure/ui-buttons';
import { Alert } from '@instructure/ui-alerts';
import { Flex } from '@instructure/ui-flex';
import { Grid } from '@instructure/ui-grid';
import { IconUserLine, IconSettingsLine, IconWarningLine, IconStarLine } from '@instructure/ui-icons';

interface AssessmentInsightsProps {
  userRole?: 'teacher' | 'admin' | 'district';
  maxDisplayed?: number; // Control how many insights to show initially
}

const AssessmentInsights: React.FC<AssessmentInsightsProps> = ({ 
  userRole = 'teacher',
  maxDisplayed = 6 // Default to 6 insights max for good 3-column layout
}) => {
  // Extended insights array to demonstrate scalability
  const allInsights = [
    {
      type: 'success',
      title: 'Strong Performance in Linear Equations',
      description: '22 of 26 students demonstrated mastery (85% class average)',
      action: 'Assign enrichment activities',
      actionIcon: IconStarLine,
      priority: 'high'
    },
    {
      type: 'warning',
      title: 'Struggle with Graphing Functions',
      description: '6 students scored below 60% on this standard',
      action: 'Assign remediation',
      actionIcon: IconUserLine,
      priority: 'high'
    },
    {
      type: 'info',
      title: 'Item Analysis Needed',
      description: 'Question 7 shows unusual distractor patterns',
      action: 'Flag for review',
      actionIcon: IconWarningLine,
      priority: 'medium'
    },
    {
      type: 'warning',
      title: 'Low Engagement on Problem Solving',
      description: 'High skip rate (18%) on multi-step word problems',
      action: 'Provide scaffolding',
      actionIcon: IconSettingsLine,
      priority: 'medium'
    },
    {
      type: 'success',
      title: 'Improved Time Management',
      description: 'Average completion time decreased by 12%',
      action: 'Continue approach',
      actionIcon: IconStarLine,
      priority: 'low'
    },
    {
      type: 'info',
      title: 'Standards Alignment Check',
      description: 'Review coverage of polynomial operations',
      action: 'Plan next unit',
      actionIcon: IconWarningLine,
      priority: 'medium'
    },
    {
      type: 'warning',
      title: 'Differentiation Needed',
      description: 'Wide performance gap between top and bottom quartiles',
      action: 'Create tiered assignments',
      actionIcon: IconUserLine,
      priority: 'high'
    }
  ];

  // Limit insights to maxDisplayed and sort by priority
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  const displayedInsights = allInsights
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    .slice(0, maxDisplayed);
  
  const remainingCount = allInsights.length - displayedInsights.length;

  const handleAction = (actionType: string, insightTitle: string) => {
    console.log(`Taking action: ${actionType} for insight: ${insightTitle}`);
    // This would integrate with the actual system actions
  };

  return (
    <View as="div">
      <Heading level="h2" margin="0 0 medium 0">
        Assessment Insights & Recommendations
      </Heading>
      <View as="div" margin="0 0 medium 0">
        <Text size="small" color="secondary">
          AI-powered insights to guide your next instructional steps
        </Text>
      </View>
      
      {/* Dynamic Grid Layout based on number of insights */}
      <Grid>
        {displayedInsights.length <= 2 ? (
          // For 1-2 insights: use single row
          <Grid.Row>
            {displayedInsights.map((insight, index) => (
              <Grid.Col key={index} width={displayedInsights.length === 1 ? 12 : 6}>
                <InsightCard insight={insight} onAction={handleAction} />
              </Grid.Col>
            ))}
          </Grid.Row>
        ) : (
          // For 3+ insights: use multi-row 3-column layout
          <>
            {Array.from({ length: Math.ceil(displayedInsights.length / 3) }, (_, rowIndex) => (
              <Grid.Row key={rowIndex}>
                {displayedInsights.slice(rowIndex * 3, (rowIndex + 1) * 3).map((insight, colIndex) => (
                  <Grid.Col key={colIndex} width={4}>
                    <InsightCard insight={insight} onAction={handleAction} />
                  </Grid.Col>
                ))}
              </Grid.Row>
            ))}
          </>
        )}
      </Grid>

      {/* Show remaining insights indicator */}
      {remainingCount > 0 && (
        <View as="div" margin="medium 0 0 0" textAlign="center">
          <Text size="small" color="secondary">
            + {remainingCount} more insight{remainingCount !== 1 ? 's' : ''} available
          </Text>
          <View as="div" margin="x-small 0 0 0">
            <Button size="small" color="secondary">
              View all insights
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

// Individual Insight Card Component for better reusability
interface InsightCardProps {
  insight: {
    type: string;
    title: string;
    description: string;
    action: string;
    actionIcon: React.ComponentType<any>;
    priority: string;
  };
  onAction: (actionType: string, insightTitle: string) => void;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, onAction }) => {
  return (
    <View 
      as="div" 
      margin="0 0 medium 0" 
      padding="medium" 
      background="primary" 
      borderRadius="medium" 
      borderWidth="small"
      height="100%" // Ensure equal height cards
    >
      <Flex direction="row" justifyItems="space-between" alignItems="start" height="100%">
        <Flex.Item shouldGrow>
          <Flex direction="row" alignItems="start">
            <Flex.Item margin="0 medium 0 0">
              <View
                as="div"
                borderColor={insight.type === 'success' ? 'success' : 
                           insight.type === 'warning' ? 'warning' : 'brand'}
                borderWidth="medium"
                borderRadius="circle"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%'
                }}
              >
                <insight.actionIcon 
                  size="small" 
                  color={insight.type === 'success' ? 'success' : 
                         insight.type === 'warning' ? 'warning' : 'brand'} 
                />
              </View>
            </Flex.Item>
            <Flex.Item shouldGrow>
              <View as="div" margin="0 0 x-small 0">
                <Text weight="bold">
                  {insight.title}
                </Text>
              </View>
              <View as="div" margin="0 0 medium 0">
                <Text size="small" color="secondary">
                  {insight.description}
                </Text>
              </View>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Button
            size="small"
            color="primary"
            onClick={() => onAction(insight.action, insight.title)}
          >
            {insight.action}
          </Button>
        </Flex.Item>
      </Flex>
    </View>
  );
};

export default AssessmentInsights;
