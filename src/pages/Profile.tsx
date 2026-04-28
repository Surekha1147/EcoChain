import { motion } from 'framer-motion';
import { 
  Settings, 
  Leaf, 
  Award, 
  MapPin, 
  ShieldCheck, 
  Recycle, 
  Zap, 
  LogOut, 
  ChevronRight, 
  Share2,
  Calendar,
  History
} from 'lucide-react';
import { GlassCard, ModernButton } from '../components/UI';
import { User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const badges = [
  { icon: Leaf, label: 'Eco Novice', color: 'emerald' },
  { icon: Recycle, label: 'Recycler', color: 'blue' },
  { icon: Zap, label: 'Fast Tracer', color: 'amber' },
  { icon: ShieldCheck, label: 'Verifier', color: 'purple' },
];

export default function Profile({ user }: { user: FirebaseUser | null }) {
  if (!user) return null;

  return (
    <div className="p-8 lg:p-12 h-screen overflow-y-auto scrollbar-hide">
      <header className="mb-12 flex flex-col md:flex-row items-center gap-10 border-b border-slate-800 pb-12">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 group-hover:border-emerald-500 transition-all shadow-2xl">
             <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt={user.displayName || ''} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-950 border-4 border-slate-950 shadow-xl">
             <Award size={24} />
          </div>
        </div>

        <div className="text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
            <h1 className="text-4xl font-black text-white tracking-tight italic-serif">{user.displayName}</h1>
            <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] shadow-xl">Elite Impact Member</div>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center md:justify-start gap-2 mb-8">
            <MapPin size={12} className="text-emerald-500" /> Bengaluru, India • Since April 2024
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
             <ModernButton className="flex items-center gap-2 uppercase tracking-widest text-[10px] py-4">
                <Share2 size={16} /> Share Profile
             </ModernButton>
             <ModernButton variant="outline" className="flex items-center gap-2 uppercase tracking-widest text-[10px] py-4 border-slate-800 bg-slate-900 hover:bg-slate-800">
                <Settings size={16} /> Edit Profile
             </ModernButton>
             <ModernButton variant="ghost" className="text-red-500 hover:bg-red-500/10 hover:text-red-400 uppercase tracking-widest text-[10px] py-4" onClick={() => signOut(auth)}>
                <LogOut size={16} /> Sign Out
             </ModernButton>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { icon: Zap, label: 'Current Level', val: '24', color: 'emerald' },
               { icon: Trophy, label: 'Eco Points', val: '1,240', color: 'amber' },
               { icon: Recycle, label: 'Weight Recycled', val: '124kg', color: 'blue' },
               { icon: History, label: 'Day Streaks', val: '12d', color: 'indigo' }
             ].map((s, i) => (
               <div key={i}>
                <GlassCard className="text-center py-8 border-slate-800 bg-slate-900 rounded-[2.5rem] h-full flex flex-col items-center justify-center group overflow-hidden relative">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{s.label}</div>
                   <div className="text-3xl font-black text-white italic-serif leading-none">{s.val}</div>
                   <div className={`absolute -bottom-4 -right-4 w-12 h-12 bg-${s.color}-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform`} />
                </GlassCard>
               </div>
             ))}
          </div>

          <GlassCard className="bg-slate-900 border-slate-800 p-8 rounded-[3rem]">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              <History className="text-emerald-500" size={16} /> RECENT CONTRIBUTIONS
            </h3>
            <div className="space-y-6">
               {[
                 { action: 'Plastic Bottle Verified', time: '2h ago', pts: '+25', icon: Recycle },
                 { action: 'AI Scan Mission Bonus', time: '5h ago', pts: '+50', icon: Zap },
                 { action: 'Paper Waste Disposal', time: 'Yesterday', pts: '+15', icon: ShieldCheck },
                 { action: 'Perfect Week Streak', time: '2d ago', pts: '+100', icon: Award },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-slate-800/50 pb-5 last:border-0 hover:bg-emerald-500/[0.02] -mx-4 px-4 transition-all rounded-2xl">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all shadow-xl">
                          <item.icon size={20} />
                       </div>
                       <div>
                          <div className="font-black text-white text-sm tracking-tight uppercase">{item.action}</div>
                          <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{item.time}</div>
                       </div>
                    </div>
                    <div className="text-emerald-500 font-black font-mono text-lg">{item.pts}</div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-10 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-[0.3em] transition-all border-t border-slate-800 pt-6">Browse Full Archive</button>
          </GlassCard>
        </div>

        <div className="space-y-10">
           <GlassCard className="bg-slate-900 border-slate-800 rounded-[3rem] p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Achievements</h3>
              <div className="grid grid-cols-2 gap-4">
                 {badges.map((b, i) => (
                   <div key={i} className="flex flex-col items-center p-5 rounded-3xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-help group shadow-2xl">
                      <div className={`w-14 h-14 rounded-2xl bg-${b.color}-500/10 flex items-center justify-center text-${b.color}-500 mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
                         <b.icon size={28} />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center leading-tight">{b.label}</span>
                   </div>
                 ))}
              </div>
           </GlassCard>

           <GlassCard className="bg-emerald-500 border-none rounded-[3rem] p-8 text-slate-950 shadow-2xl shadow-emerald-500/20">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="font-black uppercase tracking-tight text-lg">Next Milestone</h3>
                 <span className="font-black italic-serif text-2xl">LVL 24</span>
              </div>
              <div className="h-4 w-full bg-slate-950/20 rounded-full mb-6 relative overflow-hidden">
                 <div className="h-full bg-slate-950 w-[65%]" />
              </div>
              <p className="text-[10px] font-black text-slate-950/60 text-center uppercase tracking-[0.2em] leading-tight">1,240 / 2,000 XP COLLECTED<br/>UNTIL LEVEL 25</p>
           </GlassCard>

           <div className="p-8 rounded-[3rem] border border-slate-800 bg-slate-900/50 flex items-center justify-between group cursor-pointer hover:bg-slate-900 transition-all shadow-xl">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                    <Calendar size={20} />
                 </div>
                 <div>
                    <span className="text-xs font-black text-white uppercase tracking-tight">Active Goal</span>
                    <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">50kg This Month</div>
                 </div>
              </div>
              <ChevronRight size={18} className="text-slate-800 group-hover:text-white transition-colors" />
           </div>
        </div>
      </div>
    </div>
  );
}

const Trophy = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);
