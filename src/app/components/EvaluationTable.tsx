'use client';

import React from 'react';
import { Category } from '@/lib/types';

interface EvaluationTableProps {
  categories: Category[];
  totalScore: number;
  onScoreUpdate: (categoryId: string, criterionId: string, score: number) => void;
}

export default function EvaluationTable({ categories, totalScore, onScoreUpdate }: EvaluationTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground p-4 border-b border-border">Tabla de Evaluación</h3>
      <table className="w-full text-sm">
        <thead className="bg-background">
          <tr>
            <th className="p-3 text-left font-semibold text-muted-foreground w-1/4">Categoría / Criterio</th>
            <th className="p-3 text-left font-semibold text-muted-foreground w-2/5">Descripción / Evidencia</th>
            <th className="p-3 text-center font-semibold text-muted-foreground w-[10%]">Peso</th>
            <th className="p-3 text-center font-semibold text-muted-foreground w-[15%]">Score (1-5)</th>
            <th className="p-3 text-center font-semibold text-muted-foreground w-[10%]">Puntos</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              {/* Category Header */}
              <tr className="bg-background/50">
                <td colSpan={5} className="p-3 font-semibold text-foreground">
                  {category.name.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim()}
                </td>
              </tr>
              
              {/* Category Criteria */}
              {category.criteria.map((criterion) => (
                <tr 
                  key={criterion.id} 
                  className="hover:bg-muted-foreground/5 transition-colors duration-150"
                >
                  <td className="p-3 text-foreground align-top">
                    {criterion.name}
                  </td>
                  <td className="p-3 text-muted-foreground align-top text-xs">
                    {criterion.description}
                  </td>
                  <td className="p-3 text-center text-foreground align-top">
                    {criterion.weight}%
                  </td>
                  <td className="p-3 text-center align-top">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={criterion.score || ''}
                      onChange={(e) => {
                        const rawValue = e.target.value;
                        if (rawValue === '') {
                           onScoreUpdate(category.id, criterion.id, 0); // Allow clearing the input
                           return;
                        }
                        const score = parseInt(rawValue);
                        if (!isNaN(score) && score >= 1 && score <= 5) {
                          onScoreUpdate(category.id, criterion.id, score);
                        } else if (!isNaN(score) && (score < 1 || score > 5)) {
                          // Optionally handle out-of-range input, e.g., by clamping or ignoring
                          // For now, let's clamp to the nearest valid value if needed or just prevent update.
                          // This example prevents update for out-of-range numbers.
                        }
                      }}
                      className="w-16 p-1.5 border border-border rounded-md text-center bg-background focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="-"
                    />
                  </td>
                  <td className="p-3 text-center font-medium text-foreground align-top">
                    {criterion.points.toFixed(1)}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          
          {/* Total Row */}
          <tr className="bg-primary text-white font-semibold">
            <td className="p-3" colSpan={2}>
              TOTAL
            </td>
            <td className="p-3 text-center">
              100%
            </td>
            <td className="p-3 text-center">
              -
            </td>
            <td className="p-3 text-center">
              {totalScore.toFixed(1)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
