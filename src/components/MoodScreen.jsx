import { motion } from "framer-motion";
import { useState } from "react";

const MoodScreen = ({show, onMoodSelected}) => {

    if (!show) return null;

    const selectMood = (mood) => {
        localStorage.setItem("selectedMood", mood);
        localStorage.setItem("audioEnabled", "true");
        if (onMoodSelected) {
          onMoodSelected(mood);
        }
      };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full z-50 transition-all duration-500 
      bg-black flex items-center justify-center"
    >

      <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-black/50 rounded-2xl">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-50 mb-6">
          Wähle deine Mood:
        </h2>
        <div className="flex flex-col items-center justify-center">
          <button 
          onClick={() => selectMood("energetic")}
          className="bg-indigo-600 text-gray-50 py-4 ring-none px-10 rounded-2xl font-bold text-lg mt-4 md:mt-16 hover:scale-110 transition-transform cursor-pointer">
            Energiegeladen 🚀
          </button>

          <button 
          onClick={() => selectMood("chill")}
          className="bg-indigo-600 text-gray-50 py-4 ring-none px-16 rounded-2xl font-bold text-lg mt-4 md:mt-16 hover:scale-110 transition-transform cursor-pointer">
            Entspannt 😌
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MoodScreen;
