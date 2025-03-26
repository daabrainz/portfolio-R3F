import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Float,
  useScroll,
} from "@react-three/drei";
import { Office } from "./Office";
import { motion } from "framer-motion-3d";
import { Avatar } from "./Avatar";
import { Projects } from "./Projects";
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
        position={[
          0.22790000000000005, 0.036300000000000006, 1.2593999999999999,
        ]}
        rotation={[-0, 1.152, -0]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: 0.38,
            scaleY: 0.38,
            scaleZ: 0.38,
          },
          1: {
            scale: 1.5,
            y: -viewport.height - 1.2,
            x: 0.5,
            z: 0,
            rotateX: 0,
            rotateY: -0.5,
            rotateZ: 0,
          },
          2: {
            scale: 0.8,
            x: -1.2,
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
          position={[-0.2, 0, 1.2]}
          rotation={[0, 0, 0]}
          scale={1}
          animate={{
            y: section === 0 ? 0 : -1,
          }}
        >
          <Office section={section} />
          <group
            ref={characterContainerAboutRef}
            name="AvatarSpot"
            position={[0.389, 0.033, 0.054]}
            rotation={[0, 1.152, 0]}
          ></group>
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
          <mesh position={[1, -3, -5]} scale={[0.5, 0.5, 0.5]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transperent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh position={[4, -6, -18]} scale={[3, 3, 3]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transperent
              distort={1}
              speed={5}
              color={"yellow"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh position={[-8, -5, -11]} scale={[1.4, 1.4, 1.4]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transperent
              factor={1}
              speed={5}
              color={"lightgreen"}
            />
          </mesh>
        </Float>
      </motion.group>

      <Projects section={section} />
    </>
  );
};
