import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

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

  const layouts = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
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
    >
      <div key="a" style={{ border: '1px solid black' }}>
        1
      </div>
      <div key="b" style={{ border: '1px solid black' }}>
        2
      </div>
      <div key="c" style={{ border: '1px solid black' }}>
        3
      </div>
    </ResponsiveGridLayout>
  );
}

export default Main;
