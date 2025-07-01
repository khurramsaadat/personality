"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BarChart3, Heart, Users, Brain } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/bigfive', label: 'Big Five', icon: <BarChart3 className="inline w-5 h-5 text-blue-400 mr-1" /> },
  { href: '/empathy', label: 'Empathy', icon: <Heart className="inline w-5 h-5 text-pink-400 mr-1" /> },
  { href: '/news-judgment', label: 'News Judgment', icon: <Users className="inline w-5 h-5 text-indigo-400 mr-1" /> },
  { href: '/cognitive-reflection', label: 'CRT', icon: <Brain className="inline w-5 h-5 text-orange-400 mr-1" /> },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 relative">
        <Link href="/" className="text-xl font-bold text-primary-700 tracking-tight">Personality App</Link>
        {/* Desktop nav */}
        <ul className="hidden md:flex gap-4 md:gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-150 flex items-center gap-1">
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        {/* Mobile nav menu */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md md:hidden animate-fade-in z-50">
            <ul className="flex flex-col gap-2 py-4 px-4">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-150 flex items-center gap-1"
                    onClick={() => setOpen(false)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
} 