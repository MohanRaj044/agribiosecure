
import React from 'react';
import { 
  Users, 
  Monitor, 
  Cpu, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  ArrowDown,
  Cloud,
  Zap
} from 'lucide-react';

const ArchitectureNode = ({ icon: Icon, title, description, color }: any) => (
  <div className="flex flex-col items-center group">
    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${color}`}>
      <Icon className="w-10 h-10 text-white" />
    </div>
    <div className="mt-4 text-center">
      <h3 className="text-lg font-black text-[#1b3a1a] uppercase tracking-tighter">{title}</h3>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 max-w-[150px]">{description}</p>
    </div>
  </div>
);

const Connector = ({ vertical = false }: { vertical?: boolean }) => (
  <div className={`flex items-center justify-center ${vertical ? 'h-16 w-full' : 'w-16 h-full'}`}>
    {vertical ? (
      <ArrowDown className="w-6 h-6 text-gray-300 animate-bounce" />
    ) : (
      <ArrowRight className="w-6 h-6 text-gray-300 animate-pulse" />
    )}
  </div>
);

export default function ArchitecturePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      <header className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#6a994e]/10 text-[#386641] text-[10px] font-black uppercase tracking-widest mb-4">
          <Zap className="w-3 h-3" />
          System Blueprint
        </div>
        <h1 className="text-5xl font-black text-[#1b3a1a] tracking-tight">System Architecture</h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto font-medium">
          A high-level overview of how AgriBioSecure integrates AI intelligence with farm management.
        </p>
      </header>

      <div className="relative bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-green-900/5 border border-gray-50 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="grid grid-cols-10 gap-10 h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-gray-900 rounded-full w-2 h-2"></div>
            ))}
          </div>
        </div>

        {/* Desktop Architecture (Horizontal) */}
        <div className="hidden lg:flex items-center justify-center gap-4 relative z-10">
          <ArchitectureNode 
            icon={Users} 
            title="Farmer / User" 
            description="End-user interaction and data logging"
            color="bg-[#386641]"
          />
          <Connector />
          <ArchitectureNode 
            icon={Monitor} 
            title="Frontend App" 
            description="React & Tailwind UI Interface"
            color="bg-[#6a994e]"
          />
          <Connector />
          <ArchitectureNode 
            icon={Cpu} 
            title="Gemini AI" 
            description="Neural processing & Risk Analysis"
            color="bg-[#8b5e34]"
          />
          <Connector />
          <ArchitectureNode 
            icon={Database} 
            title="Cloud Storage" 
            description="Secure Biosecurity Ledger"
            color="bg-[#a3b18a]"
          />
          <Connector />
          <ArchitectureNode 
            icon={ShieldCheck} 
            title="Compliance" 
            description="Verified Health Standards"
            color="bg-[#1b3a1a]"
          />
        </div>

        {/* Mobile Architecture (Vertical) */}
        <div className="lg:hidden flex flex-col items-center gap-4 relative z-10">
          <ArchitectureNode 
            icon={Users} 
            title="Farmer / User" 
            description="End-user interaction"
            color="bg-[#386641]"
          />
          <Connector vertical />
          <ArchitectureNode 
            icon={Monitor} 
            title="Frontend App" 
            description="React Interface"
            color="bg-[#6a994e]"
          />
          <Connector vertical />
          <ArchitectureNode 
            icon={Cpu} 
            title="Gemini AI" 
            description="Neural Analysis"
            color="bg-[#8b5e34]"
          />
          <Connector vertical />
          <ArchitectureNode 
            icon={Database} 
            title="Cloud Storage" 
            description="Secure Ledger"
            color="bg-[#a3b18a]"
          />
          <Connector vertical />
          <ArchitectureNode 
            icon={ShieldCheck} 
            title="Compliance" 
            description="Health Standards"
            color="bg-[#1b3a1a]"
          />
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-10 border-t border-gray-50 pt-20">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-[#6a994e]/10 rounded-xl flex items-center justify-center">
              <Cloud className="w-5 h-5 text-[#386641]" />
            </div>
            <h4 className="font-black text-[#1b3a1a] uppercase text-xs tracking-widest">Cloud Native</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Hosted on secure cloud infrastructure ensuring 99.9% uptime for critical farm monitoring.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-10 h-10 bg-[#8b5e34]/10 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#8b5e34]" />
            </div>
            <h4 className="font-black text-[#1b3a1a] uppercase text-xs tracking-widest">Real-time Sync</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Instant data synchronization between the field and the central dashboard for immediate action.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-10 h-10 bg-[#1b3a1a]/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#1b3a1a]" />
            </div>
            <h4 className="font-black text-[#1b3a1a] uppercase text-xs tracking-widest">End-to-End Security</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Encrypted data transmission protecting sensitive farm inventory and health records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
