import React from 'react'
import { Link } from "react-router-dom";

import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const NavBarItem = (props) => {
    return (
        <ListItemText inset>
                <Link to={props.linkTo} cursor="pointer" style={{textDecoration: 'none', color:"inherit"}}>
                        <Typography color="inherit" variant="title" >
                                {props.label}
                        </Typography>
                </Link>
        </ListItemText>
    )
}

export default NavBarItem;
