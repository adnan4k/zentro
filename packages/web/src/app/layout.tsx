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
      <body className="min-h-screen bg-[#0a0a14] text-white antialiased">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a14]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#5a5aff] to-[#9d9dff] text-sm text-white shadow-lg shadow-[#5a5aff]/25">
                Z
              </span>
              <span className="gradient-text">Zentro</span>
            </a>
            <div className="flex items-center gap-4 text-sm text-white/50">
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
