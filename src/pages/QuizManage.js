import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function QuizManage() {
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = () => {
    axios.get('http://localhost:9999/quiz')
      .then((res) => {
        console.log(res.data);
        setQuiz(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete("http://localhost:9999/quiz/"+id)
      .then(res => {
        alert("Xóa thành công");
        // Cập nhật lại danh sách quiz sau khi xóa thành công
        setQuiz(prevQuiz => prevQuiz.filter(q => q.id !== id));
      })
      .catch(err => {
        console.error("Lỗi khi xóa quiz:", err);
        alert("Đã xảy ra lỗi khi xóa quiz");
      });
  };
  
  const handleRedirect = () => {
    navigate('/add'); // Navigate to the add quiz page
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "30px" }}>Quiz Control</h1>

      <Button onClick={handleRedirect}>Add Quiz</Button>

      <div>
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Quiz Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Images</th>
              <th>Number of Questions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quiz.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.quizTitle}</td>
                <td>{q.category}</td>
                <td>{q.Description}</td>
                <td>
                  <img src={q.images} alt="Quiz" style={{ width: '100px', height: 'auto' }} />
                </td>
                <td>{q.questions?.length || 0}</td>

                <td>
                <Button variant="danger" onClick={() => handleDelete(q.id)}>
                      Delete
                    </Button>
                  <Button variant="info" onClick={() => navigate(`/quizdt/${q.id}`)} style={{marginLeft:"20px"}}>Info</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default QuizManage;
