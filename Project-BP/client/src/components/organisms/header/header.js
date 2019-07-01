import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import NavBar from '../../molecules/navbar/navbar';

const Header = () => {
    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    BestPrep
                </Typography>
                <NavBar/>
            </Toolbar>
        </AppBar>
    )
}

export default Header
