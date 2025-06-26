import "../app/globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AssessmentProvider } from '../components/AssessmentContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personality Assessment & Coaching',
  description: 'Discover your strengths and unlock your potential with our comprehensive personality assessment and personalized coaching.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AssessmentProvider>
          <Header />
          <main className="min-h-[80vh] flex flex-col">{children}</main>
          <Footer />
        </AssessmentProvider>
      </body>
    </html>
  )
} 