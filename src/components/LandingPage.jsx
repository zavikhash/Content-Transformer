import React, { useState } from 'react';
import { 
  ArrowRight, Check, FileText, Share2, AlertTriangle, 
  Video, Mail, BarChart3, ChevronRight, Sliders, 
  CheckCircle2, UserCheck, ShieldAlert, Cpu, 
  Building2, Briefcase, GraduationCap, Radio, Eye, Layers, Sparkles
} from 'lucide-react';

const PRESET_STORIES = [
  {
    id: 'policy',
    sourceTitle: '18-Page Climate Policy & Grid Transition Report.pdf',
    sourceSnippet: 'Comprehensive municipal decarbonization framework allocating $420M toward solid-state grid storage across 14 municipal districts. The deployment targets a 48% efficiency leap, reducing municipal operational overhead by $4.2M annually by Q3 2027 while mandating hardware-level isolation for all remote substations.',
    metrics: '18 Pages • 4,820 Words • 23 Empirical Claims',
    leadReviewer: 'Dr. Aris Thorne, Lead Infrastructure Architect',
    reviewerOrg: 'Municipal Planning & Energy Board',
    outcomes: {
      slides: '12-Slide Executive Deck: CapEx Allocation, $4.2M ROI Timeline, 14-District Phased Rollout.',
      advisory: 'Official Public Bulletin: Compliance timelines, municipal infrastructure zoning, safety protocol ADV-2026-44.',
      social: '5 Multi-Platform Posts: Thread on grid modernization, LinkedIn thought leadership, Instagram graphic caption.',
      videoScript: '90-Sec Video Script: Scene-by-scene timing, drone B-roll instructions, narrator voiceover, lower thirds.',
      email: 'Executive Briefing & Staff Memo: Leadership capital approval brief and department action items.',
      infographic: 'Visual Data Infographic: District milestone timeline, efficiency comparison charts, energy storage specs.',
    }
  },
  {
    id: 'cyber',
    sourceTitle: 'Critical Incident Advisory CVE-2026-4419.pdf',
    sourceSnippet: 'Urgent security directive regarding authentication microservices. Exploit actively observed in telemetry. Operations teams must isolate non-compliant nodes within 24 hours. Zero customer data exfiltration detected in preliminary forensics.',
    metrics: '6 Pages • 1,450 Words • 14 Empirical Claims',
    leadReviewer: 'Elena Rostova, Principal SecOps Incident Commander',
    reviewerOrg: 'Enterprise Security Operations Center',
    outcomes: {
      slides: 'Incident Response Deck: Vulnerability scope, affected microservices, 24-hour containment milestones.',
      advisory: 'CRITICAL SECURITY BULLETIN: Mandatory node isolation directive, patch verification guidelines.',
      social: 'Transparency Update: Public status post regarding proactive security maintenance with zero customer impact.',
      videoScript: '60-Sec Ops Briefing: Emergency engineer briefing script with on-screen terminal commands.',
      email: 'Leadership Alert & Team Memo: Incident status briefing for executive board and technical engineering action memo.',
      infographic: 'Containment Timeline Infographic: Forensic milestone tracker and patch deployment status matrix.',
    }
  },
  {
    id: 'research',
    sourceTitle: 'Peer-Reviewed Quantum Computing Architecture Paper.pdf',
    sourceSnippet: 'Novel topological qubit error mitigation methodology achieving 99.94% two-qubit gate fidelity at 15mK temperatures. Replaces cryogenic hardware redundancy with algorithmic parity-check protocols, lowering quantum hardware cooling budgets by 38%.',
    metrics: '24 Pages • 7,900 Words • 31 Empirical Claims',
    leadReviewer: 'Prof. Marcus Vance, Chair of Applied Quantum Physics',
    reviewerOrg: 'Institute for Advanced Computational Systems',
    outcomes: {
      slides: 'Academic & Investor Presentation: 99.94% Fidelity Benchmark, Algorithmic Parity Framework, CapEx Model.',
      advisory: 'Technical Specification Bulletin: Cryogenic operating parameters, quantum parity interface specs.',
      social: 'Research Announcement: LinkedIn paper overview, Twitter/X breakdown thread on 99.94% gate fidelity.',
      videoScript: '3-Minute Explainer Script: Animation directions for topological qubits and quantum error correction.',
      email: 'Research Grant & Stakeholder Brief: Summary for funding institutions and department collaboration memo.',
      infographic: 'Architecture Comparison Infographic: Traditional vs Topological fidelity & cooling metrics.',
    }
  }
];

