
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Users, Activity, CheckCircle, AlertCircle, TrendingUp, Calendar
} from 'lucide-react';
import { COLORS } from '../constants';

const animalData = [
  { name: 'Pigs', value: 450, color: '#f28482' },
  { name: 'Poultry', value: 1200, color: '#f6bd60' },
];

const complianceHistory = [
  { date: 'Mon', score: 85 },
  { date: 'Tue', score: 88 },
  { date: 'Wed', score: 82 },
  { date: 'Thu', score: 90 },
  { date: 'Fri', score: 95 },
  { date: 'Sat', score: 92 },
  { date: 'Sun', score: 89 },
];

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

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1b3a1a]">Farm Overview</h1>
          <p className="text-gray-500">Green Valley Multi-Stock Farm • Active Dashboard</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Past 7 Days
          </button>
          <button className="px-4 py-2 bg-[#6a994e] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-[#386641] transition-colors">
            Generate Report
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Livestock" 
          value="1,650" 
          icon={Users} 
          trend="+12 this week" 
          color="#386641" 
        />
        <StatCard 
          title="Avg. Health Status" 
          value="94%" 
          icon={Activity} 
          trend="+2.1%" 
          color="#6a994e" 
        />
        <StatCard 
          title="Biosecurity Compliance" 
          value="88.5%" 
          icon={CheckCircle} 
          trend="-0.5%" 
          color="#8b5e34" 
        />
        <StatCard 
          title="Pending Alerts" 
          value="2" 
          icon={AlertCircle} 
          trend="Action required" 
          color="#bc4749" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Livestock Distribution */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1b3a1a] mb-6">Stock Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={animalData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {animalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {animalData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600 font-medium">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1b3a1a] mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#6a994e]" />
            Compliance Trend (7 Days)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#386641" 
                  strokeWidth={3} 
                  dot={{ fill: '#386641', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
