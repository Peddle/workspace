import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(request: Request) {
  const formData = await request.json();

  try {
    const response = await openai.chat.completions.create({
    model: 'gpt-4', // Specify the model you want to use
    messages: [{ role: 'user', content: `Write a resignation letter based on the following information:
      
      Name: ${formData.name}
      Position: ${formData.position}
      Company: ${formData.company}
      Start Date: ${formData.startDate}
      End Date: ${formData.endDate}
      Reason for Leaving: ${formData.reason}`
    }]
   });

    const resignationLetter = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ resignationLetter });
  } catch (error) {
    console.error('Error generating resignation letter:', error);
    return NextResponse.json({ error: 'Failed to generate resignation letter' }, { status: 500 });
  }
}

