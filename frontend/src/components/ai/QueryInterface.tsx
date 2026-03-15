'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, SparklesIcon, MicrophoneIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Brain, Lightbulb, TrendingUp, Shield, Users, Target } from 'lucide-react';
import toast from 'react-hot-toast';

interface QueryInterfaceProps {
  onSubmit: (query: string) => void;
}

const exampleQueries = [
  {
    text: "Synthesize a sovereign market entry strategy for organic ventures in Tamil Nadu with ₹5 lakh capital.",
    category: "Business",
    icon: TrendingUp,
    color: "from-royal-gold to-royal-gold-dark"
  },
  {
    text: "Architect a professional evolution path from classical engineering to high-fidelity data science.",
    category: "Career",
    icon: Brain,
    color: "from-white/20 to-white/5"
  },
  {
    text: "Optimize a high-yield investment portfolio for a 20-year horizon with strategic risk insulation.",
    category: "Finance",
    icon: Target,
    color: "from-royal-gold/40 to-royal-gold/10"
  },
  {
    text: "Engineer a disruptive go-to-market protocol for healthcare SaaS within a resilient framework.",
    category: "Strategy",
    icon: Lightbulb,
    color: "from-white/10 to-white/20"
  },
];

const suggestions = [
  "Strategic market synthesis and adversary analysis",
  "High-fidelity financial projections and ROI modeling", 
  "Resilient risk assessment and insulation protocols",
  "Implementation architecture and phase timelines",
  "Elite resource allocation and human capital structure",
  "Sovereign compliance and architectural governance"
];

export default function QueryInterface({ onSubmit }: QueryInterfaceProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('The mandate requires expression');
      return;
    }
    
    if (query.length < 20) {
      toast.error('Provide deeper context for sovereign analysis');
      return;
    }
    
    setIsLoading(true);
    
    const fullQuery = selectedSuggestions.length > 0 
      ? `${query}\n\nStrategic Mandates: ${selectedSuggestions.join(', ')}`
      : query;
    
    toast.success('Summoning the Sovereign Collective...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSubmit(fullQuery);
    setIsLoading(false);
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    setShowSuggestions(true);
  };

  const toggleSuggestion = (suggestion: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(suggestion)
        ? prev.filter(s => s !== suggestion)
        : [...prev, suggestion]
    );
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    toast.success(isRecording ? 'Vocal capture ceased' : 'Vocal capture initiated');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        {/* Main input card */}
        <div className="royal-card p-10 sm:p-14 relative overflow-hidden group">
          {/* Background glow effect */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-royal-gold/10 blur-[100px] rounded-full group-hover:bg-royal-gold/20 transition-all duration-700" />
          
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="flex items-center space-x-6 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-gold to-royal-gold-dark flex items-center justify-center shadow-3xl border border-white/20">
                <SparklesIcon className="w-7 h-7 text-royal-black" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Issue Your Mandate</h3>
                <p className="text-royal-gold/60 text-[10px] font-black uppercase tracking-[0.3em]">Describe your strategic challenge</p>
              </div>
            </div>

            <div className="relative">
              <textarea
                ref={textareaRef}
                rows={4}
                className="w-full bg-white/5 border border-white/5 rounded-3xl px-8 py-6 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-royal-gold/50 focus:border-royal-gold/50 resize-none transition-all duration-500 text-lg font-medium leading-relaxed"
                placeholder="e.g., Engineer a multi-layered strategic expansion for renewable infrastructure..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                maxLength={1000}
              />
              
              {/* Voice input button */}
              <motion.button
                type="button"
                onClick={handleVoiceInput}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute top-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border border-white/5 ${
                  isRecording 
                    ? 'bg-red-500/20 text-red-500 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse' 
                    : 'bg-white/5 text-white/40 hover:text-royal-gold hover:border-royal-gold/30'
                }`}
              >
                <MicrophoneIcon className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Character count and suggestions toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/30">
                  {query.length} / 1000
                </div>
                {query.length > 20 && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className="text-[10px] font-black uppercase tracking-widest text-royal-gold hover:text-white transition-colors flex items-center gap-2 px-4 py-2 bg-royal-gold/5 rounded-full border border-royal-gold/20"
                  >
                    <DocumentTextIcon className="w-4 h-4" />
                    {showSuggestions ? 'Condense' : 'Expand'} Parameters
                  </motion.button>
                )}
              </div>
              
              <motion.button
                type="submit"
                disabled={!query.trim() || isLoading}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed px-12 py-5 text-xs font-black uppercase tracking-[0.2em]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-royal-black"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    <span>Engage Sovereign Agents</span>
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Analysis suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 pt-12 border-t border-white/5"
              >
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-8">Refine Synthetic Domains</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => toggleSuggestion(suggestion)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-500 flex items-center justify-between group/suggest ${
                        selectedSuggestions.includes(suggestion)
                          ? 'bg-royal-gold/10 border-royal-gold/50 text-white'
                          : 'bg-white/5 border-white/5 text-white/30 hover:border-white/20 hover:text-white/60'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-tight">{suggestion}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        selectedSuggestions.includes(suggestion)
                          ? 'bg-royal-gold border-royal-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                          : 'border-white/20 group-hover/suggest:border-white/40'
                      }`}>
                        {selectedSuggestions.includes(suggestion) && (
                          <div className="w-2 h-2 bg-royal-black rounded-full" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Example queries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20"
        >
          <div className="flex items-center justify-center space-x-4 mb-10">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-royal-gold/20" />
            <h3 className="text-white/40 font-black text-[10px] uppercase tracking-[0.5em]">Scenario Archives</h3>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-royal-gold/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exampleQueries.map((example, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleExampleClick(example.text)}
                className="text-left p-8 royal-card hover:bg-white/5 transition-all duration-500 group border-transparent hover:border-royal-gold/20"
                disabled={isLoading}
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-14 h-14 rounded-[1.5rem] bg-gradient-to-br ${example.color} flex items-center justify-center flex-shrink-0 group-hover:shadow-3xl transition-all duration-500 border border-white/5`}>
                    <example.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-[9px] font-black text-royal-gold bg-royal-gold/10 px-3 py-1.5 rounded-full border border-royal-gold/20 uppercase tracking-widest">
                        {example.category}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed font-medium group-hover:text-white/80 transition-colors duration-500 italic">
                      "{example.text}"
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center z-20 border border-royal-gold/10"
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-8 relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-[2px] border-royal-gold/10 border-t-royal-gold"
                  />
                  <div className="absolute inset-4 rounded-full bg-royal-gold/5 animate-pulse" />
                </div>
                <p className="text-royal-gold font-black text-xs uppercase tracking-[0.5em] animate-pulse">Summoning Sovereign Intelligence</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}