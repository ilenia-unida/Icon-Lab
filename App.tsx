import React, { useState } from 'react';
import { useIconEditor } from './hooks/useIconEditor';
import {
  Layers, Layout, Palette, Maximize, Settings, Download, Copy, Check, Image as ImageIcon,
  User, Heart, Star, Bell, Camera, Mail, MapPin, Search, Trash2, Plus, Moon, Share2,
  MessageSquare, Shield, Zap, Cloud, Type, Wind, Activity, RotateCcw, RotateCw,
  Home, ShoppingCart, Calendar, Menu, Filter, Phone, Globe, Lock, Upload
} from 'lucide-react';

// Mappa delle icone disponibili
const iconList = {
  Home, Search, User, Settings, Mail, Heart, ShoppingCart, Camera, Trash2, Check,
  Calendar, Cloud, Menu, Star, Filter, Phone, Globe, Lock, Shield, Upload,
  Layers, Layout, Palette, Maximize, ImageIcon, Type, Wind, Activity, Plus, Moon, Share2, MessageSquare, Zap
};

const App: React.FC = () => {
  const {
    state,
    set,
    undo,
    redo,
    canUndo,
    canRedo,
    handleDownload,
    getSvgString
  } = useIconEditor();

  const [copied, setCopied] = useState(false);
  const IconComponent = iconList[state.selectedIcon as keyof typeof iconList];

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans bg-[#f1f5f9]">
      {/* SIDEBAR SINISTRA */}
      <aside className="w-80 bg-white flex flex-col h-full border-r border-slate-200 shadow-xl z-10">
        <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">

          {/* Header con Controlli Storia */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-500 p-2 rounded-xl shadow-lg shadow-cyan-100">
                <Layers className="text-white w-5 h-5" />
              </div>
              <h1 className="font-extrabold text-xl tracking-tight text-slate-800">Icon Lab</h1>
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={undo}
                disabled={!canUndo}
                className={`p-1.5 rounded-md transition-all ${canUndo ? 'bg-white text-slate-600 shadow-sm' : 'text-slate-300 cursor-not-allowed'}`}
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className={`p-1.5 rounded-md transition-all ${canRedo ? 'bg-white text-slate-600 shadow-sm' : 'text-slate-300 cursor-not-allowed'}`}
              >
                <RotateCw size={16} />
              </button>
            </div>
          </div>

          {/* Sezione Libreria */}
          <section>
            <h2 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest px-1">Libreria</h2>
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(iconList).map((name) => {
                const IconItem = iconList[name as keyof typeof iconList];
                return (
                  <button
                    key={name}
                    onClick={() => set({ selectedIcon: name })}
                    className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${state.selectedIcon === name
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-200'
                      : 'bg-slate-50 text-slate-400 hover:bg-white hover:border-slate-200 border border-transparent'
                      }`}
                  >
                    <IconItem size={18} />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Personalizzazione */}
          <section className="space-y-4">
            <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Stile</h2>

            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
              {(['circle', 'square', 'rounded'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => set({ type: t })}
                  className={`flex-1 py-2 text-[10px] font-bold rounded-lg uppercase transition-all ${state.type === t ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 px-1">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Sfondo</label>
                <input
                  type="color"
                  value={state.backgroundColor}
                  onChange={(e) => set({ backgroundColor: e.target.value })}
                  className="w-full h-10 rounded-lg cursor-pointer border-2 border-slate-50 bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Icona</label>
                <input
                  type="color"
                  value={state.iconColor}
                  onChange={(e) => set({ iconColor: e.target.value })}
                  className="w-full h-10 rounded-lg cursor-pointer border-2 border-slate-50 bg-white"
                />
              </div>
            </div>

            <div className="space-y-2 px-1">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Dimensione</label>
                <span className="text-[10px] font-mono font-bold text-cyan-600">{state.iconSize}px</span>
              </div>
              <input
                type="range" min="100" max="380"
                value={state.iconSize}
                onChange={(e) => set({ iconSize: parseInt(e.target.value) })}
                className="cyan-slider"
              />
            </div>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer border border-transparent hover:border-slate-200 transition-all px-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Ombra</span>
              <input
                type="checkbox"
                checked={state.shadow}
                onChange={(e) => set({ shadow: e.target.checked })}
                className="w-4 h-4 accent-cyan-500"
              />
            </label>
          </section>

          {/* Pulsanti Esportazione */}
          <section className="pt-4 space-y-3">
            <button
              onClick={handleDownload}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
            >
              <Download size={18} className="text-cyan-400" /> Scarica SVG
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(getSvgString());
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              {copied ? 'Copiato!' : 'Copia Codice'}
            </button>
          </section>
        </div>
      </aside>

      {/* VIEWPORT ANTEPRIMA */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className={`transition-all duration-500 ease-out ${state.shadow ? 'drop-shadow-[0_30px_50px_rgba(0,0,0,0.15)]' : ''}`}>
          <svg
            id="preview-svg"
            width="450"
            height="450"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="512"
              height="512"
              fill={state.backgroundColor}
              rx={state.type === 'circle' ? 256 : state.type === 'rounded' ? 96 : 0}
            />
            <g transform={`translate(${(512 - state.iconSize) / 2}, ${(512 - state.iconSize) / 2})`}>
              <IconComponent
                size={state.iconSize}
                color={state.iconColor}
                strokeWidth={state.strokeWidth}
              />
            </g>
          </svg>
        </div>
      </main>
    </div>
  );
};

export default App;