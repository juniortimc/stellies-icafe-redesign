import { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, MessageCircle, Phone, Copy, Check } from 'lucide-react';

const linkClass =
  'flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-stellies-green dark:hover:text-stellies-green transition-colors rounded focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green';

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com/stelliesicafe', icon: Facebook },
  { label: 'Instagram', href: 'https://instagram.com/stelliesicafe', icon: Instagram },
  { label: 'X (Twitter)', href: 'https://x.com/stelliesicafe', icon: Twitter },
];

export function Footer() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [fallbackMsg, setFallbackMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText('icafe.stb@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:icafe.stb@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    // Use a hidden anchor to trigger mailto without opening a blank tab
    const link = document.createElement('a');
    link.href = mailto;
    link.click();

    // Show fallback after a short delay in case the email client didn't open
    setTimeout(() => {
      setFallbackMsg('If your email app didn\'t open, please email us directly at icafe.stb@gmail.com');
    }, 1500);
  };

  return (
    <footer id="contact" className="bg-gray-100 dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Send Message Form */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">Send us a message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 px-4 py-2 text-sm focus:outline-2 focus:outline-stellies-green"
              />
              <textarea
                placeholder="Your message..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 px-4 py-2 text-sm focus:outline-2 focus:outline-stellies-green resize-none"
              />
              <button
                type="submit"
                className="self-start rounded-lg bg-stellies-green hover:bg-stellies-green-dark text-white font-medium px-6 py-2 text-sm transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
              >
                Send Message
              </button>
              {fallbackMsg && (
                <p className="text-sm text-amber-600 dark:text-amber-400">{fallbackMsg}</p>
              )}
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-1">Contact Info</h3>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Andringa+%26+Banghoek+Stellenbosch"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <MapPin className="w-5 h-5 text-stellies-green shrink-0" aria-hidden="true" />
              38 Libertas Building, Andringa &amp; Banghoek, Stellenbosch
            </a>

            <a href="tel:+27845586680" className={linkClass}>
              <Phone className="w-5 h-5 text-stellies-green shrink-0" aria-hidden="true" />
              +27 84 558 6680
            </a>

            <a
              href="https://wa.me/27845586640"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <MessageCircle className="w-5 h-5 text-stellies-green shrink-0" aria-hidden="true" />
              WhatsApp
            </a>

            <div className="flex items-center gap-2">
              <a href="mailto:icafe.stb@gmail.com" className={linkClass}>
                <Mail className="w-5 h-5 text-stellies-green shrink-0" aria-hidden="true" />
                icafe.stb@gmail.com
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:text-stellies-green hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
              >
                {copied ? <Check className="w-4 h-4 text-stellies-green" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Toast */}
            {copied && (
              <div className="fixed bottom-20 right-6 z-50 rounded-lg bg-slate-900 text-white text-sm px-4 py-2 shadow-lg animate-fade-in">
                Email copied to clipboard!
              </div>
            )}

            {/* Social */}
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-stellies-green dark:hover:text-stellies-green hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <p className="text-sm text-gray-500 dark:text-dark-muted mt-2 italic">
              Located right in the heart of Stellenbosch — visit us for all your tech and printing needs.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-border text-center text-sm text-gray-500 dark:text-dark-muted">
          © {new Date().getFullYear()} Stellies iCafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
