# Table of Contents
- [Table of Contents](#table-of-contents)
  - [**Route: /api/classrooms/getClassrooms**](#route-apiclassroomsgetclassrooms)
  - [Expected Request Parameters (JSON)](#expected-request-parameters-json)
  - [Environmental Variables](#environmental-variables)
  - [Response](#response)
  - [Usage](#usage)
  - [Packages Used](#packages-used)

## **Route: /api/classrooms/getClassrooms**

## Expected Request Parameters (JSON)
    - body
      - careerDayDate: String yyyy-mm-dd
## Environmental Variables
    - COSMOSDB_CONNSTR: String
    - COSMOSDB_USER: String
    - COSMOSDB_PASSWORD: String
## Response
    - Type: 
    - Format:
       {
           classrooms: [<RegisteringClassroom Object>]
       }

## Usage

## Packages Used
- [Mongoose](https://www.npmjs.com/package/mongoose "Mongoose NPM Page")
