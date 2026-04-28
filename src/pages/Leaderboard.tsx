import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, User, Medal, Crown, Globe, School, Building2, Map as MapIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { GlassCard } from '../components/UI';

const topUsers = [
  { rank: 1, name: 'Alice Green', points: 12450, impact: '520kg CO2', avatar: 'https://i.pravatar.cc/150?u=a' },
  { rank: 2, name: 'David Eco', points: 11200, impact: '480kg CO2', avatar: 'https://i.pravatar.cc/150?u=b' },
  { rank: 3, name: 'Eco Warrior', points: 9800, impact: '410kg CO2', avatar: 'https://i.pravatar.cc/150?u=c' },
];

const listings = [
  { rank: 4, name: 'Sarah Recycle', points: 8500, change: 'up' },
  { rank: 5, name: 'Planet Guardian', points: 7900, change: 'down' },
  { rank: 6, name: 'Jared ZeroWaste', points: 7400, change: 'up' },
  { rank: 7, name: 'Eco Apartment A', points: 6800, change: 'up' },
  { rank: 8, name: 'Green Campus', points: 6500, change: 'down' },
  { rank: 9, name: 'Village Block 2', points: 6200, change: 'up' },
  { rank: 10, name: 'City High', points: 5900, change: 'up' },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('Global');

  return (
    <div className="p-8 lg:p-12 h-screen overflow-y-auto scrollbar-hide">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none mb-2 italic-serif">Global <span className="text-emerald-500">Champions</span></h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ranking by total waste recycled & impact generated.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
           {['Global', 'City', 'College', 'Village'].map(tab => (
             <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-100'}`}
              >
                {tab}
             </button>
           ))}
        </div>
      </header>

      {/* Podium */}
      <div className="grid md:grid-cols-3 gap-8 items-end mb-16 pt-10">
        {/* Second Place */}
        <div className="order-2 md:order-1">
          <GlassCard className="relative pt-16 pb-8 border-slate-800 bg-slate-900 text-center rounded-[3rem]">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-3xl border-4 border-slate-800 overflow-hidden shadow-2xl">
                <img src={topUsers[1].avatar} alt="" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-700">🥈 SILVER</div>
            <h3 className="text-xl font-black text-white mb-1 italic-serif">{topUsers[1].name}</h3>
            <div className="text-emerald-500 font-black mb-4 uppercase tracking-widest text-sm">{topUsers[1].points} PTS</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{topUsers[1].impact} Reduced</div>
          </GlassCard>
        </div>

        {/* First Place */}
        <div className="order-1 md:order-2">
          <GlassCard className="relative pt-20 pb-10 border-emerald-500/30 bg-emerald-500/5 text-center scale-110 shadow-2xl shadow-emerald-500/10 rounded-[3rem]">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-[2rem] border-4 border-emerald-500 overflow-hidden shadow-2xl">
                <img src={topUsers[0].avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg shadow-amber-500/20 uppercase tracking-widest border-2 border-amber-400">
               <Crown size={12} className="inline mr-1" /> Champion
            </div>
            <h3 className="text-3xl font-black text-white mb-1 italic-serif leading-none">{topUsers[0].name}</h3>
            <div className="text-emerald-400 font-black text-2xl mb-4 italic-serif leading-none">{topUsers[0].points} <span className="text-xs uppercase tracking-widest opacity-60">PTS</span></div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
               <Globe size={12} /> Global Impact Leader
            </div>
          </GlassCard>
        </div>

        {/* Third Place */}
        <div className="order-3">
          <GlassCard className="relative pt-16 pb-8 border-slate-800 bg-slate-900 text-center rounded-[3rem]">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-3xl border-4 border-slate-800 overflow-hidden shadow-2xl">
                <img src={topUsers[2].avatar} alt="" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-700">🥉 BRONZE</div>
            <h3 className="text-xl font-black text-white mb-1 italic-serif">{topUsers[2].name}</h3>
            <div className="text-emerald-500 font-black mb-4 uppercase tracking-widest text-sm">{topUsers[2].points} PTS</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{topUsers[2].impact} Reduced</div>
          </GlassCard>
        </div>
      </div>

      {/* Table */}
      <GlassCard className="bg-slate-900 border-slate-800 overflow-hidden rounded-[2.5rem]">
        <div className="grid grid-cols-[80px,1fr,150px,80px] px-8 py-6 border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
           <div>Rank</div>
           <div>Contributor</div>
           <div>Impact Score</div>
           <div className="text-right">Trend</div>
        </div>
        <div className="divide-y divide-slate-800/50">
           {listings.map((l) => (
             <div key={l.rank} className="grid grid-cols-[80px,1fr,150px,80px] px-8 py-6 items-center hover:bg-white/[0.02] transition-all cursor-pointer group">
                <div className="font-mono text-slate-500 group-hover:text-emerald-400 transition-colors font-bold tracking-tighter">#{String(l.rank).padStart(2, '0')}</div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all shadow-xl">
                        {l.rank === 7 ? <Building2 size={18}/> : l.rank === 8 ? <School size={18}/> : l.rank === 9 ? <MapIcon size={18}/> : <User size={18} />}
                    </div>
                    <span className="font-black text-white tracking-tight uppercase text-sm">{l.name}</span>
                </div>
                <div className="text-emerald-400 font-black font-mono text-lg">{l.points.toLocaleString()} <span className="text-[9px] opacity-40">PTS</span></div>
                <div className="flex justify-end">
                   {l.change === 'up' 
                     ? <ArrowUp size={18} className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" /> 
                     : <ArrowDown size={18} className="text-slate-700" />
                   }
                </div>
             </div>
           ))}
        </div>
      </GlassCard>
    </div>
  );
}
