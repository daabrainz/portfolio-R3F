import { motion } from "framer-motion";
import { useState } from "react";

const MoodScreen = ({ show, onMoodSelected }) => {
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
      className="fixed top-0 left-0 w-full h-full z-50 transition-all duration-500 
      bg-black flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-black/50 rounded-2xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center text-4xl md:text-5xl font-bold text-gray-50 mb-6"
        >
          Wähle deine Mood:
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-white text-center"
        >
          Hintergrund-Musik ändert sich je nach deiner Wahl 😊
        </motion.p>
        <div className="flex flex-col items-center justify-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            onClick={() => selectMood("energetic")}
            className="bg-indigo-600 text-gray-50 py-4 ring-none px-10 rounded-2xl font-bold text-lg mt-4 md:mt-8 hover:scale-110 transition-transform cursor-pointer"
          >
            Energiegeladen 🚀
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            onClick={() => selectMood("chill")}
            className="bg-indigo-600 text-gray-50 py-4 ring-none px-16 rounded-2xl font-bold text-lg mt-4 md:mt-8 hover:scale-110 transition-transform cursor-pointer"
          >
            Entspannt 😌
          </motion.button>
          <div className="fixed bottom-4 w-full text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="text-gray-500 text-xs md:text-sm"
            >
              Musik komponiert & produziert <br />
              von{" "}
              <span className="text-indigo-400 font-medium">Samuel Feindt</span>
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MoodScreen;
