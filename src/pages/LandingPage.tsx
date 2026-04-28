import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Globe, Zap, ArrowRight, Camera, MapPin, Trophy, TrendingUp } from 'lucide-react';
import { ModernButton, GlassCard } from '../components/UI';
import { User as FirebaseUser } from 'firebase/auth';

export default function LandingPage({ user, login }: { user: FirebaseUser | null, login: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto bg-zinc-950 scrollbar-hide">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-600/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Zap size={14} />
              <span>Next-Gen Sustainability</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[0.9]">
              Turn Your <span className="text-emerald-500">Waste</span> Into <span className="text-blue-500">Wealth</span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-lg mb-8 leading-relaxed">
              EcoChain uses state-of-the-art Gemini AI to identify waste, find nearby recycling hubs, and reward you for saving the planet.
            </p>

            <div className="flex flex-wrap gap-4">
              {user ? (
                <ModernButton onClick={() => navigate('/dashboard')} className="px-8 py-4 text-lg">
                  <div className="flex items-center gap-2">
                    Enter Dashboard <ArrowRight size={20} />
                  </div>
                </ModernButton>
              ) : (
                <ModernButton onClick={login} className="px-8 py-4 text-lg">
                   Sign up with Google
                </ModernButton>
              )}
              <ModernButton variant="outline" onClick={() => navigate('/leaderboard')} className="px-8 py-4 text-lg">
                View Leaderboard
              </ModernButton>
            </div>

            <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
               <div className="flex items-center gap-2 font-bold text-xl"><Recycle size={24}/> EcoCorp</div>
               <div className="flex items-center gap-2 font-bold text-xl"><Globe size={24}/> GreenNet</div>
               <div className="flex items-center gap-2 font-bold text-xl"><Leaf size={24}/> EarthAI</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
               <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" 
                alt="Green Planet" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent " />
              
              <div className="absolute bottom-8 left-8 right-8">
                 <GlassCard className="p-4 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-zinc-400">Total CO₂ Saved</div>
                        <div className="text-2xl font-bold text-white">42,851 Tons</div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                        <TrendingUp size={24} />
                    </div>
                 </GlassCard>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16 text-center italic-serif">The Eco-System</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Camera, title: 'AI Detection', desc: 'Point your camera at any waste item. Our Gemini-powered AI classifies it instantly.', color: 'emerald', path: '/identify' },
            { icon: MapPin, title: 'Smart Routing', desc: 'Find the nearest verified recycling centers and community bins with ease.', color: 'blue', path: '/map' },
            { icon: Trophy, title: 'Earn Rewards', desc: 'Collect points and badges for every gram of waste recycled. Redeem for real offers.', color: 'amber', path: '/rewards' }
          ].map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              onClick={() => navigate(f.path)}
              className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-${f.color}-500/10 flex items-center justify-center text-${f.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                <f.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">{f.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
