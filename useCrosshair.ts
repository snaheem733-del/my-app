import { useState, useEffect } from 'react';
import { CrosshairConfig, DEFAULT_CONFIG } from '../types/crosshair';
import { getPresets, savePreset, deletePreset, loadPreset } from '../utils/presets';

export const useCrosshair = () => {
  const [config, setConfig] = useState<CrosshairConfig>(DEFAULT_CONFIG);
  const [isLocked, setIsLocked] = useState(true);
  const [presets, setPresets] = useState(getPresets());
  const [selectedPresetId, setSelectedPresetId] = useState<string>('default');

  useEffect(() => {
    setPresets(getPresets());
  }, []);

  const updateConfig = <K extends keyof CrosshairConfig>(key: K, value: CrosshairConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    setSelectedPresetId('default');
  };

  const saveCurrentPreset = (name: string) => {
    const saved = savePreset(name, config);
    setPresets(getPresets());
    setSelectedPresetId(saved.id);
  };

  const loadPresetById = (id: string) => {
    const loaded = loadPreset(id);
    if (loaded) {
      setConfig(loaded);
      setSelectedPresetId(id);
    }
  };

  const deletePresetById = (id: string) => {
    if (id === 'default') return;
    deletePreset(id);
    setPresets(getPresets());
    if (selectedPresetId === id) {
      loadPresetById('default');
    }
  };

  return {
    config,
    isLocked,
    setIsLocked,
    presets,
    selectedPresetId,
    updateConfig,
    resetConfig,
    saveCurrentPreset,
    loadPresetById,
    deletePresetById,
  };
};