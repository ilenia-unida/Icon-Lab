import React, { useState } from 'react';
import { useIconEditor } from './hooks/useIconEditor';
import {
  Layers, Layout, Palette, Maximize, Settings, Download, Copy, Check, Image as ImageIcon,
  User, Heart, Star, Bell, Camera, Mail, MapPin, Search, Trash2, Plus, Moon, Share2,
  MessageSquare, Shield, Zap, Cloud, Type, Wind, Activity, RotateCcw, RotateCw, Code, X,
  Briefcase, Gift, Home, Monitor, Smartphone, Terminal, Wrench, ZapOff, Fingerprint, Database, Cpu
} from 'lucide-react';

// 35 ICONE ESATTE - HO SOSTITUITO TOOL CON WRENCH PER IL BUILD
const iconList = {
  Layers, Layout, Palette, Maximize, Settings, ImageIcon, User, Heart, Star, Bell,
  Camera, Mail, MapPin, Search, Trash2, Plus, Moon, Share2, MessageSquare, Shield,
  Zap, Cloud, Type, Wind, Activity, Home, Briefcase, Gift, Monitor, Smartphone,
  Terminal, Wrench, ZapOff, Fingerprint, Database, Cpu
};

const App: React.FC = () => {
  const { state, set, undo, redo, canUndo, canRedo, handleDownload, getSvgString } = useIconEditor();
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useBackground, setUseBackground] = useState(false);

  const IconComponent = iconList[state.selectedIcon as keyof typeof iconList];

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans bg-white">
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#f8fafc] flex flex-col h-full border-r border-slate-200 z-30 shadow-2xl">
        <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">

          <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <h1 className="font-black text-sm tracking-tighter text-slate-800 uppercase italic text-cyan-600">Icon Lab Pro</h1>
            <div className="flex gap-1">
              <button onClick={undo} disabled={!canUndo} className="p-1.5 hover:bg-slate-50 rounded-lg disabled:opacity-20"><RotateCcw size={14} /></button>
              <button onClick={redo} disabled={!canRedo} className="p-1.5 hover:bg-slate-50 rounded-lg disabled:opacity-20"><RotateCw size={14} /></button>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Slicers</h2>

            <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-slate-400">Tratto</span>
                <span className="text-cyan-600 font-mono">{state.strokeWidth}px</span>
              </div>
              <input type="range" min="0.5" max="4" step="0.1" value={state.strokeWidth} onChange={(e) => set({ strokeWidth: parseFloat(e.target.value) })} className="w-full accent-cyan-500" />
            </div>

            <div className={`p-4 bg-white rounded-2xl border border-slate-100 space-y-3 transition-opacity ${!useBackground ? 'opacity-30' : ''}`}>
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-slate-400">Angoli</span>
                <span className="text-cyan-600 font-mono">{state.borderRadius}px</span>
              </div>
              <input type="range" min="0" max="256" value={state.borderRadius} onChange={(e) => set({ borderRadius: parseInt(e.target.value) })} disabled={!useBackground} className="w-full accent-cyan-500" />
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-slate-400">Dimensione</span>
                <span className="text-cyan-600 font-mono">{state.iconSize}px</span>
              </div>
              <input type="range" min="16" max="512" value={state.iconSize} onChange={(e) => set({ iconSize: parseInt(e.target.value) })} className="w-full accent-cyan-500" />
            </div>

            <button onClick={() => setUseBackground(!useBackground)} className={`w-full py-3 rounded-xl text-[10px] font-bold uppercase transition-all border ${useBackground ? 'bg-cyan-500 text-white border-cyan-600 shadow-lg shadow-cyan-100' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}>
              {useBackground ? 'Sfondo: ON' : 'Sfondo: OFF (Trasparente)'}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 text-center">
                <span className="text-[8px] font-bold text-slate-400 uppercase block">Icona</span>
                <input type="color" value={state.iconColor} onChange={(e) => set({ iconColor: e.target.value })} className="w-full h-10 rounded-xl cursor-pointer bg-white border border-slate-200" />
              </div>
              <div className={`space-y-1 text-center transition-opacity ${!useBackground ? 'opacity-20' : ''}`}>
                <span className="text-[8px] font-bold text-slate-400 uppercase block">Sfondo</span>
                <input type="color" value={state.backgroundColor} onChange={(e) => set({ backgroundColor: e.target.value })} disabled={!useBackground} className="w-full h-10 rounded-xl cursor-pointer bg-white border border-slate-200" />
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(iconList).map((name) => {
                const IconItem = iconList[name as keyof typeof iconList];
                return (
                  <button key={name} onClick={() => set({ selectedIcon: name })} className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${state.selectedIcon === name ? 'bg-cyan-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}><IconItem size={18} /></button>
                );
              })}
            </div>
          </section>

          <div className="pt-4 space-y-3">
            <button onClick={handleDownload} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 shadow-xl transition-transform active:scale-95"><Download size={18} className="text-cyan-400" /> Esporta SVG</button>
            <button onClick={() => setShowCode(true)} className="w-full bg-white border border-slate-200 text-slate-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 shadow-sm"><Code size={18} /> Vedi Codice</button>
          </div>
        </div>
      </aside>

      {/* VIEWPORT ORIGINALE */}
      <main className="flex-1 flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, #fff0f7 0%, #f0f7ff 100%)' }}>
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#475569 1.2px, transparent 1.2px)', backgroundSize: '32px 32px' }}></div>

        <div className={`transition-all duration-300 ${state.shadow ? 'drop-shadow-[0_45px_90px_rgba(0,0,0,0.18)]' : ''}`}>
          <svg id="preview-svg" width={state.iconSize} height={state.iconSize} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              width="512" height="512"
              fill={useBackground ? state.backgroundColor : 'transparent'}
              rx={state.type === 'circle' ? 256 : state.type === 'rounded' ? state.borderRadius : 0}
            />
            <g transform="translate(102.4, 102.4)">
              <IconComponent
                size={307.2}
                color={state.iconColor}
                stroke={state.iconColor}
                strokeWidth={state.strokeWidth}
              />
            </g>
          </svg>
        </div>

        {/* MODALE CODICE */}
        {showCode && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-12">
            <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
              <div className="p-6 border-b flex justify-between items-center px-10">
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">SVG Source Code</span>
                <button onClick={() => setShowCode(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
              </div>
              <div className="p-10 overflow-auto flex-1 bg-white">
                <pre className="bg-slate-900 text-cyan-400 p-8 rounded-3xl text-[11px] font-mono leading-relaxed whitespace-pre-wrap break-all shadow-inner">
                  {getSvgString()}
                </pre>
              </div>
              <div className="p-6 border-t flex justify-end px-10">
                <button onClick={() => { navigator.clipboard.writeText(getSvgString()); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="bg-cyan-500 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-cyan-600 transition-all">
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? 'Copiato' : 'Copia'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;