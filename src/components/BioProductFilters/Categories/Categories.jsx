import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const options = ['All', 'Anti bug', 'Anti illness', 'Growth stimulator'];

export default function Categories(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState([0]);

  const handleSelect = (event, index) => {
    if (selectedIndex.includes(0)) {
        setSelectedIndex([index])
    } else {
        if (index === 0) {
            setSelectedIndex([0])
        } else {
            if (selectedIndex.includes(index)) {
                if (selectedIndex.length > 1) {
                    setSelectedIndex(selectedIndex.filter(item => item !== index))
                } else {
                    setSelectedIndex([0])
                }
            } else {
                setSelectedIndex([...selectedIndex, index])
            }
        }
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button variant='outlined'>Категории: {selectedIndex.length}</Button>
          <Button
            variant='outlined'
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                  <FormGroup {...props.field} onChange={props.field.onChange(selectedIndex)} style={{marginLeft: '10px'}}>
                    {options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox checked={selectedIndex.includes(index)} onChange={(event) => {
                                handleSelect(event, index)
                            }} name="checkedA" />}
                            label={option}
                        />
                    ))}
                  </FormGroup>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}
