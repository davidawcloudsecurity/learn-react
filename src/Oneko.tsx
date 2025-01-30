import { useEffect, useState } from 'react';
const Oneko = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  useEffect(() => {
    const updatePosition = () => {
      const dx = targetPosition.x - position.x;
      const dy = targetPosition.y - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 1) {
        setIsMoving(false);
        return;
      }
      setIsMoving(true);
      const speed = Math.min(distance, 10);
      const angle = Math.atan2(dy, dx);
      setPosition({
        x: position.x + Math.cos(angle) * speed,
        y: position.y + Math.sin(angle) * speed,
      });
    };
    const animationFrame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, targetPosition]);
  const spritePosition = isMoving
    ? `${Math.floor((Date.now() / 100) % 4) * -32}px -32px`
    : '0 0';
  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        position: 'fixed',
        left: `${position.x - 16}px`,
        top: `${position.y - 16}px`,
        pointerEvents: 'none',
        backgroundImage: 'url("/oneko.gif")',
        backgroundPosition: spritePosition,
        transform: `scaleX(${targetPosition.x < position.x ? -1 : 1})`,
        transition: 'transform 0.1s',
        zIndex: 999999,
      }}
    />
  );
};
export default Oneko;
