import { Category, EvaluationResult } from './types';

export const calculatePoints = (score: number, weight: number): number => {
  return (score * weight) / 5;
};

export const calculateTotalScore = (categories: Category[]): number => {
  let total = 0;
  categories.forEach(category => {
    category.criteria.forEach(criterion => {
      total += criterion.points;
    });
  });
  return total;
};

export const getEvaluationResult = (totalScore: number, candidateName: string): EvaluationResult => {
  if (totalScore >= 85) {
    return {
      score: totalScore,
      status: 'rockstar',
      message: `🚀 ${candidateName} - ROCKSTAR CONFIRMADO (${totalScore.toFixed(1)}/100) - ¡CONTRATAR INMEDIATAMENTE!`,
      className: 'bg-green-100 text-green-800 border-green-200'
    };
  } else if (totalScore >= 75) {
    return {
      score: totalScore,
      status: 'solid',
      message: `⚡ ${candidateName} - CANDIDATO SÓLIDO (${totalScore.toFixed(1)}/100) - Segunda entrevista técnica`,
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
  } else {
    return {
      score: totalScore,
      status: 'reject',
      message: `❌ ${candidateName} - NO CUMPLE ESTÁNDAR T1 (${totalScore.toFixed(1)}/100) - DESCARTAR`,
      className: 'bg-red-100 text-red-800 border-red-200'
    };
  }
};

export const getInitialData = () => {
  return [
    {
      id: 'cultura',
      name: '🔥 CULTURA T1 (40%)',
      criteria: [
        {
          id: 'mentalidad-dueno',
          name: 'Mentalidad de Dueño',
          description: '¿Asume responsabilidad completa? ¿Propone soluciones vs. problemas? ¿Actúa con autonomía?',
          weight: 12,
          score: 0,
          points: 0
        },
        {
          id: 'enfoque-cliente',
          name: 'Enfoque al Cliente',
          description: '¿Entiende el impacto de su trabajo en la experiencia del usuario? ¿Piensa en resultados de negocio?',
          weight: 10,
          score: 0,
          points: 0
        },
        {
          id: 'obsesion-eficiencia',
          name: 'Obsesión por la Eficiencia',
          description: '¿Optimiza procesos sin que se lo pidan? ¿Busca automatizar tareas repetitivas? ¿Maximiza resultados?',
          weight: 10,
          score: 0,
          points: 0
        },
        {
          id: 'innovacion-mejora',
          name: 'Innovación y Mejora Continua',
          description: '¿Propone mejoras constantemente? ¿Experimenta con soluciones creativas? ¿Desafía el status quo?',
          weight: 8,
          score: 0,
          points: 0
        }
      ]
    },
    {
      id: 'competencias',
      name: '⚡ COMPETENCIAS PROFESIONALES (35%)',
      criteria: [
        {
          id: 'orientacion-resultados',
          name: 'Orientación a Resultados',
          description: '¿Demuestra historial de logros medibles? ¿Se enfoca en KPIs y metas ambiciosas?',
          weight: 10,
          score: 0,
          points: 0
        },
        {
          id: 'resolucion-problemas',
          name: 'Resolución de Problemas',
          description: '¿Identifica problemas antes que otros? ¿Propone soluciones creativas? ¿Ejecuta efectivamente?',
          weight: 10,
          score: 0,
          points: 0
        },
        {
          id: 'toma-decisiones',
          name: 'Toma de Decisiones',
          description: '¿Decide con información sólida y rapidez? ¿Asume riesgos calculados? ¿Aprende de errores?',
          weight: 8,
          score: 0,
          points: 0
        },
        {
          id: 'adaptabilidad-agilidad',
          name: 'Adaptabilidad y Agilidad',
          description: '¿Se adapta rápido a cambios? ¿Aprende nuevas metodologías? ¿Responde con flexibilidad?',
          weight: 7,
          score: 0,
          points: 0
        }
      ]
    },
    {
      id: 'liderazgo',
      name: '🤝 LIDERAZGO Y COLABORACIÓN (15%)',
      criteria: [
        {
          id: 'colaboracion-impacto',
          name: 'Colaboración con Impacto',
          description: '¿Trabaja efectivamente en equipo? ¿Contribuye al éxito colectivo? ¿Comparte conocimiento?',
          weight: 8,
          score: 0,
          points: 0
        },
        {
          id: 'comunicacion-efectiva',
          name: 'Comunicación Efectiva',
          description: '¿Comunica ideas complejas claramente? ¿Influye positivamente? ¿Escucha activamente?',
          weight: 7,
          score: 0,
          points: 0
        }
      ]
    },
    {
      id: 'crecimiento',
      name: '🚀 CRECIMIENTO Y APRENDIZAJE (10%)',
      criteria: [
        {
          id: 'desafia-conocimiento',
          name: 'Desafía su Conocimiento',
          description: '¿Busca aprendizaje continuo? ¿Se mantiene actualizado? ¿Comparte lo aprendido?',
          weight: 5,
          score: 0,
          points: 0
        },
        {
          id: 'velocidad-aprendizaje',
          name: 'Velocidad de Aprendizaje',
          description: '¿Se adapta rápido a nuevas situaciones? ¿Aprende de errores? ¿Aplica conocimiento efectivamente?',
          weight: 5,
          score: 0,
          points: 0
        }
      ]
    }
  ];
};
