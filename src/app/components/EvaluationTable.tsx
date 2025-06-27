'use client';

import { Category } from '@/lib/types';

interface EvaluationTableProps {
  categories: Category[];
  totalScore: number;
  onScoreUpdate: (categoryId: string, criterionId: string, score: number) => void;
}

export default function EvaluationTable({ categories, totalScore, onScoreUpdate }: EvaluationTableProps) {
  return (
    <div className="p-5 overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
            <th className="p-4 text-left font-semibold text-sm w-1/4">Categoría / Criterio</th>
            <th className="p-4 text-left font-semibold text-sm w-2/5">Descripción / Evidencia Requerida</th>
            <th className="p-4 text-center font-semibold text-sm w-1/10">Peso (%)</th>
            <th className="p-4 text-center font-semibold text-sm w-3/20">Score (1-5)</th>
            <th className="p-4 text-center font-semibold text-sm w-1/10">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <>
              {/* Category Header */}
              <tr key={category.id} className="bg-blue-50 font-semibold text-blue-900">
                <td colSpan={5} className="p-4 border-b border-gray-200">
                  <strong>{category.name}</strong>
                </td>
              </tr>
              
              {/* Category Criteria */}
              {category.criteria.map((criterion) => (
                <tr 
                  key={criterion.id} 
                  className="hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100"
                >
                  <td className="p-3 font-medium text-gray-700 align-top">
                    {criterion.name}
                  </td>
                  <td className="p-3 text-gray-600 align-top">
                    {criterion.description}
                  </td>
                  <td className="p-3 text-center font-semibold text-blue-600 align-top">
                    {criterion.weight}%
                  </td>
                  <td className="p-3 text-center align-top">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={criterion.score || ''}
                      onChange={(e) => {
                        const score = parseInt(e.target.value) || 0;
                        if (score >= 1 && score <= 5) {
                          onScoreUpdate(category.id, criterion.id, score);
                        }
                      }}
                      className="w-16 p-2 border-2 border-gray-300 rounded-md text-center font-semibold transition-all duration-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      placeholder="1-5"
                    />
                  </td>
                  <td className="p-3 text-center font-semibold text-gray-800 align-top">
                    {criterion.points.toFixed(1)}
                  </td>
                </tr>
              ))}
            </>
          ))}
          
          {/* Total Row */}
          <tr className="bg-blue-900 text-white font-bold">
            <td className="p-4">
              <strong>TOTAL</strong>
            </td>
            <td className="p-4">
              <strong>Suma ponderada de todos los criterios</strong>
            </td>
            <td className="p-4 text-center">
              <strong>100%</strong>
            </td>
            <td className="p-4 text-center">
              <strong>-</strong>
            </td>
            <td className="p-4 text-center">
              <strong>{totalScore.toFixed(1)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
