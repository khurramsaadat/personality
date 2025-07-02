"use client";
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6 gap-2 text-sm text-gray-500">
        <div>
          © Misha {year} Personality360. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-sky-500">Home</Link>
          <Link href="/database" className="hover:text-sky-500">Data Base</Link>
          <Link href="/trait-mapping" className="hover:text-sky-500">Trait Mapping</Link>
          <Link href="/about" className="hover:text-sky-500">About</Link>
          <Link href="/contact" className="hover:text-sky-500">Contact</Link>
        </div>
      </div>
    </footer>
  );
} 