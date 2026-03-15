'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

import AgentCard from './AgentCard';
import WorkflowProgress from './WorkflowProgress';
import SimulationResults from './SimulationResults';
import ConsensusPanel from './ConsensusPanel';
import { apiClient, QueryResponse, SessionEvent } from '@/lib/api';

interface AgentWorkflowProps {
  query: string;
  onBack: () => void;
}

export default function AgentWorkflow({ query, onBack }: AgentWorkflowProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<QueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<SessionEvent[]>([]);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let pollTimer: ReturnType<typeof setInterval> | null = null;

    const startSession = async () => {
      try {
        setIsLoading(true);
        const created = await apiClient.createQuery({ query, context: {} });
        setSessionId(created.id);
        setSnapshot(created);

        socket = apiClient.streamQuery(
          created.id,
          (event) => {
            setEvents((prev) => [event, ...prev].slice(0, 30));
            if (event.snapshot) {
              setSnapshot(event.snapshot);
              if (event.snapshot.status === 'completed') {
                toast.success('Decision consensus is ready.');
              }
              if (event.snapshot.status === 'failed') {
                toast.error('Decision workflow failed.');
              }
            }
          },
          () => {
            toast.error('Realtime connection interrupted; using polling fallback.');
          }
        );

        pollTimer = setInterval(async () => {
          try {
            const latest = await apiClient.getQuery(created.id);
            setSnapshot(latest);
            if (latest.status === 'completed' || latest.status === 'failed') {
              if (pollTimer) {
                clearInterval(pollTimer);
              }
            }
          } catch {
            if (pollTimer) {
              clearInterval(pollTimer);
            }
          }
        }, 3000);
      } catch {
        toast.error('Failed to start AI workflow.');
      } finally {
        setIsLoading(false);
      }
    };

    startSession();

    return () => {
      if (pollTimer) {
        clearInterval(pollTimer);
      }
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [query]);

  const handleExport = async () => {
    if (!sessionId) {
      return;
    }

    try {
      const blob = await apiClient.exportQuery(sessionId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `decision-${sessionId}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Decision exported as JSON.');
    } catch {
      toast.error('Export failed.');
    }
  };

  const currentStep =
    snapshot?.workflow_steps.find((step) => step.status === 'active')?.id ??
    snapshot?.workflow_steps.length ??
    1;

  const agents =
    snapshot?.agents.map((agent) => ({
      id: agent.agent_type,
      name: agent.name,
      role: agent.role,
      status: agent.status === 'failed' ? 'pending' : agent.status,
      progress: agent.progress,
    })) ?? [];

  const workflowSteps =
    snapshot?.workflow_steps.map((step) => ({
      id: step.id,
      name: step.name,
      status: step.status === 'failed' ? 'pending' : step.status,
    })) ?? [];

  if (isLoading && !snapshot) {
    return (
      <div className="min-h-screen bg-royal-black py-12 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 royal-mesh opacity-20" />
        <div className="royal-card max-w-xl w-full text-center p-20 relative z-10 border-royal-gold/10">
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-[2px] border-royal-gold/10 border-t-royal-gold"
            />
            <div className="absolute inset-4 rounded-full bg-royal-gold/5 animate-pulse" />
          </div>
          <p className="text-royal-gold font-black text-xs uppercase tracking-[0.5em] animate-pulse">Initializing Sovereign Protocol</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-royal-black py-12 relative overflow-hidden">
      <div className="absolute inset-0 royal-mesh opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-white/40 hover:text-royal-gold transition-colors mb-8 group"
          >
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-royal-gold/50 transition-all">
              <ArrowLeftIcon className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Withdraw Mandate</span>
          </button>

          <div className="royal-card p-10 border-royal-gold/20">
            <div className="flex flex-wrap justify-between items-start gap-8 mb-10">
              <div className="flex-1 min-w-[300px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-2 rounded-full bg-royal-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]" />
                  <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">Sovereign Analysis in Flux</h1>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 group hover:border-royal-gold/20 transition-all duration-500">
                  <p className="text-royal-gold/60 text-[10px] font-black uppercase tracking-[0.2em] mb-2">The Mandate</p>
                  <p className="text-white/80 font-medium leading-relaxed">
                    "{query}"
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                   <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Session Authority:</span>
                   <code className="text-[10px] font-black text-royal-silver bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    {sessionId}
                   </code>
                </div>
              </div>
              <button
                onClick={handleExport}
                disabled={!sessionId}
                className="btn-primary flex items-center gap-3 h-fit px-8 py-4 text-[10px] font-black uppercase tracking-widest"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                Export Archive
              </button>
            </div>
            <div className="pt-6 border-t border-white/5">
              <WorkflowProgress steps={workflowSteps} currentStep={currentStep} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="royal-card p-10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black text-white uppercase tracking-tight italic">Active AI Constructs</h2>
                <div className="px-4 py-2 bg-royal-gold/5 rounded-full border border-royal-gold/20">
                   <span className="text-[10px] font-black text-royal-gold uppercase tracking-widest leading-none">
                    {agents.filter(a => a.status === 'active').length} Active
                   </span>
                </div>
              </div>
              <div className="space-y-4">
                <AnimatePresence>
                  {agents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <AgentCard agent={agent} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="royal-card p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-white uppercase tracking-tight italic">Construct Dialectics</h2>
                <div className="w-10 h-1 rounded-full bg-gradient-to-r from-royal-gold to-transparent" />
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {(snapshot?.messages ?? []).map((message, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`${message.timestamp}-${index}`} 
                    className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-royal-gold/20 transition-all duration-500"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-black text-royal-gold uppercase tracking-[0.2em]">
                        {message.agent_name}
                      </p>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full">
                        {message.stage}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 font-medium leading-relaxed italic">"{message.content}"</p>
                  </motion.div>
                ))}
                {snapshot?.messages.length === 0 && (
                  <p className="text-xs font-black text-white/20 uppercase tracking-[0.3em] text-center py-20">Dialectal synthesis awaiting initiation...</p>
                )}
              </div>
            </div>

            <div className="mt-10">
              <SimulationResults simulation={snapshot?.simulation} />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-10">
            <ConsensusPanel consensus={snapshot?.consensus} />
            
            <div className="royal-card p-10">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-8 italic">Temporal Updates</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {events.map((event, index) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={`${event.type}-${index}`} 
                    className="text-[10px] bg-white/5 rounded-xl px-5 py-4 border border-white/5"
                  >
                    <p className="font-black text-royal-gold uppercase tracking-widest mb-1">{event.type}</p>
                    <p className="text-white/40 font-medium uppercase tracking-tight">{event.message}</p>
                  </motion.div>
                ))}
                {events.length === 0 && <p className="text-xs font-black text-white/20 uppercase tracking-widest text-center py-10">Waiting for stream...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
