
import React, { useState } from 'react';

interface SidebarProps {
  iconSet: Record<string, string>;
  state: {
    selectedIconKey: string;
    strokeColor: string;
    fillColor: string;
    isFillEnabled: boolean;
    strokeWidth: number;
    size: number;
    lineCap: 'round' | 'square' | 'butt';
    lineJoin: 'round' | 'miter' | 'bevel';
  };
  updateState: (updates: any) => void;
  onCopySvg: () => void;
  onDownload: () => void;
  embedCode: string;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  iconSet,
  state,
  updateState,
  onCopySvg,
  onDownload,
  embedCode,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) => {
  const [copyDataUriFeedback, setCopyDataUriFeedback] = useState(false);

  const handleCopyDataUri = async () => {
    const encoded = encodeURIComponent(embedCode)
      .replace(/'/g, "%27")
      .replace(/"/g, "%22");
    const dataUri = `background-image: url("data:image/svg+xml;charset=UTF-8,${encoded}");`;
    await navigator.clipboard.writeText(dataUri);
    setCopyDataUriFeedback(true);
    setTimeout(() => setCopyDataUriFeedback(false), 2000);
  };

  const accentBorder = 'border-cyan-400';

  return (
    <aside className="w-full md:w-[400px] bg-[#f8fafc] h-[60vh] md:h-full overflow-y-auto p-6 md:p-8 flex flex-col z-20 border-t md:border-t-0 md:border-r border-slate-200 no-scrollbar relative order-2 md:order-1">
      
      {/* BRANDING HEADER */}
      <header className="mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-6 border-b-4 border-cyan-400">
                <svg className="w-7 h-7 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 4L4 8l8 4 8-4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4" />
                </svg>
             </div>
             <h1 className="text-4xl md:text-5xl font-[1000] tracking-[-0.08em] leading-none whitespace-nowrap">
                <span className="text-slate-950 uppercase">ICON</span>
                <span className="text-cyan-400 ml-1 uppercase">LAB</span>
             </h1>
          </div>
          <div className="flex gap-1">
            <button onClick={onUndo} disabled={!canUndo} className={`p-2 rounded-lg transition-all ${canUndo ? 'hover:bg-slate-200 text-slate-950' : 'text-slate-300'}`} title="Annulla">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M3 10h10a8 8 0 018 8v2M3 10l5 5m-5-5l5-5" /></svg>
            </button>
            <button onClick={onRedo} disabled={!canRedo} className={`p-2 rounded-lg transition-all ${canRedo ? 'hover:bg-slate-200 text-slate-950' : 'text-slate-300'}`} title="Ripristina">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M21 10h-10a8 8 0 00-8 8v2m18-10l-5 5m5-5l-5-5" /></svg>
            </button>
          </div>
        </div>
      </header>

      <div className="space-y-5">
        {/* LIBRERIA */}
        <section className="bento-card p-5">
          <h2 className="text-[10px] font-black text-slate-950 uppercase tracking-widest mb-4">Libreria Icone</h2>
          <div className="grid grid-cols-5 gap-2.5">
            {Object.entries(iconSet).map(([key, svg]) => (
              <button
                key={key}
                onClick={() => updateState({ selectedIconKey: key })}
                className={`aspect-square rounded-xl flex items-center justify-center transition-all border-2 ${
                  state.selectedIconKey === key 
                  ? `${accentBorder} bg-cyan-50/50 text-slate-950 shadow-sm scale-105` 
                  : 'bg-white text-slate-400 hover:border-slate-300 border-slate-100'
                }`}
                dangerouslySetInnerHTML={{ 
                  __html: (svg as string).replace('<svg', '<svg width="20" height="20" stroke="currentColor" fill="none" stroke-width="2"') 
                }}
              />
            ))}
          </div>
        </section>

        {/* COLORI */}
        <div className="grid grid-cols-2 gap-4">
          <section className="bento-card p-4">
            <label className="text-[9px] font-black text-slate-950 uppercase tracking-widest mb-3 block">Colore Tratto</label>
            <div className="flex items-center gap-3">
              <input type="color" value={state.strokeColor} onChange={(e) => updateState({ strokeColor: e.target.value })} className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent" />
              <span className="text-[11px] font-mono font-bold text-slate-900">{state.strokeColor.toUpperCase()}</span>
            </div>
          </section>

          <section className="bento-card p-4">
            <div className="flex justify-between items-center mb-3">
              <label className="text-[9px] font-black text-slate-950 uppercase tracking-widest block">Riempimento</label>
              <button onClick={() => updateState({ isFillEnabled: !state.isFillEnabled })} className={`w-8 h-4 rounded-full transition-all relative ${state.isFillEnabled ? 'bg-cyan-400' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${state.isFillEnabled ? 'translate-x-4' : ''}`}></div>
              </button>
            </div>
            <div className={`flex items-center gap-3 transition-opacity ${!state.isFillEnabled ? 'opacity-30' : ''}`}>
              <input type="color" value={state.fillColor} disabled={!state.isFillEnabled} onChange={(e) => updateState({ fillColor: e.target.value })} className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent" />
              <span className="text-[11px] font-mono font-bold text-slate-900">{state.fillColor.toUpperCase()}</span>
            </div>
          </section>
        </div>

        {/* STILE - TITOLO E VOCI AGGIORNATE */}
        <section className="bento-card p-5">
           <h2 className="text-[11px] font-[1000] text-slate-950 uppercase tracking-tight mb-4">Stile</h2>
           <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[9px] font-black text-slate-950 uppercase tracking-tight">Linea</span>
                <div className="grid grid-cols-3 gap-2">
                   {(['round', 'square', 'butt'] as const).map(cap => (
                     <button key={cap} onClick={() => updateState({ lineCap: cap })} className={`flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all ${state.lineCap === cap ? 'border-cyan-400 bg-cyan-50 text-cyan-600 shadow-sm' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                       <div className="w-10 h-3 relative flex items-center">
                          <div className="w-full h-1 bg-slate-300 rounded-full overflow-hidden">
                             <div className="w-1/2 h-full bg-slate-400"></div>
                          </div>
                          <div className={`absolute right-1 w-3 h-3 border-2 border-current ${cap === 'round' ? 'rounded-full' : cap === 'square' ? 'rounded-none' : 'w-[2px] h-3 bg-current border-none'}`}></div>
                       </div>
                       <span className="text-[9px] font-black uppercase tracking-tighter">
                          {cap === 'round' ? 'Tonda' : cap === 'square' ? 'Quadra' : 'Netta'}
                       </span>
                     </button>
                   ))}
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-[9px] font-black text-slate-950 uppercase tracking-tight">Angoli</span>
                <div className="grid grid-cols-3 gap-2">
                   {(['round', 'miter', 'bevel'] as const).map(join => (
                     <button key={join} onClick={() => updateState({ lineJoin: join })} className={`flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all ${state.lineJoin === join ? 'border-cyan-400 bg-cyan-50 text-cyan-600 shadow-sm' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                       <div className="w-8 h-6 flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin={join}>
                             <path d="M4 18L12 6L20 18" />
                          </svg>
                       </div>
                       <span className="text-[9px] font-black uppercase tracking-tighter">
                          {join === 'round' ? 'Tondi' : join === 'miter' ? 'Spigolo' : 'Smusso'}
                       </span>
                     </button>
                   ))}
                </div>
              </div>
           </div>
        </section>

        {/* SLIDERS CON BADGE PX MASSIMA LEGGIBILITÀ */}
        <section className="bento-card p-5 space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-950 uppercase tracking-widest">Spessore Tratto</label>
              <div className="bg-slate-950 text-cyan-400 px-4 py-1.5 rounded-lg text-[15px] font-[1000] font-mono border border-slate-800 shadow-xl ring-4 ring-cyan-400/5 min-w-[70px] text-center">
                {state.strokeWidth.toFixed(1)}<span className="text-[10px] ml-1 text-slate-500">PX</span>
              </div>
            </div>
            <input type="range" min="0.5" max="10" step="0.5" value={state.strokeWidth} onChange={(e) => updateState({ strokeWidth: parseFloat(e.target.value) })} className="cyan-slider" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-950 uppercase tracking-widest">Dimensione Export</label>
              <div className="bg-slate-950 text-cyan-400 px-4 py-1.5 rounded-lg text-[15px] font-[1000] font-mono border border-slate-800 shadow-xl ring-4 ring-cyan-400/5 min-w-[70px] text-center">
                {state.size}<span className="text-[10px] ml-1 text-slate-500">PX</span>
              </div>
            </div>
            <input type="range" min="16" max="256" step="1" value={state.size} onChange={(e) => updateState({ size: parseInt(e.target.value) })} className="cyan-slider" />
          </div>
        </section>

        {/* PANNELLO CODICE */}
        <section className="bg-slate-950 rounded-2xl p-5 shadow-2xl border border-slate-800">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[11px] font-[1000] text-slate-100 uppercase tracking-wider">CODICE SVG</h2>
            <button 
              onClick={handleCopyDataUri}
              className={`text-[9px] font-black px-2.5 py-1.5 rounded-lg transition-all ${copyDataUriFeedback ? 'bg-green-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-cyan-400'}`}
            >
              {copyDataUriFeedback ? 'COPIATO!' : 'COPIA CSS'}
            </button>
          </div>
          <div className="bg-black/50 rounded-xl p-4 border border-white/5">
            <textarea readOnly value={embedCode} className="code-textarea h-20 scrollbar-hide" />
          </div>
        </section>

        {/* AZIONI */}
        <div className="grid grid-cols-2 gap-4 pb-8">
          <button onClick={onCopySvg} className="py-4 bg-white border border-slate-200 text-slate-950 rounded-2xl font-black text-[11px] hover:bg-slate-50 transition-all uppercase tracking-widest">
            Copia SVG
          </button>
          <button onClick={onDownload} className="py-4 bg-cyan-400 text-slate-950 rounded-2xl font-black text-[11px] hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20 uppercase tracking-widest">
            Scarica SVG
          </button>
        </div>
      </div>

      <footer className="mt-auto py-6 text-center border-t border-slate-200">
        <p className="text-slate-950 text-[9px] font-black uppercase tracking-[0.3em]">
          sviluppato da Ilenia Unida 2025
        </p>
      </footer>
    </aside>
  );
};
