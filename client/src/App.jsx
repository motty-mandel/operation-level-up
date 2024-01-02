import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

export default function App() {
    return (
        <div className='App'>
        <Header />
        <Outlet />
        <Footer />
        </div>
    );
}