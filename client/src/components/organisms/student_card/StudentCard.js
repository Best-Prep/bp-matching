import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Paper, Typography, Grid } from '@material-ui/core';
import Dropdown from '../../atoms/Dropdown/Dropdown'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    lists:{
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    }
  }));

const StudentCard = (props) => {
    console.log(props.schedule)
    const classes = useStyles();
    //TODO: add actual functionality instead of the dummy data in the Dropdown menuItems prop, fix handleChange for dropdown
    return (
        <div style={{marginLeft:200, marginRight:200}}>
            <Paper>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <div style={{paddingLeft:30}}>
                        <Typography>
                            {props.studentName}
                        </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div style={{paddingRight:15}}>
                            <Typography spacing={3}>
                                <List className={classes.lists}>
                                    {props.schedule.map((item,index) => (
                                        <ListItem>
                                            <Dropdown menuItems={["math","science","physics","finance"]} studentIndex={props.studentIndex} classIndex={index} value={item.name} key={"item"+index} display={false} handleChange={props.handleChange} InputProps={{readOnly: true}}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default StudentCard


