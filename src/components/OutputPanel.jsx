import React, { useState } from 'react';
import { 
  Copy, Download, ChevronLeft, ChevronRight, 
  CheckCircle, AlertCircle, Loader, Edit3, Eye, FileText, Check, ShieldCheck, Sparkles 
} from 'lucide-react';
import SlidePreview from './previews/SlidePreview';
import SocialPreview from './previews/SocialPreview';
import AdvisoryPreview from './previews/AdvisoryPreview';
import VideoScriptPreview from './previews/VideoScriptPreview';
import EmailPreview from './previews/EmailPreview';
import InfographicPreview from './previews/InfographicPreview';
import toast from 'react-hot-toast';

const FORMAT_CONFIG = [
  { id: 'slides', label: 'Presentation (7 Slides)', component: SlidePreview },
  { id: 'social', label: 'Social Suite', component: SocialPreview },
  { id: 'advisory', label: 'Official Advisory', component: AdvisoryPreview },
  { id: 'videoScript', label: 'Broadcast Script', component: VideoScriptPreview },
  { id: 'email', label: 'Stakeholder Memos', component: EmailPreview },
  { id: 'infographic', label: 'Data Infographic', component: InfographicPreview },
];

export default function OutputPanel({ 
  outputs, 
  analysis, 
  formatStatuses, 
  selectedFormats, 
  config,
  isLoading,
  onUpdateOutput,
  factAudit,
  onOpenFactAuditModal
}) {
  const [activeTab, setActiveTab] = useState('slides');
  const [copiedFormat, setCopiedFormat] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableJson, setEditableJson] = useState('');

  const availableFormats = FORMAT_CONFIG.filter(f => selectedFormats[f.id]);
  const activeFormat = availableFormats.find(f => f.id === activeTab) || availableFormats[0];

  const handleCopy = (id) => {
    const output = outputs[id];
    if (!output?.data) return;
    navigator.clipboard.writeText(JSON.stringify(output.data, null, 2));
    setCopiedFormat(id);
    toast.success(`${id} copied to clipboard!`);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownload = (id) => {
    try {
      const output = outputs[id];
      if (!output?.data) {
        toast.error('No deliverable data to export.');
        return;
      }
      const content = JSON.stringify(output.data, null, 2);
      const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${id}_deliverable_${config?.language || 'en'}.json`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(url);
      }, 1500);
      toast.success(`${id} exported as JSON!`);
    } catch (err) {
      console.error('Download error:', err);
      toast.error(`Download failed: ${err.message}`);
    }
  };

  const handleDownloadAll = () => {
    try {
      const readyKeys = Object.keys(outputs).filter(k => outputs[k]?.data);
      if (readyKeys.length === 0) {
        toast.error('No deliverables available to export.');
        return;
      }
      const bundle = {
        metadata: {
          title: analysis?.title || 'OmniFormat Synthesis',
          language: config?.language,
          audience: config?.audience,
          tone: config?.tone,
          detail: config?.detail,
          timestamp: new Date().toISOString(),
          factAudit: factAudit ? {
            score: factAudit.reliabilityScore,
            verdict: factAudit.verdict,
          } : null,
        },
        deliverables: outputs,
      };
      const content = JSON.stringify(bundle, null, 2);
      const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `omniformat_all_deliverables_${config?.language || 'en'}.json`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(url);
      }, 1500);
      toast.success('All deliverables exported successfully!');
    } catch (err) {
      console.error('Export all error:', err);
      toast.error(`Export failed: ${err.message}`);
    }
  };

  const toggleEditMode = () => {
    if (!isEditing) {
      if (activeFormat && outputs[activeFormat.id]?.data) {
        setEditableJson(JSON.stringify(outputs[activeFormat.id].data, null, 2));
      }
      setIsEditing(true);
    } else {
      try {
        const parsed = JSON.parse(editableJson);
        onUpdateOutput(activeFormat.id, parsed);
        setIsEditing(false);
        toast.success('Edits applied successfully!');
      } catch (err) {
        toast.error('Invalid JSON syntax in editor.');
      }
    }
  };

  const navIndex = availableFormats.findIndex(f => f.id === activeTab);
  const prev = availableFormats[navIndex - 1];
  const next = availableFormats[navIndex + 1];

  // Empty state
  if (!isLoading && Object.keys(outputs).length === 0) {
    return (
      <div className="surface-card flex flex-col items-center justify-center min-h-[500px] gap-6 p-8 text-center border border-[#23314C] shadow-xl bg-[#151D2F] animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl bg-[#1E293B] border border-[#23314C] flex items-center justify-center text-indigo-400 shadow-md">
          <FileText className="w-8 h-8" />
        </div>
        <div className="max-w-md">
          <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Transformation Engine Ready</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Provide your source material on the left and click <strong className="text-indigo-400">Generate Multi-Format Deliverables</strong>. 
            All configured deliverables will be synthesized in parallel with verified factual consistency.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-sm text-left">
          {availableFormats.map(f => (
            <div key={f.id} className="p-3 rounded-xl bg-[#0E1320] border border-[#23314C] text-[11px] text-slate-400 hover:border-indigo-500/40 transition-colors">
              <span className="text-slate-500 block text-[9px] uppercase font-mono">Deliverable</span>
              <span className="font-semibold text-slate-200">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="surface-card flex flex-col overflow-hidden border border-[#23314C] shadow-xl bg-[#151D2F] animate-fade-in">
      {/* Analysis & Active Calibration Callout Bar */}
      {analysis && (
        <div className="p-4 border-b border-[#23314C] bg-[#111726]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-bold text-white tracking-tight">{analysis.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                  analysis.severity === 'CRITICAL' ? 'bg-rose-950/40 text-rose-300 border-rose-800/40' :
                  analysis.severity === 'HIGH' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
                  'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                }`}>
                  {analysis.severity}
                </span>
                
                {/* Fact Audit Indicator Badge */}
                {factAudit && (
                  <button
                    onClick={onOpenFactAuditModal}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Fact Checked: {factAudit.reliabilityScore}/100</span>
                  </button>
                )}
              </div>
              <p className="text-slate-400 text-xs line-clamp-1">{analysis.mainMessage}</p>
            </div>
            {config && (
              <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-[#1E293B] border border-[#23314C] text-indigo-300">
                  Audience: <strong className="text-white">{config.audience.toUpperCase()}</strong>
                </span>
                <span className={`px-2 py-0.5 rounded border ${
                  config.tone === 'urgent' ? 'bg-rose-950/40 text-rose-300 border-rose-800/50' : 'bg-[#1E293B] border-[#23314C] text-slate-300'
                }`}>
                  Tone: <strong className="text-white">{config.tone.toUpperCase()}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1E293B] border border-[#23314C] text-slate-300">
                  Detail: <strong className="text-white">{config.detail.toUpperCase()}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1E293B] border border-[#23314C] text-emerald-300">
                  Lang: <strong className="text-white">{config.language}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Format Tabs Bar */}
      <div className="border-b border-[#23314C] bg-[#0B0F19] px-4 py-2.5 overflow-x-auto flex items-center justify-between gap-3">
        <div className="flex gap-1.5 min-w-max">
          {availableFormats.map((f) => {
            const isReady = outputs[f.id]?.data;
            const isTabActive = activeTab === f.id;
            return (
              <button
                key={f.id}
                onClick={() => { setActiveTab(f.id); setIsEditing(false); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  isTabActive
                    ? 'bg-[#1E293B] text-indigo-400 border border-indigo-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-[#151D2F]'
                }`}
              >
                <span>{f.label}</span>
                {isReady && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1" />}
              </button>
            );
          })}
        </div>

        {/* Global Action Tools */}
        {activeFormat && outputs[activeFormat.id]?.data && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleEditMode}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all duration-150 ${
                isEditing
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm font-bold'
                  : 'bg-[#1E293B] text-slate-200 border-[#23314C] hover:text-white hover:border-indigo-500/40'
              }`}
            >
              {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditing ? 'Save' : 'Edit Output'}</span>
            </button>
            <button
              onClick={() => handleCopy(activeFormat.id)}
              className="btn-secondary flex items-center gap-1 py-1.5 px-3 text-xs"
              title="Copy deliverable JSON"
            >
              <Copy className="w-3.5 h-3.5 text-indigo-400" />
              <span>{copiedFormat === activeFormat.id ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() => handleDownload(activeFormat.id)}
              className="btn-secondary flex items-center gap-1 py-1.5 px-3 text-xs"
              title="Download current format JSON"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export</span>
            </button>
            <button
              onClick={handleDownloadAll}
              className="btn-secondary flex items-center gap-1.5 py-1.5 px-3 text-xs text-indigo-300 hover:text-white"
              title="Download all 6 deliverables bundle"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export All (6)</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-6 flex-1 overflow-y-auto">
        {activeFormat && (
          <div key={activeTab} className="animate-fade-in">
            {formatStatuses[activeFormat.id] === 'loading' && (
              <div className="flex flex-col items-center justify-center py-24 gap-3 animate-fade-in">
                <Loader className="w-7 h-7 text-indigo-400 animate-spin" />
                <p className="text-white text-xs font-semibold">Synthesizing {activeFormat.label} in {config.language}...</p>
                <p className="text-slate-400 text-[10px] font-mono">Calibrating {config.audience} register & factual consistency</p>
              </div>
            )}

            {formatStatuses[activeFormat.id] === 'error' && (
              <div className="flex flex-col items-center justify-center py-20 gap-2">
                <AlertCircle className="w-8 h-8 text-rose-400" />
                <p className="text-rose-300 font-medium text-xs">Synthesis Encountered An Error</p>
                <p className="text-slate-400 text-xs">{outputs[activeFormat.id]?.error}</p>
              </div>
            )}

            {isEditing && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span>Direct JSON Editor for {activeFormat.label}</span>
                  <span className="text-slate-500">Edit values and click Save</span>
                </div>
                <textarea
                  value={editableJson}
                  onChange={(e) => setEditableJson(e.target.value)}
                  className="input-field font-mono text-xs h-96 leading-relaxed bg-[#0E1320] border-[#23314C]"
                />
              </div>
            )}

            {!isEditing && outputs[activeFormat.id]?.data && (
              <activeFormat.component data={outputs[activeFormat.id].data} />
            )}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-[#23314C] bg-[#0B0F19] text-xs text-slate-400 font-medium">
        <button
          onClick={() => prev && setActiveTab(prev.id)}
          disabled={!prev}
          className="flex items-center gap-1.5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{prev?.label || 'Previous'}</span>
        </button>
        <span className="font-mono text-[11px] text-slate-500">
          {navIndex + 1} of {availableFormats.length} Deliverables Synchronized
        </span>
        <button
          onClick={() => next && setActiveTab(next.id)}
          disabled={!next}
          className="flex items-center gap-1.5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <span>{next?.label || 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
