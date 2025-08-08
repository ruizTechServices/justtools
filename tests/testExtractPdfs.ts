import { readFileSync } from 'fs';
import { join } from 'path';
import extractTextFromPdf from '../lib/functions/extractTextFromPdf';

(async () => {
  try {
    const testPdfPath = join(__dirname, 'sample.pdf');
    
    let buffer: Buffer;
    try {
      buffer = readFileSync(testPdfPath);
    } catch (err) {
      console.log('⚠️  No test PDF found at', testPdfPath);
      console.log('Please add a sample PDF file to run this test');
      console.log('You can download a sample PDF or create one to test the extractTextFromPdf function');
      process.exit(0);
    }

    console.log('🧪 Testing extractTextFromPdf function...');
    console.log('📄 PDF buffer size:', buffer.length, 'bytes');

    const extractedText = await extractTextFromPdf(buffer);
    
    console.log('✅ Text extraction successful!');
    console.log('📝 Extracted text length:', extractedText.length, 'characters');
    
    if (extractedText.length > 0) {
      console.log('📖 Text preview:', extractedText.substring(0, 200) + (extractedText.length > 200 ? '...' : ''));
    } else {
      console.log('⚠️  No text was extracted from the PDF');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
})();
