import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const UseStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
  }));

const step3 = (props) => {
    const prepData = () =>{
        let rows = [];
        props.schools.forEach(school =>{
            let studentCount = 0
            let regClassNum = props.filter(regClass => {
                if (regClass.school.id === school.id && regClass.careerDayId === props.careerDay.id){
                    studentCount += regClass.students.length
                }
                return (regClass.school.id === school.id && regClass.careerDayId === props.careerDay.id)
            }).length
            rows.push({
                "name": school.name,
                "registeringClasses": regClassNum,
                "students": studentCount
            })
        })
        return rows;
    }
    const classes = UseStyles();
    return (
        <Paper className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>School</TableCell>
                        <TableCell align="center">Students Registered</TableCell>
                        <TableCell align="center">Seats</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map(school=> (
                        <TableRow key={school.name}>
                            <TableCell component="th" scope="row">
                                {school.name}
                            </TableCell>
                            <TableCell align="center">{school.registeringClasses}</TableCell>
                            <TableCell align="center">{school.students}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default step3