export default function LandingPage({ onLaunchStudio, onUsePreset }) {
  const [activePreset, setActivePreset] = useState(PRESET_STORIES[0]);
  const [activeSlideMock, setActiveSlideMock] = useState(0);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1B5E20]">
      {/* =========================================================================
          1. HERO SECTION — GREEN & WHITE VALUE PROPOSITION
      ========================================================================= */}
      <section className="pt-16 pb-14 px-4 sm:px-6 max-w-6xl mx-auto text-center">
        {/* Handcrafted Organic Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F9F4] border border-[#C8E6C9] shadow-xs mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-[#1B5E20] tracking-wide">
            ✦ DETERMINISTIC DOCUMENT SYNTHESIS ENGINE
          </span>
        </div>

        {/* High-Contrast Accessible Green Headline (WCAG AAA Compliant > 8.5:1) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1B5E20] leading-[1.08] max-w-4xl mx-auto">
          Turn verified source documents into six synchronized publishing formats.
        </h1>

        {/* Human-Centric Explanatory Lead */}
        <p className="text-base sm:text-lg text-[#2E5B33] max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
          OmniFormat ingests policy briefs, incident reports, research papers, and technical memos. It binds verifiable empirical claims to an Abstract Syntax Tree, calibrates syntax across stakeholder registers, and emits synchronized channel dispatches without factual drift.
        </p>

        {/* Primary Green Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 mb-14">
          <button
            onClick={() => onLaunchStudio()}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-sm rounded-xl transition-all shadow-[0_4px_16px_rgba(46,125,50,0.25)] hover:shadow-[0_6px_22px_rgba(46,125,50,0.35)] flex items-center justify-center gap-2 group hover:-translate-y-0.5"
          >
            <span>Open Transformation Studio</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollToSection('workflow')}
            className="w-full sm:w-auto px-5 py-3.5 bg-[#FFFFFF] hover:bg-[#F4F9F4] text-[#1B5E20] font-semibold text-sm rounded-xl border border-[#C8E6C9] hover:border-[#81C784] transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Technical Architecture</span>
            <ChevronRight className="w-4 h-4 text-[#496E4E]" />
          </button>
        </div>

        {/* =========================================================================
            REALISTIC WORKSPACE BENCH — LAYERED SHADOWS & ORGANIC DEPTH
        ========================================================================= */}
        <div className="handcrafted-box rounded-[2rem_1.25rem_2rem_1.25rem] border border-[#C8E6C9] bg-[#FFFFFF] shadow-[0_12px_40px_-6px_rgba(46,125,50,0.12),0_2px_8px_rgba(0,0,0,0.04)] text-left overflow-hidden max-w-4xl mx-auto mb-10">
          {/* Workbench Header Bar */}
          <div className="bg-[#F4F9F4] px-5 py-3 border-b border-[#C8E6C9] flex flex-wrap items-center justify-between text-xs font-mono gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
              <span className="font-bold text-[#1B5E20]">ACTIVE WORKSPACE: MUNICIPAL_DECARBONIZATION_DIRECTIVE.PDF</span>
            </div>
            <div className="flex items-center gap-3 text-[#496E4E]">
              <span className="bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded border border-[#A5D6A7] font-semibold text-[11px]">
                PARSED 4,820 WORDS
              </span>
              <span className="font-semibold text-[#2E7D32]">ZERO DRIFT VERIFIED</span>
            </div>
          </div>

          {/* Workbench Dual-Pane View */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Real Ingested Document with Soft Green Citation Chips */}
            <div className="md:col-span-6 space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#496E4E] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Source Ingestion [§3.1 - §3.4]</span>
                </span>
                <span className="text-[10px] font-mono bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded border border-[#A5D6A7] font-semibold">
                  AST Coordinate Bound
                </span>
              </div>
              <div className="p-4 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] text-xs font-mono leading-relaxed text-[#2E5B33] shadow-inner">
                <p className="mb-2.5">
                  <span className="text-[#2E7D32] font-bold">[CLAIM 01]</span> Allocating <mark className="bg-[#DCEDC8] text-[#1B5E20] px-1.5 py-0.5 rounded font-semibold">$420M toward solid-state grid storage</mark> across 14 municipal districts.
                </p>
                <p className="mb-2.5">
                  <span className="text-[#2E7D32] font-bold">[CLAIM 02]</span> Targets a <mark className="bg-[#DCEDC8] text-[#1B5E20] px-1.5 py-0.5 rounded font-semibold">48% efficiency leap</mark>, reducing operational overhead by <mark className="bg-[#DCEDC8] text-[#1B5E20] px-1.5 py-0.5 rounded font-semibold">$4.2M annually by Q3 2027</mark>.
                </p>
                <p>
                  <span className="text-[#2E7D32] font-bold">[CLAIM 03]</span> Mandates hardware-level isolation for all remote substations within 90 days.
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#496E4E] pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Confidence: 99.8%</span>
                </span>
                <span className="text-[#1B5E20] font-bold">23 Claims Bound to AST</span>
              </div>
            </div>

            {/* Right: Synchronized Multi-Format Output Matrix */}
            <div className="md:col-span-6 space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#496E4E] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Emitted Channels (Synchronous)</span>
                </span>
                <span className="text-[10px] font-mono bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] px-2 py-0.5 rounded font-bold">
                  All 6 Channels Ready
                </span>
              </div>
              
              <div className="space-y-2 text-xs">
                {/* 1. Deck */}
                <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#C8E6C9] flex items-center justify-between shadow-xs hover:border-[#81C784] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#E8F5E9] flex items-center justify-center">
                      <BarChart3 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    </div>
                    <span className="font-bold text-[#1B5E20]">Executive Presentation Deck</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#496E4E] bg-[#F4F9F4] px-2 py-0.5 rounded border border-[#C8E6C9]">12 Slides • CapEx Model</span>
                </div>

                {/* 2. Bulletin */}
                <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#C8E6C9] flex items-center justify-between shadow-xs hover:border-[#81C784] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#E8F5E9] flex items-center justify-center">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#2E7D32]" />
                    </div>
                    <span className="font-bold text-[#1B5E20]">Compliance Public Bulletin</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#496E4E] bg-[#F4F9F4] px-2 py-0.5 rounded border border-[#C8E6C9]">Ref: ADV-2026-44</span>
                </div>

                {/* 3. Social */}
                <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#C8E6C9] flex items-center justify-between shadow-xs hover:border-[#81C784] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#E8F5E9] flex items-center justify-center">
                      <Share2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    </div>
                    <span className="font-bold text-[#1B5E20]">Multi-Platform Social Suite</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#496E4E] bg-[#F4F9F4] px-2 py-0.5 rounded border border-[#C8E6C9]">5 Posts • X / LinkedIn</span>
                </div>

                {/* 4. Script */}
                <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#C8E6C9] flex items-center justify-between shadow-xs hover:border-[#81C784] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#E8F5E9] flex items-center justify-center">
                      <Video className="w-3.5 h-3.5 text-[#2E7D32]" />
                    </div>
                    <span className="font-bold text-[#1B5E20]">Broadcast Cue Script</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#496E4E] bg-[#F4F9F4] px-2 py-0.5 rounded border border-[#C8E6C9]">90s • Teleprompter Ready</span>
                </div>
              </div>

              {/* Human Lead Verification Sign-off */}
              <div className="pt-2.5 border-t border-[#C8E6C9] flex items-center justify-between text-[11px] text-[#496E4E] font-mono">
                <span>Auditor: Dr. Aris Thorne</span>
                <span className="text-[#2E7D32] font-bold bg-[#E8F5E9] px-2 py-0.5 rounded">Sign-off: 09:42 UTC ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL STAT LEDGER — CRISP METRICS IN GREEN & WHITE
        ========================================================================= */}
        <div className="max-w-4xl mx-auto bg-[#F4F9F4] border border-[#C8E6C9] rounded-2xl py-6 px-4 my-8 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#C8E6C9] text-left">
            <div className="px-5 py-2 md:first:pl-2">
              <div className="text-3xl sm:text-4xl font-bold text-[#1B5E20] font-mono tracking-tight">4,800+</div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2E7D32] mt-0.5">Words Parsed / Min</div>
              <p className="text-xs text-[#2E5B33] mt-1">Multi-page PDFs, research abstracts, and policy directives.</p>
            </div>

            <div className="px-5 py-2">
              <div className="text-3xl sm:text-4xl font-bold text-[#2E7D32] font-mono tracking-tight">100%</div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2E7D32] mt-0.5">Citation Traceability</div>
              <p className="text-xs text-[#2E5B33] mt-1">Every numerical metric linked to paragraph line coordinates.</p>
            </div>

            <div className="px-5 py-2">
              <div className="text-3xl sm:text-4xl font-bold text-[#1B5E20] font-mono tracking-tight">6 Formats</div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#496E4E] mt-0.5">Synchronous Output</div>
              <p className="text-xs text-[#2E5B33] mt-1">Executive, operational, public, and broadcast channels.</p>
            </div>

            <div className="px-5 py-2 md:last:pr-2">
              <div className="text-3xl sm:text-4xl font-bold text-[#1B5E20] font-mono tracking-tight">0.0%</div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#496E4E] mt-0.5">Cross-Channel Drift</div>
              <p className="text-xs text-[#2E5B33] mt-1">Guaranteed identical empirical baselines across all dispatches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TECHNICAL ARCHITECTURE & WORKFLOW (ASYMMETRICAL BROKEN GRID)
      ========================================================================= */}
      <section id="workflow" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#C8E6C9]">
        <div className="max-w-2xl mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#2E7D32] mb-1">
            <span>✦ TECHNICAL BLUEPRINT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B5E20] tracking-tight">
            How OmniFormat transforms unstructured information deterministically.
          </h2>
          <p className="text-sm text-[#2E5B33] mt-2 leading-relaxed">
            Unlike generic generative prompts that hallucinate details or alter metrics between runs, OmniFormat utilizes an immutable semantic verification matrix with AST paragraph anchoring.
          </p>
        </div>

        {/* Asymmetrical Broken Grid Layout with Variable Radii & Layered Depth */}
        <div className="grid grid-cols-12 gap-5 text-left items-stretch">
          {/* Phase 01: Expansive Anchor Ingestion Box (7 cols) */}
          <div className="col-span-12 md:col-span-7 handcrafted-box p-6 rounded-[2.25rem_1rem_1.5rem_1rem] border border-[#C8E6C9] bg-[#FFFFFF] border-l-4 border-l-[#2E7D32] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-md border border-[#C8E6C9]">
                  PHASE 01 • INGESTION
                </span>
                <span className="text-[10px] font-mono text-[#496E4E] opacity-75 group-hover:opacity-100 transition-opacity">
                  Input: Multi-Column PDF / TXT / MD
                </span>
              </div>
              <h3 className="text-base font-bold text-[#1B5E20] mb-2">AST Parsing & Layout Coordinate Tracking</h3>
              <p className="text-xs text-[#2E5B33] leading-relaxed mb-4">
                Normalizes complex multi-column PDFs, tabular balance sheets, and unstructured engineering notes into an immutable Abstract Syntax Tree. Every sentence retains spatial bounding-box coordinates for downstream traceability.
              </p>
              
              {/* Handcrafted Syntax Visualizer */}
              <div className="p-3 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] font-mono text-[11px] text-[#1B5E20] space-y-1">
                <div className="flex justify-between text-[#496E4E] text-[10px] border-b border-[#C8E6C9] pb-1">
                  <span>TOKENIZER [§3.1]</span>
                  <span className="text-[#2E7D32] font-semibold">AST-NODE-BOUND</span>
                </div>
                <div className="text-[10px] text-[#2E5B33] pt-1">
                  &gt; root_node = AST.parse(stream, format="pdf_spatial_v2")<br/>
                  &gt; bounds: [x: 44.2, y: 118.6, p: 3] -&gt; <strong className="text-[#1B5E20]">Claim 01: $420M CapEx</strong>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#C8E6C9] flex items-center justify-between text-[11px] font-mono text-[#496E4E]">
              <span>Zero character loss</span>
              <span className="text-[#2E7D32] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Phase Active ➔
              </span>
            </div>
          </div>

          {/* Phase 02: Claim Extraction Matrix (5 cols) */}
          <div className="col-span-12 md:col-span-5 handcrafted-box p-6 rounded-[1rem_2rem_1rem_2rem] border border-[#C8E6C9] bg-[#FFFFFF] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#1B5E20] bg-[#DCEDC8] px-2.5 py-1 rounded-md border border-[#AED581]">
                  PHASE 02 • LEDGER
                </span>
                <span className="text-[10px] font-mono text-[#496E4E]">Heuristic Isolator</span>
              </div>
              <h3 className="text-base font-bold text-[#1B5E20] mb-2">Claim Extraction Matrix</h3>
              <p className="text-xs text-[#2E5B33] leading-relaxed mb-3">
                Isolates verifiable empirical assertions, numerical metrics, statutory deadlines, and organizational leads into a tamper-proof verification ledger.
              </p>
              
              {/* Organic Claim Chips */}
              <div className="space-y-1.5">
                <div className="p-2 rounded-lg bg-[#F4F9F4] border border-[#C8E6C9] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#1B5E20] font-semibold">[VERIFIED 99.8%]</span>
                  <span className="text-[#2E7D32] font-bold">23 Claims</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F4F9F4] border border-[#C8E6C9] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#2E5B33]">Temporal Anchors</span>
                  <span className="text-[#1B5E20] font-bold">Q3 2027</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#C8E6C9] text-[10px] font-mono text-[#496E4E]">
              Emits verified factual payload
            </div>
          </div>

          {/* Phase 03: Register Calibration (5 cols) */}
          <div className="col-span-12 md:col-span-5 handcrafted-box p-6 rounded-[1.5rem_1rem_2rem_1rem] border border-[#C8E6C9] bg-[#FFFFFF] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-md border border-[#C8E6C9]">
                  PHASE 03 • SYNTAX
                </span>
                <span className="text-[10px] font-mono text-[#496E4E]">Tone Engine</span>
              </div>
              <h3 className="text-base font-bold text-[#1B5E20] mb-2">Register Calibration</h3>
              <p className="text-xs text-[#2E5B33] leading-relaxed mb-3">
                Re-articulates the identical claims into audience-specific syntax without diluting empirical depth.
              </p>
              
              {/* Stakeholder Voice Chips */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 bg-[#F4F9F4] rounded-lg border border-[#C8E6C9]">
                  <span className="text-[10px] text-[#496E4E] block">REGISTER A</span>
                  <span className="font-bold text-[#1B5E20]">Executive ROI</span>
                </div>
                <div className="p-2 bg-[#F4F9F4] rounded-lg border border-[#C8E6C9]">
                  <span className="text-[10px] text-[#496E4E] block">REGISTER B</span>
                  <span className="font-bold text-[#2E7D32]">Technical Spec</span>
                </div>
                <div className="p-2 bg-[#F4F9F4] rounded-lg border border-[#C8E6C9]">
                  <span className="text-[10px] text-[#496E4E] block">REGISTER C</span>
                  <span className="font-bold text-[#1B5E20]">Public Bulletin</span>
                </div>
                <div className="p-2 bg-[#F4F9F4] rounded-lg border border-[#C8E6C9]">
                  <span className="text-[10px] text-[#496E4E] block">REGISTER D</span>
                  <span className="font-bold text-[#2E7D32]">Broadcast Cue</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#C8E6C9] text-[10px] font-mono text-[#496E4E]">
              Preserves 100% empirical fidelity
            </div>
          </div>

          {/* Phase 04: Deterministic Emission (7 cols) */}
          <div className="col-span-12 md:col-span-7 handcrafted-box p-6 rounded-[1rem_1.75rem_1rem_2.25rem] border border-[#C8E6C9] bg-[#FFFFFF] border-r-4 border-r-[#2E7D32] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#1B5E20] bg-[#DCEDC8] px-2.5 py-1 rounded-md border border-[#AED581]">
                  PHASE 04 • EMISSION
                </span>
                <span className="text-[10px] font-mono text-[#496E4E]">Multi-Artifact Engine</span>
              </div>
              <h3 className="text-base font-bold text-[#1B5E20] mb-2">Deterministic Artifact Emission</h3>
              <p className="text-xs text-[#2E5B33] leading-relaxed mb-3">
                Emits finalized publishing payloads into industry standard formats with instant JSON exports, interactive rendering, and zero cross-channel discrepancies.
              </p>

              {/* 6 Format Status Bar */}
              <div className="p-3 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[10px] font-mono">
                <div className="bg-[#FFFFFF] p-1.5 rounded border border-[#C8E6C9] text-[#1B5E20] font-bold">12-Slide Deck</div>
                <div className="bg-[#FFFFFF] p-1.5 rounded border border-[#C8E6C9] text-[#1B5E20] font-bold">Advisory</div>
                <div className="bg-[#FFFFFF] p-1.5 rounded border border-[#C8E6C9] text-[#1B5E20] font-bold">Social 5x</div>
                <div className="bg-[#FFFFFF] p-1.5 rounded border border-[#C8E6C9] text-[#1B5E20] font-bold">90s Video</div>
                <div className="bg-[#FFFFFF] p-1.5 rounded border border-[#C8E6C9] text-[#1B5E20] font-bold">Dual Email</div>
                <div className="bg-[#FFFFFF] p-1.5 rounded border border-[#C8E6C9] text-[#1B5E20] font-bold">Infographic</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#C8E6C9] flex items-center justify-between text-[11px] font-mono text-[#496E4E]">
              <span>Synchronous generation</span>
              <span className="text-[#2E7D32] font-semibold">6 Artifacts Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE SCENARIO DOSSIER (ONE SOURCE, SIX DISPATCHES)
      ========================================================================= */}
      <section id="outcomes" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#C8E6C9]">
        <div className="max-w-2xl mb-8 text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E7D32]">
            ✦ INTERACTIVE SCENARIO DOSSIER
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B5E20] tracking-tight mt-1">
            One verified source document. Six tailored stakeholder dispatches.
          </h2>
          <p className="text-sm text-[#2E5B33] mt-2 leading-relaxed">
            Select an enterprise scenario to observe how complex source material is redistributed across stakeholder channels with zero manual re-writing.
          </p>
        </div>

        {/* Bespoke Selector Buttons */}
        <div className="flex gap-2.5 mb-8 overflow-x-auto pb-2">
          {PRESET_STORIES.map(p => {
            const isSelected = activePreset.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePreset(p)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap shadow-xs ${
                  isSelected 
                    ? 'bg-[#2E7D32] text-white shadow-[0_2px_8px_rgba(46,125,50,0.25)]' 
                    : 'bg-[#F4F9F4] text-[#2E5B33] border border-[#C8E6C9] hover:border-[#81C784] hover:text-[#1B5E20]'
                }`}
              >
                <span>{p.sourceTitle.split('.')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Split Scenario Workbench with Organic Variable Corners */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
          {/* Left: Source Document Card */}
          <div className="lg:col-span-5 handcrafted-box p-6 border border-[#C8E6C9] bg-[#FFFFFF] rounded-[1.75rem_1.25rem_1.75rem_1.25rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-3 mb-3.5">
                <span className="text-xs font-mono font-bold text-[#1B5E20]">SOURCE SPECIFICATION</span>
                <span className="text-[10px] font-mono bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded border border-[#A5D6A7] font-semibold">
                  {activePreset.metrics}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#1B5E20] mb-2">{activePreset.sourceTitle}</h3>
              <p className="text-xs text-[#2E5B33] leading-relaxed bg-[#F4F9F4] p-4 rounded-xl border border-[#C8E6C9] font-mono">
                {activePreset.sourceSnippet}
              </p>
              
              {/* Human Lead Attribution */}
              <div className="mt-4 pt-3 border-t border-[#C8E6C9] space-y-1 text-xs">
                <div className="text-[11px] font-mono text-[#496E4E]">Lead Author / Reviewer:</div>
                <div className="font-bold text-[#1B5E20]">{activePreset.leadReviewer}</div>
                <div className="text-[11px] text-[#2E5B33]">{activePreset.reviewerOrg}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C8E6C9] flex items-center justify-between">
              <span className="text-xs text-[#2E7D32] font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Claim Extraction Complete</span>
              </span>
              <button
                onClick={() => onUsePreset(activePreset.sourceSnippet)}
                className="btn-secondary text-xs py-1.5 px-3 font-semibold text-[#1B5E20]"
              >
                <span>Load in Studio</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right: Emitted Dispatches Dossier */}
          <div className="lg:col-span-7 handcrafted-box p-6 border border-[#C8E6C9] bg-[#FFFFFF] rounded-[1.25rem_1.75rem_1.25rem_1.75rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-3 mb-3.5">
                <span className="text-xs font-mono font-bold text-[#1B5E20]">SYNCHRONIZED AUDIENCE DISPATCHES</span>
                <span className="text-[10px] font-mono bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] px-2 py-0.5 rounded font-bold">
                  Zero Factual Drift
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    icon: BarChart3,
                    title: '01. Executive Presentation Deck',
                    badge: '12 Slides • 16:9 4K',
                    text: activePreset.outcomes.slides,
                    audience: 'Board & Executive Leadership',
                  },
                  {
                    icon: AlertTriangle,
                    title: '02. Official Compliance Bulletin',
                    badge: 'Protocol Directive',
                    text: activePreset.outcomes.advisory,
                    audience: 'Legal & Operations Teams',
                  },
                  {
                    icon: Share2,
                    title: '03. Multi-Platform Social Suite',
                    badge: 'X & LinkedIn Threads',
                    text: activePreset.outcomes.social,
                    audience: 'Public Feed & Industry Press',
                  },
                  {
                    icon: Video,
                    title: '04. Broadcast Production Script',
                    badge: '90s Teleprompter Cue',
                    text: activePreset.outcomes.videoScript,
                    audience: 'Media & Video Production',
                  },
                  {
                    icon: Mail,
                    title: '05. Stakeholder Email Memos',
                    badge: 'Dual Variant Dispatch',
                    text: activePreset.outcomes.email,
                    audience: 'Executive Board & Team Staff',
                  },
                  {
                    icon: Layers,
                    title: '06. Data Infographic Specification',
                    badge: 'Timeline & Metrics Matrix',
                    text: activePreset.outcomes.infographic,
                    audience: 'Visual Dashboards & Portals',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#F4F9F4] border border-[#C8E6C9] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-[#81C784] hover:bg-[#FFFFFF] transition-all shadow-xs group">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-3 h-3 text-[#2E7D32]" />
                        </div>
                        <span className="text-xs font-bold text-[#1B5E20]">{item.title}</span>
                        <span className="text-[9px] font-mono bg-[#FFFFFF] text-[#2E5B33] px-1.5 py-0.5 rounded border border-[#C8E6C9]">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#2E5B33] line-clamp-1">{item.text}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#1B5E20] bg-[#FFFFFF] px-2.5 py-1 rounded-md border border-[#C8E6C9] self-start sm:self-auto flex-shrink-0 font-medium">
                      {item.audience}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#C8E6C9] flex items-center justify-between text-xs text-[#496E4E] font-mono">
              <span>Factual Drift: 0.0% Verified</span>
              <span className="text-[#2E7D32] font-bold">Ready for 1-Click Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. REAL-WORLD CASE STUDIES — HUMAN-CENTRIC WITH EDITORIAL PHOTOGRAPHY
      ========================================================================= */}
      <section id="use-cases" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#C8E6C9]">
        <div className="max-w-2xl mb-12 text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E7D32]">
            ✦ ORGANIZATIONAL CASE DOSSIERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B5E20] tracking-tight mt-1">
            How multi-stakeholder teams eliminate communication friction.
          </h2>
          <p className="text-sm text-[#2E5B33] mt-2 leading-relaxed">
            Real organizational workflows where technical depth must be communicated simultaneously to leadership, operators, and the public.
          </p>
        </div>

        {/* 4 Concrete Human-Centric Cards with Variable Radii & Layered Green Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[
            {
              sector: 'CIVIC INFRASTRUCTURE & ENERGY',
              title: 'Municipal Solid-State Grid Modernization',
              lead: 'Elena Rostova, Chief Energy Transition Planner',
              org: 'Department of Public Utilities & Energy',
              image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
              input: '18-Page Engineering Feasibility Report.pdf',
              challenge: 'Complex technical storage specs had to be approved by non-technical council members while informing district residents.',
              solution: 'Simultaneously generated a capital allocation deck for the council and citizen compliance advisories for district portals.',
              quote: 'What previously required three weeks of back-and-forth between our engineering and PR teams was completed in a single morning.',
              radius: 'rounded-[2rem_1rem_1.75rem_1rem]'
            },
            {
              sector: 'ENTERPRISE SECOPS & INCIDENT RESPONSE',
              title: 'Critical Microservice Telemetry CVE-2026',
              lead: 'Marcus Vance, Principal Incident Commander',
              org: 'Global Cloud Infrastructure Services',
              image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
              input: 'Incident Log & Forensic Telemetry Trace',
              challenge: 'Engineers needed immediate terminal patch directives while board members needed zero-exfiltration risk confirmation.',
              solution: 'Emitted an executive board briefing memo and technical node-isolation runbooks synchronously without metric discrepancies.',
              quote: 'No ambiguity between what our engineers executed and what our executive officers communicated to partners.',
              radius: 'rounded-[1rem_2.25rem_1rem_1.75rem]'
            },
            {
              sector: 'APPLIED COMPUTING & QUANTUM ACADEMIA',
              title: 'Algorithmic Qubit Parity Mitigation Abstract',
              lead: 'Dr. Aris Thorne, Lead Research Scientist',
              org: 'Center for Applied Quantum Nanotechnology',
              image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
              input: 'Peer-Reviewed LaTeX Manuscript (arXiv)',
              challenge: 'A 99.94% gate fidelity discovery needed translation into institutional grant proposals and media explainer scripts.',
              solution: 'Preserved mathematical rigor in keynote slides while emitting a 3-minute video script for the university research journal.',
              quote: 'Our research claims remained 100% faithful to the underlying data without being diluted or sensationalized.',
              radius: 'rounded-[1.75rem_1rem_2rem_1rem]'
            },
            {
              sector: 'REGULATORY COMPLIANCE & MEDIA PRESS',
              title: 'Quarterly Macroeconomic Outlook Dispatch',
              lead: 'Sarah Jenkins, Director of Communications',
              org: 'Monetary Policy & Regulatory Research Hub',
              image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
              input: 'Macroeconomic Index & Policy Directive',
              challenge: 'Financial advisory updates required simultaneous broadcast teleprompter cues, subscriber memos, and social threads.',
              solution: 'Automated the simultaneous generation of broadcast scripts and institutional email updates under tight market deadlines.',
              quote: 'Eliminated the risk of factual distortion under tight newsroom press deadlines.',
              radius: 'rounded-[1rem_1.75rem_1.25rem_2.25rem]'
            },
          ].map((cs, idx) => (
            <div key={idx} className={`handcrafted-box ${cs.radius} border border-[#C8E6C9] bg-[#FFFFFF] overflow-hidden flex flex-col justify-between group`}>
              {/* Authentic Editorial Photography Header with Forest Green Overlay */}
              <div className="relative h-48 w-full bg-[#EDF7ED] overflow-hidden border-b border-[#C8E6C9]">
                <img 
                  src={cs.image} 
                  alt={cs.title} 
                  className="w-full h-full object-cover grayscale contrast-105 opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/80 via-[#1B5E20]/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-[#1B5E20] text-white text-[9px] font-mono px-2.5 py-1 rounded-md font-bold shadow-xs">
                  {cs.sector}
                </div>
              </div>

              {/* Case Study Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1B5E20] mb-1 leading-snug group-hover:text-[#2E7D32] transition-colors">
                    {cs.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#2E5B33] mb-3.5">
                    {cs.lead} • <span className="text-[#496E4E] font-normal">{cs.org}</span>
                  </div>

                  <div className="space-y-2 mb-4 text-xs text-[#2E5B33]">
                    <div className="p-3 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9]">
                      <span className="font-mono text-[10px] font-bold text-[#2E7D32] block mb-0.5">SOURCE INPUT DOCUMENT</span>
                      <span className="font-bold text-[#1B5E20]">{cs.input}</span>
                    </div>
                    <p className="text-xs text-[#2E5B33] leading-relaxed">{cs.challenge}</p>
                  </div>
                </div>

                <blockquote className="border-l-3 border-[#2E7D32] pl-3.5 py-1 text-xs italic text-[#2E5B33] bg-[#F4F9F4] rounded-r-lg mt-2">
                  "{cs.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. FACT AUDIT & CITATION GOVERNANCE
      ========================================================================= */}
      <section id="fact-check" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#C8E6C9]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E7D32]">
              ✦ PROVENANCE & FACTUAL GOVERNANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B5E20] tracking-tight">
              Automated claim verification against source context.
            </h2>
            <p className="text-sm text-[#2E5B33] leading-relaxed">
              Factual integrity is the primary requirement for organizational communication. OmniFormat scans every emitted claim against the ingested document, flags potential ambiguities, and requires human sign-off on unverified assertions.
            </p>

            <div className="p-4 rounded-xl bg-[#F4F9F4] border border-[#C8E6C9] space-y-2 text-xs text-[#2E5B33] shadow-xs">
              <div className="font-bold text-[#1B5E20] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                <span>Human-in-the-Loop Verification Standard</span>
              </div>
              <p className="text-[#2E5B33] leading-relaxed">
                AI synthesizes dispatches at scale while human leads verify. Every numerical value, date, and quote maintains a live pointer back to its exact paragraph location in the raw source.
              </p>
            </div>
          </div>

          {/* Claim Ledger Card with Organic Radii */}
          <div className="lg:col-span-6 handcrafted-box p-6 rounded-[2rem_1.25rem_2rem_1.25rem] border border-[#C8E6C9] bg-[#FFFFFF] shadow-[0_8px_30px_-4px_rgba(46,125,50,0.1)]">
            <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-3 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#1B5E20]">CLAIM VERIFICATION MATRIX</span>
                <p className="text-[11px] text-[#496E4E]">Automated Heuristic Semantic Extraction</p>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] font-bold">
                Integrity Score: 98/100
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] flex items-center justify-between">
                <span className="text-[#2E5B33]">Empirical Assertions Isolated</span>
                <span className="font-bold text-[#1B5E20]">23 Claims</span>
              </div>
              <div className="p-3 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] flex items-center justify-between">
                <span className="text-[#2E5B33]">Direct Paragraph Citations</span>
                <span className="font-bold text-[#2E7D32]">18 Verified</span>
              </div>
              <div className="p-3 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] flex items-center justify-between">
                <span className="text-[#2E5B33]">Temporal & Financial Metrics</span>
                <span className="font-bold text-[#1B5E20]">8 Matches</span>
              </div>
              <div className="p-3 bg-[#FEF9E7] rounded-xl border border-[#FCE6A2] flex items-center justify-between text-[#7B4709]">
                <span>Contested Statements Flagged</span>
                <span className="font-bold">1 For Human Review</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#C8E6C9] text-[10px] font-mono text-[#496E4E]">
              All outputs require human sign-off prior to multi-channel publishing.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. DELIVERABLES (COMPLETELY REDESIGNED ASYMMETRICAL EDITORIAL GRID)
      ========================================================================= */}
      <section id="deliverables" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#C8E6C9]">
        <div className="max-w-2xl mb-12 text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E7D32]">
            ✦ CHANNEL SPECIFICATIONS & PREVIEWS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B5E20] tracking-tight mt-1">
            Six formats engineered for specific publishing environments.
          </h2>
          <p className="text-sm text-[#2E5B33] mt-2 leading-relaxed">
            Each output channel adheres strictly to industry presentation standards with instant JSON exports, copy buttons, and interactive slide previews.
          </p>
        </div>

        {/* Asymmetrical Broken Grid Layout for Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left items-stretch">
          {/* FLAGSHIP HERO DELIVERABLE: Executive Presentation Deck (Spans 8 cols on md) */}
          <div className="md:col-span-8 handcrafted-box p-6 rounded-[2.25rem_1.25rem_1.5rem_1.25rem] border border-[#C8E6C9] bg-[#FFFFFF] flex flex-col justify-between group shadow-[0_8px_28px_-4px_rgba(46,125,50,0.1)]">
            <div>
              <div className="flex flex-wrap items-center justify-between border-b border-[#C8E6C9] pb-3 mb-4 text-xs font-mono gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1B5E20] bg-[#E8F5E9] px-2.5 py-1 rounded border border-[#C8E6C9]">
                    ✦ SPEC 01 • FLAGSHIP
                  </span>
                  <span className="font-bold text-[#1B5E20]">Executive Presentation Deck</span>
                </div>
                <span className="text-[10px] font-mono text-[#2E7D32] bg-[#F4F9F4] px-2.5 py-1 rounded border border-[#C8E6C9] font-bold">
                  16:9 • 7 Slide Standard
                </span>
              </div>

              <p className="text-xs text-[#2E5B33] leading-relaxed mb-4">
                Strict 7-slide structure engineered for executive reviews: title cards, operational context, core empirical findings, ROI timeline, and strategic investment directives.
              </p>

              {/* Realistic Interactive 16:9 Slide Workbench */}
              <div className="p-4 bg-[#F4F9F4] rounded-2xl border border-[#C8E6C9] shadow-inner space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#496E4E] border-b border-[#C8E6C9] pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#1B5E20]">
                    <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                    <span>SLIDE PREVIEW: 0{activeSlideMock + 1} / 07</span>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlideMock(idx)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          activeSlideMock === idx 
                            ? 'bg-[#2E7D32] text-white font-bold' 
                            : 'bg-[#FFFFFF] text-[#2E5B33] border border-[#C8E6C9]'
                        }`}
                      >
                        S0{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Miniature 16:9 Slide Surface */}
                <div className="aspect-[16/9] max-h-48 w-full bg-[#FFFFFF] rounded-xl border border-[#C8E6C9] p-4 flex flex-col justify-between shadow-xs">
                  {activeSlideMock === 0 && (
                    <>
                      <div>
                        <span className="text-[9px] font-mono font-bold text-[#2E7D32] uppercase">EXECUTIVE BRIEF</span>
                        <h4 className="text-sm font-bold text-[#1B5E20] mt-1">Municipal Solid-State Grid Modernization</h4>
                        <p className="text-[11px] text-[#2E5B33] mt-1 line-clamp-2">
                          14-district capital expenditure framework allocating $420M toward remote substation battery storage.
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#496E4E] pt-2 border-t border-[#C8E6C9]">
                        <span>CapEx Allocation: $420M</span>
                        <span className="text-[#2E7D32] font-bold">ROI: +48% Net Efficiency</span>
                      </div>
                    </>
                  )}

                  {activeSlideMock === 1 && (
                    <>
                      <div>
                        <span className="text-[9px] font-mono font-bold text-[#2E7D32] uppercase">EMPIRICAL ANALYSIS</span>
                        <h4 className="text-sm font-bold text-[#1B5E20] mt-1">Substation Hardware Isolation Matrix</h4>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-center text-[10px] font-mono">
                          <div className="p-1 bg-[#F4F9F4] rounded border border-[#C8E6C9]">
                            <span className="font-bold text-[#1B5E20] block">14</span>Districts
                          </div>
                          <div className="p-1 bg-[#F4F9F4] rounded border border-[#C8E6C9]">
                            <span className="font-bold text-[#2E7D32] block">90 Days</span>Isolation
                          </div>
                          <div className="p-1 bg-[#F4F9F4] rounded border border-[#C8E6C9]">
                            <span className="font-bold text-[#1B5E20] block">$4.2M</span>Annual Save
                          </div>
                        </div>
                      </div>
                      <div className="text-[9px] font-mono text-[#496E4E] pt-1">AST Verified Citation [§3.2]</div>
                    </>
                  )}

                  {activeSlideMock === 2 && (
                    <>
                      <div>
                        <span className="text-[9px] font-mono font-bold text-[#2E7D32] uppercase">STRATEGIC DIRECTIVES</span>
                        <h4 className="text-sm font-bold text-[#1B5E20] mt-1">Phased Capital Deployment Milestones</h4>
                        <ul className="text-[10px] text-[#2E5B33] space-y-1 mt-1 font-mono">
                          <li>• Q1 2026: District 1-4 procurement tenders released</li>
                          <li>• Q3 2026: Remote telemetry hardware isolation activated</li>
                          <li>• Q3 2027: Full 14-district $4.2M savings realization</li>
                        </ul>
                      </div>
                      <div className="text-[9px] font-mono text-[#2E7D32] font-bold pt-1">Council Review Ready</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#C8E6C9] flex items-center justify-between text-[11px] font-mono text-[#496E4E]">
              <span>Includes interactive carousel & PPTX export</span>
              <span className="text-[#2E7D32] font-bold">1-Click Full Deck</span>
            </div>
          </div>

          {/* DELIVERABLE 02: Public Compliance Advisory (Spans 4 cols on md) */}
          <div className="md:col-span-4 handcrafted-box p-6 rounded-[1.25rem_2rem_1.25rem_1.75rem] border border-[#C8E6C9] bg-[#FFFFFF] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-3 mb-3.5 text-xs font-mono">
                <span className="font-bold text-[#1B5E20] bg-[#DCEDC8] px-2 py-0.5 rounded border border-[#AED581]">
                  ✦ SPEC 02
                </span>
                <span className="text-[#7B4709] bg-[#FEF9E7] px-2 py-0.5 rounded border border-[#FCE6A2] font-bold">
                  PROTOCOL DIRECTIVE
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#1B5E20] mb-1.5">Compliance Advisory Bulletin</h3>
              <p className="text-xs text-[#2E5B33] leading-relaxed mb-3.5">
                Formal legal and municipal bulletins with unique reference tracking, compliance ratings, and operational directives.
              </p>

              {/* Miniature Bulletin Header */}
              <div className="p-3.5 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] text-[10px] font-mono space-y-1.5">
                <div className="flex justify-between text-[#496E4E] border-b border-[#C8E6C9] pb-1">
                  <span>REF: ADV-2026-44</span>
                  <span className="text-[#2E7D32] font-bold">MANDATORY</span>
                </div>
                <div className="font-bold text-[#1B5E20]">1. Substation Isolation Protocol</div>
                <div className="text-[#2E5B33] text-[9px]">Execution window: 24-90 Calendar Days</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#C8E6C9] text-[10px] font-mono text-[#496E4E]">
              Monospace layout with protocol tracking
            </div>
          </div>

          {/* DELIVERABLE 03: Multi-Platform Social Suite (Spans 4 cols on md) */}
          <div className="md:col-span-4 handcrafted-box p-6 rounded-[1.5rem_1rem_1.75rem_1rem] border border-[#C8E6C9] bg-[#FFFFFF] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-3 mb-3.5 text-xs font-mono">
                <span className="font-bold text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9]">
                  ✦ SPEC 03
                </span>
                <span className="text-[#496E4E]">X & LinkedIn</span>
              </div>
              <h3 className="font-bold text-sm text-[#1B5E20] mb-1.5">Multi-Platform Social Suite</h3>
              <p className="text-xs text-[#2E5B33] leading-relaxed mb-3.5">
                Simultaneously writes high-engagement X/Twitter hooks, multi-tweet threads, and LinkedIn thought leadership copy.
              </p>

              {/* Miniature Post Preview */}
              <div className="p-3.5 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] text-[10px] space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#1B5E20]">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-[8px] font-mono">HQ</span>
                  <span>Policy Infrastructure Dispatch</span>
                  <span className="text-[#496E4E] font-normal font-mono">· 1m</span>
                </div>
                <p className="text-[#2E5B33] text-[10px] leading-snug">
                  Key municipal grid modernization findings from Q3 audit are now active [1/5 🧵]
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#C8E6C9] text-[10px] font-mono text-[#496E4E]">
              Strict character limits enforced
            </div>
          </div>

          {/* DELIVERABLE 04: Broadcast Script (Spans 4 cols on md) */}
          <div className="md:col-span-4 handcrafted-box p-6 rounded-[1rem_1.75rem_1rem_2rem] border border-[#C8E6C9] bg-[#FFFFFF] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-3 mb-3.5 text-xs font-mono">
                <span className="font-bold text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9]">
                  ✦ SPEC 04
                </span>
                <span className="text-[#496E4E]">90s Cue Script</span>
              </div>
              <h3 className="font-bold text-sm text-[#1B5E20] mb-1.5">Broadcast Production Script</h3>
              <p className="text-xs text-[#2E5B33] leading-relaxed mb-3.5">
                Scene-by-scene timing breakdowns with camera B-roll cues, voiceover script, and on-screen lower-third tags.
              </p>

              {/* Miniature Teleprompter Window */}
              <div className="p-3.5 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] text-[10px] font-mono space-y-1">
                <div className="flex justify-between text-[#496E4E] border-b border-[#C8E6C9] pb-1">
                  <span>SCENE 01 [00:00 - 00:15]</span>
                  <span className="text-[#2E7D32] font-semibold">WIDE B-ROLL</span>
                </div>
                <p className="italic text-[#2E5B33] text-[10px]">
                  "Today we announce municipal grid modernization..."
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#C8E6C9] text-[10px] font-mono text-[#496E4E]">
              Pacing calculations & lower-thirds
            </div>
          </div>

          {/* DELIVERABLE 05 & 06: Email & Infographic (Spans 4 cols on md) */}
          <div className="md:col-span-4 handcrafted-box p-6 rounded-[1.75rem_1rem_2rem_1rem] border border-[#C8E6C9] bg-[#FFFFFF] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-3 mb-3.5 text-xs font-mono">
                <span className="font-bold text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9]">
                  ✦ SPEC 05 & 06
                </span>
                <span className="text-[#2E7D32] font-semibold">Dual Memos & Specs</span>
              </div>
              <h3 className="font-bold text-sm text-[#1B5E20] mb-1.5">Stakeholder Memos & Infographic</h3>
              <p className="text-xs text-[#2E5B33] leading-relaxed mb-3.5">
                High-priority executive summaries alongside metric matrices, district timelines, and distilled core takeaways.
              </p>

              {/* Miniature Metric Matrix */}
              <div className="p-3 bg-[#F4F9F4] rounded-xl border border-[#C8E6C9] text-[10px] font-mono">
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="p-1.5 bg-[#FFFFFF] border border-[#C8E6C9] rounded-lg">
                    <span className="font-bold text-[#1B5E20] block">$420M</span>CapEx
                  </div>
                  <div className="p-1.5 bg-[#FFFFFF] border border-[#C8E6C9] rounded-lg">
                    <span className="font-bold text-[#2E7D32] block">+48%</span>Eff.
                  </div>
                  <div className="p-1.5 bg-[#FFFFFF] border border-[#C8E6C9] rounded-lg">
                    <span className="font-bold text-[#1B5E20] block">14</span>Districts
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#C8E6C9] text-[10px] font-mono text-[#496E4E]">
              Email client & visual dashboard ready
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. HIGH-CONVICTION FOOTER CALL TO ACTION (GREEN & WHITE)
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 text-center border-t border-[#C8E6C9] bg-[#F4F9F4]">
        <div className="max-w-2xl mx-auto">
          <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center mx-auto mb-4 font-mono font-bold text-sm shadow-sm">
            OF
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B5E20] tracking-tight mb-3">
            Deploy OmniFormat to your content operations.
          </h2>
          <p className="text-sm text-[#2E5B33] mb-8 leading-relaxed max-w-lg mx-auto">
            Ingest complex documents, verify factual provenance against source AST coordinates, and synthesize audience-calibrated publishing channels in parallel.
          </p>
          <button
            onClick={() => onLaunchStudio()}
            className="px-7 py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-sm rounded-xl shadow-[0_4px_16px_rgba(46,125,50,0.25)] hover:shadow-[0_6px_22px_rgba(46,125,50,0.35)] inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <span>Launch Transformation Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer Meta */}
      <footer className="py-8 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#C8E6C9] flex flex-col sm:flex-row items-center justify-between text-xs text-[#496E4E] font-mono gap-4">
        <div>OmniFormat System v2.4 • Enterprise Content Architecture</div>
        <div className="flex items-center gap-4">
          <span className="text-[#1B5E20] font-semibold">Deterministic AST</span>
          <span>•</span>
          <span className="text-[#2E7D32] font-semibold">Zero Factual Drift</span>
          <span>•</span>
          <span className="text-[#1B5E20] font-semibold">Offline Multilingual NLP</span>
        </div>
      </footer>
    </div>
  );
}
