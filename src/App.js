import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';

function App() {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);
    const [panelContent, setPanelContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const viewer = OpenSeadragon({
          element: viewerRef.current,
            tileSources: '/tiles/mars.dzi',
            showNavigationControl: true,
            defaultZoomLevel: 1,
            minZoomLevel: 1,
            maxZoomLevel: 5,
            animationTime: 0.5,
            // zoomPerClick: 2.0,
            constrainDuringPan: true,    // Restrict panning to image bounds
            visibilityRatio: 1.0,
            gestureSettingsMouse: {
              scrollToZoom: false, // Disable scroll-wheel zoom
              clickToZoom: false,  // Disable click-to-zoom
              flickEnabled: false, // Disable flick gestures
          },
          preventDefaultAction: true,
      });
    //   viewer.addHandler('open', () => {
    //     setIsLoading(false);
    //     const bounds = viewer.world.getItemAt(0).getContentSize();
    //     const aspectRatio = bounds.y / bounds.x;
    //     const containerWidth = containerRef.current.offsetWidth;
    //     const newHeight = containerWidth * aspectRatio;
    //     console.log('New Height:', newHeight); // Should match width on mobile
    //     containerRef.current.style.height = `${newHeight}px`;
    // });
  //   viewer.addHandler('canvas-click', (event) => {
  //     event.preventDefaultAction = true;
  //     event.originalEvent.stopPropagation();
  //     const point = viewer.viewport.pointFromPixel(event.position);
  //     const x = point.x;
  //     const y = point.y;
  //     const i = Math.floor(x / (8192 / 20));
  //     const j = Math.floor(y / (8192 / 20));
  //     const sectionIndex = i + j * 20;
  //     setPanelContent(`Section ${sectionIndex}: Details go here.`);
  //     if (window.innerWidth > 768) {
  //         setTimeout(() => setPanelContent(null), 3000);
  //     }
  //     viewerRef.current.blur();
  // });
      return () => viewer.destroy(); // Cleanup on unmount
  }, []);
  return (
    <div className="App">
      <header className="header">
                    <h1>Mars Explorer</h1>
                    <nav>
                        <a href="/">Home</a> | <a href="/map">Map</a>
                    </nav>
                </header>
                <div className="map-container" ref={containerRef}>
            {isLoading && <div className="loading">Loading...</div>}
            <div ref={viewerRef} className="map" />
            {/* {panelContent && (
                window.innerWidth > 768 ? (
                    <div className="panel active">
                        <h2>{panelContent.split(':')[0]}</h2>
                        <p>{panelContent.split(':')[1]}</p>
                        <button onClick={() => setPanelContent(null)}>Close</button>
                    </div>
                ) : (
                    <div className="mobile-popup">
                        {panelContent}
                        <button onClick={() => setPanelContent(null)}>Close</button>
                    </div>
                )
            )} */}
        </div>
        <footer className="footer">
                    <p>&copy; 2025 Mars Project. All rights reserved.</p>
                    <p>Scroll down to see more content below...</p>
                    <div style={{ height: '500px', background: '#f0f0f0' }}>
                        Extra content to test scrolling
                    </div>
                </footer>
    </div>
  );
}

export default App;
