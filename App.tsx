import React, { useState, useCallback } from 'react';
import { 
  Layers, Layout, Palette, Maximize, Settings, Download, Copy, Check, Image as ImageIcon,
  User, Heart, Star, Bell, Camera, Mail, MapPin, Search, Trash2, Plus, Moon, Share2, 
  MessageSquare, Shield, Zap, Cloud, Type
} from 'lucide-react';

const App: React.FC = () => {
  const iconList = {
    Layers, User, Heart, Star, Bell, Camera, Mail, MapPin, Search, 
    Trash2, Plus, Moon, Share2, MessageSquare, Shield, Zap, Cloud,
    Layout, Palette, Maximize, Settings, ImageIcon, Type
  };

  const [state, setState] = useState({
    type: 'rounded' as 'circle' | 'square' | 'rounded',
    size: 512,
    backgroundColor: '#3b82f6',
    iconColor: '#ffffff',
    iconSize: 256,
    shadow: true,
    selectedIcon: 'Layers'
  });

  const [copied, setCopied] = useState(false);

  const getSvgString = useCallback(() => {
    const svgElement = document.getElementById('preview-svg');
    if (!svgElement) return '';
    const cloned = svgElement.cloneNode(true) as SVGElement;
    return cloned.outerHTML.replace(/>\s+</g, '><').trim();
  }, [state]);

  const handleDownload = () => {
    const svgData = getSvgString();
    const link = document.createElement('a');
    link.href = 'data:image/svg+xml;base64,' + btoa(svgData);
    link.download = `icon-lab-${state.selectedIcon}.svg`;
    link.click();
  };

  const IconComponent = iconList[state.selectedIcon as keyof typeof iconList];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500 p-2 rounded-xl shadow-lg shadow-cyan-200">
            <Layers className="text-white w-6 h-6" />
          </div>
          <h1 className="font-extrabold text-2xl tracking-tight text-slate-800">Icon Lab <span className="text-cyan-500 text-sm font-bold uppercase tracking-widest ml-1">Studio</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => {
            navigator.clipboard.writeText(getSvgString());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-cyan-600 transition-colors font-semibold">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy SVG'}
          </button>
          <button onClick={handleDownload} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl transition-all shadow-xl shadow-slate-200 font-bold flex items-center gap-2">
            <Download className="w-4 h-4 text-cyan-400" /> Download
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden p-6 gap-6">
        <aside className="w-96 flex flex-col gap-6 overflow-y-auto no-scrollbar pr-2">
          
          <section className="bento-card p-6">
            <h2 className="text-[10px] font-black uppercase text-slate-400 mb-5 tracking-[0.2em] flex items-center gap-2">
              <ImageIcon className="w-3 h-3" /> Icon Selection
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {Object.keys(iconList).map((iconName) => {
                const IconItem = iconList[iconName as keyof typeof iconList];
                return (
                  <button key={iconName} onClick={() => setState({...state, selectedIcon: iconName})}
                    className={`p-3 rounded-xl transition-all flex items-center justify-center ${state.selectedIcon === iconName ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-100 scale-110' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                    <IconItem size={20} strokeWidth={2.5} />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bento-card p-6">
            <h2 className="text-[10px] font-black uppercase text-slate-400 mb-5 tracking-[0.2em] flex items-center gap-2">
              <Palette className="w-3 h-3" /> Visual Style
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                {(['circle', 'square', 'rounded'] as const).map((t) => (
                  <button key={t} onClick={() => setState({...state, type: t})} 
                    className={`py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${state.type === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{t}</button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Background</label>
                  <input type="color" value={state.backgroundColor} onChange={(e) => setState({...state, backgroundColor: e.target.value})} className="w-full h-12 rounded-xl border-4 border-slate-50 cursor-pointer shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Icon</label>
                  <input type="color" value={state.iconColor} onChange={(e) => setState({...state, iconColor: e.target.value})} className="w-full h-12 rounded-xl border-4 border-slate-50 cursor-pointer shadow-sm" />
                </div>
              </div>
            </div>
          </section>

          <section className="bento-card p-6">
            <h2 className="text-[10px] font-black uppercase text-slate-400 mb-5 tracking-[0.2em] flex items-center gap-2">
              <Maximize className="w-3 h-3" /> Sizing & Effects
            </h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-xs font-bold">Size</span><span className="text-xs font-mono text-cyan-500">{state.iconSize}px</span></div>
                <input type="range" min="100" max="400" value={state.iconSize} onChange={(e) => setState({...state, iconSize: parseInt(e.target.value)})} className="cyan-slider" />
              </div>
              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer group hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                <span className="text-xs font-bold text-slate-600">Apply Soft Shadow</span>
                <input type="checkbox" checked={state.shadow} onChange={(e) => setState({...state, shadow: e.target.checked})} className="w-5 h-5 accent-cyan-500" />
              </label>
            </div>
          </section>
        </aside>

        <section className="flex-1 bento-card flex flex-col items-center justify-center p-12 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] relative overflow-hidden">
          <div className="absolute top-6 left-8 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Render Output</span>
          </div>

          <div className={`transition-all duration-500 ${state.shadow ? 'drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]' : ''}`}>
            <svg id="preview-svg" width={512} height={512} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="512" height="512" fill={state.backgroundColor} rx={state.type === 'circle' ? 256 : state.type === 'rounded' ? 96 : 0} />
              <g transform={`translate(${(512 - state.iconSize) / 2}, ${(512 - state.iconSize) / 2})`}>
                <IconComponent size={state.iconSize} color={state.iconColor} strokeWidth={2} />
              </g>
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;