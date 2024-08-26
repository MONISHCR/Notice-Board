import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ subjectId }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:5000/api/subjects/${subjectId}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        alert('File uploaded successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Upload PDF</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Upload</button>
        </form>
    );
};

export default FileUpload;
