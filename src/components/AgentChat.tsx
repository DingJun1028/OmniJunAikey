"use client";

import { useState, useTransition } from 'react';
import { askAgentAction } from '@/app/actions';

export default function AgentChat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse('');
    setError('');

    startTransition(async () => {
      const result = await askAgentAction(prompt);
      if (result.error) {
        setError(result.error);
      } else {
        setResponse(result.response || 'No response text.');
      }
    });
  };

  return (
    <div className="w-full max-w-2xl p-4 border rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Chat with an Agent</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-2 bg-background text-foreground"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        />
        <button
          type="submit"
          className="w-full p-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Thinking...' : 'Send'}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-secondary rounded">
          <h4 className="font-bold">Response:</h4>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-destructive text-destructive-foreground rounded">
          <h4 className="font-bold">Error:</h4>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
