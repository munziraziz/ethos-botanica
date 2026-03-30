import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Shop': [
      { label: 'All Products', path: '/shop' },
      { label: 'Honey', path: '/shop?category=honey' },
      { label: 'Herbal Tea', path: '/shop?category=tea' },
      { label: 'Essential Oils', path: '/shop?category=oils' },
      { label: 'Supplements', path: '/shop?category=supplements' },
    ],
    'Company': [
      { label: 'About Us', path: '#' },
      { label: 'Our Story', path: '#' },
      { label: 'Sustainability', path: '#' },
      { label: 'Careers', path: '#' },
      { label: 'Press', path: '#' },
    ],
    'Support': [
      { label: 'FAQ', path: '#' },
      { label: 'Shipping', path: '#' },
      { label: 'Returns', path: '#' },
      { label: 'Contact Us', path: '#' },
      { label: 'Track Order', path: '#' },
    ],
  };

  const socials = [
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative border-t border-brand-100/40 bg-white/60 mt-20">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 text-center mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 to-neon-cyan/5" />
          <div className="relative z-10">
            <h3 className="font-outfit text-3xl md:text-4xl font-bold mb-3 text-brand-900">
              Join the <span className="gradient-text">Botanica</span> Family
            </h3>
            <p className="text-brand-200 mb-8 max-w-md mx-auto">
              Subscribe for exclusive offers, wellness tips, and 15% off your first order.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field flex-1"
              />
              <button type="button" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-neon-lime flex items-center justify-center">
                <span className="text-white font-outfit font-black text-lg">E</span>
              </div>
              <div>
                <span className="font-outfit font-bold text-brand-900">Ethos</span>
                <span className="font-outfit font-light text-neon-green"> Botanica</span>
              </div>
            </Link>
            <p className="text-brand-200 text-sm mb-6 leading-relaxed">
              Premium organic & natural wellness products, crafted with care for your health and the planet.
            </p>
            <div className="space-y-2 text-sm text-brand-200">
              <div className="flex items-center gap-2">
                <FiMail size={14} className="text-neon-green" />
                <span>hello@ethosbotanica.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone size={14} className="text-neon-green" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin size={14} className="text-neon-green" />
                <span>Portland, Oregon</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-outfit font-semibold text-brand-900 mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-brand-200 hover:text-neon-green transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-100/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-200/60">
            © {currentYear} Ethos Botanica. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-9 h-9 rounded-lg bg-brand-100/20 flex items-center justify-center
                         text-brand-200 hover:text-neon-green hover:bg-neon-green/10
                         transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
