import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../utils/auth';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
    const isLoggedIn = Auth.loggedIn();

    const [selectedFile, setSelectedFile] = useState();
    const [videoSrc, setVideoSrc] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        console.log(selectedFile);
        const formData = new FormData();
        formData.append('file', selectedFile);
        axios.post('http://localhost:3001/upload', formData)
            .then(response => {
                const videoUrl = `http://localhost:3001${response.data.filePath}`;
                setVideoSrc(videoUrl);
                localStorage.setItem('videoSrc', videoUrl);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        const videoUrl = localStorage.getItem('videoSrc');
        if (videoUrl) {
            setVideoSrc(videoUrl);
        }
    })



    return (
        <div>
            {isLoggedIn ? (
                <div className='welcome'>
                    <h1></h1>
                </div>
            ) : (
                <div className='welcome'>
                    <h1>WELCOME TO LEVEL UP</h1>
                </div>

            )
            }
            <div className='welcome-vid mt-5'>
                <video src={videoSrc} type='video/mp4' controls>
                    Your browser does not support the video tag.
                </video>
                {isLoggedIn ? (
                    <>
                        <form encType='multipart/form-data'>
                            <input type="file" name='videos' onChange={e => setSelectedFile(e.target.files[0])} />
                            <input type="submit" onClick={(event) => handleUpload(event)} />
                        </form>
                    </>
                ) : (
                    <p>Sign up or login to upload videos</p>
                )}



            </div>
        </div>
    );
};