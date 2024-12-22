import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const AI_IDENTITY = `I am NOVA_X, your advanced UI engineering assistant. I specialize in creating modern, efficient, and scalable user interfaces.`;

export async function POST(req: Request) {
  const headersList = headers();
  const contentType = await headersList.get('content-type');
  
  if (contentType !== 'text/event-stream') {
    try {
      const { prompt } = await req.json();
      
      if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
      }

      const enhancedPrompt = `${AI_IDENTITY}\n\nUser Request: ${prompt}\n\nResponse:`;
      
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-pro',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      });

      const result = await model.generateContentStream(enhancedPrompt);
      
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
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
      return NextResponse.json(
        { error: 'Failed to process request' },
        { status: 500 }
      );
    }
  }
  
  return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
}
