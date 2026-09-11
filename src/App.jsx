import { useState, useCallback } from 'react';
import { Layers, Sparkles, X, Eye, EyeOff, Key, Loader, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import InputPanel from './components/InputPanel';
import ConfigPanel from './components/ConfigPanel';
import OutputPanel from './components/OutputPanel';
import FactCheckModal from './components/FactCheckModal';
import { initGemini, analyzeContent, generateAllFormats, isGeminiReady } from './lib/gemini';
import { analyzeUserInput, synthesizeDynamicOutputs } from './lib/nlpTransformer';
import { verifyInputFactsAndContext } from './lib/factChecker';

const DEFAULT_CONFIG = {
  audience: 'executive',
  tone: 'formal',
  language: 'English',
  detail: 'standard',
  formats: {
    slides: true,
    social: true,
    advisory: true,
    videoScript: true,
    email: true,
    infographic: true,
  },
};

function ApiKeyModal({ onSave, onClose }) {
  const [key, setKey] = useState('');
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!key.trim()) return;
    setSaving(true);
    try {
      initGemini(key.trim());
      localStorage.setItem('gemini_api_key', key.trim());
      onSave(key.trim());
      toast.success('Gemini API connected.');
    } catch (err) {
      toast.error('Failed to initialize Gemini. Check your key.');
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-[#1B5E20]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="surface-card p-6 max-w-md w-full shadow-2xl border border-[#C8E6C9] rounded-2xl bg-[#FFFFFF] animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] flex items-center justify-center text-[#2E7D32]">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#1B5E20] text-sm">Configure Gemini API Key</h3>
            <p className="text-[#496E4E] text-xs">Optional: Connect Google AI Studio API</p>
          </div>
          <button onClick={onClose} className="ml-auto text-[#496E4E] hover:text-[#1B5E20]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#2E5B33] mb-3 leading-relaxed">
          The platform includes an embedded high-speed semantic NLP engine that automatically translates, verifies facts, and structures outputs across all languages offline. Adding a key connects Google Gemini 2.0 Flash models.
        </p>

        <div className="relative mb-4">
          <input
            type={visible ? 'text' : 'password'}
            value={key}
            onChange={e => setKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            placeholder="AIzaSy..."
            className="input-field pr-10 text-xs font-mono"
            autoFocus
          />
          <button
            onClick={() => setVisible(!visible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#496E4E] hover:text-[#1B5E20]"
          >
            {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!key.trim() || saving}
            className="btn-primary flex-1 text-xs"
          >
            {saving ? 'Connecting...' : 'Save & Connect'}
          </button>
          <button
            onClick={onClose}
            className="btn-secondary text-xs px-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('studio');
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('text');
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [outputs, setOutputs] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formatStatuses, setFormatStatuses] = useState({});
  const [showApiModal, setShowApiModal] = useState(false);
  
  // AI Fact & Context Checker State
  const [factAudit, setFactAudit] = useState(null);
  const [isFactChecking, setIsFactChecking] = useState(false);
  const [showFactModal, setShowFactModal] = useState(false);
  
  const [hasApiKey, setHasApiKey] = useState(() => {
    const saved = localStorage.getItem('gemini_api_key');
    if (saved) {
      try { initGemini(saved); return true; } catch { return false; }
    }
    return false;
  });

  // On-demand AI Fact and Context check
  const handleRunFactCheck = useCallback(async (overrideText = null) => {
    const textToProcess = (overrideText !== null ? overrideText : input).trim();
    if (!textToProcess) {
      toast.error('Please enter or upload source content to verify.');
      return;
    }

    setIsFactChecking(true);
    toast.loading('AI Fact & Context Checker inspecting claims...', { id: 'factCheck' });

    try {
      const audit = await verifyInputFactsAndContext(textToProcess, config.language);
      setFactAudit(audit);
      setIsFactChecking(false);
      setShowFactModal(true);
      toast.success(`Fact check complete: ${audit.verdict} (${audit.reliabilityScore}/100)`, { id: 'factCheck' });
    } catch (err) {
      console.error('Fact check failure:', err);
      setIsFactChecking(false);
      toast.error(`Fact check error: ${err.message}`, { id: 'factCheck' });
    }
  }, [input, config.language]);

  // Handle transformation
  const handleTransform = useCallback(async (overrideText = null) => {
    const textToProcess = (overrideText !== null ? overrideText : input).trim();
    if (!textToProcess) {
      toast.error('Please enter source text or upload a document.');
      return;
    }

    const selectedKeys = Object.keys(config.formats).filter(k => config.formats[k]);
    if (selectedKeys.length === 0) {
      toast.error('Please select at least one output deliverable format.');
      return;
    }

    setIsLoading(true);
    setOutputs({});
    setAnalysis(null);

    // Run fact check in parallel if not already performed
    verifyInputFactsAndContext(textToProcess, config.language)
      .then(audit => setFactAudit(audit))
      .catch(err => console.warn('Background fact check warning:', err));

    // Set loading statuses
    const initialStatuses = {};
    selectedKeys.forEach(f => { initialStatuses[f] = 'loading'; });
    setFormatStatuses(initialStatuses);

    // If Gemini is ready, use it; otherwise use our embedded dynamic NLP engine
    if (isGeminiReady()) {
      try {
        toast.loading('Analyzing document with Gemini...', { id: 'analysis' });
        const analysisResult = await analyzeContent(textToProcess, config);
        setAnalysis(analysisResult);
        toast.success('Analysis complete', { id: 'analysis' });

        toast.loading(`Synthesizing deliverables in ${config.language}...`, { id: 'generate' });
        const results = await generateAllFormats(
          analysisResult,
          config,
          config.formats,
          (fmt, status) => {
            setFormatStatuses(prev => ({ ...prev, [fmt]: status }));
          }
        );
        setOutputs(results);
        toast.success('All deliverables generated successfully!', { id: 'generate' });
      } catch (err) {
        console.warn('Gemini API error, falling back to dynamic NLP engine:', err);
        await runDynamicNlpSynthesis(textToProcess);
      }
    } else {
      await runDynamicNlpSynthesis(textToProcess);
    }

    setIsLoading(false);
  }, [input, config]);

  const runDynamicNlpSynthesis = async (textToProcess) => {
    await new Promise(r => setTimeout(r, 350));
    const extractedAnalysis = analyzeUserInput(textToProcess, config);
    setAnalysis(extractedAnalysis);

    const synthesized = synthesizeDynamicOutputs(extractedAnalysis, config, textToProcess);

    const selectedKeys = Object.keys(config.formats).filter(k => config.formats[k]);
    for (const fmt of selectedKeys) {
      await new Promise(r => setTimeout(r, 100));
      setFormatStatuses(prev => ({ ...prev, [fmt]: 'done' }));
      if (synthesized[fmt]) {
        setOutputs(prev => ({ ...prev, [fmt]: synthesized[fmt] }));
      }
    }
    toast.success(`Generated 6 deliverables in ${config.language}!`);
  };

  const handleUpdateOutput = (formatId, updatedData) => {
    setOutputs(prev => ({
      ...prev,
      [formatId]: { data: updatedData, error: null }
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1B5E20]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#1B5E20',
            border: '1px solid #C8E6C9',
            borderRadius: '12px',
            fontSize: '12px',
            padding: '10px 14px',
            boxShadow: '0 4px 16px rgba(46,125,50,0.15)',
          },
        }}
      />

      {showApiModal && (
        <ApiKeyModal
          onSave={() => { setHasApiKey(true); setShowApiModal(false); }}
          onClose={() => setShowApiModal(false)}
        />
      )}

      {/* Fact & Context Verification Audit Modal */}
      {showFactModal && factAudit && (
        <FactCheckModal
          audit={factAudit}
          onClose={() => setShowFactModal(false)}
          onReCheck={() => handleRunFactCheck()}
          isChecking={isFactChecking}
        />
      )}

      {/* Global Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onApiKeyClick={() => setShowApiModal(true)}
        hasApiKey={hasApiKey}
      />

      {/* Landing Page View */}
      {currentView === 'landing' && (
        <LandingPage
          onLaunchStudio={() => setCurrentView('studio')}
          onUsePreset={(presetText) => {
            setInput(presetText);
            setCurrentView('studio');
            setTimeout(() => handleTransform(presetText), 100);
          }}
        />
      )}

      {/* Studio View */}
      {currentView === 'studio' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
          {/* Top Operational Strip */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-[#F4F9F4] border border-[#C8E6C9] rounded-2xl animate-slide-down shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-[#1B5E20] tracking-tight">Content Transformation Studio</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" /> AI Fact Safeguard Active
                </span>
              </div>
              <p className="text-[#2E5B33] text-xs mt-0.5">
                Ingest any document in any language • Verify facts & context • Synthesize 6 deliverables simultaneously.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-[#2E5B33] font-mono bg-[#FFFFFF] px-3 py-1.5 rounded-xl border border-[#C8E6C9]">
                Output: <strong className="text-[#2E7D32] font-semibold">{config.language}</strong> ({config.audience})
              </span>
              <button
                onClick={() => setCurrentView('landing')}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                Overview Page
              </button>
            </div>
          </div>

          {/* PARALLEL TOP ROW: Left = Source Ingestion, Right = Calibration Parameters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-6">
            <div className="h-full animate-fade-in-up">
              <InputPanel
                value={input}
                onChange={setInput}
                inputType={inputType}
                onInputTypeChange={setInputType}
                factAudit={factAudit}
                isFactChecking={isFactChecking}
                onRunFactCheck={() => handleRunFactCheck()}
                onOpenFactAuditModal={() => setShowFactModal(true)}
              />
            </div>
            <div className="h-full animate-fade-in-up" style={{ animationDelay: '60ms' }}>
              <ConfigPanel
                config={config}
                onChange={setConfig}
              />
            </div>
          </div>

          {/* Primary Action Button Span */}
          <div className="mb-6">
            <button
              onClick={() => handleTransform()}
              disabled={isLoading || !input.trim()}
              className="btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_28px_rgba(79,70,229,0.5)] animate-pulse-glow"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Deliverables in {config.language}...</span>
                </>
              ) : (
                <>
                  <span>Generate Multi-Format Deliverables ({config.language})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Full Width Output Deliverables Section */}
          <div className="w-full animate-fade-in-up" style={{ animationDelay: '120ms' }}>
            <OutputPanel
              outputs={outputs}
              analysis={analysis}
              formatStatuses={formatStatuses}
              selectedFormats={config.formats}
              config={config}
              isLoading={isLoading}
              onUpdateOutput={handleUpdateOutput}
              factAudit={factAudit}
              onOpenFactAuditModal={() => setShowFactModal(true)}
            />
          </div>
        </main>
      )}
    </div>
  );
}
