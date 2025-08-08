declare module 'pdf-parse/lib/pdf-parse.js' {
  import { Buffer } from 'buffer';

  export interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: Record<string, unknown> | null;
    metadata: Record<string, unknown> | null;
    text: string;
    version: string | null;
  }

  const pdfParse: (buffer: Buffer | Uint8Array) => Promise<PDFParseResult>;
  export default pdfParse;
}
