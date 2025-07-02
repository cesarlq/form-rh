'use client';

import { EvaluationResult, CandidateInfo } from '@/lib/types';

interface ResultDisplayProps {
  evaluationResult: EvaluationResult | null;
  candidateInfo: CandidateInfo;
}

export default function ResultDisplay({ evaluationResult, candidateInfo }: ResultDisplayProps) {
  if (!evaluationResult) return null;

  let panelStyle = "border-comic-tertiary bg-blue-100"; // Default for solid
  let textStyle = "text-comic-tertiary";
  let icon = "👍";

  if (evaluationResult.status === 'rockstar') {
    panelStyle = "border-comic-primary bg-yellow-100";
    textStyle = "text-yellow-700"; // A darker yellow for text or keep it black
    icon = "🌟";
  } else if (evaluationResult.status === 'reject') { // Corrected from 'rejected' to 'reject'
    panelStyle = "border-comic-secondary bg-red-100";
    textStyle = "text-comic-secondary";
    icon = "👎";
  }

  // Clean the message from existing emojis if any, to use our styled icon
  const cleanMessage = evaluationResult.message.replace(/⭐|👍|👎/g, '').trim();

  return (
    <div
      className={`p-6 text-center border-4 rounded-lg ${panelStyle}`}
      style={{
        boxShadow: '4px 4px 0px var(--comic-border)',
        // Simulating a speech bubble tail (optional, can be complex)
        // position: 'relative',
      }}
    >
      {/* Optional: Speech bubble tail using pseudo-elements if desired, e.g.
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-[currentColor]" style={{color: panelStyle.split(' ')[1].replace('bg-', 'border-')}}></div>
      */}
      <div className={`text-4xl mb-3 ${textStyle}`} style={{fontFamily: 'var(--font-display)'}}>
        {icon} {cleanMessage} {icon}
      </div>
      <div className="text-sm text-gray-700" style={{fontFamily: 'var(--font-body)'}}>
        Evaluado por: <strong>{candidateInfo.interviewer || 'N/A'}</strong> |
        Fecha: <strong>{candidateInfo.date || 'N/A'}</strong> |
        Posición: <strong>{candidateInfo.position || 'Frontend Developer'}</strong>
      </div>
    </div>
  );
}
