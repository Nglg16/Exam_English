import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function QuizComponent(props) {
    const { quiz, onStartQuiz } = props;
    const navigate = useNavigate(); // Initialize navigate function

    const handleStartQuiz = () => {
        // Navigate to DoQuiz component with quiz data
        navigate(`/doquiz/${quiz.quizId}`);
    };

    return (
        <Card className='col-3' style={{ cursor: 'pointer' }} onClick={onStartQuiz}>
            <Card.Header>
                <img src={quiz?.images} alt={quiz?.Question} className='w-100' />
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <h5>{quiz?.quizTitle}</h5>
                </Card.Text>
                <Card.Text>
                    {quiz?.Description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default QuizComponent;
