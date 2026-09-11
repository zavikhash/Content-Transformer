# OmniFormat — Multi-Format Content Transformation Platform

An AI-powered content transformation platform designed to ingest complex raw material (reports, advisories, news, policies, and prompts) and synthesize audience-calibrated deliverables with zero factual drift.

## Features

- **Universal Multi-Format Ingestion**: Ingests Plain Text, PDF (via client-side font glyph stream extractor), Markdown, URLs, and Images in any language.
- **Parametric Calibration Controls**:
  - **11 Target Output Language Channels**: English, Hindi, Spanish, French, German, Arabic, Japanese, Chinese, Portuguese, Russian, Italian.
  - **4 Audience Profiles**: Executive, Employee, Public, Technical.
  - **4 Communication Tones**: Formal, Neutral, Casual, Urgent.
  - **3 Detail Levels**: Brief, Standard, Detailed.
- **6 Synchronized Output Channels**:
  1. 📊 **Executive Presentation Deck**: Guaranteed 7-slide structure (Title, Agenda, Context, Findings, Metrics, Implications, Directives).
  2. 📱 **Social Media Suite**: X/Twitter (single post + full 5-tweet thread), LinkedIn thought leadership, Instagram story card, and Facebook post.
  3. ⚠️ **Official Advisory**: Regulatory bulletin with severity ratings, reference tracking, and mandatory compliance checklists.
  4. 🎥 **Broadcast Video Script**: Scene-by-scene timing with camera directions, audio cues, voiceover narration, and on-screen graphics.
  5. 📧 **Stakeholder Memos**: Executive Briefing (high priority) and General Staff Announcement.
  6. 📈 **Data Infographic**: Metric cards, chronological timeline steps, and core principles.
- **Deep Semantic Content Rewriting**: Dynamically shifts vocabulary, narrative angle, and structure based on active parameters.
- **Inline Deliverable Editing**: Edit output JSON directly before copying or exporting.
- **Enterprise SaaS Aesthetic**: Built with clean neutral slate styling, solid action states, and zero AI gradient clutter.

## Getting Started

### Prerequisites
- Node.js 18+ and npm installed

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Launch development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```
The compiled static assets will be generated in the `dist/` directory.
# Content-Transformer
