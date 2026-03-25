
import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  Users, Activity, CheckCircle, AlertCircle, Plus, Sparkles, Clipboard, Syringe, X, Zap,
  ArrowRight, ShieldAlert, FileText, Info
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { LivestockData, AIReport } from '../types';

const StatCard = ({ title, value, icon: Icon, trend, color, riskColor }: any) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-500 ${riskColor === 'red' ? 'border-red-200 bg-red-50/20' : riskColor === 'amber' ? 'border-amber-200 bg-amber-50/20' : 'border-gray-100'}`}>
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      {trend && (
        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${trend === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</h3>
    <p className={`text-3xl font-black mt-1 transition-colors duration-500 ${
      riskColor === 'red' ? 'text-red-600' : 
      riskColor === 'amber' ? 'text-amber-600' : 
      riskColor === 'green' ? 'text-green-600' : 
      'text-gray-900'
    }`}>{value}</p>
  </div>
);

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AIReport | null>(null);
  const [livestockInput, setLivestockInput] = useState<LivestockData>({
    pigs: { count: 450, lastVaccination: '', healthNote: '' },
    hens: { count: 1200, lastVaccination: '', healthNote: '' }
  });

  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      const gemini = GeminiService.getInstance();
      const result = await gemini.generateReport(livestockInput);
      setReport(result);
    } catch (err) {
      console.error(err);
      alert("Failed to generate report. Please check your inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldRisk = (animal: 'Pigs' | 'Hens', type: 'Population' | 'Vaccination' | 'Observation') => {
    if (!report) return null;
    const insight = report.dataInsights.find(d => 
      d.category.toLowerCase().includes(animal.toLowerCase()) && 
      d.category.toLowerCase().includes(type.toLowerCase())
    );

    if (!insight) return null;
    if (insight.riskLevel === 'High') return 'red';
    if (insight.riskLevel === 'Medium') return 'amber';
    return 'green';
  };

  const getRiskBadgeStyles = (risk: string | null) => {
    if (risk === 'red') return "bg-red-100 text-red-700 border-red-200";
    if (risk === 'amber') return "bg-amber-100 text-amber-700 border-amber-200";
    if (risk === 'green') return "bg-green-100 text-green-700 border-green-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const animalPieData = [
    { name: 'Pigs', value: livestockInput.pigs.count, color: getFieldRisk('Pigs', 'Population') === 'red' ? '#ef4444' : '#f28482' },
    { name: 'Hens', value: livestockInput.hens.count, color: getFieldRisk('Hens', 'Population') === 'red' ? '#ef4444' : '#f6bd60' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#1b3a1a]">Farm Health Monitor</h1>
          <p className="text-gray-500 font-medium">Real-time biosecurity analysis for Swine and Poultry.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-[#6a994e] text-white rounded-2xl text-sm font-black shadow-xl shadow-green-900/10 hover:bg-[#386641] transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Update Data Logs
          </button>
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Pig Population" 
          value={livestockInput.pigs.count.toLocaleString()} 
          icon={Users} 
          trend={getFieldRisk('Pigs', 'Population') === 'red' ? 'Critical' : null} 
          color="#386641"
          riskColor={getFieldRisk('Pigs', 'Population')}
        />
        <StatCard 
          title="Poultry Population" 
          value={livestockInput.hens.count.toLocaleString()} 
          icon={Users} 
          trend={getFieldRisk('Hens', 'Population') === 'red' ? 'Critical' : null} 
          color="#6a994e"
          riskColor={getFieldRisk('Hens', 'Population')}
        />
        <StatCard 
          title="Security Score" 
          value={report ? `${report.overallScore}%` : "--"} 
          icon={Activity} 
          trend={report ? "Verified" : "Syncing"} 
          color="#8b5e34" 
        />
        <StatCard 
          title="Risk Alerts" 
          value={report ? report.alerts.length : "0"} 
          icon={AlertCircle} 
          trend={report?.alerts.length ? "Priority" : "Safe"} 
          color="#bc4749" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        {/* Granular Audit Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-[#1b3a1a] mb-8 flex items-center gap-3">
              <Clipboard className="w-6 h-6 text-[#6a994e]" />
              Data Audit
            </h3>
            
            <div className="space-y-10">
              {/* Swine Detailed Audit */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                  <span className="text-2xl">🐖</span>
                  <span className="text-xs font-black uppercase text-gray-900 tracking-widest">Pig Inventory Audit</span>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Population Count</span>
                    <div className={`px-4 py-2 rounded-xl border text-sm font-black ${getRiskBadgeStyles(getFieldRisk('Pigs', 'Population'))}`}>
                      {livestockInput.pigs.count} Animals
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Last Vaccination</span>
                    <div className={`px-4 py-2 rounded-xl border text-sm font-black flex items-center gap-2 ${getRiskBadgeStyles(getFieldRisk('Pigs', 'Vaccination'))}`}>
                      <Syringe className="w-4 h-4" />
                      {livestockInput.pigs.lastVaccination || 'Date Not Provided'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Audit Observations</span>
                    <div className={`p-4 rounded-xl border text-[11px] font-bold leading-relaxed ${getRiskBadgeStyles(getFieldRisk('Pigs', 'Observation'))}`}>
                      "{livestockInput.pigs.healthNote || 'No specific health notes recorded for this period.'}"
                    </div>
                  </div>
                </div>
              </div>

              {/* Poultry Detailed Audit */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                  <span className="text-2xl">🐔</span>
                  <span className="text-xs font-black uppercase text-gray-900 tracking-widest">Poultry Inventory Audit</span>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Population Count</span>
                    <div className={`px-4 py-2 rounded-xl border text-sm font-black ${getRiskBadgeStyles(getFieldRisk('Hens', 'Population'))}`}>
                      {livestockInput.hens.count} Animals
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Last Vaccination</span>
                    <div className={`px-4 py-2 rounded-xl border text-sm font-black flex items-center gap-2 ${getRiskBadgeStyles(getFieldRisk('Hens', 'Vaccination'))}`}>
                      <Syringe className="w-4 h-4" />
                      {livestockInput.hens.lastVaccination || 'Date Not Provided'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Audit Observations</span>
                    <div className={`p-4 rounded-xl border text-[11px] font-bold leading-relaxed ${getRiskBadgeStyles(getFieldRisk('Hens', 'Observation'))}`}>
                      "{livestockInput.hens.healthNote || 'No specific health notes recorded for this period.'}"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1b3a1a] p-8 rounded-[2rem] text-white shadow-xl shadow-green-900/10">
            <h4 className="font-black mb-3 flex items-center gap-2 text-amber-400 uppercase text-xs tracking-widest">
              <ShieldAlert className="w-4 h-4" />
              Intelligence Note
            </h4>
            <p className="text-xs text-green-100/70 font-medium leading-relaxed">
              Biosecurity protocols are more than checkboxes. Current animal density requires 20% higher ventilation throughput to maintain optimal lung health.
            </p>
          </div>
        </div>

        {/* AI Report Column */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gradient-to-br from-[#fdfcfb] to-white">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#6a994e] rounded-2xl flex items-center justify-center shadow-2xl shadow-green-900/20 transform -rotate-3">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1b3a1a]">Expert AI Health Audit</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Analysis by Gemini Intelligence</p>
              </div>
            </div>
            {report && (
              <div className="px-5 py-2 rounded-full border-2 border-gray-50 bg-white shadow-sm flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full animate-ping ${
                  report.healthStatus === 'Critical' ? 'bg-red-500' : 
                  report.healthStatus === 'Fair' ? 'bg-amber-500' : 'bg-green-500'
                }`}></div>
                <span className={`text-sm font-black ${
                  report.healthStatus === 'Critical' ? 'text-red-600' : 
                  report.healthStatus === 'Fair' ? 'text-amber-600' : 'text-green-600'
                }`}>
                  {report.healthStatus} Status
                </span>
              </div>
            )}
          </div>
          
          <div className="p-10 flex-grow">
            {!report && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                  <FileText className="w-12 h-12 text-gray-200" />
                </div>
                <h4 className="font-black text-gray-400 text-2xl uppercase tracking-tighter">No Audit Generated</h4>
                <p className="text-sm text-gray-400 max-w-sm mt-4 font-medium leading-relaxed">
                  The AI is ready to audit your farm. Update your livestock count and vaccination dates to get a professional biosecurity risk assessment.
                </p>
                <button 
                   onClick={() => setIsModalOpen(true)}
                   className="mt-10 px-10 py-4 bg-[#6a994e] text-white rounded-[2rem] text-sm font-black shadow-2xl shadow-green-900/10 hover:bg-[#386641] transition-all transform hover:scale-105"
                >
                  Generate Audit Now
                </button>
              </div>
            )}

            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center py-24">
                <div className="relative mb-10">
                   <div className="w-24 h-24 border-8 border-gray-50 border-t-[#6a994e] rounded-full animate-spin"></div>
                   <Zap className="w-10 h-10 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
                </div>
                <p className="text-xl font-black text-[#1b3a1a]">Running Security Audit...</p>
                <p className="text-sm text-gray-400 mt-2 font-medium">Analyzing patterns and cross-referencing health standards.</p>
              </div>
            )}

            {report && !isLoading && (
              <div className="space-y-10 animate-in fade-in slide-in-from-top-6 duration-1000">
                {/* Visual Risk Insights */}
                <div className="grid sm:grid-cols-2 gap-5">
                   {report.dataInsights.map((insight, i) => (
                     <div key={i} className={`p-6 rounded-[2rem] border-2 transition-all duration-500 hover:shadow-lg ${
                       insight.riskLevel === 'High' ? 'bg-red-50/50 border-red-100' : 
                       insight.riskLevel === 'Medium' ? 'bg-amber-50/50 border-amber-100' : 
                       'bg-green-50/50 border-green-100'
                     }`}>
                        <div className="flex items-center justify-between mb-4">
                           <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                             insight.riskLevel === 'High' ? 'bg-red-100 text-red-600' : 
                             insight.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-600' : 
                             'bg-green-100 text-green-600'
                           }`}>{insight.category}</div>
                           <Info className={`w-4 h-4 ${
                             insight.riskLevel === 'High' ? 'text-red-400' : 
                             insight.riskLevel === 'Medium' ? 'text-amber-400' : 'text-green-400'
                           }`} />
                        </div>
                        <p className="text-xs font-bold text-gray-900 leading-relaxed">{insight.observation}</p>
                     </div>
                   ))}
                </div>

                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 relative">
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-white px-4 py-1 rounded-full border border-gray-100 text-[10px] font-black text-gray-400 uppercase">Executive Summary</div>
                  <p className="text-gray-800 leading-relaxed text-sm font-bold italic">"{report.summary}"</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-5">
                    <h4 className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> Safety & Health Alerts
                    </h4>
                    <div className="space-y-3">
                      {report.alerts.map((alert, i) => (
                        <div key={i} className="text-xs p-4 bg-red-50/20 border border-red-100 text-red-900 rounded-2xl flex items-start gap-3 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse"></div>
                          <span className="font-bold">{alert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-5">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#6a994e] flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Strategic Recommendations
                    </h4>
                    <div className="space-y-3">
                      {report.recommendations.map((rec, i) => (
                        <div key={i} className="text-xs p-4 bg-green-50/20 border border-green-100 text-green-900 rounded-2xl flex items-start gap-3 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                          <span className="font-bold">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1b3a1a]/70 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-[3.5rem] w-full max-w-2xl shadow-3xl overflow-hidden animate-in zoom-in duration-500">
            <div className="p-12 bg-[#2d5a27] text-white flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-black tracking-tight">Farm Data Update</h2>
                <p className="text-green-100/70 text-sm font-medium mt-1 uppercase tracking-widest">Biosecurity Ledger v2.4</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="p-10 space-y-12 max-h-[60vh] overflow-y-auto">
              {/* Swine Section */}
              <div className="space-y-8 bg-red-50/10 p-8 rounded-[2.5rem] border border-red-100/30">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-md transform rotate-2">🐖</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">Swine Section</h3>
                    <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Active Herd Monitoring</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Head Count</label>
                    <input 
                      type="number" 
                      value={livestockInput.pigs.count}
                      onChange={(e) => setLivestockInput({...livestockInput, pigs: {...livestockInput.pigs, count: parseInt(e.target.value) || 0}})}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-red-500 transition-all font-black text-2xl text-red-600 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Last Vaccination</label>
                    <input 
                      type="date" 
                      value={livestockInput.pigs.lastVaccination}
                      onChange={(e) => setLivestockInput({...livestockInput, pigs: {...livestockInput.pigs, lastVaccination: e.target.value}})}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-red-500 transition-all font-black text-gray-900 shadow-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Daily Health Notes</label>
                  <textarea 
                    value={livestockInput.pigs.healthNote}
                    onChange={(e) => setLivestockInput({...livestockInput, pigs: {...livestockInput.pigs, healthNote: e.target.value}})}
                    placeholder="Observe for coughing, lethargy, or skin lesions..."
                    className="w-full px-6 py-5 bg-white border-2 border-gray-100 rounded-3xl outline-none focus:border-red-500 transition-all resize-none h-32 text-sm font-bold text-gray-800 shadow-sm"
                  ></textarea>
                </div>
              </div>

              {/* Poultry Section */}
              <div className="space-y-8 bg-amber-50/10 p-8 rounded-[2.5rem] border border-amber-100/30">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-md transform -rotate-2">🐔</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">Poultry Section</h3>
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Active Flock Monitoring</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Flock Size</label>
                    <input 
                      type="number" 
                      value={livestockInput.hens.count}
                      onChange={(e) => setLivestockInput({...livestockInput, hens: {...livestockInput.hens, count: parseInt(e.target.value) || 0}})}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-amber-500 transition-all font-black text-2xl text-amber-600 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Last Vaccination</label>
                    <input 
                      type="date" 
                      value={livestockInput.hens.lastVaccination}
                      onChange={(e) => setLivestockInput({...livestockInput, hens: {...livestockInput.hens, lastVaccination: e.target.value}})}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-amber-500 transition-all font-black text-gray-900 shadow-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Daily Health Notes</label>
                  <textarea 
                    value={livestockInput.hens.healthNote}
                    onChange={(e) => setLivestockInput({...livestockInput, hens: {...livestockInput.hens, healthNote: e.target.value}})}
                    placeholder="Observe for egg quality drops, respiratory noise, or unusual mortality..."
                    className="w-full px-6 py-5 bg-white border-2 border-gray-100 rounded-3xl outline-none focus:border-amber-500 transition-all resize-none h-32 text-sm font-bold text-gray-800 shadow-sm"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="p-12 border-t border-gray-50 bg-[#fdfcfb] flex gap-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-5 bg-white border-2 border-gray-100 text-gray-600 font-black rounded-3xl hover:bg-gray-50 transition-all active:scale-95"
              >
                Discard
              </button>
              <button 
                onClick={() => {
                   handleGenerateReport();
                   setIsModalOpen(false);
                }}
                disabled={isLoading}
                className="flex-[2] py-5 bg-[#6a994e] text-white font-black rounded-3xl shadow-2xl shadow-green-900/20 hover:bg-[#386641] transition-all active:scale-95 flex items-center justify-center gap-3 text-lg transform hover:-translate-y-1"
              >
                <Sparkles className="w-6 h-6" />
                Analyze Health Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
