import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload';

const Dashboard = () => {
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        const fetchSemesters = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/semesters', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSemesters(response.data);
        };
        fetchSemesters();
    }, []);

    const toggleCollapse = (id) => {
        const updatedSemesters = semesters.map(semester => {
            if (semester._id === id) {
                return { ...semester, isCollapsed: !semester.isCollapsed };
            }
            return semester;
        });
        setSemesters(updatedSemesters);
    };

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>
            {semesters.map(semester => (
                <div key={semester._id}>
                    <button
                        className="btn btn-secondary mb-2"
                        onClick={() => toggleCollapse(semester._id)}
                    >
                        {semester.name}
                    </button>
                    {!semester.isCollapsed && (
                        <div className="ml-3">
                            {semester.branches.map(branch => (
                                <div key={branch._id}>
                                    <h5>{branch.name}</h5>
                                    <ul>
                                        {branch.subjects.map(subject => (
                                            <li key={subject._id}>
                                                {subject.name}
                                                <ul>
                                                    {subject.units.map((unit, index) => (
                                                        <li key={index}>{unit}</li>
                                                    ))}
                                                </ul>
                                                <FileUpload subjectId={subject._id} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
