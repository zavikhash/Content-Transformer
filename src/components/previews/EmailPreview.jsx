import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

const PRIORITY_CONFIG = {
  HIGH: { badge: 'bg-red-950/50 text-red-400 border-red-800/60', label: 'HIGH PRIORITY' },
  NORMAL: { badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/40', label: 'STANDARD' },
  LOW: { badge: 'bg-[#1E293B] text-slate-400 border-[#23314C]', label: 'INFO' },
};

export default function EmailPreview({ data }) {
  const [activeVariant, setActiveVariant] = useState(0);
  const email = data.variants?.[activeVariant];

  if (!email) return null;
  const priority = PRIORITY_CONFIG[email.priority] || PRIORITY_CONFIG.NORMAL;

  return (
    <div className="flex flex-col gap-4">
      {/* Variant Selector Tabs */}
      <div className="flex gap-2">
        {data.variants?.map((v, i) => (
          <button
            key={i}
            onClick={() => setActiveVariant(i)}
            className={`flex-1 p-3 rounded-xl border text-left transition-colors ${
              activeVariant === i
                ? 'bg-[#1E293B] border-indigo-500 text-white'
                : 'bg-[#0B0F19] border-[#23314C] text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold">{v.type}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono ${PRIORITY_CONFIG[v.priority]?.badge}`}>
                {v.priority}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">{v.subject}</p>
          </button>
        ))}
      </div>

      {/* Email Body Card */}
      <div className="surface-card overflow-hidden border border-[#23314C]">
        {/* Header */}
        <div className="p-4 border-b border-[#23314C] bg-[#111726] space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">FROM: <strong className="text-white font-medium">{email.from}</strong></span>
            <span className={`text-[10px] px-2 py-0.5 rounded border font-mono font-medium ${priority.badge}`}>
              {priority.label}
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">TO: <span className="text-white">{email.to}</span></span>
          </div>
          <div className="pt-2 border-t border-[#23314C]">
            <h3 className="font-semibold text-white text-sm">{email.subject}</h3>
            {email.preheader && (
              <p className="text-slate-400 text-xs mt-0.5">{email.preheader}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs leading-relaxed text-slate-300 bg-[#151D2F]">
          <p className="font-medium text-white">{email.greeting}</p>
          <p>{email.opening}</p>
          <p className="text-slate-200 whitespace-pre-line bg-[#0B0F19] p-3.5 rounded-xl border border-[#23314C]">
            {email.body}
          </p>

          {/* Key points */}
          {email.keyPoints && email.keyPoints.length > 0 && (
            <div className="p-3.5 bg-[#0B0F19] rounded-xl border border-[#23314C] space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Key Action Points
              </span>
              <div className="space-y-1.5">
                {email.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p>{email.closing}</p>
          <div className="pt-3 border-t border-[#23314C] text-slate-500 whitespace-pre-line text-[11px]">
            {email.signature}
          </div>
        </div>
      </div>
    </div>
  );
}
