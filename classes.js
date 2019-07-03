// importing Map and Set
var Map = require("collections/map");
var Set = require("collections/set");

// STUDENT CLASS
class Student {
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

    getFilledSlots() {
        slots = [];
        for (let i = 0; i < this.schedule.length; i++) {
            if (this.schedule[i] != null) {
                slots.push(i);
            }
        }
    }

    getEmptySlots() {
        slots = [];
        for (let i = 0; i < this.schedule.length; i++) {
            if (this.schedule[i] == null) {
                slots.push(i);
            }
        }
    }

    getPreferences() {
        return this.preferences;
    }

    removePreference(pref) {
        this.preferences.splice(pref, 1);
    }

    isTakingAlready(subject) {
        return(this.reverseSchedule.has(subject))
    }

    addSession(subject, period) {
        if (this.schedule[period] == null && !this.isTakingAlready(subject)) {
            this.schedule[period] = subject;
            this.reverseSchedule.add(subject, period);
            return true;
        } else {
            return false;
        }
    }

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

    isFull() {
        return this.reverseSchedule.keys().length == this.numPeriods;
    }

    resetSchedule() {
        this.schedule = [];
        this.reverseSchedule = new Map();
    }
}

// SESSION CLASS
class Session {
    constructor(period, subject, capacity, teacher) {
        this.period = period;
        this.subject = subject;
        this.capacity = capacity;
        this.teacher = teacher;
        this.students = new Set();
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

    addStudent(studentId) {
        if (this.isFull()) {
            students.add(studentId);
            return true;
        } else {
            return false;
        }
    }

    removeStudent(studentId) {
        if (students.has(studentId)) {
            students.delete(studentId);
            return true;
        } else {
            return false;
        }
    }

    isFull() {
        if (this.students.toArray().length >= this.capacity) {
            return true;
        } else {
            return false;
        }
    }

    resetSession() {
        this.students = new Set();
    }
}

// CLASSROOM CLASS
class Classroom {
    constructor(classroomId, students, sessions) {
        this.classroomId = classroomId;

        this.students = new Map();
        for (let i = 0; i < students.length; i++) {
            this.students.add(students[i].getId(), students[i]);
        }

        this.sessions = new Map();
        for (let i = 0; i < sessions.length; i++) {
            this.sessions.add(sessions[i].getSubject() + sessions[i].getPeriod(), sessions[i]);
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

    removeAssignment(studentId, session) {
        let sess = this.sessions.get(session); 
        if (sess.getStudents().has(studentId)) {
            sess.removeStudent(studentId);
            this.students.get(studentId).removeSession(sess.getSubject(), sess.getPeriod());
            return true;
        } else {
            return false;
        }
    }

    isStudentFull(studentId) {
        let student = this.students.get(studentId);
        return student.isFull();
    }

    isSessionFull(session) {
        let sess = this.sessions.get(session);
        return sess.isFull();
    }

    resetAssignments() {
        let students = this.students.values().iterator();
        while (students.hasNext()) {
            students.next().resetSchedule();
        }
        
        let sessions = this.sessions.values().iterator();
        while (sessions.hasNext()) {
            sessions.next().resetSession();
        }
    }

    matchingAlgorithm() {
        let students = [];
        let studentsNotFull = [];

        // make two lists of all the students (one for keeping track of 
        // all students, one for keeping track of students with preferences
        // left with unfilled schedules)
        let iterator = this.students.values().iterator();
        while (iterator.hasNext()) {
            let curr = iterator.next();
            students.push(curr);
            studentsNotFull.push(curr);
        }

        // iterate through all students and their preferences until there
        // are no students left with preferences left and unfilled schedules
        while (studentsNotFull.length != 0){

            // randomize order of students
            studentsNotFull = shuffle(studentsNotFull);

            // iterate through students with preferences and unfilled schedules
            for (let i = 0; i < studentsNotFull.length; i++) {

                // boolean to keep track of if the student got added to a session
                let assigned = false;

                // get the Student object and their list of preferences
                let stud = studentsNotFull[i];
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
                                otherSubj = stud.getSchedule()[filledSlots[k]].getSubject();

                                // iterate through the student's empty time slots
                                for (let l = 0; l < emptySlots.length; l++) {

                                    // check if there is a session of the subject the student is already signed up for
                                    // but in one of the student's empty time slots that has an open spot
                                    if (!this.isSessionFull("" + otherSubj + emptySlots[l])) {

                                        // if there's an open spot during one of the student's open time slots, make the
                                        // switch (ex: if a student is signed up for business0 but also wants to take
                                        // accounting, but accounting0 is the only available session for that subject, 
                                        // but business1 has an open spot, the student is removed from business0, added
                                        // to business1, and added to accounting0)
                                        this.removeAssignment(stud.getId(), "" + otherSubj + filledSlots[k]);
                                        stud.addSession(otherSubj, emptySlots[l]);
                                        stud.getSchedule()[emptySlots[l]].addStudent(stud);
                                        stud.addSession(studPrefs[j], filledSlots[k]);
                                        stud.getSchedule()[filledSlots[k]].addStudent(stud);

                                        // check if the student's schedule is now full, and if so remove the student from
                                        // the list of students with unfilled schedules
                                        if (stud.isFull()) {
                                            studentsNotFull.splice(i, 1);
                                        }

                                        // if the student isn't full, check if the student still has preferences or not, 
                                        // and move the student to or keep the student in the corresponding list
                                        else if (studPrefs.length == 0) {
                                            studentsNotFull.splice(i, 1);
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

                    //get the student's filled time slots and iterate through them
                    let filledSlots = stud.getFilledSlots();
                    for (let k = 0; k < filledSlots.length; k++) {

                        // get a subject the student is already taking and check if it has open spots during the selected period
                        subj = stud.getSchedule()[filledSlots[k]].getSubject();
                        if (!isSessionFull("" + subj + period)) {

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
                                let swapSubj = swapStud.getSchedule()[period1].getSubject();
                                if (!stud.isTakingAlready(swapSubj)) {
                                    this.removeAssignment(swapStud.getId(), "" + swapSubj + period1);
                                    stud.addSession(swapSubj, period1);
                                    stud.getSchedule()[period1].addStudent(stud);
                                    swapStud.addSession(subj, period1);
                                    swapStud.getSchedule()[period1].addStudent(swapStud);
                                }
                                
                                // check if the current student is taking a subject that the original student hasn't yet
                                // taken during the other of the two swap time periods, and if so make the swap
                                let swapSubj = swapStud.getSchedule()[period2].getSuject();
                                if(!stud.isTakingAlready(swapSubj)) {
                                    this.removeAssignment(swapStud.getId(), "" + swapSubj + period2);
                                    this.removeAssignment(stud.getId(), "" + subj + period2);
                                    stud.addSession(swapSubj, period2);
                                    stud.getSchedule()[period2].addStudent(stud);
                                    swapStud.addSession(subj, period2);
                                    swapStud.getSchedule()[period2].addStudent(swapStud);
                                }
                            }

                            break;
                        }
                    }
                }
            }
        }
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }
}