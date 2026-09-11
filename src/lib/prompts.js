export function getAnalysisPrompt(content, config) {
  return `You are ContentTransformerAI, an enterprise multi-format communications engine.
Analyze the following source document and extract key structured information.

CRITICAL INSTRUCTION:
- Write ALL responses entirely in the requested language: ${config.language}. If ${config.language} is Hindi, write in Hindi (Devanagari script); if Spanish, write in Spanish; if French, French; etc.
- Calibrate the vocabulary and focus for target audience: ${config.audience}.
- Calibrate the urgency and phrasing for tone: ${config.tone}.
- Level of detail: ${config.detail}.

Source Content:
"""
${content}
"""

Return ONLY a valid JSON object (no markdown, no extra explanation) with this exact structure:
{
  "title": "Main title or headline in ${config.language}",
  "summary": "2-3 sentence executive summary in ${config.language}",
  "keyFacts": ["fact 1", "fact 2", "fact 3", "fact 4", "fact 5"],
  "mainMessage": "Core takeaway in one sentence in ${config.language}",
  "context": "Background context in ${config.language}",
  "impact": "Operational or strategic impact in ${config.language}",
  "callToAction": "Action directive in ${config.language}",
  "tags": ["tag1", "tag2", "tag3"],
  "sentiment": "positive|neutral|urgent",
  "domain": "Domain/field"
}`;
}

