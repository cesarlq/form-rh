'use client';

import { EvaluationResult, CandidateInfo } from '@/lib/types';

interface ResultDisplayProps {
  evaluationResult: EvaluationResult | null;
  candidateInfo: CandidateInfo;
}

export default function ResultDisplay({ evaluationResult, candidateInfo }: ResultDisplayProps) {
  if (!evaluationResult) return null;

  return (
    <div className={`mx-5 my-5 p-5 rounded-xl text-center text-lg font-semibold border-2 ${evaluationResult.className}`}>
      <div className="mb-2">
        {evaluationResult.message}
      </div>
      <div className="text-sm opacity-80">
        Evaluado por: {candidateInfo.interviewer || 'N/A'} | 
        Fecha: {candidateInfo.date || 'N/A'} | 
        Posición: {candidateInfo.position || 'Frontend Developer'}
      </div>
    </div>
  );
}
