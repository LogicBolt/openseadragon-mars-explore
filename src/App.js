import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';

function App() {
  const viewerRef = useRef(null);
    const [panelContent, setPanelContent] = useState(null);
    useEffect(() => {
      const viewer = OpenSeadragon({
          element: viewerRef.current,
          tileSources: '/tiles/mars.dzi',
          showNavigationControl: true,
          defaultZoomLevel: 1,
          minZoomLevel: 1,
          maxZoomLevel: 3,
          animationTime: 0.5,
      });

      viewer.addHandler('canvas-click', (event) => {
          const point = viewer.viewport.pointFromPixel(event.position);
          const x = point.x;
          const y = point.y;
          const i = Math.floor(x / (8192 / 20)); // Column (0-19)
          const j = Math.floor(y / (8192 / 20)); // Row (0-19)
          const sectionIndex = i + j * 20; // 0-399
          setPanelContent(`Section ${sectionIndex}: Details go here.`);
          if (window.innerWidth > 768) {
              setTimeout(() => setPanelContent(null), 3000); // Auto-hide
          }
      });

      return () => viewer.destroy(); // Cleanup on unmount
  }, []);
  return (
    <div className="App">
     <div className="map-container">
            <div ref={viewerRef} className="map" />
            {panelContent && (
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
            )}
        </div>
    </div>
  );
}

export default App;
