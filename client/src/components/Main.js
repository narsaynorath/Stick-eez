import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import GridLayout from 'react-grid-layout';

const useStyles = makeStyles(theme => ({
  contentMain: {
    padding: '32px',
  },
}));

function Main() {
  const classes = useStyles();

  // fake a fetch request
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];
  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      <div key="a" style={{ border: '1px solid black' }}>
        a
      </div>
      <div key="b" style={{ border: '1px solid black' }}>
        b
      </div>
      <div key="c" style={{ border: '1px solid black' }}>
        c
      </div>
    </GridLayout>
  );
}

export default Main;
