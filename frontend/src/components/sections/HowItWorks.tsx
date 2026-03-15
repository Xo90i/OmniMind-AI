'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  DocumentTextIcon, 
  CpuChipIcon, 
  ChartBarIcon, 
  LightBulbIcon,
  CheckCircleIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const steps = [
  {
    id: 1,
    title: 'Cognitive Decomposition',
    description: 'Our Sovereign Planner analyzes your challenge and architecturally breaks it down into elite domains.',
    icon: DocumentTextIcon,
    color: 'from-royal-gold to-royal-gold-dark',
    details: ['Semantic analysis', 'Domain mapping', 'Strategic planning', 'Resource allocation'],
  },
  {
    id: 2,
    title: 'Elite Formation',
    description: 'Dynamic synthesis of specialized AI constructs, each precision-tuned for distinct expert mastery.',
    icon: CpuChipIcon,
    color: 'from-white/10 to-white/5',
    details: ['Construct synthesis', 'Dialectical settings', 'High-fidelity tuning', 'Capability locking'],
  },
  {
    id: 3,
    title: 'Sovereign Research',
    description: 'Concurrent multidimensional intelligence gathering across the global digital landscape.',
    icon: ChartBarIcon,
    color: 'from-royal-gold/20 to-royal-gold/40',
    details: ['Neural retrieval', 'Evidence weighting', 'Real-time synthesis', 'Truth verification'],
  },
  {
    id: 4,
    title: 'Dialectical Debate',
    description: 'Constructs engage in rigorous intellectual contest to forge the most resilient solutions.',
    icon: LightBulbIcon,
    color: 'from-white/5 to-white/10',
    details: ['Logical critique', 'Adversarial testing', 'Solution hardening', 'Strategic alignment'],
  },
  {
    id: 5,
    title: 'Future Projection',
    description: 'Advanced synthetic simulations project high-fidelity outcomes across infinite strategic paths.',
    icon: ChartBarIcon,
    color: 'from-royal-gold-dark to-royal-gold',
    details: ['Linear modeling', 'Chaos assessment', 'Success probability', 'Timeline folding'],
  },
  {
    id: 6,
    title: 'Unerring Consensus',
    description: 'The final distillation of supreme collective intelligence into an actionable royal directive.',
    icon: CheckCircleIcon,
    color: 'from-white/20 to-white/5',
    details: ['Intelligence synthesis', 'Directive issuance', 'Risk insulation', 'Path clearings'],
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="py-32 sm:py-48 bg-royal-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 royal-mesh opacity-20" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-royal-gold/30 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center mb-32"
        >
          <motion.span 
            className="text-xs font-black uppercase tracking-[0.5em] text-royal-gold mb-6 block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            The Workflow of Supremacy
          </motion.span>
          <h2 className="text-4xl font-black tracking-tighter text-white sm:text-6xl mb-8">
            The OmniMind Protocol
          </h2>
          <p className="text-xl text-white/40 leading-8 max-w-2xl mx-auto font-medium">
            Intelligence redefined through a sequence of elite collaborative operations.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1200 800">
              <defs>
                <linearGradient id="royalLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 0.5)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.2)" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 0.5)" />
                </linearGradient>
              </defs>
              {steps.slice(0, -1).map((_, index) => (
                <motion.path
                  key={index}
                  d={`M ${200 + (index % 2) * 400} ${150 + Math.floor(index / 2) * 250} 
                      Q ${400 + (index % 2) * 200} ${200 + Math.floor(index / 2) * 250} 
                      ${600 - (index % 2) * 400} ${150 + Math.floor((index + 1) / 2) * 250}`}
                  stroke="url(#royalLineGradient)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="10,10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, duration: 1.5 }}
                />
              ))}
            </svg>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="royal-card p-12 h-full group-hover:border-royal-gold/40 transition-all duration-500">
                  {/* Step number */}
                  <div className="absolute -top-6 -left-6 w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-royal-gold to-royal-gold-dark flex items-center justify-center text-royal-black font-black text-xl shadow-2xl border border-white/20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-r ${step.color} flex items-center justify-center mb-8 border border-white/5 transition-all duration-500 shadow-2xl overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    <step.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-royal-gold transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium group-hover:text-white/60 transition-colors duration-500">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-10">
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className="flex items-center text-white/30 text-[10px] font-black uppercase tracking-widest"
                      >
                        <div className="w-1.5 h-1.5 bg-royal-gold rounded-full mr-3 shadow-[0_0_5px_rgba(212,175,55,1)]" />
                        {detail}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-32"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-xs font-black uppercase tracking-widest px-12 py-5 flex items-center gap-4 mx-auto"
          >
            Invoke The protocol
            <ArrowRightIcon className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}