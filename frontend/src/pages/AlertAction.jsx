import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function AlertAction() {
  const navigate = useNavigate();

  return (
    <AppLayout headerProps={{ title: "Alert Action Summary" }}>
      <div className="flex-1 flex items-center justify-center p-6 bg-background-dark font-display">
        <GlassCard className="w-full max-w-3xl overflow-hidden shadow-[0_0_40px_rgba(0,255,163,0.1)] border-[#00ffa350]">
          <div className="p-8 text-center border-b border-white/5">
            <span className="material-symbols-outlined text-accent-green text-6xl">verified_user</span>
            <h2 className="text-3xl font-bold mt-4">Alert ID: #AL-9842</h2>
            <p className="text-accent-red font-bold mt-2 italic uppercase tracking-widest text-sm">Critical Risk Score: 94</p>
          </div>
          
          <div className="p-8 bg-black/20">
            <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Action Taken</label>
            <p className="text-white font-medium text-lg">Escalated to Security Protocol Mitigation Team</p>
          </div>

          <div className="p-8 border-t border-white/5 bg-black/40 flex justify-between gap-4">
            <PrimaryButton onClick={() => navigate('/')}>
              <span className="material-symbols-outlined mr-2 align-middle">dashboard</span>
              Dashboard
            </PrimaryButton>
            <button onClick={() => navigate('/forensic')} className="text-slate-400 hover:text-white transition">
              Monitor Wallet Activity
            </button>
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}