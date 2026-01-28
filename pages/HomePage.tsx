
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, GraduationCap, ChevronRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=2000" 
            alt="Farm landscape" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Protecting Your Farm, <br />
            <span className="text-[#a3b18a]">Securing Your Future.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl text-gray-200">
            AgriBioSecure Portal provides pig and poultry farmers with the tools, knowledge, and monitoring required to maintain world-class biosecurity standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/dashboard" 
              className="px-8 py-4 bg-[#6a994e] hover:bg-[#386641] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 group"
            >
              View Demo Dashboard
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/features" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-lg border border-white/30 transition-all text-center"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1b3a1a] mb-4">Why Biosecurity Matters?</h2>
            <div className="w-24 h-1 bg-[#6a994e] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Disease Prevention",
                desc: "Minimize the risk of highly contagious pathogens like African Swine Fever and Avian Influenza entering your premises.",
                icon: Shield
              },
              {
                title: "Economic Stability",
                desc: "Reduce mortality rates and avoid costly quarantine or livestock culling, ensuring consistent revenue.",
                icon: Activity
              },
              {
                title: "Sustainable Growth",
                desc: "Maintain export standards and build trust with consumers by demonstrating rigorous health monitoring.",
                icon: GraduationCap
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#fdfcfb] p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-[#6a994e]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-[#386641]" />
                </div>
                <h3 className="text-xl font-bold text-[#1b3a1a] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-16 bg-[#2d5a27] text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <blockquote className="text-2xl md:text-3xl font-light italic mb-8">
            "An ounce of prevention is worth a ton of cure. In modern farming, biosecurity isn't just a protocol—it's the backbone of your business."
          </blockquote>
          <p className="font-bold text-[#a3b18a]">— Dr. Julian Fields, Veterinary Consultant</p>
        </div>
        <div className="absolute top-0 right-0 opacity-10 -translate-y-1/2 translate-x-1/2">
            <CheckCircle className="w-96 h-96" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
