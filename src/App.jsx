import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import { Suspense, useEffect, useState } from "react";
import { ScrollManager } from "./components/ScrollManager";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./config";
import { Provider } from "jotai";
import { LoadingScreen } from "./components/LoadingScreen";
import BackgroundMusic from "./components/BackgroundMusic";
import MoodScreen from "./components/MoodScreen";
import AudioPreloader from "./components/AudioPreloader";

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [showMoodScreen, setShowMoodScreen] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);

  const isVerySmallDevice = window.innerHeight < 680;
  const totalPages = isVerySmallDevice ? 6 : 5;

  const contactSectionIndex = isVerySmallDevice ? 5 : 4;
  const isContactSection = section === contactSectionIndex;

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setShowMoodScreen(false);
  };

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      {/* Audio wird im Hintergrund vorgeladen */}
      <AudioPreloader />
      
      {/* Mood-Auswahl */}
      <MoodScreen show={showMoodScreen} onMoodSelected={handleMoodSelect} />

      {!showMoodScreen && (
        <>
        {/* Verbesserter Loading-Screen */}
        <LoadingScreen started={started} setStarted={setStarted} />
        <MotionConfig
          transition={{
            ...framerMotionConfig,
          }}
        >
          <Canvas shadows camera={{ position: [-2, 1, 5], fov: 42 }}>
            <color attach="background" args={["#e6e7ff"]} />
            <ScrollControls pages={totalPages} damping={0.2}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
                <Suspense>
                  {started && (
                    <Experience
                      section={section}
                      menuOpened={menuOpened}
                      cursorFollow={isContactSection}
                    />
                  )}
                </Suspense>
              </Scroll>
              <Scroll html>
                {started && <Interface setSection={setSection} />}
              </Scroll>
            </ScrollControls>
          </Canvas>
          <Menu
            onSectionChange={setSection}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
          {/* Musik mit vorgegebener Stimmung starten */}
          {started && <BackgroundMusic initialMusicType={selectedMood} />}
        </MotionConfig>
        <Leva hidden />
        </>
      )}
    </>
  );
}

export default App;