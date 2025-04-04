import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [musicType, setMusicType] = useState("energetic");
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  // 1. Überwache MoodScreen-Änderungen
  useEffect(() => {
    const selectedMood = localStorage.getItem("selectedMood");
    if (selectedMood) {
      setMusicType(selectedMood);
      // Setze audioLoaded zurück, da wir eine neue Datei laden werden
      setAudioLoaded(false);
    }
  }, []);

  // 2. Musik neu laden, wenn sich musicType ändert
  useEffect(() => {
    if (!audioRef.current) return;

    console.log("Audio neu geladen:", musicType);

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.load();
  }, [musicType]);

  // 3. Audio-Lade-Events überwachen
  useEffect(() => {
    if (!audioRef.current) return;

    const handleCanPlay = () => {
      console.log("Audio kann abgespielt werden:", musicType);
      setAudioLoaded(true);
    };

    const handleError = (e) => {
      console.error("Fehler beim Laden des Audios:", e);
      setAudioLoaded(false);
    };

    audioRef.current.addEventListener("canplay", handleCanPlay);
    audioRef.current.addEventListener("error", handleError);

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("error", handleError);
      }
    };
  }, [musicType]);

  // 4. Musik starten, wenn geladen
  useEffect(() => {
    if (!audioLoaded || !audioRef.current) return;

    const playAudio = async () => {
      try {
        audioRef.current.volume = volume;
        audioRef.current.muted = false;
        setIsMuted(false);

        await audioRef.current.play();
        setIsPlaying(true);
        console.log("Audio gestartet:", musicType);
      } catch (error) {
        console.error("Fehler beim Abspielen des Audios:", error);
        setIsPlaying(false);
      }
    };
    playAudio();
  }, [audioLoaded, musicType, volume]);

  // Play/Pause-Logik
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log("Abspielen nicht möglich:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  //Volume-Änderungslogik mit automatische Stummschaltung
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;

    if ((volume === 0) & !isMuted) {
      setIsMuted(true);
    } else if (volume > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [volume]);

  // Benutzerinteraktion zum Starten der Musik
  const togglePlay = () => {
    if (!isPlaying && audioRef.current) {
      // Vor dem Abspielen Lautstärke und Stummschaltung konfigurieren
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
    setIsPlaying(!isPlaying);
  };

  // Stummschaltungs-Logik
  const toggleMute = () => {
    if (volume > 0) {
      setIsMuted(!isMuted);
    } else {
      if (isMuted) {
        setVolume(0.3);
        setIsMuted(false);
      }
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted || volume === 0;
  }, [isMuted, volume]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="fixed bottom-2 right-2 z-50 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
      <motion.div
        className="p-2 rounded-full cursor-pointer hover:bg-indigo-600/80 transition-colors"
        onClick={togglePlay}
      >
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          className="text-white text-lg"
        />
      </motion.div>

      <div className="right-0 flex items-center gap-2">
        <motion.div
          className="p-2 rounded-full cursor-pointer hover:bg-indigo-600/80 transition-colors"
          onClick={toggleMute}
        >
          <FontAwesomeIcon
            icon={isMuted || volume === 0 ? faVolumeMute : faVolumeUp}
            className="text-white text-lg"
          />
        </motion.div>

        {/* Permanenter Volume-Slider */}
        {!isMobile && (
          <div className="w-30 mb-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full cursor-pointer accent-indigo-500 h-1.5"
            />
          </div>
        )}
      </div>

      <audio
        ref={audioRef}
        src={`/audio/background-music-${musicType}.mp3`}
        loop
        preload="auto"
      />
    </div>
  );
};

export default BackgroundMusic;
