'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { callApi } from '@/lib/rune-system/api';

// Define the structure of the API response from our menuFlow
interface MenuFlowResponse {
  response: string;
}

export default function DashboardPage() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const result = await callApi<MenuFlowResponse>('/api/flows/menuFlow', { prompt });
      setResponse(result.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>終始矩陣儀表盤 (Terminus Matrix Dashboard)</CardTitle>
        <CardDescription>向萬能代理網絡發送指令。</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="輸入您的指令..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '思考中...' : '發送'}
          </Button>
        </form>
        {error && (
          <div className="mt-4 rounded-md border border-red-500 bg-red-50 p-4 text-sm text-red-700">
            <p><strong>錯誤:</strong> {error}</p>
          </div>
        )}
        {response && (
          <div className="mt-4 rounded-md border bg-slate-50 p-4 text-slate-800">
            <p>{response}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-slate-500">代理網絡由 Google Gemini API & Genkit 驅動。</p>
      </CardFooter>
    </Card>
  );
}
