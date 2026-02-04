
import React, { useState } from 'react';
import { QPData, ProcedureStep, RecordItem, AmendmentItem, FlowchartStep, DistributionItem, Attachment } from '../types';
import { Save, ArrowLeft, Plus, Trash2, FileText, List, History, Shield, Table, GitMerge, ArrowUp, ArrowDown, Share2, Paperclip } from 'lucide-react';
import { FlowchartRenderer } from './FlowchartRenderer';

interface DocumentEditorProps {
  data: QPData;
  onSave: (updatedQP: QPData) => void;
  onCancel: () => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ data, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState<'meta' | 'content' | 'procedures' | 'records' | 'flowchart' | 'distribution' | 'attachments'>('meta');
  const [formData, setFormData] = useState<QPData>(data);
  const [changeLog, setChangeLog] = useState('');

  // --- Handlers ---

  const handleChange = (field: keyof QPData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: 'preparedBy' | 'approvedBy', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleContentChange = (field: keyof NonNullable<QPData['content']>, value: string) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  // Procedures
  const handleProcedureChange = (index: number, field: keyof ProcedureStep, value: string) => {
    const newProcedures = [...formData.procedures];
    newProcedures[index] = { ...newProcedures[index], [field]: value };
    setFormData(prev => ({ ...prev, procedures: newProcedures }));
  };

  const addProcedure = () => {
    setFormData(prev => ({
      ...prev,
      procedures: [...prev.procedures, { no: '', activity: '', responsibility: '' }]
    }));
  };

  const removeProcedure = (index: number) => {
    setFormData(prev => ({
      ...prev,
      procedures: prev.procedures.filter((_, i) => i !== index)
    }));
  };

  // Records
  const handleRecordChange = (index: number, field: keyof RecordItem, value: string) => {
    const currentRecords = formData.content?.records || [];
    const newRecords = [...currentRecords];
    newRecords[index] = { ...newRecords[index], [field]: value };
    
    setFormData(prev => ({
        ...prev,
        content: {
            ...prev.content,
            records: newRecords
        }
    }));
  };

  const addRecord = () => {
      const currentRecords = formData.content?.records || [];
      const newRecord: RecordItem = { no: '', type: '', fileNo: '', location: '', retention: '' };
      setFormData(prev => ({
          ...prev,
          content: {
              ...prev.content,
              records: [...currentRecords, newRecord]
          }
      }));
  };

  const removeRecord = (index: number) => {
      const currentRecords = formData.content?.records || [];
      setFormData(prev => ({
          ...prev,
          content: {
              ...prev.content,
              records: currentRecords.filter((_, i) => i !== index)
          }
      }));
  };

  // Distribution List
  const handleDistributionChange = (index: number, field: keyof DistributionItem, value: string) => {
      const currentList = formData.content?.distributionList || [];
      const newList = [...currentList];
      newList[index] = { ...newList[index], [field]: value };

      setFormData(prev => ({
          ...prev,
          content: {
              ...prev.content,
              distributionList: newList
          }
      }));
  };

  const addDistributionItem = () => {
      const currentList = formData.content?.distributionList || [];
      const newItem: DistributionItem = { copyNo: '', location: '' };
      setFormData(prev => ({
          ...prev,
          content: {
              ...prev.content,
              distributionList: [...currentList, newItem]
          }
      }));
  };

  const removeDistributionItem = (index: number) => {
      const currentList = formData.content?.distributionList || [];
      setFormData(prev => ({
          ...prev,
          content: {
              ...prev.content,
              distributionList: currentList.filter((_, i) => i !== index)
          }
      }));
  };

  // Attachments (Forms)
  const handleAttachmentChange = (index: number, field: keyof Attachment, value: any) => {
    const currentAttachments = formData.attachments || [];
    const newAttachments = [...currentAttachments];
    newAttachments[index] = { ...newAttachments[index], [field]: value };
    setFormData(prev => ({ ...prev, attachments: newAttachments }));
  };

  const addAttachment = () => {
      const newAttachment: Attachment = {
          id: `att-${Date.now()}`,
          docNo: 'HSAH/JPT/FE...',
          title: 'NEW FORM',
          content: 'Enter form content here...'
      };
      setFormData(prev => ({
          ...prev,
          attachments: [...(prev.attachments || []), newAttachment]
      }));
  };

  const removeAttachment = (index: number) => {
      const currentAttachments = formData.attachments || [];
      setFormData(prev => ({
          ...prev,
          attachments: currentAttachments.filter((_, i) => i !== index)
      }));
  };

  // Flowchart Logic
  const handleFlowchartStepChange = (index: number, field: keyof FlowchartStep, value: string) => {
      const currentSteps = formData.content?.flowchartData || [];
      const newSteps = [...currentSteps];
      newSteps[index] = { ...newSteps[index], [field]: value };
      
      setFormData(prev => ({
          ...prev,
          content: { ...prev.content, flowchartData: newSteps }
      }));
  };

  const addFlowchartStep = () => {
      const currentSteps = formData.content?.flowchartData || [];
      const newStep: FlowchartStep = { 
          id: `step-${Date.now()}`, 
          type: 'process', 
          label: 'New Process Step' 
      };
      
      setFormData(prev => ({
          ...prev,
          content: { ...prev.content, flowchartData: [...currentSteps, newStep] }
      }));
  };

  const removeFlowchartStep = (index: number) => {
      const currentSteps = formData.content?.flowchartData || [];
      setFormData(prev => ({
          ...prev,
          content: { ...prev.content, flowchartData: currentSteps.filter((_, i) => i !== index) }
      }));
  };

  const moveFlowchartStep = (index: number, direction: 'up' | 'down') => {
      const currentSteps = formData.content?.flowchartData || [];
      if (direction === 'up' && index === 0) return;
      if (direction === 'down' && index === currentSteps.length - 1) return;

      const newSteps = [...currentSteps];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = newSteps[targetIndex];
      newSteps[targetIndex] = newSteps[index];
      newSteps[index] = temp;

      setFormData(prev => ({
          ...prev,
          content: { ...prev.content, flowchartData: newSteps }
      }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalData = { ...formData };

    if (changeLog.trim()) {
      const newAmendment: AmendmentItem = {
        no: formData.amendmentNo,
        version: formData.versionNo,
        date: new Date().toLocaleDateString('en-GB'),
        details: changeLog
      };

      const existingAmendments = finalData.content?.amendments || [];
      
      finalData = {
        ...finalData,
        content: {
          ...finalData.content,
          amendments: [newAmendment, ...existingAmendments]
        }
      };
    }

    onSave(finalData);
  };

  // Helper to handle displaying existing JSX content vs String
  const getDisplayValue = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (!node) return '';
    return ''; 
  };

  const isComplexContent = (node: React.ReactNode): boolean => {
      return node !== undefined && node !== null && typeof node !== 'string';
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-30 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-lg">Document Controller</h1>
            <p className="text-xs text-slate-400">Editing: {formData.docNo}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
        >
          <Save size={18} />
          Save & Publish
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('meta')}
            className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'meta' ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <Shield size={20} /> Metadata & Info
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'content' ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <FileText size={20} /> Content Sections
          </button>
          <button 
            onClick={() => setActiveTab('procedures')}
            className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'procedures' ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <List size={20} /> Procedures
          </button>
          <button 
            onClick={() => setActiveTab('records')}
            className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'records' ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <Table size={20} /> Records
          </button>
          <button 
            onClick={() => setActiveTab('distribution')}
            className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'distribution' ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <Share2 size={20} /> Distribution List
          </button>
          <button 
            onClick={() => setActiveTab('flowchart')}
            className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'flowchart' ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <GitMerge size={20} /> Flowchart
          </button>
          <button 
            onClick={() => setActiveTab('attachments')}
            className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'attachments' ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <Paperclip size={20} /> Forms / Attachments
          </button>

          {/* Amendment Control Panel */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="font-bold text-yellow-800 text-sm mb-2 flex items-center gap-2">
              <History size={16} /> Amendment Recorder
            </h3>
            <p className="text-xs text-yellow-700 mb-3">
              Changes entered here will be automatically added to the Amendment Record table upon saving.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-yellow-800 mb-1">New Version No</label>
                <input 
                  type="text" 
                  value={formData.versionNo}
                  onChange={(e) => handleChange('versionNo', e.target.value)}
                  className="w-full text-sm border-yellow-300 rounded p-1"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-yellow-800 mb-1">New Amendment No</label>
                <input 
                  type="text" 
                  value={formData.amendmentNo}
                  onChange={(e) => handleChange('amendmentNo', e.target.value)}
                  className="w-full text-sm border-yellow-300 rounded p-1"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-yellow-800 mb-1">Description of Changes</label>
                <textarea 
                  value={changeLog}
                  onChange={(e) => setChangeLog(e.target.value)}
                  className="w-full text-sm border-yellow-300 rounded p-2 h-24"
                  placeholder="E.g. Updated procedure 5.1 to include new safety steps..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          
          {activeTab === 'meta' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 pb-4 border-b">Document Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Document No</label>
                  <input type="text" value={formData.docNo} onChange={(e) => handleChange('docNo', e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                  <input type="text" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Issue</label>
                  <input type="text" value={formData.dateOfIssue} onChange={(e) => handleChange('dateOfIssue', e.target.value)} className="w-full border p-2 rounded" />
                </div>
              </div>

              <h3 className="font-bold text-slate-800 mt-8 mb-4">Signatories</h3>
              <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded">
                <div>
                  <h4 className="font-bold text-sm mb-2 text-blue-600">Prepared By</h4>
                  <div className="space-y-3">
                    <input type="text" placeholder="Name" value={formData.preparedBy.name} onChange={(e) => handleNestedChange('preparedBy', 'name', e.target.value)} className="w-full border p-2 rounded text-sm" />
                    <input type="text" placeholder="Designation" value={formData.preparedBy.designation} onChange={(e) => handleNestedChange('preparedBy', 'designation', e.target.value)} className="w-full border p-2 rounded text-sm" />
                    <input type="text" placeholder="Date" value={formData.preparedBy.date} onChange={(e) => handleNestedChange('preparedBy', 'date', e.target.value)} className="w-full border p-2 rounded text-sm" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-2 text-green-600">Approved By</h4>
                  <div className="space-y-3">
                    <input type="text" placeholder="Name" value={formData.approvedBy.name} onChange={(e) => handleNestedChange('approvedBy', 'name', e.target.value)} className="w-full border p-2 rounded text-sm" />
                    <input type="text" placeholder="Designation" value={formData.approvedBy.designation} onChange={(e) => handleNestedChange('approvedBy', 'designation', e.target.value)} className="w-full border p-2 rounded text-sm" />
                    <input type="text" placeholder="Date" value={formData.approvedBy.date} onChange={(e) => handleNestedChange('approvedBy', 'date', e.target.value)} className="w-full border p-2 rounded text-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 pb-4 border-b">Content Sections (1.0 - 4.0)</h2>
              <div className="p-4 bg-blue-50 text-blue-800 text-sm rounded mb-4">
                <strong>Formatting Notice:</strong> If a field is blank below but has content in the viewer, it contains complex formatting (tables/lists). 
                Typing here will <strong>overwrite</strong> the formatted content with plain text.
              </div>
              
              {([
                  { label: '1.0 Objectives', field: 'objectives' },
                  { label: '2.0 Scope', field: 'scope' },
                  { label: '3.0 References', field: 'references' },
                  { label: '4.0 Definitions', field: 'definitions' },
              ] as const).map((section) => (
                  <div key={section.field}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{section.label}</label>
                    <textarea 
                      rows={5}
                      value={getDisplayValue(formData.content?.[section.field])} 
                      onChange={(e) => handleContentChange(section.field, e.target.value)} 
                      placeholder={isComplexContent(formData.content?.[section.field]) ? "[Complex Formatting Present] - Editing will overwrite." : "Enter content here..."}
                      className="w-full border p-2 rounded font-mono text-sm" 
                    />
                  </div>
              ))}
            </div>
          )}

          {activeTab === 'procedures' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b">
                 <h2 className="text-xl font-bold text-slate-800">5.0 Procedures</h2>
                 <button onClick={addProcedure} className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">
                    <Plus size={16} /> Add Step
                 </button>
              </div>

              <div className="space-y-4">
                {formData.procedures.map((proc, idx) => (
                  <div key={idx} className="border border-gray-200 rounded p-4 relative bg-gray-50 group hover:border-blue-400 hover:bg-white transition-all">
                    <button 
                        onClick={() => removeProcedure(idx)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove step"
                    >
                        <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-[80px_1fr] gap-4 mb-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Step No</label>
                            <input 
                                type="text" 
                                value={proc.no} 
                                onChange={(e) => handleProcedureChange(idx, 'no', e.target.value)}
                                className="w-full border p-1 rounded text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Responsibility</label>
                            <input 
                                type="text" 
                                value={proc.responsibility} 
                                onChange={(e) => handleProcedureChange(idx, 'responsibility', e.target.value)}
                                className="w-full border p-1 rounded text-sm" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Activity</label>
                        <textarea 
                            rows={3}
                            value={getDisplayValue(proc.activity)} 
                            onChange={(e) => handleProcedureChange(idx, 'activity', e.target.value)}
                            placeholder={isComplexContent(proc.activity) ? "[Complex Formatting] - Editing will overwrite." : ""}
                            className="w-full border p-2 rounded text-sm" 
                        />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {activeTab === 'records' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                     <h2 className="text-xl font-bold text-slate-800">6.0 Records</h2>
                     <button onClick={addRecord} className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">
                        <Plus size={16} /> Add Record
                     </button>
                </div>
                
                <div className="space-y-4">
                    {formData.content?.records?.map((rec, idx) => (
                        <div key={idx} className="border border-gray-200 rounded p-4 relative bg-gray-50 group hover:border-blue-400 hover:bg-white transition-all">
                             <button 
                                onClick={() => removeRecord(idx)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove record"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">No</label>
                                    <input type="text" value={rec.no} onChange={(e) => handleRecordChange(idx, 'no', e.target.value)} className="w-full border p-1 rounded text-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Type of Record</label>
                                    <input type="text" value={rec.type} onChange={(e) => handleRecordChange(idx, 'type', e.target.value)} className="w-full border p-1 rounded text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">File No</label>
                                    <input type="text" value={rec.fileNo} onChange={(e) => handleRecordChange(idx, 'fileNo', e.target.value)} className="w-full border p-1 rounded text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Location</label>
                                    <input type="text" value={rec.location} onChange={(e) => handleRecordChange(idx, 'location', e.target.value)} className="w-full border p-1 rounded text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Retention</label>
                                    <input type="text" value={rec.retention} onChange={(e) => handleRecordChange(idx, 'retention', e.target.value)} className="w-full border p-1 rounded text-sm" />
                                </div>
                            </div>
                        </div>
                    ))}
                    {(!formData.content?.records || formData.content.records.length === 0) && (
                        <div className="text-center py-12 text-gray-400 italic bg-gray-50 rounded border border-dashed">
                            No records defined. Click "Add Record" to begin.
                        </div>
                    )}
                </div>
            </div>
        )}

        {activeTab === 'distribution' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                     <h2 className="text-xl font-bold text-slate-800">Distribution List</h2>
                     <button onClick={addDistributionItem} className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">
                        <Plus size={16} /> Add Copy
                     </button>
                </div>
                
                <div className="space-y-4">
                    {formData.content?.distributionList?.map((item, idx) => (
                        <div key={idx} className="border border-gray-200 rounded p-4 relative bg-gray-50 group hover:border-blue-400 hover:bg-white transition-all">
                             <button 
                                onClick={() => removeDistributionItem(idx)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove copy"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-[80px_1fr] gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Copy No</label>
                                    <input 
                                        type="text" 
                                        value={item.copyNo} 
                                        onChange={(e) => handleDistributionChange(idx, 'copyNo', e.target.value)} 
                                        className="w-full border p-2 rounded text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Location / Path</label>
                                    <input 
                                        type="text" 
                                        value={item.location} 
                                        onChange={(e) => handleDistributionChange(idx, 'location', e.target.value)} 
                                        className="w-full border p-2 rounded text-sm" 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {(!formData.content?.distributionList || formData.content.distributionList.length === 0) && (
                        <div className="text-center py-12 text-gray-400 italic bg-gray-50 rounded border border-dashed">
                            No distribution copies defined. Click "Add Copy" to begin.
                        </div>
                    )}
                </div>
            </div>
        )}

        {activeTab === 'flowchart' && (
            <div className="space-y-8">
                <div className="flex justify-between items-center pb-4 border-b">
                     <h2 className="text-xl font-bold text-slate-800">7.0 Flowchart Editor</h2>
                     <button onClick={addFlowchartStep} className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">
                        <Plus size={16} /> Add Step
                     </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Editor Side */}
                    <div className="space-y-3">
                         {(!formData.content?.flowchartData || formData.content.flowchartData.length === 0) && (
                             <div className="p-4 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
                                No flowchart steps defined yet. Click "Add Step" to build your flowchart visually.
                             </div>
                         )}

                         {formData.content?.flowchartData?.map((step, idx) => (
                             <div key={step.id} className="bg-white border border-gray-200 p-4 rounded shadow-sm relative group hover:border-blue-400">
                                 <div className="absolute right-2 top-2 flex gap-1">
                                    <button onClick={() => moveFlowchartStep(idx, 'up')} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700" title="Move Up"><ArrowUp size={14}/></button>
                                    <button onClick={() => moveFlowchartStep(idx, 'down')} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700" title="Move Down"><ArrowDown size={14}/></button>
                                    <button onClick={() => removeFlowchartStep(idx)} className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500" title="Delete Step"><Trash2 size={14}/></button>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 gap-2 pr-16">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="col-span-1">
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase">Type</label>
                                            <select 
                                                value={step.type}
                                                onChange={(e) => handleFlowchartStepChange(idx, 'type', e.target.value as any)}
                                                className="w-full border p-1 rounded text-sm bg-gray-50"
                                            >
                                                <option value="start">Start</option>
                                                <option value="process">Process</option>
                                                <option value="decision">Decision</option>
                                                <option value="end">End</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase">Label Text</label>
                                            <input 
                                                type="text" 
                                                value={step.label}
                                                onChange={(e) => handleFlowchartStepChange(idx, 'label', e.target.value)}
                                                className="w-full border p-1 rounded text-sm"
                                            />
                                        </div>
                                    </div>
                                    
                                    {step.type === 'decision' && (
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase">Secondary Label (Optional)</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. 'No' path description"
                                                value={step.secondaryLabel || ''}
                                                onChange={(e) => handleFlowchartStepChange(idx, 'secondaryLabel', e.target.value)}
                                                className="w-full border p-1 rounded text-sm"
                                            />
                                        </div>
                                    )}
                                 </div>
                             </div>
                         ))}
                    </div>

                    {/* Live Preview Side */}
                    <div className="bg-gray-100 rounded-lg p-4 min-h-[400px] border border-gray-300 flex flex-col">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">Live Preview</h3>
                        <div className="flex-grow bg-white rounded border border-gray-200 p-4 overflow-y-auto">
                            <FlowchartRenderer steps={formData.content?.flowchartData || []} />
                        </div>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'attachments' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                     <h2 className="text-xl font-bold text-slate-800">Forms & Attachments</h2>
                     <button onClick={addAttachment} className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">
                        <Plus size={16} /> Add New Form
                     </button>
                </div>
                
                <div className="space-y-6">
                    {formData.attachments?.map((att, idx) => (
                        <div key={att.id} className="border border-gray-200 rounded-lg p-6 relative bg-gray-50 group hover:border-blue-400 hover:bg-white transition-all shadow-sm">
                             <button 
                                onClick={() => removeAttachment(idx)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded"
                                title="Remove Attachment"
                            >
                                <Trash2 size={20} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Form Document No</label>
                                    <input 
                                        type="text" 
                                        value={att.docNo} 
                                        onChange={(e) => handleAttachmentChange(idx, 'docNo', e.target.value)} 
                                        className="w-full border p-2 rounded text-sm font-bold" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Title</label>
                                    <input 
                                        type="text" 
                                        value={att.title} 
                                        onChange={(e) => handleAttachmentChange(idx, 'title', e.target.value)} 
                                        className="w-full border p-2 rounded text-sm" 
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Content (Form Layout)</label>
                                <textarea 
                                    rows={8}
                                    value={getDisplayValue(att.content)} 
                                    onChange={(e) => handleAttachmentChange(idx, 'content', e.target.value)} 
                                    placeholder={isComplexContent(att.content) ? "[Complex Form Layout] - Editing will overwrite existing complex layout with plain text." : "Enter form structure or text here..."}
                                    className="w-full border p-3 rounded text-sm font-mono" 
                                />
                                <p className="text-[10px] text-gray-400 mt-1 italic">
                                    Note: You can paste HTML structure or simple text here. Complex existing forms (like those in QP14) may display as [Complex Object] and will be simplified if edited.
                                </p>
                            </div>
                        </div>
                    ))}
                    {(!formData.attachments || formData.attachments.length === 0) && (
                        <div className="text-center py-16 text-gray-400 italic bg-gray-50 rounded border border-dashed flex flex-col items-center gap-2">
                            <Paperclip size={32} className="opacity-20"/>
                            <p>No forms or attachments found.</p>
                            <button onClick={addAttachment} className="text-blue-600 hover:underline text-sm font-bold">Create First Form</button>
                        </div>
                    )}
                </div>
            </div>
        )}

        </div>
      </div>
    </div>
  );
};
