import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

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

const queryClient = new QueryClient()

function App() {
  const classes = useStyles()

  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.root}>
        <BioProductFilters/>
        <BioProducts/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
