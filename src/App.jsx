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
  Search,
  Info
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
    frequency: "Sesión Fija Semanal"
  },
  {
    name: "Pasaporte Miércoles",
    time: "10:30 – 11:30",
    url: "https://bnionline.zoom.us/meeting/register/tJMrc-qhpzgqHNRCFyxTpYsdhUSAD8Jv-Eo0",
    frequency: "Semana Alterna (X o J)"
  },
  {
    name: "Pasaporte Jueves",
    time: "16:00 – 17:00",
    url: "https://bnionline.zoom.us/meeting/register/tJEqdO-sqzsqEtI0CBr7bfodpG5-0mlV4NSZ",
    frequency: "Semana Alterna (X o J)"
  }
];

const WEBINAR_LINK = {
  name: "Webinar Formación Canarias",
  time: "Todos los jueves · 20:00h",
  url: "https://bnionline.zoom.us/j/6565739237?pwd=8pCDw2qtZy5x5NEisglph01iqXsLvX.1&omn=94411585737",
  description: "Formación especializada todos los jueves a las 20:00"
};

const EXTRA_LINKS = [
  { name: "Eventos Nacionales", url: "https://bniespanaslc.com/es/eventos", icon: <CalendarIcon className="w-4 h-4" /> },
  { name: "Eventos Regionales", url: "https://bniespanaslc.com/es/eventos", icon: <MapPin className="w-4 h-4" /> },
  { name: "Podcasts BNI", url: "https://www.somosbnipodcast.com/", icon: <Mic className="w-4 h-4" /> },
  { name: "PEM Online Access", url: "https://bnionline.zoom.us/j/95759693769?pwd=w365jmDRu139B4jqtscaIgFTABamA2.1", icon: <GraduationCap className="w-4 h-4" /> },
];

