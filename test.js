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

// CLASSROOM CLASS
// a Classroom is one subset of all the students and all the sessions 
// which need to be matched for a Career Day
class Classroom {

    /*****************************************************************
    * Creates a Student object with fields:
    *   -classroomId (teacher and school name)
    *   -students (a map with keys of studentIds and values of 
    *    Student objects)
    *   -sessions (a map with keys of sessionIds and values of 
    *    Session objects)
    *****************************************************************/
    constructor(classroomId, students, sessions) {
        this.classroomId = classroomId;

        this.students = new Map();
        for (let i = 0; i < students.length; i++) {
            this.students.add(students[i], students[i].getId());
        }

        this.sessions = new Map();
        for (let i = 0; i < sessions.length; i++) {
            this.sessions.add(sessions[i], sessions[i].getSubject() + sessions[i].getPeriod());
        }
    }

    getClassroomId() {
        return this.classroomId;
    }

    getStudents() {
        return this.students;
    }

    getSessions() {
        return this.sessions;
    }

    /*****************************************************************
    * if the student's schedule is not full, adds the given subject
    * to the student's schedule and adds the student to the session's
    * student list if there are available spots in the session during 
    * one of the student's empty time slots
    *****************************************************************/
    addAssignment(studentId, subject) {
        let student = this.students.get(studentId);
        if (student.isFull()) {
            return false;
        } else {
            for (let i = 0; i < student.getNumPeriods(); i++) {
                let sessionId = subject + i;
                let session = this.sessions.get(sessionId);
                if (session == null) {
                    continue;
                }
                if (!session.isFull() && student.addSession(subject, i)) {
                    session.addStudent(studentId);
                    return true;
                }
            }
            return false;
        }
    }

    /*****************************************************************
    * if the given assignment exists, returns true and removes the 
    * student from the session's student list and removes the session 
    * from the student's schedule
    *****************************************************************/
    removeAssignment(studentId, session) {
        let sess = this.getSessions().get(session); 
        if (sess.getStudents().has(studentId)) {
            sess.removeStudent(studentId);
            this.students.get(studentId).removeSession(sess.getSubject(), sess.getPeriod());
            return true;
        } else {
            return false;
        }
    }

    /*****************************************************************
    * returns true if all the student's time slots are each filled 
    * with a session
    *****************************************************************/
    isStudentFull(studentId) {
        let student = this.students.get(studentId);
        return student.isFull();
    }

    /*****************************************************************
    * returns true if the session has a number of students equal to 
    * the session's capacity
    *****************************************************************/
    isSessionFull(session) {
        let sess = this.sessions.get(session);
        return sess.isFull();
    }

    /*****************************************************************
    * clears all the students' schedules and clears all the 
    * sessions' student lists
    *****************************************************************/
    resetAssignments() {
        let studs = this.students.values();
        let stu = studs.next();
        while(!stu.done) {
            stu.value.resetSchedule();
            stu = studs.next();
        }
        
        let sess = this.sessions.values();
        let ses = sess.next();
        while(!ses.done) {
            ses.value.resetSession();
            ses = sess.next();
        }
    }

    /*****************************************************************
    * returns true if all the students in the classroom have
    * full and valid schedules 
    *****************************************************************/
    isValidMatching() {
        let students = this.getStudents().values();
        for (let i = 0; i < students.length; i++) {
            let curr = students[i];
            let schedule = curr.getSchedule();
            let taken = new Set([]);
            for (let j = 0; j < schedule.length; j++) {
                if (taken.has(schedule[j])) {
                    return false;
                } else {
                    taken.add(schedule[j]);
                }
            }
        }
        return true;
    }

