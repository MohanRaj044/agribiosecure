
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Users, Activity, CheckCircle, AlertCircle, TrendingUp, Calendar,
  FileText, Plus, Sparkles, Clipboard, Syringe, Info, X, ShieldAlert, Zap
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { LivestockData, AIReport } from '../types';

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      {trend && (
        <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
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

  const animalPieData = [
    { name: 'Pigs', value: livestockInput.pigs.count, color: '#f28482' },
    { name: 'Hens', value: livestockInput.hens.count, color: '#f6bd60' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1b3a1a]">Farm Management</h1>
          <p className="text-gray-500">Analyze livestock status and generate biosecurity reports.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-[#6a994e] text-white rounded-xl text-sm font-bold shadow-lg shadow-green-900/10 hover:bg-[#386641] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Update Animal Data
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Stock" 
          value={(livestockInput.pigs.count + livestockInput.hens.count).toLocaleString()} 
          icon={Users} 
          trend="Active Monitoring" 
          color="#386641" 
        />
        <StatCard 
          title="Health Score" 
          value={report ? `${report.overallScore}%` : "N/A"} 
          icon={Activity} 
          trend={report ? "AI Assessed" : "Pending Data"} 
          color="#6a994e" 
        />
        <StatCard 
          title="Health Status" 
          value={report ? report.healthStatus : "Awaiting Audit"} 
          icon={CheckCircle} 
          trend="Real-time" 
          color="#8b5e34" 
        />
        <StatCard 
          title="Alerts" 
          value={report ? report.alerts.length : "0"} 
          icon={AlertCircle} 
          trend="Action items" 
          color="#bc4749" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        {/* Livestock Distribution */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-bold text-[#1b3a1a] mb-6 flex items-center gap-2">
            <Clipboard className="w-5 h-5 text-[#6a994e]" />
            Stock Distribution
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={animalPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {animalPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f28482]"></div>
                <span className="text-sm font-semibold text-gray-700">Pigs</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{livestockInput.pigs.count}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f6bd60]"></div>
                <span className="text-sm font-semibold text-gray-700">Hens</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{livestockInput.hens.count}</span>
            </div>
          </div>
        </div>

        {/* AI Analysis Result */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-[#2d5a27]/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6a994e]/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#6a994e]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1b3a1a]">AI Biosecurity Analysis</h3>
                <p className="text-xs text-gray-400">Data-driven risk assessment</p>
              </div>
            </div>
            {report && (
              <div className="text-right">
                <div className={`text-sm font-bold ${
                  report.healthStatus === 'Critical' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {report.healthStatus} Status
                </div>
                <div className="text-[10px] text-gray-400">Score: {report.overallScore}/100</div>
              </div>
            )}
          </div>
          
          <div className="p-8 flex-grow">
            {!report && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <ShieldAlert className="w-8 h-8 text-gray-300" />
                </div>
                <h4 className="font-bold text-gray-400 text-lg">Analysis Awaiting Data</h4>
                <p className="text-sm text-gray-400 max-w-sm mt-2">
                  Update your animal counts and health notes to receive a professional AI biosecurity audit.
                </p>
                <button 
                   onClick={() => setIsModalOpen(true)}
                   className="mt-6 px-6 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}

            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center py-20">
                <div className="relative">
                   <div className="w-16 h-16 border-4 border-green-50 border-t-[#6a994e] rounded-full animate-spin"></div>
                   <Zap className="w-6 h-6 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <p className="mt-6 text-sm font-bold text-[#1b3a1a]">Gemini is auditing your farm numbers...</p>
                <p className="text-xs text-gray-400 mt-1">Cross-referencing vaccination schedules and population risks.</p>
              </div>
            )}

            {report && !isLoading && (
              <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                {/* Data Insights Section */}
                <div className="grid md:grid-cols-2 gap-4">
                   {report.dataInsights.map((insight, i) => (
                     <div key={i} className={`p-4 rounded-2xl border ${
                       insight.riskLevel === 'High' ? 'bg-red-50 border-red-100' : 
                       insight.riskLevel === 'Medium' ? 'bg-amber-50 border-amber-100' : 
                       'bg-green-50 border-green-100'
                     }`}>
                        <div className="flex items-center justify-between mb-2">
                           <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                             insight.riskLevel === 'High' ? 'bg-red-100 text-red-600' : 
                             insight.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-600' : 
                             'bg-green-100 text-green-600'
                           }`}>{insight.category}</span>
                           <span className="text-[10px] font-bold text-gray-400">{insight.riskLevel} Risk</span>
                        </div>
                        <p className="text-xs font-medium text-gray-700 leading-relaxed">{insight.observation}</p>
                     </div>
                   ))}
                </div>

                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Audit Summary</h4>
                  <p className="text-gray-700 leading-relaxed text-sm italic">"{report.summary}"</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Critical Alerts
                    </h4>
                    <ul className="space-y-2">
                      {report.alerts.map((alert, i) => (
                        <li key={i} className="text-[11px] p-2 bg-red-50 border-l-2 border-red-500 text-red-800 rounded-r shadow-sm">
                          {alert}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#6a994e] mb-3 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Action Plan
                    </h4>
                    <ul className="space-y-2">
                      {report.recommendations.map((rec, i) => (
                        <li key={i} className="text-[11px] p-2 bg-green-50 border-l-2 border-green-500 text-green-800 rounded-r shadow-sm">
                          {rec}
                        </li>
                      ))}
                    </ul>
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 bg-[#2d5a27] text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Update Farm Status</h2>
                <p className="text-sm text-green-100/70">Feed the AI with your latest farm data</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Pigs Column */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-red-100 pb-3">
                    <span className="text-3xl">🐖</span>
                    <h3 className="font-bold text-gray-800">Swine Data</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Population</label>
                      <input 
                        type="number" 
                        value={livestockInput.pigs.count}
                        onChange={(e) => setLivestockInput({...livestockInput, pigs: {...livestockInput.pigs, count: parseInt(e.target.value) || 0}})}
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-red-200 transition-all font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Vaccination Date</label>
                      <input 
                        type="date" 
                        value={livestockInput.pigs.lastVaccination}
                        onChange={(e) => setLivestockInput({...livestockInput, pigs: {...livestockInput.pigs, lastVaccination: e.target.value}})}
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-red-200 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Health Note</label>
                      <textarea 
                        value={livestockInput.pigs.healthNote}
                        onChange={(e) => setLivestockInput({...livestockInput, pigs: {...livestockInput.pigs, healthNote: e.target.value}})}
                        placeholder="Current state..."
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-red-200 transition-all resize-none h-24 text-sm"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Hens Column */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-amber-100 pb-3">
                    <span className="text-3xl">🐔</span>
                    <h3 className="font-bold text-gray-800">Poultry Data</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Population</label>
                      <input 
                        type="number" 
                        value={livestockInput.hens.count}
                        onChange={(e) => setLivestockInput({...livestockInput, hens: {...livestockInput.hens, count: parseInt(e.target.value) || 0}})}
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-amber-200 transition-all font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Vaccination Date</label>
                      <input 
                        type="date" 
                        value={livestockInput.hens.lastVaccination}
                        onChange={(e) => setLivestockInput({...livestockInput, hens: {...livestockInput.hens, lastVaccination: e.target.value}})}
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-amber-200 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Health Note</label>
                      <textarea 
                        value={livestockInput.hens.healthNote}
                        onChange={(e) => setLivestockInput({...livestockInput, hens: {...livestockInput.hens, healthNote: e.target.value}})}
                        placeholder="Current state..."
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-amber-200 transition-all resize-none h-24 text-sm"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
              >
                Discard
              </button>
              <button 
                onClick={() => {
                   handleGenerateReport();
                   setIsModalOpen(false);
                }}
                disabled={isLoading}
                className="flex-[2] py-4 bg-[#6a994e] text-white font-bold rounded-2xl shadow-xl shadow-green-900/20 hover:bg-[#386641] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Analyze New Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
