package main.contracts;

import main.exceptions.ContractException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ContractTeacherBadges implements Contract {

    private String teacher_address;
    private List<String> student_addresses;

    private Map<Integer, String> badges;


    enum FieldState {Active, Finished}
    FieldState state;

    int teacherScore;

    private boolean isTeacher(String sender) {
        return teacher_address.equals(sender);
    }

    public ContractTeacherBadges(String sender, List<String> students) {
        teacherScore = 0;
        teacher_address = sender;
        student_addresses = students;
        state = FieldState.Active;

        badges.put(1, "🎉 First grade");
        badges.put(20, "😃 People are happy");
        badges.put(40, "😀 Best teacher eveerrr");
        badges.put(80, "🤩 Absolute legend");
    }

    public void postFeedback(int grade, String sender) throws ContractException {
        if(!student_addresses.contains(sender)) throw new ContractException("Only students can post feedback");
        if(!(grade > 0 && grade <= 10)) throw new ContractException("Number must be in 1-10");
        if(state == FieldState.Finished) throw new ContractException("Field has ended");
        teacherScore += grade;
    }

    public String[] getBadges(String sender) throws ContractException {
        if(!teacher_address.equals(sender)) throw new ContractException("Only the teacher can collect badges");
        List<String> earnedBadges = new ArrayList<String>();
        for (Map.Entry<Integer, String> badge : badges.entrySet()) {
            if(teacherScore >= badge.getKey()) {
                earnedBadges.add(badge.getValue());
            }
        }
        return (String[]) earnedBadges.toArray();
    }

    public void endField(String sender) throws ContractException {
        if(!teacher_address.equals(sender)) throw new ContractException("Only the teacher can collect badges");
        if(state == FieldState.Finished) throw new ContractException("Field has already ended");
        state = FieldState.Finished;
    }
}
