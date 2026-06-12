import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zentro — Website to Cinematic Demo Video',
  description:
    'Transform any website into a stunning cinematic marketing demo video. Powered by AI-driven browser automation and video rendering.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-warm-50 text-warm-600 antialiased">
        <Navbar />
        <main className="pt-[88px]">{children}</main>
      </body>
    </html>
  );
}
