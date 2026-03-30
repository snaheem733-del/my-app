import { CrosshairConfig } from '../types/crosshair';

interface CrosshairDisplayProps {
  config: CrosshairConfig;
}

export const CrosshairDisplay = ({ config }: CrosshairDisplayProps) => {
  const { size, thickness, color, shape, opacity } = config;

  const baseStyle = {
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity,
    pointerEvents: 'none' as const,
  };

  const lineStyle = {
    backgroundColor: color,
    position: 'absolute' as const,
  };

  const renderPlus = () => (
    <>
      <div
        style={{
          ...baseStyle,
          ...lineStyle,
          width: `${size}px`,
          height: `${thickness}px`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        style={{
          ...baseStyle,
          ...lineStyle,
          width: `${thickness}px`,
          height: `${size}px`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );

  const renderDot = () => (
    <div
      style={{
        ...baseStyle,
        width: `${thickness * 2}px`,
        height: `${thickness * 2}px`,
        backgroundColor: color,
        borderRadius: '50%',
      }}
    />
  );

  const renderCircle = () => (
    <div
      style={{
        ...baseStyle,
        width: `${size * 2}px`,
        height: `${size * 2}px`,
        border: `${thickness}px solid ${color}`,
        borderRadius: '50%',
        backgroundColor: 'transparent',
      }}
    />
  );

  const renderCross = () => (
    <>
      <div
        style={{
          ...baseStyle,
          ...lineStyle,
          width: `${Math.sqrt(size * size * 2)}px`,
          height: `${thickness}px`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
        }}
      />
      <div
        style={{
          ...baseStyle,
          ...lineStyle,
          width: `${Math.sqrt(size * size * 2)}px`,
          height: `${thickness}px`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-45deg)',
        }}
      />
    </>
  );

  const renderBox = () => (
    <div
      style={{
        ...baseStyle,
        width: `${size * 2}px`,
        height: `${size * 2}px`,
        border: `${thickness}px solid ${color}`,
        backgroundColor: 'transparent',
      }}
    />
  );

  const shapeRenderers = {
    plus: renderPlus,
    dot: renderDot,
    circle: renderCircle,
    cross: renderCross,
    box: renderBox,
  };

  return <>{shapeRenderers[shape]()}</>;
};