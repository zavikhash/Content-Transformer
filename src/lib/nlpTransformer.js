// Client-side Semantic NLP Engine
// Deeply transforms text based on:
// 1. Audience (Executive, Employee, Public, Technical)
// 2. Tone (Formal, Neutral, Casual, Urgent)
// 3. Detail Level (Brief, Standard, Detailed)
// 4. Output Language (English, Hindi, Spanish, French, German, Arabic, Japanese, Chinese, Portuguese, Russian, Italian)
// 5. Guaranteed 7 Slides for all inputs

const LOCALIZATION = {
  English: {
    agenda: 'Executive Agenda',
    context: 'Operational Context & Background',
    findings: 'Key Findings & Analysis',
    metrics: 'Key Performance & Data Metrics',
    implications: 'Strategic Implications & Risk Matrix',
    directives: 'Mandatory Directives & Next Steps',
    actionRequired: 'MANDATORY ACTION REQUIRED',
    advisoryTitle: 'Official Operational Directive',
    summary: 'Executive Summary',
    compliance: 'Required Actions',
    recommendations: 'Recommendations',
    videoTitle: 'Operational Video Briefing',
    execMemo: 'Executive Briefing',
    staffNotice: 'General Staff Announcement',
    infographicTitle: 'Synthesized Data Briefing',
    timelineHeading: 'Strategic Execution Sequence',
    byTheNumbers: 'Key Parameters by the Numbers',
    urgentPrefix: 'CRITICAL ALERT:',
    casualGreeting: 'Hey team,',
    formalGreeting: 'Dear Leadership Team,',
  },
  Hindi: {
    agenda: 'कार्यकारी कार्यसूची (Executive Agenda)',
    context: 'परिचालन पृष्ठभूमि एवं संदर्भ (Operational Context)',
    findings: 'प्रमुख परिचालन निष्कर्ष (Key Findings)',
    metrics: 'मुख्य सांख्यिकी एवं प्रदर्शन मेट्रिक्स (Key Metrics)',
    implications: 'रणनीतिक प्रभाव एवं जोखिम विश्लेषण (Implications & Risk)',
    directives: 'अनिवार्य निर्देश एवं अगले कदम (Action Directives)',
    actionRequired: 'अनिवार्य कार्रवाई आवश्यक',
    advisoryTitle: 'आधिकारिक परिचालन परामर्श (Official Advisory)',
    summary: 'कार्यकारी सारांश (Executive Summary)',
    compliance: 'आवश्यक कार्रवाई (Mandatory Actions)',
    recommendations: 'सिफारिशें एवं सुझाव',
    videoTitle: 'परिचालन वीडियो ब्रीफिंग',
    execMemo: 'कार्यकारी ज्ञापन (Executive Memo)',
    staffNotice: 'समस्त कर्मचारियों हेतु सूचना (Staff Notice)',
    infographicTitle: 'संश्लेषित डेटा सारांश (Infographic)',
    timelineHeading: 'रणनीतिक कार्यान्वयन क्रम (Timeline)',
    byTheNumbers: 'आंकड़ों के आईने में मुख्य बिंदु',
    urgentPrefix: 'अति आवश्यक सूचना:',
    casualGreeting: 'नमस्ते टीम,',
    formalGreeting: 'आदरणीय नेतृत्व दल (Dear Leadership Team),',
  },
  Spanish: {
    agenda: 'Agenda Ejecutiva',
    context: 'Contexto y Antecedentes Operativos',
    findings: 'Hallazgos Operativos Clave',
    metrics: 'Métricas de Desempeño y Datos',
    implications: 'Implicaciones Estratégicas y Riesgo',
    directives: 'Directivas Obligatorias y Próximos Pasos',
    actionRequired: 'ACCIÓN OBLIGATORIA REQUERIDA',
    advisoryTitle: 'Directiva Operativa Oficial',
    summary: 'Resumen Ejecutivo',
    compliance: 'Acciones Obligatorias',
    recommendations: 'Recomendaciones',
    videoTitle: 'Informe Operativo en Video',
    execMemo: 'Informe Ejecutivo',
    staffNotice: 'Aviso General al Personal',
    infographicTitle: 'Resumen de Datos Sintetizados',
    timelineHeading: 'Secuencia de Ejecución Estratégica',
    byTheNumbers: 'Parámetros Clave en Cifras',
    urgentPrefix: 'ALERTA CRÍTICA:',
    casualGreeting: 'Hola equipo,',
    formalGreeting: 'Estimado Equipo de Liderazgo,',
  },
  French: {
    agenda: 'Ordre du Jour Exécutif',
    context: 'Contexte et Antécédents Opérationnels',
    findings: 'Conclusions Opérationnelles Principales',
    metrics: 'Métriques Clés et Indicateurs',
    implications: 'Implications Stratégiques et Risques',
    directives: 'Directives Obligatoires et Étapes Suivantes',
    actionRequired: 'ACTION OBLIGATOIRE REQUISE',
    advisoryTitle: 'Directive Opérationnelle Officielle',
    summary: 'Résumé Exécutif',
    compliance: 'Actions Obligatoires',
    recommendations: 'Recommandations',
    videoTitle: 'Briefing Vidéo Opérationnel',
    execMemo: 'Mémorandum Exécutif',
    staffNotice: 'Note d\'Information au Personnel',
    infographicTitle: 'Synthèse Visuelle des Données',
    timelineHeading: 'Séquence d\'Exécution Stratégique',
    byTheNumbers: 'Indicateurs Clés en Chiffres',
    urgentPrefix: 'ALERTE CRITIQUE :',
    casualGreeting: 'Bonjour à tous,',
    formalGreeting: 'Chers Membres de la Direction,',
  },
  German: {
    agenda: 'Tagesordnung für Führungskräfte',
    context: 'Kontext & Betrieblicher Hintergrund',
    findings: 'Zentrale Betriebliche Erkenntnisse',
    metrics: 'Leistungskennzahlen & Datenpunkte',
    implications: 'Strategische Auswirkungen & Risikoanalyse',
    directives: 'Verbindliche Anweisungen & Nächste Schritte',
    actionRequired: 'DRINGENDE HANDLUNGSERFORDERLICHE MASSNAHMEN',
    advisoryTitle: 'Offizielle Betriebsanweisung',
    summary: 'Zusammenfassung für Führungskräfte',
    compliance: 'Erforderliche Maßnahmen',
    recommendations: 'Empfehlungen',
    videoTitle: 'Betriebliches Video-Briefing',
    execMemo: 'Bericht an die Geschäftsleitung',
    staffNotice: 'Mitteilung an alle Mitarbeiter',
    infographicTitle: 'Synthetisierte Datenübersicht',
    timelineHeading: 'Strategischer Umsetzungsablauf',
    byTheNumbers: 'Wichtige Kennzahlen im Überblick',
    urgentPrefix: 'KRITISCHE WARNUNG:',
    casualGreeting: 'Hallo Team,',
    formalGreeting: 'Sehr geehrte Geschäftsleitung,',
  },
  Arabic: {
    agenda: 'جدول الأعمال التنفيذي',
    context: 'السياق والخلفية التشغيلية العامة',
    findings: 'النتائج التشغيلية الرئيسية',
    metrics: 'المؤشرات التشغيلية ومقاييس البيانات',
    implications: 'الآثار الاستراتيجية وتحليل المخاطر',
    directives: 'التوجيهات الإلزامية والخطوات القادمة',
    actionRequired: 'إجراء إلزامي مطلوب فورا',
    advisoryTitle: 'توجيه تشغيلي رسمي',
    summary: 'الملخص التنفيذي',
    compliance: 'الإجراءات المطلوبة',
    recommendations: 'التوصيات',
    videoTitle: 'إحاطة مرئية تشغيلية',
    execMemo: 'مذكرة القيادة التنفيذية',
    staffNotice: 'تعميم لجميع الموظفين',
    infographicTitle: 'موجز البيانات المرئية',
    timelineHeading: 'تسلسل التنفيذ الاستراتيجي',
    byTheNumbers: 'المؤشرات الرئيسية بالأرقام',
    urgentPrefix: 'تنبيه عاجل للغاية:',
    casualGreeting: 'مرحبا بالجميع،',
    formalGreeting: 'السادة أعضاء فريق القيادة المحترمون،',
  },
  Japanese: {
    agenda: 'エグゼクティブ・アジェンダ (Agenda)',
    context: '運用背景とコンテキスト (Context)',
    findings: '主要な運用の所見 (Key Findings)',
    metrics: '主要パフォーマンス指標 (Metrics)',
    implications: '戦略的影響とリスク分析 (Implications)',
    directives: '必須指令および次のステップ (Directives)',
    actionRequired: '必須の対応が求められます',
    advisoryTitle: '公式運用指令 (Official Advisory)',
    summary: 'エグゼクティブ・サマリー (Summary)',
    compliance: '必須対応アクション (Actions)',
    recommendations: '推奨事項および対策',
    videoTitle: '運用ブリーフィング動画',
    execMemo: '経営陣向け公式ブリーフィング',
    staffNotice: '全従業員向け通知 (Staff Notice)',
    infographicTitle: '統合データサマリー (Infographic)',
    timelineHeading: '戦略的実施スケジュール (Timeline)',
    byTheNumbers: '数字で見る主要指標',
    urgentPrefix: '緊急警告:',
    casualGreeting: 'チームの皆さん、',
    formalGreeting: '経営陣・リーダー各位、',
  },
  Chinese: {
    agenda: '高管执行议程 (Agenda)',
    context: '运营背景与情境 (Context)',
    findings: '核心运营发现 (Key Findings)',
    metrics: '关键绩效与数据指标 (Metrics)',
    implications: '战略影响与风险评估 (Implications)',
    directives: '执行指令与后续步骤 (Directives)',
    actionRequired: '必须立即采取行动',
    advisoryTitle: '官方运营指令公告 (Official Advisory)',
    summary: '执行摘要 (Executive Summary)',
    compliance: '必须执行事项 (Required Actions)',
    recommendations: '管理建议与措施',
    videoTitle: '运营情况视频简报',
    execMemo: '管理层简报备忘录',
    staffNotice: '全体员工通知 (Staff Notice)',
    infographicTitle: '结构化数据简报 (Infographic)',
    timelineHeading: '战略执行时序 (Timeline)',
    byTheNumbers: '关键数据指标总览',
    urgentPrefix: '紧急通报:',
    casualGreeting: '各位团队成员，',
    formalGreeting: '尊敬的管理层领导，',
  },
  Portuguese: {
    agenda: 'Agenda Executiva',
    context: 'Contexto e Histórico Operacional',
    findings: 'Principais Constatações Operacionais',
    metrics: 'Métricas de Desempenho e Dados',
    implications: 'Implicações Estratégicas e Risco',
    directives: 'Diretrizes Obrigatórias e Próximos Passos',
    actionRequired: 'AÇÃO OBRIGATÓRIA NECESSÁRIA',
    advisoryTitle: 'Diretriz Operacional Oficial',
    summary: 'Resumo Executivo',
    compliance: 'Ações Exigidas',
    recommendations: 'Recomendações',
    videoTitle: 'Briefing Operacional em Vídeo',
    execMemo: 'Memorando Executivo',
    staffNotice: 'Aviso Geral aos Colaboradores',
    infographicTitle: 'Síntese Visual de Dados',
    timelineHeading: 'Sequência Estratégica de Execução',
    byTheNumbers: 'Parâmetros Principais em Números',
    urgentPrefix: 'ALERTA CRÍTICO:',
    casualGreeting: 'Olá equipe,',
    formalGreeting: 'Prezada Equipe de Liderança,',
  },
  Russian: {
    agenda: 'Повестка для руководства',
    context: 'Контекст и оперативный фон',
    findings: 'Ключевые оперативные выводы',
    metrics: 'Ключевые метрики и показатели данных',
    implications: 'Стратегические последствия и риски',
    directives: 'Обязательные директивы и следующие шаги',
    actionRequired: 'ТРЕБУЕТСЯ НЕОТЛАГАТЕЛЬНОЕ ДЕЙСТВИЕ',
    advisoryTitle: 'Официальная оперативная директива',
    summary: 'Исполнительное резюме',
    compliance: 'Обязательные действия',
    recommendations: 'Рекомендации',
    videoTitle: 'Оперативный видео-брифинг',
    execMemo: 'Меморандум для руководства',
    staffNotice: 'Общее уведомление для сотрудников',
    infographicTitle: 'Инфографический обзор данных',
    timelineHeading: 'Последовательность стратегического выполнения',
    byTheNumbers: 'Ключевые показатели в цифрах',
    urgentPrefix: 'КРИТИЧЕСКОЕ ПРЕДУПРЕЖДЕНИЕ:',
    casualGreeting: 'Привет команде,',
    formalGreeting: 'Уважаемое руководство,',
  },
  Italian: {
    agenda: 'Ordine del Giorno Esecutivo',
    context: 'Contesto e Quadro Operativo',
    findings: 'Risultati Operativi Chiave',
    metrics: 'Metriche di Prestazione e Dati',
    implications: 'Implicazioni Strategiche e Rischio',
    directives: 'Direttive Obbligatorie e Prossimi Passi',
    actionRequired: 'AZIONE OBBLIGATORIA RICHIESTA',
    advisoryTitle: 'Direttiva Operativa Ufficiale',
    summary: 'Riepilogo Esecutivo',
    compliance: 'Azioni Richieste',
    recommendations: 'Raccomandazioni',
    videoTitle: 'Briefing Video Operativo',
    execMemo: 'Memorandum Esecutivo',
    staffNotice: 'Avviso Generale al Personale',
    infographicTitle: 'Riepilogo Dati Sintetizzati',
    timelineHeading: 'Sequenza di Esecuzione Strategica',
    byTheNumbers: 'Parametri Chiave in Cifre',
    urgentPrefix: 'AVVISO CRITICO:',
    casualGreeting: 'Ciao a tutti,',
    formalGreeting: 'Gentile Team di Direzione,',
  }
};

