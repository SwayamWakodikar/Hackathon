const OpenAI = require('openai');
console.log('OpenAI module loaded successfully');
try {
  const client = new OpenAI({ apiKey: 'test' });
  console.log('OpenAI client initialized');
} catch (e) {
  console.log('Error initializing client (expected without key):', e.message);
}
