import { Image, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { MeshBasicMaterial, PlaneGeometry } from "three";

export const projects = [
  {
    title: "Password Generator",
    description: "A little tool to generate random passwords",
    image: "public/projects/PasswordGenerator.jpeg",
    link: "https://cool-strudel-fdd610.netlify.app/",
  },
  {
    title: "3D Portfolio",
    description: "A React Three Fiber driven portfolio",
    image: "public/projects/PasswordGenerator.jpeg",
    link: "https://cool-strudel-fdd610.netlify.app/",
  },
];

const Project = (props) => {
  const { project } = props;

  return (
    <group {...props}>
      <mesh position-z={-0.001} onClick={() => window.open(project.link, "_blank")}>
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
        position={[-1, -0.4, 0]}
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

export const Projects = ({section}) => {
  const { viewport } = useThree();
    if (section !== 2) return null;
  return (
    <group position-y={-viewport.height * 2} position-x={1}>
      {projects.map((project, index) => (
        <motion.group key={"project_" + index} position={[index * 2.5, -1.5, -5]}>
          <Project project={project} />
        </motion.group>
      ))}
    </group>
  );
};
