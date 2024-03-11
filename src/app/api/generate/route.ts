import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.json();

  // TODO: Replace this with the actual AI-powered resignation letter generation
  const resignationLetter = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.';

  return NextResponse.json({ resignationLetter });
}

