// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GradeBook {
    // Define a struct named Grade with fields studentName, subject, and grade
    struct Grade {
        string studentName;
        string subject;
        uint8 grade;
    }

    // Array to store instances of the Grade struct
    Grade[] public grades;

    // Address of the contract owner (instructor)
    address public owner;

    // Modifier to restrict functions to only the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // Constructor to initialize the contract owner
    constructor() {
        owner = msg.sender;
    }

    // Function to add a new grade entry for a student
    function addGrade(string memory _studentName, string memory _subject, uint8 _grade) public onlyOwner {
        grades.push(Grade(_studentName, _subject, _grade));
    }

    // Function to update the grade of a student for a specific subject
    function updateGrade(string memory _studentName, string memory _subject, uint8 _newGrade) public onlyOwner {
        for (uint i = 0; i < grades.length; i++) {
            if (keccak256(bytes(grades[i].studentName)) == keccak256(bytes(_studentName)) &&
                keccak256(bytes(grades[i].subject)) == keccak256(bytes(_subject))) {
                grades[i].grade = _newGrade;
                return;
            }
        }
        revert("Grade entry not found");
    }

    // Function to retrieve the grade of a student for a particular subject
    function getGrade(string memory _studentName, string memory _subject) public view returns (uint8) {
        for (uint i = 0; i < grades.length; i++) {
            if (keccak256(bytes(grades[i].studentName)) == keccak256(bytes(_studentName)) &&
                keccak256(bytes(grades[i].subject)) == keccak256(bytes(_subject))) {
                return grades[i].grade;
            }
        }
        revert("Grade entry not found");
    }

    // Function to calculate and return the average grade of all students for a specific subject
    function averageGrade(string memory _subject) public view returns (uint8) {
        uint totalGrades = 0;
        uint count = 0;
        
        for (uint i = 0; i < grades.length; i++) {
            if (keccak256(bytes(grades[i].subject)) == keccak256(bytes(_subject))) {
                totalGrades += grades[i].grade;
                count++;
            }
        }

        require(count > 0, "No grades found for this subject");
        return uint8(totalGrades / count);
    }
}