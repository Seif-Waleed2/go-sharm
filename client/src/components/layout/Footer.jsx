import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const exploreLinks = [
  { label: 'Explore Places', to: '/explore' },
  { label: 'Plan My Vacation', to: '/planner' },
  { label: 'Book a Ride', to: '/ride' },
  { label: 'My Trips', to: '/trips' },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Your guide to Sharm El Sheikh — discover the best beaches, restaurants and
            excursions, plan a trip with AI, and book a ride in minutes.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="icon-btn"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink dark:text-white">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-brand-600">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink dark:text-white">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-600" /> Sharm El Sheikh, South Sinai, Egypt</li>
            <li className="flex items-center gap-2"><Phone size={16} className="shrink-0 text-brand-600" /> <a href="tel:+201000000000" className="transition hover:text-brand-600">+20 100 000 0000</a></li>
            <li className="flex items-center gap-2"><Mail size={16} className="shrink-0 text-brand-600" /> <a href="mailto:support@gosharm.example" className="transition hover:text-brand-600">support@gosharm.example</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5 dark:border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Go Sharm. Made for easy Sharm El Sheikh trips.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
