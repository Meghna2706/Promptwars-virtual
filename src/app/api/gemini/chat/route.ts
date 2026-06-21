import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMockChatResponse } from '@/lib/gemini-fallback';

export async function POST(request: Request) {
  try {
    const { query, history } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      // Return high-fidelity mock AI answers if no key is supplied
      const reply = getMockChatResponse(query);
      return NextResponse.json({ response: reply, isMock: true });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Format chat context to guide Gemini behavior
    const systemInstruction = `
      You are the "EcoVerse AI Sustainability Coach", a premium climate intelligence system. 
      Your mission is to help individuals analyze, track, and decrease their carbon emissions.
      Always be extremely helpful, professional, and base suggestions on real-world climate science.
      Suggest highly actionable steps. Format responses in clean Markdown.
    `;

    // Construct simple context prompt from history + instruction
    let fullPrompt = `${systemInstruction}\n\n`;
    if (history && history.length > 0) {
      fullPrompt += `Chat History:\n`;
      history.forEach((msg: any) => {
        fullPrompt += `${msg.sender === 'user' ? 'User' : 'Coach'}: ${msg.text}\n`;
      });
    }
    fullPrompt += `User: ${query}\nCoach:`;

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    return NextResponse.json({ response: text, isMock: false });
  } catch (error: any) {
    console.error('Gemini API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response', details: error.message },
      { status: 500 }
    );
  }
}
