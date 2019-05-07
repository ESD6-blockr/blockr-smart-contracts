package main;

import main.exceptions.ContractException;

import java.util.List;
import java.util.Map;

public class contract {

    private String teacher_address;
    private List<String> student_addresses;

    private Map<Integer, String> badges;

    enum FieldState {Active, Finished}
    FieldState state;

    int teacherScore;

    private boolean isTeacher(String sender) {
        return teacher_address.equals(sender);
    }

    public contract (String sender, String[] students) {
        teacherScore = 0;
        teacher_address = sender;
        student_addresses = students;
        state = FieldState.Active;

        badges.put(1, "🎉 First grade");
        badges.put(20, "😃 People are happy");
        badges.put(40, "😀 Best teacher eveerrr");
        badges.put(80, "🤩 Absolute legend");
    }

    public void postFeedback(int grade) throws ContractException {
        if(grade > 0 && grade <= 10) {
//            if ()
        } else {
            throw new ContractException("Number must be in 1-10");
        }

        if(student_addresses) throw new ContractException("Number must be in 1-10");
        if(!(grade > 0 && grade <= 10)) throw new ContractException("Number must be in 1-10");
        if(state == FieldState.Finished) throw new ContractException("Field has ended");
    }

    public String[] getBadges() {

    }

    public void endField() {

    }

    public void require() {

    }


    //*
    // pragma solidity ^0.4.23;
    //
    //contract FieldTeacherBadges {
    //    address teacher;
    //    address[] students;
    //
    //    mapping (uint => string)[] badges;
    //
    //    enum FieldState { Active, Finished }
    //    FieldState state;
    //
    //    uint teacherScore;
    //
    //    modifier isTeacher {
    //        require(msg.sender == teacher, "Must be teacher");
    //        _;
    //    }
    //
    //    constructor(address[] _students) public {
    //        teacherScore = 0;
    //        teacher = msg.sender;
    //        students = _students;
    //        state = FieldState.Active;
    //
    //        // Set the badges
    //        badges[1] = "🎉 First grade";
    //        badges[20] = "😃 People are happy";
    //        badges[40] = "😀 Best teacher eveerrr";
    //        badges[80] = "🤩 Absolute legend";
    //    }
    //
    //    function postFeedback(uint8 _grade) payable public {
    //        require(_grade > 0 && _grade <= 10, "Number must be in 1-10");
    //        // require(msg.value == 0.1 ether, "Transfer 0.1 Eth to join");
    //        require(state == FieldState.Active, "Field has ended");
    //        require(students[msg.sender].exists(), "Only students can post feedback");
    //        teacherScore += _grade;
    //    }
    //
    //    function getBadges() public isTeacher {
    //        string[] earnedBadges = [];
    //        for(uint i = teacherScore; i > 0; i--) {
    //            if (badges[i].exists) {
    //                earnedBadges.push(badges[i]);
    //            }
    //        }
    //        return earnedBadges;
    //    }
    //
    //    function endField() public isTeacher {
    //        state = FieldState.Finished;
    //    }
    //
    //}
    // *//
}
