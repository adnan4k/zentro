import React from 'react';

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Showcase', href: '/#showcase' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between rounded-full border border-warm-200/50 bg-white/95 pl-5 pr-2 shadow-card backdrop-blur-lg">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warm-400 text-sm font-bold text-white">
            Z
          </span>
          <span className="text-warm-600">Zentro</span>
        </a>

        {/* Center links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-warm-600/80 transition-colors hover:bg-warm-50 hover:text-warm-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="hidden sm:inline-flex rounded-full px-4 py-2 text-sm font-medium text-warm-600/80 transition-colors hover:bg-warm-50 hover:text-warm-600"
          >
            Login
          </a>
          <a
            href="/#hero-form"
            className="group inline-flex items-center gap-2 rounded-full bg-warm-600 py-2.5 pl-5 pr-4 text-sm font-semibold text-white transition-all hover:bg-warm-500 active:scale-[0.98]"
          >
            Sign in
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};
