'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Target, Users } from 'lucide-react';

const loadingSteps = [
  { icon: Brain, text: 'Initializing AI Core', delay: 0 },
  { icon: Users, text: 'Preparing Agent Network', delay: 0.5 },
  { icon: Target, text: 'Calibrating Decision Engine', delay: 1 },
  { icon: Zap, text: 'Activating Neural Pathways', delay: 1.5 },
];

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal-black">
      <div className="absolute inset-0 royal-mesh opacity-20" />
      
      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="relative">
            <div className="w-40 h-40 mx-auto mb-12 relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-[2px] border-royal-gold/10 border-t-royal-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-[1px] border-white/5 border-b-royal-silver/40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-14 h-14 text-royal-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              </div>
            </div>
          </div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl font-black text-white mb-4 uppercase tracking-tighter italic"
          >
            OmniMind AI
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[1px] bg-royal-gold/50 mx-auto mb-6"
          />
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-royal-gold/60 text-xs font-black uppercase tracking-[0.5em]"
          >
            Autonomous Multi-Agent Sovereignty
          </motion.p>
        </motion.div>

        <div className="space-y-4 max-w-sm mx-auto">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="flex items-center space-x-6 text-white/40"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                <step.icon className="w-4 h-4 text-royal-gold" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">{step.text}</span>
                </div>
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ delay: 1 + index * 0.2, duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-transparent via-royal-gold to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mt-16 flex justify-center gap-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
                backgroundColor: ['#D4AF37', '#FFFFFF', '#D4AF37']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="w-1 h-1 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}