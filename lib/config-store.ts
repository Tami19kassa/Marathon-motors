import { create } from "zustand";

export interface CarColor {
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
}

const factoryColors: CarColor[] = [
  { name: "Digital Teal", hex: "#003a45", metalness: 0.9, roughness: 0.2 },
  { name: "Gravity Gold", hex: "#a4947c", metalness: 0.8, roughness: 0.4 },
  { name: "Lucid Blue", hex: "#2b4c7e", metalness: 0.9, roughness: 0.1 },
  { name: "Cyber Grey", hex: "#5e6264", metalness: 0.8, roughness: 0.3 },
  { name: "Atlas White", hex: "#ffffff", metalness: 0.5, roughness: 0.5 },
];

interface ConfiguratorState {
  activeColor: CarColor;
  setactiveColor: (color: CarColor) => void;
  factoryColors: CarColor[];
}

export const useConfigStore = create<ConfiguratorState>((set) => ({
  activeColor: factoryColors[0],
  factoryColors: factoryColors,
  setactiveColor: (color) => set({ activeColor: color }),
}));