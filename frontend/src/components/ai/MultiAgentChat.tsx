'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  User,
  Bot,
  Sparkles,
  MessageSquare,
  Search,
  ShieldAlert,
  DollarSign,
  Compass,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Zap,
  Brain,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface AgentResult {
  id: string;
  name: string;
  role: string;
  provider: string;
  icon: string;
  color: string;
  analysis: string;
}

interface DebateResponse {
  problem: string;
  agents: AgentResult[];
  debate: string;
  final_consensus: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'system';
  content: string;
  timestamp: Date;
  debateData?: DebateResponse;
}

type DebatePhase =
  | 'idle'
  | 'researching'
  | 'risk_analyzing'
  | 'financial_analyzing'
  | 'debating'
  | 'consensus'
  | 'complete'
  | 'error';

const PHASE_LABELS: Record<DebatePhase, string> = {
  idle: 'Ready',
  researching: 'Research Agent (Priya) is gathering intelligence…',
  risk_analyzing: 'Risk Agent (Arjun) is stress-testing the plan…',
  financial_analyzing: 'Finance Agent (Kavya) is crunching the numbers…',
  debating: 'Agents are debating and challenging each other…',
  consensus: 'Strategy Agent (Ravi) is building the final roadmap…',
  complete: 'Debate complete',
  error: 'An error occurred',
};