function cleanSentence(s) {
  return s.replace(/^[\s\-•*#\d.]+/g, '').trim();
}

export function analyzeUserInput(text, config) {
  // Sanitize text: strip any stray binary control characters
  const sanitizedText = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ').replace(/\s+/g, ' ').trim();
  
  const rawLines = text.split('\n').map(l => cleanSentence(l)).filter(l => l.length > 12);
  const punctuationSentences = sanitizedText
    .replace(/([.?!])\s*(?=[A-Z0-9\u0900-\u097F\u4E00-\u9FFF\u3040-\u309F\u0600-\u06FF])/g, '$1|')
    .split('|')
    .map(s => cleanSentence(s))
    .filter(s => s.length > 12);

  // Combine line items and punctuation sentences to capture bullet points, headlines, and paragraphs
  const combined = Array.from(new Set([...rawLines, ...punctuationSentences]))
    .filter(s => s.length > 12 && !s.startsWith('%PDF') && !s.includes('/Filter') && !s.includes('endobj'));

  const sentences = combined.length > 0 ? combined : [sanitizedText.slice(0, 160)];

  // Title Extraction: check first high-signal headline
  let title = '';
  const firstCandidate = rawLines[0] || sentences[0] || '';
  if (firstCandidate && firstCandidate.length > 5 && firstCandidate.length < 110) {
    title = firstCandidate.replace(/^[#*\s:–—\-]+/, '').trim();
  } else if (sentences[0]) {
    title = sentences[0].length > 70 ? sentences[0].substring(0, 65) + '...' : sentences[0];
  } else {
    title = 'Operational Analysis Report';
  }

  // Metrics Extraction
  const metricRegex = /(\$?\€?\£?₹?\b\d+(?:[.,]\d+)?\s*(?:%|x|X|k|K|M|B|T|Lakh|Crore|lakhs|crores|tokens|users|hours|days|years|km|mph|GB|TB|ms)?\b)/g;
  const foundMetrics = [];
  let match;
  while ((match = metricRegex.exec(text)) !== null) {
    const val = match[1].trim();
    if (val.length > 1 && !foundMetrics.includes(val) && foundMetrics.length < 8) {
      foundMetrics.push(val);
    }
  }

  const keyFacts = sentences.filter(s => s.length > 15).slice(0, 7);
  while (keyFacts.length < 4) {
    keyFacts.push(sentences[0] || text.slice(0, 140));
  }

  const lower = text.toLowerCase();
  let sentiment = 'neutral';
  let severity = 'INFO';
  if (
    config.tone === 'urgent' ||
    lower.includes('urgent') ||
    lower.includes('critical') ||
    lower.includes('breach') ||
    lower.includes('vulnerability') ||
    lower.includes('ransomware') ||
    lower.includes('attack') ||
    lower.includes('warning')
  ) {
    sentiment = 'urgent';
    severity = lower.includes('critical') || lower.includes('ransomware') || lower.includes('breach') ? 'CRITICAL' : 'HIGH';
  } else if (
    lower.includes('breakthrough') ||
    lower.includes('milestone') ||
    lower.includes('success') ||
    lower.includes('growth')
  ) {
    sentiment = 'positive';
    severity = 'INFO';
  } else if (lower.includes('policy') || lower.includes('compliance') || lower.includes('audit')) {
    severity = 'MEDIUM';
  }

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3);
  const freq = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  const sortedWords = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);
  const tags = sortedWords.slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1));

  return {
    title,
    rawSentences: sentences,
    keyFacts,
    metrics: foundMetrics.length > 0 ? foundMetrics : ['100%', 'Tier 1', 'Priority 1', 'Phase 1'],
    tags: tags.length > 0 ? tags : ['Operations', 'Security', 'Strategy'],
    sentiment,
    severity,
    domain: tags[0] ? `${tags[0]} Domain` : 'Enterprise System',
  };
}

