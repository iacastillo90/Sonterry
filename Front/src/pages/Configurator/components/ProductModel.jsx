import { useRef, useMemo } from 'react';
import { Decal, Float, useTexture } from '@react-three/drei';
import { useConfiguratorStore } from '../../../store/useConfiguratorStore';
import * as THREE from 'three';

const bodyGeo = new THREE.CylinderGeometry(1.4, 1.5, 2.2, 48, 1, true);
const rimGeo = new THREE.TorusGeometry(1.42, 0.07, 16, 48);
const baseGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 48);

const ProductModel = () => {
  const bodyRef = useRef();
  const { currentColor, currentTexture, printArea, isInteractionPhase } =
    useConfiguratorStore();

  const color = useMemo(() => new THREE.Color(currentColor), [currentColor]);

  const texture = useMemo(() => {
    if (!currentTexture) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(currentTexture);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    return tex;
  }, [currentTexture]);

  const materialProps = useMemo(() => ({
    color,
    metalness: 0.1,
    roughness: 0.6,
    clearcoat: 0.15,
    clearcoatRoughness: 0.4,
    side: THREE.DoubleSide,
    map: printArea === 'full' ? texture : null,
  }), [color, texture, printArea]);

  const showDecal = printArea !== 'full' && texture;
  const decalScale = printArea === 'logo' ? 0.4 : 1.2;

  return (
    <Float
      speed={0.8}
      rotationIntensity={isInteractionPhase ? 0 : 0.15}
      floatIntensity={isInteractionPhase ? 0 : 0.2}
    >
      <group>
        <mesh ref={bodyRef} geometry={bodyGeo} position={[0, 0, 0]}>
          <meshPhysicalMaterial {...materialProps} />

          {showDecal && (
            <Decal
              position={[0, 0.3, 1.51]}
              rotation={[0, 0, 0]}
              scale={decalScale}
              depthTest={true}
              polygonOffsetFactor={-1}
            >
              <meshBasicMaterial transparent polygonOffset polygonOffsetFactor={-1}>
                <primitive object={texture} attach="map" />
              </meshBasicMaterial>
            </Decal>
          )}
        </mesh>

        <mesh geometry={rimGeo} position={[0, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh geometry={baseGeo} position={[0, -1.15, 0]}>
          <meshPhysicalMaterial color="#404040" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
    </Float>
  );
};

export default ProductModel;
