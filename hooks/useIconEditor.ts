import { useCallback } from 'react';
import { useHistory } from './useHistory';

// Definiamo la struttura dei dati dell'icona
export interface IconState {
    type: 'circle' | 'square' | 'rounded';
    backgroundColor: string;
    iconColor: string;
    iconSize: number;
    shadow: boolean;
    selectedIcon: string;
    strokeWidth: number;
}

export const useIconEditor = () => {
    // Inizializziamo useHistory con i valori grafici originali
    const { state, set, undo, redo, canUndo, canRedo } = useHistory<IconState>({
        type: 'rounded',
        backgroundColor: '#00e7ff',
        iconColor: '#ffffff',
        iconSize: 220,
        shadow: true,
        selectedIcon: 'Layers',
        strokeWidth: 2
    });

    // Funzione per catturare l'SVG attuale dal DOM
    const getSvgString = useCallback(() => {
        const svgElement = document.getElementById('preview-svg');
        if (!svgElement) return '';
        return svgElement.outerHTML;
    }, []);

    // Funzione per il download immediato
    const handleDownload = () => {
        const svgData = getSvgString();
        if (!svgData) return;

        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `icon-${state.selectedIcon.toLowerCase()}.svg`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return {
        state,
        set,
        undo,
        redo,
        canUndo,
        canRedo,
        handleDownload,
        getSvgString
    };
};