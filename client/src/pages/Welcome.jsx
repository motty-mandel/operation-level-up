import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './welcome.css';


export default function Welcome() {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const first = localStorage.getItem('firstTime');
    //     if (first === null) {
    //         localStorage.setItem('firstTime', 'You were here!');
    //     } else {
    //         navigate('/home');
    //     }
    // }, [])

    return (
        <div className='mainWelcome'>
            <h1>Welcome to Level Up!</h1>
            <p>This website is here to help anyone that is struggling with motivational problems. It can be very difficult to stay <br />
                motivated when you are working on your own. This website is here to help you with that. The plan is, anyone <br />
                can upload a video of themselves talking about what they are working on and what they are struggling with, <br />
                whether it be a workout, diet, hobbies or even homework. Then, other users can watch the video and stay motivated <br />
                by seeing that they are not alone in their struggles. We hope that this website can help you stay motivated and <br />
                help you reach your goals. Users will be able to upload videos and then a timer will start. After 6 hours, a new user <br />
                will be able to upload a video. This is to ensure that everyone gets a chance to upload a video and share their <br />
                struggles. We hope that you enjoy using this website and that it helps you stay motivated!
            </p>
            <Link to='/home'>
                <button>Start Watching!</button>
            </Link>
        </div>
    );
}