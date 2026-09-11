import React from 'react';
import { Layers, ArrowRight, Home } from 'lucide-react';

export default function Header({ 
  currentView, 
  onViewChange, 
  onApiKeyClick, 
  hasApiKey 
}) {
  const scrollToSection = (id) => {
    if (currentView !== 'landing') {
      onViewChange('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-[#C8E6C9] bg-[#FFFFFF] sticky top-0 z-50 shadow-[0_1px_3px_rgba(27,94,32,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { onViewChange('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2E7D32] text-white flex items-center justify-center font-mono text-xs font-bold transition-transform group-hover:scale-105 shadow-sm">
              OF
            </div>
            <div>
              <div className="text-sm font-bold text-[#1B5E20] tracking-tight leading-none">
                OmniFormat
              </div>
              <div className="text-[10px] text-[#496E4E] font-medium leading-none mt-1 font-mono">
                Document Synthesis System
              </div>
            </div>
          </button>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4F9F4] p-1 rounded-lg border border-[#C8E6C9]">
          <button
            onClick={() => { onViewChange('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`px-3 py-1 rounded-md text-xs transition-colors ${
              currentView === 'landing'
                ? 'bg-[#2E7D32] text-white font-semibold shadow-xs'
                : 'text-[#2E5B33] hover:text-[#1B5E20] hover:bg-[#E8F5E9] font-medium'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('workflow')}
            className="px-3 py-1 rounded-md text-xs font-medium text-[#2E5B33] hover:text-[#1B5E20] hover:bg-[#E8F5E9] transition-colors"
          >
            Architecture
          </button>
          <button
            onClick={() => scrollToSection('outcomes')}
            className="px-3 py-1 rounded-md text-xs font-medium text-[#2E5B33] hover:text-[#1B5E20] hover:bg-[#E8F5E9] transition-colors"
          >
            Dispatches
          </button>
          <button
            onClick={() => scrollToSection('deliverables')}
            className="px-3 py-1 rounded-md text-xs font-medium text-[#2E5B33] hover:text-[#1B5E20] hover:bg-[#E8F5E9] transition-colors"
          >
            Specifications
          </button>
          <button
            onClick={() => scrollToSection('fact-check')}
            className="px-3 py-1 rounded-md text-xs font-medium text-[#2E5B33] hover:text-[#1B5E20] hover:bg-[#E8F5E9] transition-colors"
          >
            Verification Audit
          </button>
          <button
            onClick={() => scrollToSection('use-cases')}
            className="px-3 py-1 rounded-md text-xs font-medium text-[#2E5B33] hover:text-[#1B5E20] hover:bg-[#E8F5E9] transition-colors"
          >
            Case Studies
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Engine Status Badge */}
          <button
            onClick={onApiKeyClick}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-[#F4F9F4] border border-[#C8E6C9] text-[#2E5B33] hover:border-[#2E7D32] hover:text-[#1B5E20] transition-colors"
            title="Configure Gemini API or use offline Multilingual NLP"
          >
            <span className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-[#2E7D32]' : 'bg-[#81C784]'}`} />
            <span className="font-medium">{hasApiKey ? 'Gemini 2.0 Flash' : 'Deterministic NLP'}</span>
          </button>

          {/* Primary View Switcher Button */}
          {currentView === 'landing' ? (
            <button
              onClick={() => onViewChange('studio')}
              className="px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Open Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => onViewChange('landing')}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 font-medium"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
