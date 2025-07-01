import "../app/globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AssessmentProvider } from '../components/AssessmentContext';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personality Assessment & Coaching',
  description: 'Discover your strengths and unlock your potential with our comprehensive personality assessment and personalized coaching.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brain.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <AssessmentProvider>
          <Header />
          <main className="min-h-[80vh] flex flex-col">{children}</main>
          <Footer />
        </AssessmentProvider>
      </body>
    </html>
  )
} 