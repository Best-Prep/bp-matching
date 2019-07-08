package registration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;

public class ClassroomImpl implements Classroom {
	private String classroomId;
	private HashMap<String, Student> students = new HashMap<String, Student>();
	private HashMap<String, Session> sessions = new HashMap<String, Session>();
	
	public ClassroomImpl(String classroomId, ArrayList<Student> students, 
			ArrayList<Session> sessions) {
		this.classroomId = classroomId;
		for (int i = 0; i < students.size(); i++) {
			this.students.put(students.get(i).getId(), students.get(i));
		}
		for (int i = 0; i < sessions.size(); i++) {
			this.sessions.put(sessions.get(i).getSubject() + sessions.get(i).getPeriod(),
					sessions.get(i));
		}
	}
	
	@Override
	public String getClassroomId() {
		return this.classroomId;
	}

	@Override
	public HashMap<String, Student> getStudents() {
		return this.students;
	}

	@Override
	public HashMap<String, Session> getSessions() {
		return this.sessions;
	}
	@Override
	public boolean addAssignment(String studentId, String subject) {
		Student student = this.students.get(studentId);
		if (student.isFull()) {
			return false;
		} else {
			for (int i = 0; i < student.getNumPeriods(); i++) {
				String sessionId = subject + i;
				Session session = this.sessions.get(sessionId);
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

	@Override
	public boolean removeAssignment(String studentId, String session) {
		Session curr = this.sessions.get(session);
		if (curr.getStudents().contains(studentId)) {
			curr.removeStudent(studentId);
			this.students.get(studentId).removeSession(curr.getSubject(),
					curr.getPeriod());
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean isStudentFull(String studentId) {
		Student student = this.students.get(studentId);
		return student.isFull();
	}

	@Override
	public boolean isSessionFull(String session) {
		Session curr = this.sessions.get(session);
		return curr.isFull();
	}

	@Override
	public void resetAssignments() {
		Iterator<Student> students = this.students.values().iterator();
		while (students.hasNext()) {
			students.next().resetSchedule();
		}
		Iterator<Session> sessions = this.sessions.values().iterator();
		while (sessions.hasNext()) {
			sessions.next().resetSession();
		}
	}

	@Override
	public void matchingAlgorithm() {
		Iterator<Student> iterator = this.students.values().iterator();
		ArrayList<Student> students = new ArrayList<Student>();
		while(iterator.hasNext()) {
			students.add(iterator.next());
		}
		while (students.size() != 0) {
			Collections.shuffle(students);
			for (int i = 0; i < students.size(); i++) {
				Student curr = students.get(i);
				String[] currPrefs = curr.getPreferences();
				for (int j = 0; j < currPrefs.length; j++) {
					if (this.addAssignment(curr.getId(), currPrefs[j])) {
						break;
					}
				}
				
			}
		}
	}
}
