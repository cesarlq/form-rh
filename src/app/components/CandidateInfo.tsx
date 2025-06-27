'use client';

import { CandidateInfo as CandidateInfoType } from '@/lib/types';

interface CandidateInfoProps {
  candidateInfo: CandidateInfoType;
  onUpdate: (field: keyof CandidateInfoType, value: string) => void;
}

export default function CandidateInfo({ candidateInfo, onUpdate }: CandidateInfoProps) {
  return (
    <div className="bg-blue-50 mx-5 my-5 p-6 rounded-xl border-l-4 border-blue-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label htmlFor="candidateName" className="font-semibold text-blue-900 mb-2 text-sm">
            👤 Nombre del Candidato:
          </label>
          <input
            type="text"
            id="candidateName"
            value={candidateInfo.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="Escribe el nombre completo"
            className="p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="interviewer" className="font-semibold text-blue-900 mb-2 text-sm">
            🎯 Entrevistador(es):
          </label>
          <input
            type="text"
            id="interviewer"
            value={candidateInfo.interviewer}
            onChange={(e) => onUpdate('interviewer', e.target.value)}
            placeholder="Nombre del entrevistador"
            className="p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        <div className="flex flex-col">
          <label htmlFor="interviewDate" className="font-semibold text-blue-900 mb-2 text-sm">
            📅 Fecha de Entrevista:
          </label>
          <input
            type="date"
            id="interviewDate"
            value={candidateInfo.date}
            onChange={(e) => onUpdate('date', e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="position" className="font-semibold text-blue-900 mb-2 text-sm">
            💼 Posición T1:
          </label>
          <select
            id="position"
            value={candidateInfo.position}
            onChange={(e) => onUpdate('position', e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100"
          >
            <option value="">Seleccionar unidad...</option>
            <option value="T1pagos">T1pagos - Frontend</option>
            <option value="T1envios">T1envíos - Frontend</option>
            <option value="T1tienda">T1tienda - Frontend</option>
            <option value="T1score">T1score - Frontend</option>
            <option value="Corporativo">Corporativo - Frontend</option>
          </select>
        </div>
      </div>
    </div>
  );
}
