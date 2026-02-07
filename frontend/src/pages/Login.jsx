import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col md:flex-row bg-background-dark font-display">
      {/* Left Side: Hero Section */}
      <div className="relative w-full md:w-[55%] flex flex-col justify-center p-8 md:p-24 overflow-hidden mesh-gradient">
        {/* Background Decoration */}
        <div className="absolute inset-0 network-pattern opacity-40"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 space-y-8 max-w-xl">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <svg className="size-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.1288 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
                <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">DeFi Sentinel <span className="text-primary">AI</span></span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400">
              DeFi Sentinel AI
            </h1>
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-medium text-white/90">
                AI-powered early warning system for DeFi attacks.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                Real-time on-chain monitoring, predictive threat modeling, and instant liquidity pool risk assessment. Protect your protocols with sovereign intelligence.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-slate-300">
              <span className="material-symbols-outlined text-primary text-lg">shield_lock</span>
              Multi-Sig Secure
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-slate-300">
              <span className="material-symbols-outlined text-primary text-lg">bolt</span>
              0.2s Latency
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Section */}
      <div className="relative w-full md:w-[45%] flex flex-col justify-center items-center p-6 md:p-12 bg-background-dark">
        <div className="glass-card w-full max-w-md rounded-2xl p-8 md:p-10 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">Access Sentinel</h2>
            <p className="text-slate-400 text-sm">Welcome back. Enter your credentials to monitor threats.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors">mail</span>
                </div>
                <input
                  className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder:text-slate-600 transition-all outline-none"
                  placeholder="name@protocol.com"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <a className="text-xs text-primary hover:text-primary/80 font-medium" href="#">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors">lock</span>
                </div>
                <input
                  className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder:text-slate-600 transition-all outline-none"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(13,242,242,0.3)] hover:shadow-[0_0_30px_rgba(13,242,242,0.4)] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-xl">login</span>
                Secure Login
              </button>

              <div className="relative py-2">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-slate-500">or explore</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-4 rounded-xl transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-xl text-primary">data_exploration</span>
                Continue as Demo
              </button>
            </div>
          </form>
        </div>

        <footer className="mt-auto pt-8 pb-4 text-center">
          <p className="text-[10px] md:text-xs text-slate-600 max-w-xs md:max-w-md mx-auto leading-relaxed">
            © 2024 DeFi Sentinel AI. This system provides early detection alerts and does not guarantee attack prevention.
          </p>
        </footer>
      </div>
    </div>
  );
}