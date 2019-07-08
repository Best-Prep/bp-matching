package registration;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import org.junit.Before;
import org.junit.Test;

public class ClassroomImplTest {
	private ClassroomImpl test;
	private ClassroomImpl test2;
	private ArrayList<Student> students;
	private ArrayList<Session> sessions;
	
	@Before
	public void setUp() throws Exception {		
		String[] preferences = new String[3];
		for (int i = 0; i < 3; i++) {
			preferences[i] = "" + i;
		}
		
		students = new ArrayList<Student>();
		StudentImpl stud1 = new StudentImpl("Billy Bob", "Billy Bob EPHS", 
				"Mrs. Smith", 3, preferences);
		students.add(stud1);
		StudentImpl stud2 = new StudentImpl("Mary Beth", "Mary Beth EPHS", 
				"Mrs. Smith", 3, preferences);
		students.add(stud2);
		
		sessions = new ArrayList<Session>();
		SessionImpl sess1 = new SessionImpl(0, "business", 3);
		SessionImpl sess2 = new SessionImpl(1, "accounting", 5);
		SessionImpl sess3 = new SessionImpl(2, "clown", 2);
		SessionImpl sess4 = new SessionImpl(0, "cop", 1);
		
		sessions.add(sess1);
		sessions.add(sess2);
		sessions.add(sess3);
		sessions.add(sess4);
		
		test2 = new ClassroomImpl("Mrs. Smith", students, sessions);
		
		SessionImpl sess5 = new SessionImpl(1, "cop", 1);
		sessions.add(sess5);
		
		test = new ClassroomImpl("Mrs. Smith", students, sessions);
	}

	@Test
	public void getClassroomIdTest() {
		assertEquals("Mrs. Smith", test.getClassroomId());
	}

	@Test
	public void getStudentsTest() {
		HashMap<String, Student> expected = new HashMap<String, Student>();
		expected.put("Billy Bob EPHS", students.get(0));
		expected.put("Mary Beth EPHS", students.get(1));
		assertEquals(expected, test.getStudents());
	}

	@Test
	public void getSessionsTest() {
		HashMap<String, Session> expected = new HashMap<String, Session>();
		expected.put("business0", sessions.get(0));
		expected.put("accounting1", sessions.get(1));
		expected.put("clown2", sessions.get(2));
		expected.put("cop0", sessions.get(3));
		expected.put("cop1", sessions.get(4));
		assertEquals(expected, test.getSessions());
	}
	
	@Test
	public void addAssignmentStudentFullTest() {
		test2.addAssignment("Billy Bob EPHS", "business");
		test2.addAssignment("Billy Bob EPHS", "accounting");
		test2.addAssignment("Billy Bob EPHS",  "clown");
		assertFalse(test2.addAssignment("Billy Bob EPHS", "cop"));
	}
	
	@Test
	public void addAssignmentSessionFullTest() {
		test2.addAssignment("Billy Bob EPHS",  "cop");
		assertFalse(test2.addAssignment("Mary Beth EPHS", "cop"));
	}
	
	@Test
	public void addAssignmentSubjectFulfilledTest() {
		test.addAssignment("Billy Bob EPHS",  "cop");
		assertFalse(test.addAssignment("Billy Bob EPHS", "cop"));
	}
	
	@Test
	public void addAssignmentValidTest() {
		assertTrue(test.addAssignment("Billy Bob EPHS", "cop"));
	}
	
	@Test
	public void removeAssignmentInvalidTest() {
		assertFalse(test.removeAssignment("Billy Bob EPHS", "cop0"));
	}
	
	@Test
	public void removeAssignmentValidTest() {
		test.addAssignment("Billy Bob EPHS", "cop");
		assertTrue(test.removeAssignment("Billy Bob EPHS", "cop0"));
	}
	
	@Test
	public void isStudentFullTrueTest() {
		test.addAssignment("Billy Bob EPHS", "business");
		test.addAssignment("Billy Bob EPHS", "accounting");
		test.addAssignment("Billy Bob EPHS",  "clown");
		assertTrue(test.isStudentFull("Billy Bob EPHS"));
	}
	
	@Test
	public void isStudentFullFalseTest() {
		assertFalse(test.isStudentFull("Billy Bob EPHS"));
	}
	
	@Test
	public void isStudentFullFalse2Test() {
		test.addAssignment("Billy Bob EPHS", "accounting");
		assertFalse(test.isStudentFull("Billy Bob EPHS"));
	}
	
	@Test
	public void isSessionFullTest() {
		test.addAssignment("Billy Bob EPHS",  "clown");
		test.addAssignment("Mary Beth EPHS", "clown");
		assertTrue(test.isSessionFull("clown2"));
	}
	
	@Test
	public void resetAsssignmentsTest() {
		test.addAssignment("Billy Bob EPHS", "business");
		test.addAssignment("Billy Bob EPHS", "accounting");
		test.addAssignment("Billy Bob EPHS",  "clown");
		test.addAssignment("Mary Beth EPHS", "clown");
		test.resetAssignments();
		HashMap<String, Student> studs = test.getStudents();
		Iterator<Student> iterator = studs.values().iterator();
		while (iterator.hasNext()) {
			String[] sched = iterator.next().getSchedule();
			for (int i = 0; i < sched.length; i++) {
				assertTrue(sched[i] == null);
			}
		}
		Iterator<Session> iterator2 = test.getSessions().values().iterator();
		while (iterator2.hasNext()) {
			assertTrue(iterator2.next().getStudents().size() == 0);
		}
	}

}
