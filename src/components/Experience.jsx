import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Float,
  useScroll,
  OrbitControls,
} from "@react-three/drei";
import { Office } from "./Office";
import { motion } from "framer-motion-3d";
import { Avatar } from "./Avatar";
import { Projects } from "./Projects";

import * as THREE from "three";

import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Background } from "./Background";
import { max } from "three/tsl";

export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(1.5 * responsiveRatio, 1.5));

  const [section, setSection] = useState();

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const characterContainerAboutRef = useRef();
  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  const characterGroup = useRef();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -2 : -2, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 1 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
    }, 600);
  }, [section]);

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    const maxSection = isMobile ? 5 : 4;
    if (curSection > maxSection) {
      curSection = maxSection;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    // const position = new THREE.Vector3();
    if (section === 0) {
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
    }
    // console.log([position.x, position.y, position.z]);

    // const quaternion = new THREE.Quaternion();
    // characterContainerAboutRef.current.getWorldQuaternion(quaternion);
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion, "XYZ");
    // console.log([euler.x, euler.y, euler.z]);
  });

  return (
    <>
      <Background />

      <motion.group
        ref={characterGroup}
        position={[0.2208597124428327, 0.054, 2.29733495918678]}
        rotation={[-0, 1.3519999999999992, -0]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scale: isMobile
              ? officeScaleRatio * 0.35
              : officeScaleRatio * 0.353,
          },
          1: {
            scale: isMobile ? 2.1 : 1.8,
            y: isMobile ? -viewport.height - 2 : -viewport.height - 1.6,
            x: isMobile ? 0.6 : 0.9,
            z: 0,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 2 : -0.5,
            rotateZ: 0,
          },
          2: {
            scale: 0.8,
            x: -1,
            y: -viewport.height - 5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 3,
            rotateZ: 0,
          },
          3: {
            scale: isMobile ? 3 :2,
            x: isMobile ? -1 : 1,
            y: isMobile ? -viewport.height - 13 : -viewport.height - 10.5,
            z: 0,
            rotateX: 0,
            rotateY: isMobile ? Math.PI / 8 : -Math.PI / 4,
            rotateZ: 0,
          },
          4: {
            y: -viewport.height - 18,
            x: isMobile ? 1.1 : 1,
            z: 0,
            rotateX: 0,
            rotateY: -Math.PI / 3,
            rotateZ: 0,
            scale: 3,
          },
          5: {
            y: -viewport.height - 19.65, // Noch weiter unten für die Kontaktsektion
            x: isMobile ? 1.2 : 1,      // Wird nur bei Mobile verwendet
            z: 0,
            rotateX: 0,
            rotateY: -Math.PI / 3,
            rotateZ: 0,
            scale: 2.5,
          },
        }}
      >
        <Avatar animation={characterAnimation} wireframe={section === 1} />
      </motion.group>

      {/* Position Office & Avatar */}
      <mesh>
        <ambientLight intensity={1} />
        <motion.group
          position={[
            isMobile ? -0.9 : -0.7 * officeScaleRatio,
            isMobile ? -viewport.height / 6 : 0,
            2.3,
          ]}
          rotation={[0, 0.2, 0]}
          scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
          animate={{
            y: isMobile ? -viewport.height / 14 : 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <Office section={section} />
          <group
            ref={characterContainerAboutRef}
            name="AvatarSpot"
            position={[0.413, 0.054, 0.081]}
            rotation={[0, 1.152, 0]}
            scale={0.353}
          >
            {/* <Avatar animation={characterAnimation} wireframe={section === 1} /> */}
          </group>
        </motion.group>
      </mesh>

      {/* Geometrische Formen */}
      <motion.group
        position={[0, isMobile ? -viewport.height : -1 * officeScaleRatio, 1.2]}
        rotation={[0, -0.7, 0]}
        scale={1.0}
        animate={"" + section}
        variants={{
          0: {
            y: isMobile ? -viewport.height / 2 : -1,
            z: -8,
          },
          1: {
            y: isMobile ? -viewport.height / 2 : -6, 
            z: -8,
          },
          2: {
            y: isMobile ? -viewport.height / 2 : -13,
            x: 5,
            z: -12,
          },
          3: {
            y: isMobile ? -viewport.height / 2 : -18,
            x: 2,
            z: -10,
          },
          4: {
            y: isMobile ? -viewport.height / 2 : -20,
            z: -5,
          },
        }}
      >
        <directionalLight position={[0, 10, 5]} intensity={0.5} />
        <Float>
          <mesh position={[4, 0, -10]} scale={[1.2, 1.2, 1.2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transperent
              distort={0.4}
              speed={5}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh position={[-6, 1, -18]} scale={[3, 3, 3]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transperent
              distort={1}
              speed={4}
              color={"yellow"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh position={[-2, -4, -11]} scale={[1.4, 1.4, 1.4]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transperent
              factor={2}
              speed={3}
              color={"lightgreen"}
            />
          </mesh>
        </Float>
      </motion.group>

      <Projects section={section} />
    </>
  );
};
