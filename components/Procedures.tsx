import React from 'react';
import { ProcedureStep } from '../types';

interface ProceduresProps {
  data: ProcedureStep[];
}

export const Procedures: React.FC<ProceduresProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="p-8 text-center italic text-gray-500">No procedures defined for this QP yet.</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] border border-black text-sm">
            <div className="grid grid-cols-[50px_1fr_150px] bg-blue-200 border-b border-black font-bold text-center">
                <div className="p-2 border-r border-black flex items-center justify-center">NO</div>
                <div className="p-2 border-r border-black flex items-center justify-center">ACTIVITY</div>
                <div className="p-2 flex items-center justify-center">RESPONSIBILITY</div>
            </div>
            {data.map((row, idx) => (
                <div key={idx} className="grid grid-cols-[50px_1fr_150px] border-b border-black last:border-b-0 break-inside-avoid">
                    <div className="p-4 border-r border-black font-bold text-center bg-gray-50">{row.no}</div>
                    <div className="p-4 border-r border-black text-justify">{row.activity}</div>
                    <div className="p-4 font-semibold text-center flex items-center justify-center bg-gray-50">{row.responsibility}</div>
                </div>
            ))}
        </div>
    </div>
  );
};