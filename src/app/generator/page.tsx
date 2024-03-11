'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [resignationLetter, setResignationLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resignation letter');
      }

      const data = await response.json();
      setResignationLetter(data.resignationLetter);
    } catch (error) {
      console.error('Error:', error);
    }

    setIsLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Resignation Letter Generator</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="label">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input-field" required />
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="label">Position:</label>
          <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} className="input-field" required />
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="label">Company:</label>
          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="input-field" required />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="label">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="input-field" required />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="label">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="input-field" required />
        </div>
        <div className="mb-6">
          <label htmlFor="reason" className="label">Reason for Leaving:</label>
          <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} className="input-field" required />
        </div>
        <button type="submit" className="button w-full" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Resignation Letter'}
        </button>
      </form>
      {resignationLetter && (
        <div className="bg-white shadow-md rounded-lg p-6 whitespace-pre-wrap">{resignationLetter}</div>
      )}
    </main>
  );
}

The changes made:

1. Added a new state variable called `isLoading` to track the loading state of the request.

2. Updated the `handleSubmit` function to set `isLoading` to `true` before making the API request and set it back to `false` after receiving the response or encountering an error.

3. Added the `disabled` attribute to the submit button, which is controlled by the `isLoading` state. The button will be disabled while the request is pending.

4. Updated the submit button text to display "Generating..." when `isLoading` is `true`, indicating that the request is in progress.

With these modifications, the submit button will show "Generating..." and be disabled while the request is pending. Once the response is received or an error occurs, the button will revert back to its original state, displaying "Generate Resignation Letter" and being clickable again.

This provides a clear visual indication to the user that the generation process is ongoing and prevents them from submitting multiple requests simultaneously.