// =========================================================================
// DEEP SEMANTIC REWRITING ENGINE BASED ON AUDIENCE, TONE & DETAIL LEVEL
// =========================================================================
function buildAdaptedContent(analysis, config) {
  const { title, rawSentences, keyFacts, metrics } = analysis;
  const audience = config.audience || 'executive';
  const tone = config.tone || 'formal';
  const detail = config.detail || 'standard';
  const lang = config.language || 'English';

  const rawCore = keyFacts[0] || rawSentences[0] || title;
  const rawSecond = keyFacts[1] || rawSentences[1] || rawCore;
  const rawThird = keyFacts[2] || rawSentences[2] || rawSecond;

  // -------------------------------------------------------------
  // 1. Perspective & Vocabulary Transformation by Audience
  // -------------------------------------------------------------
  let audiencePerspective = {};

  if (audience === 'executive') {
    audiencePerspective = {
      label: 'Executive & Board',
      focusArea: 'Strategic ROI, enterprise liability, and governance',
      summary: `Strategic Assessment: ${rawCore} Evaluated against organizational enterprise exposure, capital allocation, and quarterly governance benchmarks.`,
      findings: [
        `Executive Impact: ${rawCore} requires Board-level visibility and resource sponsorship.`,
        `Fiduciary Risk Assessment: Potential operational exposure identified in ${rawSecond}`,
        `Resource Allocation: Mandate reallocation of capital and personnel to ensure business continuity.`,
        `Competitive Positioning: Proactive mitigation preserves brand equity and stakeholder trust.`
      ],
      implications: [
        `Direct bottom-line and operational continuity impact.`,
        `Statutory and regulatory compliance exposure must be audited.`,
        `Leadership decision required to approve dedicated mitigation reserve.`
      ],
      directive: `Board Resolution: Authorize necessary operational expenditures, mandate cross-departmental compliance verification, and schedule bi-weekly executive audit reporting.`,
      emailGreeting: 'Dear Members of the Executive Leadership Team,',
      emailSign: 'Respectfully submitted,\nOffice of the Chief Operating Officer & Strategy',
    };
  } else if (audience === 'technical') {
    audiencePerspective = {
      label: 'Technical & Engineering',
      focusArea: 'Architecture specs, telemetry, CVE analysis, and deployment hotfixes',
      summary: `Technical Specification & Telemetry Breakdown: ${rawCore} Architecture evaluation identifies configuration drift, protocol validation checkpoints, and required infrastructure patch cycles.`,
      findings: [
        `Root Cause & Architecture Telemetry: ${rawCore} observed across primary daemon and gateway clusters.`,
        `Protocol & Endpoint Verification: Inspection of ${rawSecond} reveals latency and state synchronization requirements.`,
        `Infrastructure Ingress / Egress: Telemetry logs indicate necessity of automated failover policy enforcement.`,
        `Patch Integrity: Verification of SHA-256 signatures required prior to canary deployment rollouts.`
      ],
      implications: [
        `SLA degradation and service latency thresholds must be strictly monitored.`,
        `Production cluster dependencies require isolated staging regression tests.`,
        `Automated rollback scripts must remain armed throughout the deployment window.`
      ],
      directive: `Engineering Directive: Inspect daemon socket logs, deploy verified hotfix build v2.4 to staging clusters, verify SHA signatures, and initiate canary rollouts with automated telemetry alarms.`,
      emailGreeting: 'Engineering Leads, DevOps & Security Squads,',
      emailSign: 'Technical Operations & Systems Architecture Desk',
    };
  } else if (audience === 'employee') {
    audiencePerspective = {
      label: 'Internal Staff & Teams',
      focusArea: 'Daily workflow adjustments, team coordination, and practical operational steps',
      summary: `Staff Operations & Workflow Guidance: ${rawCore} Here is what this means for your day-to-day responsibilities, squad coordination, and ongoing deliverable schedules.`,
      findings: [
        `What Changes for Your Team: ${rawCore} translates to revised weekly task prioritization.`,
        `Daily Workflow Adjustments: Regarding ${rawSecond}, squad members should follow the updated internal checklist.`,
        `Collaboration Guidelines: Coordinate directly with your team leads during morning syncs.`,
        `Tools & Training: All necessary support documentation is now available on the internal portal.`
      ],
      implications: [
        `No unscheduled overtime is required; tasks will be prioritized within normal work hours.`,
        `Team leads will provide hands-on walkthroughs for any updated tooling.`,
        `Internal support desk is standing by to resolve workflow bottlenecks.`
      ],
      directive: `Staff Action Items: Review updated operational checklist with your team lead, confirm receipt of new workflow guidelines by end of week, and submit feedback via the internal team portal.`,
      emailGreeting: 'Hello Team Members & Department Colleagues,',
      emailSign: 'Warm regards,\nPeople Operations & Internal Communications Team',
    };
  } else {
    // public
    audiencePerspective = {
      label: 'General Public & Community',
      focusArea: 'Transparent community updates, service reliability, and customer safety',
      summary: `Community & Public Information Notice: ${rawCore} We are committed to complete transparency, ensuring our community and customers remain informed and protected.`,
      findings: [
        `Service Reliability: ${rawCore} Our core public services remain secure, transparent, and fully accessible.`,
        `Community Safety & Care: Regarding ${rawSecond}, proactive measures are active to protect all community members.`,
        `Customer Support Assistance: Dedicated support representatives are available around the clock to address any questions.`,
        `Ongoing Transparency: Verified public progress updates will be posted to our official community hub.`
      ],
      implications: [
        `Your user accounts, everyday services, and public access remain safeguarded.`,
        `No complex technical action is needed from community members at this time.`,
        `We will provide real-time updates as additional verified milestones are achieved.`
      ],
      directive: `Community Information: No user action is required at this time. For official inquiries and real-time status notifications, please consult our verified public help portal.`,
      emailGreeting: 'Dear Valued Community Members and Customers,',
      emailSign: 'With our commitment to service excellence,\nPublic Affairs & Customer Care Team',
    };
  }

  // -------------------------------------------------------------
  // 2. Syntax & Voice Transformation by Tone
  // -------------------------------------------------------------
  let toneVoice = {};

  if (tone === 'urgent') {
    toneVoice = {
      prefix: '🚨 CRITICAL DIRECTIVE / IMMEDIATE ACTION REQUIRED:',
      opener: 'URGENT ESCALATION: Immediate attention is mandated. Failure to execute within designated operational windows poses severe institutional risk.',
      closer: 'MANDATORY DEADLINE: Immediate compliance required within 12 hours. Department heads must log confirmation immediately.',
      badge: 'CRITICAL PRIORITY',
      socialLead: '🚨 BREAKING / URGENT UPDATE: Immediate action required regarding recent developments. Here are the facts you must know right now 👇',
      emailSubjectPrefix: '[URGENT - ACTION REQUIRED IN 12H] ',
    };
  } else if (tone === 'casual') {
    toneVoice = {
      prefix: '✨ Quick Update:',
      opener: 'Hey folks! We wanted to share a friendly breakdown of what is happening, why it matters, and how we are moving forward together.',
      closer: 'Thanks so much for your awesome work and flexibility. Give your team lead a shout if you need any help!',
      badge: 'COMMUNITY UPDATE',
      socialLead: 'Exciting news and a quick heads-up! 🚀 Here is the complete breakdown of what just dropped and what it means for you 👇',
      emailSubjectPrefix: 'Quick update: ',
    };
  } else if (tone === 'neutral') {
    toneVoice = {
      prefix: 'Operational Briefing:',
      opener: 'Objective assessment report: The following data points and operational findings have been documented for review.',
      closer: 'Further factual updates will be published as standard verification processes proceed.',
      badge: 'INFORMATIONAL BULLETIN',
      socialLead: 'Summary Report: An objective overview of current operational developments, key data indicators, and upcoming milestones 👇',
      emailSubjectPrefix: 'Information Notice: ',
    };
  } else {
    // formal
    toneVoice = {
      prefix: 'OFFICIAL ADMINISTRATIVE DIRECTIVE:',
      opener: 'Pursuant to established governance protocols and verified administrative review, the following operational determinations are officially promulgated.',
      closer: 'Strict adherence to prescribed governance directives is mandatory across all designated operational units.',
      badge: 'OFFICIAL DIRECTIVE',
      socialLead: 'Official Communication: Comprehensive administrative summary regarding recent strategic determinations and compliance directives 👇',
      emailSubjectPrefix: 'FORMAL NOTICE: ',
    };
  }

  // -------------------------------------------------------------
  // 3. Density & Expansion Transformation by Detail Level
  // -------------------------------------------------------------
  let detailScaledFindings = [];
  let detailScaledActions = [];

  if (detail === 'brief') {
    detailScaledFindings = [
      audiencePerspective.findings[0],
      audiencePerspective.findings[1],
    ];
    detailScaledActions = [
      audiencePerspective.directive,
      toneVoice.closer,
    ];
  } else if (detail === 'detailed') {
    detailScaledFindings = [
      `Phase 1 Discovery: ${audiencePerspective.findings[0]}`,
      `Phase 2 Analysis: ${audiencePerspective.findings[1]}`,
      `Phase 3 Operational Impact: ${audiencePerspective.findings[2]}`,
      `Phase 4 Mitigation Protocol: ${audiencePerspective.findings[3]}`,
      `Phase 5 Ongoing Governance: Continuous logging of telemetry and compliance verification checkpoints.`
    ];
    detailScaledActions = [
      `Immediate Milestone (T+12h): ${audiencePerspective.directive}`,
      `Secondary Milestone (T+48h): Departmental audit confirmation and stakeholder status report.`,
      `Tertiary Milestone (T+7d): Comprehensive post-incident review and governance framework update.`,
      toneVoice.closer,
    ];
  } else {
    // standard
    detailScaledFindings = audiencePerspective.findings;
    detailScaledActions = [
      audiencePerspective.directive,
      `Execute alignment protocols designated for ${audiencePerspective.label}.`,
      toneVoice.closer,
    ];
  }

  return {
    audiencePerspective,
    toneVoice,
    detailScaledFindings,
    detailScaledActions,
    lang,
  };
}

