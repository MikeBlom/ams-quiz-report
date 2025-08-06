
import React from 'react';
import { View } from '@instructure/ui-view';
import { Text } from '@instructure/ui-text';
import { Heading } from '@instructure/ui-heading';
import { Badge } from '@instructure/ui-badge';
import { Link } from '@instructure/ui-link';
import { Flex } from '@instructure/ui-flex';
import { IconArrowUpLine, IconArrowDownLine } from '@instructure/ui-icons';
import { Link as RouterLink } from 'react-router-dom';

interface SparklineData {
  values: number[];
  trend: 'up' | 'down';
  trendValue: number;
}

interface EnhancedWidgetCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  value: string | number;
  subtitle: string;
  link: string;
  sparkline?: SparklineData;
  priority?: 'high' | 'medium' | 'low';
  onDragStart?: (e: React.DragEvent, id: string) => void;
  onDragEnd?: () => void;
}

const EnhancedWidgetCard: React.FC<EnhancedWidgetCardProps> = ({
  id,
  title,
  description,
  icon: IconComponent,
  value,
  subtitle,
  link,
  sparkline,
  priority,
  onDragStart,
  onDragEnd
}) => {
  const renderSparkline = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 120; // Increased width
      const y = 40 - ((value - min) / range) * 30; // Increased height
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="120" height="40" viewBox="0 0 120 40" className="sparkline">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
          style={{ color: 'var(--ic-brand-primary)' }}
        />
        {/* Add dots for each data point */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 120;
          const y = 40 - ((value - min) / range) * 30;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill="var(--ic-brand-primary)"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <View
      as="div"
      borderWidth="small"
      borderRadius="medium"
      padding="medium"
      background="primary"
      shadow="resting"
      position="relative"
      className="widget-card"
      draggable
      onDragStart={(e) => onDragStart?.(e, id)}
      onDragEnd={onDragEnd}
      style={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderLeft: priority === 'high' ? '4px solid var(--ic-brand-primary)' : undefined
      }}
    >
      <Link
        as={RouterLink}
        to={link}
        isWithinText={false}
        themeOverride={{
          color: 'inherit'
        }}
      >
        <Flex direction="column" height="100%">
          <Flex.Item>
            <Flex direction="row" justifyItems="space-between" alignItems="start">
              <Flex.Item shouldGrow>
                <Flex direction="row" alignItems="center">
                  <Flex.Item margin="0 small 0 0">
                    <View
                      as="div"
                      background="brand"
                      borderRadius="small"
                      padding="x-small"
                      display="inline-block"
                    >
                      <IconComponent size="small" />
                    </View>
                  </Flex.Item>
                  <Flex.Item>
                    <Heading level="h3" margin="0 0 xx-small 0">
                      {title}
                    </Heading>
                    {priority === 'high' && (
                      <Badge
                        type="notification"
                        variant="primary"
                        margin="0 0 0 small"
                      >
                        Priority
                      </Badge>
                    )}
                  </Flex.Item>
                </Flex>
              </Flex.Item>
              <Flex.Item>
                {sparkline && (
                  <View as="div" margin="0 0 0 small">
                    {renderSparkline(sparkline.values)}
                  </View>
                )}
              </Flex.Item>
            </Flex>
          </Flex.Item>
          
          <Flex.Item shouldGrow margin="small 0">
            <Text size="small" color="secondary">
              {description}
            </Text>
          </Flex.Item>
          
          <Flex.Item>
            <Flex direction="row" justifyItems="space-between" alignItems="end">
              <Flex.Item>
                <View as="div">
                  <Text size="x-large" weight="bold" color="brand">
                    {value}
                  </Text>
                  <View as="div" margin="xx-small 0 0 0">
                    <Text size="small" color="secondary">
                      {subtitle}
                    </Text>
                  </View>
                </View>
              </Flex.Item>
              {sparkline && (
                <Flex.Item>
                  <Flex direction="row" alignItems="center">
                    {sparkline.trend === 'up' ? (
                      <IconArrowUpLine color="success" size="x-small" />
                    ) : (
                      <IconArrowDownLine color="error" size="x-small" />
                    )}
                    <View as="div" margin="0 0 0 xx-small">
                      <Text
                        size="small"
                        color={sparkline.trend === 'up' ? 'success' : 'error'}
                      >
                        {sparkline.trend === 'up' ? '+' : '-'}{sparkline.trendValue}%
                      </Text>
                    </View>
                  </Flex>
                </Flex.Item>
              )}
            </Flex>
          </Flex.Item>
        </Flex>
      </Link>
    </View>
  );
};

export default EnhancedWidgetCard;
