'use client';

import { EvaluationResult, CandidateInfo } from '@/lib/types';

interface ResultDisplayProps {
  evaluationResult: EvaluationResult | null;
  candidateInfo: CandidateInfo;
}

export default function ResultDisplay({ evaluationResult, candidateInfo }: ResultDisplayProps) {
  if (!evaluationResult) return null;

  let bgColor = 'bg-background';
  let textColor = 'text-foreground';
  let borderColor = 'border-border';

  if (evaluationResult.status === 'rockstar') {
    bgColor = 'bg-green-500/10';
    textColor = 'text-green-700';
    borderColor = 'border-green-500/50';
  } else if (evaluationResult.status === 'solid') {
    bgColor = 'bg-yellow-500/10';
    textColor = 'text-yellow-700';
    borderColor = 'border-yellow-500/50';
  } else if (evaluationResult.status === 'rejected') {
    bgColor = 'bg-red-500/10';
    textColor = 'text-red-700';
    borderColor = 'border-red-500/50';
  }

  return (
    <div className={`p-5 rounded-md text-center border ${borderColor} ${bgColor}`}>
      <div className={`text-lg font-semibold ${textColor} mb-2`}>
        {evaluationResult.message.replace(/⭐|👍|👎/g, '').trim()}
      </div>
      <div className="text-xs text-muted-foreground">
        Evaluado por: {candidateInfo.interviewer || 'N/A'} | 
        Fecha: {candidateInfo.date || 'N/A'} | 
        Posición: {candidateInfo.position || 'Frontend Developer'}
      </div>
    </div>
  );
}
