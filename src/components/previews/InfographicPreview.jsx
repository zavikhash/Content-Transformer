import { TrendingUp, BarChart2, Layers, CheckCircle2 } from 'lucide-react';

export default function InfographicPreview({ data }) {
  return (
    <div className="space-y-4 text-xs">
      {/* Header Block */}
      <div className="p-6 bg-[#151D2F] rounded-xl border border-[#23314C] text-center">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 block mb-1">
          Synthesized Infographic Brief
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2 font-sans">{data.title}</h2>
        <p className="text-slate-400 text-xs max-w-lg mx-auto">{data.subtitle}</p>
      </div>

      {/* Sections */}
      {data.sections?.map((section, idx) => {
        if (section.type === 'stats') {
          return (
            <div key={idx} className="surface-card p-5 border border-[#23314C]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3 text-center">
                {section.heading}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {section.items?.map((item, i) => (
                  <div key={i} className="p-4 bg-[#0B0F19] border border-[#23314C] rounded-xl text-center">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-white block mb-1">
                      {item.value}
                    </span>
                    <span className="text-[11px] text-slate-400 leading-tight block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (section.type === 'timeline') {
          return (
            <div key={idx} className="surface-card p-5 border border-[#23314C]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">
                {section.heading}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {section.steps?.map((step, i) => (
                  <div key={i} className="p-3 bg-[#0B0F19] border border-[#23314C] rounded-xl">
                    <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-xs font-mono font-bold mb-2">
                      {step.step}
                    </span>
                    <p className="font-semibold text-white text-xs mb-1">{step.title}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (section.type === 'facts') {
          return (
            <div key={idx} className="surface-card p-5 border border-[#23314C]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                {section.heading}
              </span>
              <div className="space-y-2">
                {section.items?.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-[#0B0F19] border border-[#23314C] rounded-xl text-white text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (section.type === 'cta') {
          return (
            <div key={idx} className="p-5 bg-[#1E293B] border border-[#23314C] rounded-xl text-center">
              <p className="text-white font-semibold text-sm mb-1">{section.text}</p>
              <p className="text-slate-500 text-[10px] font-mono">{section.source}</p>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