    /*****************************************************************
    * gives all students in the classroom which the method is called 
    * on full and valid schedules for the specific Career Day
    *****************************************************************/
    matchingAlgorithm() {

        // all students in the given classroom 
        let students = [];

        // the students in the classroom who have unfilled schedules 
        let studentsNotFull = [];

        // make two lists of all the students (one for keeping track of all
        // students, one for keeping track of students with unfilled schedules
        let studs = this.students.values();
        let stu = studs.next();
        while(!stu.done) {
            students.push(stu.value);
            studentsNotFull.push(stu.value);
            stu = studs.next();
        }

        // iterate through all students and their preferences until there
        // are no students left with unfilled schedules
        while (studentsNotFull.length != 0){

            // randomize order of students
            studentsNotFull = shuffle(studentsNotFull);

            // iterate through students with preferences and unfilled schedules
            for (let i = 0; i < studentsNotFull.length; i++) {

                // boolean to keep track of if the student got added to a session
                let assigned = false;

                // get the Student object and their list of preferences
                let stud = studentsNotFull[i];
                if (stud == null) {
                    continue;
                }
                let studPrefs = stud.getPreferences();

                // iterate through the student's preferences
                for (let j = 0; j < studPrefs.length; j++) {

                    // check if the student is already taking this subject; move on to next preference if so
                    if (stud.isTakingAlready(studPrefs[j])) {
                        continue;
                    }

                    // if adding the preference succeeded, go on 
                    if (this.addAssignment(stud.getId(), studPrefs[j])) {

                        // check if the student's schedule is now full, and if so remove the student from
                        // the list of students with unfilled schedules
                        if (stud.isFull()) {
                            studentsNotFull.splice(i, 1);
                            i--;
                        }

                        // go on to the next student
                        assigned = true;
                        break;
                    }

                    // if adding the preference failed, try switching around the student's schedule 
                    // to make it work
                    else {

                        // get a list of the student's filled time slots and one of the student's empty time slots
                        let filledSlots = stud.getFilledSlots();
                        let emptySlots = stud.getEmptySlots();

                        // iterate through the student's filled time slots
                        for (let k = 0; k < filledSlots.length; k++) {

                            // check if there is a session of the student's preference that has an open spot
                            // during the student's filled time slot
                            if (!this.isSessionFull("" + studPrefs[j] + filledSlots[k])) {

                                // if there's an open spot, get the subject that the student is already taking then
                                let otherSubj = stud.getSchedule()[filledSlots[k]];

                                // iterate through the student's empty time slots
                                for (let l = 0; l < emptySlots.length; l++) {

                                    // check if there is a session of the subject the student is already signed up for
                                    // but in one of the student's empty time slots that has an open spot
                                    if (otherSubj != null && !this.isSessionFull("" + otherSubj + emptySlots[l])) {

                                        // if there's an open spot during one of the student's open time slots, make the
                                        // switch (ex: if a student is signed up for business0 but also wants to take
                                        // accounting, but accounting0 is the only available session for that subject, 
                                        // but business1 has an open spot, the student is removed from business0, added
                                        // to business1, and added to accounting0)
                                        this.removeAssignment(stud.getId(), "" + otherSubj + filledSlots[k]);
                                        stud.addSession(otherSubj, emptySlots[l]);
                                        this.getSessions().get(stud.getSchedule()[emptySlots[l]] + emptySlots[l]).addStudent(stud.getId());
                                        stud.addSession(studPrefs[j], filledSlots[k]);
                                        this.getSessions().get(stud.getSchedule()[filledSlots[k]] + filledSlots[k]).addStudent(stud.getId());

                                        // check if the student's schedule is now full, and if so remove the student from
                                        // the list of students with unfilled schedules
                                        if (stud.isFull()) {
                                            studentsNotFull.splice(i, 1);
                                            i--;
                                        }

                                        // if the student could accommodate the preference, don't keep checking their empty slots
                                        assigned = true;
                                        break;
                                    }
                                }
                            }
                            
                            // if the student could accommodate the preference, don't keep checking their filled slots
                            if (assigned) {
                                break;
                            }
                        }
                    }

                    // if the student could accommodate the preference, go on to the next student
                    if (assigned) {
                        break;
                    }
                }

                // if the student could not sign up for any session, meaning that the student has already
                // signed up for all the subjects that have open spots during the students remaining open
                // time slot(s), try to swap with another student
                if (!assigned) {

                    // subject the student is trying to swap for a diff one
                    let subj; 

                    // get the student's empty time slots and pick the first one
                    let emptySlots = stud.getEmptySlots();
                    let period1 = emptySlots[0];

                    // get the student's filled time slots and iterate through them
                    let filledSlots = stud.getFilledSlots();
                    for (let k = 0; k < filledSlots.length; k++) {

                        // get a subject the student is already taking and check if it has open spots during the selected period
                        subj = stud.getSchedule()[filledSlots[k]];
                        if (subj != null && !this.isSessionFull("" + subj + period1)) {

                            // the time slot during which the student is taking the subject with open spots during the selected period
                            let period2 = filledSlots[k];

                            // iterate through the list of all students
                            for (let l = 0; l < students.length; l++) {

                                // check if the current student is already taking the subject that the original student needs 
                                // to swap, and if so go on to the next student 
                                let swapStud = students[l];
                                if (swapStud.isTakingAlready(subj)) {
                                    continue;
                                }

                                // check if the current student is taking a subject that the original student hasn't yet
                                // taken during one of the two swap time periods, and if so make the swap
                                let swapSubj = swapStud.getSchedule()[period1];
                                if (swapSubj != null && !stud.isTakingAlready(swapSubj)) {
                                    this.removeAssignment(swapStud.getId(), "" + swapSubj + period1);
                                    stud.addSession(swapSubj, period1);
                                    this.getSessions().get(stud.getSchedule()[period1] + period1).addStudent(stud.getId());
                                    swapStud.addSession(subj, period1);
                                    this.getSessions().get(swapStud.getSchedule()[period1] + period1).addStudent(swapStud.getId());

                                    if (stud.isFull()) {
                                        studentsNotFull.splice(i, 1);
                                        i--;
                                    }

                                    break;
                                }
                                
                                // check if the current student is taking a subject that the original student hasn't yet
                                // taken during the other of the two swap time periods, and if so make the swap
                                swapSubj = swapStud.getSchedule()[period2];
                                if(swapSubj != null && !stud.isTakingAlready(swapSubj)) {
                                    this.removeAssignment(swapStud.getId(), "" + swapSubj + period2);
                                    this.removeAssignment(stud.getId(), "" + subj + period2);
                                    stud.addSession(swapSubj, period2);
                                    this.getSessions().get(stud.getSchedule()[period2] + period2).addStudent(stud.getId());
                                    swapStud.addSession(subj, period2);
                                    this.getSessions().get(swapStud.getSchedule()[period2] + period2).addStudent(swapStud.getId());

                                    if (stud.isFull()) {
                                        studentsNotFull.splice(i, 1);
                                        i--;
                                    }

                                    break;
                                }
                            }

                            break;
                        }
                    }
                }
            }
        }
    }
}

