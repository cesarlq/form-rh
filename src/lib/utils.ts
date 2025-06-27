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
      name: '🔥 CULTURA T1 (30%)',
      criteria: [
        {
          id: 'mentalidad-dueno',
          name: 'Mentalidad de Dueño',
          description: '¿Asume responsabilidad completa? ¿Propone soluciones vs. problemas? ¿Actúa con autonomía?',
          weight: 8,
          score: 0,
          points: 0
        },
        {
          id: 'enfoque-cliente',
          name: 'Enfoque al Cliente',
          description: '¿Entiende el impacto de su código en la experiencia del usuario? ¿Piensa en conversion/UX?',
          weight: 8,
          score: 0,
          points: 0
        },
        {
          id: 'obsesion-eficiencia',
          name: 'Obsesión por la Eficiencia',
          description: '¿Optimiza código sin que se lo pidan? ¿Busca automatizar tareas repetitivas?',
          weight: 7,
          score: 0,
          points: 0
        },
        {
          id: 'innovacion-mejora',
          name: 'Innovación y Mejora Continua',
          description: '¿Propone tecnologías nuevas? ¿Experimenta con soluciones creativas?',
          weight: 7,
          score: 0,
          points: 0
        }
      ]
    },
    {
      id: 'tecnico',
      name: '⚡ TÉCNICO AVANZADO (40%)',
      criteria: [
        {
          id: 'react-nextjs',
          name: 'React.js + Next.js Mastery',
          description: 'SSR/SSG, App Router, optimización de bundle, code splitting avanzado',
          weight: 10,
          score: 0,
          points: 0
        },
        {
          id: 'typescript-arquitectura',
          name: 'TypeScript + Arquitectura',
          description: 'Tipos avanzados, generics, design patterns, arquitectura escalable',
          weight: 8,
          score: 0,
          points: 0
        },
        {
          id: 'performance-optimization',
          name: 'Performance & Optimization',
          description: 'Core Web Vitals, lazy loading, memoization, lighthouse 90+',
          weight: 8,
          score: 0,
          points: 0
        },
        {
          id: 'state-management',
          name: 'State Management',
          description: 'Redux Toolkit, Zustand, React Query, manejo de cache inteligente',
          weight: 7,
          score: 0,
          points: 0
        },
        {
          id: 'apis-integration',
          name: 'APIs & Integration',
          description: 'GraphQL avanzado, REST optimizado, real-time updates, error handling',
          weight: 7,
          score: 0,
          points: 0
        }
      ]
    },
    {
      id: 'experiencia',
      name: '🏆 EXPERIENCIA ESPECÍFICA (20%)',
      criteria: [
        {
          id: 'fintech-ecommerce',
          name: 'Fintech/Ecommerce Experience',
          description: 'Ha trabajado en plataformas transaccionales, pagos, checkout flows',
          weight: 8,
          score: 0,
          points: 0
        },
        {
          id: 'scale-traffic',
          name: 'Scale & High Traffic',
          description: 'Apps con 100k+ usuarios, manejo de concurrencia, monitoring',
          weight: 7,
          score: 0,
          points: 0
        },
        {
          id: 'business-logic',
          name: 'Business Logic Understanding',
          description: 'Entiende reglas de negocio complejas, traduce requisitos técnicos',
          weight: 5,
          score: 0,
          points: 0
        }
      ]
    },
    {
      id: 'soft-skills',
      name: '🤝 SOFT SKILLS CRÍTICAS (10%)',
      criteria: [
        {
          id: 'comunicacion-tecnica',
          name: 'Comunicación Técnica',
          description: 'Explica conceptos complejos, documenta decisiones, argumenta soluciones',
          weight: 5,
          score: 0,
          points: 0
        },
        {
          id: 'velocidad-aprendizaje',
          name: 'Velocidad de Aprendizaje',
          description: 'Se adapta rápido a nuevas tecnologías, frameworks, metodologías',
          weight: 5,
          score: 0,
          points: 0
        }
      ]
    }
  ];
};