const CALENDAR_DATA = {
  2: [ // Marzo
    { day: 10, name: 'Pasaporte 19:00', type: 'training' },
    { day: 11, name: 'Pasaporte 10:30', type: 'training' },
    { day: 12, name: 'T. Mercado Objetivo 12:00', type: 'special' },
    { day: 17, name: 'Pasaporte 19:00', type: 'training' },
    { day: 18, name: 'T. Pet. Específicas 17:00', type: 'special' },
    { day: 19, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 24, name: 'Pasaporte 19:00', type: 'training' },
    { day: 25, name: 'Pasaporte 10:30', type: 'training' },
    { day: 26, name: 'Networking / Online 20:00', type: 'multi' },
    { day: 27, name: 'PEM Online 11:00', type: 'pem' },
  ],
  3: [ // Abril
    { day: 1, name: 'Semana Santa', type: 'holiday' },
    { day: 2, name: 'Semana Santa', type: 'holiday' },
    { day: 3, name: 'Semana Santa', type: 'holiday' },
    { day: 4, name: 'Semana Santa', type: 'holiday' },
    { day: 5, name: 'Semana Santa', type: 'holiday' },
    { day: 6, name: 'Lunes de Pascua', type: 'holiday' },
    { day: 7, name: 'Pasaporte 19:00', type: 'training' },
    { day: 8, name: 'Pasaporte 10:30 / Connect 15:00', type: 'multi' },
    { day: 9, name: 'PEN 16:00 / Online 20:00', type: 'multi' },
    { day: 10, name: 'Cert. Mentores 12:00', type: 'special' },
    { day: 13, name: 'Reunión DyE 16:00', type: 'special' },
    { day: 14, name: 'Pasaporte 19:00', type: 'training' },
    { day: 15, name: 'Foro ONe / Mercado Obj. 12:00', type: 'multi' },
    { day: 16, name: 'Foro ONe / Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 21, name: 'T. 1a1 16:00 / Pasaporte 19:00', type: 'multi' },
    { day: 22, name: 'Pasaporte 10:30', type: 'training' },
    { day: 23, name: 'Formación Online 20:00', type: 'special' },
    { day: 28, name: 'T. Esferas / Pasaporte 19:00', type: 'multi' },
    { day: 30, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
  ],
  4: [ // Mayo
    { day: 1, name: 'Fiesta del Trabajo', type: 'holiday' },
    { day: 3, name: 'Día de la Madre', type: 'holiday' },
    { day: 5, name: 'Pasaporte 19:00', type: 'training' },
    { day: 6, name: 'Pasaporte 10:30 / PEN 16:00', type: 'multi' },
    { day: 7, name: 'T. Pet. Específicas / Online 20:00', type: 'multi' },
    { day: 12, name: 'T. Ponencias / Pasaporte 19:00', type: 'multi' },
    { day: 13, name: 'Cert. Mentores 16:00', type: 'special' },
    { day: 14, name: 'Connect 12:00 / Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 19, name: 'Pasaporte 19:00', type: 'training' },
    { day: 20, name: 'Pasaporte 10:30', type: 'training' },
    { day: 21, name: 'Mercado Obj. 16:00 / Online 20:00', type: 'multi' },
    { day: 26, name: 'Pasaporte 19:00', type: 'training' },
    { day: 28, name: 'Convención Nal. / Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 29, name: 'Convención Nacional', type: 'highlight' },
  ],
  5: [ // Junio
    { day: 2, name: 'Cert. Mentores 12:00 / Pasaporte 19:00', type: 'multi' },
    { day: 3, name: 'Pasaporte 10:30 / PEN 12:00', type: 'multi' },
    { day: 4, name: 'Formación Online 20:00', type: 'special' },
    { day: 9, name: 'Connect 15:00 / Pasaporte 19:00', type: 'multi' },
    { day: 10, name: 'Cert. Mentores 12:00 / T. 1a1 16:00', type: 'multi' },
    { day: 11, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 12, name: 'DAS-CONECTA', type: 'highlight' },
    { day: 16, name: 'Pasaporte 19:00', type: 'training' },
    { day: 17, name: 'Pasaporte 10:30', type: 'training' },
    { day: 18, name: 'Formación Online 20:00', type: 'special' },
    { day: 19, name: 'Foro ONe', type: 'highlight' },
    { day: 23, name: 'Pasaporte 19:00', type: 'training' },
    { day: 25, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 30, name: 'T. Planif. Metas 16:00 / Pasaporte 19:00', type: 'multi' },
  ],
  6: [ // Julio
    { day: 1, name: 'Pasaporte 10:30', type: 'training' },
    { day: 2, name: 'PEN 16:00 / Online 20:00', type: 'multi' },
    { day: 7, name: 'Cert. Mentores 12:00 / Pasaporte 19:00', type: 'multi' },
    { day: 8, name: 'BNI Connect 15:00', type: 'special' },
    { day: 9, name: 'Mercado Obj. 12:00 / Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 14, name: 'Pasaporte 19:00', type: 'training' },
    { day: 15, name: 'Pasaporte 10:30 / Foro ONe Summer', type: 'multi' },
    { day: 16, name: 'Foro ONe Summer / Online 20:00', type: 'multi' },
    { day: 17, name: 'Foro Summer Event LPA', type: 'highlight' },
    { day: 21, name: 'Pasaporte 19:00', type: 'training' },
    { day: 22, name: 'Taller Referencias', type: 'special' },
    { day: 23, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 24, name: 'Somos BNI', type: 'highlight' },
    { day: 28, name: 'T. 1a1 16:00 / Pasaporte 19:00', type: 'multi' },
    { day: 29, name: 'Pasaporte 10:30', type: 'training' },
    { day: 30, name: 'Formación Online 20:00', type: 'special' },
  ],
  7: [ // Agosto
    { day: 4, name: 'PEN Online 16:00 / Pasaporte 19:00', type: 'multi' },
    { day: 6, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 13, name: 'Formación Online 20:00', type: 'special' },
    { day: 20, name: 'Formación Online 20:00', type: 'special' },
    { day: 25, name: 'Pasaporte 19:00', type: 'training' },
    { day: 26, name: 'Pasaporte 10:30 / Taller Pet.', type: 'multi' },
    { day: 27, name: 'Formación Online 20:00', type: 'special' },
    { day: 31, name: 'Somos BNI 15:30', type: 'highlight' },
  ],
  8: [ // Septiembre
    { day: 1, name: 'Pasaporte 19:00', type: 'training' },
    { day: 3, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 8, name: 'PEN 16:00 / Pasaporte 19:00', type: 'multi' },
    { day: 9, name: 'Pasaporte 10:30', type: 'training' },
    { day: 10, name: 'Networking / Online 20:00', type: 'multi' },
    { day: 15, name: 'Connect 15:00 / Pasaporte 19:00', type: 'multi' },
    { day: 17, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 18, name: 'Somos BNI', type: 'highlight' },
    { day: 22, name: 'Mercado Obj. 16:00 / Pasaporte 19:00', type: 'multi' },
    { day: 23, name: 'Pasaporte 10:30', type: 'training' },
    { day: 24, name: 'Formación Online 20:00', type: 'special' },
    { day: 28, name: 'Somos BNI 15:30', type: 'highlight' },
    { day: 29, name: 'Taller 1a1 16:00 / Pasaporte 19:00', type: 'multi' },
  ],
  9: [ // Octubre
    { day: 1, name: 'EXPO BNI / Pasaporte / Online', type: 'multi' },
    { day: 2, name: 'EXPO BNI (LVS, ANDOCC)', type: 'highlight' },
    { day: 6, name: 'Pasaporte 19:00', type: 'training' },
    { day: 7, name: 'Pasaporte 10:30', type: 'training' },
    { day: 8, name: 'Tally Pet. / Online 20:00', type: 'multi' },
    { day: 12, name: 'Fiesta Nacional', type: 'holiday' },
    { day: 13, name: 'Connect 12:00 / Pasaporte 19:00', type: 'multi' },
    { day: 14, name: 'Ponencias Especiales', type: 'special' },
    { day: 15, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 16, name: 'EXPO BNI', type: 'highlight' },
    { day: 20, name: 'Pasaporte 19:00', type: 'training' },
    { day: 21, name: 'Pasaporte 10:30', type: 'training' },
    { day: 22, name: 'Formación Online 20:00', type: 'special' },
    { day: 23, name: 'EXPO BNI', type: 'highlight' },
    { day: 27, name: 'ND Summit / Pasaporte 19:00', type: 'multi' },
    { day: 28, name: 'Global Con.', type: 'highlight' },
    { day: 29, name: 'Global Con. / Pasaporte / Online', type: 'multi' },
    { day: 30, name: 'Global Con. / Mercado Obj.', type: 'multi' },
  ],
  10: [ // Noviembre
    { day: 1, name: 'Todos los Santos', type: 'holiday' },
    { day: 2, name: 'Somos BNI 15:30', type: 'highlight' },
    { day: 3, name: 'PEN 16:00 / Pasaporte 19:00', type: 'multi' },
    { day: 4, name: 'Pasaporte 10:30 / Cert. Mentores', type: 'multi' },
    { day: 5, name: 'Formación Online 20:00', type: 'special' },
    { day: 6, name: 'EXPO CAT', type: 'highlight' },
    { day: 10, name: 'Connect 15:00 / Pasaporte 19:00', type: 'multi' },
    { day: 11, name: 'Taller 1a1 16:00', type: 'special' },
    { day: 12, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 13, name: 'Cena de Gala BNI', type: 'highlight' },
    { day: 17, name: 'T. Pet / Pasaporte 19:00', type: 'multi' },
    { day: 18, name: 'Pasaporte 10:30', type: 'training' },
    { day: 19, name: 'Cena de Gala / Online 20:00', type: 'multi' },
    { day: 20, name: 'Cena de Gala BNI', type: 'highlight' },
    { day: 24, name: 'Mod A / Pasaporte 19:00', type: 'multi' },
    { day: 25, name: 'Taller Esferas 16:00', type: 'special' },
    { day: 26, name: 'Powercamp / Pasaporte / Online', type: 'multi' },
    { day: 27, name: 'Somos BNI Powercamp', type: 'highlight' },
  ],
  11: [ // Diciembre
    { day: 1, name: 'Pasaporte 19:00', type: 'training' },
    { day: 2, name: 'Pasaporte 10:30 / PEN 16:00', type: 'multi' },
    { day: 3, name: 'Formación Online 20:00', type: 'special' },
    { day: 4, name: 'Cena de Gala BNI', type: 'highlight' },
    { day: 6, name: 'Día de la Constitución', type: 'holiday' },
    { day: 8, name: 'Inmaculada Concepción', type: 'holiday' },
    { day: 9, name: 'Connect 12:00 / Mercado Obj.', type: 'multi' },
    { day: 10, name: 'Pasaporte 16:00 / Online 20:00', type: 'multi' },
    { day: 14, name: 'Somos BNI 15:30', type: 'highlight' },
    { day: 15, name: 'Cert. Mentores', type: 'special' },
    { day: 16, name: 'Pasaporte 10:30', type: 'training' },
    { day: 17, name: 'Formación Online 20:00', type: 'special' },
    { day: 18, name: 'Cena de empresa', type: 'highlight' },
    { day: 22, name: 'Pasaporte 19:00', type: 'training' },
    { day: 24, name: 'Nochebuena', type: 'holiday' },
    { day: 25, name: 'Navidad', type: 'holiday' },
    { day: 31, name: 'Nochevieja', type: 'holiday' },
  ]
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

  // Lógica de Calendario Dinámico (Alineación corregida)
  const calendarCells = useMemo(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay(); // 0=Dom, 1=Lun...
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Alineación a Lunes
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    
    const cells = [];
    for (let i = 0; i < startOffset; i++) {
        cells.push({ day: null });
    }
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
            <div className="hidden sm:block text-left">
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
        <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50 shadow-md">
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
        
        {/* IZQUIERDA: CALENDARIO & PASAPORTES (7 cols) */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-10">
          
           {/* CALENDARIO */}
           <section id="calendario">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <SectionTitle title="Calendario Visual" subtitle="Confirmación de sesiones y eventos regionales" />
              
              <div className="flex items-center bg-white border border-gray-100 rounded-2xl p-1.5 shadow-xl shadow-red-500/5">
                <button onClick={prevMonth} className="p-3 hover:bg-red-50 text-gray-400 hover:text-[#cf202e] rounded-xl transition-all"><ChevronLeft size={20} /></button>
                <div className="px-6 flex flex-col items-center min-w-[140px]">
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#cf202e]">{selectedYear}</span>
                   <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">{MONTHS[selectedMonth]}</span>
                </div>
                <button onClick={nextMonth} className="p-3 hover:bg-red-50 text-gray-400 hover:text-[#cf202e] rounded-xl transition-all"><ChevronRight size={20} /></button>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden p-3 lg:p-6">
               <div className="grid grid-cols-7 mb-4">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
                    <div key={d} className="py-2 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest">{d}</div>
                  ))}
               </div>
               <div className="grid grid-cols-7 gap-1 md:gap-2">
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
                            <div className={`w-1.5 h-1.5 rounded-full ${
                               cell.event.type === 'pem' ? 'bg-orange-500' :
                               cell.event.type === 'highlight' ? 'bg-orange-500' : 'bg-slate-900'
                            }`}></div>
                          )}
                          {cell.event && (
                            <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-all border border-[#cf202e]/20 z-10">
                               <p className="text-[8px] font-black text-center text-slate-800 leading-tight uppercase">{cell.event.name}</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
               </div>
               <div className="mt-8 flex justify-center gap-6 border-t border-gray-50 pt-6">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#cf202e]"></div>
                     <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Formación</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Festivos</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                     <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Eventos</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                     <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">PEM</span>
                  </div>
               </div>
            </div>
          </section>

          {/* PASAPORTES GROUPED */}
          <section id="pasaportes">
            <SectionTitle title="Módulos Pasaporte" />
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden p-6 lg:p-10">
              
              <div className="bg-red-50 border border-red-100 rounded-3xl p-6 mb-8 flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-[#cf202e] flex items-center justify-center text-white shrink-0">
                    <Info size={24} />
                 </div>
                 <div className="text-left">
                    <h4 className="text-[#cf202e] font-black text-sm uppercase tracking-widest mb-1 text-left">Rotación Semanal</h4>
                    <p className="text-slate-600 text-[13px] leading-relaxed font-bold italic text-left">
                      Todos los <span className="text-slate-900">martes</span> hay Pasaporte fijo. La segunda sesión semanal se va alternando: una semana el miércoles y otra el jueves. Por favor, consulta arriba el calendario para confirmar qué día corresponde esta semana.
                    </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PASAPORTE_LINKS.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-3 p-5 bg-gray-50 hover:bg-red-50 rounded-3xl transition-all group border border-transparent hover:border-red-100 text-left">
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

        {/* DERECHA: WEBINAR & LINKS (5 cols) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
          
          {/* WEBINAR DESTACADO */}
          <section id="webinar">
            <SectionTitle title="Webinar Jueves" />
            <a href={WEBINAR_LINK.url} target="_blank" rel="noopener noreferrer" className="group relative block bg-[#cf202e] rounded-[2.5rem] p-8 lg:p-10 shadow-xl hover:-translate-y-1 transition-all">
               <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                     <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <MonitorPlay className="w-8 h-8" />
                     </div>
                     <span className="px-3 py-1 bg-white/10 text-white text-[9px] font-black tracking-widest uppercase rounded-full">Formación Semanal</span>
                  </div>
                  <div className="text-left">
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
               <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                  <MonitorPlay className="w-40 h-40 text-white" />
               </div>
            </a>
          </section>

          {/* OTROS LINKS */}
          <section id="recursos">
            <SectionTitle title="Recursos Externos" />
            <div className="grid grid-cols-1 gap-3">
              {EXTRA_LINKS.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-3xl hover:shadow-lg transition-all group">
                   <div className="flex items-center gap-4 text-left">
                      <div className="w-11 h-11 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-[#cf202e]/10 group-hover:text-[#cf202e] transition-all">
                         {link.icon}
                      </div>
                      <span className="font-black text-slate-800 text-sm">{link.name}</span>
                   </div>
                   <ExternalLink size={16} className="text-gray-300 group-hover:text-[#cf202e] transition-colors" />
                </a>
              ))}
              
              <a href="https://www.google.com/maps/search/PIBO,+Ed+Emporio,+Rda.+Sanl%C3%BAcar+la+Mayor,+1,+41110,+Sevilla,+Bollullos+de+la+Mitaci%C3%B3n/@37.3546883,-6.1441209,16z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-3xl hover:shadow-lg transition-all group">
                   <div className="flex items-center gap-4 text-left">
                      <div className="w-11 h-11 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-orange-500/10 group-hover:text-orange-600 transition-all">
                         <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-black text-slate-800 text-sm">PEM presencial</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Edificio Emporio Parque Industrial PIBO, 41110, Sevilla</span>
                      </div>
                   </div>
                   <ExternalLink size={16} className="text-gray-300 group-hover:text-orange-600 transition-colors" />
              </a>
            </div>
          </section>

          {/* INFO BOTPREP (Resumen sutil) */}
          <div className="p-8 bg-slate-900 rounded-[3rem] text-left border border-slate-800 shadow-xl overflow-hidden relative">
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <HelpCircle size={20} />
                   </div>
                   <h5 className="text-white font-black text-sm uppercase tracking-widest">¿Dudas? Usa el Chat</h5>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                   Usa el chat interactivo en la burbuja inferior derecha para resolver dudas técnicas sobre las salas o el calendario regional.
                </p>
             </div>
             <div className="absolute top-[-20%] right-[-10%] opacity-[0.03] pointer-events-none">
                <img src="/logo_bni.png" alt="" className="w-60 h-auto grayscale invert" />
             </div>
          </div>

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
