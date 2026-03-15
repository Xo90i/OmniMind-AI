'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/outline';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'completed' | 'active' | 'pending';
  progress: number;
  model?: string;
  tokens?: number;
  latency_ms?: number;
  provider?: string;
}

interface AgentCardProps {
  agent: Agent;
}

// Named persona colours and emojis matching master spec
const PERSONA_META: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  Priya:              { color: 'text-royal-gold', bg: 'bg-white/5',  border: 'border-royal-gold/20', icon: '🔬' },
  Arjun:              { color: 'text-royal-silver',  bg: 'bg-white/5',   border: 'border-white/10',  icon: '⚠️' },
  Kavya:              { color: 'text-royal-gold',  bg: 'bg-royal-gold/5',   border: 'border-royal-gold/30',  icon: '💰' },
  Ravi:               { color: 'text-royal-silver',   bg: 'bg-white/5',    border: 'border-white/10',   icon: '🗺️' },
  Meera:              { color: 'text-royal-gold',   bg: 'bg-white/5',    border: 'border-royal-gold/20',   icon: '🏛️' },
  Planner:            { color: 'text-white/60',   bg: 'bg-white/5',    border: 'border-white/5',   icon: '🧠' },
  'Debate Moderator': { color: 'text-royal-gold', bg: 'bg-royal-gold/5',  border: 'border-royal-gold/40', icon: '⚖️' },
  'Simulation Engine':{ color: 'text-royal-silver',   bg: 'bg-white/5',    border: 'border-white/20',   icon: '📊' },
  'Consensus Engine': { color: 'text-royal-gold',   bg: 'bg-royal-gold/10',    border: 'border-royal-gold/50',   icon: '✅' },
};

const statusIcons = {
  completed: CheckCircleIcon,
  active:    PlayIcon,
  pending:   ClockIcon,
};

export default function AgentCard({ agent }: AgentCardProps) {
  const meta = PERSONA_META[agent.name] ?? PERSONA_META['Planner'];
  const StatusIcon = statusIcons[agent.status];
  const isActive = agent.status === 'active';

  return (
    <div
      className={`royal-card p-6 transition-all duration-500 border-white/5 group relative overflow-hidden
        ${isActive ? 'border-royal-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'hover:border-white/20'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-[1.25rem] bg-royal-black flex items-center justify-center text-2xl shadow-inner border border-white/5 transition-transform duration-500 group-hover:scale-110`}>
              {meta.icon}
            </div>
            <div>
              <h3 className="font-black text-white uppercase tracking-tight italic group-hover:text-royal-gold transition-colors">{agent.name}</h3>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{agent.role}</p>
            </div>
          </div>
          <div className={`flex flex-col items-end gap-1`}>
            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-royal-gold' : 'text-white/20'}`}>
              <StatusIcon className="h-4 w-4" />
              <span>{agent.status}</span>
            </div>
            {isActive && (
              <div className="w-1.5 h-1.5 rounded-full bg-royal-gold animate-ping shadow-[0_0_10px_rgba(212,175,55,1)]" />
            )}
          </div>
        </div>

        {isActive && (
          <div className="space-y-3 mb-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-royal-gold animate-pulse">Synthesizing...</span>
              <span className="text-white/40">{agent.progress}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-[3px] overflow-hidden border border-white/5">
              <motion.div
                className="bg-gradient-to-r from-transparent via-royal-gold to-transparent h-full"
                initial={{ x: '-100%' }}
                animate={{ x: `${agent.progress - 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {agent.status === 'completed' && (
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-royal-gold/30" />
            <p className="text-[10px] font-black text-royal-gold uppercase tracking-[0.2em]">Mandate Content Transmitted</p>
          </div>
        )}
        {agent.status === 'pending' && (
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-white/10" />
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Awaiting Authorization</p>
          </div>
        )}

        {agent.provider && agent.provider !== 'fallback' && (
          <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Architecture</span>
              <span className="text-[10px] font-black text-royal-silver uppercase tracking-tight">{agent.provider}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Cognitive Model</span>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-tight">{agent.model}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Latency</span>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-tight">{agent.latency_ms}ms</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
