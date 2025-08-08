import 'dotenv/config';
import summarizeText from '@/lib/functions/summarizeText';

const sampleText = `
Artificial intelligence (AI) is a branch of computer science that aims to create intelligent machines that can perform tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding. AI has evolved significantly since its inception in the 1950s, moving from simple rule-based systems to sophisticated machine learning algorithms and neural networks. Today, AI is used in various applications such as autonomous vehicles, medical diagnosis, natural language processing, and computer vision. The field continues to advance rapidly, with researchers developing more powerful and efficient algorithms that can handle increasingly complex problems.
`;

(async () => {
  try {
    console.log('=== Testing summarizeText function ===\n');
    
    // Test 1: Basic summarization
    console.log('Test 1: Basic summarization with default maxTokens');
    const summary1 = await summarizeText(sampleText);
    console.log('Summary:', summary1);
    console.log('Summary length:', summary1.length, 'characters\n');
    
    // Test 2: Custom maxTokens
    console.log('Test 2: Summarization with custom maxTokens (150)');
    const summary2 = await summarizeText(sampleText, 150);
    console.log('Summary:', summary2);
    console.log('Summary length:', summary2.length, 'characters\n');
    
    // Test 3: Short text
    console.log('Test 3: Short text summarization');
    const shortText = "AI is transforming the world.";
    const summary3 = await summarizeText(shortText);
    console.log('Original:', shortText);
    console.log('Summary:', summary3);
    
    console.log('\n✅ All tests completed successfully');
  } catch (error) {
    console.error('❌ Error testing summarizeText:', error);
  }
})();
