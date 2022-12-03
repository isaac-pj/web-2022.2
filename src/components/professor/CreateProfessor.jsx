import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FirebaseContext from "../../contexts/FirebaseContext";
import ProfessorService from "../../services/ProfessorService";

const CreateProfessor = () => {
  return <FirebaseContext.Consumer>{(value) => <CreateProfessorWrapper firebase={value} />}</FirebaseContext.Consumer>;
};

const CreateProfessorWrapper = ({ firebase }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [salary, setSalary] = useState(0.0);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProfessor = { name, course, salary };
    ProfessorService.add(
      firebase.getFirestoreDb(),
      (id) => {
        alert(`Professor ${id} adicionado!`);
        navigate("/listProfessor");
      },
      newProfessor
    );
  };

  return (
    <div className="container py-5">
      <h2>Criar Professor</h2>
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
          <label>Salário: </label>
          <input
            type="number"
            step="any"
            className="form-control"
            placeholder="Digite seu salário"
            onChange={({ target }) => {
              setSalary(target.value);
            }}
          />
        </div>
        <div className="form-group my-4">
          <input type="submit" value="Criar Professor" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateProfessor;
