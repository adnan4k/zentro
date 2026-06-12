import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zentro — Website to Cinematic Demo Video',
  description:
    'Transform any website into a stunning cinematic marketing demo video. Powered by AI-driven browser automation and video rendering.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#1a2325] text-[#fbf0d5] antialiased">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#F5DD9D]/10 bg-[#1a2325]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#F5DD9D] to-[#92A68A] text-sm text-[#1a2325] shadow-lg shadow-[#F5DD9D]/20">
                Z
              </span>
              <span className="gradient-text">Zentro</span>
            </a>
            <div className="flex items-center gap-4 text-sm text-[#F5DD9D]/50">
              <span>Website → Video</span>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
