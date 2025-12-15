import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
    console.log("AI Insight Request Received");
    
    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY is missing from environment variables.");
        return NextResponse.json({ error: 'Server Config Error: GEMINI_API_KEY is not set. Did you restart the server?' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { question, context } = body;
        
        console.log(`Processing Question: "${question?.substring(0, 50)}..."`);

        // Using gemini-pro which is widely available
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
            You are an AI Analyst for a logistics company called SlotSavvy.
            You have access to the following real-time dashboard data:
            
            ${JSON.stringify(context, null, 2)}
            
            User Question: "${question}"
            
            Provide a concise, data-driven answer (max 3 sentences) based strictly on the provided data. 
            Highlight key metrics if relevant. If the data doesn't answer the question, say so politely.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("AI Response Generated successfully");
        return NextResponse.json({ insight: text });
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        const errorMessage = error?.message || 'Unknown AI Error';
        return NextResponse.json({ error: `AI Error: ${errorMessage}` }, { status: 500 });
    }
}
