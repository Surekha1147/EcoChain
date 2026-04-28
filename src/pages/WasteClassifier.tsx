import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, RefreshCcw, CheckCircle2, ShieldCheck, AlertTriangle, ArrowRight, Zap, Info } from 'lucide-react';
import { GlassCard, ModernButton } from '../components/UI';
import { analyzeWaste, WasteAnalysis } from '../services/gemini';

export default function WasteClassifier() {
  const [file, setFile] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<WasteAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setFile(reader.result as string);
        setResult(null);
      };
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    setAnalyzing(true);
    try {
      const base64 = file.split(',')[1];
      const data = await analyzeWaste(base64);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="p-8 lg:p-12 h-screen overflow-y-auto scrollbar-hide">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight leading-none mb-2 italic-serif">AI Waste Detection</h1>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Gemini AI Vision • Realtime Classification</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Upload Container - Bento style */}
        <section className="lg:col-span-5 space-y-6">
          {!file ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-[3rem] border-2 border-dashed border-slate-800 bg-slate-900/50 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
            >
              <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all mb-6">
                <Camera size={40} />
              </div>
              <span className="text-lg font-black text-white mb-2 uppercase tracking-tight">Capture Waste</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">JPG, PNG (Max 5MB)</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="aspect-square rounded-[3rem] overflow-hidden border border-slate-800 relative shadow-2xl">
                <img src={file} className="w-full h-full object-cover" alt="Waste" />
                <button 
                  onClick={reset}
                  className="absolute top-6 right-6 p-3 bg-slate-950/80 backdrop-blur-lg rounded-2xl text-white hover:bg-red-500 transition-all"
                >
                  <RefreshCcw size={20} />
                </button>
                {analyzing && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mb-4"
                    >
                      <Recycle size={56} className="text-emerald-500" />
                    </motion.div>
                    <span className="text-white font-black tracking-[0.2em] uppercase text-xs">AI Inference Active</span>
                  </div>
                )}
              </div>
              
              {!result && !analyzing && (
                <ModernButton onClick={startAnalysis} className="w-full py-6 text-xl uppercase tracking-widest">
                  Analyze & Rank
                </ModernButton>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
             <GlassCard className="p-4 bg-slate-900 border-slate-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <ShieldCheck size={18} />
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Verified AI Analysis</div>
             </GlassCard>
             <GlassCard className="p-4 bg-slate-900 border-slate-800 flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <Zap size={18} />
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Instant +50 Points</div>
             </GlassCard>
          </div>
        </section>

        {/* Results Container */}
        <section className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                   <div className="bento-highlight flex flex-col justify-between">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-950/60 mb-1">Classification</div>
                      <h2 className="text-5xl font-black text-slate-950 italic-serif leading-none">{result.category}</h2>
                   </div>
                   <GlassCard className="bg-slate-900 border-slate-800 flex flex-col justify-between">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Rewards Earned</div>
                      <div className="text-4xl font-black text-emerald-500">+{result.points} <span className="text-xs uppercase tracking-widest">PTS</span></div>
                   </GlassCard>
                </div>

                <GlassCard className="p-8 border-slate-800 bg-slate-900">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Confidence</div>
                      <div className="text-2xl font-black text-white italic-serif">{(result.confidence * 100).toFixed(0)}% Match</div>
                    </div>
                    <div className="flex -space-x-2">
                       {[...Array(4)].map((_, i) => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                            <img src={`https://i.pravatar.cc/150?u=${i}`} alt="" />
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-black text-white mb-4 tracking-[0.2em] uppercase">
                         <Info size={14} className="text-blue-400" />
                         Analysis Insight
                      </h4>
                      <p className="text-slate-400 leading-relaxed italic-serif text-lg">{result.explanation}</p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-black text-white mb-4 tracking-[0.2em] uppercase">
                         <Zap size={14} className="text-amber-400" />
                         Disposal Instructions
                      </h4>
                      <div className="space-y-3">
                        {result.disposalTips.map((tip, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50 group hover:border-emerald-500/30 transition-all">
                            <span className="text-emerald-500 font-black italic-serif text-lg leading-none">{i+1}</span>
                            <span className="text-sm font-bold text-slate-300 leading-snug group-hover:text-white transition-colors">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <div className="flex gap-4">
                  <ModernButton 
                    onClick={() => {
                      setResult(null);
                      setFile(null);
                    }}
                    className="flex-1 py-5 uppercase tracking-[0.2em]"
                  >
                    Log Disposal
                  </ModernButton>
                  <ModernButton variant="outline" className="flex-1 py-5 uppercase tracking-[0.2em]">
                    Find Pickup Hub
                  </ModernButton>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center">
                 <div className="text-center space-y-8 max-w-sm">
                    <div className="w-24 h-24 bg-slate-900 rounded-[2rem] border border-slate-800 flex items-center justify-center text-slate-700 mx-auto">
                        <Camera size={40} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-500 uppercase tracking-tight">Scanner Idle</h3>
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-widest leading-relaxed">Awaiting input... Capture a photo to initialize Gemini AI waste classification.</p>
                    </div>
                 </div>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}

const Recycle = ({ className, size }: { className?: string, size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <path d="M12 18v2a2 2 0 1 1-4 0v-2" />
        <path d="m15 11 3 3 3-3" />
        <path d="M18 14V8a1 1 0 0 0-1-1h-2" />
        <path d="M12 2v2" />
        <path d="m5 11-3 3 3-3" />
        <path d="M2 14v-6a1 1 0 0 1 1-1h2" />
        <path d="M16 11l-4 4-4-4" />
    </svg>
);
