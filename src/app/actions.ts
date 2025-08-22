'use server';

import { agentNetworkService } from "@/lib/agent-network/service";

/**
 * Server Action to interact with an AI agent.
 * This function is executed on the server.
 * @param prompt - The user's prompt.
 * @returns An object with the AI's response or an error message.
 */
export async function askAgentAction(prompt: string): Promise<{ response?: string; error?: string; }> {
  try {
    // In a real app, you'd check for user authentication here.
    // e.g., const { userId } = auth(); if (!userId) { throw new Error("Not authenticated"); }

    if (!prompt) {
      return { error: "Prompt cannot be empty." };
    }

    const aiResponse = await agentNetworkService.chatWithAgent(prompt);
    return { response: aiResponse };

  } catch (error) {
    console.error("Error in askAgentAction:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
