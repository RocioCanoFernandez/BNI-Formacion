import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
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
  MonitorPlay,
  Search
} from 'lucide-react';

// --- CONFIGURACIÓN DE CONTENIDO ---
const HUB_NAME = "Hub de Formación";
const HUB_SUBTITLE = "Oficina Regional BNI Andalucía Occidental";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

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

const EXTRA_LINKS = [
  { name: "Eventos Nacionales", url: "https://bniespanaslc.com/es/eventos", icon: <CalendarIcon className="w-4 h-4" /> },
  { name: "Eventos Regionales", url: "https://bniespanaslc.com/es/eventos", icon: <MapPin className="w-4 h-4" /> },
  { name: "Podcasts BNI", url: "https://www.somosbnipodcast.com/", icon: <Mic className="w-4 h-4" /> },
  { name: "PEM Online Access", url: "https://bnionline.zoom.us/j/95759693769?pwd=w365jmDRu139B4jqtscaIgFTABamA2.1", icon: <GraduationCap className="w-4 h-4" /> },
];

const CALENDAR_DATA = {
  2: [ // Marzo (0-indexed: 2)
    { day: 10, name: 'Pasaporte 19:00', type: 'training' },
    { day: 11, name: 'Pasaporte 10:30', type: 'training' },
    { day: 12, name: 'T. Mercado Objetivo 12:00', type: 'special' },
    { day: 17, name: 'Pasaporte 19:00', type: 'training' },
    { day: 18, name: 'T. Pet. Específicas 17:00', type: 'special' },
    { day: 19, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 20, name: 'PEN 12:00', type: 'highlight' },
    { day: 24, name: 'Pasaporte 19:00', type: 'training' },
    { day: 25, name: 'Pasaporte 10:30', type: 'training' },
    { day: 26, name: 'Networking / Online 20:00', type: 'multi' },
  ],
  // Otros meses se pueden poblar aquí...
};

// --- COMPONENTES ---

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
    {subtitle && <p className="text-sm text-slate-500 font-medium">{subtitle}</p>}
  </div>
);

