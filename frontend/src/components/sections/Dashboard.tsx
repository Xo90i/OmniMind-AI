'use client';

import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Cpu, 
  LayoutDashboard, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import ConsensusPanel from '../ai/ConsensusPanel';
import SimulationResults from '../ai/SimulationResults';

interface DashboardProps {
  user: { name: string; email: string };
}

export default function Dashboard({ user }: DashboardProps) {
  const stats = [
    { name: 'Sovereign Nodes', value: '1,248', icon: Cpu, trend: '+12% this month' },
    { name: 'Mission Success', value: '98.4%', icon: Target, trend: 'Sustained peak' },
    { name: 'Dominion Growth', value: '14.2B', icon: TrendingUp, trend: 'Exponential' },
    { name: 'Protocol Uptime', value: '99.99%', icon: ShieldCheck, trend: 'Unbreakable' },
  ];

  const recentHistory = [
    { id: '1', title: 'Urban Development Strategy', date: '2 hours ago', status: 'Completed', agents: 5 },
    { id: '2', title: 'Global Supply Optimization', date: '5 hours ago', status: 'In Review', agents: 8 },
    { id: '3', title: 'Fusion Reactor Efficiency', date: '1 day ago', status: 'Completed', agents: 12 },
  ];

  return (
    <div className="pt-32 pb-20 px-8 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-royal-gold flex items-center justify-center font-black text-royal-black text-xl shadow-3xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-royal-gold/60 text-[10px] font-black uppercase tracking-[0.4em] mb-1">
                Dominion Command Center
              </p>
              <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                Welcome back, <span className="text-royal-gold">{user.name}</span>
              </h1>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary px-8 text-xs font-black uppercase tracking-widest"
          >
            Manage Protocol
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 text-xs font-black uppercase tracking-widest flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Launch Mission
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="royal-card p-8 group hover:border-royal-gold/30 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-royal-gold/10 group-hover:border-royal-gold/20 transition-all duration-500">
                <stat.icon className="w-6 h-6 text-royal-gold" />
              </div>
              <span className="text-[10px] font-black text-green-500/80 bg-green-500/5 px-2 py-1 rounded-md uppercase tracking-widest">
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">{stat.name}</p>
            <h3 className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          <div className="royal-card p-10">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black text-white italic uppercase tracking-tight">Active Analytics</h2>
              <button className="text-[10px] font-black text-royal-gold uppercase tracking-[0.2em] hover:text-white transition-colors">
                View Full Logs
              </button>
            </div>
            <SimulationResults />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          <div className="royal-card p-10">
            <h2 className="text-xl font-black text-white italic uppercase tracking-tight mb-8">Mission History</h2>
            <div className="space-y-6">
              {recentHistory.map((item, index) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-black text-white group-hover:text-royal-gold transition-colors">{item.title}</h3>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-royal-gold transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-widest">
                    <span>{item.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-royal-gold/60">{item.agents} Experts</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 border border-white/5 rounded-xl text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
              Archieve Command
            </button>
          </div>

          <ConsensusPanel />
        </div>
      </div>
    </div>
  );
}
