import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMockImageScan } from '@/lib/gemini-fallback';

export async function POST(request: Request) {
  try {
    const { imageBase64, imageName, mimeType } = await request.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image content is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      // Simulate analysis from filename keywords
      const mockResult = getMockImageScan(imageName || 'food');
      return NextResponse.json({ result: mockResult, isMock: true });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemInstruction = `
      You are the "EcoVerse AI Vision Scanner". You analyze images of consumer products, foods, appliances, or transportation to estimate their carbon footprint, sustainability rating (1 to 5), and suggest 3 eco-friendly alternatives.
      Respond ONLY with a JSON object in this format:
      {
        "category": "Item Category Name",
        "name": "Specific Detected Item Name",
        "carbonFootprint": "estimated footprint (e.g. 5.2 kg CO2)",
        "sustainabilityRating": 4,
        "alternatives": ["Alternative 1", "Alternative 2", "Alternative 3"],
        "explanation": "Detailed paragraph explaining the carbon cost, source materials, and lifecycle impact."
      }
    `;

    // Strip header if base64 contains metadata like "data:image/jpeg;base64,"
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const result = await model.generateContent([
      systemInstruction,
      {
        inlineData: {
          data: cleanBase64,
          mimeType: mimeType || 'image/jpeg'
        }
      }
    ]);

    const responseText = result.response.text();
    // Parse the JSON output from Gemini
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);

    return NextResponse.json({ result: parsedData, isMock: false });
  } catch (error: any) {
    console.error('Gemini Vision API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image', details: error.message },
      { status: 500 }
    );
  }
}
