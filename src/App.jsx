import React, { useState } from 'react';
import { 
  Calendar, 
  ExternalLink, 
  GraduationCap, 
  Bot, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Download, 
  HelpCircle,
  Video,
  ChevronRight,
  ChevronLeft,
  Users,
  Mic,
  MonitorPlay
} from 'lucide-react';

// --- CONFIGURACIÓN DE CONTENIDO ---
const HUB_NAME = "Hub de Formación";
const HUB_SUBTITLE = "Oficina Regional BNI Andalucía Occidental";

const PASAPORTE_LINKS = [
  {
    name: "Pasaporte Martes",
    time: "19:00 – 20:00",
    url: "https://bnionline.zoom.us/j/94633617517",
    frequency: "Todos los martes"
  },
  {
    name: "Pasaporte Miércoles",
    time: "10:30 – 11:30",
    url: "https://bnionline.zoom.us/meeting/register/tJMrc-qhpzgqHNRCFyxTpYsdhUSAD8Jv-Eo0",
    frequency: "Semanas Alternas (ver calendario)"
  },
  {
    name: "Pasaporte Jueves",
    time: "16:00 – 17:00",
    url: "https://bnionline.zoom.us/meeting/register/tJEqdO-sqzsqEtI0CBr7bfodpG5-0mlV4NSZ",
    frequency: "Semanas Alternas (ver calendario)"
  }
];

const WEBINAR_LINK = {
  name: "Webinar Formación Canarias",
  time: "Todos los jueves · 20:00h",
  url: "https://bnionline.zoom.us/j/6565739237?pwd=8pCDw2qtZy5x5NEisglph01iqXsLvX.1&omn=94411585737",
  description: "Formación especializada desde Islas Canarias"
};

const PEM_LINK = {
  name: "PEM Online",
  url: "https://bnionline.zoom.us/j/95759693769?pwd=w365jmDRu139B4jqtscaIgFTABamA2.1"
};

const CALENDAR_EVENTS = [
  { date: '2026-03-10', name: 'Pasaporte 19:00', type: 'training' },
  { date: '2026-03-11', name: 'Pasaporte 10:30', type: 'training' },
  { date: '2026-03-12', name: 'T. Mercado Objetivo 12:00', type: 'special' },
  { date: '2026-03-17', name: 'Pasaporte 19:00', type: 'training' },
  { date: '2026-03-18', name: 'T. Pet. Específicas 17:00', type: 'special' },
  { date: '2026-03-19', name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
  { date: '2026-03-20', name: 'PEN 12:00', type: 'highlight' },
  { date: '2026-03-24', name: 'Pasaporte 19:00', type: 'training' },
  { date: '2026-03-25', name: 'Pasaporte 10:30', type: 'training' },
  { date: '2026-03-26', name: 'Networking / Online 20:00', type: 'multi' },
];

const EXTRA_LINKS = [
  { name: "Eventos Nacionales", url: "https://bniespanaslc.com/es/eventos", icon: <Calendar className="w-4 h-4" /> },
  { name: "Eventos Regionales", url: "https://bniespanaslc.com/es/eventos", icon: <MapPin className="w-4 h-4" /> },
  { name: "Podcasts BNI", url: "https://www.somosbnipodcast.com/", icon: <Mic className="w-4 h-4" /> },
  { name: "PEM Online Access", url: PEM_LINK.url, icon: <GraduationCap className="w-4 h-4" /> },
];

// --- COMPONENTES ---

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
    {subtitle && <p className="text-sm text-slate-500 font-medium">{subtitle}</p>}
  </div>
);

