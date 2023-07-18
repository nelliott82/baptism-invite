import React, { useState, useEffect } from 'react';

const Background = ({ cardDiv }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
    };
  }, []);

  const isMobile = window.innerWidth <= 768;

  const elementStyle = {
    position: 'fixed',
    top: 0,
    transform: isMobile ? 'translateY(0)' : `translateY(${(-scrollY * 0.15)}px)`,
  };

  return (
    <div id="background" className="absolute inset-0" >
      <div className="h-[193%] max-md:h-full w-full bg-cover bg-repeat bg-[url('./assets/eucalyptus.jpg')]" style={elementStyle} />
    </div>
  )
}

export default Background;