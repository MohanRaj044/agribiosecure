
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Book, Info, MessageSquare, Send, Sparkles, 
  RotateCcw, ShieldCheck, Microscope, Thermometer
} from 'lucide-react';
import { MOCK_GUIDELINES } from '../constants';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

export default function GuidelinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Pig' | 'Poultry' | 'General'>('All');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your AI Biosecurity Advisor. Ask me anything about pig or poultry health and security.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const filteredGuidelines = MOCK_GUIDELINES.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         g.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || g.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const gemini = GeminiService.getInstance();
    const response = await gemini.askExpert(userMsg);
    
    setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Educational Content Section */}
        <div className="lg:col-span-2">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#1b3a1a] mb-4">Biosecurity Best Practices</h1>
            <p className="text-gray-600">Access our database of guidelines designed to help you maintain a safe farm environment.</p>
          </header>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search guidelines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6a994e] focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              {['All', 'Pig', 'Poultry', 'General'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === tab ? 'bg-white text-[#386641] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {filteredGuidelines.length > 0 ? (
              filteredGuidelines.map(g => (
                <div key={g.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{g.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-2 py-1 rounded text-gray-500">
                      {g.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1b3a1a] mb-2">{g.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{g.content}</p>
                  <button className="text-[#6a994e] text-sm font-bold hover:underline flex items-center gap-1">
                    Learn more <Info className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-20 bg-gray-50 rounded-2xl">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No guidelines found matching your search.</p>
              </div>
            )}
          </div>
          
          <div className="mt-12 p-8 bg-[#fdfcfb] rounded-2xl border border-dashed border-[#a3b18a] grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Microscope className="w-8 h-8 text-[#386641] mb-3" />
              <h4 className="font-bold text-[#1b3a1a] mb-1">Testing</h4>
              <p className="text-xs text-gray-500">Regular fecal and blood analysis.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Thermometer className="w-8 h-8 text-[#386641] mb-3" />
              <h4 className="font-bold text-[#1b3a1a] mb-1">Vitals</h4>
              <p className="text-xs text-gray-500">2x daily temperature logs.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="w-8 h-8 text-[#386641] mb-3" />
              <h4 className="font-bold text-[#1b3a1a] mb-1">Isolation</h4>
              <p className="text-xs text-gray-500">Minimum 21-day quarantine for new stock.</p>
            </div>
          </div>
        </div>

        {/* AI Advisor Chat Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col h-[700px] sticky top-24">
            <div className="p-6 border-b border-gray-100 bg-[#2d5a27] text-white rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">AI Biosecurity Advisor</h3>
                  <p className="text-xs text-[#a3b18a]">Gemini-Powered Expert Assistant</p>
                </div>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#6a994e] text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-[#1b3a1a] rounded-tl-none border border-gray-200 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white rounded-b-3xl">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ask about vaccination, sanitation..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isTyping}
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#6a994e] outline-none transition-all disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#6a994e] text-white rounded-lg flex items-center justify-center hover:bg-[#386641] disabled:opacity-30 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center px-4">
                Powered by Gemini. Verify critical health decisions with a certified veterinarian.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
