import { CrosshairDisplay } from './components/CrosshairDisplay';
import { CustomizationPanel } from './components/CustomizationPanel';
import { useCrosshair } from './hooks/useCrosshair';

function App() {
  const { config, isLocked } = useCrosshair();

  return (
    <div className="w-screen h-screen bg-slate-900 overflow-hidden">
      <CustomizationPanel />
      
      <div
        className={`fixed inset-0 pointer-events-none ${isLocked ? '' : 'cursor-move'}`}
        style={{ zIndex: 9999 }}
      >
        <CrosshairDisplay config={config} />
      </div>

      <div className="fixed bottom-4 right-4 text-slate-600 text-xs">
        Press F11 for fullscreen • CrossHire v1.0
      </div>
    </div>
  );
}

export default App;