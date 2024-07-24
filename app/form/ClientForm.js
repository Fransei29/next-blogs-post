'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [blogurl, setBlogurl] = useState('');
  const [feedurl, setFeedurl] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const currentDate = new Date().toISOString();

    const formData = {
      name,
      email,
      blogurl,
      feedurl,
      notes,
      approved: false,
      date: currentDate
    };

    console.log('Submitting form data:', formData); // Log para verificar los datos enviados

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert('Form submitted successfully');
      // Limpiar los campos del formulario
      setName('');
      setEmail('');
      setBlogurl('');
      setFeedurl('');
      setNotes('');
      // Redirigir al inicio
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 md:mt-0 md:col-span-2">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Blog name / owner name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-5 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Email address
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-5 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Blog URL
          </label>
          <input
            type="url"
            required
            value={blogurl}
            onChange={(e) => setBlogurl(e.target.value)}
            className="mb-5 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            placeholder="https://www.example.com"
          />
          <label className="block text-sm font-medium leading-5 text-gray-700">
            RSS Feed URL
          </label>
          <input
            type="url"
            required
            value={feedurl}
            onChange={(e) => setFeedurl(e.target.value)}
            className="mb-5 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            placeholder="https://www.example.com/feed"
          />
          <label htmlFor="notes" className="block text-sm leading-5 font-medium text-gray-700">
            Notes
          </label>
          <div className="rounded-md shadow-sm">
            <textarea
              id="notes"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              placeholder="Anything you want to tell us!"
            ></textarea>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Your submission will be approved before appearing on the site
          </p>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
            >
              {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
          </span>
          <span className="inline-flex rounded-md shadow-sm ml-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
            >
              Back to Home
            </button>
          </span>
        </div>
      </div>
    </form>
  );
}
