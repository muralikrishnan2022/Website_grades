import React, { useState } from 'react';
import { ethers } from 'ethers';

const GradeBookForm = ({ contract }) => {
    const [studentName, setStudentName] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState(0);
    const [message, setMessage] = useState('');

    const handleAddGrade = async () => {
        try {
            const tx = await contract.addGrade(studentName, subject, grade);
            await tx.wait();
            setMessage(`Added grade for ${studentName} in ${subject}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleUpdateGrade = async () => {
        try {
            const tx = await contract.updateGrade(studentName, subject, grade);
            await tx.wait();
            setMessage(`Updated grade for ${studentName} in ${subject}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleGetGrade = async () => {
        try {
            const result = await contract.getGrade(studentName, subject);
            setMessage(`${studentName}'s grade in ${subject}: ${result}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>GradeBook Form</h2>
            <div>
                <label>Student Name:</label>
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
            </div>
            <div>
                <label>Subject:</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
                <label>Grade:</label>
                <input type="number" value={grade} onChange={(e) => setGrade(e.target.value)} />
            </div>
            <div>
                <button onClick={handleAddGrade}>Add Grade</button>
                <button onClick={handleUpdateGrade}>Update Grade</button>
                <button onClick={handleGetGrade}>Get Grade</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default GradeBookForm;
