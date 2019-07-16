import React from 'react'

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";

import NavBar from '../../molecules/navbar/navbar';

const Header = (props) => {
    return (
        <AppBar style={{background: '#0067ac'}} position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    <Link to={props.linkTo} cursor="pointer" style={{textDecoration: 'none', color:"#ffffff"}}>
                        {props.headName}
                    </Link>
                </Typography>
                <NavBar/>
            </Toolbar>
        </AppBar>
    )
}

export default Header
