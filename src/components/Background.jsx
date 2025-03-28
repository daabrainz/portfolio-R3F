import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = () => {
  const material = useRef();
  const color = useRef({
    color: "",
  });
  const data = useScroll();

  const tl = useRef();

  useFrame(() =>{
    tl.current.progress(data.scroll.current);
    material.current.color = new THREE.Color(
      color.current.color
    );
  })
  
  useEffect(() => {
    color.current.color = "#0D1B2A"; // Setze die Startfarbe
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(color.current, { color: "#1b2837" });
    tl.current.to(color.current, { color: "#E5E5E5" });
    tl.current.to(color.current, { color: "#1b2837" });
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};
