import { create } from "zustand";

// Zentraler Store für alle Ladefortschritte
export const useLoadingStore = create((set, get) => ({
  // Fortschrittsstatus
  assetsProgress: 0,
  audioProgress: 0,
  audioLoaded: false,
  isLoading: true,
  
  // Setter-Funktionen
  setAssetsProgress: (progress) => set({ assetsProgress: progress }),
  setAudioProgress: (progress) => set({ audioProgress: progress }),
  setAudioLoaded: (loaded) => set({ audioLoaded: loaded }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Berechneter Gesamtfortschritt (80% 3D-Assets, 20% Audio)
  getTotalProgress: () => {
    const { assetsProgress, audioProgress } = get();
    return assetsProgress * 0.8 + audioProgress * 0.2;
  }
}));

// Hook für einfachen Zugriff
export const useLoadingProgress = () => {
  const { 
    assetsProgress,
    audioProgress, 
    audioLoaded,
    isLoading,
    setAssetsProgress,
    setAudioProgress,
    setAudioLoaded,
    setLoading,
    getTotalProgress
  } = useLoadingStore();
  
  return {
    assetsProgress,
    audioProgress,
    audioLoaded,
    isLoading,
    setAssetsProgress,
    setAudioProgress,
    setAudioLoaded,
    setLoading,
    getTotalProgress,
    totalProgress: getTotalProgress()
  };
};