import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    return (
        <div>
            <div className='welcome'>
                <h1>WELCOME TO LEVEL UP</h1>
            </div>
            <div className='welcome-vid'>
                <video src="/sheep.mp4" type='video/mp4' controls>
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};
