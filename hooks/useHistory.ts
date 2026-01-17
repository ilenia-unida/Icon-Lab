
import { useState, useCallback } from 'react';

export function useHistory<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const [history, setHistory] = useState<T[]>([initialState]);
  const [pointer, setPointer] = useState(0);

  const set = useCallback((newValues: Partial<T>) => {
    setState((prev) => {
      const nextState = { ...prev, ...newValues };
      
      // Se lo stato non è cambiato davvero, non aggiungere alla storia
      if (JSON.stringify(prev) === JSON.stringify(nextState)) return prev;

      const newHistory = history.slice(0, pointer + 1);
      newHistory.push(nextState);
      
      // Limita la storia a 50 stati
      if (newHistory.length > 50) newHistory.shift();
      
      setHistory(newHistory);
      setPointer(newHistory.length - 1);
      return nextState;
    });
  }, [history, pointer]);

  const undo = useCallback(() => {
    if (pointer > 0) {
      const nextPointer = pointer - 1;
      setPointer(nextPointer);
      setState(history[nextPointer]);
    }
  }, [pointer, history]);

  const redo = useCallback(() => {
    if (pointer < history.length - 1) {
      const nextPointer = pointer + 1;
      setPointer(nextPointer);
      setState(history[nextPointer]);
    }
  }, [pointer, history]);

  return {
    state,
    set,
    undo,
    redo,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1
  };
}
