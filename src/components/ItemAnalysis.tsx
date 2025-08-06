
import React, { useState } from 'react';
import { View } from '@instructure/ui-view';
import { Heading } from '@instructure/ui-heading';
import { Text } from '@instructure/ui-text';
import { Button } from '@instructure/ui-buttons';
import { Flex } from '@instructure/ui-flex';
import { Grid } from '@instructure/ui-grid';
import ItemAnalysisTable from './ItemAnalysisTable';

const ItemAnalysis = () => {
  const [showDetailedTable, setShowDetailedTable] = useState(false);
  
  // Enhanced mock data with additional fields for insights
  const itemData = [
    {
      id: 1,
      question: 'Solve for x in the equation: 2x + 5 = 13. Show your work and explain each step of the solution process.',
      standard: 'Linear Equations',
      difficulty: 'Medium' as const,
      correctRate: 85,
      discrimination: 0.67,
      pValue: 0.85,
      skipRate: 5,
      timeSpent: 180,
      flagged: false,
      trend: 'stable' as const,
      distractorAnalysis: [
        { option: 'A', text: 'x = 4 (Correct)', selected: 22, isCorrect: true },
        { option: 'B', text: 'x = 6', selected: 3, isCorrect: false },
        { option: 'C', text: 'x = 9', selected: 1, isCorrect: false },
        { option: 'D', text: 'x = 3', selected: 0, isCorrect: false }
      ],
      insights: [
        'Most students correctly identified the need to subtract 5 from both sides',
        'Common error: forgetting to divide by 2 in the final step'
      ]
    },
    {
      id: 2,
      question: 'Which expression is equivalent to 3(x + 2)? Choose the mathematically equivalent form.',
      standard: 'Algebraic Expressions',
      difficulty: 'Easy' as const,
      correctRate: 92,
      discrimination: 0.43,
      pValue: 0.92,
      skipRate: 2,
      timeSpent: 95,
      flagged: false,
      trend: 'up' as const,
      distractorAnalysis: [
        { option: 'A', text: '3x + 6 (Correct)', selected: 24, isCorrect: true },
        { option: 'B', text: '3x + 2', selected: 2, isCorrect: false },
        { option: 'C', text: '6x + 3', selected: 0, isCorrect: false },
        { option: 'D', text: '3x + 5', selected: 0, isCorrect: false }
      ],
      insights: [
        'Excellent performance - students understand distributive property well',
        'Very few students chose incorrect options'
      ]
    },
    {
      id: 3,
      question: 'Graph the linear function f(x) = 2x - 1 on the coordinate plane. Include at least 3 points and show the complete line.',
      standard: 'Graphing Functions',
      difficulty: 'Hard' as const,
      correctRate: 58,
      discrimination: 0.78,
      pValue: 0.58,
      skipRate: 18,
      timeSpent: 420,
      flagged: true,
      trend: 'down' as const,
      distractorAnalysis: [
        { option: 'A', text: 'Correct graph with y-intercept at -1', selected: 15, isCorrect: true },
        { option: 'B', text: 'Graph with incorrect slope', selected: 8, isCorrect: false },
        { option: 'C', text: 'Graph with incorrect y-intercept', selected: 2, isCorrect: false },
        { option: 'D', text: 'Completely incorrect graph', selected: 1, isCorrect: false }
      ],
      insights: [
        'High skip rate indicates students struggle with graphing linear functions',
        'Most errors involve incorrect y-intercept identification',
        'Students need more practice with slope-intercept form'
      ]
    },
    {
      id: 4,
      question: 'Simplify the expression: (4x² - 2x + 7) - (2x² + 3x - 1). Write your answer in standard form.',
      standard: 'Polynomial Operations',
      difficulty: 'Medium' as const,
      correctRate: 71,
      discrimination: 0.55,
      pValue: 0.71,
      skipRate: 8,
      timeSpent: 240,
      flagged: false,
      trend: 'stable' as const,
      distractorAnalysis: [
        { option: 'A', text: '2x² - 5x + 8 (Correct)', selected: 19, isCorrect: true },
        { option: 'B', text: '2x² + x + 6', selected: 4, isCorrect: false },
        { option: 'C', text: '6x² - 5x + 8', selected: 2, isCorrect: false },
        { option: 'D', text: '2x² - 5x + 6', selected: 1, isCorrect: false }
      ],
      insights: [
        'Students generally understand polynomial subtraction',
        'Main error: sign mistakes when distributing the negative'
      ]
    },
    {
      id: 5,
      question: 'A rectangle has a length of (3x + 4) units and a width of (2x - 1) units. Write an expression for the area.',
      standard: 'Algebraic Applications',
      difficulty: 'Hard' as const,
      correctRate: 45,
      discrimination: 0.82,
      pValue: 0.45,
      skipRate: 22,
      timeSpent: 380,
      flagged: true,
      trend: 'down' as const,
      distractorAnalysis: [
        { option: 'A', text: '6x² + 5x - 4 (Correct)', selected: 12, isCorrect: true },
        { option: 'B', text: '6x² - 4', selected: 7, isCorrect: false },
        { option: 'C', text: '5x + 3', selected: 4, isCorrect: false },
        { option: 'D', text: '6x² + 8x - 4', selected: 3, isCorrect: false }
      ],
      insights: [
        'Very high skip rate - students avoid complex multiplication',
        'Strong discrimination shows this effectively separates skill levels',
        'Need more scaffolding for polynomial multiplication in word problems'
      ]
    },
    {
      id: 6,
      question: 'Solve the inequality: 3x - 7 ≥ 5x + 9. Express your answer using interval notation.',
      standard: 'Inequalities',
      difficulty: 'Medium' as const,
      correctRate: 62,
      discrimination: 0.61,
      pValue: 0.62,
      skipRate: 12,
      timeSpent: 275,
      flagged: false,
      trend: 'up' as const,
      distractorAnalysis: [
        { option: 'A', text: 'x ≤ -8 or (-∞, -8] (Correct)', selected: 16, isCorrect: true },
        { option: 'B', text: 'x ≥ -8 or [-8, ∞)', selected: 6, isCorrect: false },
        { option: 'C', text: 'x ≤ 8 or (-∞, 8]', selected: 3, isCorrect: false },
        { option: 'D', text: 'x ≥ 8 or [8, ∞)', selected: 1, isCorrect: false }
      ],
      insights: [
        'Improving trend shows recent instruction is effective',
        'Main confusion: flipping inequality sign when dividing by negative'
      ]
    }
  ];

  // Generate insights based on the data
  const generateInsights = () => {
    const totalQuestions = itemData.length;
    const lowPerformingQuestions = itemData.filter(item => item.correctRate < 60);
    const highSkipRateQuestions = itemData.filter(item => item.skipRate > 15);
    const flaggedQuestions = itemData.filter(item => item.flagged);
    const decliningQuestions = itemData.filter(item => item.trend === 'down');

    return [
      {
        type: 'warning',
        title: `${lowPerformingQuestions.length} Low-Performing Questions Need Attention`,
        description: `Questions ${lowPerformingQuestions.map(q => q.id).join(', ')} have correct rates below 60%. Consider reviewing instructional approach or question clarity.`,
        action: 'Review Content Coverage',
        actionIcon: 'warning',
        relatedQuestions: lowPerformingQuestions.map(q => q.id)
      },
      {
        type: 'warning',
        title: `${highSkipRateQuestions.length} Questions with High Skip Rates`,
        description: `Questions ${highSkipRateQuestions.map(q => q.id).join(', ')} have skip rates above 15%. Students may find these too challenging or time-consuming.`,
        action: 'Analyze Question Complexity',
        actionIcon: 'clock',
        relatedQuestions: highSkipRateQuestions.map(q => q.id)
      },
      {
        type: 'info',
        title: `${decliningQuestions.length} Questions Showing Declining Performance`,
        description: `Performance trends downward on questions ${decliningQuestions.map(q => q.id).join(', ')}. May indicate need for content reinforcement.`,
        action: 'Plan Remediation',
        actionIcon: 'analytics',
        relatedQuestions: decliningQuestions.map(q => q.id)
      }
    ].filter(insight => insight.relatedQuestions.length > 0);
  };

  const insights = generateInsights();

  return (
    <View as="div">
      {/* Insights Section - Same design pattern as main page */}
      <View as="section" margin="0 0 large 0">
        <Heading level="h2" margin="0 0 medium 0">
          Item Analysis Insights & Recommendations
        </Heading>
        <View as="div" margin="0 0 medium 0">
          <Text size="small" color="secondary">
            AI-powered insights to guide question review and instructional planning
          </Text>
        </View>
        
        <Grid>
          <Grid.Row>
            {insights.slice(0, 3).map((insight, index) => (
              <Grid.Col key={index} width={4}>
                <View 
                  as="div" 
                  margin="0 0 medium 0" 
                  padding="medium" 
                  background="primary" 
                  borderRadius="medium" 
                  borderWidth="small"
                  height="100%"
                  style={{ overflow: 'hidden' }}
                >
                  <Flex direction="column" height="100%">
                    <Flex.Item shouldGrow>
                      <Flex direction="row" alignItems="start">
                        <Flex.Item margin="0 medium 0 0">
                          <View
                            as="div"
                            borderColor={insight.type === 'warning' ? 'warning' : 'brand'}
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
                            <Text size="small" weight="bold" color={insight.type === 'warning' ? 'warning' : 'brand'}>
                              {insight.relatedQuestions.length}
                            </Text>
                          </View>
                        </Flex.Item>
                        <Flex.Item shouldGrow>
                          <View as="div" margin="0 0 x-small 0">
                            <Text weight="bold" style={{ wordWrap: 'break-word' }}>
                              {insight.title}
                            </Text>
                          </View>
                          <View as="div" margin="0 0 medium 0">
                            <Text size="small" color="secondary" style={{ wordWrap: 'break-word' }}>
                              {insight.description}
                            </Text>
                          </View>
                        </Flex.Item>
                      </Flex>
                    </Flex.Item>
                    
                    <Flex.Item>
                      <View as="div" textAlign="end">
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            // Filter table to show only related questions
                            setShowDetailedTable(true);
                          }}
                        >
                          {insight.action}
                        </Button>
                      </View>
                    </Flex.Item>
                  </Flex>
                </View>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Grid>
      </View>

      {/* Detailed Analysis Section */}
      <View as="section">
        <Flex direction="row" justifyItems="space-between" alignItems="center" margin="0 0 medium 0">
          <Flex.Item>
            <Heading level="h2">
              Question-by-Question Analysis
            </Heading>
            <Text size="small" color="secondary">
              Detailed performance metrics and distractor analysis for each question
            </Text>
          </Flex.Item>
          <Flex.Item>
            <Button
              color={showDetailedTable ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowDetailedTable(!showDetailedTable)}
            >
              {showDetailedTable ? 'Show Summary' : 'Show Detailed View'}
            </Button>
          </Flex.Item>
        </Flex>
        
        {showDetailedTable ? (
          <ItemAnalysisTable data={itemData} />
        ) : (
          // Summary Cards View
          <Grid>
            {Array.from({ length: Math.ceil(itemData.length / 3) }, (_, rowIndex) => (
              <Grid.Row key={rowIndex}>
                {itemData.slice(rowIndex * 3, (rowIndex + 1) * 3).map((item) => (
                  <Grid.Col key={item.id} width={4}>
                    <View 
                      as="div" 
                      margin="0 0 medium 0" 
                      padding="medium" 
                      background="primary" 
                      borderRadius="medium" 
                      borderWidth="small"
                      borderColor={item.flagged ? 'warning' : 'secondary'}
                    >
                      <View as="div" margin="0 0 small 0">
                        <Flex direction="row" justifyItems="space-between" alignItems="start">
                          <Text weight="bold">Q{item.id}: {item.standard}</Text>
                          <Text 
                            size="large" 
                            weight="bold" 
                            color={item.correctRate >= 75 ? 'success' : item.correctRate >= 60 ? 'warning' : 'danger'}
                          >
                            {item.correctRate}%
                          </Text>
                        </Flex>
                      </View>
                      
                      <View as="div" margin="0 0 small 0">
                        <Text size="small" color="secondary">
                          {item.question.length > 80 ? `${item.question.substring(0, 80)}...` : item.question}
                        </Text>
                      </View>
                      
                      <View as="div" margin="0 0 small 0">
                        <Flex direction="row" justifyItems="space-between">
                          <Text size="x-small" color="secondary">Skip Rate: {item.skipRate}%</Text>
                          <Text size="x-small" color="secondary">Discrimination: {item.discrimination}</Text>
                        </Flex>
                      </View>
                      
                      {item.flagged && (
                        <View as="div" margin="small 0 0 0">
                          <Text size="x-small" color="warning" weight="bold">⚠ Flagged for Review</Text>
                        </View>
                      )}
                    </View>
                  </Grid.Col>
                ))}
              </Grid.Row>
            ))}
          </Grid>
        )}
      </View>
    </View>
  );
};

export default ItemAnalysis;
