export interface CrosshairConfig {
  size: number;
  thickness: number;
  color: string;
  shape: 'plus' | 'dot' | 'circle' | 'cross' | 'box';
  opacity: number;
}

export interface Preset extends CrosshairConfig {
  name: string;
  id: string;
}

export const DEFAULT_CONFIG: CrosshairConfig = {
  size: 20,
  thickness: 2,
  color: '#ffffff',
  shape: 'plus',
  opacity: 1,
};