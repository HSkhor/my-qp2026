
import React, { useState } from 'react';
import { CoverPage } from './components/CoverPage';
import { DocumentLayout } from './components/DocumentLayout';
import { Procedures } from './components/Procedures';
import { Dashboard } from './components/Dashboard';
import { DocumentEditor } from './components/DocumentEditor';
import { LoginModal } from './components/LoginModal';
import { MasterList } from './components/MasterList';
import { FlowchartRenderer } from './components/FlowchartRenderer';
import { qpRegistry } from './data/qpRegistry';
import { QPData, User } from './types';
import { ChevronRight, Menu, Printer, ArrowLeft, Edit3, Paperclip, X, Download, FileText } from 'lucide-react';

export default function App() {
  // Application State
  const [registry, setRegistry] = useState<QPData[]>(qpRegistry);
  const [user, setUser] = useState<User | null>(null);
  const [selectedQPId, setSelectedQPId] = useState<string | null>(null);
  const [mode, setMode] = useState<'view' | 'edit' | 'masterlist'>('view');
  
  // Viewer State
  const [activeSection, setActiveSection] = useState('cover');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [printMode, setPrintMode] = useState<'full' | 'single'>('full');

  // Derived State
  const selectedQP = registry.find(qp => qp.id === selectedQPId) || null;
  const isController = user?.role === 'CONTROLLER';

  // --- Auth Actions ---

  const handleLogin = (authenticatedUser: User) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    setUser(null);
    setMode('view');
    setSelectedQPId(null);
  };

  // --- Document Actions ---

  const handleSelectQP = (qp: QPData, selectionMode: 'view' | 'edit' | 'masterlist', initialSection: string = 'cover') => {
    setSelectedQPId(qp.id);
    setMode(selectionMode);
    setActiveSection(initialSection);
    setIsMenuOpen(false); // Ensure menu is closed when selecting on mobile
  };

  const handleUpdateQP = (updatedQP: QPData) => {
    setRegistry(prev => prev.map(qp => qp.id === updatedQP.id ? updatedQP : qp));
    setMode('view');
  };

  const handleCancelEdit = () => {
    if (selectedQPId && registry.find(r => r.id === selectedQPId)?.title === 'NEW DOCUMENT') {
        setRegistry(prev => prev.filter(r => r.id !== selectedQPId));
        setSelectedQPId(null);
    }
    setMode('view');
  };

  const handleBackToDashboard = () => {
    setSelectedQPId(null);
    setMode('view');
  };

  const handleUploadClick = () => {
      const newId = `new-${Date.now()}`;
      const newDoc: QPData = {
          id: newId,
          docNo: "HSAH/JPT/NEW",
          title: "NEW DOCUMENT",
          versionNo: "01",
          amendmentNo: "00",
          dateOfIssue: new Date().toLocaleDateString('en-GB'),
          preparedBy: { name: user?.name || "Admin", designation: "Scientific Officer", date: "" },
          approvedBy: { name: "TBA", designation: "Head of Department", date: "" },
          procedures: [],
          content: { objectives: "", scope: "" }
      };
      setRegistry(prev => [newDoc, ...prev]);
      setSelectedQPId(newId);
      setMode('edit');
  };

  const handlePrint = (mode: 'full' | 'single') => {
    setPrintMode(mode);
    // Timeout ensures React has time to update the DOM with the correct print classes
    setTimeout(() => {
        window.print();
    }, 100);
  };

  // --- Rendering Logic ---

  const renderSectionContent = (sectionId: string, qp: QPData) => {
    const isWI = qp.docNo.includes('WI');
    
    const headerProps = {
        docNo: qp.docNo,
        versionNo: qp.versionNo,
        amendmentNo: qp.amendmentNo,
        dateOfIssue: qp.dateOfIssue,
    };

    // Handle Attachments
    if (sectionId.startsWith('att-')) {
        const attId = sectionId.replace('att-', '');
        const attachment = qp.attachments?.find(a => a.id === attId);
        if (attachment) {
            return (
                <DocumentLayout {...headerProps} docNo={attachment.docNo} pageNo="Attachment">
                     <h2 className="font-bold text-lg mb-6 text-center border-b-2 border-black pb-4 uppercase bg-gray-50 pt-4">
                        {attachment.title}
                     </h2>
                     {attachment.fileUrl ? (
                         <div className="w-full flex justify-center">
                             <img 
                                src={attachment.fileUrl} 
                                alt={attachment.title} 
                                className="w-full max-w-full h-auto object-contain border border-gray-200 shadow-sm print:border-none print:shadow-none" 
                             />
                         </div>
                     ) : (
                         <div className="mt-4 overflow-x-auto print:overflow-visible">
                            {attachment.content}
                         </div>
                     )}
                </DocumentLayout>
            )
        }
    }

    switch (sectionId) {
      case 'cover':
        return <CoverPage data={qp} />;
      case 'amendment':
        return (
          <DocumentLayout {...headerProps} pageNo="Page 2">
            <h2 className="font-bold text-lg mb-4 text-center border-b-2 border-black pb-2">AMENDMENT RECORD</h2>
            <div className="border border-black text-sm overflow-x-auto print:overflow-visible">
               <div className="min-w-[500px] print:min-w-0">
                <div className="grid grid-cols-[50px_50px_100px_1fr] bg-blue-200 border-b border-black font-bold text-center">
                    <div className="p-2 border-r border-black">No.</div>
                    <div className="p-2 border-r border-black">Ver.</div>
                    <div className="p-2 border-r border-black">Date</div>
                    <div className="p-2">Details</div>
                </div>
                {qp.content?.amendments && qp.content.amendments.length > 0 ? (
                    qp.content.amendments.map((amend, idx) => (
                    <div key={idx} className="grid grid-cols-[50px_50px_100px_1fr] border-b border-black last:border-0 min-h-[60px]">
                        <div className="p-2 border-r border-black text-center">{amend.no}</div>
                        <div className="p-2 border-r border-black text-center">{amend.version}</div>
                        <div className="p-2 border-r border-black text-center">{amend.date}</div>
                        <div className="p-2 text-justify">{amend.details}</div>
                    </div>
                    ))
                ) : (
                    [...Array(3)].map((_, i) => (
                    <div key={i} className="grid grid-cols-[50px_50px_100px_1fr] border-b border-black last:border-0 h-24">
                        <div className="border-r border-black"></div>
                        <div className="border-r border-black"></div>
                        <div className="border-r border-black"></div>
                        <div></div>
                    </div>
                    ))
                )}
               </div>
            </div>
          </DocumentLayout>
        );
      case 'distribution':
        return (
            <DocumentLayout {...headerProps} pageNo="Page 2">
                <h2 className="font-bold text-lg mb-4 text-center border-b-2 border-black pb-2 uppercase">Distribution List</h2>
                <div className="overflow-x-auto print:overflow-visible">
                    <table className="w-full border-collapse border border-black text-sm min-w-[500px] print:min-w-0">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="border border-black p-2 w-24">No. of copy</th>
                                <th className="border border-black p-2">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qp.content?.distributionList && qp.content.distributionList.length > 0 ? (
                                qp.content.distributionList.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-4 text-center align-top">{item.copyNo}</td>
                                        <td className="border border-black p-4">{item.location}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black p-4 text-center align-top">01</td>
                                    <td className="border border-black p-4">
                                        My computer &gt; public &gt; folder JABATAN PERUBATAN TRANSFUSI &gt; folder DOCUMENT MS ISO15189.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </DocumentLayout>
        );
      case 'objective':
        return (
            <DocumentLayout {...headerProps} pageNo="Page 3">
                <div className="mb-8">
                    <h3 className="font-bold text-lg mb-2">1.0 OBJECTIVE</h3>
                    <div className="text-justify mb-4 text-sm leading-relaxed">
                       {qp.content?.objectives || "This procedure outlines the process..."}
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="font-bold text-lg mb-2">2.0 SCOPE</h3>
                    <div className="text-justify text-sm leading-relaxed">
                       {qp.content?.scope || "This procedure applies to the Jabatan Perubatan Transfusi, Hospital Sultan Abdul Halim."}
                    </div>
                </div>
            </DocumentLayout>
        );
      case 'references':
        return (
             <DocumentLayout {...headerProps} pageNo="Page 3">
                <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">{isWI ? '3.0 RESPONSIBILITY' : '3.0 REFERENCES'}</h3>
                    <div className="text-sm">
                    {qp.content?.references || (
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="font-bold min-w-[30px]">3.1</span>
                                <span>MS ISO 15189:2022 Medical Laboratories – Requirements for Quality and Competence</span>
                            </li>
                        </ul>
                    )}
                    </div>
                </div>
             </DocumentLayout>
        );
        case 'definitions':
            return (
                 <DocumentLayout {...headerProps} pageNo="Page 3">
                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-4">{isWI ? '4.0 MATERIALS REQUIRED' : '4.0 DEFINITION/ABBREVIATION'}</h3>
                        <div className="space-y-4 text-sm">
                             {qp.content?.definitions || <p className="italic text-gray-500">No definitions provided.</p>}
                        </div>
                    </div>
                 </DocumentLayout>
            );
      case 'procedures':
        return (
          <DocumentLayout {...headerProps} pageNo="Page 4">
            <h3 className="font-bold text-lg mb-4">{isWI ? 'INSTRUCTIONS (5.0 - 8.0)' : '5.0 PROCEDURE'}</h3>
            <Procedures data={qp.procedures} />
          </DocumentLayout>
        );
    case 'records':
        return (
            <DocumentLayout {...headerProps} pageNo="Page 5">
                 <h3 className="font-bold text-lg mb-4">{isWI ? '9.0 RECORDS' : '6.0 RECORDS'}</h3>
                 <div className="overflow-x-auto print:overflow-visible">
                    <table className="w-full border-collapse border border-black text-sm min-w-[600px] print:min-w-0">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="border border-black p-2 w-12">No</th>
                                <th className="border border-black p-2">Type of records</th>
                                <th className="border border-black p-2">File Number</th>
                                <th className="border border-black p-2">Location</th>
                                <th className="border border-black p-2">Retention</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qp.content?.records ? (
                                qp.content.records.map((rec, i) => (
                                    <tr key={i}>
                                        <td className="border border-black p-3 text-center align-top">{rec.no}</td>
                                        <td className="border border-black p-3 align-top uppercase">{rec.type}</td>
                                        <td className="border border-black p-3 text-center align-top">{rec.fileNo}</td>
                                        <td className="border border-black p-3 text-center align-top">{rec.location}</td>
                                        <td className="border border-black p-3 text-center align-top">{rec.retention}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black p-3 text-center" colSpan={5}>No records defined.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                 </div>
            </DocumentLayout>
        );
    case 'flowchart':
        return (
            <DocumentLayout {...headerProps} pageNo="Page 9">
                <h3 className="font-bold text-lg mb-8">7.0 FLOW CHART</h3>
                <div className="overflow-x-auto print:overflow-visible">
                    {qp.content?.flowchartData && qp.content.flowchartData.length > 0 ? (
                        <FlowchartRenderer steps={qp.content.flowchartData} />
                    ) : qp.content?.flowchart ? (
                        qp.content.flowchart
                    ) : (
                        <div className="p-8 text-center italic text-gray-500">Flowchart not available.</div>
                    )}
                </div>
            </DocumentLayout>
        );
      default:
        return <div className="p-12 text-center text-gray-500">Section content under construction...</div>;
    }
  };

  // Helper to generate list of all sections for printing
  const getFullDocumentSections = (qp: QPData) => {
      const isWI = qp.docNo.includes('WI');
      const attachments = qp.attachments || [];
      return [
        'cover',
        'amendment',
        !isWI && 'distribution',
        'objective',
        'references',
        'definitions',
        'procedures',
        'records',
        !isWI && 'flowchart',
        ...attachments.map(att => `att-${att.id}`)
      ].filter(Boolean) as string[];
  };

  // --- Route Guard ---
  if (!user) {
      return (
          <LoginModal 
            onLogin={handleLogin} 
            onClose={() => {}} 
            isMandatory={true} 
          />
      );
  }

  // --- Views ---

  if (mode === 'masterlist') {
      return <MasterList data={registry} onBack={handleBackToDashboard} />;
  }

  if (!selectedQP) {
    return (
        <Dashboard 
            qps={registry} 
            user={user}
            onSelect={(qp, m, section) => handleSelectQP(qp, m as 'view'|'edit', section)}
            onLoginClick={() => {}} 
            onLogoutClick={handleLogout}
            onUploadClick={handleUploadClick}
            onMasterListClick={() => setMode('masterlist')}
        />
    );
  }

  if (mode === 'edit') {
    if (!isController) {
        setMode('view');
        return null;
    }
    return <DocumentEditor data={selectedQP} onSave={handleUpdateQP} onCancel={handleCancelEdit} />;
  }

  // --- Viewer Logic ---
  const isWI = selectedQP.docNo.includes('WI');
  const attachments = selectedQP.attachments || [];

  const mainSections = [
    { id: 'cover', title: 'Cover Page' },
    { id: 'amendment', title: 'Amendment Record' },
    !isWI ? { id: 'distribution', title: 'Distribution List' } : null,
    { id: 'objective', title: '1.0 Objective & 2.0 Scope' },
    { id: 'references', title: isWI ? '3.0 Responsibility' : '3.0 References' },
    { id: 'definitions', title: isWI ? '4.0 Materials' : '4.0 Definitions' },
    { id: 'procedures', title: isWI ? 'Instructions' : '5.0 Procedure' },
    { id: 'records', title: isWI ? '9.0 Records' : '6.0 Records' },
    !isWI ? { id: 'flowchart', title: '7.0 Flow Chart' } : null,
  ].filter(Boolean) as {id: string, title: string, isAttachment?: boolean}[];

  const formSections = attachments.map(att => ({ 
    id: `att-${att.id}`, 
    title: att.docNo, 
    isAttachment: true 
  }));

  const printSections = getFullDocumentSections(selectedQP);

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 print:bg-white print:block">
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden print:hidden"
            onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* 
         SIDEBAR NAVIGATION 
         - Fixed on mobile (Off-canvas)
         - Relative/Static on Desktop (lg+)
         - Hidden in Print
      */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out print:hidden
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-auto lg:min-h-screen flex flex-col
      `}>
        <div className="p-6 border-b border-slate-700">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="font-bold text-xl">QP Viewer</h1>
                    <p className="text-xs text-slate-400 truncate w-48" title={selectedQP.docNo}>{selectedQP.docNo}</p>
                </div>
                 <button onClick={() => setIsMenuOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
                    <X size={20} />
                 </button>
            </div>
            <div className="flex flex-col gap-2">
                <button 
                    onClick={handleBackToDashboard}
                    className="w-full flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs py-2 px-3 rounded transition-colors"
                >
                    <ArrowLeft size={14} /> Back to Dashboard
                </button>
                
                <button 
                    onClick={() => handlePrint('full')} 
                    className="w-full flex items-center gap-2 bg-white text-slate-900 text-xs py-2 px-3 rounded transition-colors font-bold hover:bg-gray-200"
                >
                    <Download size={14} /> Download / Print Full Doc
                </button>

                <button 
                    onClick={() => handlePrint('single')} 
                    className="w-full flex items-center gap-2 bg-blue-600 text-white text-xs py-2 px-3 rounded transition-colors font-bold hover:bg-blue-700"
                >
                    <FileText size={14} /> Print Current Page
                </button>

                {isController && (
                    <button 
                        onClick={() => setMode('edit')}
                        className="w-full flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-xs py-2 px-3 rounded transition-colors font-bold"
                    >
                        <Edit3 size={14} /> Edit This Document
                    </button>
                )}
            </div>
        </div>
        
        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          {mainSections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                // Auto close on mobile
                if (window.innerWidth < 1024) setIsMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-sm font-medium truncate">{section.title}</span>
              </div>
              {activeSection === section.id && <ChevronRight size={16} />}
            </button>
          ))}

          {formSections.length > 0 && (
            <>
              <div className="px-4 py-2 mt-4 mb-1 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">
                Related Forms
              </div>
              {formSections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => {
                        setActiveSection(section.id);
                         if (window.innerWidth < 1024) setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                        activeSection === section.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                    >
                    <div className="flex items-center gap-2 overflow-hidden">
                        <Paperclip size={14} className="flex-shrink-0 text-green-400" />
                        <span className="text-sm font-medium truncate">{section.title}</span>
                    </div>
                    {activeSection === section.id && <ChevronRight size={16} />}
                </button>
              ))}
            </>
          )}
        </nav>
        <div className="p-4 text-xs text-slate-500 text-center border-t border-slate-800">
            JPT Document System v1.0
        </div>
      </aside>

      {/* Mobile Hamburger Button */}
      {!isMenuOpen && (
        <button 
            onClick={() => setIsMenuOpen(true)}
            className="fixed top-4 left-4 z-40 p-2.5 bg-slate-900 text-white rounded-md shadow-xl hover:bg-slate-800 lg:hidden print:hidden"
        >
            <Menu size={24} />
        </button>
      )}

      {/* 
         MAIN CONTENT AREA (Interactive View + Single Page Print)
         - Visible on screen
         - Visible on print ONLY if printMode === 'single'
      */}
      <main className={`
          flex-1 min-w-0 h-screen overflow-auto flex flex-col items-center p-4 md:p-8 pt-16 lg:pt-8 
          ${printMode === 'single' ? 'print:block print:overflow-visible print:p-0 print:m-0 print:h-auto' : 'print:hidden'}
      `}>
         <div className={`max-w-[210mm] w-full ${printMode === 'single' ? 'print:w-full' : ''}`}>
            {renderSectionContent(activeSection, selectedQP)}
         </div>
         <div className="mt-8 text-center text-gray-400 text-xs mb-8 print:hidden">
            <p>Generated by QP Viewer System v1.0 • Hospital Sultan Abdul Halim</p>
         </div>
      </main>

      {/* 
         FULL DOCUMENT PRINT VIEW
         - Hidden on Screen
         - Visible on Print ONLY if printMode === 'full'
      */}
      <div className={`hidden ${printMode === 'full' ? 'print:block' : 'print:hidden'} w-full`}>
          {printSections.map((sectionId, index) => {
              // Determine if this is the last section to avoid forced page break
              const isLastSection = index === printSections.length - 1;
              return (
                <div 
                    key={sectionId} 
                    className={isLastSection ? "print:break-after-auto last-page" : "print:break-after-page"}
                >
                    {renderSectionContent(sectionId, selectedQP)}
                </div>
              );
          })}
      </div>
    </div>
  );
}
