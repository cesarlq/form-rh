'use client';

import { useScorecard } from '@/hooks/useScorecard';
import CandidateInfo from './components/CandidateInfo';
import EvaluationTable from './components/EvaluationTable';
import ResultDisplay from './components/ResultDisplay';
import PDFGenerator from './components/PDFGenerator';

// Helper component for comic-style list items
const ComicListItem = ({ children, icon }: { children: React.ReactNode, icon: string }) => (
  <li className="flex items-start mb-2">
    <span className="text-2xl mr-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--comic-secondary)'}}>{icon}</span>
    <span className="text-black">{children}</span>
  </li>
);

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
    <div className="max-w-5xl mx-auto p-4 md:p-6 comic-panel bg-white" style={{boxShadow: '8px 8px 0px var(--comic-border)'}}>
      {/* Header */}
      <header className="text-center py-6 mb-8 border-b-4 border-black comic-panel" style={{ backgroundColor: 'var(--comic-primary)'}}>
        <h1 className="text-5xl md:text-6xl" style={{ textShadow: '3px 3px 0px var(--comic-secondary), -3px -3px 0px var(--comic-tertiary)' }}>
          T1 Evaluación de Candidatos!!
        </h1>
        <p className="text-2xl mt-2" style={{ fontFamily: 'var(--font-body)', fontWeight: 'bold', color: 'var(--comic-text)', textShadow: '1px 1px 0px #fff' }}>
          Scorecard de Evaluación - ¡Solo para Rockstars!
        </p>
      </header>

      <main className="space-y-10">
        {/* Candidate Information Panel */}
        <section className="comic-panel" aria-labelledby="candidate-info-heading">
          <h2 id="candidate-info-heading" className="text-3xl mb-4 text-center" style={{color: 'var(--comic-tertiary)'}}>¡Datos del Aspirante!</h2>
          <CandidateInfo
            candidateInfo={candidateInfo}
            onUpdate={updateCandidateInfo}
          />
        </section>

        {/* Instructions & Standards Panel */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="comic-panel" aria-labelledby="instructions-heading">
            <h2 id="instructions-heading" className="text-3xl mb-4" style={{color: 'var(--comic-secondary)'}}>¡Instrucciones!</h2>
            <ul className="list-none p-0">
              <ComicListItem icon="👉"><strong>Escala:</strong> 1-5 (1=Meh, 2=OK, 3=¡Bien!, 4=¡Genial!, 5=¡ROCKSTAR!)</ComicListItem>
              <ComicListItem icon="👉"><strong>Mínimo para pasar:</strong> 75/100 puntos totales</ComicListItem>
              <ComicListItem icon="👉"><strong>Criterios KO:</strong> 1 o 2 en categorías técnicas CRÍTICAS</ComicListItem>
              <ComicListItem icon="👉"><strong>Cultura T1:</strong> Mínimo 4/5 en TODO lo cultural</ComicListItem>
            </ul>
          </section>

          <section className="comic-panel flex flex-col justify-center items-center text-center" aria-labelledby="t1-standard-heading" style={{backgroundColor: 'var(--comic-tertiary)'}}>
            <h2 id="t1-standard-heading" className="text-3xl mb-3" style={{color: 'var(--comic-primary)'}}>¡Estándar T1!</h2>
            <p className="text-xl font-bold text-white" style={{textShadow: '2px 2px 0 var(--comic-border)'}}>
              Buscamos el TOP 5% del mercado. Un candidato promedio es un... <strong className="text-5xl block mt-2" style={{fontFamily: 'var(--font-display)', color: 'var(--comic-secondary)', WebkitTextStroke: '2px black'}}>NO!</strong>
            </p>
          </section>
        </div>

        {/* Evaluation Table Panel */}
        <section className="comic-panel" aria-labelledby="evaluation-table-heading">
          <h2 id="evaluation-table-heading" className="text-4xl mb-6 text-center" style={{color: 'var(--comic-primary)', WebkitTextStroke: '1.5px black'}}>¡A Evaluar!</h2>
          <EvaluationTable
            categories={categories}
            totalScore={totalScore}
            onScoreUpdate={updateScore}
          />
        </section>

        {/* Result Display Panel (if available) */}
        {evaluationResult && (
          <section className="comic-panel" aria-labelledby="results-heading">
             <h2 id="results-heading" className="text-3xl mb-4 text-center" style={{color: 'var(--comic-tertiary)'}}>¡El Veredicto!</h2>
            <ResultDisplay
              evaluationResult={evaluationResult}
              candidateInfo={candidateInfo}
            />
          </section>
        )}

        {/* Red Flags Panel */}
        <section className="comic-panel" aria-labelledby="red-flags-heading" style={{borderColor: 'var(--comic-secondary)', boxShadow: '5px 5px 0px var(--comic-secondary)'}}>
          <h2 id="red-flags-heading" className="text-4xl mb-4 text-center" style={{color: 'var(--comic-secondary)'}}>¡ALTO AHÍ!</h2>
          <h3 className="text-2xl mb-4 text-center font-bold" style={{fontFamily: 'var(--font-body)'}}>SEÑALES DE ALERTA - ¡DESCARTE INMEDIATO!</h3>
          <ul className="list-none p-0">
            <ComicListItem icon="💥"><strong>Red Flag:</strong> No puede explicar arquitectura de proyectos anteriores</ComicListItem>
            <ComicListItem icon="💥"><strong>Red Flag:</strong> Solo ha trabajado en proyectos pequeños o personales</ComicListItem>
            <ComicListItem icon="💥"><strong>Red Flag:</strong> No entiende conceptos de performance o escalabilidad</ComicListItem>
            <ComicListItem icon="💥"><strong>Red Flag:</strong> Actitud pasiva, espera que le digan qué hacer</ComicListItem>
            <ComicListItem icon="💥"><strong>Red Flag:</strong> No muestra curiosidad técnica o ganas de aprender</ComicListItem>
          </ul>
        </section>

        {/* Action Buttons Panel */}
        <section className="comic-panel text-center py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <PDFGenerator
              candidateInfo={candidateInfo}
              categories={categories}
              evaluationResult={evaluationResult}
              totalScore={totalScore}
            />
            <button
              onClick={resetScorecard}
              className="px-8 py-3 bg-gray-600 text-white font-bold rounded-lg border-2 border-black shadow-md hover:bg-gray-700 active:bg-gray-800 transform hover:scale-105 active:scale-95 transition-all duration-150"
              style={{ fontFamily: 'var(--font-body)', boxShadow: '3px 3px 0px var(--comic-border)'}}
            >
              🔄 ¡Empezar de Nuevo!
            </button>
          </div>
        </section>
      </main>

      <footer className="text-center mt-12 py-4 border-t-4 border-black">
        <p className="text-sm" style={{fontFamily: 'var(--font-body)'}}>© {new Date().getFullYear()} T1 Talent Evaluator - Comic Edition</p>
      </footer>
    </div>
  );
}
