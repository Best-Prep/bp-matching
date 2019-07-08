package registration;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class StudentImplTest {
	private StudentImpl test;
	private String[] preferences;
	
	@Before
	public void setUp() throws Exception {		
		preferences = new String[3];
		for (int i = 0; i < 3; i++) {
			preferences[i] = "" + i;
		}
		
		test = new StudentImpl("Bob Myers", 
				"Bob Myers EPHS", "Ms. Hoe", 3, preferences);
	}

	@Test
	public void getNameTest() {
		assertEquals("Bob Myers", test.getName());
	}
	
	@Test
	public void getIdTest() {
		assertEquals("Bob Myers EPHS", test.getId());
	}
	
	@Test
	public void getTeacherTest() {
		assertEquals("Ms. Hoe", test.getTeacher());
	}
	
	@Test
	public void getNumPeriodsTest() {
		assertEquals(3, test.getNumPeriods());
	}
	
	@Test
	public void getScheduleTest() {
		String[] sched = {"business", "accounting", "clown"};
		test.addSession("business", 0);
		test.addSession("accounting", 1);
		test.addSession("clown", 2);
		assertArrayEquals(sched, test.getSchedule());
	}
	
	@Test
	public void getPreferencesTest() {
		String[] prefs = {"0", "1", "2"};
		assertArrayEquals(prefs, test.getPreferences());
	}
	
	@Test
	public void addSessionValidTest() {
		assertTrue(test.addSession("business", 0));
	}
	
	@Test
	public void addSessionDuplicateTest() {
		test.addSession("business", 1);
		assertFalse(test.addSession("business", 0));
	}
	
	@Test
	public void addSessionFullSlotTest() {
		test.addSession("business", 0);
		assertFalse(test.addSession("accounting", 0));
	}

	@Test
	public void removeSessionValidTest() {
		test.addSession("business", 0);
		assertTrue(test.removeSession("business", 0));
	}
	
	@Test
	public void removeSessionEmptySlotTest() {
		test.addSession("business", 0);
		assertFalse(test.removeSession("business", 1));
	}
	
	@Test
	public void removeSessionWrongSubjectTest() {
		test.addSession("business", 0);
		assertFalse(test.addSession("accounting", 0));
	}
	
	@Test
	public void isFullTrueTest() {
		test.addSession("1", 0);
		test.addSession("2", 1);
		test.addSession("3", 2);
		assertTrue(test.isFull());
	}
	
	@Test
	public void isFullFalseTest() {
		test.addSession("1", 1);
		assertFalse(test.isFull());
	}
	
	@Test
	public void resetScheduleTest() {
		test.addSession("1", 0);
		test.addSession("2", 1);
		test.addSession("3", 2);
		test.resetSchedule();
		String[] sched = test.getSchedule();
		assertTrue(sched[0] == null && sched[1] == null && sched[2] == null);
	}
}
