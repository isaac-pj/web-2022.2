import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FirebaseContext from "../../contexts/FirebaseContext";
import StudentService from "../../services/StudentService";

const CreateStudent = () => {
  return <FirebaseContext.Consumer>{(value) => <CreateStudentWrapper firebase={value} />}</FirebaseContext.Consumer>;
};

const CreateStudentWrapper = ({ firebase }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [ira, setIra] = useState(0.0);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newStudent = { name, course, ira };
    StudentService.add(
      firebase.getFirestoreDb(),
      (id) => {
        alert(`Estudante ${id} adicionado!`);
        navigate("/listStudent");
      },
      newStudent
    );
  };

  return (
    <div className="container py-5">
      <h2>Criar Estudante</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label>Nome: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite seu nome"
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
        </div>
        <div className="form-group my-2">
          <label>Curso: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite seu curso"
            onChange={({ target }) => {
              setCourse(target.value);
            }}
          />
        </div>
        <div className="form-group my-2">
          <label>IRA: </label>
          <input
            type="number"
            step="any"
            className="form-control"
            placeholder="Digite seu IRA"
            onChange={({ target }) => {
              setIra(target.value);
            }}
          />
        </div>
        <div className="form-group my-4">
          <input type="submit" value="Criar Estudante" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateStudent;
