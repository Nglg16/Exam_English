import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    quizId: '',
    quizTitle: '',
    category: '',
    Description: '',
    images: '',
    questions: []
  });

  const [formData, setFormData] = useState({
    quizTitle: '',
    category: '',
    Description: '',
    images: '',
    questions: []
  });

  const [questionCounter, setQuestionCounter] = useState(1); // Initialize a counter for unique IDs

  useEffect(() => {
    fetchQuizDetail();
  }, [id]);

  const fetchQuizDetail = () => {
    axios.get(`http://localhost:9999/quiz/${id}`)
      .then(res => {
        console.log(res.data);
        setQuiz(res.data);
        setFormData({
          quizTitle: res.data.quizTitle,
          category: res.data.category,
          Description: res.data.Description,
          images: res.data.images,
          questions: res.data.questions || [] // Ensure questions is an array
        });
        setQuestionCounter((res.data.questions?.length || 0) + 1); // Set the initial counter based on the number of existing questions
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios.put(`http://localhost:9999/quiz/${id}`, formData)
      .then(res => {
        console.log(res);
        alert('Update successful');
        navigate('/quiz');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const newQuestions = formData.questions.map((question, qIndex) => {
      if (index === qIndex) {
        return { ...question, [name]: value };
      }
      return question;
    });
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleAddQuestion = () => {
    const newQuestionId = `q${Date.now()}_${questionCounter}`;
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { id: newQuestionId, Question: '', A: '', B: '', C: '', D: '', CorrectAnswer: '' }
      ]
    });
    setQuestionCounter(questionCounter + 1); // Increment the counter
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, qIndex) => index !== qIndex);
    setFormData({ ...formData, questions: newQuestions });
  };

  return (
    <Container>
      <div style={{ textAlign: 'center' }}>
        <h1>Quiz Detail</h1>
        <p>Quiz ID: {quiz.quizId}</p>
        <p>Quiz Title: {quiz.quizTitle}</p>
        <p>Category: {quiz.category}</p>
        <p>Description: {quiz.Description}</p>
        <div>
          <img src={`http://localhost:9999/${quiz.images}`} style={{ width: '160px', height: 'auto' }} />
        </div>
      </div>

      <h1>Update Quiz</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Quiz Title"
            value={formData.quizTitle}
            onChange={(e) => setFormData({ ...formData, quizTitle: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option>Select Category</option>
            <option value="Noun">Noun</option>
            <option value="Verb">Verb</option>
            <option value="Adjective">Adjective</option>
            <option value="Adverb">Adverb</option>
            <option value="Pronoun">Pronoun</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={formData.Description}
            onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Images URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Images URL"
            value={formData.images}
            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
          />
        </Form.Group>

        <h3>Questions</h3>
        {formData.questions.map((question, index) => (
          <div key={index}>
            <Form.Group className="mb-3">
              <Form.Label>Question {index + 1}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Question"
                name="Question"
                value={question.Question}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Option A</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Option A"
                name="A"
                value={question.A}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Option B</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Option B"
                name="B"
                value={question.B}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Option C</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Option C"
                name="C"
                value={question.C}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Option D</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Option D"
                name="D"
                value={question.D}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                as="select"
                name="CorrectAnswer"
                value={question.CorrectAnswer}
                onChange={(e) => handleQuestionChange(index, e)}
              >
                <option value="">Select Correct Answer</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Form.Control>
            </Form.Group>
            <Button variant="danger" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </Button>
          </div>
        ))}
        <div style={{marginTop:"30px" , marginBottom:"30px"}}>
        <Button variant="secondary" onClick={handleAddQuestion}>
          Add Question
        </Button>

        <Button variant="primary" type="submit" style={{ marginLeft: '30px' }}>
          Update
        </Button>
        </div>
      </Form>
    </Container>
  );
}

export default QuizDetail;
