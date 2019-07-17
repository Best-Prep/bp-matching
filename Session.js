// importing Map and Set
var Map = require("collections/map");
var Set = require("collections/set");

// SESSION CLASS
// a Session is a career being presented about during a specific time
// slot
class Session {

    /*****************************************************************
    * Creates a Session object with fields:
    *   -period (integer from 0 to n - 1, where n is the number of 
    *    time slots for the Career Day)
    *   -subject (name of career the session is about)
    *   -capacity (max number of students allowed to sign up for 
    *    this session from a single classroom)
    *   -teacher (name of person presenting about the career)
    *   -students (set of students signed up for session)
    *****************************************************************/
    constructor(period, subject, capacity, teacher) {
        this.period = period;
        this.subject = subject;
        this.capacity = capacity;
        this.teacher = teacher;
        this.students = new Set([]);
    }

    getPeriod() {
        return this.period;
    }

    getSubject() {
        return this.subject;
    }

    getCapacity() {
        return this.capacity;
    }

    getTeacher() {
        return this.teacher;
    }

    getStudents() {
        return this.students;
    }

    /*****************************************************************
    * returns true and adds the student to the session's student list
    * if the session is not full
    *****************************************************************/
    addStudent(studentId) {
        if (!this.isFull()) {
            this.students.add(studentId);
            return true;
        } else {
            return false;
        }
    }

    /*****************************************************************
    * returns true if the student is in the session's student list
    * and removes that student from the list
    *****************************************************************/
    removeStudent(studentId) {
        if (this.students.has(studentId)) {
            this.students.delete(studentId);
            return true;
        } else {
            return false;
        }
    }

    /*****************************************************************
    * returns true if the session is full
    *****************************************************************/
    isFull() {
        if (this.students.toArray().length >= this.capacity) {
            return true;
        } else {
            return false;
        }
    }

    /*****************************************************************
    * clears the session's student list
    *****************************************************************/
    resetSession() {
        this.students = new Set();
    }
}