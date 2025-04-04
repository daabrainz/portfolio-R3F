import { useEffect } from "react";
import { useLoadingProgress } from "./LoadingManager";

const AudioPreloader = () => {
  const { setAudioProgress, setAudioLoaded } = useLoadingProgress();
  
  useEffect(() => {
    const preloadAudio = async () => {
      // Alle verfügbaren Musik-Typen
      const musicTypes = ["energetic", "chill"];
      let loadedCount = 0;
      
      try {
        await Promise.all(musicTypes.map(async (type) => {
          const audio = new Audio();
          
          return new Promise((resolve, reject) => {
            // Erfolgsevent: Audio ist vollständig geladen
            audio.addEventListener("canplaythrough", () => {
              loadedCount++;
              setAudioProgress((loadedCount / musicTypes.length) * 100);
              console.log(`Audio ${type} geladen (${loadedCount}/${musicTypes.length})`);
              resolve();
            }, { once: true });
            
            // Fehlerevent: Laden fehlgeschlagen
            audio.addEventListener("error", (err) => {
              console.error(`Fehler beim Laden von ${type} Audio:`, err);
              // Trotzdem als teilweise geladen markieren
              loadedCount++;
              setAudioProgress((loadedCount / musicTypes.length) * 100);
              resolve(); // Keinen Reject, um UI nicht zu blockieren
            }, { once: true });
            
            // Audio-Datei laden starten

            audio.src = `/audio/background-music-${type}.mp3`;
            audio.load();
          });
        }));
        
        console.log("Alle Audiodateien vorgeladen");
      } catch (error) {
        console.error("Audio-Vorladung teilweise fehlgeschlagen:", error);
      } finally {
        setAudioLoaded(true);
      }
    };
    
    preloadAudio();
  }, [setAudioProgress, setAudioLoaded]);
  
  return null; // Keine sichtbare UI
};

export default AudioPreloader;