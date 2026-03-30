import { Preset, CrosshairConfig, DEFAULT_CONFIG } from '../types/crosshair';

const STORAGE_KEY = 'crosshire-presets';

export const savePreset = (name: string, config: CrosshairConfig): Preset => {
  const presets = getPresets();
  const newPreset: Preset = {
    id: Date.now().toString(),
    name,
    ...config,
  };
  
  // Update existing or add new
  const existingIndex = presets.findIndex(p => p.name === name);
  if (existingIndex >= 0) {
    presets[existingIndex] = newPreset;
  } else {
    presets.push(newPreset);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  return newPreset;
};

export const getPresets = (): Preset[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Add default preset
      const defaultPreset: Preset = {
        id: 'default',
        name: 'Classic White',
        ...DEFAULT_CONFIG,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultPreset]));
      return [defaultPreset];
    }
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const deletePreset = (id: string): void => {
  const presets = getPresets().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
};

export const loadPreset = (id: string): CrosshairConfig | null => {
  const presets = getPresets();
  const preset = presets.find(p => p.id === id);
  if (!preset) return null;
  
  const { id: _, name: __, ...config } = preset;
  return config;
};