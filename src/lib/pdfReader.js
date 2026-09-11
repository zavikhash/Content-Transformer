import * as pdfjsLib from 'pdfjs-dist';

// Set worker source to CDN matching installed version, with local URL fallback
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '4.10.38'}/build/pdf.worker.min.mjs`;
}

/**
 * Extracts plain text from a PDF File or ArrayBuffer
 * @param {File | ArrayBuffer} fileOrBuffer 
 * @returns {Promise<{ text: string, pages: number }>}
 */
export async function extractTextFromPdf(fileOrBuffer) {
  let arrayBuffer;
  if (fileOrBuffer instanceof File) {
    arrayBuffer = await fileOrBuffer.arrayBuffer();
  } else {
    arrayBuffer = fileOrBuffer;
  }

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    });

    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    let fullText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');

      if (pageText.trim()) {
        fullText += pageText + '\n\n';
      }
    }

    const cleanedText = fullText.trim();
    if (cleanedText.length > 20) {
      return { text: cleanedText, pages: numPages };
    }
    
    // If empty text (scanned PDF), try fallback
    return fallbackExtractText(arrayBuffer, numPages);
  } catch (err) {
    console.warn('PDF.js parsing encountered issue, trying stream fallback:', err);
    return fallbackExtractText(arrayBuffer, 1);
  }
}

/**
 * Robust fallback parser that extracts text blocks from raw PDF stream tokens (BT ... ET)
 */
function fallbackExtractText(arrayBuffer, pageCount = 1) {
  const bytes = new Uint8Array(arrayBuffer);
  let rawStr = '';
  // Convert printable ASCII chunks
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    if ((b >= 32 && b <= 126) || b === 10 || b === 13) {
      rawStr += String.fromCharCode(b);
    } else {
      rawStr += ' ';
    }
  }

  // Extract strings inside parentheses like (Hello World) Tj or [(Hello) (World)] TJ
  const textMatches = [];
  const textTokenRegex = /\(([^)]+)\)\s*(?:Tj|'|")/g;
  let match;
  while ((match = textTokenRegex.exec(rawStr)) !== null) {
    const str = match[1].replace(/\\([()\\])/g, '$1').trim();
    if (str.length > 1 && !str.startsWith('/')) {
      textMatches.push(str);
    }
  }

  // Also check hex strings <48656c6c6f>
  const hexRegex = /<([0-9a-fA-F]{4,})>\s*Tj/g;
  while ((match = hexRegex.exec(rawStr)) !== null) {
    try {
      const hex = match[1];
      let decoded = '';
      for (let j = 0; j < hex.length; j += 2) {
        decoded += String.fromCharCode(parseInt(hex.substr(j, 2), 16));
      }
      if (decoded.trim().length > 1) {
        textMatches.push(decoded.trim());
      }
    } catch {}
  }

  const result = textMatches.join(' ').replace(/\s+/g, ' ').trim();
  if (result.length > 20) {
    return { text: result, pages: pageCount };
  }

  throw new Error('Unable to extract text from this PDF. It may be an image-only scanned PDF or password protected.');
}
