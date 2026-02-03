import React, { useState, useMemo } from 'react';
import { QPData, User } from '../types';
import { Search, Edit3, Book, ClipboardList, LayoutGrid, FileText, FileSpreadsheet, LogIn, LogOut, UploadCloud, UserCircle, ListChecks, Clock } from 'lucide-react';
import { JPTLogo } from './Logos';

interface DashboardProps {
  qps: QPData[];
  user: User | null;
  onSelect: (qp: QPData, mode: 'view' | 'edit', sectionId?: string) => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onUploadClick: () => void;
  onMasterListClick: () => void;
}

type Category = 'ALL' | 'QP' | 'WI' | 'FORM';

export const Dashboard: React.FC<DashboardProps> = ({ 
  qps, 
  user, 
  onSelect, 
  onLoginClick, 
  onLogoutClick,
  onUploadClick,
  onMasterListClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  const isController = user?.role === 'CONTROLLER';

  // Helper to determine doc type
  const getDocType = (docNo: string) => {
    if (docNo.includes('/WI')) return 'WI';
    if (docNo.includes('/FE') || docNo.includes('/F-')) return 'FORM';
    return 'QP';
  };

  // Helper to parse "DD/MM/YYYY" strings for sorting
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      // Month is 0-indexed in JS Date
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(0); // Fallback to epoch
  };

  // Get 5 most recent documents
  const recentDocs = useMemo(() => {
    return [...qps].sort((a, b) => parseDate(b.dateOfIssue).getTime() - parseDate(a.dateOfIssue).getTime()).slice(0, 5);
  }, [qps]);

  // Extract all forms from attachments across all QPs
  const allForms = useMemo(() => {
    return qps.flatMap(qp => 
        (qp.attachments || []).map(att => ({
            ...att,
            parentQP: qp,
            type: 'FORM'
        }))
    ).filter(att => att.docNo.includes('FE') || att.docNo.includes('F-'));
  }, [qps]);

  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'ALL', label: 'All Files', icon: <LayoutGrid size={18} /> },
    { id: 'QP', label: 'Procedures (QP)', icon: <Book size={18} /> },
    { id: 'WI', label: 'Work Instr. (WI)', icon: <ClipboardList size={18} /> },
    { id: 'FORM', label: 'Forms (FE)', icon: <FileSpreadsheet size={18} /> },
  ];

  // Filter Main Documents (QP/WI)
  const filteredQPs = qps.filter(qp => {
    if (activeCategory === 'FORM') return false; // Handled separately

    const matchesSearch = qp.docNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          qp.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    const type = getDocType(qp.docNo);
    
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'QP') return type === 'QP';
    if (activeCategory === 'WI') return type === 'WI';
    return true;
  });

  // Filter Forms
  const filteredForms = allForms.filter(form => {
      if (activeCategory !== 'FORM' && activeCategory !== 'ALL') return false;
      if (activeCategory !== 'FORM') return false;

      return form.docNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
             form.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderContent = () => {
    if (activeCategory === 'FORM') {
        if (filteredForms.length === 0) return null;
        return filteredForms.map(form => (
            <div key={form.id} onClick={() => onSelect(form.parentQP, 'view', `att-${form.id}`)}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl text-[10px] font-bold tracking-wider border-b border-l bg-green-50 text-green-700 border-green-100">
                    FORM
                </div>

                <div className="mb-4 mt-2">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-bold font-mono border border-green-100">
                        {form.docNo}
                    </span>
                </div>
                
                <h3 className="font-bold text-slate-800 text-base leading-snug mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {form.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-1 text-xs text-gray-400">
                    <span className="font-medium text-gray-500">Ref: {form.parentQP.docNo}</span>
                    <span className="truncate">{form.parentQP.title}</span>
                </div>
            </div>
        ));
    }

    // Default Render for QP/WI
    return filteredQPs.map((qp) => {
        const type = getDocType(qp.docNo);
        const typeColors = {
            QP: 'bg-blue-50 text-blue-700 border-blue-100',
            WI: 'bg-purple-50 text-purple-700 border-purple-100',
            FORM: 'bg-green-50 text-green-700 border-green-100'
        }[type] || 'bg-gray-50 text-gray-700';

        return (
            <div
            key={qp.id}
            onClick={() => onSelect(qp, 'view')}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden"
            >
            <div className={`absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl text-[10px] font-bold tracking-wider border-b border-l ${typeColors}`}>
                {type}
            </div>

            <div className="mb-4 mt-2">
                <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold font-mono border border-slate-200">
                    {qp.docNo}
                </span>
            </div>
            
            <h3 className="font-bold text-slate-800 text-base leading-snug mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {qp.title}
            </h3>

            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-500">Ver. {qp.versionNo}</span>
                    <span>•</span>
                    <span>{qp.dateOfIssue}</span>
                </div>
            </div>

            {/* Edit Permission Check */}
            {isController && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onSelect(qp, 'edit'); }}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all"
                    >
                        <Edit3 size={16} /> Edit Document
                    </button>
                </div>
            )}
            </div>
        );
      });
  };

  const hasResults = (activeCategory === 'FORM' && filteredForms.length > 0) || 
                     (activeCategory !== 'FORM' && filteredQPs.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-slate-800">
      
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
           {/* Logo Section */}
           <div className="flex items-center gap-4">
              <div className="w-10 h-10">
                 <JPTLogo className="w-full h-full object-contain" />
              </div>
              <div>
                  <h1 className="font-bold text-lg leading-tight text-slate-900">JABATAN PERUBATAN TRANSFUSI</h1>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">DOCUMENT MANAGEMENT SYSTEM</p>
              </div>
           </div>
           
           {/* Controls Section */}
           <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                    type="text"
                    className="pl-9 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-full text-sm w-56 lg:w-64 transition-all outline-none"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* User / Login Section */}
              <div className="pl-4 border-l border-gray-200 flex items-center gap-3">
                {user ? (
                   <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                         <p className="text-sm font-bold text-slate-800">{user.name}</p>
                         <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{user.role}</p>
                      </div>
                      <div className="relative group">
                          <button className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isController ? 'border-indigo-100 bg-indigo-50 text-indigo-600' : 'border-gray-100 bg-gray-50 text-gray-600'}`}>
                             <UserCircle size={24} />
                          </button>
                          <button 
                             onClick={onLogoutClick}
                             className="absolute top-12 right-0 bg-white border border-gray-200 shadow-xl rounded-xl p-3 w-40 flex items-center gap-2 text-red-600 hover:bg-red-50 text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 transform translate-y-2 group-hover:translate-y-0"
                          >
                             <LogOut size={16} /> Sign Out
                          </button>
                      </div>
                   </div>
                ) : (
                  // This block should theoretically be unreachable due to App guard, 
                  // but kept empty/minimal or as fallback just in case.
                  <button 
                    onClick={onLoginClick}
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow hover:bg-slate-800 transition-all hover:-translate-y-0.5"
                  >
                    <LogIn size={16} /> Login
                  </button>
                )}
              </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* RECENT UPDATES WIDGET */}
        <div className="mb-8">
           <div className="flex items-center gap-2 mb-3 px-1">
             <Clock size={16} className="text-slate-500" />
             <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Recently Updated Documents</h3>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {recentDocs.map(doc => (
                 <button 
                    key={doc.id} 
                    onClick={() => onSelect(doc, 'view')}
                    className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 transition-all text-left"
                 >
                    <p className="text-[10px] font-mono font-bold text-slate-500 mb-1">{doc.docNo}</p>
                    <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-tight mb-2 h-8">{doc.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100">
                       <span>Ver {doc.versionNo}</span>
                       <span>{doc.dateOfIssue}</span>
                    </div>
                 </button>
              ))}
           </div>
        </div>

        {/* Actions Bar */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t border-gray-200 pt-8">
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 border ${
                            activeCategory === cat.id 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                            : 'bg-white text-slate-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {cat.icon}
                        {cat.label}
                        <span className={`ml-1 text-xs py-0.5 px-2 rounded-full ${activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {cat.id === 'ALL' 
                                ? qps.length 
                                : cat.id === 'FORM' 
                                    ? allForms.length 
                                    : qps.filter(d => getDocType(d.docNo) === cat.id).length
                            }
                        </span>
                    </button>
                ))}
            </div>

            {/* Controller Actions */}
            <div className="flex gap-3">
              <button
                onClick={onMasterListClick}
                className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-lg font-bold shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                 <ListChecks size={18} /> Master List
              </button>

              {isController && (
                  <button 
                      onClick={onUploadClick}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
                  >
                      <UploadCloud size={18} /> Upload Document
                  </button>
              )}
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderContent()}
        </div>
        
        {!hasResults && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
                <FileText size={48} className="text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-500">No documents found</p>
            <p className="text-sm">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};