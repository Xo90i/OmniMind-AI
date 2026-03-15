'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Brain, Zap, Target, Users } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-royal-black/60 backdrop-blur-2xl border-b border-royal-gold/10"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex lg:flex-1"
        >
          <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-3 group">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-royal-gold-light via-royal-gold to-royal-gold-dark p-[1px] gold-glow"
              >
                <div className="w-full h-full rounded-full bg-royal-black flex items-center justify-center p-2">
                  <Brain className="w-full h-full text-royal-gold" />
                </div>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-royal-gold rounded-full blur-[1px]"
              />
            </div>
            <div>
              <span className="text-3xl font-black gradient-text tracking-tighter">
                OmniMind
              </span>
              <div className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-[0.2em] text-royal-gold/60">
                <SparklesIcon className="w-3 h-3" />
                <span>Autonomous AI</span>
              </div>
            </div>
          </a>
        </motion.div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-royal-gold hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="relative text-xs font-black uppercase tracking-widest text-white/50 hover:text-royal-gold transition-all duration-300 group"
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 h-[1px] bg-royal-gold rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-ghost text-xs font-black uppercase tracking-widest"
          >
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center gap-2 text-xs uppercase tracking-widest px-8"
          >
            <Zap className="w-4 h-4" />
            Join Elite
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-royal-black/90 backdrop-blur-xl lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-royal-black px-6 py-6 sm:max-w-sm border-l border-royal-gold/10 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal-gold to-royal-gold-dark p-[1px]">
                    <div className="w-full h-full rounded-full bg-royal-black flex items-center justify-center p-2">
                       <Brain className="w-full h-full text-royal-gold" />
                    </div>
                  </div>
                  <span className="text-xl font-black gradient-text">
                    OmniMind
                  </span>
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-royal-gold hover:bg-white/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-12 flow-root">
                <div className="-my-6">
                  <div className="space-y-4 py-6">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="-mx-3 block rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-widest text-white/70 hover:text-royal-gold hover:bg-white/5 transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>
                  <div className="py-6 mt-8 border-t border-white/5 space-y-4">
                    <button className="btn-secondary w-full justify-center">
                      Sign In
                    </button>
                    <button className="btn-primary w-full justify-center flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}