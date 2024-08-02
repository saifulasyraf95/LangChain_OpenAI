// Import necessary packages
const { LangChain, LLM, ChatInput } = require('langchain');
const { OpenAI } = require('openai');

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your OpenAI API key
});

// Create an LLM instance
const llm = new LLM({
  model: 'text-davinci-003', // You can choose the appropriate model for your use case
  api: openai,
  temperature: 0.7, // Adjust the creativity of the responses
});

// Define the chatbot function
async function chatbot(input) {
  try {
    // Create ChatInput
    const chatInput = new ChatInput({
      messages: [{ role: 'user', content: input }],
    });

    // Get response from LangChain
    const response = await llm.generate(chatInput);
    
    // Extract the message content from the response
    const { content } = response.choices[0].message;

    // Return the response
    return content;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}

// Example usage
(async () => {
  const userInput = 'What is the capital of France?';
  const response = await chatbot(userInput);
  console.log('Bot response:', response);
})();
