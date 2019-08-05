import React from 'react'
import { Typography } from '@material-ui/core';

const CareerDayStats = (props) => {
    return (
        <>
            <Typography variant='h5' component='h2' gutterBottom color='primary'>
                Stats
            </Typography>
            <Typography discplay='inline' variant="h6" component="p">
                Total Schools Registered:
                <br/>
                {props.totalRegistered}
                <br/>
                Total Students:
                <br/>
                {props.totalStudents}
                <br/>
                Total Careers:
                <br/>
                {props.totalSubjects}
            </Typography>
        </>
    )
}

export default CareerDayStats
