import React from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, X, 
  Activity, FileCheck, ArrowRight, RefreshCw 
} from 'lucide-react';

export default function FactCheckModal({ audit, onClose, onReCheck, isChecking }) {
  if (!audit) return null;

  const getVerdictBadge = (verdict) => {
    switch (verdict) {
      case 'VERIFIED':
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
          icon: CheckCircle2,
          label: 'Factual & Contextually Verified',
        };
      case 'GENERALLY_RELIABLE':
        return {
          bg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/40',
          icon: ShieldCheck,
          label: 'Generally Reliable & Coherent',
        };
      case 'NEEDS_CORROBORATION':
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
          icon: AlertTriangle,
          label: 'Requires Corroboration / Ambiguous',
        };
      default:
        return {
          bg: 'bg-rose-950/40 text-rose-300 border-rose-700/50',
          icon: AlertTriangle,
          label: 'Contested / High Variance Claims',
        };
    }
  };

  const badgeInfo = getVerdictBadge(audit.verdict);
  const VerdictIcon = badgeInfo.icon;

  return (
    <div 
      className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="surface-card w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-[#23314C] overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#23314C] bg-[#111726] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5 animate-pulse-glow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">AI Fact & Context Verification Audit</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  Active Inspector
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Empirical claim validation & contextual contest analysis</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#1E293B] hover:bg-[#283548] border border-[#23314C] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 bg-[#151D2F]">
          {/* Top Score & Verdict Card */}
          <div className="p-4 rounded-xl bg-[#1E293B] border border-[#23314C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0B0F19] border border-[#23314C]">
                <div className="text-center">
                  <span className="text-xl font-extrabold text-white font-mono leading-none">
                    {audit.reliabilityScore}
                  </span>
                  <span className="block text-[9px] text-slate-500 font-mono mt-0.5">/ 100</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-300 font-medium">Reliability & Coherence Score</div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold mt-1 border ${badgeInfo.bg}`}>
                  <VerdictIcon className="w-3.5 h-3.5" />
                  <span>{badgeInfo.label}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onReCheck}
              disabled={isChecking}
              className="btn-secondary text-xs flex items-center justify-center gap-1.5 py-2 px-3.5 self-start sm:self-auto font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
              <span>{isChecking ? 'Re-inspecting...' : 'Re-verify'}</span>
            </button>
          </div>

          {/* Context Assessment Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Activity className="w-3.5 h-3.5 text-indigo-400" /> Executive Context Summary
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed bg-[#0B0F19] p-4 rounded-xl border border-[#23314C]">
              {audit.summary}
            </p>
          </div>

          {/* Context Integrity Matrix */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5 font-mono">
              <FileCheck className="w-3.5 h-3.5 text-indigo-400" /> Context Integrity Dimensions
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#23314C]">
                <span className="text-[10px] text-slate-500 block font-mono">Domain</span>
                <span className="font-semibold text-white truncate block mt-0.5">{audit.domain || 'Operational'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#23314C]">
                <span className="text-[10px] text-slate-500 block font-mono">Internal Coherence</span>
                <span className="font-semibold text-emerald-400 block mt-0.5">{audit.contextIntegrity?.coherence || 'High'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#23314C]">
                <span className="text-[10px] text-slate-500 block font-mono">Timeline Plausibility</span>
                <span className="font-semibold text-white block mt-0.5">{audit.contextIntegrity?.timelinePlausibility || 'Consistent'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#23314C]">
                <span className="text-[10px] text-slate-500 block font-mono">Attribution Clarity</span>
                <span className="font-semibold text-white block mt-0.5">{audit.contextIntegrity?.attributionClarity || 'Direct'}</span>
              </div>
            </div>
          </div>

          {/* Claims Verified Breakdown */}
          {audit.claims && audit.claims.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Extracted Claims & Verification Status
              </h4>
              <div className="space-y-2">
                {audit.claims.map((claim, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#23314C] text-xs">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-white font-medium leading-snug">"{claim.claim}"</p>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold flex-shrink-0 border ${
                        claim.status === 'VERIFIED'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                          : claim.status === 'PLAUSIBLE'
                          ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/40'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                      }`}>
                        {claim.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1">{claim.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contested Items or Ambiguities */}
          {audit.contestedItems && audit.contestedItems.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
              <div className="flex items-center gap-2 mb-2 text-amber-400 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Contextual Notes & Clarification Suggestions</span>
              </div>
              <div className="space-y-2.5">
                {audit.contestedItems.map((item, idx) => (
                  <div key={idx} className="border-t border-amber-500/20 pt-2 first:border-0 first:pt-0">
                    <p className="text-white font-medium">• {item.issue}</p>
                    <p className="text-amber-300/90 text-[11px] mt-0.5 pl-3">
                      <strong>Recommendation:</strong> {item.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#23314C] bg-[#111726] flex items-center justify-between">
          <div className="text-[11px] text-slate-400 font-mono">
            {audit.safeToPublish ? '✓ Verified Safe for Enterprise Synthesis' : '⚠️ Minor context adjustments suggested'}
          </div>
          <button
            onClick={onClose}
            className="btn-primary text-xs flex items-center gap-1.5 py-2 px-4"
          >
            <span>Confirm & Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