/*****************************************************************
* randomizes the order of elements in an array
*****************************************************************/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // while there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // and swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}


/*********************************************************************************************************************************
*********************************************************************************************************************************/


// MOCHA TESTING
var assert = require('assert');

describe('Student Class Test', function() {
    let test;

    beforeEach(function() {
        let preferences = ['0', '1', '2'];
        test = new Student("Bob Myers",
         "Bob Myers EPHS", "Ms. Hoe", 3, preferences);
    });

    it ('getName', function() {
      assert.equal(test.getName(), "Bob Myers");
    });

    it ('getId', function() {
        assert.equal(test.getId(), "Bob Myers EPHS");
    });

    it ('getTeacher', function() {
        assert.equal(test.getTeacher(), "Ms. Hoe");
    });

    it ('getNumPeriods', function() {
        assert.equal(test.getNumPeriods(), 3);
    });

    it ('getPreferences', function() {
        preferences = ['0', '1', '2'];
        assert.deepEqual(test.getPreferences(), preferences);
    });

    it ('getSchedule', function() {
        schedule = ["business", "accounting", "clown"];
        test.addSession("accounting", 1);
        test.addSession("business", 0);
        test.addSession("clown", 2);
        assert.deepEqual(test.getSchedule(), schedule)
    });

    it ('isTakingAlready', function() {
        test.addSession("business", 0);
        assert.equal(test.isTakingAlready("business"), true);
    })

    it ('addSessionValid', function() {
        assert.equal(test.addSession("business", 1), true);
    });

    it ('addSessionDuplicate', function() {
        test.addSession("business", 0);
        assert.equal(test.addSession("business", 0), false);
    })

    it ('addSessionTimeFull', function() {
        test.addSession("accounting", 0);
        assert.equal(test.addSession('business', 0), false);
    })

    it ('getFilledSlotsEmpty', function() {
        assert.deepEqual(test.getFilledSlots(), []);
    })

    it ('getFilledSlotsSingle', function() {
        test.addSession("business", 0);
        assert.deepEqual(test.getFilledSlots(), [0]);
    })

    it ('getFilledSlotsFull', function() {
        test.addSession("business", 0);
        test.addSession("accounting", 1);
        test.addSession("marketing", 2);
        assert.deepEqual(test.getFilledSlots(), [0, 1, 2]);
    })

    it ('getEmptySlotsEmpty', function() {
        assert.deepEqual(test.getEmptySlots(), [0, 1, 2]);
    })

    it ('getEmptySlotsSingle', function() {
        test.addSession("business", 1);
        assert.deepEqual(test.getEmptySlots(), [0, 2]);
    })

    it ('getEmptySlotsFull', function() {
        test.addSession("business", 0);
        test.addSession("accounting", 1);
        test.addSession("marketing", 2);
        assert.deepEqual(test.getEmptySlots(), []);
    })

    it ('removeSessionValidTest', function() {
        test.addSession("business", 0);
        assert.equal(test.removeSession("business", 0), true);
    })

    it ('removeSessionEmptySlot', function() {
        assert.equal(test.removeSession("business", 0), false);
    })

    it ('removeSessionEmptySlot', function() {
        test.addSession("business", 0);
        assert.equal(test.removeSession("business", 1), false);
    })

    it ('removeSessionWrongSubject', function() {
        test.addSession("accounting", 0);
        assert.equal(test.removeSession("business", 0), false);
    })

    it ('isFullTrue', function() {
        test.addSession("accounting", 0);
        test.addSession("business", 1);
        test.addSession("clown", 2);
        assert.equal(test.isFull(), true);
    })

    it ('isFullFalse', function() {
        test.addSession("business", 2);
        assert.equal(test.isFull(), false);
    })

    it ('resetSchedule', function() {
        test.addSession("1", 0);
        test.addSession("2", 1);
        test.addSession("3", 2);
        test.resetSchedule();
        let sched = test.getSchedule();
        assert.equal(sched[0] == null && sched[1] == null && sched[2] == null, true);
    })
});