const HubApp = () => {
  const [selectedMonth, setSelectedMonth] = useState(2); // Marzo por defecto
  const [selectedYear] = useState(2026);
  const [isSearching, setIsSearching] = useState(false);

  // Lógica de Calendario Dinámico
  const calendarCells = useMemo(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay(); // 0=Dom, 1=Lun...
    // Convertir a L=0, M=1... D=6
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    
    const cells = [];
    // Celdas vacías al inicio
    for (let i = 0; i < startOffset; i++) {
      cells.push({ day: null });
    }
    // Días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      const event = (CALENDAR_DATA[selectedMonth] || []).find(e => e.day === i);
      cells.push({ day: i, event });
    }
    return cells;
  }, [selectedMonth, selectedYear]);

  const nextMonth = () => setSelectedMonth((m) => (m + 1) % 12);
  const prevMonth = () => setSelectedMonth((m) => (m - 1 + 12) % 12);

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
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setIsSearching(!isSearching)}
                className="p-3 bg-gray-50 text-slate-400 hover:text-[#cf202e] rounded-full transition-all"
             >
                <Search size={20} />
             </button>
             <div className="px-5 py-2 rounded-full bg-[#cf202e] text-white text-[10px] font-black tracking-widest uppercase shadow-lg shadow-red-200">
                Oficina Regional
             </div>
          </div>
        </div>
      </header>

      {/* MES SELECTOR (SEARCH) */}
      {isSearching && (
        <div className="bg-white border-b border-gray-100 p-4">
           <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
              {MONTHS.map((m, idx) => (
                <button 
                  key={m}
                  onClick={() => { setSelectedMonth(idx); setIsSearching(false); }}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    selectedMonth === idx ? 'bg-[#cf202e] text-white' : 'bg-gray-50 text-gray-400 hover:bg-red-50'
                  }`}
                >
                  {m}
                </button>
              ))}
           </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* IZQUIERDA: CALENDARIO & RECURSOS (7 cols) */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-10">
          
           {/* CALENDARIO */}
           <section id="calendario">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <SectionTitle title="Calendario Visual" subtitle="Confirmación de sesiones alternas y eventos" />
              
              <div className="flex items-center bg-white border border-gray-100 rounded-2xl p-1.5 shadow-xl shadow-red-500/5">
                <button onClick={prevMonth} className="p-3 hover:bg-red-50 text-gray-400 hover:text-[#cf202e] rounded-xl transition-all"><ChevronLeft size={20} /></button>
                <div className="px-6 flex flex-col items-center min-w-[140px]">
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#cf202e]">{selectedYear}</span>
                   <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">{MONTHS[selectedMonth]}</span>
                </div>
                <button onClick={nextMonth} className="p-3 hover:bg-red-50 text-gray-400 hover:text-[#cf202e] rounded-xl transition-all"><ChevronRight size={20} /></button>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden p-4 lg:p-6">
               <div className="grid grid-cols-7 mb-4">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
                    <div key={d} className="py-4 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest">{d}</div>
                  ))}
               </div>
               <div className="grid grid-cols-7 auto-rows-[1fr] gap-1 md:gap-2">
                  {calendarCells.map((cell, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square sm:aspect-auto sm:h-24 md:h-28 border border-gray-50 rounded-2xl p-2 relative group transition-all flex flex-col items-center justify-center ${
                         cell.event ? 'bg-[#cf202e]/5 border-[#cf202e]/10' : 'bg-gray-50/20'
                      } ${!cell.day ? 'opacity-0 pointer-events-none' : 'hover:shadow-md'}`}
                    >
                      {cell.day && (
                        <>
                          <span className={`text-[11px] font-black mb-1 ${cell.event ? 'text-[#cf202e]' : 'text-slate-400'}`}>{cell.day}</span>
                          {cell.event && (
                            <div className={`w-1.5 h-1.5 rounded-full ${cell.event.type === 'training' ? 'bg-[#cf202e]' : cell.event.type === 'highlight' ? 'bg-orange-500' : 'bg-slate-900'}`}></div>
                          )}
                          {cell.event && (
                            <div className="hidden md:flex absolute inset-0 bg-white/95 rounded-2xl flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity border border-[#cf202e]/20">
                               <p className="text-[9px] font-black text-center text-slate-800 leading-tight uppercase">{cell.event.name}</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
               </div>
               
               {/* Leyenda sutil */}
               <div className="mt-8 flex justify-center gap-6 border-t border-gray-50 pt-6">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#cf202e]"></div>
                     <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Pasaporte</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                     <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Otros Eventos</span>
                  </div>
               </div>
            </div>
          </section>

          {/* PASAPORTES GROUPED */}
          <section id="pasaportes">
            <SectionTitle title="Módulos Pasaporte" />
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden p-6 lg:p-10">
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
            </div>
          </section>

        </div>

        {/* DERECHA: WEBINAR, LINKS & INFO (5 cols) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
          
          {/* WEBINAR DESTACADO */}
          <section id="webinar">
            <SectionTitle title="Webinar Todos los Jueves" />
            <a href={WEBINAR_LINK.url} target="_blank" rel="noopener noreferrer" className="group relative block bg-[#cf202e] rounded-[2.5rem] p-8 lg:p-10 shadow-xl hover:-translate-y-1 transition-all">
               <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                     <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <MonitorPlay className="w-8 h-8" />
                     </div>
                     <span className="px-3 py-1 bg-white/10 text-white text-[9px] font-black tracking-widest uppercase rounded-full">Webinar Formación</span>
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

          {/* INFO SECTION (En lugar del chatbot embebido) */}
          <section id="soporte-info">
             <div className="bg-slate-900 rounded-[3rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-[#cf202e] flex items-center justify-center text-white">
                         <Bot className="w-6 h-6" />
                      </div>
                      <h4 className="text-white font-black text-lg">Asistencia Operativa</h4>
                   </div>
                   <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      ¿Necesitas ayuda con las salas o materiales? Usa el chat de soporte flotante para hablar con nuestro asistente inteligente.
                   </p>
                   <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#cf202e]">Servicio de Soporte</p>
                      <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-tighter italic">ID Cliente: 6d43ea41-cbdb-4079-aea5-e28e6c9dccd2</p>
                   </div>
                </div>
             </div>
          </section>

        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100 mt-12">
         <div className="flex items-center gap-4 grayscale opacity-40">
            <img src="/logo_sin_fondo.png" alt="" className="h-8" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
               &copy; 2026 BNI Andalucía Occidental · SeviAI Ecosystem
            </p>
         </div>
      </footer>

    </div>
  );
};

export default HubApp;
