"use client";

import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaTiktok } from "react-icons/fa6";

const socials = [
  { name: "Facebook", icon: FaFacebookF, url: "#" },
  { name: "Instagram", icon: FaInstagram, url: "#" },
  { name: "X (Twitter)", icon: FaXTwitter, url: "#" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "#" },
  { name: "TikTok", icon: FaTiktok, url: "#" },
];

export default function ContactPage() {
  const [showToast, setShowToast] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("khurram.saadat@yahoo.com");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      window.open("mailto:khurram.saadat@yahoo.com");
    } catch {
      // fallback: just open mailto
      window.open("mailto:khurram.saadat@yahoo.com");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-sky-500">Contact Us</h1>
      <p className="mb-6 text-lg text-gray-700">
        Have questions, comments, or suggestions? We'd love to hear from you! Reach out anytime and we'll get back to you as soon as possible.
      </p>
      <div className="relative mb-8 flex flex-col items-start">
        {showToast && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-sky-600 text-white px-4 py-2 rounded shadow-lg z-10 animate-fade-in">
            Email address copied!
          </div>
        )}
        <a
          href="mailto:khurram.saadat@yahoo.com"
          onClick={handleEmailClick}
          className="text-lg font-semibold text-sky-600 underline hover:text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-400 transition cursor-pointer"
        >
          khurram.saadat@yahoo.com
        </a>
      </div>
      <div className="flex gap-4 mb-8">
        {socials.map(({ name, icon: Icon, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="bg-gray-100 hover:bg-sky-100 text-sky-600 p-3 rounded-full shadow transition focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Your information will be kept confidential and used only to respond to your inquiry.
      </p>
    </div>
  );
} 