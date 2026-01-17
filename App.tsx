import React, { useState } from 'react';
import { useIconEditor } from './hooks/useIconEditor';
import {
  Layers, Layout, Palette, Maximize, Settings, Download, Copy, Check, Image as ImageIcon,
  User, Heart, Star, Bell, Camera, Mail, MapPin, Search, Trash2, Plus, Moon, Share2,
  MessageSquare, Shield, Zap, Cloud, Type, Wind, Activity, RotateCcw, RotateCw, Code, X,
  Briefcase, Gift, Home, Monitor, Smartphone, Terminal, Tool, ZapOff, Fingerprint, Database
} from 'lucide-react';

// 35 Icone per una griglia 5x7 perfetta senza buchi
const iconList = {
  Layers, Layout, Palette, Maximize, Settings, ImageIcon, User, Heart, Star, Bell,
  Camera, Mail, MapPin, Search, Trash2, Plus, Moon, Share2, MessageSquare, Shield,
  Zap, Cloud, Type, Wind, Activity, Home, Briefcase, Gift, Monitor, Smartphone,
  Terminal, Tool, ZapOff, Fingerprint, Database
};

const App: React.FC = () => {
  const { state, set, undo, redo, canUndo, canRedo, handleDownload, getSvgString } = useIconEditor();
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const IconComponent = iconList[state.selectedIcon as keyof typeof iconList];

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans bg-[#f8fafc]">
      {/* SIDEBAR */}
      <aside className="w-85 bg-white flex flex-col h-full border-r border-slate-200 shadow-2xl z-30">
        <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">

          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="bg-cyan-500 p-1.5 rounded-lg shadow-lg shadow-cyan-200">
                <Layers className="text-white w-4 h-4" />
              </div>
              <span className="font-black text-sm tracking-tighter text-slate-800 uppercase italic">Icon Lab Pro</span>
            </div>
            <div className="flex gap-1">
              <button onClick={undo} disabled={!canUndo} className="p-1.5 hover:bg-white rounded-md disabled:opacity-20"><RotateCcw size={14} /></button>
              <button onClick={redo} disabled={!canRedo} className="p-1.5 hover:bg-white rounded-md disabled:opacity-20"><RotateCw size={14} /></button>
            </div>
          </div>

          <section>
            <h2 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Libreria</h2>
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(iconList).map((name) => {
                const IconItem = iconList[name as keyof typeof iconList];
                return (
                  <button key={name} onClick={() => set({ selectedIcon: name })}
                    className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${state.selectedIcon === name ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                    <IconItem size={18} />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Configurazione</h2>

            {/* Slicer Linea */}
            <div className="space-y-2">
              <div className="flex justify-between items-center uppercase text-[9px] font-bold text-slate-500">
                <span>Spessore Linea</span>
                <span className="text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">{state.strokeWidth}px</span>
              </div>
              <input type="range" min="0.5" max="3.5" step="0.1" value={state.strokeWidth} onChange={(e) => set({ strokeWidth: parseFloat(e.target.value) })} className="cyan-slider" />
            </div>

            {/* Slicer Dimensione */}
            <div className="space-y-2">
              <div className="flex justify-between items-center uppercase text-[9px] font-bold text-slate-500">
                <span>Dimensione</span>
                <span className="text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">{state.iconSize}px</span>
              </div>
              <input type="range" min="16" max="420" value={state.iconSize} onChange={(e) => set({ iconSize: parseInt(e.target.value) })} className="cyan-slider" />
            </div>

            {/* Slicer Angoli */}
            <div className="space-y-2">
              <div className="flex justify-between items-center uppercase text-[9px] font-bold text-slate-500">
                <span>Angoli</span>
                <span className="text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">{state.type === 'rounded' ? state.borderRadius : (state.type === 'circle' ? 'MAX' : '0')}</span>
              </div>
              <input type="range" min="0" max="256" value={state.borderRadius} onChange={(e) => set({ borderRadius: parseInt(e.target.value) })} disabled={state.type !== 'rounded'} className={`cyan-slider ${state.type !== 'rounded' ? 'opacity-30' : ''}`} />
            </div>

            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
              {(['circle', 'square', 'rounded'] as const).map((t) => (
                <button key={t} onClick={() => set({ type: t })} className={`flex-1 py-2 text-[10px] font-bold rounded-lg uppercase ${state.type === t ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>{t}</button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-slate-400 uppercase ml-1 text-center">Sfondo</span>
                <input type="color" value={state.backgroundColor} onChange={(e) => set({ backgroundColor: e.target.value })} className="w-full h-10 rounded-xl cursor-pointer bg-white border border-slate-200" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-slate-400 uppercase ml-1 text-center">Icona</span>
                <input type="color" value={state.iconColor} onChange={(e) => set({ iconColor: e.target.value })} className="w-full h-10 rounded-xl cursor-pointer bg-white border border-slate-200" />
              </div>
            </div>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer border border-transparent hover:border-slate-200">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Shadow FX</span>
              <input type="checkbox" checked={state.shadow} onChange={(e) => set({ shadow: e.target.checked })} className="w-4 h-4 accent-cyan-500" />
            </label>
          </section>

          <section className="pt-4 space-y-3">
            <button onClick={handleDownload} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 shadow-xl"><Download size={18} className="text-cyan-400" /> Scarica SVG</button>
            <button onClick={() => setShowCode(true)} className="w-full bg-white border border-slate-200 text-slate-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 shadow-sm"><Code size={18} /> Ispeziona Codice</button>
          </section>
        </div>
      </aside>

      {/* VIEWPORT */}
      <main className="flex-1 flex items-center justify-center relative bg-gradient-to-br from-[#fff0f7] to-[#f0f7ff]">
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 0)', backgroundSize: '32px 32px' }}></div>

        <div className={`transition-all duration-500 ${state.shadow ? 'drop-shadow-[0_35px_60px_rgba(0,0,0,0.18)]' : ''}`}>
          <svg id="preview-svg" width="480" height="480" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              width="512" height="512" fill={state.backgroundColor}
              rx={state.type === 'circle' ? 256 : state.type === 'rounded' ? state.borderRadius : 0}
            />
            <g transform={`translate(${(512 - state.iconSize) / 2}, ${(512 - state.iconSize) / 2})`}>
              <IconComponent
                size={state.iconSize}
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
            <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              <div className="p-6 bg-slate-50 border-b flex justify-between items-center px-10">
                <span className="font-black text-slate-400 uppercase tracking-widest text-[10px]">SVG Source Code</span>
                <button onClick={() => setShowCode(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all"><X size={20} /></button>
              </div>
              <div className="p-10 overflow-auto flex-1">
                <pre className="bg-slate-900 text-cyan-400 p-8 rounded-3xl text-[11px] font-mono leading-relaxed whitespace-pre-wrap break-all shadow-inner">
                  {getSvgString()}
                </pre>
              </div>
              <div className="p-6 bg-white border-t flex justify-end px-10">
                <button onClick={() => {
                  navigator.clipboard.writeText(getSvgString());
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }} className="bg-cyan-500 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-100 active:scale-95">
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