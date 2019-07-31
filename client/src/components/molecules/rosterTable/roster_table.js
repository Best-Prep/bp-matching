import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function createData(Student, School, Teacher) {
  return { Student, School, Teacher};
}
//TODO: Fix this table so that it is not hardcoded to have specific columns and rows, this would make it more reusable
const RosterTable = (props) =>  {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell> Student</TableCell>
            <TableCell align="right">School</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.students.map(student => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row">
                {student.firstName + " " + student.lastName}
              </TableCell>
              <TableCell align="right">{student.school}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default RosterTable;