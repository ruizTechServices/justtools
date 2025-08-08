export default async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // Use pdf-parse for robust server-side text extraction (no DOM polyfills required)
  // Import the internal implementation directly to avoid index.js debug code
  // that attempts to read a test PDF when module.parent is undefined.
  const mod = await import('pdf-parse/lib/pdf-parse.js');
  const pdfParse: (data: Buffer) => Promise<{ text?: string }> =
    typeof mod === 'function'
      ? (mod as (data: Buffer) => Promise<{ text?: string }>)
      : ((mod as { default: unknown }).default as (data: Buffer) => Promise<{ text?: string }>);

  const result = await pdfParse(buffer);
  const text: string = (result?.text ?? '').toString();
  return text.trim();
}