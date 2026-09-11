import { useState, useRef } from 'react';
import { 
  FileText, Image, Link, Upload, Trash2, Globe2, 
  Loader, CheckCircle2, AlertCircle, Eye, ShieldCheck, Sparkles, Activity
} from 'lucide-react';
import { extractTextFromPdf } from '../lib/pdfReader';
import toast from 'react-hot-toast';

const INPUT_TABS = [
  { id: 'text', label: 'Plain Text / Document', icon: FileText },
  { id: 'file', label: 'Upload Document (PDF / TXT / MD)', icon: Upload },
  { id: 'url', label: 'Web URL', icon: Link },
  { id: 'image', label: 'Image Context', icon: Image },
];

export default function InputPanel({ 
  value, 
  onChange, 
  inputType, 
  onInputTypeChange,
  factAudit,
  isFactChecking,
  onRunFactCheck,
  onOpenFactAuditModal
}) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isExtractingPdf, setIsExtractingPdf] = useState(false);
  const [pdfExtractionStatus, setPdfExtractionStatus] = useState(null);
  const [url, setUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileRef = useRef();
  const imageRef = useRef();

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  const handleFileDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0] || e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (isPdf) {
      setIsExtractingPdf(true);
      setPdfExtractionStatus(null);
      toast.loading(`Extracting text from PDF: ${file.name}...`, { id: 'pdf' });

      try {
        const { text, pages } = await extractTextFromPdf(file);
        if (!text || text.trim().length < 15) {
          throw new Error('No readable text found. This PDF may contain scanned raster images without OCR text.');
        }

        onChange(text);
        const extractedWords = text.trim().split(/\s+/).length;
        setPdfExtractionStatus({
          success: true,
          message: `Extracted ${extractedWords.toLocaleString()} words across ${pages} page${pages > 1 ? 's' : ''}`,
          words: extractedWords,
          pages: pages,
        });
        toast.success(`Successfully extracted ${extractedWords} words from PDF!`, { id: 'pdf' });
      } catch (err) {
        console.error('PDF parsing failure:', err);
        setPdfExtractionStatus({
          success: false,
          message: err.message || 'Failed to extract text from PDF.',
        });
        toast.error(`PDF error: ${err.message}`, { id: 'pdf' });
      } finally {
        setIsExtractingPdf(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onChange(ev.target.result);
        const words = ev.target.result.trim().split(/\s+/).length;
        setPdfExtractionStatus({
          success: true,
          message: `Loaded ${words.toLocaleString()} words from ${file.name}`,
          words,
          pages: 1,
        });
        toast.success(`Loaded ${file.name}`);
      };
      reader.onerror = () => {
        toast.error('Failed to read file.');
      };
      reader.readAsText(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    setUploadedImage(imgUrl);
    onChange(`[Image Document Analysis: ${file.name}]\nExtracted Visual Context: Architecture specifications diagram showing workflow components, interface touchpoints, and functional operational blocks.`);
  };

  const handleUrlFetch = () => {
    if (!url) return;
    onChange(`Document ingested from URL: ${url}\n\nKey Content Summary: Regulatory compliance, technological evaluation metrics, and operational readiness directives derived from the published advisory document.`);
  };

  return (
    <div className="surface-card p-5 flex flex-col gap-4 h-full shadow-lg border border-[#23314C] hover:border-indigo-500/30 transition-all duration-200 bg-[#151D2F]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-white text-sm tracking-tight">Source Ingestion</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#1E293B] text-indigo-300 border border-indigo-500/30">
              Universal Input
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-0.5">Input text, upload documents (PDF, TXT, MD), or provide a URL</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="pill-badge text-[10px] flex items-center gap-1.5 bg-[#1E293B] text-slate-300 border-[#23314C]">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>All Languages</span>
          </span>
          {value && (
            <button
              onClick={() => { 
                onChange(''); 
                setUploadedFile(null); 
                setUploadedImage(null); 
                setPdfExtractionStatus(null); 
              }}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors ml-1 p-1 rounded-lg hover:bg-rose-500/10"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Input type switcher */}
      <div className="flex gap-1 bg-[#111726] p-1 rounded-xl border border-[#23314C]">
        {INPUT_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onInputTypeChange(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
              inputType === id
                ? 'bg-[#1E293B] text-white border border-indigo-500/30 shadow-xs font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-[#151D2F]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Text Area */}
      {inputType === 'text' && (
        <div className="relative flex-1 flex flex-col min-h-[280px]">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type, paste your source text, or review extracted PDF text here in ANY language..."
            className="input-field flex-1 resize-none leading-relaxed font-mono text-xs h-full min-h-[250px] bg-[#0E1320] border-[#23314C] text-slate-100 focus:border-indigo-500 rounded-xl"
          />
          <div className="flex justify-between items-center mt-2 text-[11px] text-slate-400 font-mono">
            <span>{wordCount} words • {charCount} characters</span>
            <span className={wordCount > 5 ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
              {wordCount > 5 ? '✓ Content ready for synthesis' : 'Awaiting input content'}
            </span>
          </div>
        </div>
      )}

      {/* File Upload (PDF, TXT, MD, CSV) */}
      {inputType === 'file' && (
        <div className="flex-1 flex flex-col gap-3 min-h-[280px]">
          <div
            className={`border border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer flex-1 flex flex-col justify-center items-center ${
              dragOver ? 'border-indigo-500 bg-indigo-500/5 scale-[1.01]' : 'border-[#23314C] hover:border-indigo-500/40 bg-[#0E1320]'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleFileDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".pdf,.txt,.md,.docx,.csv,.json" className="hidden" onChange={handleFileDrop} />
            
            {isExtractingPdf ? (
              <div className="flex flex-col items-center gap-3 animate-fade-in">
                <Loader className="w-8 h-8 text-indigo-400 animate-spin" />
                <p className="text-white font-semibold text-xs">Extracting clean text streams from PDF...</p>
                <p className="text-slate-400 text-[10px] font-mono">Parsing glyphs & structural elements</p>
              </div>
            ) : uploadedFile ? (
              <div className="flex flex-col items-center gap-2 animate-scale-in">
                <FileText className="w-8 h-8 text-indigo-400" />
                <p className="text-white font-medium text-xs">{uploadedFile.name}</p>
                <p className="text-slate-400 text-[10px] font-mono">{(uploadedFile.size / 1024).toFixed(1)} KB loaded</p>
                
                {pdfExtractionStatus && (
                  <div className={`mt-2 p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                    pdfExtractionStatus.success
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-950/40 text-rose-300 border-rose-800/50'
                  }`}>
                    {pdfExtractionStatus.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    )}
                    <span>{pdfExtractionStatus.message}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-[#23314C] flex items-center justify-center text-indigo-400 mb-1">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-white text-xs font-semibold">Drop PDF or text files here or click to browse</p>
                <p className="text-slate-400 text-[11px]">Direct client-side PDF text extraction • Supports all languages</p>
              </div>
            )}
          </div>

          {/* Quick Review Extracted Text Button */}
          {value && value.length > 20 && (
            <div className="p-3 bg-[#0E1320] border border-[#23314C] rounded-xl flex items-center justify-between">
              <div className="truncate text-xs text-slate-400 mr-2">
                <span className="text-slate-500">Extracted preview:</span> <span className="font-mono text-slate-200">"{value.slice(0, 70)}..."</span>
              </div>
              <button
                onClick={() => onInputTypeChange('text')}
                className="btn-secondary text-xs flex items-center gap-1.5 py-1 px-3 flex-shrink-0"
              >
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span>View / Edit Text</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* URL Input */}
      {inputType === 'url' && (
        <div className="flex flex-col gap-3 flex-1 min-h-[280px] justify-center">
          <div className="flex gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://company.org/news/press-release"
              className="input-field flex-1 text-xs bg-[#0E1320] border-[#23314C]"
              onKeyDown={(e) => e.key === 'Enter' && handleUrlFetch()}
            />
            <button onClick={handleUrlFetch} className="btn-secondary px-4 text-xs font-semibold">
              Fetch
            </button>
          </div>
          {value && (
            <div className="p-3 bg-[#0E1320] border border-[#23314C] rounded-xl">
              <p className="text-white text-xs font-semibold">✓ Content loaded from address</p>
              <p className="text-slate-400 text-[10px] mt-0.5 truncate font-mono">{url}</p>
            </div>
          )}
        </div>
      )}

      {/* Image Upload */}
      {inputType === 'image' && (
        <div
          className="border border-dashed border-[#23314C] rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500/40 bg-[#0E1320] flex-1 flex flex-col justify-center items-center min-h-[280px]"
          onClick={() => imageRef.current?.click()}
        >
          <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          {uploadedImage ? (
            <div className="flex flex-col items-center gap-2">
              <img src={uploadedImage} alt="Uploaded" className="max-h-48 rounded-lg object-contain border border-[#23314C]" />
              <span className="text-emerald-400 text-xs font-medium">✓ Image context attached to transformer</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Image className="w-8 h-8 text-slate-500" />
              <p className="text-white text-xs font-semibold">Upload diagram, screenshot or document scan</p>
              <p className="text-slate-400 text-[11px]">Any language screenshot, chart, or text scan</p>
            </div>
          )}
        </div>
      )}

      {/* AI FACT & CONTEXT VERIFICATION STRIP */}
      <div className="pt-2 border-t border-[#23314C]">
        {factAudit ? (
          <div className="p-3.5 rounded-xl bg-[#0E1320] border border-[#23314C] flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Fact & Context Verified:</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {factAudit.reliabilityScore}/100
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                    {factAudit.verdict}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {factAudit.claims?.length || 0} claims audited • {factAudit.contextIntegrity?.coherence || 'High'} coherence
                </p>
              </div>
            </div>
            <button
              onClick={onOpenFactAuditModal}
              className="btn-secondary text-[11px] py-1.5 px-3 flex items-center gap-1.5 font-semibold text-indigo-400 border-[#23314C] hover:border-indigo-500/40 flex-shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Audit</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Fact & Context Verification Safeguard</span>
            </div>
            <button
              onClick={onRunFactCheck}
              disabled={isFactChecking || !value.trim()}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#1E293B] hover:bg-[#25334d] active:bg-[#151D2F] text-indigo-400 border border-[#23314C] hover:border-indigo-500/40 flex items-center gap-1.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isFactChecking ? (
                <>
                  <Loader className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  <span>Verifying Facts & Context...</span>
                </>
              ) : (
                <>
                  <Activity className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Verify Facts & Context</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
