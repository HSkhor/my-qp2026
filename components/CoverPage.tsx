
import React from 'react';
import { DocumentLayout } from './DocumentLayout';
import { QPData } from '../types';
import { JPTLogo } from './Logos';

interface CoverPageProps {
  data: QPData;
}

export const CoverPage: React.FC<CoverPageProps> = ({ data }) => {
  const isWI = data.docNo.includes('WI');
  const docTypeTitle = isWI ? 'WORK INSTRUCTION (WI)' : 'QUALITY PROCEDURE';

  return (
    <DocumentLayout
      docNo={data.docNo}
      versionNo={data.versionNo}
      amendmentNo={data.amendmentNo}
      dateOfIssue={data.dateOfIssue}
      pageNo="Page 1 of 5"
      isCover={true}
    >
      <div className="h-full flex flex-col items-center justify-center p-12 print:p-4 text-center print-font">
        <div className="mb-8">
          <div className="w-40 h-40 flex items-center justify-center mx-auto mb-4">
            <JPTLogo className="w-full h-full" />
          </div>
          <p className="font-bold italic">Komited Demi Kualiti & Keselamatan</p>
        </div>

        <h1 className="text-2xl font-bold uppercase mb-2">
          JABATAN PERUBATAN TRANSFUSI
        </h1>
        <h2 className="text-xl font-bold uppercase mb-12">
          HOSPITAL SULTAN ABDUL HALIM
        </h2>

        <h3 className="text-xl uppercase tracking-widest mb-12">
          {docTypeTitle}
        </h3>

        <div className="bg-blue-200 border border-black p-8 print:p-4 w-full max-w-2xl mb-8 shadow-md">
          <h2 className="text-2xl font-bold uppercase leading-relaxed">
            {data.title}
          </h2>
        </div>

        <div className="mb-12 font-bold space-y-2">
            <p>DOCUMENT NO: {data.docNo}</p>
            {data.relatedDoc && <p>RELATED QP: {data.relatedDoc}</p>}
        </div>

        <div className="w-full border border-black flex text-left text-sm">
          <div className="w-1/2 p-4 border-r border-black">
            <div className="h-16 mb-2 border-b border-dashed border-gray-400"></div>
            <p className="mb-4">Prepared by <span className="font-bold">{data.preparedBy.name}</span></p>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span>Designation</span>
              <span>: {data.preparedBy.designation}</span>
              <span>Date</span>
              <span>: {data.preparedBy.date}</span>
            </div>
          </div>
          <div className="w-1/2 p-4">
             <div className="h-16 mb-2 border-b border-dashed border-gray-400"></div>
            <p className="mb-4">Approved by <span className="font-bold">{data.approvedBy.name}</span></p>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span>Designation</span>
              <span>: {data.approvedBy.designation}</span>
              <span>Date</span>
              <span>: {data.approvedBy.date}</span>
            </div>
          </div>
        </div>
      </div>
    </DocumentLayout>
  );
};
