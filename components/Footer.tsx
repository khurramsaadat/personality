"use client";
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6 gap-2 text-sm text-gray-500">
        <div>
          © {year} Personality App. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <Link href="/about" className="hover:text-primary-600">About</Link>
          <Link href="/database" className="hover:text-primary-600 font-semibold">Data Base</Link>
          <a href="mailto:contact@example.com" className="hover:text-primary-600">Contact</a>
        </div>
      </div>
    </footer>
  );
} 