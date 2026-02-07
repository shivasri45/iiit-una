import { useNavigate } from "react-router-dom";

export default function Header({ title = "Sentinel AI", onSettingsClick, onNotifClick }) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-[#283639] px-6 py-4 bg-[#111718] sticky top-0 z-50 font-display">
      {/* Brand */}
      <div className="flex items-center gap-4 text-white">
        <div className="size-8 text-primary">
          <span className="material-symbols-outlined text-[32px]">shield_lock</span>
        </div>
        <h2 className="text-white text-2xl font-bold tracking-tight">{title}</h2>
      </div>

      {/* Network Selector (Center) */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface-dark rounded-full border border-[#283639]">
        <span className="material-symbols-outlined text-gray-400 text-sm">token</span>
        <span className="text-sm font-medium text-white">Ethereum Mainnet</span>
        <span className="material-symbols-outlined text-gray-400 text-sm">expand_more</span>
      </div>

      {/* Actions & Status */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3">
          {/* Notification Button */}
          <button 
            onClick={onNotifClick}
            className="flex items-center justify-center rounded-lg h-10 px-4 bg-surface-dark border border-[#283639] hover:bg-[#283639] text-white transition-colors relative"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <div className="absolute top-2 right-3 size-2 rounded-full bg-accent-red"></div>
          </button>
          
          {/* Settings Button */}
          <button 
            onClick={onSettingsClick}
            className="flex items-center justify-center rounded-lg h-10 px-4 bg-surface-dark border border-[#283639] hover:bg-[#283639] text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
        </div>
        
        {/* Profile Section */}
        <div 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 pl-4 border-l border-[#283639] cursor-pointer group"
        >
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-primary font-bold uppercase">Connected</div>
            <div className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors">0x81...4a2</div>
          </div>
          <div className="bg-gradient-to-br from-primary to-purple-600 rounded-full p-0.5 shadow-neon group-hover:scale-105 transition-transform">
            <div className="bg-surface-dark rounded-full p-1 flex">
              <span className="material-symbols-outlined text-white text-sm">wallet</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}