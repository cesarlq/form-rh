'use client';

import React from 'react';
import { Category } from '@/lib/types';

interface EvaluationTableProps {
  categories: Category[];
  totalScore: number;
  onScoreUpdate: (categoryId: string, criterionId: string, score: number) => void;
}

const thClass = "p-3 text-left text-lg border-2 border-black bg-comic-tertiary text-white";
const tdClass = "p-3 border-2 border-black align-top";
const inputClass = "w-20 p-2 border-2 border-black rounded-md text-center font-bold text-lg focus:border-comic-secondary focus:ring-2 focus:ring-comic-primary";

export default function EvaluationTable({ categories, totalScore, onScoreUpdate }: EvaluationTableProps) {
  // Function to remove emojis from category names for cleaner display
  const cleanCategoryName = (name: string) => {
    return name.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
  };

  return (
    <div className="overflow-x-auto p-1"> {/* Slight padding for the outer container of the table */}
      <table className="w-full border-collapse border-4 border-black bg-white shadow-md" style={{boxShadow: '4px 4px 0px var(--comic-border)'}}>
        <thead>
          <tr style={{ fontFamily: 'var(--font-display)'}}>
            <th className={`${thClass} w-1/4`}>Categoría / Criterio</th>
            <th className={`${thClass} w-2/5`}>Descripción / Evidencia</th>
            <th className={`${thClass} w-1/10 text-center`}>Peso (%)</th>
            <th className={`${thClass} w-3/20 text-center`}>Score (1-5)</th>
            <th className={`${thClass} w-1/10 text-center`}>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              {/* Category Header */}
              <tr className="bg-comic-primary">
                <td colSpan={5} className={`${tdClass} font-bold text-2xl text-black`} style={{ fontFamily: 'var(--font-display)', WebkitTextStroke: '0.5px black', letterSpacing: '0.05em' }}>
                  {cleanCategoryName(category.name)}
                </td>
              </tr>
              
              {/* Category Criteria */}
              {category.criteria.map((criterion) => (
                <tr 
                  key={criterion.id} 
                  className="hover:bg-yellow-100 transition-colors duration-150"
                >
                  <td className={`${tdClass} font-bold`}>
                    {criterion.name}
                  </td>
                  <td className={`${tdClass} text-sm`}>
                    {criterion.description}
                  </td>
                  <td className={`${tdClass} text-center font-bold text-comic-tertiary text-xl`}>
                    {criterion.weight}%
                  </td>
                  <td className={`${tdClass} text-center`}>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={criterion.score || ''}
                      onChange={(e) => {
                        const rawValue = e.target.value;
                        if (rawValue === '') {
                           onScoreUpdate(category.id, criterion.id, 0);
                           return;
                        }
                        const score = parseInt(rawValue);
                        if (!isNaN(score) && score >= 1 && score <= 5) {
                          onScoreUpdate(category.id, criterion.id, score);
                        }
                      }}
                      className={inputClass}
                      placeholder="?"
                    />
                  </td>
                  <td className={`${tdClass} text-center font-bold text-2xl text-comic-secondary`}>
                    {criterion.points.toFixed(1)}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          
          {/* Total Row */}
          <tr className="bg-comic-secondary text-black" style={{ fontFamily: 'var(--font-display)'}}>
            <td className={`${tdClass} text-3xl`} colSpan={2} style={{ WebkitTextStroke: '1px white', paintOrder: 'stroke fill' }}>
              ¡TOTAL!
            </td>
            <td className={`${tdClass} text-center text-2xl`} style={{ WebkitTextStroke: '1px white', paintOrder: 'stroke fill' }}>
              100%
            </td>
            <td className={`${tdClass} text-center text-2xl`}>
              💥 {/* Emoji might be fine as is, or consider a text stroke if it blends */}
            </td>
            <td className={`${tdClass} text-center text-4xl`} style={{ WebkitTextStroke: '1px white', paintOrder: 'stroke fill' }}>
              {totalScore.toFixed(1)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
