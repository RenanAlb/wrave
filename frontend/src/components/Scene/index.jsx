import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Themes } from '../../Themes';

const RotatingSphere = () => {
  const sphereRef = useRef();
  const particlesRef = useRef();

  useFrame(() => {
    particlesRef.current.rotation.y -= 0.005; // Rotação das partículas
  });

  // Criar posições aleatórias para as partículas
  const particlePositions = new Float32Array(1000).map(() => THREE.MathUtils.randFloatSpread(10));

  return (
    <>
      {/* Esfera central */}
      <Sphere ref={sphereRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial color={'#0d0726'}  />
      </Sphere>

      {/* Partículas ao redor */}
      <Points ref={particlesRef} positions={particlePositions}>
        <PointMaterial color="#5435d0" size={0.05} sizeAttenuation />
      </Points>
    </>
  );
};

const Scene = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100%', position: 'absolute', top: '0' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color={'red'} />
      <RotatingSphere /> {/* Adiciona a esfera rotativa e as partículas */}
      <OrbitControls/>
    </Canvas>
  );
};

export default Scene;
