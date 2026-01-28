
import React, { useState } from 'react';
import { 
  FileText, ClipboardList, Bell, ShieldCheck, 
  UserPlus, Search, CheckSquare, Square
} from 'lucide-react';
import { INITIAL_CHECKLIST } from '../constants';
import { ChecklistItem } from '../types';

const FeatureCard = ({ title, icon: Icon, description }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#6a994e] transition-all group">
    <div className="w-12 h-12 bg-[#6a994e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-[#386641]" />
    </div>
    <h3 className="text-lg font-bold text-[#1b3a1a] mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const FeaturesPage = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);

  const toggleTask = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = checklist.filter(t => t.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#1b3a1a] mb-4">Powerful Tools for Farmers</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Everything you need to maintain a biosecure environment and ensure the longevity of your farming operation.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <FeatureCard 
          title="Farm Registration"
          icon={UserPlus}
          description="Maintain digital profiles for multiple farm locations, management teams, and animal housing units."
        />
        <FeatureCard 
          title="Health Logs"
          icon={FileText}
          description="Detailed digital records of animal weight, feed intake, mortality, and medicinal administration."
        />
        <FeatureCard 
          title="Biosecurity Checks"
          icon={ClipboardList}
          description="Customizable checklists based on species-specific risks and local regulatory requirements."
        />
        <FeatureCard 
          title="Outbreak Alerts"
          icon={Bell}
          description="Receive real-time notifications about local disease outbreaks and preventative measures."
        />
      </div>

      <div className="bg-[#fdfcfb] rounded-3xl border border-[#a3b18a]/30 p-8 md:p-12 overflow-hidden relative">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1b3a1a] mb-6 flex items-center gap-3">
              <ShieldCheck className="w-10 h-10 text-[#6a994e]" />
              Interactive Compliance Checklist
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience our daily monitoring tool. This checklist helps farmers ensure all critical biosecurity protocols are followed every morning.
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-[#1b3a1a]">Today's Progress</span>
                <span className="text-[#6a994e] font-bold">{Math.round((completedCount / checklist.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
                <div 
                  className="h-full bg-[#6a994e] transition-all duration-500"
                  style={{ width: `${(completedCount / checklist.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="space-y-3">
                {checklist.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleTask(item.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      item.completed 
                        ? 'bg-[#6a994e]/5 border-[#6a994e] text-[#1b3a1a]' 
                        : 'bg-white border-gray-100 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.completed ? (
                        <CheckSquare className="w-5 h-5 text-[#6a994e]" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-300" />
                      )}
                      <span className={item.completed ? 'line-through opacity-70' : ''}>
                        {item.task}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 py-1 bg-gray-50 rounded">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <img 
              src="https://images.unsplash.com/photo-1594145070248-c70e3039d67a?auto=format&fit=crop&q=80&w=800" 
              alt="Farmer with poultry"
              className="rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]">
              <p className="text-xs font-bold text-[#1b3a1a] mb-2 uppercase">Compliance Tip</p>
              <p className="text-sm text-gray-600 italic">"Ensure footbaths are at least 5cm deep for effective shoe disinfection."</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6a994e]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default FeaturesPage;
