package registration;

public interface Student {
	
	/*
	Input(s):  N/A
	Output(s): Returns name of student as a String.
	Function: Get the name of a student as a String.
	*/
	public String getName();
	
	/*
	Input(s): N/A
	Output(s): Returns id of student as a String.
	Function: Get the id of a student as a String
	*/
	public String getId();
	
	/*
	Input(s): N/A
	Output(s): Returns teacher of student as a String.
	Function: Get the id of a teacher as a String
	*/
	public String getTeacher();
	
	/*
	Input(s): N/A
	Output(s): Returns number of periods of student as an int.
	Function: Get the number of periods of a student as an int.
	*/
	public int getNumPeriods();
	
	/*
	Input(s): N/A
	Output(s): Returns schedule of student as String array
	Function: Get the student's schedule.
	*/
	public String[] getSchedule();
	
	/*
	Input(s):  N/A
	Output(s): Returns the preferences of the student as
			   an ArrayList. 
 	Function:  Gets the student's preferences. 
	*/
	public String[] getPreferences();
	
	/*
	Input(s):  Session that the student is being assigned to.
	Output(s): Returns true if session is added, otherwise false.
 	Function:  Adds session to student's schedule if student is 
 			   free that session and not already signed up for 
 			   same subject. Student must not already be in session.
	*/
	public boolean addSession(String subject, int period);
	
	/*
	Input(s):  Session student is being removed from.
	Output(s): Returns true if student is successfully removed
			   from session, otherwise false.
 	Function:  Checks if a student's schedule is full or not.
	*/
	public boolean removeSession(String subject, int period);
	
	/*
	Input(s):  N/A
	Output(s): Returns true if student's schedule is full,
			   otherwise returns false.
 	Function:  Checks if a student's schedule is full or not.
	*/
	public boolean isFull();
	
	/*
	Input(s):  N/A
	Output(s): N/A
 	Function:  Reset student's schedule
	*/
	public void resetSchedule();
}
