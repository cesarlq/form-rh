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
    <div className="max-w-4xl mx-auto bg-card rounded-lg border border-border shadow-sm overflow-hidden my-8 print-text-black">
      {/* Header */}
      <div className="bg-primary text-white p-6 text-left">
        <h1 className="text-3xl font-semibold">Evaluación de Candidatos</h1>
        <p className="text-lg opacity-90">Scorecard de Evaluación T1</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Candidate Information */}
        <CandidateInfo
          candidateInfo={candidateInfo}
          onUpdate={updateCandidateInfo}
        />

        {/* Instructions & T1 Standard */}
        <div className="p-5 rounded-md border border-border bg-background">
          <h3 className="text-foreground font-semibold mb-3 text-lg">Instrucciones y Estándares</h3>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            <li className="flex items-start">
              <span className="text-primary mr-2">●</span>
              <span><strong>Escala:</strong> 1-5 (1=Deficiente, 2=Básico, 3=Competente, 4=Avanzado, 5=Rockstar)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">●</span>
              <span><strong>Mínimo para pasar:</strong> 75/100 puntos totales</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">●</span>
              <span><strong>Criterios eliminatorios:</strong> Cualquier 1 o 2 en categorías técnicas críticas</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">●</span>
              <span><strong>Cultura T1:</strong> Mínimo 4/5 en todos los criterios culturales</span>
            </li>
          </ul>
          <p className="text-sm text-foreground">
            <strong className="font-semibold">🎯 Estándar T1:</strong> Buscamos el top 5% del mercado. Un candidato promedio es un NO automático.
          </p>
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

        {/* Red Flags Section */}
        <div className="p-5 rounded-md border border-red-500/50 bg-red-500/5">
          <h3 className="text-red-700 font-semibold mb-3 text-lg">Señales de Alerta - Descarte Inmediato</h3>
          <ul className="space-y-2 text-sm text-red-700/90">
            {[
              "No puede explicar arquitectura de proyectos anteriores",
              "Solo ha trabajado en proyectos pequeños o personales",
              "No entiende conceptos de performance o escalabilidad",
              "Actitud pasiva, espera que le digan qué hacer",
              "No muestra curiosidad técnica o ganas de aprender"
            ].map(flag => (
              <li key={flag} className="flex items-start">
                <span className="text-red-500 font-bold mr-2">✗</span>
                <span><strong>Red Flag:</strong> {flag}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-border">
          {/* PDF Generator */}
          <PDFGenerator
            candidateInfo={candidateInfo}
            categories={categories}
            evaluationResult={evaluationResult}
            totalScore={totalScore}
          />
          {/* Reset Button */}
          <button
            onClick={resetScorecard}
            className="bg-muted-foreground/20 hover:bg-muted-foreground/30 text-foreground py-2 px-5 rounded-md font-medium transition-colors duration-200 text-sm"
          >
            Reiniciar Evaluación
          </button>
        </div>
      </div>
    </div>
  );
}
