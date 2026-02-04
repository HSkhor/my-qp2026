
import React from 'react';
import { HeaderProps } from '../types';
import { JPTLogo } from './Logos';

interface DocumentLayoutProps extends HeaderProps {
  children: React.ReactNode;
  isCover?: boolean;
}

export const DocumentLayout: React.FC<DocumentLayoutProps> = ({
  docNo,
  versionNo,
  amendmentNo,
  dateOfIssue,
  pageNo,
  children,
  isCover = false,
}) => {
  const isWI = docNo.includes('WI');
  const docTypeLabel = isWI ? 'WORK INSTRUCTION' : 'QUALITY PROCEDURE';

  return (
    <div className="flex justify-center w-full print:block print:w-full">
      {/* 
         A4 Container 
         - Screen: max-w-[210mm], min-h-[297mm], margins
         - Print: max-width: 180mm, centered, NO vertical margins, auto height
      */}
      <div 
        className="
          w-full max-w-[210mm] min-h-[297mm] bg-white 
          my-4 md:my-8 shadow-lg border border-gray-200 
          relative flex flex-col
          print:border-none print:shadow-none 
          print:max-w-[180mm] print:w-full print:mx-auto print:my-0 print:h-auto print:min-h-0
          print:px-0 print:box-border
        "
        style={{ boxSizing: 'border-box' }}
      >
        
        {/* 
            Inner Content Wrapper
            - Removed scale-95 to prevent layout ghosting (blank pages)
            - print:block ensures proper flow
        */}
        <div className="w-full h-full flex flex-col print:block print:w-full">
            
            {/* Screen-only Border (Blue) */}
            <div className="absolute inset-2 border-2 border-blue-600 pointer-events-none z-10 print:hidden"></div>

            {/* Header Section */}
            {!isCover && (
            <div className="p-4 md:p-8 pb-4 mx-2 md:mx-8 mt-4 md:mt-8 print:mx-0 print:mt-0 print:pt-4 print:px-0">
                {/* Logo & Institution Name */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 border-b-2 border-black pb-2 gap-2 md:gap-0">
                {/* Left Placeholder - hidden on mobile */}
                <div className="hidden md:block w-20 h-20 flex-shrink-0"></div>

                {/* Right Logo */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center md:order-3">
                    <JPTLogo className="w-full h-full" />
                </div>

                {/* Center Text */}
                <div className="flex-grow text-center font-bold uppercase leading-tight px-2 md:order-2">
                    <p className="text-base md:text-xl">JABATAN PERUBATAN TRANSFUSI</p>
                    <p className="text-sm md:text-lg">HOSPITAL SULTAN ABDUL HALIM</p>
                </div>
                </div>
                
                {/* Document Control Table */}
                <div className="flex flex-col md:flex-row text-xs border border-black font-serif">
                <div className="w-full md:w-1/2 p-2 border-b md:border-b-0 md:border-r border-black font-bold flex items-center justify-center md:justify-start text-sm bg-gray-50 md:bg-transparent">
                    {docTypeLabel} ({docNo.split('/').pop()})
                </div>
                <div className="w-full md:w-1/2">
                    <div className="flex border-b border-black">
                    <div className="w-1/3 p-1 border-r border-black bg-gray-50 font-bold">Document No :</div>
                    <div className="w-2/3 p-1 font-mono break-all">{docNo}</div>
                    </div>
                    <div className="flex border-b border-black">
                    <div className="w-1/3 p-1 border-r border-black bg-gray-50 font-bold">Version No :</div>
                    <div className="w-2/3 p-1">{versionNo}</div>
                    </div>
                    <div className="flex border-b border-black">
                    <div className="w-1/3 p-1 border-r border-black bg-gray-50 font-bold">Amendment No :</div>
                    <div className="w-2/3 p-1">{amendmentNo}</div>
                    </div>
                    <div className="flex border-b border-black">
                    <div className="w-1/3 p-1 border-r border-black bg-gray-50 font-bold">Date Of Issue :</div>
                    <div className="w-2/3 p-1">{dateOfIssue}</div>
                    </div>
                    <div className="flex">
                    <div className="w-1/3 p-1 border-r border-black bg-gray-50 font-bold">Page No :</div>
                    <div className="w-2/3 p-1">{pageNo}</div>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Main Content Body */}
            {/* Added print:pb-12 to ensure content doesn't overlap with the absolute footer */}
            <div className={`flex-grow ${isCover ? 'p-0' : 'px-4 md:px-12 py-6 print:px-0 print:py-4 print:pb-16'} relative z-20 overflow-visible`}>
            {children}
            </div>

            {/* Footer - Positioned Absolute Bottom */}
            <div className="p-2 text-center mt-auto w-full z-30 print:absolute print:bottom-0 print:left-0 print:w-full bg-white">
                <div className="font-bold text-red-600 text-[10px] border-t border-gray-300 pt-1 w-full">
                    CONTROLLED DOCUMENT
                </div>
                <div className="text-[8px] text-gray-500">
                    Computer generated document. No signature required.
                </div>
            </div>
            
            {/* Watermark for Screen */}
            <div className="absolute top-2 left-2 text-[0.6rem] text-gray-400 p-1 print:hidden">
            ONCE PRINTED CONSIDER UNCONTROLLED
            </div>

            {/* 
            AUDIT COMPLIANCE WATERMARK 
            Visible only when printing. Large, diagonal, semi-transparent.
            */}
            <div className="hidden print:flex fixed inset-0 z-0 items-center justify-center pointer-events-none overflow-hidden">
            <div className="transform -rotate-45 text-gray-200 text-[10rem] font-black opacity-30 whitespace-nowrap select-none border-4 border-gray-200 p-12 rounded-3xl">
                UNCONTROLLED COPY
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};
