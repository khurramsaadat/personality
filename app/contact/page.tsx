"use client";

import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-sky-500">Contact</h1>
      {submitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-6 text-center shadow">
          <h2 className="text-xl font-semibold mb-2">Thank you!</h2>
          <p>Your message has been received. We appreciate your feedback and will get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white font-semibold py-3 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg transition"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
} 