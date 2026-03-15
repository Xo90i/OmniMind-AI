'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Zap, Crown, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onAction?: () => void;
}

const tiers = [
  {
    name: 'Sovereign',
    price: '499',
    description: 'For elite individual strategic operators.',
    features: [
      '5 specialized AI agents',
      'Advanced RAG knowledge',
      'Basic scenario simulation',
      'Dialectical reasoning',
      'Standard support'
    ],
    icon: Zap,
    cta: 'Acquire Tier',
    popular: false
  },
  {
    name: 'Imperium',
    price: '1,499',
    description: 'The standard for organizational dominance.',
    features: [
      'Unlimited AI agents',
      'High-fidelity RAG engine',
      'Unlimited simulations',
      'Full consensus engine',
      'Priority sovereign link',
      'Custom protocol design'
    ],
    icon: Crown,
    cta: 'Establish Imperium',
    popular: true
  },
  {
    name: 'Dominion',
    price: 'Custom',
    description: 'Global scale intelligence infrastructure.',
    features: [
      'Dedicated compute nodes',
      'Air-gapped intelligence',
      'Multi-region deployment',
      'Infinite agency scaling',
      'Quantum-ready encryption',
      'White-glove guardianship'
    ],
    icon: ShieldCheck,
    cta: 'Contact Command',
    popular: false
  }
];

export default function Pricing({ onAction }: PricingProps) {
  return (
    <section id="pricing" className="py-32 sm:py-48 bg-royal-black text-white relative">
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-royal-gold/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xs font-black uppercase tracking-[0.5em] text-royal-gold mb-6"
          >
            Tiered Sovereignty
          </motion.h2>
          <h3 className="text-4xl font-black tracking-tighter sm:text-6xl mb-8 uppercase italic">
            Elite Access Protocols
          </h3>
          <p className="text-xl text-white/40 leading-8 max-w-2xl mx-auto font-medium">
            Select the magnitude of your autonomous intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className={`royal-card p-10 flex flex-col relative ${
                tier.popular ? 'border-royal-gold/50 shadow-[0_0_50px_rgba(212,175,55,0.1)] scale-105 z-10' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-royal-gold text-royal-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                  Supreme Choice
                </div>
              )}

              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 ${tier.popular ? 'border-royal-gold/20 bg-royal-gold/10' : ''}`}>
                  <tier.icon className={`w-7 h-7 ${tier.popular ? 'text-royal-gold' : 'text-white/40'}`} />
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-white/40 tracking-widest uppercase mb-1">{tier.name}</div>
                  <div className="text-3xl font-black text-white italic tracking-tighter">
                    {tier.price !== 'Custom' && '$'}{tier.price}
                    {tier.price !== 'Custom' && <span className="text-xs text-white/20 font-medium">/mo</span>}
                  </div>
                </div>
              </div>

              <p className="text-white/40 text-sm font-medium mb-10">{tier.description}</p>

              <ul className="space-y-4 mb-12 flex-1">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-center text-xs font-black text-white/60 uppercase tracking-widest">
                    <CheckIcon className="w-4 h-4 text-royal-gold mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAction}
                className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  tier.popular 
                    ? 'btn-primary' 
                    : 'bg-white/5 border border-white/5 text-white/40 hover:border-royal-gold/30 hover:text-white'
                }`}
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
