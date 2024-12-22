import { useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  vector?: number[];
}

interface UseAIChatOptions {
  onChunkReceived?: (chunk: string) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateId = useCallback(() => crypto.randomUUID(), []);

  const generateResponse = useCallback(async (prompt: string) => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream available');

      // Add user message immediately
      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: prompt,
        timestamp: Date.now(),
        vector: Array.from({ length: 16 }, () => Math.random()), // Simulated embedding
      };
      setMessages(prev => [...prev, userMessage]);

      let accumulatedResponse = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(5);
            if (data === '[DONE]') {
              // Add final assistant message
              const assistantMessage: Message = {
                id: generateId(),
                role: 'assistant',
                content: accumulatedResponse,
                timestamp: Date.now(),
              };
              setMessages(prev => [...prev, assistantMessage]);
              options.onComplete?.();
              break;
            }

            try {
              const chunk = data.replace(/^data: /, '').trim();
              if (chunk === '') return;
              
              if (chunk === '[DONE]') {
                const assistantMessage: Message = {
                  id: generateId(),
                  role: 'assistant',
                  content: accumulatedResponse,
                  timestamp: Date.now(),
                };
                setMessages(prev => [...prev, assistantMessage]);
                options.onComplete?.();
                break;
              }

              const { text } = JSON.parse(chunk);
              accumulatedResponse += text;
              options.onChunkReceived?.(text);
            } catch (e) {
              console.error('Failed to parse chunk:', e);
            }
          }
        }
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      options.onError?.(error);
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating, options]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isGenerating,
    error,
    generateResponse,
    clearMessages,
  };
}
