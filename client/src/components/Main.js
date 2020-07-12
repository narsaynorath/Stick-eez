import React, { useState } from 'react';

import ReactGridLayout, { WidthProvider } from 'react-grid-layout';

import Note from './Note';

const GridLayout = WidthProvider(ReactGridLayout);

function Main({ user, notes }) {
  const [layout, setLayout] = useState(null);

  if (!user) {
    return null;
  }

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
    const sessionLayout = JSON.parse(
      localStorage.getItem(`layout-${user.username}`)
    );
    if (sessionLayout && sessionLayout.length) {
      setLayout(sessionLayout);
    } else {
      setLayout(newLayout);
    }
  }

  const handleLayoutChange = changedLayout => {
    if (changedLayout.length) {
      localStorage.setItem(
        `layout-${user.username}`,
        JSON.stringify(changedLayout)
      );
    }
  };

  return (
    <GridLayout
      cols={6}
      rowHeight={200}
      layout={layout}
      onLayoutChange={handleLayoutChange}
    >
      {notes.map(({ id, title, text }) => (
        <div key={`note-${id}`}>
          <Note id={id} title={title} text={text} />
        </div>
      ))}
    </GridLayout>
  );
}

export default Main;
