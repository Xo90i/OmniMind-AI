'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRightIcon, PlayIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Users, Brain, Target, Zap, Rocket, Shield } from 'lucide-react';
import CountUp from 'react-countup';

const stats = [
  { icon: Users, value: 5, suffix: '+', label: 'AI Agents', color: 'text-royal-gold' },
  { icon: Brain, value: 95, suffix: '%', label: 'Accuracy', color: 'text-royal-silver' },
  { icon: Target, value: 10, suffix: 'x', label: 'Faster Decisions', color: 'text-royal-gold' },
  { icon: Zap, value: 24, suffix: '/7', label: 'Available', color: 'text-royal-silver' },
];

const floatingElements = [
  { icon: Brain, delay: 0, x: '10%', y: '20%' },
  { icon: Target, delay: 1, x: '80%', y: '30%' },
  { icon: Users, delay: 2, x: '15%', y: '70%' },
  { icon: Zap, delay: 3, x: '85%', y: '80%' },
  { icon: Rocket, delay: 4, x: '50%', y: '15%' },
  { icon: Shield, delay: 5, x: '70%', y: '60%' },
];

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 bg-royal-black">
      {/* Royal background effects */}
      <div className="absolute inset-0 royal-mesh opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(212,175,55,0.1)_0%,transparent_50%)]" />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
            transition={{ delay: element.delay * 0.2, duration: 1 }}
            className="absolute floating-element"
            style={{ left: element.x, top: element.y }}
          >
            <element.icon className="w-16 h-16 text-royal-gold" />
          </motion.div>
        ))}
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-royal-gold text-xs font-black uppercase tracking-[0.3em] mb-12 shadow-2xl"
            >
              <SparklesIcon className="w-4 h-4" />
              <span>Future of Autonomous Intelligence</span>
              <ArrowRightIcon className="w-4 h-4" />
            </motion.div>

            <h1 className="text-6xl font-black tracking-tighter text-white sm:text-8xl mb-12">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="block mb-2"
              >
                UNLEASH THE
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block gradient-text drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] leading-tight italic"
              >
                OMNIMIND
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="block mt-2 text-4xl sm:text-6xl text-white/40 tracking-normal"
              >
                Autonomous Multi-Agent Era
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-12 text-lg leading-8 text-white/50 max-w-2xl mx-auto font-medium"
            >
              Elevate your strategic decision intelligence with our elite collective of AI agents. 
              Precision-engineered for complex problem solving and real-world results.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="btn-primary text-sm font-black uppercase tracking-widest px-12 py-5 flex items-center gap-4 glow-effect"
            >
              <Rocket className="w-5 h-5" />
              Establish Dominion
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#D4AF37", color: "#D4AF37" }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="btn-secondary text-sm font-black uppercase tracking-widest px-12 py-5 flex items-center gap-4"
            >
              <PlayIcon className="w-5 h-5" />
              Royal Showcase
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-24 grid grid-cols-2 gap-12 sm:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/5 backdrop-blur-xl border border-white/5 mb-6 group-hover:border-royal-gold/50 transition-all duration-500 shadow-2xl">
                  <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-500`} />
                </div>
                <div className="text-4xl font-black text-white mb-2 tracking-tighter">
                  {isInView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      delay={1.5 + index * 0.1}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <div className="text-[10px] text-royal-gold/60 font-black uppercase tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive demo preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 80 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 1.7, duration: 1.2, ease: "easeOut" }}
          className="mt-32 relative max-w-6xl mx-auto"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-10 bg-royal-gold/5 rounded-[4rem] blur-[100px]" />
            
            <div className="relative royal-card p-12 sm:p-20 group">
               {/* Border glow on hover */}
               <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-royal-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-royal-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="text-center group/item"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-royal-gold/20 to-royal-black rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover/item:border-royal-gold/40 transition-all duration-500 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-royal-gold opacity-0 group-hover/item:opacity-10 transition-opacity" />
                    <Brain className="w-12 h-12 text-royal-gold" />
                  </div>
                  <h3 className="font-black text-white mb-4 text-xl tracking-tight uppercase">Elite Analysis</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">
                    Premier AI agents orchestrate high-fidelity intelligence architectures for your most complex challenges.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -10 }}
                  className="text-center group/item"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-royal-gold/20 to-royal-black rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover/item:border-royal-gold/40 transition-all duration-500 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-royal-gold opacity-0 group-hover/item:opacity-10 transition-opacity" />
                    <Target className="w-12 h-12 text-royal-gold" />
                  </div>
                  <h3 className="font-black text-white mb-4 text-xl tracking-tight uppercase">Strategic Simulation</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">
                    Navigate the future with sovereign precision using advanced synthetic scenario intelligence.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -10 }}
                  className="text-center group/item"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-royal-gold/20 to-royal-black rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover/item:border-royal-gold/40 transition-all duration-500 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-royal-gold opacity-0 group-hover/item:opacity-10 transition-opacity" />
                    <Users className="w-12 h-12 text-royal-gold" />
                  </div>
                  <h3 className="font-black text-white mb-4 text-xl tracking-tight uppercase">Consensus Mastery</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">
                    Unerring recommendations forged through rigorous dialectical AI collaboration and debate.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}