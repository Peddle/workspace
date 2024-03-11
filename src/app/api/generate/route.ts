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

In this updated code:
- We import the `Configuration` and `OpenAIApi` from the `openai` package.
- We create a new `Configuration` instance with your OpenAI API key (loaded from the `.env.local` file).
- We create an instance of `OpenAIApi` using the configuration.
- In the `POST` function, we use `openai.createCompletion()` to generate the resignation letter based on the provided form data.
- We pass the form data as a prompt to the OpenAI API, specifying the model to use, the maximum number of tokens, and other parameters.
- We extract the generated resignation letter from the API response and return it as JSON.
- If an error occurs during the API call, we catch it, log the error, and return an appropriate error response.

Make sure to restart your development server after adding the `.env.local` file for the changes to take effect.

With these changes, your webapp should now generate resignation letters using OpenAI's language model based on the user's input.