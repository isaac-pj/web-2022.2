import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FirebaseContext from "../../contexts/FirebaseContext";
import StudentService from "../../services/StudentService";

const EditStudent = () => {
  return <FirebaseContext.Consumer>{(value) => <EditStudentWrapper firebase={value} />}</FirebaseContext.Consumer>;
};

const EditStudentWrapper = ({ firebase }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [ira, setIra] = useState(0.0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    StudentService.retrieve(
      firebase.getFirestoreDb(),
      ({ name, course, ira }) => {
        setName(name);
        setCourse(course);
        setIra(ira);
      },
      id
    );
  }, [id, firebase]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const studentUpdated = { name, course, ira };
    StudentService.update(firebase.getFirestoreDb(), () => navigate("/listStudent"), id, studentUpdated);
  };

  return (
    <div className="container py-5">
      <h2>Editar Estudante</h2>
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
          <label>IRA: </label>
          <input
            type="number"
            step="any"
            className="form-control"
            placeholder="Digite seu IRA"
            value={ira ?? 0.0}
            onChange={({ target }) => {
              setIra(target.value);
            }}
          />
        </div>
        <div className="form-group my-4">
          <input type="submit" value="Editar Estudante" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
