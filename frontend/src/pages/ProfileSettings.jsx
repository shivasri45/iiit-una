import React from "react";
import AppLayout from "../components/AppLayout";
import PageContainer from "../components/PageContainer";

export default function ProfileSettings() {
  return (
    <AppLayout headerProps={{ title: "Sentinel AI" }}>
      <PageContainer>
        <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-dark/80 backdrop-blur-md border border-[#283639] rounded-xl p-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
              
              <div className="relative mb-6">
                <div className="size-32 rounded-full bg-gradient-to-br from-[#1a2325] to-[#0d1213] border-2 border-primary/50 flex items-center justify-center overflow-hidden shadow-neon">
                  <span className="material-symbols-outlined text-6xl text-gray-600">person</span>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-secondary rounded-full text-white shadow-lg hover:bg-purple-600 transition-colors">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>

              <div className="flex items-center gap-2 bg-[#111718] px-4 py-2 rounded-lg border border-[#283639] mb-4 group cursor-pointer hover:border-primary/50 transition-colors">
                <span className="font-mono text-gray-300 text-sm">0x8145...4a2b</span>
                <span className="material-symbols-outlined text-gray-500 text-sm group-hover:text-primary transition-colors">content_copy</span>
              </div>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-8">
                Primary Role: Protocol Admin
              </span>

              <div className="w-full text-left">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 border-b border-[#283639] pb-2">Linked Protocols</h3>
                <div className="space-y-3">
                  <LinkedProtocol name="Uniswap V3" role="Pool Admin" char="U" color="pink" />
                  <LinkedProtocol name="Aave V3" role="Governance" char="A" color="purple" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preferences & Security */}
          <div className="lg:col-span-8 space-y-6">
            {/* Notification Preferences */}
            <Section title="Notification Preferences" icon="notifications_active" iconColor="text-secondary" description="Manage alerts for protocol security events.">
              <ToggleRow title="Email Alerts" description="Receive daily summaries and critical warnings." id="email-toggle" />
              <ToggleRow title="Telegram Bot" description="Instant messages for real-time monitoring." id="tg-toggle" defaultChecked />
              <ToggleRow 
                title={<>High-Risk Tx Alerts <span className="bg-accent-red/20 text-accent-red text-[10px] px-1.5 py-0.5 rounded font-bold border border-accent-red/20 ml-2">CRITICAL</span></>} 
                description="Push notifications for transactions with Risk Score > 80." 
                id="risk-toggle" 
                defaultChecked 
              />
            </Section>

            {/* Security Keys */}
            <Section title="Security Keys" icon="vpn_key" iconColor="text-primary" description="Manage hardware wallets and 2FA methods.">
              <div className="grid gap-4 sm:grid-cols-2">
                <SecurityKey name="Ledger Nano X" status="Last used: 2h ago" icon="usb" />
                <SecurityKey name="Google Authenticator" status="2FA Enabled" icon="phonelink_lock" />
                <div className="bg-[#111718] border border-[#283639] border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-[#1a2325] transition-colors col-span-1 sm:col-span-2">
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">add_circle</span> Add New Security Key
                  </span>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}

// Helper Components
const LinkedProtocol = ({ name, role, char, color }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-[#111718] border border-[#283639] hover:border-gray-600 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`size-8 rounded bg-${color}-500/20 flex items-center justify-center text-${color}-500 font-bold text-xs`}>{char}</div>
      <div>
        <div className="text-white text-sm font-bold">{name}</div>
        <div className="text-gray-500 text-xs">{role}</div>
      </div>
    </div>
    <span className="material-symbols-outlined text-accent-green text-sm">check_circle</span>
  </div>
);

const Section = ({ title, icon, iconColor, description, children }) => (
  <div className="bg-surface-dark/80 backdrop-blur-md border border-[#283639] rounded-xl overflow-hidden">
    <div className="p-6 border-b border-[#283639] flex items-center gap-3">
      <div className={`p-2 rounded ${iconColor}/10 ${iconColor}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h3 className="text-white text-lg font-bold">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
    <div className="p-6 space-y-6">{children}</div>
  </div>
);

const ToggleRow = ({ title, description, id, defaultChecked = false }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-white font-medium">{title}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
      <input 
        type="checkbox" 
        id={id} 
        defaultChecked={defaultChecked}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#283639] checked:border-primary transition-all duration-300 left-0" 
      />
      <label htmlFor={id} className="toggle-label block overflow-hidden h-6 rounded-full bg-[#111718] cursor-pointer border border-[#283639]"></label>
    </div>
  </div>
);

const SecurityKey = ({ name, status, icon }) => (
  <div className="bg-[#111718] border border-[#283639] rounded-lg p-4 flex items-start justify-between hover:border-primary/40 transition-colors group">
    <div className="flex gap-3">
      <span className="material-symbols-outlined text-gray-400 text-3xl group-hover:text-white transition-colors">{icon}</span>
      <div>
        <p className="text-white font-bold text-sm">{name}</p>
        <p className="text-gray-500 text-xs">{status}</p>
      </div>
    </div>
    <span className="bg-accent-green/10 text-accent-green text-xs px-2 py-1 rounded font-bold">Active</span>
  </div>
);