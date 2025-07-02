'use client';

import { useState } from 'react';
import { CandidateInfo, Category, EvaluationResult } from '@/lib/types';

interface PDFGeneratorProps {
  candidateInfo: CandidateInfo;
  categories: Category[];
  evaluationResult: EvaluationResult | null;
  totalScore: number;
}

// PDF styling is complex and jsPDF doesn't directly use CSS.
// For a true "comic style" PDF, images and complex vector graphics would be needed.
// This will be a simplified version, focusing on the button's style for now.
// The PDF generation logic itself will remain largely unchanged as per previous versions,
// as deep comic styling in PDF is out of scope for this incremental component update.

export default function PDFGenerator({ candidateInfo, categories, evaluationResult, totalScore }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const cleanTextForPDF = (text: string | null | undefined): string => {
    if (!text) return 'N/A';
    return text
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|🔥|🎯|⚡|🏆|🤝|🚀|❌|👤|📅|💼|⭐|👍|👎|💥|👉/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const getCategoryDisplayName = (categoryName: string): string => {
     return cleanTextForPDF(categoryName);
  };

  const generatePDF = async () => {
    if (!evaluationResult) return;
    setIsGenerating(true);

    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'pt', 'a4'); // Using points for better control

      const pageMargin = 40;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const contentWidth = pageWidth - 2 * pageMargin;
      let yPos = pageMargin;

      // Simplified Header (less comic, more functional for PDF)
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Evaluación de Candidato T1', pageMargin, yPos);
      yPos += 30;

      // Candidate Info
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const info = [
        `Candidato: ${cleanTextForPDF(candidateInfo.name)}`,
        `Evaluador: ${cleanTextForPDF(candidateInfo.interviewer)}`,
        `Fecha: ${cleanTextForPDF(candidateInfo.date)}`,
        `Posición: ${cleanTextForPDF(candidateInfo.position)}`,
      ];
      info.forEach(line => {
        pdf.text(line, pageMargin, yPos);
        yPos += 15;
      });
      yPos += 5;
      pdf.setDrawColor(180, 180, 180); // Light gray line
      pdf.line(pageMargin, yPos, pageWidth - pageMargin, yPos);
      yPos += 20;

      // Total Score & Result
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`PUNTUACIÓN TOTAL: ${totalScore.toFixed(1)}/100`, pageMargin, yPos);
      yPos += 20;

      let resultColorPDF: [number, number, number] = [0,0,0]; // black default
      if (evaluationResult.status === 'rockstar') resultColorPDF = [34, 139, 34]; // Forest Green
      else if (evaluationResult.status === 'solid') resultColorPDF = [255, 165, 0]; // Orange
      else if (evaluationResult.status === 'rejected') resultColorPDF = [220, 20, 60]; // Crimson

      pdf.setTextColor(...resultColorPDF);
      pdf.text(cleanTextForPDF(evaluationResult.message), pageMargin, yPos, { maxWidth: contentWidth });
      yPos += pdf.getTextDimensions(cleanTextForPDF(evaluationResult.message), {maxWidth: contentWidth}).h + 15;
      pdf.setTextColor(0,0,0); // Reset text color

      // Table Headers (Simplified for PDF)
      const tableHeaders = ['Categoría/Criterio', 'Descripción', 'Peso', 'Score', 'Puntos'];
      const colWidths = [contentWidth * 0.3, contentWidth * 0.35, contentWidth * 0.1, contentWidth * 0.1, contentWidth * 0.15];

      const drawPdfTableHeader = () => {
        pdf.setFillColor(230, 230, 230); // Light gray
        pdf.rect(pageMargin, yPos, contentWidth, 20, 'F');
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        let currentX = pageMargin;
        tableHeaders.forEach((header, i) => {
          pdf.text(header, currentX + 3, yPos + 14);
          currentX += colWidths[i];
        });
        yPos += 20;
      };

      const checkNewPageForPdf = (neededHeight: number) => {
        if (yPos + neededHeight > pdf.internal.pageSize.getHeight() - pageMargin) {
          pdf.addPage();
          yPos = pageMargin;
          drawPdfTableHeader();
        }
      };

      drawPdfTableHeader();

      categories.forEach(category => {
        checkNewPageForPdf(30);
        pdf.setFillColor(240, 240, 240);
        pdf.rect(pageMargin, yPos, contentWidth, 18, 'F');
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.text(getCategoryDisplayName(category.name), pageMargin + 3, yPos + 13);
        yPos += 18;

        category.criteria.forEach(criterion => {
          const critNameLines = pdf.splitTextToSize(cleanTextForPDF(criterion.name), colWidths[0] - 6);
          const descLines = pdf.splitTextToSize(cleanTextForPDF(criterion.description), colWidths[1] - 6);
          const rowHeight = Math.max(critNameLines.length, descLines.length) * 10 + 6;
          
          checkNewPageForPdf(rowHeight);
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8);

          let currentX = pageMargin;
          pdf.text(critNameLines, currentX + 3, yPos + 9);
          currentX += colWidths[0];
          pdf.text(descLines, currentX + 3, yPos + 9);
          currentX += colWidths[1];
          pdf.text(`${criterion.weight}%`, currentX + colWidths[2]/2 - pdf.getTextWidth(`${criterion.weight}%`)/2, yPos + 9 + (rowHeight-6)/2 - 4);
          currentX += colWidths[2];
          pdf.text(criterion.score > 0 ? criterion.score.toString() : '-', currentX + colWidths[3]/2 - pdf.getTextWidth(criterion.score > 0 ? criterion.score.toString() : '-')/2, yPos + 9 + (rowHeight-6)/2 - 4);
          currentX += colWidths[3];
          pdf.text(criterion.points.toFixed(1), currentX + colWidths[4]/2 - pdf.getTextWidth(criterion.points.toFixed(1))/2, yPos + 9+ (rowHeight-6)/2 - 4);
          
          pdf.setDrawColor(200, 200, 200);
          pdf.line(pageMargin, yPos + rowHeight, pageWidth - pageMargin, yPos + rowHeight);
          yPos += rowHeight;
        });
      });
      
      checkNewPageForPdf(20);
      pdf.setFillColor(200, 200, 200);
      pdf.rect(pageMargin, yPos, contentWidth, 20, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text('TOTAL', pageMargin + 3, yPos + 14);
      pdf.text('100%', pageMargin + colWidths[0] + colWidths[1] + colWidths[2]/2 - pdf.getTextWidth('100%')/2, yPos + 14);
      pdf.text(totalScore.toFixed(1),pageMargin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4]/2 - pdf.getTextWidth(totalScore.toFixed(1))/2, yPos + 14);
      yPos += 20;

      // Footer
      const pageCount = (pdf as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`Página ${i} de ${pageCount} - Generado el ${new Date().toLocaleDateString()}`, pageMargin, pdf.internal.pageSize.getHeight() - 20);
      }

      const fileName = `T1_Evaluacion_${cleanTextForPDF(candidateInfo.name).replace(/\s+/g, '_')}_${cleanTextForPDF(candidateInfo.date)}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intente de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!evaluationResult && !candidateInfo.name) return null; // Only show if there's something to generate

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="px-8 py-4 bg-comic-primary text-black font-bold rounded-lg border-2 border-black shadow-md hover:bg-yellow-400 active:bg-yellow-500 transform hover:scale-105 active:scale-95 transition-all duration-150 text-xl no-print"
      style={{ fontFamily: 'var(--font-display)', boxShadow: '3px 3px 0px var(--comic-border)', WebkitTextStroke: '0.5px black', letterSpacing: '0.05em' }}
    >
      {isGenerating ? (
        <>
          <span className="inline-block animate-spin mr-2">⏳</span>
          ¡CREANDO PDF!
        </>
      ) : (
        '📄 ¡Descargar PDF!'
      )}
    </button>
  );
}
