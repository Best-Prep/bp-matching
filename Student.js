// importing Map and Set
var Map = require("collections/map");
var Set = require("collections/set");

// STUDENT CLASS
// a Student is a student in a classroom registering for sessions at
// a Career Day
class Student {

    /*****************************************************************
    * Creates a Student object with fields:
    *   -name (first and last name)
    *   -id (name concatenated with school name)
    *   -teacher (teacher's name)
    *   -numPeriods (the number of time slots for this Career Day)
    *   -preferences (an array of all the subjects in the order of the 
    *    student's preference)
    *   -schedule (an array keeping track of the sessions the student 
    *    is signed up for, i.e. if the student is in the business 
    *    session during the first time slot then schedule[0] is 
    *    equal to "business")
    *   -reverseSchedule (a map where the keys are the subject names 
    *    of the sessions the student is signed up for and the values 
    *    are the indices in the schedule array of those subjects)
    *****************************************************************/
    constructor(name, id, teacher, numPeriods, preferences) {
        this.name = name;
        this.id = id;
        this.teacher = teacher;
        this.numPeriods = numPeriods;
        this.preferences = preferences;
        this.schedule = [];
        this.reverseSchedule = new Map();
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getTeacher() {
        return this.teacher;
    }

    getNumPeriods() {
        return this.numPeriods;
    }

    getSchedule() {
        return this.schedule;
    }

    getPreferences() {
        return this.preferences;
    }
    
    /*****************************************************************
    * returns an array of the indices of the schedule array in which 
    * the student has a session
    *****************************************************************/
    getFilledSlots() {
        let slots = [];
        for (let i = 0; i < this.schedule.length; i++) {
            if (this.schedule[i] != null) {
                slots.push(i);
            }
        }

        return slots;
    }

    /*****************************************************************
    * returns an array of the indices of the schedule array in which 
    * the student does not have a session
    *****************************************************************/
    getEmptySlots() {
        let count = this.numPeriods;
        let slots = [];
        for (let i = 0; i < this.schedule.length; i++) {
            count--;
            if (this.schedule[i] == null) {
                slots.push(i);
            }
        }
        
        while (count > 0) {
            slots.push(this.numPeriods - count);
            count--;
        }

        return slots;
    }

    /*****************************************************************
    * returns true if the student is already signed up for a session
    * of that subject
    *****************************************************************/
    isTakingAlready(subject) {
        return(this.reverseSchedule.has(subject));
    }

    /*****************************************************************
    * returns true and adds the subject at the given period to the 
    * student's schedule and reverseSchedule if the student's schedule
    * is empty at that period and the student is not already signed
    * up for that subject
    *****************************************************************/
    addSession(subject, period) {
        if (this.schedule[period] == null && !this.reverseSchedule.has(subject)) {
            this.schedule[period] = subject;
            this.reverseSchedule.add(period, subject);
            return true;
        } else {
            return false;
        }
    }

    /*****************************************************************
    * returns true and removes the subject at the given period from
    * the student's schedule and reverseSchedule if the student is
    * currently signed up for that subject at that given period
    *****************************************************************/
    removeSession(subject, period) {
        if (this.schedule[period] == null) {
            return false;
        } else {
            if (this.schedule[period] == subject) {
                this.schedule[period] = null;
                this.reverseSchedule.delete(subject);
                return true;
            } else {
                return false;
            }
        }
    }

    /*****************************************************************
    * returns true if the student's schedule is full
    *****************************************************************/
    isFull() {
        return this.getFilledSlots().length == this.numPeriods;
    }

    /*****************************************************************
    * clears the student's schedule and reverseSchedule
    *****************************************************************/
    resetSchedule() {
        this.schedule = [];
        this.reverseSchedule = new Map();
    }
}