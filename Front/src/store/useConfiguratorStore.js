import { create } from 'zustand';

const COLORS = [
  { name: 'Blanco', hex: '#f5f5f0' },
  { name: 'Negro', hex: '#1a1a1a' },
  { name: 'Azul Marino', hex: '#1e3a5f' },
  { name: 'Rojo', hex: '#c0392b' },
  { name: 'Verde Oliva', hex: '#4a6741' },
  { name: 'Gris', hex: '#8e8e93' },
];

const PRINT_AREAS = [
  { id: 'full', label: 'Full Print', icon: 'LayoutGrid' },
  { id: 'decal', label: 'Estampado Central', icon: 'Square' },
  { id: 'logo', label: 'Solo Logo', icon: 'Minimal' },
];

export const useConfiguratorStore = create((set) => ({
  currentColor: COLORS[0].hex,
  currentTexture: null,
  printArea: 'decal',
  decalPosition: { x: 0, y: 0, z: 0.01 },
  isInteractionPhase: false,
  isAnimating: true,
  colors: COLORS,
  printAreas: PRINT_AREAS,

  setColor: (hex) => set({ currentColor: hex }),
  setTexture: (url) => set({ currentTexture: url }),
  setPrintArea: (id) => set({ printArea: id }),
  setDecalPosition: (pos) => set({ decalPosition: pos }),
  enableInteraction: () => set({ isInteractionPhase: true, isAnimating: false }),
  disableInteraction: () => set({ isInteractionPhase: false, isAnimating: true }),
  resetConfig: () => set({
    currentColor: COLORS[0].hex,
    currentTexture: null,
    printArea: 'decal',
    decalPosition: { x: 0, y: 0, z: 0.01 },
  }),
}));
