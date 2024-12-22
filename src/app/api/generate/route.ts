import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json();

    // Add security checks and rate limiting here
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    let response;
    
    if (model === 'gemini') {
      const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await geminiModel.generateContent(prompt);
      response = result.response.text();
    } else {
      // Add support for other models here
      return NextResponse.json({ error: 'Model not supported' }, { status: 400 });
    }

    return NextResponse.json({ 
      code: response,
      model: model 
    });
    
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate component' },
      { status: 500 }
    );
  }
}
