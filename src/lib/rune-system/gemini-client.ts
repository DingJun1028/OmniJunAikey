/**
 * Google Gemini API Client
 *
 * This module provides a client for interacting with the Google Gemini API.
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Assume GEMINI_API_KEY is in the environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export class GeminiClient {
  private genAI: GoogleGenerativeAI;

  constructor() {
    if (!GEMINI_API_KEY) {
      throw new Error('Google Gemini API key (GEMINI_API_KEY) is required.');
    }
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }

  /**
   * Generates text from a given prompt using the Gemini Pro model.
   * @param prompt - The text prompt to send to the model.
   * @returns The generated text as a string.
   */
  public async generateText(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Basic safety settings to prevent blocking common prompts
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        safetySettings,
      });

      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('[GeminiClient] Error generating text:', error);
      throw error;
    }
  }
}
