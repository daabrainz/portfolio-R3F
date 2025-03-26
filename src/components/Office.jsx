import React, { useEffect } from "react";
import { useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";

import * as THREE from "three";
import { animate, useMotionValue } from "framer-motion";

import { useFrame } from "@react-three/fiber";

export function Office(props) {
  const { section } = props;
  const { nodes, materials } = useGLTF("/models/office.gltf");
  const texture = useTexture("/textures/Baked.jpg");
  const textureVsCode = useVideoTexture("textures/vscode.mp4");

  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;

  const textureMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity: 1,
  });

  const textureGlassMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity: 0.42,
  });

  const textureOpacity = useMotionValue(0);
  const glassTextureOpacity = useMotionValue(0);

  useEffect(() => {
    animate(textureOpacity, section === 0 ? 1 : 0, {
      duration: 0.8,
    });
    animate(glassTextureOpacity, section === 0 ? 0.42 : 0, {
      duration: 0.8,
    });
  }, [section]);

  useFrame(() => {
    textureMaterial.opacity = textureOpacity.get();
    textureGlassMaterial.opacity = glassTextureOpacity.get();
  });

  return (
    <group {...props} dispose={null}>
      <mesh name="Screen" geometry={nodes.Screen.geometry} position-x={-0.0001}>
        <meshBasicMaterial map={textureVsCode} toneMapped={false} />
      </mesh>
      <mesh
        name="Fenster"
        geometry={nodes.Fenster.geometry}
        material={textureGlassMaterial}
      />
      <mesh
        name="Fläche"
        geometry={nodes.Fläche.geometry}
        material={textureMaterial}
      />
      <mesh
        name="Boden"
        geometry={nodes.Boden.geometry}
        material={textureMaterial}
      />
      <mesh
        name="Boden001"
        geometry={nodes.Boden001.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Bonsai"
        geometry={nodes.Bonsai.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Guitar"
        geometry={nodes.Guitar.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="iMac"
        geometry={nodes.iMac.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Maus"
        geometry={nodes.Maus.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Schrank"
        geometry={nodes.Schrank.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Stehlampe"
        geometry={nodes.Stehlampe.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Stuhl"
        geometry={nodes.Stuhl.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Tasse"
        geometry={nodes.Tasse.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Tastatur"
        geometry={nodes.Tastatur.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Teppich"
        geometry={nodes.Teppich.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="Tisch"
        geometry={nodes.Tisch.geometry}
        material={textureMaterial}
      />
      <motion.mesh
        scale={[0, 0, 0]}
        animate={{
          scale: section === 0 ? 1 : 0.5,
        }}
        name="FiddleleafFigPottedPlant_mesh"
        geometry={nodes.FiddleleafFigPottedPlant_mesh.geometry}
        material={textureMaterial}
        position={[0.59, 0, 0.688]}
      />
    </group>
  );
}

useGLTF.preload("/models/office.gltf");
