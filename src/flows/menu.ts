import { defineFlow, generate } from '@genkit-ai/core';
import { geminiPro } from '@genkit-ai/googleai';
import { z } from 'zod';

// Define the input schema for the flow using Zod.
const MenuInputSchema = z.object({
  prompt: z.string(),
});

// Define the output schema for the flow.
const MenuOutputSchema = z.object({
  response: z.string(),
});

// Define the 'menuFlow'. This is our first "agent".
export const menuFlow = defineFlow(
  {
    name: 'menuFlow',
    inputSchema: MenuInputSchema,
    outputSchema: MenuOutputSchema,
  },
  async (input) => {
    const { prompt } = input;

    // Use the Gemini Pro model to generate a response.
    const llmResponse = await generate({
      model: geminiPro,
      prompt: `You are an agent within the JunAiKey OmniKey system. A user has sent the following prompt: "${prompt}". Provide a helpful and concise response.`,
      config: {
        temperature: 0.7,
      },
    });

    // Return the generated text, conforming to the output schema.
    return {
      response: llmResponse.text(),
    };
  }
);
