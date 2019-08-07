import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import NavBarItem from '../../atoms/navBarItem/navBarItem';

const NavBar = () => {
    return (
        <List component="nav">
            <ListItem component="div">
                <NavBarItem label="Import" linkTo="/import"/>
                <NavBarItem label="Matching Results" linkTo="/Override"/>
                <NavBarItem label="Statistics" linkTo="/dashboard"/>
            </ListItem>
        </List>
    )
}

export default NavBar;
