# Table of Contents
- [Table of Contents](#table-of-contents)
  - [**Route: /api/classrooms/getStudents**](#route-apiclassroomsgetstudents)
  - [Expected Request Parameters (JSON)](#expected-request-parameters-json)
  - [Environmental Variables](#environmental-variables)
  - [Response](#response)
  - [Usage](#usage)
  - [Packages Used](#packages-used)

## **Route: /api/classrooms/getStudents**

## Expected Request Parameters (JSON)
    - body
      - classId: String
## Environmental Variables
    - COSMOSDB_CONNSTR: String
    - COSMOSDB_USER: String
    - COSMOSDB_PASSWORD: String
## Response
    - Type: 
    - Format:
       {
           message: String,
           students: [<Student Object>],
           teacherName: String
           school: String
       }

## Usage

## Packages Used
- [Mongoose](https://www.npmjs.com/package/mongoose "Mongoose NPM Page")
