import React, { useState, useEffect, ReactNode } from 'react';
import './PresentationDeck.css';

interface SlideProps {
  children: ReactNode;
  isActive: boolean;
}

export const Slide: React.FC<SlideProps> = ({ children, isActive }) => {
  return (
    <div className={`slide ${isActive ? 'slide-active' : 'slide-hidden'}`}>
      <div className="slide-content">
        {children}
      </div>
    </div>
  );
};

interface PresentationDeckProps {
  children: ReactNode[];
}

export const PresentationDeck: React.FC<PresentationDeckProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide((prev) => Math.min(prev + 1, children.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [children.length]);

  return (
    <div className="presentation-container">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // @ts-ignore
            isActive: index === currentSlide,
          });
        }
        return child;
      })}
      
      <div className="presentation-controls">
        <span>{currentSlide + 1} / {children.length}</span>
      </div>
    </div>
  );
};
