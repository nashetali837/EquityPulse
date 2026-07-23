import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Zap, 
  Lock, 
  ChevronRight, 
  LogOut, 
  User as UserIcon,
  Search,
  Calendar,
  ArrowUpRight,
  Globe,
  PieChart,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';
import { User, Report } from './types';

// Components
const Navbar = ({ user, onLogout }: { user: User | null, onLogout: () => void }) => (
  <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">EquityPulse</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/reports" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Reports</Link>
          <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Pricing</Link>
          <Link to="/analytics" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Global Trends</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{user.tier}</span>
                <span className="text-sm font-medium text-slate-900">{user.email}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign in</Link>
              <Link to="/signup" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-brand-500 w-6 h-6" />
            <span className="text-xl font-bold text-white">EquityPulse</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed">
            The definitive platform for weekly digital equity analytics. 
            Deep-diving into the world's most promising startups.
          </p>
          <p className="mt-4 text-brand-500 font-serif italic">1 week, 1 company, 1 report.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/reports" className="hover:text-white transition-colors">Weekly Reports</Link></li>
            <li><Link to="/analytics" className="hover:text-white transition-colors">Equity Analytics</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Subscription Plans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-center">
        © 2026 EquityPulse Analytics. All rights reserved.
      </div>
    </div>
  </footer>
);

// Pages
const LandingPage = () => (
  <div className="flex flex-col">
    {/* Hero Section */}
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="absolute inset-0 data-grid opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-widest mb-6 border border-brand-100">
              Digital Equity Intelligence
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Uncover the Future of <span className="text-brand-600">Global Startups</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Detailed equity analytics from ground zero to internal happenings. 
              We deliver one high-impact report every week.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                Start Free Trial <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/reports" className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                View Latest Report
              </Link>
            </div>
            <p className="mt-12 text-slate-400 font-serif italic text-lg">
              "1 week, 1 company, 1 report."
            </p>

            {/* Generated LinkedIn / Social Promotional Banner Asset */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 max-w-4xl mx-auto glass-card p-4 sm:p-6 text-left border-brand-200 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2.5 py-1 rounded-md">
                    Featured Visual Asset
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">LinkedIn Tech Post Graphic</h3>
                </div>
                <a 
                  href="/linkedin_equity_analytics.jpg" 
                  download="EquityPulse_LinkedIn_Banner.jpg"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
                >
                  <ArrowUpRight className="w-4 h-4 rotate-45" /> Download High-Res Image
                </a>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-inner">
                <img 
                  src="/linkedin_equity_analytics.jpg" 
                  alt="EquityPulse Digital Equity Analytics Platform Banner" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Stats/Features Section */}
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: BarChart3, title: "Deep Analytics", desc: "From cap tables to internal burn rates, we analyze what others miss." },
            { icon: Globe, title: "Global Reach", desc: "Emerging markets and frontier tech fields covered in exhaustive detail." },
            { icon: Shield, title: "Verified Data", desc: "Primary source intelligence and ground-zero investigative reporting." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="text-brand-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Sample Chart Section */}
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">Visualizing Equity Trends</h2>
            <p className="text-lg text-slate-600 mb-8">
              Our platform provides interactive visualizations for every report, 
              allowing you to track valuation trajectories and market sentiment in real-time.
            </p>
            <ul className="space-y-4">
              {[
                "Valuation Benchmarking",
                "Internal Growth Metrics",
                "Future Prospect Modeling",
                "Competitive Landscape Mapping"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-brand-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full h-[400px] glass-card p-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: 'Jan', val: 400 },
                { name: 'Feb', val: 300 },
                { name: 'Mar', val: 600 },
                { name: 'Apr', val: 800 },
                { name: 'May', val: 500 },
                { name: 'Jun', val: 900 },
              ]}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="val" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const LoginPage = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        onLogin(data.user);
        navigate('/reports');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card p-8"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Access your weekly equity intelligence</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? <Link to="/signup" className="text-brand-600 font-semibold hover:underline">Sign up for free</Link>
        </p>
      </motion.div>
    </div>
  );
};

