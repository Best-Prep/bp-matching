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

const rows = [
  createData('Frozen yoghurt', 159, 'Help', 24, 4.0),
  createData('Ice cream sandwich',69 , 'Me', 37, 4.3),
  createData('Eclair', 262, 'I',4 , 6.0),
  createData('Cupcake', 305, 'Am', 4, 4.3),
  createData('Gingerbread', 356, 'Expressing the strong desire to play ping pong', 49, 3.9),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell> Student</TableCell>
            <TableCell align="right">School</TableCell>
            <TableCell align="right">Teacher</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.Student}
              </TableCell>
              <TableCell align="right">{row.School}</TableCell>
              <TableCell align="right">{row.Teacher}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}