describe('Session Class Test', function() {
    let test;

    beforeEach(function() {
        test = new Session(1, "accounting", 3, "Mrs. Smith");
    });

    it ('getPeriod', function() {
        assert.equal(test.getPeriod(), 1);
    });

    it ('getSubject', function() {
        assert.equal(test.getSubject(), "accounting");
    });

    it ('getCapacity', function() {
        assert.equal(test.getCapacity(), 3);
    });

    it ('getTeacher', function() {
        assert.equal(test.getTeacher(), "Mrs. Smith");
    });

    it ('getStudentsEmpty', function() {
        let set = new Set([]);
        assert.deepEqual(test.getStudents(), set);
    });

    it ('getStudentsSingle', function() {
        let set = new Set(["billy bob ephs"]);
        test.addStudent("billy bob ephs");
        assert.deepEqual(test.getStudents(), set);
    });

    it ('getStudentsMultiple', function() {
        let set = new Set(["billy bob ephs", "ethan miller ephs"]);
        test.addStudent("billy bob ephs");
        test.addStudent("ethan miller ephs");
        assert.deepEqual(test.getStudents(), set);
    });

    it ('addStudentValid', function() {
        assert.equal(test.addStudent("billy bob ephs"), true);
    });

    it ('addStudentInvalid', function() {
        test.addStudent("billy bob ephs");
        test.addStudent("ethan miller ephs");
        test.addStudent("carrie fisher ephs");
        assert.equal(test.addStudent("hannah montana ephs"), false);
    });

    it ('removeStudentValid', function() {
        test.addStudent("billy bob ephs");
        test.addStudent("ethan miller ephs");
        test.addStudent("carrie fisher ephs");
        assert.equal(test.removeStudent("billy bob ephs"), true);
    });

    it ('removeStudentInvalid', function() {
        test.addStudent("billy bob ephs");
        test.addStudent("ethan miller ephs");
        test.addStudent("carrie fisher ephs");
        assert.equal(test.removeStudent("hannah montana ephs"), false);
    });

    it ('isFullEmpty', function() {
        assert.equal(test.isFull(), false);
    });

    it ('isFullSingle', function() {
        test.addStudent("Bob");
        assert.equal(test.isFull(), false);
    });

    it ('isFullTrue', function() {
        test.addStudent("Bob");
		test.addStudent("Mokey");
        test.addStudent("Velany");
        assert.equal(test.isFull(), true);
    });

    it ('resetSession', function() {
        test.addStudent("Bob");
		test.addStudent("Mokey");
		test.addStudent("Velany");
        test.resetSession();
        let set = new Set([]);
        assert.deepEqual(test.getStudents(), set);
    });
});

