import React from 'react'

import { makeStyles } from '@material-ui/core';
import BioProductFilters from './components/BioProductFilters'
import BioProducts from './components/BioProducts'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    display: 'flex',
    gap: theme.spacing(1)
  }
}))

function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BioProductFilters/>
      <BioProducts/>
    </div>
  );
}

export default App;
