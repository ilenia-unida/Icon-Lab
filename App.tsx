import React, { useState, useCallback } from 'react';
import {
  Layers, Layout, Palette, Maximize, Settings, Download, Copy, Check, Image as ImageIcon,
  User, Heart, Star, Bell, Camera, Mail, MapPin, Search, Trash2, Plus, Moon, Share2,
  MessageSquare, Shield, Zap, Cloud, Type, Wind, Activity
} from 'lucide-react';

const App: React.FC = () => {
  const iconList = {
    Layers, User, Heart, Star, Bell, Camera, Mail, MapPin, Search,
    Trash2, Plus, Moon, Share2, MessageSquare, Shield, Zap, Cloud,
    Layout, Palette, Maximize, Settings, ImageIcon, Type, Wind, Activity
  };

  const [state, setState] = useState({
    type: 'rounded' as 'circle' | 'square' | 'rounded',
    backgroundColor: '#00e7ff',
    iconColor: '#ffffff',
    iconSize: 220,
    shadow: true,
    selectedIcon: 'Layers'
  });

  const [copied, setCopied] = useState(false);

  const getSvgString = useCallback(() => {
    const svgElement = document.getElementById('preview-svg');
    if (!svgElement) return '';
    return svgElement.outerHTML;
  }, [state]);

  const handleDownload = () => {
    const svgData = getSvgString();
    const link = document.createElement('a');
    link.href = 'data:image/svg+xml;base64,' + btoa(svgData);
    link.download = `icon-${state.selectedIcon}.svg`;
    link.click();
  };

  const IconComponent = iconList[state.selectedIcon as keyof typeof iconList];

  return (
    <div className=\"h-screen w-full flex overflow-hidden font-sans\">

  {/* PANNELLO DI CONTROLLO - Celestino Chiaro */ }
  <aside className=\"w-80 bg-[#f0f9ff] flex flex-col h-full\">
    < div className =\"p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar\">
      < div className =\"flex items-center gap-3\">
        < div className =\"bg-cyan-500 p-2 rounded-lg shadow-sm\">
          < Layers className =\"text-white w-5 h-5\" />
            </div >
  <h1 className=\"font-extrabold text-xl tracking-tight text-slate-800\">Icon Lab</h1>
          </div >

          <section>
            <h2 className=\"text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest\">Libreria</h2>
            <div className=\"grid grid-cols-5 gap-2\">
{
  Object.keys(iconList).map((name) => {
    const IconItem = iconList[name as keyof typeof iconList];
    return (
      <button key={name} onClick={() => setState({ ...state, selectedIcon: name })}
        className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${state.selectedIcon === name ? 'bg-cyan-500 text-white' : 'bg-white/60 text-slate-400 hover:bg-white'}`}>
        <IconItem size={18} />
      </button>
    );
  })
}
            </div >
          </section >

  <section className=\"space-y-4\">
    < h2 className =\"text-[10px] font-black uppercase text-slate-400 tracking-widest\">Personalizza</h2>
      < div className =\"flex gap-1 p-1 bg-white/50 rounded-lg\">
{
  ['circle', 'square', 'rounded'].map((t) => (
    <button key={t} onClick={() => setState({ ...state, type: t as any })}
      className={`flex-1 py-1.5 text-[9px] font-black rounded uppercase ${state.type === t ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>{t}</button>
  ))
}
            </div >
  <div className=\"grid grid-cols-2 gap-3\">
    < input type =\"color\" value={state.backgroundColor} onChange={(e) => setState({...state, backgroundColor: e.target.value})} className=\"w-full h-10 rounded cursor-pointer border-none bg-transparent\" />
      < input type =\"color\" value={state.iconColor} onChange={(e) => setState({...state, iconColor: e.target.value})} className=\"w-full h-10 rounded cursor-pointer border-none bg-transparent\" />
            </div >
  <input type=\"range\" min=\"100\" max=\"350\" value={state.iconSize} onChange={(e) => setState({...state, iconSize: parseInt(e.target.value)})} className=\"cyan-slider\" />
    < label className =\"flex items-center justify-between p-3 bg-white/40 rounded-lg cursor-pointer border border-white/60\">
      < span className =\"text-xs font-bold text-slate-600\">Soft Shadow</span>
        < input type =\"checkbox\" checked={state.shadow} onChange={(e) => setState({...state, shadow: e.target.checked})} className=\"w-4 h-4 accent-cyan-500\" />
            </label >
          </section >

  <section className=\"pt-4 space-y-3\">
    < button onClick = { handleDownload } className =\"w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg\">
      < Download size = { 18} className =\"text-cyan-400\" /> Scarica SVG
            </button >
  <button onClick={() => {
    navigator.clipboard.writeText(getSvgString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }} className=\"w-full bg-white/80 border border-slate-200 text-slate-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-all\">
{
  copied ? <Check size={18} className=\"text-green-500\" /> : <Copy size={18} />}
  { copied ? 'Copiato!' : 'Copia Codice' }
            </button >
          </section >
        </div >
      </aside >

    {/* LINEA DIVISORIA DECORATIVA */ }
    < div className =\"w-[1px] h-full bg-slate-200 shadow-[1px_0_0_rgba(255,255,255,0.8)]\"></div>

  {/* VIEWPORT - Gradiente Pastello Delicato */ }
  <section className=\"flex-1 flex items-center justify-center bg-gradient-to-br from-[#fff0f7] to-[#f0f7ff]\">
    < div className = {`transition-all duration-300 ${state.shadow ? 'drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]' : ''}`
}>
  <svg id=\"preview-svg\" width=\"420\" height=\"420\" viewBox=\"0 0 512 512\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
    < rect
width =\"512\" 
height =\"512\" 
fill = { state.backgroundColor }
rx = { state.type === 'circle' ? 256 : state.type === 'rounded' ? 96 : 0 }
  />
  <g transform={`translate(${(512 - state.iconSize) / 2}, ${(512 - state.iconSize) / 2})`}>
    <IconComponent size={state.iconSize} color={state.iconColor} strokeWidth={2} />
  </g>
          </svg >
        </div >
      </section >

    </div >
  );
};

export default App;