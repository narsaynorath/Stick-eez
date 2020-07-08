import React, { useEffect, useState } from 'react';

import { Responsive, WidthProvider } from 'react-grid-layout';

import Note from './Note';

const ResponsiveGridLayout = WidthProvider(Responsive);

function Main() {
  // fake a fetch request
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  const layouts = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 0, w: 3, h: 1, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    ],
  };
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      style={{ margin: '32px', height: '100%', background: '#f9f8f8' }}
    >
      <div key="a">
        <Note title="Hooblah" text="yaya" />
      </div>
      <div key="b">
        <Note />
      </div>
      <div key="c">
        <Note />
      </div>
    </ResponsiveGridLayout>
  );
}

export default Main;
