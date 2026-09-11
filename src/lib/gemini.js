import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAnalysisPrompt, getFormatPrompt, getFactCheckPrompt } from './prompts';

let genAI = null;

export function initGemini(apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export function isGeminiReady() {
  return genAI !== null;
}

async function callGemini(prompt, retries = 2) {
  if (!genAI) throw new Error('Gemini not initialized. Please enter your API key.');
  
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 4096,
    },
  });

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || 
                        text.match(/```\n?([\s\S]*?)\n?```/) ||
                        [null, text];
      const jsonStr = jsonMatch[1].trim();
      return JSON.parse(jsonStr);
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
}

export async function analyzeContent(content, config) {
  const prompt = getAnalysisPrompt(content, config);
  return await callGemini(prompt);
}

export async function generateAllFormats(analysis, config, selectedFormats, onProgress) {
  const formatKeys = Object.keys(selectedFormats).filter(k => selectedFormats[k]);
  const results = {};
  
  // Generate all formats in parallel
  const promises = formatKeys.map(async (format) => {
    try {
      const prompt = getFormatPrompt(format, analysis, config);
      const result = await callGemini(prompt);
      results[format] = { data: result, error: null };
      onProgress?.(format, 'done');
    } catch (err) {
      results[format] = { data: null, error: err.message };
      onProgress?.(format, 'error');
    }
  });

  // Track progress
  formatKeys.forEach(f => onProgress?.(f, 'loading'));
  
  await Promise.all(promises);
  return results;
}

export async function verifyFacts(content, analysis, config) {
  const prompt = getFactCheckPrompt(content, analysis, config);
  return await callGemini(prompt);
}
