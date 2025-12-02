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

export default function FloatingHorizontalNav() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glassmorphic Background */}
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="p-3 bg-white/10 backdrop-blur-lg rounded-full shadow-xl border border-white/20 flex items-center justify-center"
      >
        {/* Flexbox Nav Container */}
        <nav className="flex items-center gap-6 md:gap-8 lg:gap-10">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center relative"
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-center p-3 rounded-full transition-all duration-300 group hover:bg-white/20"
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                  >
                    <Icon 
                      size={26} 
                      className={`text-white ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-90'}`}
                    />
                  </motion.div>
                </Link>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                )}

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -40 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-0 px-3 py-1 bg-black/70 text-white text-sm rounded-md whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>
      </motion.div>
    </motion.div>
  );
}