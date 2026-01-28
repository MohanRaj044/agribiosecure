
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold text-[#1b3a1a] mb-6">Get in Touch</h1>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            Have questions about biosecurity protocols? Need assistance with farm registration? Our team of agricultural experts is here to help.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#6a994e]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#386641]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1b3a1a]">Regional Head Office</h4>
                <p className="text-gray-600">123 Farmstead Road, Agricultural Valley, AB 4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#6a994e]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-[#386641]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1b3a1a]">Email Support</h4>
                <p className="text-gray-600">support@agribiosecure.portal</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#6a994e]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#386641]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1b3a1a]">Helpline</h4>
                <p className="text-gray-600">+1 (555) 0123-4567</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-[#8b5e34]/5 rounded-3xl border border-[#8b5e34]/10">
            <h3 className="font-bold text-[#8b5e34] mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Emergency Advisory
            </h3>
            <p className="text-sm text-gray-700">
              For immediate reporting of suspected outbreaks, please contact your local State Veterinary Service immediately before using this portal.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 relative overflow-hidden">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-[#6a994e] text-white rounded-full flex items-center justify-center mb-6">
                <Send className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-[#1b3a1a] mb-2">Message Sent!</h2>
              <p className="text-gray-600 mb-8">Thank you for reaching out. An advisor will contact you within 24 hours.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-[#6a994e] font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1b3a1a]">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#6a994e] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1b3a1a]">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="john@farm.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#6a994e] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1b3a1a]">Subject</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#6a994e] outline-none transition-all"
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                >
                  <option value="">Select a topic</option>
                  <option value="training">Training Request</option>
                  <option value="technical">Technical Support</option>
                  <option value="consultancy">Biosecurity Consultancy</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1b3a1a]">Your Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="How can we help your farm today?"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#6a994e] outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-[#6a994e] text-white font-bold rounded-xl shadow-lg shadow-[#6a994e]/20 hover:bg-[#386641] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
