import { AlertTriangle, AlertCircle, Info, Shield, CheckCircle2 } from 'lucide-react';

const SEVERITY_CONFIG = {
  CRITICAL: { bg: 'bg-red-950/50', border: 'border-red-800/60', text: 'text-red-400', label: 'CRITICAL BULLETIN' },
  HIGH: { bg: 'bg-amber-500/15', border: 'border-amber-500/40', text: 'text-amber-400', label: 'HIGH PRIORITY DIRECTIVE' },
  MEDIUM: { bg: 'bg-indigo-500/15', border: 'border-indigo-500/40', text: 'text-indigo-400', label: 'OPERATIONAL ADVISORY' },
  INFO: { bg: 'bg-[#1E293B]', border: 'border-[#23314C]', text: 'text-slate-400', label: 'INFORMATIONAL NOTICE' },
};

export default function AdvisoryPreview({ data }) {
  const severity = SEVERITY_CONFIG[data.severity] || SEVERITY_CONFIG.INFO;

  return (
    <div className="surface-card overflow-hidden font-mono text-xs border border-[#23314C]">
      {/* Header Banner */}
      <div className={`p-4 border-b ${severity.border} ${severity.bg} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Shield className={`w-4 h-4 ${severity.text}`} />
          <span className={`font-bold tracking-wider ${severity.text}`}>{severity.label}</span>
        </div>
        <span className="text-slate-400 font-mono text-[11px]">{data.referenceNumber}</span>
      </div>

      {/* Metadata Bar */}
      <div className="p-5 border-b border-[#23314C] bg-[#111726]">
        <h2 className="text-base font-bold text-white mb-3 font-sans">{data.title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-slate-400">
          <div>
            <span className="text-slate-500 block">ISSUED BY</span>
            <span className="text-white font-medium">{data.issuedBy}</span>
          </div>
          <div>
            <span className="text-slate-500 block">EFFECTIVE DATE</span>
            <span className="text-white font-medium">{data.effectiveDate}</span>
          </div>
          <div>
            <span className="text-slate-500 block">AUDIENCE</span>
            <span className="text-white font-medium">{data.audience}</span>
          </div>
          <div>
            <span className="text-slate-500 block">NEXT REVIEW</span>
            <span className="text-white font-medium">{data.nextReview}</span>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="p-5 flex flex-col gap-5 text-slate-400 bg-[#151D2F]">
        {/* Summary */}
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">
            01. Executive Summary
          </span>
          <p className="bg-[#0B0F19] p-3 rounded-xl border border-[#23314C] leading-relaxed text-slate-200">
            {data.summary}
          </p>
        </div>

        {/* Background */}
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">
            02. Context & Background
          </span>
          <p className="leading-relaxed text-slate-300">
            {data.background}
          </p>
        </div>

        {/* Key Points */}
        {data.keyPoints && data.keyPoints.length > 0 && (
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
              03. Key Operational Findings
            </span>
            <div className="space-y-2">
              {data.keyPoints.map((pt, i) => (
                <div key={i} className="p-3 bg-[#0B0F19] border border-[#23314C] rounded-xl">
                  <div className="font-semibold text-white text-xs mb-1">
                    {String(i + 1).padStart(2, '0')}. {pt.heading}
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{pt.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required Actions */}
        {data.requiredActions && data.requiredActions.length > 0 && (
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">
              04. Mandatory Compliance & Action Items
            </span>
            <div className="space-y-1.5">
              {data.requiredActions.map((action, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 bg-indigo-500/10 border border-indigo-500/25 rounded-xl text-white text-[11px]">
                  <span className="text-indigo-400 font-bold">▶</span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-[#23314C] text-[10px] text-slate-500 flex flex-col gap-1">
          <p>{data.contactInfo}</p>
          <p>{data.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
