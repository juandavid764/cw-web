import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const estados = ['Pendiente', 'En proceso', 'En camino', 'Completado', 'Cancelado'];

export function DropdownButton({ avalibleOptions, options = estados, obtenerIndex = () => { } }) {
    let colorIncial = ''
    let estadoInicial = 0
    let color = false
    if (options[0] === 'Pendiente') {
        colorIncial = 'warning'
        estadoInicial = 2
        color = true
    }
    const [open, setOpen] = React.useState(false);
    const [colorStatus, setColorStatus] = React.useState(colorIncial);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(estadoInicial);

    //Se oprimio botonTitulo
    const handleClick = () => {
        console.log(`You clicked ${options[selectedIndex]}`);
    };

    // Se oprimio un item
    const handleMenuItemClick = (index) => {
        setSelectedIndex(index);
        setOpen(false);

        obtenerIndex(index)

        //verifica que se esta usando el array estados
        if (color) {
            switch (index) {
                // Pendiente
                case 0:
                    setColorStatus('white');
                    break;
                // En proceso
                case 1:
                    setColorStatus('primary');
                    break;
                //En camino 
                case 2:
                    setColorStatus('warning');
                    break;
                //Completado
                case 3:
                    setColorStatus('success');
                    break;
                //Cancelado
                case 4:
                    setColorStatus('error');
                    break;
            }

        }
    };

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
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
            >
                <Button color={colorStatus} onClick={handleClick} sx={{ textTransform: 'none' }}>{options[selectedIndex]}</Button>
                <Button
                    color={colorStatus}
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
            <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem sx={{ textTransform: 'none' }}>
                                    {options.map((option, index) => (
                                        <MenuItem

                                            key={option}
                                            disabled={index <= avalibleOptions}
                                            selected={index === selectedIndex}
                                            onClick={() => handleMenuItemClick(index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