/* ------------------------------------------------------------------ */
/*  Agent icon helper                                                  */
/* ------------------------------------------------------------------ */
function AgentIcon({ type, size = 18 }: { type: string; size?: number }) {
  switch (type) {
    case 'search':
      return <Search size={size} />;
    case 'shield':
      return <ShieldAlert size={size} />;
    case 'dollar':
      return <DollarSign size={size} />;
    case 'compass':
      return <Compass size={size} />;
    default:
      return <Bot size={size} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Collapsible agent card                                             */
/* ------------------------------------------------------------------ */
function AgentCard({ agent }: { agent: AgentResult }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[var(--border-primary)] bg-[var(--glass-bg)] overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--glass-bg)] transition-colors"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
        >
          <AgentIcon type={agent.icon} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-[var(--text-primary)]">{agent.name}</p>
          <p className="text-[10px] text-[var(--text-secondary)]">{agent.role} · {agent.provider}</p>
        </div>
        <div className="text-[var(--text-secondary)]">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-[var(--border-primary)]">
              <div className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto scrollbar-hide">
                {agent.analysis}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Debate result panel                                                */
/* ------------------------------------------------------------------ */
function DebatePanel({ data }: { data: DebateResponse }) {
  const [showDebate, setShowDebate] = useState(false);

  return (
    <div className="space-y-4 mt-2">
      {/* Agent Cards */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Brain size={12} className="text-blue-600" /> Agent Analysis
        </p>
        {data.agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Debate Section */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
        <button
          onClick={() => setShowDebate(!showDebate)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-500/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <Zap size={16} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Agent Debate</p>
            <p className="text-[10px] text-[var(--text-secondary)]">
              Agents challenged each other's assumptions
            </p>
          </div>
          <div className="text-[var(--text-secondary)]">
            {showDebate ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        <AnimatePresence>
          {showDebate && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1 border-t border-amber-500/20">
                <div className="text-sm text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto scrollbar-hide">
                  {data.debate}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Final Consensus */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Final Consensus Decision</p>
            <p className="text-[10px] text-[var(--text-secondary)]">Strategy Agent (Ravi) · Gemini</p>
          </div>
        </div>
        <div className="text-sm text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto scrollbar-hide">
          {data.final_consensus}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress tracker                                                   */
/* ------------------------------------------------------------------ */
function PhaseTracker({ phase }: { phase: DebatePhase }) {
  const steps: { key: DebatePhase; label: string; icon: any }[] = [
    { key: 'researching', label: 'Research', icon: Search },
    { key: 'risk_analyzing', label: 'Risk', icon: ShieldAlert },
    { key: 'financial_analyzing', label: 'Finance', icon: DollarSign },
    { key: 'debating', label: 'Debate', icon: Zap },
    { key: 'consensus', label: 'Consensus', icon: CheckCircle2 },
  ];

  const currentIdx = steps.findIndex((s) => s.key === phase);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 px-4 py-3 bg-[var(--glass-bg)] rounded-xl border border-[var(--border-primary)] mb-4"
    >
      {steps.map((step, idx) => {
        const done = currentIdx > idx || phase === 'complete';
        const active = step.key === phase;
        const StepIcon = step.icon;
        return (
          <div key={step.key} className="flex items-center gap-1">
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all duration-300 ${
                done
                  ? 'bg-emerald-500/15 text-emerald-500'
                  : active
                  ? 'bg-blue-600/15 text-blue-600'
                  : 'bg-[var(--glass-bg)] text-[var(--text-secondary)]'
              }`}
            >
              {active ? (
                <Loader2 size={12} className="animate-spin" />
              ) : done ? (
                <CheckCircle2 size={12} />
              ) : (
                <StepIcon size={12} />
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-4 h-[2px] rounded-full transition-colors duration-300 ${
                  done ? 'bg-emerald-500/40' : 'bg-[var(--border-primary)]'
                }`}
              />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function MultiAgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content:
        'Welcome to the **Multi-Agent Debate System**. Ask any complex question and our 4 specialized AI agents will research, analyze risks, evaluate finances, debate, and produce a final consensus solution.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<DebatePhase>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, phase]);

  const handleSend = async () => {
    if (!input.trim() || phase !== 'idle') return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    const query = input;
    setInput('');

    // Start progress phases
    setPhase('researching');

    // Simulate phase transitions with timing
    const phaseTimer = (phases: DebatePhase[], interval: number) => {
      let i = 0;
      const timer = setInterval(() => {
        i++;
        if (i < phases.length) {
          setPhase(phases[i]);
        } else {
          clearInterval(timer);
        }
      }, interval);
      return timer;
    };

    // We'll start a timer that cycles through visual phases
    const timer = phaseTimer(
      ['researching', 'risk_analyzing', 'financial_analyzing', 'debating', 'consensus'],
      8000
    );

    try {
      const resp = await fetch('http://localhost:8000/api/debate/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: query }),
      });

      clearInterval(timer);

      if (!resp.ok) {
        throw new Error(`Server error: ${resp.status}`);
      }

      const data: DebateResponse = await resp.json();
      setPhase('complete');

      const resultMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: '',
        timestamp: new Date(),
        debateData: data,
      };
      setMessages((prev) => [...prev, resultMsg]);

      setTimeout(() => setPhase('idle'), 1500);
    } catch (err: any) {
      clearInterval(timer);
      setPhase('error');
      const errorMsg: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'system',
        content: `⚠️ Something went wrong: ${err.message}. Please check the backend server is running and try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setTimeout(() => setPhase('idle'), 2000);
    }
  };

  const isProcessing = phase !== 'idle' && phase !== 'complete' && phase !== 'error';

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full transition-colors duration-200 bg-[var(--bg-main)]">
      {/* Header */}
      <div className="px-6 py-3 border-b border-[var(--border-primary)] flex items-center justify-between bg-[var(--bg-sidebar)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-sm">
            <MessageSquare className="text-white w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Multi-Agent Debate</h2>
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-green-500'
                }`}
              />
              <span className="text-[10px] text-[var(--text-secondary)]">
                {isProcessing ? PHASE_LABELS[phase] : '4 Agents · Ready'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[var(--glass-bg)] rounded-lg border border-[var(--border-primary)]">
            <div className="w-2 h-2 rounded-full bg-blue-500" title="Research" />
            <div className="w-2 h-2 rounded-full bg-amber-500" title="Risk" />
            <div className="w-2 h-2 rounded-full bg-emerald-500" title="Finance" />
            <div className="w-2 h-2 rounded-full bg-purple-500" title="Strategy" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  msg.role === 'system'
                    ? 'bg-[var(--bg-sidebar)] text-blue-600 border-[var(--border-primary)]'
                    : 'bg-blue-600 text-white border-blue-700'
                }`}
              >
                {msg.role === 'system' ? <Sparkles size={16} /> : <User size={16} />}
              </div>
              <div className={`flex-1 max-w-[90%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                {msg.debateData ? (
                  <DebatePanel data={msg.debateData} />
                ) : (
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'system'
                        ? 'bg-[var(--glass-bg)] text-[var(--text-primary)] rounded-tl-none border border-[var(--border-primary)] shadow-sm'
                        : 'bg-blue-600 text-white rounded-tr-none shadow-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                )}
                <p className="text-[10px] text-[var(--text-secondary)] px-1 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <PhaseTracker phase={phase} />
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-sidebar)] flex items-center justify-center shrink-0 border border-[var(--border-primary)]">
                  <Loader2 size={16} className="text-blue-600 animate-spin" />
                </div>
                <div className="p-4 bg-[var(--glass-bg)] rounded-2xl rounded-tl-none border border-[var(--border-primary)] text-sm text-[var(--text-secondary)]">
                  <p className="font-medium mb-1">{PHASE_LABELS[phase]}</p>
                  <p className="text-xs opacity-70">This may take 30–60 seconds as agents consult multiple AI providers.</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border-primary)] bg-[var(--bg-sidebar)]">
        <div className="relative max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask a complex question for the agents to debate…"
            rows={2}
            disabled={isProcessing}
            className="w-full bg-[var(--bg-main)] border border-[var(--border-primary)] rounded-xl px-4 py-3 pr-14 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-[var(--text-secondary)] resize-none disabled:opacity-50"
            style={{ color: 'var(--text-primary)' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="absolute right-2 bottom-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        <p className="text-center mt-2 text-[10px] text-[var(--text-secondary)]">
          4 agents · Tavily · OpenRouter · OpenAI · Gemini · Press Enter to submit
        </p>
      </div>
    </div>
  );
}
