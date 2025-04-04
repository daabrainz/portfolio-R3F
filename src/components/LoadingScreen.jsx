import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLoadingProgress } from "./LoadingManager";

export const LoadingScreen = (props) => {
  const { started, setStarted } = props;
  const { progress: threeProgress } = useProgress();
  const { setAssetsProgress } = useLoadingProgress();
  const [smoothProgress, setSmoothProgress] = useState(0);
  
  // Aktualisiere den Assets-Fortschritt im LoadingManager
  useEffect(() => {
    setAssetsProgress(threeProgress);
  }, [threeProgress, setAssetsProgress]);
  
  // Animiere den Fortschritt für eine sanftere Anzeige
  useEffect(() => {
    const animateProgress = () => {
      // Inkrementiere den Fortschritt schneller bis 100%
      setSmoothProgress(prev => {
        if (prev < 100) {
          return Math.min(100, prev + 0.5);  // Schnellere Animation
        }
        return prev;
      });
    };
    
    const timer = setInterval(animateProgress, 20); // Schnellere Updates
    return () => clearInterval(timer);
  }, []);
  
  // Starte die App, wenn der Ladevorgang abgeschlossen ist
  useEffect(() => {
    if (smoothProgress >= 100) {
      const timer = setTimeout(() => {
        setStarted(true);
      }, 800); // Kurze Verzögerung für bessere Benutzererfahrung
      
      return () => clearTimeout(timer);
    }
  }, [smoothProgress, setStarted]);
  
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-all duration-700 ease-in-out
      bg-black flex items-center justify-center pointer-events-none
      ${started ? "opacity-0" : "opacity-100"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="text-5xl md:text-9xl font-bold text-gray-900 absolute z-0 blur-sm select-none">
          SF
        </div>
        <div className="text-5xl md:text-9xl font-bold text-white relative z-10 select-none">
          SF
        </div>
        
        <div className="relative mt-4">
          <div className="h-0.5 bg-gray-800 w-full"></div>
          <motion.div 
            className="h-0.5 bg-white absolute top-0 left-0"
            initial={{ width: 0 }}
            animate={{ width: `${smoothProgress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        
        <div className="mt-2 text-white text-center text-sm">
          {Math.round(smoothProgress)}%
        </div>
      </motion.div>
    </div>
  );
};