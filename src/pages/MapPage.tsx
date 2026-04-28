import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Filter, Navigation, Star, Phone, Clock, ChevronRight, Globe, Layers, Recycle, CheckCircle2 } from 'lucide-react';
import { GlassCard, ModernButton } from '../components/UI';

const centers = [
  { id: 1, name: 'Eco Hub Recycling', type: 'Scrap Shop', distance: '0.8 km', rating: 4.8, address: '42 Greenway Road, Sector 5', open: true },
  { id: 2, name: 'City Compost Unit', type: 'Organic Waste', distance: '1.5 km', rating: 4.5, address: 'Public Park, Block C', open: true },
  { id: 3, name: 'E-Waste Solutions', type: 'Electronics', distance: '2.1 km', rating: 4.9, address: 'Industrial Area Phase 2', open: false },
  { id: 4, name: 'Bottle Bank', type: 'Glass/Plastic', distance: '0.3 km', rating: 4.2, address: 'Main Street Corner', open: true },
];

export default function MapPage() {
  const [selected, setSelected] = useState(centers[0]);
  const [scheduled, setScheduled] = useState(false);

  const handleSchedule = () => {
    setScheduled(true);
    setTimeout(() => setScheduled(false), 3000);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-full lg:w-[400px] border-r border-zinc-800 bg-zinc-950/80 backdrop-blur-xl z-10 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-white mb-4">Nearby Centers</h1>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search centers, bins..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
            />
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
             {['All', 'Scrap', 'Organic', 'E-Waste', 'Glass'].map((cat) => (
                <button key={cat} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-500 hover:border-emerald-500/50 hover:text-emerald-400 whitespace-nowrap transition-all uppercase tracking-widest">
                  {cat}
               </button>
             ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {centers.map((center) => (
            <motion.div 
              key={center.id}
              onClick={() => setSelected(center)}
              whileTap={{ scale: 0.98 }}
              className={`
                p-4 rounded-2xl border transition-all cursor-pointer group
                ${selected.id === center.id ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{center.name}</h3>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-bold">{center.rating}</span>
                </div>
              </div>
              <div className="text-xs font-medium text-zinc-500 mb-3 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={12} className="text-emerald-500" /> {center.type} • {center.distance}
              </div>
              <div className="flex items-center justify-between">
                 <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${center.open ? 'bg-emerald-500/20 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}>
                    {center.open ? 'Now Open' : 'Closed'}
                 </span>
                 <ChevronRight size={16} className={`${selected.id === center.id ? 'text-emerald-500' : 'text-zinc-700'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
            <ModernButton 
              onClick={handleSchedule}
              className={`w-full py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${scheduled ? 'bg-emerald-500 text-white' : ''}`}
            >
                {scheduled ? <CheckCircle2 size={18} /> : <Recycle size={18} />}
                {scheduled ? 'Scheduled Successfully' : 'Schedule a Pickup'}
            </ModernButton>
        </div>
      </aside>

      {/* Map Implementation (Mock) */}
      <section className="flex-1 relative bg-zinc-900 overflow-hidden">
        {/* Placeholder Map Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        
        {/* Mock Map Shapes */}
        <svg className="absolute inset-0 w-full h-full text-zinc-800/50" viewBox="0 0 1000 1000">
           <path d="M100 100 L900 100 L900 300 Q700 350 400 300 L100 400 Z" fill="currentColor" />
           <path d="M0 600 Q300 500 500 700 T1000 600 V1000 H0 Z" fill="currentColor" />
           <circle cx="500" cy="500" r="200" stroke="#10b981" strokeWidth="1" fill="none" strokeDasharray="10 5" className="opacity-20 animate-pulse" />
        </svg>

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 space-y-2 z-20">
           <button className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 hover:bg-zinc-900 transition-all shadow-xl">
              <Layers size={20} />
           </button>
           <button className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20">
              <Navigation size={20} />
           </button>
        </div>

        {/* Selected Center Overlay */}
        <AnimatePresence mode="wait">
            {selected && (
                <motion.div 
                    key={selected.id}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="absolute bottom-8 left-8 right-8 lg:left-1/2 lg:-translate-x-1/2 lg:w-[600px] z-20"
                >
                    <GlassCard className="p-8 border-emerald-500/30 flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
                                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{selected.type} Center</div>
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <MapPin size={14} className="text-emerald-500" />
                                    <span>{selected.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <Clock size={14} className="text-emerald-500" />
                                    <span>09:00 AM - 08:00 PM</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <Phone size={14} className="text-emerald-500" />
                                    <span>+91 98765 43210</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <ModernButton className="flex-1 flex items-center justify-center gap-2">
                                    <Navigation size={18} /> Get Directions
                                </ModernButton>
                                <ModernButton variant="outline">
                                    <Phone size={18} /> Call Hub
                                </ModernButton>
                            </div>
                        </div>

                        <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden grayscale border border-zinc-800">
                            <img src={`https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300`} alt="Facility" className="w-full h-full object-cover" />
                        </div>
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Center Markers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
                <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]" />
            </motion.div>
        </div>
      </section>
    </div>
  );
}

