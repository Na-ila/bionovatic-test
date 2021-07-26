import React from 'react';
import axios from 'axios'
import {useMutation,useQueryClient, useQuery} from 'react-query';

import { TableContext } from '../TableContext';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination'

const useRowStyles = makeStyles({
  tableRoot: {
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'flex-end'
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableHead: {
    backgroundColor: '#cacaca !important'
  },
  title: {
    backgroundColor: '#cacaca'
  }
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={0}>
              <div>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem className={classes.title}>
                        <ListItemText primary="Объем" />
                        <ListItemText primary="Цена" />
                    </ListItem>
                    <Divider/>
                    {row.availableVolumes.map(item => 
                        <ListItem>
                        <ListItemText primary={item.liters + 'л'} />
                        <ListItemText primary={item.priceRub + '₽'} />
                        </ListItem>
                    )}
                </List>
              </div>
              <div>
                <ListItem className={classes.title}>
                    <ListItemText primary="Категории" />
                </ListItem>
                <Divider/>
                {row.categories.map(item => 
                    <ListItem>
                    <ListItemText primary={item} />
                    </ListItem>
                )}
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function BioProducts() {
    const classes = useRowStyles();
    const [getState, setState] = React.useContext(TableContext)

    const queryClient = useQueryClient()

    const { isLoading, error, data } = useQuery('products', () =>
        axios('product-list')
    )

    const mutation = useMutation(axios.get('product-list'), {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries('products')
          setState({
            ...getState,
            data: getState.data,
            pages: getState.pages
          })
        },
      })

    const changePage = (e, page) => {
        mutation.mutate(page)
    }

  return (
    <div className={classes.tableRoot}>
        <TableContainer style={{maxHeight: '90vh'}} component={Paper}>
        <Table size='small' aria-label="collapsible table">
            <TableHead className={classes.tableHead}>
            <TableRow>
                <TableCell style={{width: '30px'}}/>
                <TableCell>Наименование</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {getState.data.map((row) => (
                <Row key={row.id} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Pagination count={getState.pages} variant="outlined" shape="rounded" onChange={changePage}/>
    </div>
  );
}
