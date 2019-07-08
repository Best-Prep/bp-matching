package registration;

import java.util.Set;

public interface Session {
	
	/*
	Input(s):  N/A
	Output(s): Returns period of session as an int. 
 	Function:  Get the period of the session. 
	*/
	public int getPeriod();
	
	/*
	Input(s):  N/A
	Output(s): Returns subject of session as a String. 
 	Function:  Get the subject of the session. 
	*/
	public String getSubject();
	
	/*
	Input(s):  N/A
	Output(s): Returns capacity of session as an int. 
 	Function:  Get the capacity of the session. 
	*/
	public int getCapacity();
	
	/*
	Input(s):  N/A
	Output(s): Returns students of session as a set. 
 	Function:  Get the students of a session. 
	*/
	public Set<String> getStudents();
	
	/*
	Input(s):  Student being added to the session. 
	Output(s): Returns true if the student is successfully
			   added, false if not. 
 	Function:  Adds a student to the roster of the session. 
	*/
	public boolean addStudent(String studentId);
	
	/*
	Input(s):  Student being removed from the session.
	Output(s): Returns true if the student is successfully
			   added, false if not.
 	Function:  Removes a student from the roster of the session. 
	*/
	public boolean removeStudent(String studentId);
	
	/*
	Input(s):  N/A
	Output(s): Returns true if session is full, false if not.
 	Function:  Checks if a session is full or not. 
	*/
	public boolean isFull();
	
	/*
	Input(s):  N/A
	Output(s): N/A
 	Function:  Checks if a session is full or not. 
	*/
	public void resetSession();
	
}