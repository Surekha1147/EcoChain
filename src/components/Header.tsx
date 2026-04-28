import { User as FirebaseUser } from 'firebase/auth';
import { Search, Bell, Zap, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ user, login }: { user: FirebaseUser | null, login: () => void }) {
  return (
    <header className="h-20 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-950/50 backdrop-blur-xl z-30 shrink-0">
      <div className="flex items-center gap-6 flex-1 max-w-xl">
         <div className="relative w-full hidden md:block group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search missions, centers, or rewards..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-400 focus:outline-none focus:border-emerald-500/50 transition-all font-bold uppercase tracking-wider"
            />
         </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
           <Zap size={16} className="text-amber-500" />
           <span className="text-xs font-black text-white">1,240 <span className="text-slate-600 font-medium ml-1">PTS</span></span>
        </div>
        
        <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors relative">
           <Bell size={20} />
           <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-950" />
        </button>

        <Link to="/profile">
           <div className="w-10 h-10 rounded-xl border-2 border-slate-800 overflow-hidden hover:border-emerald-500 transition-all cursor-pointer">
              <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} alt="" className="w-full h-full object-cover" />
           </div>
        </Link>
      </div>
    </header>
  );
}
