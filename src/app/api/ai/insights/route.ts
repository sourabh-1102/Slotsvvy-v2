import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { question } = await request.json();

  // Simple keyword matching for mock responses
  let insight = "I'm analyzing your fleet performance.";
  
  if (question.toLowerCase().includes('efficient')) {
      insight = "Driver Ramesh Kumar is currently the most efficient with a 98% delivery rate.";
  } else if (question.toLowerCase().includes('failure')) {
      insight = "Most delivery failures appear to be in the Koramangala area due to incorrect addresses.";
  } else {
      insight = "Based on current trends, you might need 2 more drivers for the weekend shift.";
  }

  return NextResponse.json({ insight });
}
