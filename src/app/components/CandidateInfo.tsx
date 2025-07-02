'use client';

import { CandidateInfo as CandidateInfoType } from '@/lib/types';

interface CandidateInfoProps {
  candidateInfo: CandidateInfoType;
  onUpdate: (field: keyof CandidateInfoType, value: string) => void;
}

const commonInputClass = "w-full p-3 border-2 border-black rounded-md text-lg bg-white focus:border-red-500 focus:ring-2 focus:ring-yellow-400 placeholder-gray-500";
const commonLabelClass = "block mb-1 text-xl font-bold text-black";


export default function CandidateInfo({ candidateInfo, onUpdate }: CandidateInfoProps) {
  return (
    // The parent component will apply .comic-panel if needed. This component focuses on its internal structure.
    // Removed bg-blue-50, mx-5, my-5, p-6, rounded-xl, border-l-4, border-blue-600 as they are panel-like styles
    // and should be controlled by the parent or a wrapper if this is a sub-panel.
    // If this IS the panel, then add .comic-panel here. For now, assuming it's content within a panel.
    <div className="space-y-6 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <label htmlFor="candidateName" className={commonLabelClass}>
            Nombre del Candidato:
          </label>
          <input
            type="text"
            id="candidateName"
            value={candidateInfo.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="Ej: Clark Kent"
            className={commonInputClass}
          />
        </div>
        
        <div>
          <label htmlFor="interviewer" className={commonLabelClass}>
            Entrevistador(es):
          </label>
          <input
            type="text"
            id="interviewer"
            value={candidateInfo.interviewer}
            onChange={(e) => onUpdate('interviewer', e.target.value)}
            placeholder="Ej: Lois Lane"
            className={commonInputClass}
          />
        </div>

        <div>
          <label htmlFor="interviewDate" className={commonLabelClass}>
            Fecha de Entrevista:
          </label>
          <input
            type="date"
            id="interviewDate"
            value={candidateInfo.date}
            onChange={(e) => onUpdate('date', e.target.value)}
            className={commonInputClass}
          />
        </div>
        
        <div>
          <label htmlFor="position" className={commonLabelClass}>
            Posición T1:
          </label>
          <select
            id="position"
            value={candidateInfo.position}
            onChange={(e) => onUpdate('position', e.target.value)}
            className={`${commonInputClass} appearance-none`} // appearance-none for custom arrow later if needed
          >
            <option value="">¡Elige una Posición!</option>
            <option value="T1pagos - Frontend Developer">T1pagos - Frontend Developer</option>
            <option value="T1envios - Frontend Developer">T1envíos - Frontend Developer</option>
            <option value="T1tienda - Frontend Developer">T1tienda - Frontend Developer</option>
            <option value="T1score - Frontend Developer">T1score - Frontend Developer</option>
            <option value="T1logistics - Frontend Developer">T1logistics - Frontend Developer</option>
            <option value="T1marketplace - Frontend Developer">T1marketplace - Frontend Developer</option>
            <option value="T1fintech - Frontend Developer">T1fintech - Frontend Developer</option>
            <option value="T1analytics - Frontend Developer">T1analytics - Frontend Developer</option>
            <option value="T1mobile - Frontend Developer">T1mobile - Frontend Developer</option>
            <option value="T1platform - Frontend Developer">T1platform - Frontend Developer</option>
            <option value="T1security - Frontend Developer">T1security - Frontend Developer</option>
            <option value="T1ai - Frontend Developer">T1ai - Frontend Developer</option>
            <option value="Corporativo - Frontend Developer">Corporativo - Frontend Developer</option>
            <option value="Frontend Senior Developer">Frontend Senior Developer</option>
            <option value="Frontend Lead Developer">Frontend Lead Developer</option>
            <option value="Frontend Architect">Frontend Architect</option>
            <option value="React Specialist">React Specialist</option>
            <option value="Vue Specialist">Vue.js Specialist</option>
            <option value="Angular Specialist">Angular Specialist</option>
            <option value="Mobile Frontend Developer">Mobile Frontend Developer</option>
            <option value="Fullstack Frontend Developer">Fullstack Frontend Developer</option>
          </select>
        </div>
      </div>
    </div>
  );
}
