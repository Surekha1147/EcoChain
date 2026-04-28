import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Camera, 
  MapPin, 
  Trophy, 
  BarChart3, 
  User, 
  Settings, 
  Leaf, 
  Recycle,
  Search,
  MessageSquare,
  Zap,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Award,
  Globe
} from 'lucide-react';

import { auth } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

// Pages - defined inline or as skeletons for now to ensure compile
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import WasteClassifier from './pages/WasteClassifier';
import MapPage from './pages/MapPage';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Rewards from './pages/Rewards';

const Sidebar = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: (o: boolean) => void }) => {
  const location = useLocation();
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: Camera, label: 'Identify Waste', path: '/identify' },
    { icon: MapPin, label: 'Nearby Centers', path: '/map' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: Award, label: 'Rewards', path: '/rewards' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-600 rounded-lg text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <motion.aside 
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className="fixed lg:static inset-y-0 left-0 w-[280px] bg-slate-900 border-r border-slate-800 p-6 z-40 lg:translate-x-0"
      >
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
            <Leaf size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic-serif">EcoChain</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                  ${isActive 
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10' 
                    : 'text-slate-500 hover:text-slate-100 hover:bg-white/5'}
                `}>
                  <item.icon size={20} />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-5 bg-slate-950/50 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Eco Streak</span>
            </div>
            <div className="text-2xl font-black text-white italic-serif">12 Days</div>
            <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-3/4" />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

import Header from './components/Header';
import EcoChat from './components/EcoChat';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Recycle size={48} className="text-emerald-500" />
      </motion.div>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
        {user && <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />}
        
        <main className="flex-1 overflow-hidden relative flex flex-col">
          {user && <Header user={user} login={login} />}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
                <Routes>
                <Route path="/" element={<LandingPage user={user} login={login} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/identify" element={<WasteClassifier />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </AnimatePresence>
          </div>
          <EcoChat />
        </main>
      </div>
    </BrowserRouter>
  );
}
