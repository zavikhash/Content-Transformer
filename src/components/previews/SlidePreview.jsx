import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus, Quote } from 'lucide-react';

function TitleSlide({ slide }) {
  return (
    <div className="slide-card bg-[#151D2F] border border-[#23314C] min-h-[320px] p-8 flex flex-col justify-center items-center text-center shadow-lg">
      <div className="w-10 h-1 bg-indigo-500 rounded-full mb-6" />
      <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 mb-2 font-semibold">Executive Briefing</span>
      <h1 className="text-2xl sm:text-3xl font-bold text-white max-w-xl leading-tight mb-4">
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p className="text-slate-300 text-sm max-w-lg leading-relaxed">{slide.subtitle}</p>
      )}
      <div className="mt-8 text-[11px] text-slate-500 font-mono tracking-wider">CONFIDENTIAL & PROPRIETARY</div>
    </div>
  );
}

function AgendaSlide({ slide }) {
  return (
    <div className="slide-card bg-[#151D2F] border border-[#23314C] min-h-[320px] p-8 shadow-lg">
      <div className="flex items-center justify-between border-b border-[#23314C] pb-4 mb-6">
        <h2 className="text-lg font-bold text-white">{slide.title}</h2>
        <span className="text-xs font-mono text-indigo-400 font-semibold">AGENDA</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {slide.items?.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-[#0B0F19] border border-[#23314C] rounded-xl">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-200 text-xs font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentSlide({ slide }) {
  return (
    <div className="slide-card bg-[#151D2F] border border-[#23314C] min-h-[320px] p-8 shadow-lg">
      <div className="border-b border-[#23314C] pb-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">{slide.icon || '📌'}</span>
          <h2 className="text-lg font-bold text-white">{slide.title}</h2>
        </div>
      </div>
      {slide.body && <p className="text-slate-300 text-xs leading-relaxed mb-5">{slide.body}</p>}
      {slide.bullets && (
        <div className="flex flex-col gap-2.5">
          {slide.bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-[#0B0F19] p-3 rounded-xl border border-[#23314C]">
              <span className="text-indigo-400 text-xs mt-0.5 font-bold">•</span>
              <span className="text-slate-200 text-xs leading-relaxed">{b}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatsSlide({ slide }) {
  const trendIcon = (t) => t === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> :
                            t === 'down' ? <TrendingDown className="w-3.5 h-3.5 text-rose-400" /> :
                            <Minus className="w-3.5 h-3.5 text-slate-500" />;
  return (
    <div className="slide-card bg-[#151D2F] border border-[#23314C] min-h-[320px] p-8 shadow-lg">
      <div className="border-b border-[#23314C] pb-4 mb-6">
        <h2 className="text-lg font-bold text-white">{slide.title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {slide.stats?.map((s, i) => (
          <div key={i} className="bg-[#0B0F19] border border-[#23314C] rounded-xl p-5 text-center flex flex-col justify-center">
            <div className="text-2xl font-bold font-mono text-white mb-1">{s.value}</div>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              {trendIcon(s.trend)}
              <span className="text-slate-400 text-xs">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteSlide({ slide }) {
  return (
    <div className="slide-card bg-[#151D2F] border border-[#23314C] min-h-[320px] p-8 flex flex-col justify-center items-center text-center shadow-lg">
      <Quote className="w-8 h-8 text-indigo-400/40 mb-4" />
      <blockquote className="text-base sm:text-lg text-white font-normal leading-relaxed max-w-lg mb-4">
        "{slide.quote}"
      </blockquote>
      {slide.attribution && (
        <p className="text-slate-400 text-xs font-mono">— {slide.attribution}</p>
      )}
    </div>
  );
}

function ConclusionSlide({ slide }) {
  return (
    <div className="slide-card bg-[#151D2F] border border-[#23314C] min-h-[320px] p-8 flex flex-col justify-between shadow-lg">
      <div>
        <div className="border-b border-[#23314C] pb-3 mb-4">
          <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">Directives</span>
          <h2 className="text-lg font-bold text-white mt-1">{slide.title}</h2>
        </div>
        {slide.message && <p className="text-slate-300 text-xs leading-relaxed mb-4">{slide.message}</p>}
        {slide.bullets && (
          <div className="flex flex-col gap-2 mb-4">
            {slide.bullets.map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                <span className="text-indigo-400 font-bold">→</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {slide.cta && (
        <div className="pt-4 border-t border-[#23314C] flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">Execution: Immediate</span>
          <span className="btn-primary px-4 py-2 text-xs font-semibold">{slide.cta}</span>
        </div>
      )}
    </div>
  );
}

export default function SlidePreview({ data }) {
  const [current, setCurrent] = useState(0);
  if (!data) return null;

  const slides = Array.isArray(data) ? data : (data.slides || []);
  const title = data.title || slides[0]?.title || 'Executive Presentation';
  const slide = slides[current] || slides[0];
  if (!slide) return null;

  const renderSlide = () => {
    switch (slide.type) {
      case 'title': return <TitleSlide slide={slide} />;
      case 'agenda': return <AgendaSlide slide={slide} />;
      case 'stats': return <StatsSlide slide={slide} />;
      case 'quote': return <QuoteSlide slide={slide} />;
      case 'conclusion': return <ConclusionSlide slide={slide} />;
      default: return <ContentSlide slide={slide} />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Slide Top Bar */}
      <div className="flex items-center justify-between border-b border-[#23314C] pb-3">
        <div>
          <h3 className="font-bold text-white text-sm tracking-tight">{title}</h3>
          <p className="text-slate-400 text-xs">{slides.length} Executive Slides</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrent(Math.max(0, current - 1))} 
            disabled={current === 0}
            className="w-8 h-8 rounded-xl bg-[#1E293B] hover:bg-[#283548] border border-[#23314C] flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-white px-1">
            {current + 1} / {slides.length}
          </span>
          <button 
            onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))} 
            disabled={current === slides.length - 1}
            className="w-8 h-8 rounded-xl bg-[#1E293B] hover:bg-[#283548] border border-[#23314C] flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Rendered Slide */}
      <div className="animate-fade-in">{renderSlide()}</div>

      {/* Slide Thumbnails */}
      <div className="pt-2 flex gap-1.5 overflow-x-auto pb-1">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-150 flex-shrink-0 ${
              i === current
                ? 'bg-[#4F46E5] text-white font-bold shadow-sm'
                : 'bg-[#151D2F] border border-[#23314C] text-slate-400 hover:text-white hover:border-indigo-500/40'
            }`}
          >
            {String(i + 1).padStart(2, '0')} • {s.type}
          </button>
        ))}
      </div>
    </div>
  );
}
