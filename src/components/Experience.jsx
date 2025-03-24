import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Float,
} from "@react-three/drei";
import { Office } from "./Office";
import { motion } from "framer-motion-3d";
import { Avatar } from "./Avatar";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export const Experience = (props) => {
  const { section, menuOpened } = props;
  const { viewport } = useThree();

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -2 : -2);
    animate(cameraLookAtX, menuOpened ? 3 : 0);
  }, [menuOpened]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });


  return (
    <>
      <mesh>
        <ambientLight intensity={1.5} />
        <motion.group
          position={[-0.2, 0, 1.2]}
          rotation={[0, 0, 0]}
          scale={1.1}
          animate={{
            y: section === 0 ? 0 : -1,
          }}
        >
          <Office section={section} />
        </motion.group>
      </mesh>

      <motion.group position={[0, 0, 0.5]} rotation={[0, -0.7, 0]} scale={1.1}
        animate={{
          y: section === 1 ? -viewport.height / 2 : 0,
          x: 0,
        }}
      >
            <directionalLight position={[0, 10, 5]} intensity={0.4} />
            <Float>
              <mesh position={[1, -3, -15]} scale={[0.5, 0.5, 0.5]}>
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
              <mesh position={[4, 1, -18]} scale={[3, 3, 3]}>
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
              <mesh position={[-3, -1, -11]} scale={[1.4, 1.4, 1.4]}>
                <sphereGeometry />
                <MeshWobbleMaterial
                  opacity={0.8}
                  transperent
                  factor={1}
                  speed={5}
                  color={"blue"}
                />
              </mesh>
            </Float>

            <group scale={[0.8, 0.8, 0.8]} position-y={-2}>
              <Avatar animation={section === 0 ? "Falling" : "Standing"} />
            </group>
          </motion.group>
    </>
  );
};
