import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Zap, Star, Tag, ChevronRight, Lock, ExternalLink, Ticket, ShoppingBag, Coffee, Pizza, Leaf, CheckCircle2 } from 'lucide-react';
import { GlassCard, ModernButton } from '../components/UI';

const rewardsData = [
  { id: 1, title: 'Sustainable Coffee', provider: 'Starbucks', points: 500, type: 'Coupon', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=300', category: 'Food' },
  { id: 2, title: 'Bamboo Utensil Set', provider: 'EcoShop', points: 1200, type: 'Product', image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=300', category: 'Home' },
  { id: 3, title: 'Ride Credits', provider: 'Uber Green', points: 800, type: 'Voucher', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=300', category: 'Travel' },
  { id: 4, title: 'Pizza Tree Bonus', provider: 'Local Pizzas', points: 600, type: 'Discount', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300', category: 'Food' },
  { id: 5, title: 'Solar Power Bank', provider: 'TechEco', points: 2500, type: 'Rare', image: 'https://images.unsplash.com/photo-1585333127302-d2921730743b?auto=format&fit=crop&q=80&w=300', category: 'Tech' },
  { id: 6, title: 'Free Plastic Pick-up', provider: 'City Waste', points: 100, type: 'Service', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300', category: 'Service' },
];

export default function Rewards() {
  const [claimedIds, setClaimedIds] = useState<number[]>([]);

  const handleClaim = (id: number) => {
    setClaimedIds(prev => [...prev, id]);
  };

  return (
    <div className="p-8 lg:p-12 h-screen overflow-y-auto scrollbar-hide">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none mb-2 italic-serif">Eco <span className="text-emerald-500">Store</span></h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Redeem points for carbon-neutral products & experiences.</p>
        </div>
        <div className="flex gap-4">
           <GlassCard className="py-2.5 px-6 bg-slate-900 border-slate-800 flex items-center gap-3 rounded-2xl">
              <Zap size={16} className="text-amber-500" />
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Available Balance</span>
                 <span className="text-lg font-black text-white leading-none tracking-tighter">1,240 <span className="text-[10px] opacity-40 uppercase">PTS</span></span>
              </div>
           </GlassCard>
        </div>
      </header>

      {/* Featured Reward - Large Bento Card */}
      <div className="mb-12">
        <div className="bento-highlight p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex px-3 py-1 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg">Featured Experience</div>
            <h2 className="text-5xl font-black text-slate-950 italic-serif leading-none">Vertical Forest Tour & Lunch</h2>
            <p className="text-slate-900/60 font-bold leading-relaxed max-w-md">Experience the future of urban living with a private tour of the Vertical Forest, followed by a zero-waste organic lunch.</p>
            <div className="flex items-center gap-6">
               <div className="text-3xl font-black text-slate-950 italic-serif">2,500 <span className="text-xs uppercase tracking-widest opacity-60">PTS</span></div>
               <ModernButton className="bg-slate-950 text-white hover:bg-slate-800 px-8">Redeem Now</ModernButton>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-slate-950/20 rounded-[3rem] border-2 border-slate-950/10 flex items-center justify-center text-6xl">
             🌲
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {rewardsData.map((reward) => (
          <div key={reward.id}>
            <GlassCard className="flex flex-col h-full bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-all group rounded-[2.5rem] p-6">
              <div className="aspect-video bg-slate-950 rounded-[2rem] mb-6 relative overflow-hidden flex items-center justify-center text-4xl grayscale group-hover:grayscale-0 transition-all duration-500 border border-slate-800">
                 <img src={reward.image} alt={reward.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                 <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-700">{reward.category}</div>
                 {reward.type === 'Rare' && <div className="absolute top-4 right-4 text-amber-500 animate-pulse"><Star fill="currentColor" size={20} /></div>}
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">{reward.provider}</div>
                <h3 className="text-xl font-black text-white italic-serif leading-none">{reward.title}</h3>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="text-lg font-black text-emerald-500 font-mono tracking-tighter">{reward.points.toLocaleString()} <span className="text-[9px] uppercase tracking-widest text-slate-600">PTS</span></div>
                <button 
                  disabled={reward.points > 1240 || claimedIds.includes(reward.id)}
                  onClick={() => handleClaim(reward.id)}
                  className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    claimedIds.includes(reward.id) ? 'bg-emerald-500 text-slate-950' :
                    reward.points > 1240 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-emerald-500 hover:text-slate-950'
                  }`}
                >
                  {claimedIds.includes(reward.id) ? (
                    <div className="flex items-center gap-1"><CheckCircle2 size={12} /> Claimed</div>
                  ) : reward.points > 1240 ? 'Locked' : 'Claim'}
                </button>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}