const HubApp = () => {
  const [currentMonth] = useState("Marzo 2026");

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans pb-12">
      
      {/* HEADER / HERO */}
      <header className="bg-white border-b border-gray-100 px-6 py-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img 
              src="/logo_bni.png" 
              alt="BNI Andalucía Occidental" 
              className="h-24 lg:h-28 w-auto object-contain"
            />
            <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black text-slate-900 leading-tight">
                {HUB_NAME}
              </h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                {HUB_SUBTITLE}
              </p>
            </div>
          </div>
          <div className="px-5 py-2 rounded-full bg-[#cf202e] text-white text-[10px] font-black tracking-widest uppercase shadow-lg shadow-red-200">
             Acceso Coordinadores
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* IZQUIERDA: CALENDARIO & RECURSOS (7 cols) */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-10">
          
          {/* PASAPORTES GROUPED */}
          <section id="pasaportes">
            <SectionTitle title="Módulos Pasaporte" subtitle="Acceso a sesiones de formación regular" />
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden p-6 lg:p-10">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                  <Video className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-slate-900">Sesiones Pasaporte</h3>
                  <p className="text-sm text-slate-500 font-medium">Los miércoles y jueves se alternan cada semana.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PASAPORTE_LINKS.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-3 p-5 bg-gray-50 hover:bg-red-50 rounded-3xl transition-all group border border-transparent hover:border-red-100">
                     <span className="text-[10px] font-black text-[#cf202e] uppercase tracking-widest">{link.frequency}</span>
                     <h4 className="font-black text-slate-800 text-lg group-hover:text-[#cf202e] transition-colors">{link.name}</h4>
                     <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                           <Clock size={12} /> {link.time}
                        </span>
                        <ArrowRight size={16} className="text-gray-300 group-hover:text-[#cf202e] transition-colors" />
                     </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3">
                 <HelpCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                 <p className="text-[11px] text-orange-700 font-bold leading-relaxed">
                   IMPORTANTE: Consulta el calendario de abajo para confirmar qué día corresponde esta semana (miércoles o jueves). El martes es sesión fija semanal.
                 </p>
              </div>
            </div>
          </section>

          {/* CALENDARIO */}
          <section id="calendario">
            <div className="flex justify-between items-center mb-6">
              <SectionTitle title="Calendario Visual" />
              <div className="bg-[#cf202e]/5 text-[#cf202e] text-[10px] font-black tracking-widest px-4 py-2 rounded-xl uppercase">
                 {currentMonth}
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden">
               <div className="grid grid-cols-7 border-b border-gray-50 bg-gray-50/50">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
                    <div key={d} className="py-4 text-center text-[10px] font-black text-gray-400">{d}</div>
                  ))}
               </div>
               <div className="grid grid-cols-7 h-[400px]">
                  {Array.from({ length: 31 }).map((_, i) => {
                    const day = i + 1;
                    const event = CALENDAR_EVENTS.find(e => parseInt(e.date.split('-')[2]) === day);
                    return (
                      <div key={i} className={`border-r border-b border-gray-50 p-2 relative group flex flex-col items-center justify-center transition-all ${event ? 'bg-[#cf202e]/5' : ''}`}>
                        <span className={`text-[10px] font-black ${event ? 'text-[#cf202e]' : 'text-gray-300'}`}>{day}</span>
                        {event && (
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${event.type === 'training' ? 'bg-[#cf202e]' : 'bg-slate-900'}`}></div>
                        )}
                        {event && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/95 transition-opacity">
                             <p className="text-[8px] font-black text-center px-1 text-slate-800 line-clamp-2">{event.name}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
               </div>
            </div>
          </section>
        </div>

        {/* DERECHA: WEBINAR, LINKS & BOT (5 cols) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
          
          {/* WEBINAR DESTACADO */}
          <section id="webinar">
            <SectionTitle title="Formación Especializada" />
            <a href={WEBINAR_LINK.url} target="_blank" rel="noopener noreferrer" className="group relative block bg-[#cf202e] rounded-[2.5rem] p-8 lg:p-10 shadow-xl hover:-translate-y-1 transition-all">
               <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                     <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <MonitorPlay className="w-8 h-8" />
                     </div>
                     <span className="px-3 py-1 bg-white/10 text-white text-[9px] font-black tracking-widest uppercase rounded-full">Webinar Semanal</span>
                  </div>
                  <div>
                     <h3 className="text-white font-black text-2xl mb-1">{WEBINAR_LINK.name}</h3>
                     <p className="text-white/70 text-sm font-medium">{WEBINAR_LINK.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                     <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest">
                        <Clock size={14} className="text-white/50" /> {WEBINAR_LINK.time}
                     </div>
                     <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" />
                  </div>
               </div>
               {/* Pattern */}
               <div className="absolute top-0 right-0 p-10 opacity-10">
                  <MonitorPlay className="w-40 h-40 text-white" />
               </div>
            </a>
          </section>

          {/* OTROS LINKS */}
          <section id="recursos">
            <SectionTitle title="Recursos & Podcast" />
            <div className="grid grid-cols-1 gap-3">
              {EXTRA_LINKS.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-3xl hover:shadow-lg transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-[#cf202e]/10 group-hover:text-[#cf202e] transition-all">
                         {link.icon}
                      </div>
                      <span className="font-black text-slate-800 text-sm">{link.name}</span>
                   </div>
                   <ExternalLink size={16} className="text-gray-300 group-hover:text-[#cf202e] transition-colors" />
                </a>
              ))}
            </div>
          </section>

          {/* SOPORTE IA (BNI CHATBOT) */}
          <section id="soporte">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden group">
               <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-[#cf202e] flex items-center justify-center text-white">
                        <Bot className="w-7 h-7" />
                     </div>
                     <div>
                        <h4 className="text-white font-black text-lg">Asistente BNI IA</h4>
                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Resolución Operativa</p>
                     </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                     ¿Dudas sobre eventos o salas? Pregunta a nuestro asistente inteligente para asistencia inmediata.
                  </p>
                  <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                     <HelpCircle size={16} className="text-[#cf202e]" /> Empezar Chat
                  </button>
               </div>
               <div className="absolute bottom-[-10%] right-[-10%] opacity-10">
                  <HelpCircle className="w-40 h-40 text-white" />
               </div>
            </div>
          </section>

        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100 mt-12">
         <div className="flex items-center gap-4 grayscale opacity-40">
            <img src="/logo_sin_fondo.png" alt="" className="h-8" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
               &copy; 2026 BNI Andalucía Occidental · SeviAI Ecosystem
            </p>
         </div>
         <div className="flex gap-8">
            <a href="#" className="text-[9px] font-bold text-gray-400 hover:text-[#cf202e] transition-colors uppercase tracking-widest">Privacidad</a>
            <a href="#" className="text-[9px] font-bold text-gray-400 hover:text-[#cf202e] transition-colors uppercase tracking-widest">Legal</a>
         </div>
      </footer>

    </div>
  );
};

export default HubApp;
