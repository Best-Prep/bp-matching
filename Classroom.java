package registration;

import java.util.HashMap;

public interface Classroom {
	
	public String getClassroomId();
	
	/*
	Input(s):  N/A
	Output(s): ArrayList of student id's as strings.
 	Function:  return list of all student id's in class.
	*/
	public HashMap<String, Student> getStudents();
	
	/*
	Input(s):  Student whose schedule we are checking.
	Output(s): Returns true if student's schedule is full,
			   otherwise returns false.
 	Function:  Checks if a student's schedule is full or not.
	*/
	public  HashMap<String, Session> getSessions();
	
	/*
	Input(s):  Student being added to session and the session.
	Output(s): Returns true if student was successfully
	           added to session else false.
 	Function:  Adds a student to as session if the student is
	           not signed up for another session at the same
	           time, not already signed up for the subject of
	           the session, and the session is not full. Student
	           should not be signed up for input session.
	*/
	public boolean addAssignment(String studentId, String session);
	
	/*
	Input(s):  Student being removed from a session and the session.
	Output(s): Returns true if student is removed from the session,
			   otherwise, returns false.
 	Function:  Removes student from session and updates session
 	           roster and student schedule. Student must already be
 	           signed up for input session.
	*/
	public boolean removeAssignment(String studentId, String session);
	
	/*
	Input(s):  Student whose schedule we are checking.
	Output(s): Returns true if student's schedule is full,
			   otherwise returns false.
 	Function:  Checks if a student's schedule is full or not.
	*/
	public boolean isStudentFull(String studentId);
	
	/*
	Input(s):  Session whose roster size we are checking.
	Output(s): Returns true if session is full,
			   otherwise returns false.
 	Function:  Checks if a session is full or not.
	*/
	public boolean isSessionFull(String session);
	
	/*
	Input(s):  N/A
	Output(s): N/A
 	Function:  Resets all roster and schedule assignments.
	*/
	public void resetAssignments();
	
	/*
	Input(s):  N/A
	Output(s): N/A 
 	Function:  Fills students schedules such that no student takes
 			   the same class twice and all student time slots are full.
	*/
	public void matchingAlgorithm();
	
}
