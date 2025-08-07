
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, User, Grid, List, Download } from 'lucide-react';

const StudentAnalysis = () => {
  const [expandedStudent, setExpandedStudent] = useState<string | null>('1');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');

  // Mock student data
  const studentData = [
    {
      id: '1',
      name: 'Bruce Jones',
      initials: 'BJ',
      score: 89,
      timeSpent: '00:23:45',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Quadratic Functions', score: 8, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 6, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 5, total: 7, mastery: 'below-mastery' },
        { name: 'Logarithmic Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Trigonometric Functions', score: 8, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 7, total: 9, mastery: 'near-mastery' },
        { name: 'Systems of Equations', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 6, total: 8, mastery: 'below-mastery' },
        { name: 'Matrices', score: 8, total: 9, mastery: 'mastery' }
      ]
    },
    {
      id: '2',
      name: 'Emily Boone',
      initials: 'EB',
      score: 92,
      timeSpent: '00:28:12',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 10, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Quadratic Functions', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Rational Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 6, total: 7, mastery: 'mastery' },
        { name: 'Logarithmic Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Trigonometric Functions', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Systems of Equations', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Matrices', score: 8, total: 9, mastery: 'mastery' }
      ]
    },
    {
      id: '3',
      name: 'Nora Sanderson',
      initials: 'NS',
      score: 67,
      timeSpent: '00:31:28',
      attempts: 2,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 6, total: 11, mastery: 'below-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Quadratic Functions', score: 5, total: 10, mastery: 'below-mastery' },
        { name: 'Polynomials', score: 6, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 4, total: 8, mastery: 'below-mastery' },
        { name: 'Exponential Functions', score: 3, total: 7, mastery: 'below-mastery' },
        { name: 'Logarithmic Functions', score: 5, total: 8, mastery: 'below-mastery' },
        { name: 'Trigonometric Functions', score: 6, total: 10, mastery: 'below-mastery' },
        { name: 'Sequences and Series', score: 5, total: 9, mastery: 'below-mastery' },
        { name: 'Systems of Equations', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Inequalities', score: 4, total: 8, mastery: 'below-mastery' },
        { name: 'Matrices', score: 6, total: 9, mastery: 'near-mastery' }
      ]
    },
    {
      id: '4',
      name: 'Alex Thompson',
      initials: 'AT',
      score: 95,
      timeSpent: '00:19:33',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 11, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 10, total: 11, mastery: 'mastery' },
        { name: 'Quadratic Functions', score: 10, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 9, total: 9, mastery: 'mastery' },
        { name: 'Rational Functions', score: 8, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 7, total: 7, mastery: 'mastery' },
        { name: 'Logarithmic Functions', score: 8, total: 8, mastery: 'mastery' },
        { name: 'Trigonometric Functions', score: 10, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 9, total: 9, mastery: 'mastery' },
        { name: 'Systems of Equations', score: 10, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 8, total: 8, mastery: 'mastery' },
        { name: 'Matrices', score: 9, total: 9, mastery: 'mastery' }
      ]
    },
    {
      id: '5',
      name: 'Sarah Chen',
      initials: 'SC',
      score: 78,
      timeSpent: '00:26:47',
      attempts: 1,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Quadratic Functions', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Polynomials', score: 7, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Exponential Functions', score: 5, total: 7, mastery: 'near-mastery' },
        { name: 'Logarithmic Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Trigonometric Functions', score: 8, total: 10, mastery: 'near-mastery' },
        { name: 'Sequences and Series', score: 7, total: 9, mastery: 'near-mastery' },
        { name: 'Systems of Equations', score: 8, total: 10, mastery: 'near-mastery' },
        { name: 'Inequalities', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Matrices', score: 7, total: 9, mastery: 'near-mastery' }
      ]
    },
    {
      id: '6',
      name: 'Michael Rodriguez',
      initials: 'MR',
      score: 84,
      timeSpent: '00:32:15',
      attempts: 2,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Quadratic Functions', score: 8, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Rational Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 6, total: 7, mastery: 'mastery' },
        { name: 'Logarithmic Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Trigonometric Functions', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Systems of Equations', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Matrices', score: 8, total: 9, mastery: 'mastery' }
      ]
    },
    {
      id: '7',
      name: 'Jessica Williams',
      initials: 'JW',
      score: 71,
      timeSpent: '00:29:52',
      attempts: 1,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Quadratic Functions', score: 6, total: 10, mastery: 'below-mastery' },
        { name: 'Polynomials', score: 6, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 5, total: 8, mastery: 'below-mastery' },
        { name: 'Exponential Functions', score: 4, total: 7, mastery: 'below-mastery' },
        { name: 'Logarithmic Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Trigonometric Functions', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Sequences and Series', score: 6, total: 9, mastery: 'near-mastery' },
        { name: 'Systems of Equations', score: 8, total: 10, mastery: 'near-mastery' },
        { name: 'Inequalities', score: 5, total: 8, mastery: 'below-mastery' },
        { name: 'Matrices', score: 7, total: 9, mastery: 'near-mastery' }
      ]
    },
    {
      id: '8',
      name: 'David Kim',
      initials: 'DK',
      score: 58,
      timeSpent: '00:35:41',
      attempts: 3,
      status: 'Completed',
      mastery: 'Below Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 5, total: 11, mastery: 'below-mastery' },
        { name: 'Linear Equations', score: 6, total: 11, mastery: 'below-mastery' },
        { name: 'Quadratic Functions', score: 4, total: 10, mastery: 'below-mastery' },
        { name: 'Polynomials', score: 5, total: 9, mastery: 'below-mastery' },
        { name: 'Rational Functions', score: 3, total: 8, mastery: 'below-mastery' },
        { name: 'Exponential Functions', score: 3, total: 7, mastery: 'below-mastery' },
        { name: 'Logarithmic Functions', score: 4, total: 8, mastery: 'below-mastery' },
        { name: 'Trigonometric Functions', score: 5, total: 10, mastery: 'below-mastery' },
        { name: 'Sequences and Series', score: 4, total: 9, mastery: 'below-mastery' },
        { name: 'Systems of Equations', score: 6, total: 10, mastery: 'below-mastery' },
        { name: 'Inequalities', score: 3, total: 8, mastery: 'below-mastery' },
        { name: 'Matrices', score: 5, total: 9, mastery: 'below-mastery' }
      ]
    },
    {
      id: '9',
      name: 'Emma Davis',
      initials: 'ED',
      score: 91,
      timeSpent: '00:24:18',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 10, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Quadratic Functions', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Rational Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 6, total: 7, mastery: 'mastery' },
        { name: 'Logarithmic Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Trigonometric Functions', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Systems of Equations', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Matrices', score: 8, total: 9, mastery: 'mastery' }
      ]
    },
    {
      id: '10',
      name: 'Ryan Martinez',
      initials: 'RM',
      score: 76,
      timeSpent: '00:27:39',
      attempts: 2,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Quadratic Functions', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Polynomials', score: 7, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Exponential Functions', score: 5, total: 7, mastery: 'near-mastery' },
        { name: 'Logarithmic Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Trigonometric Functions', score: 8, total: 10, mastery: 'near-mastery' },
        { name: 'Sequences and Series', score: 7, total: 9, mastery: 'near-mastery' },
        { name: 'Systems of Equations', score: 8, total: 10, mastery: 'near-mastery' },
        { name: 'Inequalities', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Matrices', score: 7, total: 9, mastery: 'near-mastery' }
      ]
    },
    {
      id: '11',
      name: 'Olivia Johnson',
      initials: 'OJ',
      score: 87,
      timeSpent: '00:21:56',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Quadratic Functions', score: 8, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Rational Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 6, total: 7, mastery: 'mastery' },
        { name: 'Logarithmic Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Trigonometric Functions', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Systems of Equations', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Matrices', score: 8, total: 9, mastery: 'mastery' }
      ]
    },
    {
      id: '12',
      name: 'Kevin Anderson',
      initials: 'KA',
      score: 63,
      timeSpent: '00:33:24',
      attempts: 2,
      status: 'Completed',
      mastery: 'Below Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 6, total: 11, mastery: 'below-mastery' },
        { name: 'Linear Equations', score: 6, total: 11, mastery: 'below-mastery' },
        { name: 'Quadratic Functions', score: 5, total: 10, mastery: 'below-mastery' },
        { name: 'Polynomials', score: 6, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 4, total: 8, mastery: 'below-mastery' },
        { name: 'Exponential Functions', score: 4, total: 7, mastery: 'below-mastery' },
        { name: 'Logarithmic Functions', score: 5, total: 8, mastery: 'below-mastery' },
        { name: 'Trigonometric Functions', score: 6, total: 10, mastery: 'below-mastery' },
        { name: 'Sequences and Series', score: 5, total: 9, mastery: 'below-mastery' },
        { name: 'Systems of Equations', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Inequalities', score: 4, total: 8, mastery: 'below-mastery' },
        { name: 'Matrices', score: 6, total: 9, mastery: 'near-mastery' }
      ]
    },
    {
      id: '13',
      name: 'Sophia Lee',
      initials: 'SL',
      score: 93,
      timeSpent: '00:22:07',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 10, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 10, total: 11, mastery: 'mastery' },
        { name: 'Quadratic Functions', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Rational Functions', score: 8, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 7, total: 7, mastery: 'mastery' },
        { name: 'Logarithmic Functions', score: 8, total: 8, mastery: 'mastery' },
        { name: 'Trigonometric Functions', score: 10, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 9, total: 9, mastery: 'mastery' },
        { name: 'Systems of Equations', score: 10, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 8, total: 8, mastery: 'mastery' },
        { name: 'Matrices', score: 9, total: 9, mastery: 'mastery' }
      ]
    },
    {
      id: '14',
      name: 'Tyler Brown',
      initials: 'TB',
      score: 69,
      timeSpent: '00:30:45',
      attempts: 2,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 6, total: 11, mastery: 'below-mastery' },
        { name: 'Quadratic Functions', score: 6, total: 10, mastery: 'below-mastery' },
        { name: 'Polynomials', score: 6, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 5, total: 8, mastery: 'below-mastery' },
        { name: 'Exponential Functions', score: 4, total: 7, mastery: 'below-mastery' },
        { name: 'Logarithmic Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Trigonometric Functions', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Sequences and Series', score: 6, total: 9, mastery: 'near-mastery' },
        { name: 'Systems of Equations', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Inequalities', score: 5, total: 8, mastery: 'below-mastery' },
        { name: 'Matrices', score: 6, total: 9, mastery: 'near-mastery' }
      ]
    },
    {
      id: '15',
      name: 'Madison Taylor',
      initials: 'MT',
      score: 82,
      timeSpent: '00:25:33',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Quadratic Functions', score: 8, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 7, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 6, total: 7, mastery: 'mastery' },
        { name: 'Logarithmic Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Trigonometric Functions', score: 8, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 7, total: 9, mastery: 'near-mastery' },
        { name: 'Systems of Equations', score: 8, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Matrices', score: 7, total: 9, mastery: 'near-mastery' }
      ]
    },
    {
      id: '16',
      name: 'Jackson Wilson',
      initials: 'JWi',
      score: 74,
      timeSpent: '00:28:59',
      attempts: 1,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Quadratic Functions', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Polynomials', score: 6, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Exponential Functions', score: 5, total: 7, mastery: 'near-mastery' },
        { name: 'Logarithmic Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Trigonometric Functions', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Sequences and Series', score: 6, total: 9, mastery: 'near-mastery' },
        { name: 'Systems of Equations', score: 8, total: 10, mastery: 'near-mastery' },
        { name: 'Inequalities', score: 5, total: 8, mastery: 'below-mastery' },
        { name: 'Matrices', score: 7, total: 9, mastery: 'near-mastery' }
      ]
    },
    {
      id: '17',
      name: 'Chloe Garcia',
      initials: 'CG',
      score: 55,
      timeSpent: '00:37:12',
      attempts: 3,
      status: 'Completed',
      mastery: 'Below Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 5, total: 11, mastery: 'below-mastery' },
        { name: 'Linear Equations', score: 5, total: 11, mastery: 'below-mastery' },
        { name: 'Quadratic Functions', score: 4, total: 10, mastery: 'below-mastery' },
        { name: 'Polynomials', score: 5, total: 9, mastery: 'below-mastery' },
        { name: 'Rational Functions', score: 3, total: 8, mastery: 'below-mastery' },
        { name: 'Exponential Functions', score: 3, total: 7, mastery: 'below-mastery' },
        { name: 'Logarithmic Functions', score: 4, total: 8, mastery: 'below-mastery' },
        { name: 'Trigonometric Functions', score: 5, total: 10, mastery: 'below-mastery' },
        { name: 'Sequences and Series', score: 4, total: 9, mastery: 'below-mastery' },
        { name: 'Systems of Equations', score: 6, total: 10, mastery: 'below-mastery' },
        { name: 'Inequalities', score: 3, total: 8, mastery: 'below-mastery' },
        { name: 'Matrices', score: 5, total: 9, mastery: 'below-mastery' }
      ]
    },
    {
      id: '18',
      name: 'Nathan Miller',
      initials: 'NM',
      score: 88,
      timeSpent: '00:23:41',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 9, total: 11, mastery: 'mastery' },
        { name: 'Quadratic Functions', score: 8, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Rational Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 6, total: 7, mastery: 'mastery' },
        { name: 'Logarithmic Functions', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Trigonometric Functions', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 8, total: 9, mastery: 'mastery' },
        { name: 'Systems of Equations', score: 9, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 7, total: 8, mastery: 'mastery' },
        { name: 'Matrices', score: 8, total: 9, mastery: 'mastery' }
      ]
    },
    {
      id: '19',
      name: 'Grace Thomas',
      initials: 'GT',
      score: 77,
      timeSpent: '00:26:28',
      attempts: 2,
      status: 'Completed',
      mastery: 'Near Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 8, total: 11, mastery: 'near-mastery' },
        { name: 'Linear Equations', score: 7, total: 11, mastery: 'near-mastery' },
        { name: 'Quadratic Functions', score: 7, total: 10, mastery: 'near-mastery' },
        { name: 'Polynomials', score: 7, total: 9, mastery: 'near-mastery' },
        { name: 'Rational Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Exponential Functions', score: 5, total: 7, mastery: 'near-mastery' },
        { name: 'Logarithmic Functions', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Trigonometric Functions', score: 8, total: 10, mastery: 'near-mastery' },
        { name: 'Sequences and Series', score: 7, total: 9, mastery: 'near-mastery' },
        { name: 'Systems of Equations', score: 8, total: 10, mastery: 'near-mastery' },
        { name: 'Inequalities', score: 6, total: 8, mastery: 'near-mastery' },
        { name: 'Matrices', score: 7, total: 9, mastery: 'near-mastery' }
      ]
    },
    {
      id: '20',
      name: 'Ethan Moore',
      initials: 'EM',
      score: 96,
      timeSpent: '00:20:15',
      attempts: 1,
      status: 'Completed',
      mastery: 'Mastery',
      standards: [
        { name: 'Algebraic Expressions', score: 11, total: 11, mastery: 'mastery' },
        { name: 'Linear Equations', score: 10, total: 11, mastery: 'mastery' },
        { name: 'Quadratic Functions', score: 10, total: 10, mastery: 'mastery' },
        { name: 'Polynomials', score: 9, total: 9, mastery: 'mastery' },
        { name: 'Rational Functions', score: 8, total: 8, mastery: 'mastery' },
        { name: 'Exponential Functions', score: 7, total: 7, mastery: 'mastery' },
        { name: 'Logarithmic Functions', score: 8, total: 8, mastery: 'mastery' },
        { name: 'Trigonometric Functions', score: 10, total: 10, mastery: 'mastery' },
        { name: 'Sequences and Series', score: 9, total: 9, mastery: 'mastery' },
        { name: 'Systems of Equations', score: 10, total: 10, mastery: 'mastery' },
        { name: 'Inequalities', score: 8, total: 8, mastery: 'mastery' },
        { name: 'Matrices', score: 9, total: 9, mastery: 'mastery' }
      ]
    }
  ];

  const getMasteryBadge = (mastery: string) => {
    switch (mastery) {
      case 'mastery':
        return <Badge variant="outline" className="performance-mastery">Mastery</Badge>;
      case 'near-mastery':
        return <Badge variant="outline" className="performance-near-mastery">Near Mastery</Badge>;
      case 'below-mastery':
        return <Badge variant="outline" className="performance-below-mastery">Below Mastery</Badge>;
      default:
        return <Badge variant="outline" className="performance-not-assessed">Not Assessed</Badge>;
    }
  };

  const toggleStudent = (studentId: string) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const exportToCSV = () => {
    const headers = [
      'Student Name',
      'Score (%)',
      'Time Spent',
      'Attempts',
      'Overall Mastery',
      'Algebraic Expressions',
      'Linear Equations',
      'Quadratic Functions',
      'Polynomials',
      'Rational Functions',
      'Exponential Functions',
      'Logarithmic Functions',
      'Trigonometric Functions',
      'Sequences and Series',
      'Systems of Equations',
      'Inequalities',
      'Matrices'
    ];

    const csvContent = [
      headers.join(','),
      ...studentData.map(student => [
        student.name,
        student.score,
        student.timeSpent,
        student.attempts,
        student.mastery,
        ...student.standards.map(standard => `${standard.score}/${standard.total} (${standard.mastery})`)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_performance_analysis.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTableView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" aria-hidden="true" />
            <span>Student Performance Analysis</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Cards
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4 mr-2" />
              Table
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-[1400px]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Student</TableHead>
                <TableHead className="min-w-[80px]">Score</TableHead>
                <TableHead className="min-w-[100px]">Time Spent</TableHead>
                <TableHead className="min-w-[80px]">Attempts</TableHead>
                <TableHead className="min-w-[120px]">Overall Mastery</TableHead>
                <TableHead className="min-w-[150px] bg-muted/30 font-semibold">Algebraic Expressions</TableHead>
                <TableHead className="min-w-[140px] bg-muted/30 font-semibold">Linear Equations</TableHead>
                <TableHead className="min-w-[140px] bg-muted/30 font-semibold">Quadratic Functions</TableHead>
                <TableHead className="min-w-[120px] bg-muted/30 font-semibold">Polynomials</TableHead>
                <TableHead className="min-w-[140px] bg-muted/30 font-semibold">Rational Functions</TableHead>
                <TableHead className="min-w-[160px] bg-muted/30 font-semibold">Exponential Functions</TableHead>
                <TableHead className="min-w-[160px] bg-muted/30 font-semibold">Logarithmic Functions</TableHead>
                <TableHead className="min-w-[180px] bg-muted/30 font-semibold">Trigonometric Functions</TableHead>
                <TableHead className="min-w-[150px] bg-muted/30 font-semibold">Sequences and Series</TableHead>
                <TableHead className="min-w-[150px] bg-muted/30 font-semibold">Systems of Equations</TableHead>
                <TableHead className="min-w-[120px] bg-muted/30 font-semibold">Inequalities</TableHead>
                <TableHead className="min-w-[100px] bg-muted/30 font-semibold">Matrices</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="min-w-[200px]">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {student.initials}
                        </span>
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-[80px]">
                    <span className="font-medium">{student.score}%</span>
                  </TableCell>
                  <TableCell className="min-w-[100px]">{student.timeSpent}</TableCell>
                  <TableCell className="min-w-[80px]">{student.attempts}</TableCell>
                  <TableCell className="min-w-[120px]">
                    {getMasteryBadge(student.mastery.toLowerCase().replace(' ', '-'))}
                  </TableCell>
                  {student.standards.map((standard, index) => (
                    <TableCell key={index} className={`min-w-[120px] bg-muted/10 ${index < 2 ? 'min-w-[150px]' : ''}`}>
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground">{standard.score}/{standard.total}</span>
                        {getMasteryBadge(standard.mastery)}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  const renderCardView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" aria-hidden="true" />
            <span>Student Performance Analysis</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Cards
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4 mr-2" />
              Table
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {studentData.map((student) => (
          <div key={student.id} className="border border-border rounded-lg p-4 space-y-3">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleStudent(student.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleStudent(student.id);
                }
              }}
              aria-expanded={expandedStudent === student.id}
              aria-controls={`student-details-${student.id}`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {student.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {student.score}% • {student.timeSpent} • {student.attempts} attempt(s)
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {getMasteryBadge(student.mastery.toLowerCase().replace(' ', '-'))}
                {expandedStudent === student.id ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>

            {expandedStudent === student.id && (
              <div 
                id={`student-details-${student.id}`}
                className="pt-4 border-t border-border animate-fade-in"
              >
                <h4 className="font-medium text-foreground mb-3">Standards Performance</h4>
                <div className="space-y-3">
                  {student.standards.map((standard, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {standard.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {standard.score}/{standard.total} correct
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              standard.mastery === 'mastery' ? 'bg-success' :
                              standard.mastery === 'near-mastery' ? 'bg-warning' :
                              'bg-destructive'
                            }`}
                            style={{ 
                              width: `${(standard.score / standard.total) * 100}%` 
                            }}
                          />
                        </div>
                        {getMasteryBadge(standard.mastery)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {viewMode === 'table' ? renderTableView() : renderCardView()}
    </div>
  );
};

export default StudentAnalysis;
