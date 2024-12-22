interface GenerateResponse {
  code: string;
  model: string;
  error?: string;
}

export async function generateComponent(prompt: string, model: string): Promise<GenerateResponse> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, model }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate component');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Generation Error:', error);
    throw error;
  }
}
