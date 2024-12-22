'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateComponentStream(prompt: string, sessionId?: string) {
  const cookieStore = cookies();
  const currentSessionId = sessionId || uuidv4();
  
  if (!sessionId) {
    cookieStore.set('ai_session', currentSessionId, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  try {
    const chat = model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessageStream(prompt);
    
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let accumulatedText = '';
          
          for await (const chunk of result.stream) {
            const text = chunk.text();
            accumulatedText += text;
            
            const message = {
              type: 'chunk',
              content: text,
              sessionId: currentSessionId,
            };
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
          }
          
          // Save to chat history here if needed
          
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