describe('Classroom Class Test', function() {
    let classrooms = [];
    let students = [];
    let sessions = [];

    let classrooms2 = [];
    let students2 = [];
    let sessions2 = [];
    let preferencesA = [];

    beforeEach(function() {
        // classroom 1
        let preferences = ["business", "accounting", "finance", "IT", "dentist", "nurse"];
        for (let i = 0; i < 18; i++) {
            let student = new Student("" + i, "" + i + "EPHS", "Ms. Hoe", 5, preferences);
            students.push(student);
        }

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                let session = new Session(j, preferences[i], 3, "Ms. Hoe");
                sessions.push(session);
            }
        }
        

        classroom = new Classroom("EPHS Ms. Hoe", students, sessions);

        // classroom 2
        let preferences2 = ["business", "accounting", "finance", "IT", "dentist", "nurse", "clown", "management"];
        for (let i = 0; i < 72; i++) {
            let student2 = new Student("" + i, "" + i + "EPHS", "Ms. Hoe", 5, shuffle(preferences2));
            students2.push(student2);
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 5; j++) {
                let session2 = new Session(j, preferences2[i], 9, "Ms. Hoe");
                sessions2.push(session2);
            }
        }
        
        for (let i = 0; i < 500; i++) {
            let classroom = new Classroom("EPHS Ms. Hoe", students2, sessions2);
            classrooms2.push(classroom);
        }

    });

    it ('getClassroomId', function() {
        let id = "EPHS Ms. Hoe";
        assert.equal(classroom.getClassroomId(), id);
    });

    it ('getStudents', function() {
        let map = new Map();
        for (let i = 0; i < students.length; i++) {
            map.add(students[i], students[i].getId());
        }     
        assert.deepEqual(classroom.getStudents(), map);
    });

    it ('getSessions', function() {
        let map = new Map();
        for (let i = 0; i < sessions.length; i++) {
            map.add(sessions[i],
                sessions[i].getSubject() + sessions[i].getPeriod());
        }
        assert.deepEqual(classroom.getSessions(), map);
    });

    it ('addAssignmentStudentFull', function() {
        classroom.addAssignment("1EPHS", "business");
        classroom.addAssignment("1EPHS", "accounting");
        classroom.addAssignment("1EPHS", "finance");
        assert.equal(classroom.addAssignment("1EPHS", "nurse"), false);
    });

    it ('addAssignmentSubjectFull', function() {
        classroom.addAssignment("1EPHS", "business");
        classroom.addAssignment("2EPHS", "business");
        classroom.addAssignment("3EPHS", "business");
        classroom.addAssignment("4EPHS", "business");
        classroom.addAssignment("5EPHS", "business");
        classroom.addAssignment("6EPHS", "business");
        assert.equal(classroom.addAssignment("7EPHS", "business"), false);
    });

    it ('addAssignmentSubjectFulfilled', function() {
        classroom.addAssignment("1EPHS", "business");
        assert.equal(classroom.addAssignment("1EPHS", "business"), false);
    });

    it ('addAssignmentValid', function() {
        assert.equal(classroom.addAssignment("1EPHS", "business"), true);
    });

    it ('removeAssignmentValid', function() {
        classroom.addAssignment("1EPHS", "business");
        assert.equal(classroom.removeAssignment("1EPHS", "business0"), true);
    });

    it ('removeAssignmentInvalid', function() {
        classroom.addAssignment("1EPHS", "business");
        assert.equal(classroom.removeAssignment("1EPHS", "business1"), false);
    });

    it ('isStudentFullEmpty', function() {
        assert.equal(classroom.isStudentFull("0EPHS"), false);
    });

    it ('isStudentFullSingle', function() {
        classroom.addAssignment("0EPHS", "business");
        assert.equal(classroom.isStudentFull("0EPHS"), false);
    });

    it ('isStudentFullTrue', function() {
        classroom.addAssignment("0EPHS", "business");
        classroom.addAssignment("0EPHS", "finance");
        classroom.addAssignment('0EPHS', 'IT');
        assert.equal(classroom.isStudentFull("0EPHS"), true);
    });

    it ('isSessionFullEmpty', function() {
        assert.equal(classroom.isSessionFull("business0"), false);
    });

    it ('isSessionFullSingle', function() {
        classroom.addAssignment("0EPHS", "business");
        assert.equal(classroom.isSessionFull("business0"), false);
    });

    it ('isSessionFullTrue', function() {
        classroom.addAssignment("0EPHS", "business");
        classroom.addAssignment("1EPHS", "business");
        assert.equal(classroom.isSessionFull("business0"), true);
    });

    it ('resetAssignments', function() {
        classroom.addAssignment("0EPHS", "business");
        classroom.addAssignment("0EPHS", "finance");
        classroom.addAssignment('0EPHS', 'IT');
        classroom.addAssignment("1EPHS", "business");
        classroom.addAssignment("1EPHS", "accounting");
        classroom.addAssignment("1EPHS", "finance");
        classroom.resetAssignments();

        let studs = classroom.getStudents().values();
        for (let i = 0; i < studs.length; i++) {
            let sched = studs[i].getSchedule();
            for (let i = 0; i < sched.length; i++) {
                assert.equal(sched[i] == null);
            }
        }
        
        let sess = classroom.getSessions().values();
        for (let i = 0; i < sess.length; i++) {
            assert.equal(sess[i].getStudents().length == 0);
        }
    });

    it ('matchingAlgorithm', function() {
        for (let i = 0; i < classrooms2.length; i++) {   
            classrooms2[i].matchingAlgorithm();
            assert.equal(classrooms2[i].isValidMatching(), true);
            classrooms2[i].resetAssignments();
        }
        
    });

});