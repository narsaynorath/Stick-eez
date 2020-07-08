import React, { useEffect, useState } from 'react';

import { Responsive, WidthProvider } from 'react-grid-layout';

import Note from './Note';

const ResponsiveGridLayout = WidthProvider(Responsive);

function Main({ notes }) {
  // fake a fetch request
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  if (!loaded || !notes) {
    return <div>Loading...</div>;
  }

  console.log(notes);

  const lgLayouts = notes.map(({ title }) => {
    return {
      i: btoa(title),
      x: Math.ceil(Math.random() * 12),
      y: Math.ceil(Math.random() * notes.length),
      w: Math.ceil(Math.random() * 6),
      h: Math.ceil(Math.random() * 3),
    };
  });

  const layouts = {
    lg: lgLayouts,
  };
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      style={{ margin: '32px', height: '100%', background: '#f9f8f8' }}
    >
      {notes.map(({ id, title, text }) => (
        <div key={btoa(title)}>
          <Note id={id} title={title} text={text} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}

export default Main;
