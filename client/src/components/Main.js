import React, { useState } from 'react';

import GridLayout from 'react-grid-layout';

import Note from './Note';

function Main({ notes }) {
  const [layout, setLayout] = useState(null);

  let x = 0;
  let y = 0;
  const newLayout = notes.map(({ id }) => {
    const position = {
      i: `note-${id}`,
      x,
      y,
      w: 1,
      h: 1,
    };

    x++;
    y++;
    if (x >= 6) {
      x = 0;
    }

    return position;
  });

  if (!layout) {
    setLayout(newLayout);
  }

  return (
    <GridLayout cols={6} width={1200} rowHeight={200} layout={layout}>
      {notes.map(({ id, title, text }) => (
        <div key={`note-${id}`}>
          <Note id={id} title={title} text={text} />
        </div>
      ))}
    </GridLayout>
  );
}

export default Main;
