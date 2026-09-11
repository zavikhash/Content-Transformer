import { useState } from 'react';
import { Camera, Music, Mic, Monitor, ChevronDown, ChevronUp, Clapperboard } from 'lucide-react';

export default function VideoScriptPreview({ data }) {
  const [expandedScene, setExpandedScene] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl bg-[#151D2F] border border-[#23314C]">
          <span className="text-slate-500 block text-[10px]">DURATION</span>
          <span className="font-semibold text-white">{data.duration}</span>
        </div>
        <div className="p-3 rounded-xl bg-[#151D2F] border border-[#23314C]">
          <span className="text-slate-500 block text-[10px]">STYLE</span>
          <span className="font-semibold text-white">{data.style}</span>
        </div>
        <div className="p-3 rounded-xl bg-[#151D2F] border border-[#23314C]">
          <span className="text-slate-500 block text-[10px]">PLATFORM</span>
          <span className="font-semibold text-white">{data.targetPlatform}</span>
        </div>
        <div className="p-3 rounded-xl bg-[#151D2F] border border-[#23314C]">
          <span className="text-slate-500 block text-[10px]">TOTAL SCENES</span>
          <span className="font-semibold text-white">{data.scenes?.length} Scenes</span>
        </div>
      </div>

      {/* Scenes List */}
      <div className="flex flex-col gap-2">
        {data.scenes?.map((scene, i) => {
          const isOpen = expandedScene === i;
          return (
            <div
              key={i}
              className="border border-[#23314C] rounded-xl bg-[#151D2F] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-3.5 text-left hover:bg-[#1E293B] transition-colors"
                onClick={() => setExpandedScene(isOpen ? -1 : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#1E293B] border border-[#23314C] flex items-center justify-center text-indigo-400 font-mono text-xs font-semibold">
                    {scene.sceneNumber}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-white">Scene {scene.sceneNumber}</span>
                    <span className="text-[11px] text-slate-500 ml-2 font-mono">{scene.duration}</span>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {isOpen && (
                <div className="p-4 border-t border-[#23314C] bg-[#0B0F19] flex flex-col gap-3 text-xs">
                  {/* Visual */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-20 text-slate-400 flex items-center gap-1 flex-shrink-0 font-medium text-[11px]">
                      <Camera className="w-3.5 h-3.5 text-indigo-400" /> Visual
                    </div>
                    <p className="text-slate-200 leading-relaxed flex-1">{scene.visual}</p>
                  </div>

                  {/* Audio */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-20 text-slate-400 flex items-center gap-1 flex-shrink-0 font-medium text-[11px]">
                      <Music className="w-3.5 h-3.5 text-emerald-400" /> Audio
                    </div>
                    <p className="text-slate-200 leading-relaxed flex-1">{scene.audio}</p>
                  </div>

                  {/* Voiceover */}
                  {scene.narration && (
                    <div className="flex items-start gap-2.5">
                      <div className="w-20 text-slate-400 flex items-center gap-1 flex-shrink-0 font-medium text-[11px]">
                        <Mic className="w-3.5 h-3.5 text-amber-400" /> Voiceover
                      </div>
                      <div className="flex-1 bg-[#151D2F] p-3 rounded-xl border border-[#23314C] text-slate-200 italic font-mono text-[11px] leading-relaxed">
                        "{scene.narration}"
                      </div>
                    </div>
                  )}

                  {/* On screen text */}
                  {scene.onScreen && (
                    <div className="flex items-start gap-2.5">
                      <div className="w-20 text-slate-400 flex items-center gap-1 flex-shrink-0 font-medium text-[11px]">
                        <Monitor className="w-3.5 h-3.5 text-indigo-400" /> Graphic
                      </div>
                      <div className="flex-1 bg-[#151D2F] p-2.5 rounded-xl border border-[#23314C] text-slate-200 font-mono text-[11px] whitespace-pre-line">
                        {scene.onScreen}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Production Notes */}
      {data.productionNotes && (
        <div className="p-3.5 bg-[#151D2F] rounded-xl border border-[#23314C] text-xs">
          <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider block mb-2">
            Production Guidelines
          </span>
          <div className="space-y-1">
            {data.productionNotes.map((note, idx) => (
              <p key={idx} className="text-slate-400 text-[11px]">• {note}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
