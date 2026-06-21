import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMockWeeklyReport } from '@/lib/gemini-fallback';

export async function POST(request: Request) {
  try {
    const { displayName, habits } = await request.json();

    if (!habits) {
      return NextResponse.json({ error: 'Habits are required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      const report = getMockWeeklyReport(displayName || 'Eco Pioneer', habits);
      return NextResponse.json({ report, isMock: true });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemInstruction = `
      You are the "EcoVerse AI Sustainability Auditor". Generate a weekly audit report in Markdown for the user based on their current habits.
      User's name: ${displayName || 'Eco Pioneer'}
      Habit context:
      - Transportation: ${habits.transport}
      - Diet: ${habits.food}
      - Home Energy: ${habits.energy}
      - Shopping habits: ${habits.shopping}
      - Water consumption: ${habits.water}

      Provide:
      1. Executive summary of weekly footprint.
      2. Breakdown of carbon score and age performance.
      3. Strategic actions for next week.
      Make it highly motivating, professional, and base suggestions on real-world climate numbers.
    `;

    const result = await model.generateContent(systemInstruction);
    const text = result.response.text();

    return NextResponse.json({ report: text, isMock: false });
  } catch (error: any) {
    console.error('Gemini Report API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate weekly report', details: error.message },
      { status: 500 }
    );
  }
}
