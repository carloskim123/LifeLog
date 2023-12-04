import { useEffect, useState } from 'react';

function ScreenSizeComponent() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <p>Screen Width: {screenSize.width}</p>
      <p>Screen Height: {screenSize.height}</p>
    </div>
  );
}

export default ScreenSizeComponent;
