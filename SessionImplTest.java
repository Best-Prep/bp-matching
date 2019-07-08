package registration;

import static org.junit.Assert.*;

import java.util.HashSet;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;

public class SessionImplTest {
	private SessionImpl test;
	
	@Before
	public void setUp() throws Exception {
		test = new SessionImpl(0, "business", 3);
	}

	@Test
	public void getPeriodTest() {
		assertEquals(0, test.getPeriod());
	}
	
	@Test
	public void getSubjectTest() {
		assertEquals("business", test.getSubject());
	}
	
	@Test
	public void getCapacityTest() {
		assertEquals(3, test.getCapacity());
	}
	
	@Test
	public void getStudentsEmptyTest() {
		Set<String> expected = new HashSet<String>();
		assertEquals(expected, test.getStudents());
	}
	
	@Test
	public void getStudentsSingleTest() {
		Set<String> expected = new HashSet<String>();
		expected.add("Bob");
		test.addStudent("Bob");
		assertEquals(expected, test.getStudents());
	}
	
	@Test
	public void getStudentsMultipleTest() {
		Set<String> expected = new HashSet<String>();
		expected.add("Bob");
		expected.add("John");
		expected.add("Michael");
		test.addStudent("Bob");
		test.addStudent("John");
		test.addStudent("Michael");
		assertEquals(expected, test.getStudents());
	}
	
	@Test
	public void addStudentValidTest() {
		assertTrue(test.addStudent("Michel"));
	}
	
	@Test
	public void addStudentInvalidTest() {
		test.addStudent("Michel");
		test.addStudent("Sumangal");
		test.addStudent("Nayzir");
		assertFalse(test.addStudent("Bob"));
	}
	
	@Test
	public void removeStudentInvalidTest() {
		assertFalse(test.removeStudent("Bob"));
	}
	
	@Test
	public void removeStudentValidTest() {
		test.addStudent("Bob");
		assertTrue(test.removeStudent("Bob"));
	}
	
	@Test
	public void isFullTrueTest() {
		test.addStudent("Bob");
		test.addStudent("Mokey");
		test.addStudent("Velany");
		assertTrue(test.isFull());
	}
	
	@Test
	public void isFullFalseTest() {
		assertFalse(test.isFull());
	}
	
	@Test
	public void resetSessionTest() {
		test.addStudent("Bob");
		test.addStudent("Mokey");
		test.addStudent("Velany");
		test.resetSession();
		assertFalse(test.isFull());
	}
}
