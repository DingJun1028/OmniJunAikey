/**
 * Rune Service - Hybrid AI Gateway
 *
 * This service acts as a unified gateway to multiple AI providers (Straico, Gemini).
 * It abstracts the choice of provider from the rest of the application, allowing
 * for flexible and intelligent routing of AI tasks.
 */

import { StraicoClient } from './straico-client';
import { GeminiClient } from './gemini-client';

type AiProvider = 'straico' | 'gemini';

export class RuneService {
  private straicoClient: StraicoClient;
  private geminiClient: GeminiClient;

  constructor() {
    this.straicoClient = new StraicoClient();
    this.geminiClient = new GeminiClient();
  }

  /**
   * Generates a text-based response from a specified provider.
   * @param prompt - The prompt to send to the AI.
   * @param provider - The AI provider to use ('straico' or 'gemini').
   * @returns The AI-generated text.
   */
  public async generateText(prompt: string, provider: AiProvider = 'gemini'): Promise<string> {
    console.log(`RuneService: Generating text using ${provider} for prompt: "${prompt.slice(0, 30)}..."`);

    if (provider === 'gemini') {
      return this.geminiClient.generateText(prompt);
    } else if (provider === 'straico') {
      // Assuming a simple prompt completion from Straico for this example.
      // This would need a specific agent ID.
      const agentId = process.env.STRAICO_DEFAULT_AGENT_ID || 'default-agent';
      const response = await this.straicoClient.promptAgent(agentId, prompt);
      return response.completion; // Assuming the response has a 'completion' field.
    } else {
      throw new Error(`Unknown AI provider: ${provider}`);
    }
  }

  /**
   * Creates a knowledge base using the Straico RAG service.
   * @param name - The name of the knowledge base.
   * @param files - The files to include.
   * @returns The response from the Straico API.
   */
  public async createKnowledgeBase(name: string, files: { stream: NodeJS.ReadableStream; filename: string }[]) {
    console.log(`RuneService: Creating knowledge base '${name}' via Straico.`);
    return this.straicoClient.createRagBase({ name, files });
  }

  // Future methods could combine services, e.g.:
  // public async summarizeDocumentWithHybridRag(filePath: string) {
  //   // 1. Create a temporary RAG base in Straico
  //   // 2. Ask a question to the RAG base via a Straico agent
  //   // 3. Take the context-rich response and send it to Gemini for a high-quality summary
  // }
}

// Export a singleton instance of the service so the whole app can share it.
export const runeService = new RuneService();
