
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
    <View as="div">
      <Heading level="h2" margin="0 0 medium 0">
        Assessment Insights & Recommendations
      </Heading>
      <View as="div" margin="0 0 medium 0">
        <Text size="small" color="secondary">
          AI-powered insights to guide your next instructional steps
        </Text>
      </View>
      
      <View as="div">
        {insights.map((insight, index) => (
          <View key={index} as="div" margin="0 0 medium 0">
            <Flex direction="row" alignItems="start">
              <Flex.Item margin="0 small 0 0">
                <View
                  as="div"
                  background={insight.type === 'success' ? 'success' : 
                             insight.type === 'warning' ? 'warning' : 'brand'}
                  borderRadius="circle"
                  padding="x-small"
                  display="inline-block"
                >
                  <insight.actionIcon size="x-small" color="primary-inverse" />
                </View>
              </Flex.Item>
              <Flex.Item shouldGrow>
                <View as="div" margin="0 0 x-small 0">
                  <Text weight="bold">
                    {insight.title}
                  </Text>
                </View>
                <View as="div" margin="0 0 x-small 0">
                  <Text size="small" color="secondary">
                    {insight.description}
                  </Text>
                </View>
                <Text size="small" color="brand" weight="bold">
                  Recommended: {insight.action}
                </Text>
              </Flex.Item>
            </Flex>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AssessmentInsights;
