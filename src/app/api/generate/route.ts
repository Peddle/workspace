import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const formData = await request.json();

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Write a resignation letter based on the following information:
      
      Name: ${formData.name}
      Position: ${formData.position}
      Company: ${formData.company}
      Start Date: ${formData.startDate}
      End Date: ${formData.endDate}
      Reason for Leaving: ${formData.reason}`,
      max_tokens: 200,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const resignationLetter = completion.data.choices[0].text?.trim() || '';

    return NextResponse.json({ resignationLetter });
  } catch (error) {
    console.error('Error generating resignation letter:', error);
    return NextResponse.json({ error: 'Failed to generate resignation letter' }, { status: 500 });
  }
}

With these changes:

- The landing page (`src/app/page.tsx`) is set up with a call-to-action button that navigates to the `/generator` page.
- The generator page (`src/app/generator/page.tsx`) contains the form for generating the resignation letter and displays the generated letter.
- The API route (`src/app/api/generate/route.ts`) is correctly implemented with the OpenAI API call to generate the resignation letter based on the provided form data.

Make sure you have installed the OpenAI SDK (`npm install openai`) and set up your API key in the `.env.local` file as mentioned in the previous response.

Apologies for any confusion caused earlier. Let me know if you have any further questions!