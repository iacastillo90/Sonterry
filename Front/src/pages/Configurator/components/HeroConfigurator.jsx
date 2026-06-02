import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SceneContent from './SceneContent';
import ConfiguratorPanel from './ConfiguratorPanel';
import { useConfiguratorStore } from '../../../store/useConfiguratorStore';

gsap.registerPlugin(ScrollTrigger);

const HeroConfigurator = () => {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const enableInteraction = useConfiguratorStore((s) => s.enableInteraction);
  const disableInteraction = useConfiguratorStore((s) => s.disableInteraction);
  const isAnimating = useConfiguratorStore((s) => s.isAnimating);
  const isInteractionPhase = useConfiguratorStore((s) => s.isInteractionPhase);

  useGSAP(() => {
    const proxy = { value: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        progressRef.current = proxy.value;
        if (proxy.value < 0.95) {
          disableInteraction();
        }
      },
      onComplete: () => {
        enableInteraction();
      },
    });

    tl.to(proxy, {
      value: 1,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    return () => tl.scrollTrigger?.kill();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0.3, 9.0], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      >
        <SceneContent progressRef={progressRef} />
      </Canvas>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className={`transition-opacity duration-700 ${isInteractionPhase ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-neutral-600 text-sm tracking-widest uppercase">
            Desplázate para descubrir
          </p>
          <div className="mt-2 flex justify-center">
            <div className="w-5 h-8 border-2 border-neutral-400 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-neutral-500 rounded-full mt-1 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-1000 ease-out ${
        isInteractionPhase ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}>
        <ConfiguratorPanel />
      </div>
    </section>
  );
};

export default HeroConfigurator;
