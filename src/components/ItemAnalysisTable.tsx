import React, { useState, useMemo } from 'react';
import { View } from '@instructure/ui-view';
import { Text } from '@instructure/ui-text';
import { Heading } from '@instructure/ui-heading';
import { Button } from '@instructure/ui-buttons';
import { Badge } from '@instructure/ui-badge';
import { Flex } from '@instructure/ui-flex';
import { Table } from '@instructure/ui-table';
import { TextInput } from '@instructure/ui-text-input';
import { SimpleSelect } from '@instructure/ui-simple-select';
import { 
  IconSearchLine, 
  IconSortLine, 
  IconWarningLine, 
  IconCheckMarkLine,
  IconXLine,
  IconArrowUpLine,
  IconArrowDownLine,
  IconExpandStartLine,
  IconCollapseLine,
  IconAnalyticsLine
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
  timeSpent: number; // in seconds
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

interface ItemAnalysisTableProps {
  data: ItemAnalysisData[];
  userRole?: 'teacher' | 'admin' | 'district';
}

type SortField = 'id' | 'correctRate' | 'discrimination' | 'skipRate' | 'timeSpent';
type SortDirection = 'asc' | 'desc';

const ItemAnalysisTable: React.FC<ItemAnalysisTableProps> = ({ data, userRole = 'teacher' }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterText, setFilterText] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showProblematic, setShowProblematic] = useState(false);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item => {
      const matchesText = item.question.toLowerCase().includes(filterText.toLowerCase()) ||
                         item.standard.toLowerCase().includes(filterText.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || item.difficulty === difficultyFilter;
      const matchesProblematic = !showProblematic || item.correctRate < 70 || item.skipRate > 15 || item.flagged;
      
      return matchesText && matchesDifficulty && matchesProblematic;
    });

    return filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [data, filterText, difficultyFilter, showProblematic, sortField, sortDirection]);

  const toggleRowExpansion = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <IconSortLine size="x-small" />;
    return sortDirection === 'asc' ? <IconArrowUpLine size="x-small" /> : <IconArrowDownLine size="x-small" />;
  };

  const getPerformanceStatus = (item: ItemAnalysisData) => {
    if (item.flagged) return 'danger';
    if (item.correctRate < 60 || item.skipRate > 20) return 'danger';
    if (item.correctRate < 75 || item.skipRate > 10) return 'warning';
    return 'success';
  };

  const getPerformanceIcon = (status: string) => {
    switch (status) {
      case 'danger': return <IconXLine size="x-small" />;
      case 'warning': return <IconWarningLine size="x-small" />;
      case 'success': return <IconCheckMarkLine size="x-small" />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <IconArrowUpLine size="x-small" color="success" />;
      case 'down': return <IconArrowDownLine size="x-small" color="warning" />;
      default: return <IconAnalyticsLine size="x-small" color="secondary" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View as="div">
      {/* Filters and Controls */}
      <View as="div" margin="0 0 medium 0">
        <Flex direction="row" justifyItems="space-between" alignItems="end" wrap="wrap">
          <Flex.Item shouldGrow margin="0 small small 0">
            <TextInput
              renderLabel="Search Questions"
              placeholder="Search by question text or standard..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              renderBeforeInput={<IconSearchLine />}
            />
          </Flex.Item>
          
          <Flex.Item margin="0 small small 0">
            <SimpleSelect
              renderLabel="Difficulty Level"
              value={difficultyFilter}
              onChange={(e, { value }) => setDifficultyFilter(String(value || 'all'))}
            >
              <SimpleSelect.Option id="all" value="all">All Levels</SimpleSelect.Option>
              <SimpleSelect.Option id="easy" value="Easy">Easy</SimpleSelect.Option>
              <SimpleSelect.Option id="medium" value="Medium">Medium</SimpleSelect.Option>
              <SimpleSelect.Option id="hard" value="Hard">Hard</SimpleSelect.Option>
            </SimpleSelect>
          </Flex.Item>
          
          <Flex.Item margin="0 0 small 0">
            <Button
              color={showProblematic ? 'primary' : 'secondary'}
              onClick={() => setShowProblematic(!showProblematic)}
            >
              <IconWarningLine />
              <Text>Show Issues Only</Text>
            </Button>
          </Flex.Item>
        </Flex>
      </View>

      {/* Results Summary */}
      <View as="div" margin="0 0 medium 0">
        <Text size="small" color="secondary">
          Showing {filteredAndSortedData.length} of {data.length} questions
        </Text>
      </View>

      {/* Table */}
      <Table caption="Item Analysis Results" layout="auto">
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="expand" width="60px">
              <Text size="small">Details</Text>
            </Table.ColHeader>
            <Table.ColHeader id="question">
              <Button
                color="secondary"
                onClick={() => handleSort('id')}
              >
                <Text size="small" weight="bold">Question</Text>
                {getSortIcon('id')}
              </Button>
            </Table.ColHeader>
            <Table.ColHeader id="standard" width="140px">
              <Text size="small" weight="bold">Standard</Text>
            </Table.ColHeader>
            <Table.ColHeader id="difficulty" width="100px">
              <Text size="small" weight="bold">Difficulty</Text>
            </Table.ColHeader>
            <Table.ColHeader id="correct-rate" width="120px">
              <Button
                color="secondary"
                onClick={() => handleSort('correctRate')}
              >
                <Text size="small" weight="bold">Correct Rate</Text>
                {getSortIcon('correctRate')}
              </Button>
            </Table.ColHeader>
            <Table.ColHeader id="discrimination" width="120px">
              <Button
                color="secondary"
                onClick={() => handleSort('discrimination')}
              >
                <Text size="small" weight="bold">Discrimination</Text>
                {getSortIcon('discrimination')}
              </Button>
            </Table.ColHeader>
            <Table.ColHeader id="skip-rate" width="100px">
              <Button
                color="secondary"
                onClick={() => handleSort('skipRate')}
              >
                <Text size="small" weight="bold">Skip Rate</Text>
                {getSortIcon('skipRate')}
              </Button>
            </Table.ColHeader>
            <Table.ColHeader id="time" width="100px">
              <Button
                color="secondary"
                onClick={() => handleSort('timeSpent')}
              >
                <Text size="small" weight="bold">Avg Time</Text>
                {getSortIcon('timeSpent')}
              </Button>
            </Table.ColHeader>
            <Table.ColHeader id="trend" width="80px">
              <Text size="small" weight="bold">Trend</Text>
            </Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filteredAndSortedData.map((item) => {
            const isExpanded = expandedRows.has(item.id);
            const status = getPerformanceStatus(item);
            
            return (
              <React.Fragment key={item.id}>
                <Table.Row>
                  <Table.Cell>
                    <Button
                      color="secondary"
                      onClick={() => toggleRowExpansion(item.id)}
                    >
                      {isExpanded ? <IconCollapseLine /> : <IconExpandStartLine />}
                    </Button>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Flex direction="row" alignItems="center">
                      <Flex.Item margin="0 small 0 0">
                        {getPerformanceIcon(status)}
                      </Flex.Item>
                      <Flex.Item shouldGrow>
                        <Text weight="bold">Q{item.id}</Text>
                        <View as="div">
                          <Text size="small" color="secondary">
                            {item.question.length > 60 
                              ? `${item.question.substring(0, 60)}...` 
                              : item.question}
                          </Text>
                        </View>
                        {item.flagged && (
                          <View as="div" margin="xx-small 0 0 0">
                            <Badge variant="danger">
                              <Text size="x-small">Flagged</Text>
                            </Badge>
                          </View>
                        )}
                      </Flex.Item>
                    </Flex>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Badge variant="primary">
                      <Text size="small">{item.standard}</Text>
                    </Badge>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Badge 
                      variant={item.difficulty === 'Easy' ? 'success' : 
                              item.difficulty === 'Medium' ? 'primary' : 'danger'}
                    >
                      <Text size="small">{item.difficulty}</Text>
                    </Badge>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Flex direction="column" alignItems="start">
                      <Text 
                        weight="bold" 
                        color={status === 'danger' ? 'danger' : 
                               status === 'warning' ? 'warning' : 'success'}
                      >
                        {item.correctRate}%
                      </Text>
                      <Text size="x-small" color="secondary">
                        P-value: {item.pValue}
                      </Text>
                    </Flex>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Text>{item.discrimination}</Text>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Text color={item.skipRate > 15 ? 'danger' : item.skipRate > 10 ? 'warning' : 'secondary'}>
                      {item.skipRate}%
                    </Text>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Text>{formatTime(item.timeSpent)}</Text>
                  </Table.Cell>
                  
                  <Table.Cell>
                    {getTrendIcon(item.trend)}
                  </Table.Cell>
                </Table.Row>
                
                {/* Expanded Details Row */}
                {isExpanded && (
                  <Table.Row>
                    <Table.Cell colSpan={9}>
                      <View 
                        as="div" 
                        padding="medium" 
                        background="secondary"
                        borderRadius="medium"
                        margin="small 0"
                      >
                        <Flex direction="column">
                          {/* Full Question Text */}
                          <Flex.Item margin="0 0 medium 0">
                            <Heading level="h4" margin="0 0 small 0">
                              Question {item.id}: Full Text
                            </Heading>
                            <Text>{item.question}</Text>
                          </Flex.Item>
                          
                          {/* Insights */}
                          {item.insights.length > 0 && (
                            <Flex.Item margin="0 0 medium 0">
                              <Heading level="h4" margin="0 0 small 0">
                                Insights
                              </Heading>
                              {item.insights.map((insight, index) => (
                                <View key={index} as="div" margin="0 0 x-small 0">
                                  <Text size="small" color="secondary">• {insight}</Text>
                                </View>
                              ))}
                            </Flex.Item>
                          )}
                          
                          {/* Distractor Analysis */}
                          <Flex.Item>
                            <Heading level="h4" margin="0 0 small 0">
                              Answer Choice Analysis
                            </Heading>
                            <Flex direction="column">
                              {item.distractorAnalysis.map((option) => {
                                const totalResponses = item.distractorAnalysis.reduce((sum, opt) => sum + opt.selected, 0);
                                const percentage = totalResponses > 0 ? (option.selected / totalResponses * 100).toFixed(1) : '0';
                                
                                return (
                                  <Flex.Item key={option.option} margin="0 0 x-small 0">
                                    <View 
                                      as="div" 
                                      padding="small" 
                                      background={option.isCorrect ? 'success' : 'primary'}
                                      borderRadius="small"
                                    >
                                      <Flex direction="row" justifyItems="space-between" alignItems="center">
                                        <Flex.Item shouldGrow>
                                          <Flex direction="row" alignItems="center">
                                            <View as="span">
                                              <Text weight="bold">
                                                {option.option}.
                                              </Text>
                                            </View>
                                            <Text>{option.text}</Text>
                                            {option.isCorrect && (
                                              <View as="span" margin="0 0 0 small">
                                                <IconCheckMarkLine size="x-small" color="success" />
                                              </View>
                                            )}
                                          </Flex>
                                        </Flex.Item>
                                        <Flex.Item>
                                          <Flex direction="row" alignItems="center">
                                            <View as="span">
                                              <Text size="small">
                                                {option.selected} ({percentage}%)
                                              </Text>
                                            </View>
                                            <View 
                                              as="div" 
                                              width="60px" 
                                              height="8px" 
                                              background="secondary"
                                              borderRadius="small"
                                              position="relative"
                                            >
                                              <View
                                                as="div"
                                                height="8px"
                                                background={option.isCorrect ? 'success' : 'brand'}
                                                borderRadius="small"
                                                style={{ width: `${percentage}%` }}
                                              />
                                            </View>
                                          </Flex>
                                        </Flex.Item>
                                      </Flex>
                                    </View>
                                  </Flex.Item>
                                );
                              })}
                            </Flex>
                          </Flex.Item>
                        </Flex>
                      </View>
                    </Table.Cell>
                  </Table.Row>
                )}
              </React.Fragment>
            );
          })}
        </Table.Body>
      </Table>
      
      {filteredAndSortedData.length === 0 && (
        <View as="div" textAlign="center" padding="large">
          <Text color="secondary">No questions match the current filters.</Text>
        </View>
      )}
    </View>
  );
};

export default ItemAnalysisTable;