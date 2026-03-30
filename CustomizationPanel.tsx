import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Settings, Save, RefreshCw, Trash2 } from 'lucide-react';
import { useCrosshair } from '../hooks/useCrosshair';

export const CustomizationPanel = () => {
  const {
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
  } = useCrosshair();

  const [newPresetName, setNewPresetName] = useState('');

  const handleSavePreset = () => {
    if (newPresetName.trim()) {
      saveCurrentPreset(newPresetName.trim());
      setNewPresetName('');
    }
  };

  const selectedPreset = presets.find(p => p.id === selectedPresetId);

  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-slate-900 border-r border-slate-700 p-4 overflow-y-auto z-50">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-slate-400" />
        <h1 className="text-lg font-bold text-white">CrossHire</h1>
      </div>

      <Card className="bg-slate-800 border-slate-700 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-slate-200">Crosshair Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs">Shape</Label>
            <Select
              value={config.shape}
              onValueChange={(value: any) => updateConfig('shape', value)}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="plus" className="text-white">Plus</SelectItem>
                <SelectItem value="dot" className="text-white">Dot</SelectItem>
                <SelectItem value="circle" className="text-white">Circle</SelectItem>
                <SelectItem value="cross" className="text-white">Cross</SelectItem>
                <SelectItem value="box" className="text-white">Box</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-400 text-xs">Size: {config.size}px</Label>
            <input
              type="range"
              min="1"
              max="50"
              value={config.size}
              onChange={(e) => updateConfig('size', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-400 text-xs">Thickness: {config.thickness}px</Label>
            <input
              type="range"
              min="1"
              max="10"
              value={config.thickness}
              onChange={(e) => updateConfig('thickness', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-400 text-xs">Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.color}
                onChange={(e) => updateConfig('color', e.target.value)}
                className="w-12 h-10 rounded cursor-pointer bg-slate-700 border border-slate-600"
              />
              <Input
                type="text"
                value={config.color}
                onChange={(e) => updateConfig('color', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white text-sm flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-400 text-xs">Opacity: {Math.round(config.opacity * 100)}%</Label>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.05"
              value={config.opacity}
              onChange={(e) => updateConfig('opacity', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label className="text-slate-400 text-xs">Lock Position</Label>
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`w-12 h-6 rounded-full transition-colors ${
                isLocked ? 'bg-blue-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  isLocked ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <Button
            onClick={resetConfig}
            variant="outline"
            className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-slate-200">Presets</CardTitle>
          <CardDescription className="text-slate-500 text-xs">
            {selectedPreset ? `Active: ${selectedPreset.name}` : 'No preset selected'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={selectedPresetId} onValueChange={loadPresetById}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {presets.map((preset) => (
                <SelectItem key={preset.id} value={preset.id} className="text-white">
                  {preset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              placeholder="Preset name..."
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white text-sm"
            />
            <Button
              onClick={handleSavePreset}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Save className="w-4 h-4" />
            </Button>
          </div>

          {selectedPresetId !== 'default' && (
            <Button
              onClick={() => deletePresetById(selectedPresetId)}
              variant="outline"
              size="sm"
              className="w-full bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Preset
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};