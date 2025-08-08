declare module 'pdf-parse' {
  import { Buffer } from 'buffer';

  interface PDFPage {
    text: string;
  }

  interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown> | undefined;
    text: string;
    version: string;
  }

  function pdfParse(buffer: Buffer | Uint8Array): Promise<PDFParseResult>;
  export = pdfParse;
}
