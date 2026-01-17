
import React from 'react';

interface PreviewAreaProps {
  processedSvg: string;
  copyFeedback: string | null;
  renderKey: string;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  size: number;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ 
  processedSvg, 
  copyFeedback, 
  renderKey,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  size
}) => {
  return (
    <main className="flex-1 h-[40vh] md:h-full relative flex items-center justify-center p-6 md:p-12 bg-slate-200 overflow-hidden order-1 md:order-2">
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-400/30 to-transparent"></div>
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-400/30 to-transparent"></div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-10"></div>
        <div className="absolute top-[-5%] right-[-5%] w-[60%] h-[60%] bg-cyan-100/50 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[60%] h-[60%] bg-violet-100/30 blur-[120px] rounded-full"></div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 flex gap-2 z-30">
        <button 
          onClick={onUndo} 
          disabled={!canUndo}
          className={`w-10 h-10 rounded-full flex items-center justify-center border border-slate-300 shadow-lg transition-all ${canUndo ? 'bg-white text-slate-900 hover:scale-110 active:bg-slate-100' : 'bg-slate-50 text-slate-300 cursor-not-allowed'}`}
          title="Annulla"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h10a8 8 0 018 8v2M3 10l5 5m-5-5l5-5" /></svg>
        </button>
        <button 
          onClick={onRedo} 
          disabled={!canRedo}
          className={`w-10 h-10 rounded-full flex items-center justify-center border border-slate-300 shadow-lg transition-all ${canRedo ? 'bg-white text-slate-900 hover:scale-110 active:bg-slate-100' : 'bg-slate-50 text-slate-300 cursor-not-allowed'}`}
          title="Ripristina"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 10h-10a8 8 0 00-8 8v2m18-10l-5 5m5-5l-5-5" /></svg>
        </button>
      </div>

      <div 
        className="relative transition-all duration-300 ease-out"
        key={renderKey}
      >
        <div className="absolute inset-0 bg-cyan-400/10 blur-[20px] rounded-sm scale-110"></div>
        <div 
          className="relative bg-white border border-slate-300 shadow-sm flex items-center justify-center transition-all duration-300 overflow-hidden"
          style={{ 
            width: `${size}px`, 
            height: `${size}px`
          }}
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[length:4px_4px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]"></div>
          
          <div 
            className="flex items-center justify-center w-full h-full"
            dangerouslySetInnerHTML={{ __html: processedSvg }} 
          />
        </div>
      </div>

      {copyFeedback && (
        <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-top-6 duration-500 z-50">
          <div className="bg-cyan-400 text-slate-900 px-6 md:px-8 py-2 md:py-3 rounded-full shadow-2xl border border-white/40 flex items-center gap-3">
            <div className="bg-white/40 p-1 md:p-1.5 rounded-full">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs md:text-sm font-black uppercase tracking-tight">{copyFeedback}</span>
          </div>
        </div>
      )}
    </main>
  );
};
