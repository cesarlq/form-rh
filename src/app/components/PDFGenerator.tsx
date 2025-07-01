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

  // Function to clean text for PDF generation
  const cleanTextForPDF = (text: string): string => {
    return text
      // Remove all emojis
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      // Replace specific emoji patterns
      .replace(/🔥|🎯|⚡|🏆|🤝|🚀|❌|👤|📅|💼/g, '')
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Function to get category name without emojis
  const getCategoryDisplayName = (categoryName: string): string => {
    const categoryMap: { [key: string]: string } = {
      '🔥 CULTURA T1 (30%)': 'CULTURA T1 (30%)',
      '⚡ TÉCNICO AVANZADO (40%)': 'TECNICO AVANZADO (40%)',
      '🏆 EXPERIENCIA ESPECÍFICA (20%)': 'EXPERIENCIA ESPECIFICA (20%)',
      '🤝 SOFT SKILLS CRÍTICAS (10%)': 'SOFT SKILLS CRITICAS (10%)'
    };
    
    return categoryMap[categoryName] || cleanTextForPDF(categoryName);
  };

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
      pdf.text(' T1 Candidatos - Evaluación', 20, 30);
      
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
      const resultText = cleanTextForPDF(evaluationResult.message);
      pdf.text(resultText, 20, 125);
      
      // Create table with visual format
      let yPosition = 145;
      
      // Table header
      pdf.setFillColor(30, 60, 114); // Blue header
      pdf.rect(20, yPosition, 170, 12, 'F');
      pdf.setTextColor(255, 255, 255); // White text
      pdf.setFontSize(10);
      pdf.text('Categoria / Criterio', 25, yPosition + 8);
      pdf.text('Descripcion / Evidencia Requerida', 70, yPosition + 8);
      pdf.text('Peso (%)', 130, yPosition + 8);
      pdf.text('Score (1-5)', 150, yPosition + 8);
      pdf.text('Puntos', 170, yPosition + 8);
      
      yPosition += 12;
      
      categories.forEach(category => {
        // Check if we need a new page
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
          
          // Repeat header on new page
          pdf.setFillColor(30, 60, 114);
          pdf.rect(20, yPosition, 170, 12, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(10);
          pdf.text('Categoria / Criterio', 25, yPosition + 8);
          pdf.text('Descripcion / Evidencia Requerida', 70, yPosition + 8);
          pdf.text('Peso (%)', 130, yPosition + 8);
          pdf.text('Score (1-5)', 150, yPosition + 8);
          pdf.text('Puntos', 170, yPosition + 8);
          yPosition += 12;
        }
        
        // Category header row
        pdf.setFillColor(240, 244, 255); // Light blue background
        pdf.rect(20, yPosition, 170, 10, 'F');
        pdf.setTextColor(30, 60, 114); // Blue text
        pdf.setFontSize(9);
        const cleanCategoryName = getCategoryDisplayName(category.name);
        pdf.text(cleanCategoryName, 25, yPosition + 7);
        
        // Category border
        pdf.setDrawColor(200, 200, 200);
        pdf.rect(20, yPosition, 170, 10);
        
        yPosition += 10;
        
        // Category criteria
        category.criteria.forEach(criterion => {
          if (yPosition > 270) {
            pdf.addPage();
            yPosition = 20;
            
            // Repeat header on new page
            pdf.setFillColor(30, 60, 114);
            pdf.rect(20, yPosition, 170, 12, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(10);
            pdf.text('Categoria / Criterio', 25, yPosition + 8);
            pdf.text('Descripcion / Evidencia Requerida', 70, yPosition + 8);
            pdf.text('Peso (%)', 130, yPosition + 8);
            pdf.text('Score (1-5)', 150, yPosition + 8);
            pdf.text('Puntos', 170, yPosition + 8);
            yPosition += 12;
          }
          
          // Criterion row background
          pdf.setFillColor(255, 255, 255); // White background
          pdf.rect(20, yPosition, 170, 12, 'F');
          
          // Criterion content
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(8);
          
          // Criterion name (truncate if too long)
          const cleanCriterionName = cleanTextForPDF(criterion.name);
          const truncatedName = cleanCriterionName.length > 20 ? 
            cleanCriterionName.substring(0, 20) + '...' : cleanCriterionName;
          pdf.text(truncatedName, 25, yPosition + 8);
          
          // Description (truncate if too long)
          const cleanDescription = cleanTextForPDF(criterion.description);
          const truncatedDesc = cleanDescription.length > 35 ? 
            cleanDescription.substring(0, 35) + '...' : cleanDescription;
          pdf.text(truncatedDesc, 70, yPosition + 8);
          
          // Weight
          pdf.setTextColor(42, 82, 152); // Blue color for weight
          pdf.text(`${criterion.weight}%`, 135, yPosition + 8);
          
          // Score
          pdf.setTextColor(0, 0, 0);
          if (criterion.score > 0) {
            pdf.text(criterion.score.toString(), 155, yPosition + 8);
          } else {
            pdf.text('-', 155, yPosition + 8);
          }
          
          // Points
          pdf.text(criterion.points.toFixed(1), 175, yPosition + 8);
          
          // Row border
          pdf.setDrawColor(229, 231, 235);
          pdf.rect(20, yPosition, 170, 12);
          
          yPosition += 12;
        });
      });
      
      // Total row
      if (yPosition > 260) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFillColor(30, 60, 114); // Dark blue background
      pdf.rect(20, yPosition, 170, 12, 'F');
      pdf.setTextColor(255, 255, 255); // White text
      pdf.setFontSize(10);
      pdf.text('TOTAL', 25, yPosition + 8);
      pdf.text('Suma ponderada de todos los criterios', 70, yPosition + 8);
      pdf.text('100%', 135, yPosition + 8);
      pdf.text('-', 155, yPosition + 8);
      pdf.text(totalScore.toFixed(1), 175, yPosition + 8);
      
      // Footer
      try {
        const pageCount = (pdf as unknown as { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.setTextColor(128, 128, 128);
          pdf.text(`Página ${i} de ${pageCount} - Generado el ${new Date().toLocaleDateString()}`, 20, 285);
          pdf.text('T1 Talent Hunter - Solo Rockstars', 150, 285);
        }
      } catch (footerError) {
        // If footer fails, continue without it
        console.warn('Could not add footer to PDF:', footerError);
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
