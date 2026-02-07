import AppLayout from "../components/AppLayout";
import PageContainer from "../components/PageContainer";
import MetricCard from "../components/MetricCard";
import AlertItem from "../components/AlertItem";

export default function Dashboard() {
  return (
    <AppLayout>
      <PageContainer>
        {/* KPI Row: 4-column grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Transactions" value="1.2M" icon="receipt_long" subtext="+2.4% vs last week" variant="primary" />
          <MetricCard label="High-Risk Detected" value="14" icon="warning" subtext="+12% spike today" variant="danger" trendIcon="arrow_outward" />
          <MetricCard label="Avg. Risk Score" value="18" icon="analytics" subtext="-5% improvement" variant="secondary" trendIcon="trending_down" />
          
          {/* Special Threat Card with live pulse animation */}
          <div className="bg-surface-dark border border-[#283639] rounded-xl p-5 relative flex flex-col justify-between overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/5 to-transparent pointer-events-none" />
            <span className="material-symbols-outlined text-6xl absolute right-0 top-0 opacity-10 p-2 text-accent-green">shield</span>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Current Threat Level</p>
              <div className="flex items-center gap-3 mt-2">
                <h3 className="text-white text-3xl font-bold tracking-tight">LOW</h3>
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-accent-green opacity-75"></span>
                  <span className="relative h-3 w-3 bg-accent-green rounded-full shadow-[0_0_10px_#0bda54]"></span>
                </div>
              </div>
            </div>
            <p className="text-accent-green text-sm font-medium mt-4">System Stable</p>
          </div>
        </div>

        {/* Analytics Section: 2/3 Chart, 1/3 Alert Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-surface-dark rounded-xl border border-[#283639] p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">monitoring</span>
                Real-time Risk Analysis
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-primary text-black text-xs font-bold">24H</button>
                <button className="px-3 py-1 rounded bg-[#283639] text-xs font-bold">7D</button>
              </div>
            </div>
            {/* SVG graph container from your teammate's code */}
            <div className="relative w-full h-[300px]">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300">
                <defs>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0dccf2" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0dccf2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,220 Q100,200 200,230 T400,180 T600,120 T800,150 V300 H0 Z" fill="url(#areaGradient)" />
                <path className="drop-shadow-[0_0_8px_rgba(13,204,242,0.6)]" d="M0,220 Q100,200 200,230 T400,180 T600,120 T800,150" fill="none" stroke="#0dccf2" strokeWidth="3" />
                <circle cx="600" cy="120" fill="#111718" r="6" stroke="#0dccf2" strokeWidth="3" />
              </svg>
            </div>
          </div>

          <div className="bg-surface-dark rounded-xl border border-[#283639] flex flex-col h-full max-h-[500px]">
            <div className="p-4 border-b border-[#283639] bg-[#151c1e] rounded-t-xl flex justify-between items-center">
              <h3 className="text-white text-lg font-bold flex items-center gap-2">Live Alerts</h3>
              <span className="text-xs text-gray-500 font-mono italic">Real-time</span>
            </div>
            <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar">
              <AlertItem wallet="0x71C...8e4" amount="$420,000" score="88" subtitle="Suspicious transfer" severity="high" time="2m ago" />
              <AlertItem wallet="0x3A2...b99" amount="$85,200" score="65" subtitle="Flash loan detected" severity="warning" time="15m ago" />
              <AlertItem wallet="0x99B...c21" amount="$12,050" score="52" subtitle="Unverified interaction" severity="warning" time="22m ago" />
            </div>
          </div>
        </div>

        {/* Transaction Table placeholder (linked later to full logic) */}
        <div className="bg-surface-dark rounded-xl border border-[#283639] overflow-hidden">
           <div className="p-6 border-b border-[#283639]">
              <h3 className="text-xl font-bold">Recent Transactions</h3>
           </div>
           <div className="h-64 flex items-center justify-center text-gray-500 font-mono italic">
              Loading Transaction Ledger...
           </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}