import React, { useState, useEffect } from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Home() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [videos, setVideos] = useState([]);

    const handleFileUpload = event => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        // replace '/upload' with your server-side upload endpoint
        await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setSelectedFile(null);
        fetchVideos();
    };

    const fetchVideos = async () => {
        // replace '/videos' with your server-side videos endpoint
        const response = await axios.get('/videos');
        setVideos(response.data);
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div>
            <div className='welcome'>
                <h1>WELCOME TO LEVEL UP</h1>
            </div>
            <div className='welcome-vid'>
                <input type="file" name='upload' accept='video/*' onChange={handleFileUpload} />
                <button onClick={uploadFile}>Upload</button>
                {videos.map((video, index) => (
                    <video key={index} src={video.url} type='video/mp4' controls>
                        Your browser does not support the video tag.
                    </video>
                ))}
            </div>
        </div>
    );
};