'use client';

import { useScorecard } from '@/hooks/useScorecard';
import CandidateInfo from './components/CandidateInfo';
import EvaluationTable from './components/EvaluationTable';
import ResultDisplay from './components/ResultDisplay';
import PDFGenerator from './components/PDFGenerator';

export default function Home() {
  const {
    candidateInfo,
    categories,
    totalScore,
    evaluationResult,
    updateCandidateInfo,
    updateScore,
    resetScorecard
  } = useScorecard();

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-3">🎯  T1 Evaluación de Candidatos</h1>
        <p className="text-xl opacity-90">Scorecard de Evaluación - Solo para Rockstars</p>
      </div>

      {/* Candidate Information */}
      <CandidateInfo 
        candidateInfo={candidateInfo}
        onUpdate={updateCandidateInfo}
      />

      {/* Instructions */}
      <div className="bg-blue-50 mx-5 my-5 p-5 rounded-xl border-l-4 border-blue-600">
        <h3 className="text-blue-900 font-semibold mb-3">🚀 Instrucciones de Evaluación</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">✓</span>
            <span><strong>Escala:</strong> 1-5 (1=Deficiente, 2=Básico, 3=Competente, 4=Avanzado, 5=Rockstar)</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">✓</span>
            <span><strong>Mínimo para pasar:</strong> 75/100 puntos totales</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">✓</span>
            <span><strong>Criterios eliminatorios:</strong> Cualquier 1 o 2 en categorías técnicas críticas</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">✓</span>
            <span><strong>Cultura T1:</strong> Mínimo 4/5 en todos los criterios culturales</span>
          </li>
        </ul>
      </div>

      {/* T1 Standard Info */}
      <div className="bg-blue-50 mx-5 my-5 p-5 rounded-lg border-l-4 border-blue-600">
        <strong className="text-blue-900">🎯 Estándar T1:</strong> Buscamos el top 5% del mercado. Un candidato promedio es un NO automático.
      </div>

      {/* Evaluation Table */}
      <EvaluationTable 
        categories={categories}
        totalScore={totalScore}
        onScoreUpdate={updateScore}
      />

      {/* Result Display */}
      <ResultDisplay 
        evaluationResult={evaluationResult}
        candidateInfo={candidateInfo}
      />

      {/* PDF Generator */}
      <PDFGenerator 
        candidateInfo={candidateInfo}
        categories={categories}
        evaluationResult={evaluationResult}
        totalScore={totalScore}
      />

      {/* Red Flags Section */}
      <div className="bg-blue-50 mx-5 my-5 p-5 rounded-xl border-l-4 border-blue-600">
        <h3 className="text-blue-900 font-semibold mb-3">🚨 SEÑALES DE ALERTA - DESCARTE INMEDIATO</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">✗</span>
            <span><strong>Red Flag:</strong> No puede explicar arquitectura de proyectos anteriores</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">✗</span>
            <span><strong>Red Flag:</strong> Solo ha trabajado en proyectos pequeños o personales</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">✗</span>
            <span><strong>Red Flag:</strong> No entiende conceptos de performance o escalabilidad</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">✗</span>
            <span><strong>Red Flag:</strong> Actitud pasiva, espera que le digan qué hacer</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">✗</span>
            <span><strong>Red Flag:</strong> No muestra curiosidad técnica o ganas de aprender</span>
          </li>
        </ul>
      </div>

      {/* Reset Button */}
      <div className="text-center p-5 mx-5 border-t border-gray-200">
        <button
          onClick={resetScorecard}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200"
        >
          🔄 Reiniciar Evaluación
        </button>
      </div>
    </div>
  );
}
