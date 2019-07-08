package registration;

import java.util.HashMap;

public class StudentImpl implements Student {
	private String name;
    private String id;
    private String teacher;
    private int numPeriods;
	private String[] schedule;
	private HashMap<String, Integer> reverseSchedule =
			new HashMap<String, Integer>();
	private String[] preferences;
	
	public StudentImpl(String name, String id, String teacher,
			int numPeriods, String[] preferences) {
		this.name = name;
		this.id = id;
		this.teacher = teacher;
		this.numPeriods = numPeriods;
		this.schedule = new String[numPeriods];
		this.preferences = preferences;
	}
	
	@Override
	public String getName() {
		return this.name;
	}
	
	@Override
	public String getId() {
		return this.id;
	}
	
	@Override
	public String getTeacher() {
		return this.teacher;
	}
	
	@Override
	public int getNumPeriods() {
		return this.numPeriods;
	}
	
	@Override
	public String[] getSchedule() {
		return this.schedule;
	}
	
	@Override
	public String[] getPreferences() {
		return this.preferences;
	}

	@Override
	public boolean addSession(String subject, int period) {
		if (this.schedule[period] == null && 
				!this.reverseSchedule.containsKey(subject)) {
			this.schedule[period] = subject;
			this.reverseSchedule.put(subject, period);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean removeSession(String subject, int period) {
		if (this.schedule[period] == null) {
			return false;
		} else {
			if (this.schedule[period] == subject) {
				this.schedule[period] = null;
				this.reverseSchedule.remove(subject);
				return true;
			} else {
				return false;
			}
		}
	}

	@Override
	public boolean isFull() {
		return this.reverseSchedule.keySet().size() == this.numPeriods;
		
	}
	
	@Override
	public void resetSchedule() {
		this.schedule = new String[this.numPeriods];
		this.reverseSchedule = new HashMap<String, Integer>();
	}

}