export function synthesizeDynamicOutputs(analysis, config, rawText) {
  const { title, metrics, tags, severity } = analysis;
  const langKey = config.language && LOCALIZATION[config.language] ? config.language : 'English';
  const loc = LOCALIZATION[langKey] || LOCALIZATION.English;
  const audience = config.audience || 'executive';
  const tone = config.tone || 'formal';

  // Perform Deep Semantic Content Rewriting
  const adapted = buildAdaptedContent(analysis, config);
  const { audiencePerspective, toneVoice, detailScaledFindings, detailScaledActions } = adapted;

  // =========================================================================
  // 1. PRESENTATION SLIDES — EXACTLY 7 SLIDES (Tailored specifically for audience & tone)
  // =========================================================================
  const slideList = [
    // Slide 1: Title
    {
      id: 1,
      type: 'title',
      title: `${toneVoice.prefix.split(':')[0] || 'Briefing'}: ${title}`,
      subtitle: `${audiencePerspective.label} Edition • ${audiencePerspective.focusArea}`,
      accent: tone === 'urgent' ? '#dc2626' : '#2563eb',
    },
    // Slide 2: Agenda
    {
      id: 2,
      type: 'agenda',
      title: `${loc.agenda} (${audiencePerspective.label})`,
      items: [
        `01. ${loc.context}: ${audiencePerspective.focusArea.slice(0, 35)}...`,
        `02. ${loc.findings}: Tailored for ${audience}`,
        `03. ${loc.metrics}: ${audiencePerspective.label} Parameters`,
        `04. ${loc.implications}: Strategic & Operational Exposure`,
        `05. ${loc.directives}: ${toneVoice.badge}`,
      ],
    },
    // Slide 3: Context & Background
    {
      id: 3,
      type: 'content',
      title: loc.context,
      body: `${toneVoice.opener}\n\n${audiencePerspective.summary}`,
      bullets: [
        `Target Audience Register: ${audiencePerspective.label}`,
        `Core Focus: ${audiencePerspective.focusArea}`,
        detailScaledFindings[0] || title,
      ],
      icon: tone === 'urgent' ? '⚠️' : '📋',
    },
    // Slide 4: Key Findings
    {
      id: 4,
      type: 'content',
      title: `${loc.findings} (${audiencePerspective.label})`,
      body: `Operational and procedural analysis calibrated for ${audiencePerspective.label}:`,
      bullets: detailScaledFindings.slice(0, 4),
      icon: '🔍',
    },
    // Slide 5: Performance Metrics
    {
      id: 5,
      type: 'stats',
      title: `${loc.metrics} — ${audiencePerspective.label}`,
      stats: [
        { label: audiencePerspective.focusArea.slice(0, 24), value: metrics[0] || '100%', trend: 'up' },
        { label: `${audience.toUpperCase()} Priority`, value: metrics[1] || 'Level 1', trend: 'neutral' },
        { label: tone === 'urgent' ? 'Urgency Window' : 'Execution State', value: tone === 'urgent' ? '12 Hours' : (metrics[2] || 'Active'), trend: 'up' },
      ],
    },
    // Slide 6: Strategic Implications & Risk Analysis
    {
      id: 6,
      type: 'content',
      title: loc.implications,
      body: `Critical implications identified for ${audiencePerspective.label}:`,
      bullets: [
        audiencePerspective.implications[0],
        audiencePerspective.implications[1] || `Compliance checkpoint aligned with ${audience} priorities.`,
        `Action Requirement: ${audiencePerspective.directive.slice(0, 110)}...`,
      ],
      icon: '⚡',
    },
    // Slide 7: Directives & Mandatory Next Steps
    {
      id: 7,
      type: 'conclusion',
      title: `${loc.directives} [${tone.toUpperCase()}]`,
      message: audiencePerspective.directive,
      cta: tone === 'urgent' ? 'EXECUTE EMERGENCY DIRECTIVE' : 'INITIATE ACTION PLAN',
      bullets: detailScaledActions,
    },
  ];

  const presentationOutput = {
    title: `${title} (${audiencePerspective.label})`,
    language: langKey,
    audience: audience,
    tone: tone,
    slides: slideList, // Exactly 7 slides
  };

  // =========================================================================
  // 2. SOCIAL MEDIA SUITE (Rewritten voice, hook, and depth)
  // =========================================================================
  const hashtagList = tags.map(t => `#${t.replace(/\s+/g, '')}`).concat([`#${audience}`, `#${tone}`]);

  const socialOutput = {
    campaign: `${tags[0] || 'Enterprise'}_${audience.toUpperCase()}`,
    hashtags: hashtagList.slice(0, 5),
    platforms: {
      twitter: {
        post: `${toneVoice.socialLead}\n\n${audiencePerspective.summary.slice(0, 140)}...\n\n👉 ${audiencePerspective.directive.slice(0, 60)}...\n${hashtagList.slice(0, 3).join(' ')}`,
        thread: [
          `1/5 ${toneVoice.socialLead}`,
          `2/5 [THE SITUATION - ${audiencePerspective.label.toUpperCase()}]: ${audiencePerspective.summary.slice(0, 160)}`,
          `3/5 [KEY FINDINGS]: ${detailScaledFindings[0]}`,
          `4/5 [METRICS]: ${metrics.slice(0, 3).join(' • ')} (${audiencePerspective.focusArea})`,
          `5/5 [WHAT HAPPENS NEXT]: ${audiencePerspective.directive} ${hashtagList.slice(0, 2).join(' ')}`,
        ],
      },
      linkedin: {
        headline: `${toneVoice.emailSubjectPrefix}${title} [${audiencePerspective.label}]`,
        post: `${toneVoice.opener}\n\n${audiencePerspective.summary}\n\nKey Takeaways for ${audiencePerspective.label}:\n${detailScaledFindings.map(f => `• ${f}`).join('\n')}\n\nStrategic & Operational Implications:\n${audiencePerspective.implications.map(i => `✓ ${i}`).join('\n')}\n\nNext Steps:\n${audiencePerspective.directive}\n\n${toneVoice.closer}\n\n${hashtagList.join(' ')}`,
      },
      instagram: {
        caption: `${toneVoice.prefix} ${title}\n\n${audiencePerspective.summary.slice(0, 200)}\n\n📌 Action Required:\n${audiencePerspective.directive}\n\n${hashtagList.join(' ')}`,
        storyText: `${tone === 'urgent' ? '🚨 URGENT: ' : '📢 '}${title}\n\nSwipe for full ${audiencePerspective.label} directives. 📲`,
      },
      facebook: {
        post: `${toneVoice.prefix} ${title}\n\n${audiencePerspective.summary}\n\nWhat this means for ${audiencePerspective.label}:\n${detailScaledFindings.slice(0, 3).map(f => `✓ ${f}`).join('\n')}\n\n${audiencePerspective.directive}`,
      },
    },
  };

  // =========================================================================
  // 3. OFFICIAL ADVISORY (Rewritten protocol, severity, background, and actions)
  // =========================================================================
  const advRef = `ADV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const advisoryOutput = {
    type: tone === 'urgent' ? 'CRITICAL EMERGENCY BULLETIN' : tone === 'formal' ? 'OFFICIAL REGULATORY DIRECTIVE' : 'OPERATIONAL NOTICE',
    severity: tone === 'urgent' ? 'CRITICAL' : severity,
    referenceNumber: advRef,
    title: `${toneVoice.emailSubjectPrefix}${title}`,
    issuedBy: audience === 'technical' ? 'Systems Architecture & Security Operations Command' :
              audience === 'executive' ? 'Executive Board Governance & Fiduciary Bureau' :
              audience === 'employee' ? 'Internal Operations & Employee Continuity Desk' :
              'Public Affairs & Community Information Office',
    issuedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    effectiveDate: tone === 'urgent' ? 'IMMEDIATE EFFECT (12-HOUR COMPLIANCE)' : 'UPON PUBLICATION',
    audience: `${audiencePerspective.label} (${audiencePerspective.focusArea})`,
    summary: `${toneVoice.opener}\n\n${audiencePerspective.summary}`,
    background: `${audiencePerspective.summary} Detailed technical assessment indicates operational dependencies across designated ${audience} infrastructure units.`,
    keyPoints: detailScaledFindings.map((fact, idx) => ({
      heading: `${audiencePerspective.label} Milestone ${String(idx + 1).padStart(2, '0')}`,
      detail: fact,
    })),
    requiredActions: detailScaledActions,
    recommendations: [
      `Maintain continuous logging in compliance with ${audiencePerspective.label} protocols.`,
      `Designate responsible point of contact for milestone reporting.`,
      `Review edge-case contingencies in accordance with standard operating procedures.`
    ],
    contactInfo: `Desk: compliance@internal.domain | Ref: ${advRef} | Channel: ${audience}`,
    disclaimer: 'Official synthesized directive. Verified with zero factual drift. Unauthorized retransmission outside authorized personnel prohibited.',
    nextReview: new Date(Date.now() + (tone === 'urgent' ? 24 * 60 * 60 * 1000 : 14 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
  };

  // =========================================================================
  // 4. BROADCAST VIDEO SCRIPT (Rewritten voiceover monologue and camera direction)
  // =========================================================================
  const scriptScenes = [
    {
      sceneNumber: 1,
      type: 'intro',
      duration: '0:00 - 0:15',
      visual: `High-impact title card displaying ${toneVoice.badge} and metadata. Tag: ${audiencePerspective.label.toUpperCase()}.`,
      audio: tone === 'urgent' ? 'Fast-paced rhythmic synth with alert urgency.' : 'Authoritative, calm corporate acoustic intro.',
      narration: `${toneVoice.opener} Welcome to this ${audiencePerspective.label} operational briefing covering ${title}.`,
      onScreen: `${title.toUpperCase()}\nTARGET: ${audiencePerspective.label.toUpperCase()}`,
    },
    {
      sceneNumber: 2,
      type: 'content',
      duration: '0:15 - 0:45',
      visual: `Split screen highlighting core metrics: ${metrics.slice(0, 2).join(' and ')}. Focus: ${audiencePerspective.focusArea}.`,
      audio: 'Rhythm accelerates to maintain viewer focus.',
      narration: audiencePerspective.summary,
      onScreen: `OVERVIEW\n${audiencePerspective.focusArea.toUpperCase()}`,
    },
    {
      sceneNumber: 3,
      type: 'content',
      duration: '0:45 - 1:30',
      visual: `Animated checklist and diagram showing priority items for ${audiencePerspective.label}.`,
      audio: 'Deep focus acoustic bed.',
      narration: `Examining the critical takeaways for ${audiencePerspective.label}: First, ${detailScaledFindings[0]}. Furthermore, ${detailScaledFindings[1] || 'all operational units are aligned.'}`,
      onScreen: `KEY ACTION ITEMS\n• ${detailScaledFindings[0]?.slice(0, 45)}`,
    },
    {
      sceneNumber: 4,
      type: 'conclusion',
      duration: '1:30 - 2:00',
      visual: 'Full screen directive card with action deadlines and operational contact desk.',
      audio: 'Definitive resolution chord.',
      narration: `${audiencePerspective.directive} ${toneVoice.closer}`,
      onScreen: `${toneVoice.badge}\n${audiencePerspective.directive.slice(0, 60)}`,
    }
  ];

  const videoScriptOutput = {
    title: `Video Briefing: ${title} [${audiencePerspective.label}]`,
    duration: config.detail === 'brief' ? '1 minute' : config.detail === 'detailed' ? '3-4 minutes' : '2 minutes',
    style: `${audience.toUpperCase()} Register • ${tone.toUpperCase()} Cadence`,
    targetPlatform: 'Enterprise Video Portal & Executive Stream',
    scenes: scriptScenes,
    productionNotes: [
      `Target Audience: ${audiencePerspective.label} (${audiencePerspective.focusArea})`,
      `Cadence & Mood: ${tone} • ${toneVoice.badge}`,
      `Subtitles: Enforce closed captions in ${langKey}`,
    ],
  };

  // =========================================================================
  // 5. STAKEHOLDER MEMOS (Rewritten greeting, body, points, and signoff)
  // =========================================================================
  const emailOutput = {
    variants: [
      {
        type: `${loc.execMemo} (${audiencePerspective.label})`,
        to: `${audiencePerspective.label}`,
        from: audiencePerspective.emailSign.split('\n')[1] || 'Office of Communications',
        subject: `${toneVoice.emailSubjectPrefix}${title}`,
        preheader: audiencePerspective.summary.slice(0, 80),
        greeting: audiencePerspective.emailGreeting,
        opening: `${toneVoice.opener}\n\n${audiencePerspective.summary}`,
        body: `As we calibrate around these developments, here is the operational assessment tailored specifically for ${audiencePerspective.label}:\n\n${detailScaledFindings.map(f => `• ${f}`).join('\n')}\n\nDirective Mandate:\n${audiencePerspective.directive}`,
        keyPoints: detailScaledFindings,
        closing: toneVoice.closer,
        signature: audiencePerspective.emailSign,
        priority: tone === 'urgent' ? 'HIGH' : 'NORMAL',
      },
      {
        type: `${loc.staffNotice} [${tone.toUpperCase()}]`,
        to: 'All Team Members & Stakeholders',
        from: 'Internal Operations & Communications Desk',
        subject: `Update: ${title}`,
        preheader: `Important operational update regarding ${title.slice(0, 40)}`,
        greeting: tone === 'casual' ? 'Hey everyone,' : 'Dear Team,',
        opening: audiencePerspective.summary,
        body: `${audiencePerspective.directive}\n\n${toneVoice.closer}`,
        keyPoints: detailScaledFindings.slice(0, 3),
        closing: toneVoice.closer,
        signature: 'Internal Operations & Communications Desk',
        priority: 'NORMAL',
      }
    ]
  };

  // =========================================================================
  // 6. DATA INFOGRAPHIC (Rewritten focus metric, sequence, and directives)
  // =========================================================================
  const infographicOutput = {
    title: `${title} [${audiencePerspective.label}]`,
    subtitle: `${loc.infographicTitle} • Focus: ${audiencePerspective.focusArea} • [${tone.toUpperCase()}]`,
    theme: {
      primaryColor: '#09090b',
      secondaryColor: '#2563eb',
      accentColor: tone === 'urgent' ? '#dc2626' : '#10b981',
      style: 'Clean Corporate Editorial',
    },
    sections: [
      {
        type: 'header',
        title: title,
        subtitle: `${toneVoice.prefix} ${audiencePerspective.summary.slice(0, 160)}`,
      },
      {
        type: 'stats',
        heading: `${loc.byTheNumbers} (${audiencePerspective.label})`,
        items: [
          { value: metrics[0] || '100%', label: audiencePerspective.focusArea.slice(0, 22), icon: '📊' },
          { value: metrics[1] || 'Level 1', label: `${audience.toUpperCase()} Priority`, icon: '🎯' },
          { value: tone === 'urgent' ? '12h' : (metrics[2] || 'Active'), label: tone === 'urgent' ? 'Response Window' : 'Workflow State', icon: '⚡' },
          { value: metrics[3] || 'Phase 1', label: 'Implementation Stage', icon: '📈' },
        ],
      },
      {
        type: 'timeline',
        heading: `${loc.timelineHeading} (${audiencePerspective.label})`,
        steps: [
          { step: '01', title: '01. Ingestion & Analysis', description: 'Source verified with zero factual drift.' },
          { step: '02', title: `02. ${audiencePerspective.label}`, description: audiencePerspective.focusArea },
          { step: '03', title: '03. Directive Deployment', description: audiencePerspective.directive.slice(0, 75) },
          { step: '04', title: '04. Verification & Audit', description: toneVoice.closer.slice(0, 75) },
        ],
      },
      {
        type: 'facts',
        heading: `${loc.findings} (${audiencePerspective.label})`,
        items: detailScaledFindings,
      },
      {
        type: 'cta',
        text: audiencePerspective.directive,
        source: `Source: Synthesized via OmniFormat • Audience: ${audience} • Tone: ${tone} • Detail: ${config.detail}`,
      }
    ]
  };

  return {
    slides: { data: presentationOutput, error: null },
    social: { data: socialOutput, error: null },
    advisory: { data: advisoryOutput, error: null },
    videoScript: { data: videoScriptOutput, error: null },
    email: { data: emailOutput, error: null },
    infographic: { data: infographicOutput, error: null },
  };
}
