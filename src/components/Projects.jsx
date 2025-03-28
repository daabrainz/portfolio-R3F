import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { MeshBasicMaterial, PlaneGeometry } from "three";

export const projects = [
  {
    title: "Password Generator",
    description: "A little tool to generate random passwords",
    image: "/projects/PasswordGenerator.jpeg",
    link: "https://password-generator-sf.netlify.app/",
  },
  {
    title: "3D Portfolio",
    description: "A React Three Fiber driven portfolio",
    image: "/projects/3D-Portfolio.jpeg",
    link: "https://3d-portfolio-sf.netlify.app/",
  },
  {
    title: "Spring Boot App",
    description: "A simple digital learning journal for students",
    image: "/projects/LearningJournal.jpeg",
    link: "https://learning-journal-sf.netlify.app/",
  },
  {
    title: "Snake Game",
    description: "A basic 2D snake game",
    image: "/projects/LearningJournal.jpeg",
    link: "https://snake-2d-sf.netlify.app/",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4)
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh position-z={-0.005} onClick={() => window.open(project.link, "_blank")}
        ref={background}>
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"righ"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-0.9, -0.4, 0.1]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.1}
        position={[-1, -0.6, 0]}>
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = ({section}) => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

    if (section !== 2) return null;
  return (
    <group position-y={-viewport.height - 4} position-x={0} rotation-y={-Math.PI / 8}>
      {projects.map((project, index) => (
        <motion.group key={"project_" + index} position={[index * 2.5, -1.5, -5]}
        animate={{
          x: 0 + (index - currentProject) * 2.8,
          y: currentProject === index ? 0 : -0.1,
          z: currentProject === index ? -2 : -3, 
          rotateX: currentProject === index ? 0 : -Math.PI / 3,
          rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
        }}>
          <Project project={project} highlighted={index === currentProject}/>
        </motion.group>
      ))}
    </group>
  );
};
