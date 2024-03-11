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
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Resignation Letter Generator</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="block mb-1">Position:</label>
          <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block mb-1">Company:</label>
          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block mb-1">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block mb-1">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block mb-1">Reason for Leaving:</label>
          <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Generate Resignation Letter</button>
      </form>
      {resignationLetter && (
        <div className="p-4 border border-gray-300 rounded whitespace-pre-wrap">{resignationLetter}</div>
      )}
    </main>
  );
}

