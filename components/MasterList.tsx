import React from 'react';
import { QPData } from '../types';
import { JPTLogo } from './Logos';
import { ArrowLeft, Printer } from 'lucide-react';

interface MasterListProps {
  data: QPData[];
  onBack: () => void;
}

export const MasterList: React.FC<MasterListProps> = ({ data, onBack }) => {
  const handlePrint = () => window.print();

  const sortedData = [...data].sort((a, b) => a.docNo.localeCompare(b.docNo));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 print:p-0 print:bg-white">
      {/* Controls - Hidden on Print */}
      <div className="max-w-[297mm] mx-auto mb-6 md:mb-8 flex justify-between items-center print:hidden">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-sm md:text-base"
        >
          <ArrowLeft size={20} /> <span className="hidden md:inline">Back to Dashboard</span> <span className="md:hidden">Back</span>
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 md:px-6 py-2.5 rounded-lg font-bold shadow hover:bg-slate-800 transition-all text-sm md:text-base"
        >
          <Printer size={18} /> Print <span className="hidden md:inline">Master List</span>
        </button>
      </div>

      {/* Document Container */}
      <div className="max-w-[297mm] mx-auto bg-white shadow-xl print:shadow-none p-4 md:p-12 print:p-8 min-h-[210mm]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b-4 border-slate-900 pb-4 text-center md:text-left gap-4 md:gap-0">
           <div className="w-16 h-16 md:w-20 md:h-20">
             <JPTLogo className="w-full h-full" />
           </div>
           <div className="flex-1 px-4">
             <h1 className="text-xl md:text-2xl font-bold uppercase text-slate-900">Master List of Documents</h1>
             <h2 className="text-base md:text-lg font-semibold text-slate-600 uppercase">Jabatan Perubatan Transfusi</h2>
             <p className="text-xs text-slate-400 mt-1">Hospital Sultan Abdul Halim</p>
           </div>
           <div className="w-0 md:w-20"></div> {/* Spacer */}
        </div>

        <div className="mb-6 flex justify-between text-sm font-medium text-slate-500">
            <p>Report Date: {new Date().toLocaleDateString('en-GB')}</p>
            <p>Total Documents: {data.length}</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-xs md:text-sm min-w-[800px]">
            <thead>
                <tr className="bg-slate-100 print:bg-gray-100">
                <th className="border border-slate-300 p-3 text-left w-12">No.</th>
                <th className="border border-slate-300 p-3 text-left w-40">Document No.</th>
                <th className="border border-slate-300 p-3 text-left">Title</th>
                <th className="border border-slate-300 p-3 text-center w-16">Ver.</th>
                <th className="border border-slate-300 p-3 text-center w-16">Amd.</th>
                <th className="border border-slate-300 p-3 text-center w-28">Date Issue</th>
                <th className="border border-slate-300 p-3 text-left w-32">Owner (Unit)</th>
                </tr>
            </thead>
            <tbody>
                {sortedData.map((doc, index) => (
                <tr key={doc.id} className="break-inside-avoid hover:bg-gray-50">
                    <td className="border border-slate-300 p-2 text-center text-slate-500">{index + 1}</td>
                    <td className="border border-slate-300 p-2 font-bold font-mono">{doc.docNo}</td>
                    <td className="border border-slate-300 p-2">{doc.title}</td>
                    <td className="border border-slate-300 p-2 text-center">{doc.versionNo}</td>
                    <td className="border border-slate-300 p-2 text-center">{doc.amendmentNo}</td>
                    <td className="border border-slate-300 p-2 text-center">{doc.dateOfIssue}</td>
                    <td className="border border-slate-300 p-2">JPT / {doc.preparedBy.name.split(' ').pop()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-slate-300 pt-4 flex justify-between text-[10px] text-slate-400">
             <p>Verified By: Quality Manager</p>
             <p>Page 1 of 1</p>
        </div>
      </div>
    </div>
  );
};