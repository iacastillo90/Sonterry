import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ProductModel from './ProductModel';
import { useConfiguratorStore } from '../../../store/useConfiguratorStore';

const SceneContent = ({ progressRef }) => {
  const groupRef = useRef();
  const controlsRef = useRef();
  const { scene } = useThree();

  const enableInteraction = useConfiguratorStore((s) => s.enableInteraction);
  const isAnimating = useConfiguratorStore((s) => s.isAnimating);
  const isInteractionPhase = useConfiguratorStore((s) => s.isInteractionPhase);

  scene.background = null;

  useFrame(() => {
    const p = progressRef.current;

    if (groupRef.current) {
      // Animate the group properties on scroll instead of camera to avoid overrides with OrbitControls
      groupRef.current.rotation.y = p * Math.PI * 2.5;
      groupRef.current.position.y = -p * 0.3;
      groupRef.current.rotation.x = p * 0.1;
      groupRef.current.scale.setScalar(1.0 - p * 0.05);
    }

    if (p >= 0.95 && isAnimating) {
      enableInteraction();
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, -3]} intensity={0.5} />
      <group ref={groupRef}>
        <ProductModel />
      </group>
      <OrbitControls
        ref={controlsRef}
        enabled={true}
        enableZoom={false}
        enablePan={false}
        minDistance={2.5}
        maxDistance={12}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={isInteractionPhase}
        autoRotateSpeed={1.5}
      />
      <Environment preset="city" background={false} />
    </>
  );
};

export default SceneContent;
