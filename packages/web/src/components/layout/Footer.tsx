import React from 'react';

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'API'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-warm-200/50 bg-white py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Brand column */}
          <div className="md:col-span-2">
            <a href="/" className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-warm-400 text-sm font-bold text-white shadow-btn">
                Z
              </span>
              <span className="text-xl font-bold text-warm-600">Zentro</span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-warm-300">
              Transform any website into a cinematic marketing demo video. Powered by
              browser automation and cinematic rendering.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold text-warm-600">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-warm-300 transition-colors hover:text-warm-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-warm-200/50 pt-8 text-center">
          <p className="text-xs text-warm-300">
            &copy; {year} Zentro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
