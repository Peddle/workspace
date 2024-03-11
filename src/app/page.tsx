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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

      if (!response.ok) {
        throw new Error('Failed to generate resignation letter');
      }

      const data = await response.json();
      setResignationLetter(data.resignationLetter);
    } catch (error) {
      console.error('Error:', error);
    }
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
        <button type="submit" className="button w-full">Generate Resignation Letter</button>
      </form>
      {resignationLetter && (
        <div className="bg-white shadow-md rounded-lg p-6 whitespace-pre-wrap">{resignationLetter}</div>
      )}
    </main>
  );
}
