/**
 * Agent Network Service
 *
 * High-level service for managing and interacting with AI agents.
 */
import { runeService } from '@/lib/rune-system';

export class AgentNetworkService {
  /**
   * Sends a prompt to a default agent and gets a response.
   * @param prompt - The user's prompt.
   * @returns The AI's response text.
   */
  public async chatWithAgent(prompt: string): Promise<string> {
    // For this demo, we'll just use the RuneService directly.
    // A more complex implementation would involve selecting specific agents,
    // managing conversation history, etc.
    console.log(`AgentNetworkService: Relaying prompt to RuneService.`);
    return runeService.generateText(prompt, 'gemini'); // Default to Gemini for chat
  }
}

// Export a singleton instance
export const agentNetworkService = new AgentNetworkService();
