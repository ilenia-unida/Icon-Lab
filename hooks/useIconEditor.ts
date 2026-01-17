import { useCallback } from 'react';
import { useHistory } from './useHistory';

export interface IconState {
    type: 'circle' | 'square' | 'rounded';
    backgroundColor: string;
    iconColor: string;
    iconSize: number;
    borderRadius: number;
    strokeWidth: number;
    shadow: boolean;
    selectedIcon: string;
}

export const useIconEditor = () => {
    const { state, set, undo, redo, canUndo, canRedo } = useHistory<IconState>({
        type: 'rounded',
        backgroundColor: '#00e7ff',
        iconColor: '#1e293b',
        iconSize: 220,
        borderRadius: 80,
        strokeWidth: 2,
        shadow: true,
        selectedIcon: 'Layers'
    });

    const getSvgString = useCallback(() => {
        const svgElement = document.getElementById('preview-svg');
        if (!svgElement) return '';
        return svgElement.outerHTML;
    }, []);

    const handleDownload = () => {
        const svgData = getSvgString();
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `icon-${state.selectedIcon.toLowerCase()}.svg`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return { state, set, undo, redo, canUndo, canRedo, handleDownload, getSvgString };
};