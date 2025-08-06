
import React from 'react';
import { View } from '@instructure/ui-view';
import { Text } from '@instructure/ui-text';
import { Heading } from '@instructure/ui-heading';
import { Button } from '@instructure/ui-buttons';
import { Alert } from '@instructure/ui-alerts';
import { Flex } from '@instructure/ui-flex';
import { IconUserLine, IconSettingsLine, IconWarningLine, IconStarLine } from '@instructure/ui-icons';

interface AssessmentInsightsProps {
  userRole?: 'teacher' | 'admin' | 'district';
}

const AssessmentInsights: React.FC<AssessmentInsightsProps> = ({ 
  userRole = 'teacher' 
}) => {
  const insights = [
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
    }
  ];

  const handleAction = (actionType: string, insightTitle: string) => {
    console.log(`Taking action: ${actionType} for insight: ${insightTitle}`);
    // This would integrate with the actual system actions
  };

  return (
    <View as="section" margin="0 0 large 0">
      <View as="div" margin="0 0 medium 0">
        <Heading level="h2" margin="0 0 small 0">
          Assessment Insights
        </Heading>
        <Text size="small" color="secondary">
          AI-powered analysis of your assessment results
        </Text>
      </View>

      <View as="div">
        {insights.map((insight, index) => (
          <Alert
            key={index}
            variant={insight.type as 'success' | 'warning' | 'info'}
            margin="0 0 small 0"
            renderCloseButtonLabel="Close"
            onDismiss={() => console.log(`Dismissed insight: ${insight.title}`)}
          >
            <Flex direction="row" justifyItems="space-between" alignItems="start">
              <Flex.Item shouldGrow>
                <View as="div">
                  <Text weight="bold" size="medium">
                    {insight.title}
                  </Text>
                  <View as="div" margin="xx-small 0 0 0">
                    <Text size="small">
                      {insight.description}
                    </Text>
                  </View>
                </View>
              </Flex.Item>
              <Flex.Item>
                <Button
                  size="small"
                  color="primary"
                  renderIcon={insight.actionIcon}
                  onClick={() => handleAction(insight.action, insight.title)}
                  margin="0 0 0 small"
                >
                  {insight.action}
                </Button>
              </Flex.Item>
            </Flex>
          </Alert>
        ))}
      </View>
    </View>
  );
};

export default AssessmentInsights;
