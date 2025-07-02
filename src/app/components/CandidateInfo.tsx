'use client';

import { CandidateInfo as CandidateInfoType } from '@/lib/types';

interface CandidateInfoProps {
  candidateInfo: CandidateInfoType;
  onUpdate: (field: keyof CandidateInfoType, value: string) => void;
}

const inputBaseClass = "p-2.5 border border-border rounded-md text-sm bg-background focus:border-primary focus:ring-1 focus:ring-primary";
const labelBaseClass = "font-medium text-foreground mb-1 text-sm";

export default function CandidateInfo({ candidateInfo, onUpdate }: CandidateInfoProps) {
  return (
    <div className="p-5 rounded-md border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Información del Candidato</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="candidateName" className={labelBaseClass}>
            Nombre del Candidato:
          </label>
          <input
            type="text"
            id="candidateName"
            value={candidateInfo.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="Nombre completo"
            className={inputBaseClass}
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="interviewer" className={labelBaseClass}>
            Entrevistador(es):
          </label>
          <input
            type="text"
            id="interviewer"
            value={candidateInfo.interviewer}
            onChange={(e) => onUpdate('interviewer', e.target.value)}
            placeholder="Nombre del entrevistador"
            className={inputBaseClass}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="interviewDate" className={labelBaseClass}>
            Fecha de Entrevista:
          </label>
          <input
            type="date"
            id="interviewDate"
            value={candidateInfo.date}
            onChange={(e) => onUpdate('date', e.target.value)}
            className={inputBaseClass}
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="position" className={labelBaseClass}>
            Posición T1:
          </label>
          <select
            id="position"
            value={candidateInfo.position}
            onChange={(e) => onUpdate('position', e.target.value)}
            className={inputBaseClass}
          >
            <option value="">Seleccionar posición...</option>
            <option value="T1pagos - Frontend Developer">T1pagos - Frontend Developer</option>
            <option value="T1envios - Frontend Developer">T1envíos - Frontend Developer</option>
            <option value="T1tienda - Frontend Developer">T1tienda - Frontend Developer</option>
            <option value="T1score - Frontend Developer">T1score - Frontend Developer</option>
            {/* Add other options here, ensure consistency with existing values if needed */}
            <option value="Frontend Senior Developer">Frontend Senior Developer</option>
            <option value="Frontend Lead Developer">Frontend Lead Developer</option>
            <option value="Frontend Architect">Frontend Architect</option>
          </select>
        </div>
      </div>
    </div>
  );
}
