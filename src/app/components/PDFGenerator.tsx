'use client';

import { useState } from 'react';
import { CandidateInfo, Category, EvaluationResult } from '@/lib/types';

interface PDFGeneratorProps {
  candidateInfo: CandidateInfo;
  categories: Category[];
  evaluationResult: EvaluationResult | null;
  totalScore: number;
}

// Primary color (blue)
const PRIMARY_COLOR: [number, number, number] = [59, 130, 246]; // Corresponds to Tailwind's blue-500
// Text color (dark gray)
const TEXT_COLOR: [number, number, number] = [31, 41, 55]; // Corresponds to Tailwind's gray-800
// Muted text color (medium gray)
const MUTED_TEXT_COLOR: [number, number, number] = [107, 114, 128]; // Corresponds to Tailwind's gray-500
// Border color (light gray)
const BORDER_COLOR: [number, number, number] = [229, 231, 235]; // Corresponds to Tailwind's gray-200
// Background color for table headers (lighter gray)
const HEADER_BG_COLOR: [number, number, number] = [243, 244, 246]; // Corresponds to Tailwind's gray-100


export default function PDFGenerator({ candidateInfo, categories, evaluationResult, totalScore }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const cleanText = (text: string | undefined | null): string => {
    if (!text) return 'N/A';
    return text
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      .replace(/🔥|🎯|⚡|🏆|🤝|🚀|❌|👤|📅|💼|⭐|👍|👎/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const generatePDF = async () => {
    if (!evaluationResult) return;
    setIsGenerating(true);

    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'pt', 'a4'); // Using points for better control, A4 size

      const pageMargin = 40;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const contentWidth = pageWidth - 2 * pageMargin;
      let yPos = pageMargin;

      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(...PRIMARY_COLOR);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Evaluación de Candidato T1', pageMargin, yPos);
      yPos += 30;

      // Candidate Info
      pdf.setFontSize(10);
      pdf.setTextColor(...TEXT_COLOR);
      pdf.setFont('helvetica', 'normal');
      const infoPairs = [
        { label: 'Candidato:', value: cleanText(candidateInfo.name) },
        { label: 'Evaluador:', value: cleanText(candidateInfo.interviewer) },
        { label: 'Fecha:', value: cleanText(candidateInfo.date) },
        { label: 'Posición:', value: cleanText(candidateInfo.position) },
      ];
      infoPairs.forEach(pair => {
        pdf.text(`${pair.label} ${pair.value}`, pageMargin, yPos);
        yPos += 15;
      });
      yPos += 10; // Extra space before separator

      // Separator
      pdf.setDrawColor(...BORDER_COLOR);
      pdf.line(pageMargin, yPos, pageWidth - pageMargin, yPos);
      yPos += 25;

      // Total Score & Result
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...PRIMARY_COLOR);
      pdf.text(`Puntuación Total: ${totalScore.toFixed(1)}/100`, pageMargin, yPos);
      yPos += 20;

      let resultColor: [number, number, number];
      if (evaluationResult.status === 'rockstar') resultColor = [22, 163, 74]; // Green-600
      else if (evaluationResult.status === 'solid') resultColor = [202, 138, 4]; // Amber-600
      else resultColor = [220, 38, 38]; // Red-600

      pdf.setTextColor(...resultColor);
      pdf.setFontSize(12);
      pdf.text(cleanText(evaluationResult.message), pageMargin, yPos, { maxWidth: contentWidth });
      yPos += pdf.getTextDimensions(cleanText(evaluationResult.message), { maxWidth: contentWidth }).h + 20;


      // Table
      const tableHeaders = ['Categoría / Criterio', 'Descripción / Evidencia', 'Peso', 'Score', 'Puntos'];
      const colWidths = [contentWidth * 0.28, contentWidth * 0.37, contentWidth * 0.1, contentWidth * 0.1, contentWidth * 0.15];

      const drawTableHeader = () => {
        pdf.setFillColor(...HEADER_BG_COLOR);
        pdf.rect(pageMargin, yPos, contentWidth, 20, 'F');
        pdf.setTextColor(...TEXT_COLOR);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        let currentX = pageMargin;
        tableHeaders.forEach((header, i) => {
          pdf.text(header, currentX + 5, yPos + 14);
          currentX += colWidths[i];
        });
        yPos += 20;
      };

      const checkNewPage = (neededHeight: number) => {
        if (yPos + neededHeight > pdf.internal.pageSize.getHeight() - pageMargin) {
          pdf.addPage();
          yPos = pageMargin;
          drawTableHeader();
        }
      };

      drawTableHeader();

      categories.forEach(category => {
        checkNewPage(30); // Estimate for category header + one criterion
        pdf.setFillColor(...HEADER_BG_COLOR); // Light background for category name
        pdf.rect(pageMargin, yPos, contentWidth, 18, 'F');
        pdf.setTextColor(...PRIMARY_COLOR);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.text(cleanText(category.name), pageMargin + 5, yPos + 13);
        yPos += 18;

        category.criteria.forEach(criterion => {
          const criterionNameLines = pdf.splitTextToSize(cleanText(criterion.name), colWidths[0] - 10);
          const descriptionLines = pdf.splitTextToSize(cleanText(criterion.description), colWidths[1] - 10);
          const rowHeight = Math.max(criterionNameLines.length, descriptionLines.length) * 10 + 8; // 10pt line height + padding
          
          checkNewPage(rowHeight);

          pdf.setTextColor(...TEXT_COLOR);
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8);

          let currentX = pageMargin;
          pdf.text(criterionNameLines, currentX + 5, yPos + 10);
          currentX += colWidths[0];
          pdf.text(descriptionLines, currentX + 5, yPos + 10);
          currentX += colWidths[1];
          pdf.text(`${criterion.weight}%`, currentX + colWidths[2]/2 - pdf.getTextWidth(`${criterion.weight}%`)/2, yPos + 10 + (rowHeight-8)/2 - 5);
          currentX += colWidths[2];
          pdf.text(criterion.score > 0 ? criterion.score.toString() : '-', currentX + colWidths[3]/2 - pdf.getTextWidth(criterion.score > 0 ? criterion.score.toString() : '-')/2, yPos + 10 + (rowHeight-8)/2 - 5);
          currentX += colWidths[3];
          pdf.text(criterion.points.toFixed(1), currentX + colWidths[4]/2 - pdf.getTextWidth(criterion.points.toFixed(1))/2, yPos + 10+ (rowHeight-8)/2 - 5);
          
          pdf.setDrawColor(...BORDER_COLOR);
          pdf.line(pageMargin, yPos + rowHeight, pageWidth - pageMargin, yPos + rowHeight); // Bottom border for row
          yPos += rowHeight;
        });
      });
      
      checkNewPage(20); // For total row
      // Total Row
      pdf.setFillColor(...PRIMARY_COLOR);
      pdf.rect(pageMargin, yPos, contentWidth, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text('TOTAL', pageMargin + 5, yPos + 14);
      pdf.text('100%', pageMargin + colWidths[0] + colWidths[1] + colWidths[2]/2 - pdf.getTextWidth('100%')/2, yPos + 14);
      pdf.text(totalScore.toFixed(1),pageMargin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4]/2 - pdf.getTextWidth(totalScore.toFixed(1))/2, yPos + 14);
      yPos += 20;

      // Footer
      const pageCount = (pdf as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(...MUTED_TEXT_COLOR);
        pdf.text(`Página ${i} de ${pageCount} - Generado el ${new Date().toLocaleDateString()}`, pageMargin, pdf.internal.pageSize.getHeight() - 20);
        pdf.text('T1 Talent Evaluation', pageWidth - pageMargin - pdf.getTextWidth('T1 Talent Evaluation'), pdf.internal.pageSize.getHeight() - 20);
      }

      const fileName = `T1_Evaluacion_${cleanText(candidateInfo.name).replace(/\s+/g, '_')}_${cleanText(candidateInfo.date)}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intente de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!evaluationResult) return null;

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="bg-primary hover:bg-primary/90 text-white py-2.5 px-5 rounded-md font-medium transition-colors duration-200 text-sm no-print disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <>
          <span className="inline-block animate-spin mr-2">⏳</span>
          Generando PDF...
        </>
      ) : (
        'Descargar PDF'
      )}
    </button>
  );
}
