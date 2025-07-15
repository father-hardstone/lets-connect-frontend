import React, { useState, useEffect } from 'react';

interface CustomTooltipProps {
  children: React.ReactElement;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  children, 
  content, 
  position = 'top',
  delay = 0 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const calculateTooltipPosition = (mouseX: number, mouseY: number) => {
    const tooltipWidth = 120; // Approximate tooltip width
    const tooltipHeight = 40; // Approximate tooltip height
    const padding = 10; // Distance from mouse cursor
    
    let x = mouseX + padding;
    let y = mouseY - padding;
    
    // Check if tooltip would go off the right edge
    if (x + tooltipWidth > window.innerWidth) {
      x = mouseX - tooltipWidth - padding;
    }
    
    // Check if tooltip would go off the left edge
    if (x < 0) {
      x = padding;
    }
    
    // Check if tooltip would go off the bottom edge
    if (y + tooltipHeight > window.innerHeight) {
      y = mouseY - tooltipHeight - padding;
    }
    
    // Check if tooltip would go off the top edge
    if (y < 0) {
      y = padding;
    }
    
    return { x, y };
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      const position = calculateTooltipPosition(e.clientX, e.clientY);
      setTooltipPosition(position);
    }, delay);
    
    // Store timer reference to clear if needed
    (e.currentTarget as any).tooltipTimer = timer;
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if ((e.currentTarget as any).tooltipTimer) {
      clearTimeout((e.currentTarget as any).tooltipTimer);
    }
    setShowTooltip(false);
  };

  return (
    <>
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      } as React.HTMLAttributes<HTMLElement>)}
      
      {showTooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            background: 'white',
            padding: '0.5rem 0.8rem',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#333',
            zIndex: 1001,
            pointerEvents: 'none',
            border: '1px solid #e0e0e0',
            whiteSpace: 'nowrap'
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default CustomTooltip; 