import React from 'react';
import { View } from '@instructure/ui-view';
import { Text } from '@instructure/ui-text';
import { Heading } from '@instructure/ui-heading';
import { Alert } from '@instructure/ui-alerts';
import { Flex } from '@instructure/ui-flex';
import { Grid } from '@instructure/ui-grid';
import { 
  IconWarningLine, 
  IconInfoLine, 
  IconCheckMarkLine,
  IconAnalyticsLine,
  IconClockLine,
  IconTargetLine
} from '@instructure/ui-icons';

interface ItemAnalysisData {
  id: number;
  question: string;
  standard: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  correctRate: number;
  discrimination: number;
  pValue: number;
  skipRate: number;
  timeSpent: number;
  flagged: boolean;
  trend: 'up' | 'down' | 'stable';
  distractorAnalysis: {
    option: string;
    text: string;
    selected: number;
    isCorrect: boolean;
  }[];
  insights: string[];
}

interface ItemAnalysisInsightsProps {
  data: ItemAnalysisData[];
  userRole?: 'teacher' | 'admin' | 'district';
}

const ItemAnalysisInsights: React.FC<ItemAnalysisInsightsProps> = ({ 
  data, 
  userRole = 'teacher' 
}) => {
  // Calculate key metrics
  const totalQuestions = data.length;
  const averageCorrectRate = data.reduce((sum, item) => sum + item.correctRate, 0) / totalQuestions;
  const lowPerformingQuestions = data.filter(item => item.correctRate < 60);
  const highSkipRateQuestions = data.filter(item => item.skipRate > 15);
  const flaggedQuestions = data.filter(item => item.flagged);
  const poorDiscriminationQuestions = data.filter(item => item.discrimination < 0.3);
  
  // Trending data
  const decliningQuestions = data.filter(item => item.trend === 'down');
  const improvingQuestions = data.filter(item => item.trend === 'up');
  
  // Standard analysis
  const standardsPerformance = data.reduce((acc, item) => {
    if (!acc[item.standard]) {
      acc[item.standard] = { total: 0, sum: 0, questions: [] };
    }
    acc[item.standard].total += 1;
    acc[item.standard].sum += item.correctRate;
    acc[item.standard].questions.push(item);
    return acc;
  }, {} as Record<string, { total: number; sum: number; questions: ItemAnalysisData[] }>);

  const strugglingStandards = Object.entries(standardsPerformance)
    .filter(([_, stats]) => (stats.sum / stats.total) < 65)
    .map(([standard, stats]) => ({
      standard,
      averageRate: Math.round(stats.sum / stats.total),
      questionCount: stats.total
    }));

  const insights = [
    // Critical Issues
    ...(lowPerformingQuestions.length > 0 ? [{
      type: 'error' as const,
      title: `${lowPerformingQuestions.length} Low-Performing Questions`,
      description: `Questions ${lowPerformingQuestions.map(q => q.id).join(', ')} have correct rates below 60%. Consider reviewing content coverage or question clarity.`,
      action: 'Review Questions',
      icon: IconWarningLine
    }] : []),

    ...(highSkipRateQuestions.length > 0 ? [{
      type: 'warning' as const,
      title: `${highSkipRateQuestions.length} Questions with High Skip Rates`,
      description: `Questions ${highSkipRateQuestions.map(q => q.id).join(', ')} have skip rates above 15%. Students may find these confusing or too time-consuming.`,
      action: 'Analyze Complexity',
      icon: IconClockLine
    }] : []),

    ...(poorDiscriminationQuestions.length > 0 ? [{
      type: 'warning' as const,
      title: `${poorDiscriminationQuestions.length} Questions with Poor Discrimination`,
      description: `Questions ${poorDiscriminationQuestions.map(q => q.id).join(', ')} don't effectively distinguish between high and low performers.`,
      action: 'Review Item Quality',
      icon: IconTargetLine
    }] : []),

    // Trends
    ...(decliningQuestions.length > 0 ? [{
      type: 'info' as const,
      title: `${decliningQuestions.length} Questions Showing Declining Performance`,
      description: `Performance has decreased on questions ${decliningQuestions.map(q => q.id).join(', ')}. This may indicate content needs reinforcement.`,
      action: 'Plan Remediation',
      icon: IconAnalyticsLine
    }] : []),

    // Standards Issues
    ...(strugglingStandards.length > 0 ? [{
      type: 'warning' as const,
      title: `${strugglingStandards.length} Standards Below Benchmark`,
      description: `${strugglingStandards.map(s => `${s.standard} (${s.averageRate}%)`).join(', ')} are performing below 65% average.`,
      action: 'Review Standards',
      icon: IconTargetLine
    }] : []),

    // Positive insights
    ...(improvingQuestions.length > 0 ? [{
      type: 'success' as const,
      title: `${improvingQuestions.length} Questions Showing Improvement`,
      description: `Questions ${improvingQuestions.map(q => q.id).join(', ')} are trending positively, indicating effective instruction.`,
      action: 'Continue Approach',
      icon: IconCheckMarkLine
    }] : [])
  ];

  // Summary statistics
  const summaryStats = [
    {
      label: 'Overall Performance',
      value: `${Math.round(averageCorrectRate)}%`,
      status: averageCorrectRate >= 75 ? 'success' : averageCorrectRate >= 65 ? 'warning' : 'danger',
      icon: IconTargetLine
    },
    {
      label: 'Questions Needing Review',
      value: `${lowPerformingQuestions.length + poorDiscriminationQuestions.length}`,
      status: (lowPerformingQuestions.length + poorDiscriminationQuestions.length) === 0 ? 'success' : 
              (lowPerformingQuestions.length + poorDiscriminationQuestions.length) <= 3 ? 'warning' : 'danger',
      icon: IconWarningLine
    },
    {
      label: 'High Skip Rate Issues',
      value: `${highSkipRateQuestions.length}`,
      status: highSkipRateQuestions.length === 0 ? 'success' : 
              highSkipRateQuestions.length <= 2 ? 'warning' : 'danger',
      icon: IconClockLine
    },
    {
      label: 'Improving Trends',
      value: `${improvingQuestions.length}`,
      status: improvingQuestions.length >= 3 ? 'success' : 
              improvingQuestions.length >= 1 ? 'info' : 'neutral',
      icon: IconAnalyticsLine
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning'; 
      case 'danger': return 'danger';
      case 'info': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <View as="div">
      {/* Summary Statistics */}
      <View as="section" margin="0 0 large 0">
        <Heading level="h2" margin="0 0 medium 0">
          Assessment Overview
        </Heading>
        <Grid>
          <Grid.Row>
            {summaryStats.map((stat, index) => (
              <Grid.Col key={index} width={3}>
                <View
                  as="div"
                  borderWidth="small"
                  borderRadius="medium"
                  padding="medium"
                  background="primary"
                  textAlign="center"
                  borderColor={getStatusColor(stat.status)}
                >
                  <Flex direction="column" alignItems="center">
                    <Flex.Item margin="0 0 small 0">
                      <View
                        as="div"
                        background={getStatusColor(stat.status)}
                        borderRadius="circle"
                        padding="small"
                        display="inline-block"
                      >
                        <stat.icon size="small" color="primary-inverse" />
                      </View>
                    </Flex.Item>
                    <Flex.Item>
                      <Text size="x-large" weight="bold" color={getStatusColor(stat.status)}>
                        {stat.value}
                      </Text>
                      <View as="div">
                        <Text size="small" color="secondary">
                          {stat.label}
                        </Text>
                      </View>
                    </Flex.Item>
                  </Flex>
                </View>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Grid>
      </View>

      {/* Insights and Recommendations */}
      <View as="section">
        <Heading level="h2" margin="0 0 medium 0">
          Key Insights & Recommendations
        </Heading>
        
        {insights.length === 0 ? (
          <Alert variant="success" margin="0 0 medium 0">
            <Text weight="bold">Excellent Performance!</Text>
            <View as="div">
              <Text>All questions are performing well with no major issues identified. Continue with your current instructional approach.</Text>
            </View>
          </Alert>
        ) : (
          <Flex direction="column">
            {insights.slice(0, 5).map((insight, index) => (
              <Flex.Item key={index} margin="0 0 medium 0">
                <Alert variant={insight.type} margin="0">
                  <Flex direction="row" justifyItems="space-between" alignItems="start">
                    <Flex.Item shouldGrow>
                      <Text weight="bold">{insight.title}</Text>
                      <View as="div" margin="x-small 0 0 0">
                        <Text>{insight.description}</Text>
                      </View>
                    </Flex.Item>
                    <Flex.Item margin="0 0 0 medium">
                      <Text size="small" weight="bold" color="primary">
                        {insight.action}
                      </Text>
                    </Flex.Item>
                  </Flex>
                </Alert>
              </Flex.Item>
            ))}
          </Flex>
        )}

        {insights.length > 5 && (
          <View as="div" margin="medium 0 0 0">
            <Text size="small" color="secondary">
              + {insights.length - 5} more insights available in detailed analysis
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ItemAnalysisInsights;