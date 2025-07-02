"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BarChart3, Heart, Users, Brain, Home as HomeIcon, Info, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: HomeIcon, iconClass: 'text-sky-500' },
  { href: '/bigfive', label: 'Big Five', icon: BarChart3, iconClass: 'text-blue-400' },
  { href: '/empathy', label: 'Empathy', icon: Heart, iconClass: 'text-pink-400' },
  { href: '/news-judgment', label: 'News Judgment', icon: Users, iconClass: 'text-indigo-400' },
  { href: '/cognitive-reflection', label: 'CRT', icon: Brain, iconClass: 'text-orange-400' },
  { href: '/about', label: 'About', icon: Info, iconClass: 'text-sky-500' },
  { href: '/contact', label: 'Contact', icon: Mail, iconClass: 'text-sky-500' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 relative">
        <Link href="/" className="flex items-center" aria-label="Personality360 Home">
          <img src="/logo.svg" alt="Personality360 Logo" className="h-8 w-auto" />
        </Link>
        {/* Desktop nav */}
        <ul className="hidden md:flex gap-4 md:gap-8">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`py-3 font-medium transition-colors duration-150 flex items-center gap-1 ${isActive ? 'font-semibold text-sky-500' : 'text-gray-700 hover:text-sky-500'}`}
                >
                  {link.icon && <link.icon className={`inline w-5 h-5 mr-1 ${link.iconClass}`} />}
                  {link.label}
                </Link>
              </li>
            );
          })}
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
        <div
          className={`absolute top-full right-0 left-auto w-4/5 bg-white border-b border-gray-100 shadow-md md:hidden z-50 rounded-b-2xl py-8 transition-transform duration-300 transform
            ${open ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}
        >
          <ul className="flex flex-col gap-8 px-4 items-center justify-center">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`py-3 font-medium transition-colors duration-150 flex items-center gap-1 text-center ${isActive ? 'font-semibold text-sky-500' : 'text-gray-700 hover:text-sky-500'}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.icon && <link.icon className={`inline w-5 h-5 mr-1 ${link.iconClass}`} />}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
} 