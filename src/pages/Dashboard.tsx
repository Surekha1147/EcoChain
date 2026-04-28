import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Zap, 
  TrendingUp, 
  Leaf, 
  Recycle, 
  Droplets, 
  ArrowUpRight,
  Target,
  ChevronRight,
  Globe
} from 'lucide-react';
import { GlassCard, ModernButton } from '../components/UI';

const data = [
  { name: 'Mon', recycled: 400, saved: 240 },
  { name: 'Tue', recycled: 300, saved: 139 },
  { name: 'Wed', recycled: 200, saved: 980 },
  { name: 'Thu', recycled: 278, saved: 390 },
  { name: 'Fri', recycled: 189, saved: 480 },
  { name: 'Sat', recycled: 239, saved: 380 },
  { name: 'Sun', recycled: 349, saved: 430 },
];

const StatCard = ({ icon: Icon, title, value, sub, color }: any) => (
  <GlassCard className="flex flex-col gap-1 hover:border-emerald-500/50 transition-all cursor-pointer bg-slate-900 border-slate-800">
    <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 flex items-center justify-center text-${color}-500 mb-3`}>
      <Icon size={24} />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{title}</span>
    <div className="text-3xl font-black text-white italic-serif">{value}</div>
    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-black uppercase tracking-tighter">
      <ArrowUpRight size={12} /> {sub}
    </span>
  </GlassCard>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 h-screen overflow-y-auto lg:p-12 scrollbar-hide"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none mb-2 italic-serif">EcoChain <span className="text-emerald-500 font-normal">Dashboard</span></h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Welcome back. Your impact is growing.</p>
        </div>
        <div className="flex gap-4">
          <ModernButton variant="outline" onClick={handleDownload} disabled={downloading}>
            {downloading ? 'Downloading...' : 'Download Report'}
          </ModernButton>
          <ModernButton onClick={() => navigate('/identify')}>Identify Waste</ModernButton>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatCard icon={Zap} title="Points Earned" value="2,480" sub="12% vs last week" color="emerald" />
        <StatCard icon={Leaf} title="Trees Saved" value="14.5" sub="2.4 this month" color="blue" />
        <StatCard icon={Droplets} title="CO₂ Reduced" value="482kg" sub="8% efficiency" color="amber" />
        <StatCard icon={Recycle} title="Waste Recycled" value="142kg" sub="New record!" color="purple" />
      </div>

      <div className="grid lg:grid-cols-12 grid-rows-2 gap-8 h-[600px]">
        {/* Main Chart - Bento style spanning columns */}
        <div className="lg:col-span-8 row-span-2">
          <GlassCard className="h-full flex flex-col bg-slate-900 border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-white uppercase tracking-widest text-xs">Recycling Trends</h3>
                <p className="text-[10px] text-slate-500 font-bold opacity-60">Historical performance data</p>
              </div>
              <select className="bg-slate-800 border-none text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 text-slate-400 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} fontWeight={700} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} fontWeight={700} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="recycled" stroke="#10b981" fillOpacity={1} fill="url(#colorRecycled)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Highlight Card */}
        <div className="lg:col-span-4 row-span-1">
          <div className="bento-highlight h-full flex flex-col justify-between">
            <div>
              <h3 className="font-black text-xl mb-1 uppercase tracking-tight flex items-center gap-2">
                <Target size={20} />
                Active Mission
              </h3>
              <p className="text-xs font-bold text-slate-900/60 leading-tight">Recycle 10 plastic bottles this week for +50 bonus pts.</p>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-[10px] font-black mb-1.5 uppercase tracking-widest text-slate-900">
                <span>Progress</span>
                <span>70%</span>
              </div>
              <div className="h-3 w-full bg-slate-950/20 rounded-full overflow-hidden">
                <div className="h-full bg-slate-950 w-[70%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Small Data Card */}
        <div className="lg:col-span-4 row-span-1">
           <GlassCard className="h-full bg-slate-800/50 border-slate-700/50 flex flex-col justify-center">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white">
                    <Globe size={24} />
                 </div>
                 <div>
                    <div className="text-2xl font-black text-white italic-serif">Top 5%</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Recycler Rank</div>
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}
