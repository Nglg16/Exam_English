import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Add() {
  const [formData, setFormData] = useState({
    quizTitle: '',
    category: '',
    Description: '',
    images: '',
    questions: [
      { id: 1, Question: '', A: '', B: '', C: '', D: '', CorrectAnswer: '' }
    ]
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios.post("http://localhost:9999/quiz", formData)
      .then(res => {
        console.log(res);
        alert("Quiz added successfully");
        navigate("/quiz");
      }).catch(err => {
        console.log(err);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOptionChange = (index, event) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      CorrectAnswer: event.target.value
    };
    setFormData({
      ...formData,
      questions: newQuestions
    });
  };

  const handleQuestionChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...formData.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [name]: value
    };
    setFormData({
      ...formData,
      questions: newQuestions
    });
  };

  const handleAddQuestion = () => {
    const nextId = formData.questions.length + 1;
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { id: nextId, Question: '', A: '', B: '', C: '', D: '', CorrectAnswer: '' }
      ]
    });
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, qIndex) => index !== qIndex);
    setFormData({
      ...formData,
      questions: newQuestions
    });
  };

  return (
    <Container>
      <h1 className="my-4">Add New Quiz</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Quiz Title</Form.Label>
          <Col sm={10}>
            <Form.Control
              type='text'
              name='quizTitle'
              value={formData.quizTitle}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Category</Form.Label>
          <Col sm={10}>
            <Form.Control as="select" name='category' value={formData.category} onChange={handleInputChange}>
              <option value="">Select Category</option>
              <option value="Noun">Noun</option>
              <option value="Verb">Verb</option>
              <option value="Adjective">Adjective</option>
              <option value="Adverb">Adverb</option>
              <option value="Pronoun">Pronoun</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Description</Form.Label>
          <Col sm={10}>
            <Form.Control
              type='text'
              name='Description'
              value={formData.Description}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Image URL</Form.Label>
          <Col sm={10}>
            <Form.Control
              type='text'
              name='images'
              value={formData.images}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <h3>Questions</h3>
        {formData.questions.map((question, index) => (
          <div key={index}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>Question {index + 1}</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name='Question'
                  value={question.Question}
                  onChange={(event) => handleQuestionChange(index, event)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>Option A</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name='A'
                  value={question.A}
                  onChange={(event) => handleQuestionChange(index, event)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>Option B</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name='B'
                  value={question.B}
                  onChange={(event) => handleQuestionChange(index, event)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>Option C</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name='C'
                  value={question.C}
                  onChange={(event) => handleQuestionChange(index, event)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>Option D</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  name='D'
                  value={question.D}
                  onChange={(event) => handleQuestionChange(index, event)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>Correct Answer</Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={question.CorrectAnswer}
                  onChange={(event) => handleOptionChange(index, event)}
                >
                  <option value="">Select Correct Answer</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Button variant="danger" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </Button>
            {index === formData.questions.length - 1 && (
              <Button variant="secondary" onClick={handleAddQuestion} className="ms-2">
                Add Question
              </Button>
            )}
          </div>
        ))}

        <Button variant="primary" type='submit' style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Add;
