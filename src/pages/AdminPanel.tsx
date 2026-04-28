import React, { useState } from 'react';
import { 
  Users, 
  Trash2, 
  TrendingUp, 
  ShieldAlert, 
  MapPin, 
  Filter, 
  Download, 
  MoreVertical,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { GlassCard, ModernButton } from '../components/UI';

const stats = [
  { label: 'Total Users', val: '8,251', trend: '+12%', icon: Users, color: 'blue' },
  { label: 'Active Logs', val: '24,801', trend: '+18%', icon: Trash2, color: 'emerald' },
  { label: 'Pending Verifications', val: '432', trend: '-5%', icon: ShieldAlert, color: 'amber' },
  { label: 'Revenue/Impact', val: '$12.4k', trend: '+24%', icon: TrendingUp, color: 'purple' },
];

const submissions = [
  { id: 'LOG-8821', user: 'Mike Ross', category: 'E-Waste', location: 'Block C, Apt 4', status: 'Pending', time: '10m ago' },
  { id: 'LOG-8820', user: 'Rachel Z', category: 'Plastic', location: 'Sunset Hostel', status: 'Verified', time: '22m ago' },
  { id: 'LOG-8819', user: 'Harvey S', category: 'Organic', location: 'Tech Park', status: 'Verified', time: '45m ago' },
  { id: 'LOG-8818', user: 'Louis L', category: 'Hazardous', location: 'Chemical Yard', status: 'Flagged', time: '1h ago' },
];

export default function AdminPanel() {
  const [actioning, setActioning] = useState<string | null>(null);

  const triggerAction = (name: string) => {
    setActioning(name);
    setTimeout(() => setActioning(null), 2000);
  };

  return (
    <div className="p-8 lg:p-12 h-screen overflow-y-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight italic-serif mb-2">Command Center</h1>
          <p className="text-zinc-500 font-medium">EcoChain System Administration & Oversight.</p>
        </div>
        <div className="flex gap-3">
          <ModernButton 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={() => triggerAction('exporting')}
            disabled={actioning === 'exporting'}
          >
             <Download size={16} /> {actioning === 'exporting' ? 'Exporting...' : 'Export DB'}
          </ModernButton>
          <ModernButton 
             className="flex items-center gap-2"
             onClick={() => triggerAction('filtering')}
             disabled={actioning === 'filtering'}
          >
             <Filter size={16} /> {actioning === 'filtering' ? 'Filtering...' : 'System Filters'}
          </ModernButton>
        </div>
      </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i}>
            <GlassCard className="hover:border-zinc-700 transition-all h-full">
               <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-${s.color}-500/10 flex items-center justify-center text-${s.color}-500`}>
                     <s.icon size={20} />
                  </div>
                  <div className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-widest">{s.trend}</div>
               </div>
               <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{s.label}</div>
               <div className="text-2xl font-black text-white">{s.val}</div>
            </GlassCard>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white flex items-center gap-2">
               <Clock size={18} className="text-blue-400" />
               Recent Feed
            </h3>
            <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Live Updates (On)</button>
          </div>

          <div className="space-y-2">
             {submissions.map((log) => (
               <div key={log.id} className="grid grid-cols-[100px,1fr,120px,100px,40px] gap-4 items-center p-4 rounded-xl border border-zinc-800/50 hover:bg-white/5 transition-all cursor-pointer">
                  <div className="text-[10px] font-mono text-zinc-500">{log.id}</div>
                  <div>
                     <div className="text-sm font-bold text-white leading-none mb-1">{log.user}</div>
                     <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{log.location}</div>
                  </div>
                  <div className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full text-center uppercase tracking-widest">{log.category}</div>
                  <div className="text-right">
                     <div className={`text-[10px] font-black uppercase tracking-widest ${
                       log.status === 'Verified' ? 'text-emerald-500' : log.status === 'Flagged' ? 'text-red-500' : 'text-amber-500'
                     }`}>
                        {log.status}
                     </div>
                     <div className="text-[10px] text-zinc-600 font-bold uppercase mt-1">{log.time}</div>
                  </div>
                  <button className="flex justify-end text-zinc-700 hover:text-white">
                     <MoreVertical size={16} />
                  </button>
               </div>
             ))}
          </div>
        </GlassCard>

        <div className="space-y-8">
           <GlassCard className="border-emerald-500/20 bg-emerald-500/5">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                 <CheckCircle size={18} className="text-emerald-400" />
                 Smart Verification
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                 EcoChain Auto-Verifier is active. 98.4% of logs are currently classified with &gt;95% confidence by Gemini AI.
              </p>
              <ModernButton className="w-full">Review Auto-Flags</ModernButton>
           </GlassCard>

           <GlassCard border="zinc-800">
              <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Node Health</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Blockchain Core', status: 'Stable', val: '1ms' },
                   { label: 'AI Inference', status: 'Busy', val: '420ms' },
                   { label: 'Map API', status: 'Stable', val: '12ms' },
                 ].map((node, i) => (
                   <div key={i} className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-zinc-500 uppercase tracking-widest">{node.label}</span>
                      <div className="flex items-center gap-4">
                         <span className={node.status === 'Stable' ? 'text-emerald-500' : 'text-amber-500'}>{node.status}</span>
                         <span className="text-zinc-700 font-mono">{node.val}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
