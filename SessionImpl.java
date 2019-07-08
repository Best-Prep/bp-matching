package registration;

import java.util.HashSet;
import java.util.Set;

public class SessionImpl implements Session{
	private int period;
	private String subject;
	private int capacity;
	private Set<String> students = new HashSet<String>();
	
	public SessionImpl(int period, String subject, int capacity) {
		this.period = period;
		this.subject = subject;
		this.capacity = capacity;
	}
	
	public int getPeriod() {
		return this.period;
	}
	
	public String getSubject() {
		return this.subject;
	}
	
	public int getCapacity() {
		return this.capacity;
	}
	
	public Set<String> getStudents() {
		return this.students;
	}
	
	public boolean addStudent(String studentId) {
		if (!this.isFull()) {
			students.add(studentId);
			return true;
		} else {
			return false;
		}
	}
	
	public boolean removeStudent(String studentId) {
		if (students.contains(studentId)) {
			students.remove(studentId);
			return true;
		} else {
			return false;
		}
	}
	
	public boolean isFull() {
		if (this.students.size() >= this.capacity) {
			return true;
		} else {
			return false;
		}
	}
	
	public void resetSession() {
		this.students = new HashSet<String>();
	}
}
