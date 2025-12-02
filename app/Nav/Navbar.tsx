'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Scroll hide logic
  const { scrollY } = useScroll();
  let lastScrollY = 0;

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const direction = current > lastScrollY ? "down" : "up";
      if (direction === "down" && current > 100) {
        setHidden(true);
        setIsOpen(false);
      } else if (direction === "up") {
        setHidden(false);
      }
      lastScrollY = current;
    }
  });

  // Dark mode setup
  useEffect(() => {
    // Check system preference first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const shouldBeDark = saved === 'true' || (!saved && prefersDark);
      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('darkMode', newDark.toString());

    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      {/* Scroll-aware Navbar */}
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: -100 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Logo
          </Link>

          {/* Desktop Menu + Dark Toggle */}
          <nav className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="relative w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              <motion.div
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {isDark ? (
                  <Moon className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Sun className="w-6 h-6 text-orange-500" />
                )}
                </motion.div>
            </button>
          </nav>

          {/* Mobile: Hamburger + Dark Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Dark Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <motion.div animate={{ scale: isDark ? 1.1 : 1 }}>
                {isDark ? (
                  <Moon className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Sun className="w-6 h-6 text-orange-500" />
                )}
              </motion.div>
            </button>

            <button onClick={() => setIsOpen(!isOpen)}>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Floating Menu (Left Side) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <nav className="flex-1 p-6">
                <ul className="space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ x: -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-xl font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Dark Mode Toggle Inside Mobile Menu */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-between py-4 px-6 bg-gray-100 dark:bg-gray-800 rounded-xl"
                >
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Dark Mode
                  </span>
                  <motion.div animate={{ scale: isDark ? 1.2 : 1 }}>
                    {isDark ? <Moon className="w-6 h-6 text-yellow-400" /> : <Sun className="w-6 h-6 text-orange-500" />}
                  </motion.div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

