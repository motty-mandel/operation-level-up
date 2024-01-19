import React, { useState, useEffect } from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Auth from '../utils/auth';

export default function Home() {
    const isLoggedIn = Auth.loggedIn();

    const [selectedFile, setSelectedFile] = useState(null);
    const [videos, setVideos] = useState([]);

    const handleFileUpload = event => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);

        // replace '/upload' with your server-side upload endpoint
        await axios.post('http://localhost:3001/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        if (selectedFile) {
            console.log('file uploaded successfully');
        } else {
            console.log('no file selected');
        }

        setSelectedFile(null);
        fetchVideos();
    };

    const fetchVideos = async () => {
        // replace '/videos' with your server-side videos endpoint
        // const response = await axios.get('');
        // setVideos(response.data);
        console.log('Videos got')
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
                <video src="sheep.mp4" type='video/mp4' controls>
                    Your browser does not support the video tag.
                </video>
                {isLoggedIn ? (
                <>
                    <form method='POST' onSubmit={uploadFile} encType='multipart/form-data'>
                        <input type="file" name='videos'/>
                        <input type="submit" />
                    </form>
                </>
                ) : (
                    <p>Sign up or login to upload videos</p>
                )}
            </div>
        </div>
    );
};