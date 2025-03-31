import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const LoadingScreen = (props) => {
  const { started, setStarted } = props;
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 500);
    }
  }, [progress]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-all duration-500 
      bg-black flex items-center justify-center pointer-events-none
      ${started ? "opacity-0" : "opacity-100"}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="text-5xl md:text-9xl font-bold text-gray-900 absolute z-0 blur-sm select-none">
          SF
        </div>
        <div className="text-5xl md:text-9xl font-bold text-white relative z-10 select-none">
          SF
        </div>
        
        <motion.div 
          className="h-0.5 bg-white mt-4 relative z-10"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};