export function getFormatPrompt(format, analysis, config) {
  const base = `
Content Analysis:
${JSON.stringify(analysis, null, 2)}

CALIBRATION REQUIREMENTS:
1. TARGET LANGUAGE: ${config.language}. EVERYTHING (all titles, headers, bullet points, voiceovers, tweets, emails, slides) MUST be written in ${config.language}.
2. TARGET AUDIENCE: ${config.audience}. 
   - Executive: High-level metrics, governance, strategic risk, ROI.
   - Employee: Practical workflow changes, team action items, deadlines.
   - Public: Simple, transparent, community-friendly, zero jargon.
   - Technical: Architectural specs, protocols, metrics, root-cause depth.
3. COMMUNICATION TONE: ${config.tone}.
   - Formal: Strict protocol, authoritative register.
   - Urgent: High priority, immediate action required, time-sensitive.
   - Casual: Friendly, conversational, accessible.
   - Neutral: Balanced, objective reporting.
4. DETAIL LEVEL: ${config.detail}.
   - Brief: Concise summary, essential bullet points only.
   - Standard: Balanced narrative and context.
   - Detailed: Comprehensive multi-section breakdown.

Return ONLY valid JSON (no markdown formatting, no commentary).`;

  const formatPrompts = {
    slides: `You are an executive presentation designer. Create a slide deck based on the content analysis.
${base}

Return JSON with this structure:
{
  "title": "Presentation title in ${config.language}",
  "slides": [
    {
      "id": 1,
      "type": "title",
      "title": "Slide title in ${config.language}",
      "subtitle": "Audience-calibrated subtitle in ${config.language}"
    },
    {
      "id": 2,
      "type": "agenda",
      "title": "Agenda title in ${config.language}",
      "items": ["Topic 1", "Topic 2", "Topic 3", "Topic 4"]
    },
    {
      "id": 3,
      "type": "content",
      "title": "Findings title in ${config.language}",
      "body": "Explanation text in ${config.language}",
      "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"]
    },
    {
      "id": 4,
      "type": "stats",
      "title": "Metrics title in ${config.language}",
      "stats": [
        {"label": "Metric 1", "value": "100%", "trend": "up"},
        {"label": "Metric 2", "value": "Priority", "trend": "neutral"}
      ]
    },
    {
      "id": 5,
      "type": "quote",
      "quote": "Quote text in ${config.language}",
      "attribution": "Attribution in ${config.language}"
    },
    {
      "id": 6,
      "type": "conclusion",
      "title": "Next Steps title in ${config.language}",
      "message": "Action directive in ${config.language}",
      "cta": "CTA text in ${config.language}",
      "bullets": ["Next step 1", "Next step 2"]
    }
  ]
}`,

    social: `You are a social media campaign director. Create multi-platform posts based on the content analysis.
${base}

Return JSON with this structure:
{
  "campaign": "CampaignName",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "platforms": {
    "twitter": {
      "post": "X post in ${config.language} with hashtags",
      "thread": [
        "1/ Thread hook in ${config.language}",
        "2/ Context in ${config.language}",
        "3/ Key findings in ${config.language}",
        "4/ Action directive in ${config.language}"
      ]
    },
    "linkedin": {
      "headline": "LinkedIn headline in ${config.language}",
      "post": "Thought leadership post in ${config.language} tailored for ${config.audience} with tone ${config.tone}"
    },
    "instagram": {
      "caption": "Visual caption in ${config.language}",
      "storyText": "Short punchy story text in ${config.language}"
    },
    "facebook": {
      "post": "Community post in ${config.language}"
    }
  }
}`,

    advisory: `You are a regulatory compliance and operations officer. Create an official advisory based on the content analysis.
${base}

Return JSON with this structure:
{
  "type": "OFFICIAL ADVISORY / BULLETIN in ${config.language}",
  "severity": "CRITICAL|HIGH|MEDIUM|INFO",
  "referenceNumber": "ADV-2026-XXXX",
  "title": "Advisory Title in ${config.language}",
  "issuedBy": "Issuing Authority in ${config.language}",
  "issuedDate": "Current Date",
  "effectiveDate": "Immediate / Specified",
  "audience": "Target Audience Description in ${config.language}",
  "summary": "Formal summary paragraph in ${config.language}",
  "background": "Background context in ${config.language}",
  "keyPoints": [
    {"heading": "Point Heading in ${config.language}", "detail": "Detailed explanation in ${config.language}"},
    {"heading": "Point Heading in ${config.language}", "detail": "Detailed explanation in ${config.language}"}
  ],
  "requiredActions": ["Action 1 in ${config.language}", "Action 2 in ${config.language}"],
  "recommendations": ["Recommendation 1 in ${config.language}"],
  "contactInfo": "Contact info",
  "disclaimer": "Legal disclaimer in ${config.language}",
  "nextReview": "Next review date"
}`,

    videoScript: `You are a video producer. Create a scene-by-scene script based on the content analysis.
${base}

Return JSON with this structure:
{
  "title": "Video title in ${config.language}",
  "duration": "Estimated duration",
  "style": "${config.audience} / ${config.tone}",
  "targetPlatform": "Corporate Broadcast / Portal",
  "scenes": [
    {
      "sceneNumber": 1,
      "type": "intro",
      "duration": "0:00 - 0:15",
      "visual": "Camera and visual description in ${config.language}",
      "audio": "Audio mood description",
      "narration": "Voiceover spoken in ${config.language}",
      "onScreen": "Lower third / graphic text in ${config.language}"
    },
    {
      "sceneNumber": 2,
      "type": "content",
      "duration": "0:15 - 0:45",
      "visual": "Visual description in ${config.language}",
      "audio": "Audio description",
      "narration": "Voiceover spoken in ${config.language}",
      "onScreen": "On-screen text in ${config.language}"
    },
    {
      "sceneNumber": 3,
      "type": "conclusion",
      "duration": "0:45 - 1:15",
      "visual": "Closing visual description",
      "audio": "Outro audio",
      "narration": "Closing directive in ${config.language}",
      "onScreen": "Final CTA in ${config.language}"
    }
  ],
  "productionNotes": ["Note 1 in ${config.language}", "Note 2 in ${config.language}"]
}`,

    email: `You are an executive communications director. Create stakeholder email memos based on the content analysis.
${base}

Return JSON with this structure:
{
  "variants": [
    {
      "type": "Executive Briefing in ${config.language}",
      "to": "Target Leadership in ${config.language}",
      "from": "Strategic Communications",
      "subject": "Subject line in ${config.language}",
      "preheader": "Preheader in ${config.language}",
      "greeting": "Greeting in ${config.language}",
      "opening": "Opening in ${config.language}",
      "body": "Body text in ${config.language}",
      "keyPoints": ["Point 1 in ${config.language}", "Point 2 in ${config.language}"],
      "closing": "Closing in ${config.language}",
      "signature": "Signature in ${config.language}",
      "priority": "HIGH|NORMAL"
    },
    {
      "type": "General Announcement in ${config.language}",
      "to": "All Team Members in ${config.language}",
      "from": "Internal Communications",
      "subject": "Staff Subject in ${config.language}",
      "preheader": "Preheader in ${config.language}",
      "greeting": "Greeting in ${config.language}",
      "opening": "Opening in ${config.language}",
      "body": "Body in ${config.language}",
      "keyPoints": ["Point 1 in ${config.language}", "Point 2 in ${config.language}"],
      "closing": "Closing in ${config.language}",
      "signature": "Signature in ${config.language}",
      "priority": "NORMAL"
    }
  ]
}`,

    infographic: `You are an infographic data visualizer. Create an infographic brief based on the content analysis.
${base}

Return JSON with this structure:
{
  "title": "Infographic title in ${config.language}",
  "subtitle": "Subtitle in ${config.language}",
  "theme": {
    "primaryColor": "#09090b",
    "secondaryColor": "#2563eb",
    "accentColor": "#10b981",
    "style": "Clean Editorial"
  },
  "sections": [
    {
      "type": "header",
      "title": "Title in ${config.language}",
      "subtitle": "Subtitle in ${config.language}"
    },
    {
      "type": "stats",
      "heading": "Metrics header in ${config.language}",
      "items": [
        {"value": "100%", "label": "Label in ${config.language}", "icon": "📊"},
        {"value": "Level 1", "label": "Label in ${config.language}", "icon": "🎯"}
      ]
    },
    {
      "type": "timeline",
      "heading": "Process header in ${config.language}",
      "steps": [
        {"step": "01", "title": "Step 1 in ${config.language}", "description": "Description in ${config.language}"},
        {"step": "02", "title": "Step 2 in ${config.language}", "description": "Description in ${config.language}"}
      ]
    },
    {
      "type": "facts",
      "heading": "Key takeaways header in ${config.language}",
      "items": ["Takeaway 1 in ${config.language}", "Takeaway 2 in ${config.language}"]
    },
    {
      "type": "cta",
      "text": "CTA text in ${config.language}",
      "source": "Source citation"
    }
  ]
}`
  };

  return formatPrompts[format] || getAnalysisPrompt(analysis.summary, config);
}
export function getFactCheckPrompt(content, analysis, config) {
  return `You are a factual consistency verifier. Given the original source content and the AI-generated analysis, identify any statements in the analysis that are NOT supported by the source.

Source Content (in ${config.language}):
"""
${content}
"""

Analysis Content (JSON with fields title, summary, keyFacts, etc.):
${JSON.stringify(analysis, null, 2)}

Return ONLY a JSON array of objects each with:
{ "issue": "Description of the inconsistency", "field": "Which top-level field (e.g., summary, keyFacts)" }
If all statements are supported, return an empty array [].
`;
}
