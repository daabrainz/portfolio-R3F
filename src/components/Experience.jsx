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
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Background } from "./Background";

export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;


  const [section, setSection] = useState();

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const characterContainerAboutRef = useRef();
  const [characterAnimation, setCharacterAnimation] = useState("Typing");

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

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    // const position = new THREE.Vector3();
    // characterContainerAboutRef.current.getWorldPosition(position);
    // console.log([position.x, position.y, position.z]);

    const quaternion = new THREE.Quaternion();
    characterContainerAboutRef.current.getWorldQuaternion(quaternion);
    const euler = new THREE.Euler();
    euler.setFromQuaternion(quaternion, "XYZ");

    console.log([euler.x, euler.y, euler.z]);
  });

  return (
    <>
      <Background />

      <motion.group
        position={[
          0.2208597124428327, 0.054, 2.29733495918678 
        ]}
        rotation={[-0, 1.3519999999999992, -0]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: 0.353,
            scaleY: 0.353,
            scaleZ: 0.353,
          },
          1: {
            scale: 1.8,
            y: -viewport.height - 1.7,
            x: 0.5,
            z: 0,
            rotateX: 0,
            rotateY: -0.5,
            rotateZ: 0,
          },
          2: {
            scale: 0.8,
            x: -1,
            y: -viewport.height - 5.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 3,
            rotateZ: 0,
          },
          3: {
            y: -viewport.height - 12.5,
            x: 1,
            z: 0,
            rotateX: 0,
            rotateY: -Math.PI / 3,
            rotateZ: 0,
            scale: 3,
          },
        }}
      >
        <Avatar animation={characterAnimation} wireframe={section === 1} />
      </motion.group>

      {/* Position Office & Avatar */}
      <mesh>
        <ambientLight intensity={1} />
        <motion.group
          position={[-0.2, 0, 2.3]}
          rotation={[0, 0.2, 0]}
          scale={1}
          animate={{
            y: section === 0 ? 0 : -1,
          }}
        >
          <Office section={section} />
          <group
            ref={characterContainerAboutRef}
            name="AvatarSpot"
            position={[0.413, 0.054, 0.081]} rotation={[0, 1.152, 0]} scale={0.353}
          >
            {/* <Avatar animation={characterAnimation} wireframe={section === 1} /> */}
          </group>
        </motion.group>
      </mesh>

      <motion.group
        position={[0, 0, 1.2]}
        rotation={[0, -0.7, 0]}
        scale={1.0}
        animate={{
          y: section === 1 ? -viewport.height / 2 : 0,
          x: 0,
        }}
      >
        {/* Geometrische Formen */}
        <directionalLight position={[0, 10, 5]} intensity={0.5} />
        <Float>
          <mesh position={[3, -3, -5]} scale={[0.5, 0.5, 0.5]}>
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
          <mesh position={[-10, -4, -11]} scale={[1.4, 1.4, 1.4]}>
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