const SignupPage = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        onLogin(data.user);
        navigate('/pricing');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card p-8"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-slate-500 mt-2">Join 10,000+ investors and analysts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all">
            Get Started
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

const ReportsPage = ({ user }: { user: User | null }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Weekly Reports</h1>
          <p className="text-slate-500 text-lg">Detailed equity deep-dives, published every Monday.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
          <Calendar className="w-4 h-4" />
          Next report: March 9, 2026
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-80 bg-slate-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => {
            const isLocked = user ? (
              (report.tier_required === 'general' && user.tier === 'freemium') ||
              (report.tier_required === 'premium' && user.tier !== 'premium')
            ) : report.tier_required !== 'freemium';

            return (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative glass-card overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-2 py-1 rounded">
                      {report.industry}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{report.published_date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {report.company_name}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {report.summary}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    {isLocked ? (
                      <Link to="/pricing" className="flex items-center gap-2 text-sm font-bold text-slate-400">
                        <Lock className="w-4 h-4" /> Upgrade to Read
                      </Link>
                    ) : (
                      <Link to={`/reports/${report.id}`} className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-3 transition-all">
                        Read Full Report <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                    
                    <div className="flex items-center gap-1">
                      {report.tier_required === 'premium' && <Shield className="w-4 h-4 text-amber-500" />}
                      {report.tier_required === 'general' && <Zap className="w-4 h-4 text-brand-500" />}
                    </div>
                  </div>
                </div>
                {isLocked && (
                  <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[2px] pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const PricingPage = ({ user }: { user: User | null }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Choose Your Access Level</h1>
      <p className="text-xl text-slate-500">Unlock deep-dive analytics and internal startup intelligence.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Freemium",
          price: "$0",
          desc: "Basic market awareness",
          features: ["1 Report per month", "Public market summaries", "Basic industry news", "Email newsletter"],
          tier: "freemium",
          cta: "Current Plan"
        },
        {
          name: "General",
          price: "$49",
          desc: "Professional startup tracking",
          features: ["All Weekly Reports", "Valuation analytics", "Cap table summaries", "Industry trend mapping", "Priority support"],
          tier: "general",
          cta: "Upgrade to General",
          popular: true
        },
        {
          name: "Premium",
          price: "$199",
          desc: "Institutional grade intelligence",
          features: ["Exclusive Internal Data", "Direct Analyst Access", "Custom Prospect Modeling", "Ground-Zero Site Reports", "API Access"],
          tier: "premium",
          cta: "Go Premium"
        }
      ].map((plan, i) => (
        <div key={i} className={cn(
          "glass-card p-8 flex flex-col relative",
          plan.popular && "border-brand-500 ring-2 ring-brand-500/20 shadow-xl"
        )}>
          {plan.popular && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Most Popular
            </span>
          )}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-slate-400 text-sm">/month</span>
            </div>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            {plan.features.map((f, j) => (
              <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                <Zap className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button className={cn(
            "w-full py-4 rounded-xl font-bold transition-all",
            plan.popular ? "bg-brand-600 text-white hover:bg-brand-700" : "bg-slate-900 text-white hover:bg-slate-800",
            user?.tier === plan.tier && "bg-slate-100 text-slate-400 cursor-default hover:bg-slate-100"
          )}>
            {user?.tier === plan.tier ? "Current Plan" : plan.cta}
          </button>
        </div>
      ))}
    </div>
  </div>
);

// Main App
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />
            <Route path="/reports" element={<ReportsPage user={user} />} />
            <Route path="/pricing" element={<PricingPage user={user} />} />
            <Route path="/analytics" element={<div className="p-20 text-center">Global Trends Dashboard - Coming Soon</div>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
