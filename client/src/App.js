import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Drawer from "./components/Drawer";
import MainToolbar from "./components/MainToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  toolbar: {
    paddingLeft: "4px",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  contentMain: {
    padding: "32px",
  },
}));

function App() {
  const classes = useStyles();
  const [clickedOpen, setClickedOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (e) => {
    // Persist the drawer if clicked open, else toggle on mouse enter and exit
    if (e.type === "click") {
      setClickedOpen(!clickedOpen);
      setDrawerOpen(!drawerOpen);
    } else if (e.type === "mouseenter" && !clickedOpen) {
      setDrawerOpen(true);
    } else if (e.type === "mouseleave" && !clickedOpen) {
      setDrawerOpen(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainToolbar toggleDrawer={toggleDrawer} />

      <Drawer open={drawerOpen} toggleDrawer={toggleDrawer} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.contentMain}>
          Some content that is really long so I can make a point
        </div>
      </main>
    </div>
  );
}

export default App;
