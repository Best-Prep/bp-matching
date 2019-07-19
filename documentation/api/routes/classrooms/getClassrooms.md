# Table of Contents
- [Table of Contents](#Table-of-Contents)
  - [**Route: /api/classrooms/getClassrooms**](#Route-apiclassroomsgetClassrooms)
  - [Expected Request Parameters (JSON)](#Expected-Request-Parameters-JSON)
  - [Environmental Variables](#Environmental-Variables)
  - [Response](#Response)
  - [Usage](#Usage)
  - [Packages Used](#Packages-Used)

## **Route: /api/classrooms/getClassrooms**

## Expected Request Parameters (JSON)
    - body
      - careerDayDate: String mm/dd/yyyy
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
