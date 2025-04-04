import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export const projects = [
  {
    title: "PW-Generator",
    description: "A little tool to generate random passwords",
    image: "/projects/PasswordGenerator.jpeg",
    link: "https://password-generator-sf.netlify.app/",
  },
  {
    title: "3D Portfolio",
    description: "A React Three Fiber driven portfolio",
    image: "/projects/portfolio.jpeg",
    link: "https://3d-portfolio-sf.netlify.app/",
  },
  // {
  //   title: "Spring Boot App",
  //   description: "A simple digital learning journal for students",
  //   image: "/projects/LearningJournal.jpeg",
  //   link: "https://learning-journal-sf.netlify.app/",
  // },
  {
    title: "Snake Game",
    description: "A basic 2D snake game",
    image: "/projects/snake.jpeg",
    link: "https://snake-2d-sf.netlify.app/",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);
  const [hovered, setHovered] = useState(false);
  const scale = useMotionValue(1);

  const glowMaterial = useRef();
  const glowIntensity = useMotionValue(0.2);

  useEffect(() => {
    animate(glowIntensity, highlighted || hovered ? 0.5 : 0.2);
    animate(bgOpacity, highlighted ? 0.7 : hovered ? 0.6 : 0.4);
    animate(scale, hovered ? 1.05 : 1, { duration: 0.3 });
  }, [highlighted, hovered]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();

  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.005}
        onClick={() => highlighted && window.open(project.link, "_blank")}
        onPointerOver={() => {
          if (highlighted) {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          if (highlighted) {
            setHovered(false);
            document.body.style.cursor = "auto";
          }
        }}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial
          color={hovered ? "#4f39f6" : "black"}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>

      {highlighted && (
        <motion.group
          position={[0.9, 0.8, 0.01]}
          animate={{
            scale: hovered ? 1.2 : 1,
            rotateZ: hovered ? 0.1 : 0,
          }}
        >
          <mesh>
            <planeGeometry args={[0.3, 0.3]} />
            <meshBasicMaterial
              color={hovered ? "black" : "#4f39f6"}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </mesh>
          <Text
            position-z={0.01}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            👆
          </Text>
        </motion.group>
      )}
      <motion.group animate={{ scale: scale.get() }}>
        <Image
          scale={[2, 1.2, 1]}
          url={project.image}
          toneMapped={false}
          position-y={0.3}
        />
        <Text
          maxWidth={2}
          anchorX={"center"}
          anchorY={"middle"}
          fontSize={0.16}
          position={[0, -0.6, 0.01]}
          font="/fonts/Unbounded-VariableFont_wght.ttf"
          color="white"
        >
          {project.title.toUpperCase()}
        </Text>
        <Text
          maxWidth={2}
          anchorX={"center"}
          anchorY={"middle"}
          fontSize={0.1}
          position={[-1, -0.6, 0]}
        ></Text>
      </motion.group>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = ({ section }) => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  if (section !== 2) return null;
  return (
    <group
      position-y={-viewport.height - 4}
      position-x={0}
      rotation-y={-Math.PI / 8}
    >
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, -1.5, -5]}
          animate={{
            x: 0 + (index - currentProject) * 2.8,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
