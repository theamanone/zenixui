import { useState, useEffect, useRef } from 'react';

interface UseAIStreamProps {
  onChunk?: (chunk: string) => void;
  onComplete?: () => void;
  onError?: (error: any) => void;
}

export function useAIStream({ onChunk, onComplete, onError }: UseAIStreamProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const startStream = async (prompt: string) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setIsStreaming(true);
    const es = new EventSource(`/api/generate?prompt=${encodeURIComponent(prompt)}`);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      if (event.data === '[DONE]') {
        setIsStreaming(false);
        es.close();
        onComplete?.();
        return;
      }

      try {
        const data = JSON.parse(event.data);
        onChunk?.(data.content);
      } catch (error) {
        console.error('Failed to parse chunk:', error);
      }
    };

    es.onerror = (error) => {
      console.error('Stream error:', error);
      setIsStreaming(false);
      es.close();
      onError?.(error);
    };
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return {
    isStreaming,
    startStream,
  };
}
