import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from '../utils/auth';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Home() {
    const isLoggedIn = Auth.loggedIn();

    const [showInput, setShowInput] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [videoSrc, setVideoSrc] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

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
            .catch(err => {
                setErrorMessage('There was an error uploading the video');
            })
        localStorage.setItem('uploadTime', Date.now());
        setShowInput(false);
    };

    useEffect(() => {
        // Get the upload time from the local storage
        const uploadTime = localStorage.getItem('uploadTime');

        // If an upload time is found, check if 6 hours have passed
        if (uploadTime) {
            const timePassed = Date.now() - uploadTime;

            if (timePassed >= 60 * 1000) {
                // If 6 hours have passed, show the input buttons
                setShowInput(true);
            } else {
                // If 6 hours have not passed, hide the input buttons and start a timeout to show them after the remaining time
                setShowInput(false);

                const timeoutId = setTimeout(() => {
                    setShowInput(true);
                }, 60 * 1000 - timePassed);

                // Clear the timeout if the component is unmounted before the timeout is up
                return () => clearTimeout(timeoutId);
            }
        }
    }, []);

    useEffect(() => {
        const videoUrl = localStorage.getItem('videoSrc');
        if (videoUrl) {
            setVideoSrc(videoUrl);
        }
    })

    return (
            <div className='welcomeMain'>
                {isLoggedIn ? (
                    <div className='welcome mt-5'>
                        <h1></h1>
                    </div>
                ) : (
                    <div className='welcome'>
                        <h1>WELCOME TO LEVEL UP</h1>
                    </div>

                )
                }
                {/* <Rnd
                    default={{
                        x: -40,
                        y: 100,
                        width: 500,
                        height: 500,
                    }}
                    bounds=".App"
                > */}
                    <div className='welcome-vid'>
                        <video src={videoSrc} type='video/mp4' controls>
                            Your browser does not support the video tag.
                        </video>
                        {isLoggedIn ? (
                            showInput ? (
                                <form encType='multipart/form-data'>
                                    <input type="file" name='videos' onChange={e => setSelectedFile(e.target.files[0])} />
                                    <input type="submit" onClick={handleUpload} className='input' />
                                </form>
                            ) : (
                                <p id="userMessage" >Video has been uploaded. Please wait 1 minute to upload another video.</p>
                            )
                        ) : (
                            <p>Sign up or login to upload videos</p>
                        )}
                    </div>
                {/* </Rnd> */}
            </div>
    );
};