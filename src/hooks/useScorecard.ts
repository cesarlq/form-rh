'use client';

import { useState, useCallback } from 'react';
import { CandidateInfo, Category, EvaluationResult } from '@/lib/types';
import { calculatePoints, calculateTotalScore, getEvaluationResult, getInitialData } from '@/lib/utils';

export const useScorecard = () => {
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo>({
    name: '',
    interviewer: '',
    date: '',
    position: ''
  });

  const [categories, setCategories] = useState<Category[]>(getInitialData());
  const [totalScore, setTotalScore] = useState<number>(0);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  const updateCandidateInfo = useCallback((field: keyof CandidateInfo, value: string) => {
    setCandidateInfo(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateScore = useCallback((categoryId: string, criterionId: string, score: number) => {
    setCategories(prev => {
      const newCategories = prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            criteria: category.criteria.map(criterion => {
              if (criterion.id === criterionId) {
                const points = calculatePoints(score, criterion.weight);
                return {
                  ...criterion,
                  score,
                  points
                };
              }
              return criterion;
            })
          };
        }
        return category;
      });

      // Calculate total score
      const newTotalScore = calculateTotalScore(newCategories);
      setTotalScore(newTotalScore);

      // Update evaluation result
      const candidateName = candidateInfo.name || 'Candidato';
      const result = getEvaluationResult(newTotalScore, candidateName);
      setEvaluationResult(result);

      return newCategories;
    });
  }, [candidateInfo.name]);

  const resetScorecard = useCallback(() => {
    setCandidateInfo({
      name: '',
      interviewer: '',
      date: '',
      position: ''
    });
    setCategories(getInitialData());
    setTotalScore(0);
    setEvaluationResult(null);
  }, []);

  return {
    candidateInfo,
    categories,
    totalScore,
    evaluationResult,
    updateCandidateInfo,
    updateScore,
    resetScorecard
  };
};
