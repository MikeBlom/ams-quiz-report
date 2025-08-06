
import React from 'react';
import { View } from '@instructure/ui-view';
import { Heading } from '@instructure/ui-heading';
import { Tabs } from '@instructure/ui-tabs';
import ItemAnalysisInsights from './ItemAnalysisInsights';
import ItemAnalysisTable from './ItemAnalysisTable';

const ItemAnalysis = () => {
  // Enhanced mock data with additional fields for scanning and insights
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
      timeSpent: 180, // 3 minutes
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
      timeSpent: 95, // 1.5 minutes
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
      timeSpent: 420, // 7 minutes
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
      timeSpent: 240, // 4 minutes
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
      timeSpent: 380, // 6.3 minutes
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
      timeSpent: 275, // 4.6 minutes
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

  return (
    <View as="div">
      <Tabs variant="secondary" margin="0 0 large 0">
        <Tabs.Panel 
          renderTitle="Overview & Insights" 
          id="insights"
          isSelected
        >
          <ItemAnalysisInsights data={itemData} />
        </Tabs.Panel>
        
        <Tabs.Panel 
          renderTitle="Detailed Analysis" 
          id="detailed"
        >
          <View as="div" margin="medium 0 0 0">
            <Heading level="h2" margin="0 0 medium 0">
              Question-by-Question Analysis
            </Heading>
            <ItemAnalysisTable data={itemData} />
          </View>
        </Tabs.Panel>
      </Tabs>
    </View>
  );
};

export default ItemAnalysis;
