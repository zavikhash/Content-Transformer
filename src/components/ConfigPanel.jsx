import React from 'react';
import { Users, MessageSquare, Globe, Sliders, CheckSquare, Sparkles } from 'lucide-react';

const AUDIENCES = [
  { id: 'executive', label: 'Executive', desc: 'Strategic priorities, ROI, governance' },
  { id: 'employee', label: 'Employee', desc: 'Operational clarity & action items' },
  { id: 'public', label: 'Public', desc: 'Jargon-free transparent communication' },
  { id: 'technical', label: 'Technical', desc: 'Precise metrics, protocols, CVEs' },
];

const TONES = [
  { id: 'formal', label: 'Formal' },
  { id: 'neutral', label: 'Neutral' },
  { id: 'casual', label: 'Casual' },
  { id: 'urgent', label: 'Urgent' },
];

const OUTPUT_LANGUAGES = [
  { id: 'English', label: 'English', native: 'English' },
  { id: 'Hindi', label: 'Hindi', native: 'हिन्दी' },
  { id: 'Spanish', label: 'Spanish', native: 'Español' },
  { id: 'French', label: 'French', native: 'Français' },
  { id: 'German', label: 'German', native: 'Deutsch' },
  { id: 'Arabic', label: 'Arabic', native: 'العربية' },
  { id: 'Japanese', label: 'Japanese', native: '日本語' },
  { id: 'Chinese', label: 'Chinese', native: '中文' },
  { id: 'Portuguese', label: 'Portuguese', native: 'Português' },
  { id: 'Russian', label: 'Russian', native: 'Русский' },
  { id: 'Italian', label: 'Italian', native: 'Italiano' },
];

const DETAILS = [
  { id: 'brief', label: 'Brief', desc: 'Executive Summary' },
  { id: 'standard', label: 'Standard', desc: 'Balanced Context' },
  { id: 'detailed', label: 'Detailed', desc: 'Full Deep Dive' },
];

const FORMATS = [
  { id: 'slides', label: 'Presentation Deck', desc: 'Guaranteed 7-Slide Deck' },
  { id: 'social', label: 'Social Media Suite', desc: 'X/Twitter, LinkedIn, Meta' },
  { id: 'advisory', label: 'Official Advisory', desc: 'Formal compliance bulletin' },
  { id: 'videoScript', label: 'Broadcast Script', desc: 'Scene-by-scene timing' },
  { id: 'email', label: 'Stakeholder Memos', desc: 'Exec brief & team notice' },
  { id: 'infographic', label: 'Data Infographic', desc: 'Metrics & chronological steps' },
];

export default function ConfigPanel({ config, onChange }) {
  const toggleFormat = (id) => {
    onChange({ 
      ...config, 
      formats: { ...config.formats, [id]: !config.formats[id] } 
    });
  };

  const selectedCount = Object.values(config.formats).filter(Boolean).length;

  return (
    <div className="surface-card p-5 flex flex-col gap-4 h-full shadow-lg border border-[#23314C] hover:border-indigo-500/30 transition-all duration-200 bg-[#151D2F]">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-white text-sm tracking-tight">Calibration Parameters</h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#1E293B] text-indigo-300 border border-indigo-500/30">
            Target Tuning
          </span>
        </div>
        <p className="text-slate-400 text-xs mt-0.5">Define target output channel language, audience register, and tone</p>
      </div>

      {/* Target Output Language Channel */}
      <div className="p-3 bg-[#0E1320] rounded-xl border border-[#23314C]">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <Globe className="w-3.5 h-3.5 text-indigo-400" /> Target Output Language Channel
          </label>
          <span className="text-[10px] text-slate-500 font-mono">All Input Langs Accepted</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {OUTPUT_LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => onChange({ ...config, language: lang.id })}
              className={`py-1.5 px-2.5 rounded-lg text-xs font-medium text-left flex items-center justify-between border transition-all duration-150 ${
                config.language === lang.id
                  ? 'bg-[#4F46E5] border-indigo-500 text-white font-bold shadow-[0_2px_10px_rgba(79,70,229,0.35)] scale-[1.01]'
                  : 'bg-[#151D2F] border-[#23314C] text-slate-400 hover:text-white hover:border-indigo-500/40'
              }`}
            >
              <span>{lang.label}</span>
              <span className="text-[10px] opacity-80 font-normal">{lang.native}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Target Audience */}
      <div>
        <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-mono">
          <Users className="w-3.5 h-3.5 text-indigo-400" /> Target Audience Register
        </label>
        <div className="grid grid-cols-2 gap-2">
          {AUDIENCES.map((a) => (
            <button
              key={a.id}
              onClick={() => onChange({ ...config, audience: a.id })}
              className={`p-2.5 rounded-xl border text-left transition-all duration-150 ${
                config.audience === a.id
                  ? 'bg-[#1E293B] border-indigo-500 text-white shadow-[0_2px_12px_rgba(99,102,241,0.2)]'
                  : 'bg-[#0E1320] border-[#23314C] text-slate-400 hover:border-indigo-500/30 hover:text-white'
              }`}
            >
              <p className="text-xs font-semibold leading-none">{a.label}</p>
              <p className="text-[10px] text-slate-500 mt-1">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tone & Detail Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Tone */}
        <div>
          <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-mono">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> Tone
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => onChange({ ...config, tone: t.id })}
                className={`py-1.5 px-2 rounded-lg border text-xs font-semibold text-center transition-all duration-150 ${
                  config.tone === t.id
                    ? 'bg-[#4F46E5] border-indigo-500 text-white font-bold shadow-[0_2px_8px_rgba(79,70,229,0.3)]'
                    : 'bg-[#0E1320] border-[#23314C] text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detail Level */}
        <div>
          <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-mono">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Detail
          </label>
          <div className="grid grid-cols-3 gap-1">
            {DETAILS.map((d) => (
              <button
                key={d.id}
                onClick={() => onChange({ ...config, detail: d.id })}
                className={`py-1.5 px-1 rounded-lg border text-xs font-semibold text-center transition-all duration-150 ${
                  config.detail === d.id
                    ? 'bg-[#4F46E5] border-indigo-500 text-white font-bold shadow-[0_2px_8px_rgba(79,70,229,0.3)]'
                    : 'bg-[#0E1320] border-[#23314C] text-slate-400 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output Formats Multi-Select */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <CheckSquare className="w-3.5 h-3.5 text-indigo-400" /> Synchronized Output Deliverables
          </label>
          <span className="text-[11px] text-indigo-400 font-mono font-semibold">{selectedCount}/6 Selected</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {FORMATS.map((f) => {
            const isChecked = config.formats[f.id];
            return (
              <button
                key={f.id}
                onClick={() => toggleFormat(f.id)}
                className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all duration-150 ${
                  isChecked
                    ? 'bg-[#1E293B] border-indigo-500/60 text-white shadow-xs'
                    : 'bg-[#0E1320] border-[#23314C] text-slate-500 hover:border-[#23314C]/80 hover:text-slate-300'
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-white">{f.label}</p>
                  <p className="text-[9px] text-slate-400">{f.desc}</p>
                </div>
                <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ml-1.5 transition-colors ${
                  isChecked ? 'bg-[#4F46E5] text-white font-bold shadow-xs' : 'border border-[#23314C] text-transparent'
                }`}>
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
