'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import UseCases from '@/components/sections/UseCases';
import QueryInterface from '@/components/ai/QueryInterface';
import AgentWorkflow from '@/components/ai/AgentWorkflow';
import ParticleBackground from '@/components/ui/ParticleBackground';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function HomePage() {
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleQuerySubmit = (query: string) => {
    setCurrentQuery(query);
    setShowWorkflow(true);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-royal-black">
      <div className="absolute inset-0 royal-mesh opacity-20 pointer-events-none" />
      <ParticleBackground />
      
      <AnimatePresence mode="wait">
        {!showWorkflow ? (
          <motion.div
            key="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            <UseCases />
            
            <section className="py-48 px-4 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-royal-gold/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-royal-black via-royal-gold/5 to-royal-black opacity-30"></div>
              
              <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-24"
                >
                  <motion.span 
                    className="text-[10px] font-black uppercase tracking-[0.5em] text-royal-gold mb-6 block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    Immediate Deployment
                  </motion.span>
                  <h2 className="text-4xl sm:text-7xl font-black text-white mb-8 italic uppercase tracking-tighter">
                    Summon the <span className="text-royal-gold">Collective</span>
                  </h2>
                  <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-medium">
                    Initiate a high-fidelity collaboration between elite AI constructs. 
                    Witness the synthesis of sovereign intelligence.
                  </p>
                </motion.div>
                
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-royal-gold/20 to-royal-gold-dark/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <QueryInterface onSubmit={handleQuerySubmit} />
                </div>
              </div>
            </section>

            <footer className="py-20 border-t border-white/5 bg-royal-black/80 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-royal-gold flex items-center justify-center font-black text-royal-black">O</div>
                  <span className="text-xl font-black text-white italic tracking-tighter">OMNIMIND AI</span>
                </div>
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                  © 2024 Sovereign Intelligence Group. All Rights Reserved.
                </div>
                <div className="flex gap-8">
                  {['Intelligence', 'Sovereignty', 'Protocols'].map(link => (
                    <a key={link} href="#" className="text-[10px] font-black text-white/30 uppercase tracking-widest hover:text-royal-gold transition-colors">{link}</a>
                  ))}
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="workflow"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <AgentWorkflow 
              query={currentQuery} 
              onBack={() => setShowWorkflow(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}