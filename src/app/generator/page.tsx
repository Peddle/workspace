// ...

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // ...
  } catch (error) {
    console.error('Error:', error);
  }
};

// ...

4. Update the `src/app/api/generate/route.ts` file to change the import statement:

