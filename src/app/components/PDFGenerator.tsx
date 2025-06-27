'use client';

import { useState } from 'react';
import { CandidateInfo, Category, EvaluationResult } from '@/lib/types';

interface PDFGeneratorProps {
  candidateInfo: CandidateInfo;
  categories: Category[];
  evaluationResult: EvaluationResult | null;
  totalScore: number;
}

export default function PDFGenerator({ candidateInfo, categories, evaluationResult, totalScore }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!evaluationResult) return;

    setIsGenerating(true);

    try {
      // Dynamic import to avoid SSR issues
      const { jsPDF } = await import('jspdf');
      
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(30, 60, 114);
      pdf.text('T1 Frontend Developer - Evaluación', 20, 30);
      
      // Candidate info
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Candidato: ${candidateInfo.name || 'N/A'}`, 20, 50);
      pdf.text(`Evaluador: ${candidateInfo.interviewer || 'N/A'}`, 20, 60);
      pdf.text(`Fecha: ${candidateInfo.date || 'N/A'}`, 20, 70);
      pdf.text(`Posición: ${candidateInfo.position || 'Frontend Developer'}`, 20, 80);
      
      // Separator line
      pdf.line(20, 90, 190, 90);
      
      // Total score
      pdf.setFontSize(16);
      pdf.setTextColor(30, 60, 114);
      pdf.text(`PUNTUACIÓN TOTAL: ${totalScore.toFixed(1)}/100`, 20, 110);
      
      // Result
      let resultColor: [number, number, number];
      if (evaluationResult.status === 'rockstar') {
        resultColor = [22, 163, 74]; // Green
      } else if (evaluationResult.status === 'solid') {
        resultColor = [217, 119, 6]; // Yellow
      } else {
        resultColor = [220, 38, 38]; // Red
      }
      
      pdf.setTextColor(...resultColor);
      const resultText = evaluationResult.message.replace(/🚀|⚡|❌/g, '').trim();
      pdf.text(resultText, 20, 125);
      
      // Category breakdown
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      let yPosition = 145;
      
      pdf.text('DESGLOSE POR CATEGORÍAS:', 20, yPosition);
      yPosition += 15;
      
      categories.forEach(category => {
        const categoryTotal = category.criteria.reduce((sum, criterion) => sum + criterion.points, 0);
        const categoryMax = category.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
        
        pdf.text(`• ${category.name}: ${categoryTotal.toFixed(1)}/${categoryMax} puntos`, 25, yPosition);
        yPosition += 10;
      });
      
      // Detailed criteria
      yPosition += 10;
      pdf.text('CRITERIOS EVALUADOS:', 20, yPosition);
      yPosition += 10;
      
      categories.forEach(category => {
        category.criteria.forEach(criterion => {
          if (criterion.score > 0) {
            if (yPosition > 270) {
              pdf.addPage();
              yPosition = 20;
            }
            
            pdf.setFontSize(10);
            pdf.text(`• ${criterion.name}: ${criterion.score}/5 (${criterion.points.toFixed(1)} pts)`, 25, yPosition);
            yPosition += 8;
          }
        });
      });
      
      // Footer
      const pageCount = (pdf as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`Página ${i} de ${pageCount} - Generado el ${new Date().toLocaleDateString()}`, 20, 285);
        pdf.text('T1 Talent Hunter - Solo Rockstars', 150, 285);
      }
      
      // Download
      const fileName = `T1_Evaluacion_${(candidateInfo.name || 'Candidato').replace(/\s+/g, '_')}_${candidateInfo.date || new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!evaluationResult) return null;

  return (
    <div className="text-center p-5 mx-5">
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="bg-gradient-to-r from-green-600 to-green-500 text-white border-none py-4 px-8 rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isGenerating ? (
          <>
            <span className="inline-block animate-spin mr-2">⏳</span>
            Generando PDF...
          </>
        ) : (
          <>
            📄 Descargar Evaluación en PDF
          </>
        )}
      </button>
    </div>
  );
}
