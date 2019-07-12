import React, {useEffect} from 'react'
import randomColor from 'randomcolor'
import { Typography } from '@material-ui/core';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label
} from 'recharts'

//TODO: Possibly make this component more reusable by switching hardcoded stuff to props
const PreferenceBarChart = (props) => {
    
    //TODO: make this receive props of the data
    let dataIn = require('../../../registeringClasses.json')
    let tallyData = {}

    //Tally up the number of students that preferred each subject
    dataIn.forEach(regClass => {
        regClass.students.forEach(student => {
            student.preferedSubjects.forEach(subject => {
                tallyData[subject.name]= (tallyData[subject.name]!=null) ? tallyData[subject.name]+1 : 1
            })
        })
    });
    
    let data = []
    //Push the tallied data to the data array in a format that Recharts can understand
    for(const [subject,students] of Object.entries(tallyData)){
        data.push({subject: subject, students: students})
    }
    return (
        <>
        <Typography variant='h5' component='h2' gutterBottom color='primary'>
            Student Preferences
        </Typography>
        <ResponsiveContainer>
            <BarChart
            data={data}
            margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                    <YAxis>
                        <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
                            Number of students
                        </Label>
                    </YAxis>
                    <Tooltip />
                <Bar dataKey="students" fill="#3f51b5" />
            </BarChart>
      </ResponsiveContainer>
      </>
    )
}

export default PreferenceBarChart
