import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FirebaseContext from "../../contexts/FirebaseContext";
import ProfessorService from "../../services/ProfessorService";

const EditProfessor = () => {
  return <FirebaseContext.Consumer>{(value) => <EditProfessorWrapper firebase={value} />}</FirebaseContext.Consumer>;
};

const EditProfessorWrapper = ({ firebase }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [salary, setSalary] = useState(0.0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    ProfessorService.retrieve(
      firebase.getFirestoreDb(),
      ({ name, course, salary }) => {
        setName(name);
        setCourse(course);
        setSalary(salary);
      },
      id
    );
  }, [id, firebase]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const studentUpdated = { name, course, salary };
    ProfessorService.update(firebase.getFirestoreDb(), () => navigate("/listProfessor"), id, studentUpdated);
  };

  return (
    <div className="container py-5">
      <h2>Editar Professor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label>Nome: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite seu nome"
            value={name || ""}
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
            value={course || ""}
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
            placeholder="Digite seu Salário"
            value={salary ?? 0.0}
            onChange={({ target }) => {
              setSalary(target.value);
            }}
          />
        </div>
        <div className="form-group my-4">
          <input type="submit" value="Editar Professor" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditProfessor;
