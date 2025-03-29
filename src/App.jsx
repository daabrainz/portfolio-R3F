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



function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const isMobile = window.innerWidth < 5768;
  const totalPages = isMobile ? 6 : 5;

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
    <LoadingScreen started={started} setStarted={setStarted}/>
    <MotionConfig transition={{ 
      ...framerMotionConfig,
    }}>
      <Canvas shadows camera={{ position: [-2, 1, 5], fov: 42}}>
        <color attach="background" args={["#e6e7ff"]} />
        <ScrollControls pages={totalPages} damping={0.2}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Scroll>
            <Suspense>
              {started && (
                <Experience section={section} menuOpened={menuOpened} />
              )}
            </Suspense>
          </Scroll>
          <Scroll html>
            {started && <Interface setSection={setSection}/>} 
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Menu onSectionChange={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
    </MotionConfig>
    <Leva hidden />
    </>
  );
}

export default App;
