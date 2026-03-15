'use client';

import { motion } from 'framer-motion';
import { 
  CpuChipIcon, 
  DocumentMagnifyingGlassIcon, 
  ChartBarIcon,
  LightBulbIcon,
  EyeIcon,
  CloudIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Multi-Agent Collaboration',
    description: 'Dynamic creation of specialized AI agents that work together to solve complex problems.',
    icon: CpuChipIcon,
    color: 'bg-royal-gold/10 text-royal-gold',
  },
  {
    name: 'RAG Knowledge Engine',
    description: 'Retrieval-augmented generation with verified data sources to eliminate hallucinations.',
    icon: DocumentMagnifyingGlassIcon,
    color: 'bg-white/5 text-royal-gold',
  },
  {
    name: 'Scenario Simulation',
    description: 'Predictive modeling of different strategies with cost, risk, and outcome analysis.',
    icon: ChartBarIcon,
    color: 'bg-royal-gold/10 text-royal-gold',
  },
  {
    name: 'AI Debate Engine',
    description: 'Agents critique and refine solutions through structured collaborative reasoning.',
    icon: LightBulbIcon,
    color: 'bg-white/5 text-royal-gold',
  },
  {
    name: 'Explainable AI',
    description: 'Visual workflow showing agent contributions and reasoning paths for transparency.',
    icon: EyeIcon,
    color: 'bg-royal-gold/10 text-royal-gold',
  },
  {
    name: 'Persistent Memory',
    description: 'Long-term strategic guidance with context from previous decisions and goals.',
    icon: CloudIcon,
    color: 'bg-white/5 text-royal-gold',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 sm:py-48 bg-royal-black text-white relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-royal-gold/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xs font-black uppercase tracking-[0.5em] text-royal-gold mb-6"
          >
            Elite Technologies
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-black tracking-tighter sm:text-6xl mb-12"
          >
            Sovereign Architecture
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-xl leading-8 text-white/40 max-w-2xl mx-auto font-medium"
          >
            The pinnacle of autonomous collaboration. Discover the modules that power the OmniMind ecosystem.
          </motion.p>
        </div>
        
        <div className="mx-auto mt-24 max-w-2xl sm:mt-32 lg:mt-40 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-12 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col royal-card p-10 group"
              >
                <dt className="flex items-center gap-x-4 text-lg font-black uppercase tracking-widest text-white mb-6">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${feature.color} border border-white/5 group-hover:border-royal-gold/50 transition-all duration-500 shadow-2xl`}>
                    <feature.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="flex flex-auto flex-col text-sm leading-7 text-white/40 font-medium">
                  <p className="flex-auto group-hover:text-white/60 transition-colors duration-500">{feature.description}</p>
                  <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-royal-gold text-xs font-black uppercase tracking-widest cursor-pointer hover:underline">
                      Explore Technicals
                    </span>
                  </div>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}