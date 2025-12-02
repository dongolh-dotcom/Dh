'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Menu, 
  X,
  Settings,
  FileText
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Contact', href: '/contact', icon: Mail },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Menu size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Vertical Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Nav Panel */}
            <motion.nav
              initial={{ x: -350 }}
              animate={{ x: 0 }}
              exit={{ x: -350 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-purple-900/90 to-blue-900/90 backdrop-blur-xl border-r border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-8">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white mb-12"
                >
                  My App
                </motion.h2>

                <ul className="space-y-4">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                            isActive
                              ? 'bg-white/20 text-white shadow-lg'
                              : 'text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="relative"
                          >
                            <Icon size={24} />
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute -inset-2 bg-white/30 rounded-full blur-xl"
                                transition={{ type: "spring", stiffness: 300 }}
                              />
                            )}
                          </motion.div>
                          <span className="text-lg font-medium relative">
                            {item.name}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-auto p-8 border-t border-white/10"
              >
                <p className="text-white/50 text-sm">© 2025 My App</p>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}