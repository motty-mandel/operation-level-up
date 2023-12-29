import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
    return (
        <div>
            <Container>
                <Row>
                    <Col className='welcome'>
                        <h1>Welcome to Level Up!</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="video-container">
                            <div className="video-wrapper">
                                <video width="100%" height="auto" controls>
                                    <source src='../../vids&images/shabab.mp4' type="video/mp4" controls/>
                                </video>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
