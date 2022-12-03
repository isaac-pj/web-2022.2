import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FirebaseContext from "../../contexts/FirebaseContext";
import ProfessorService from "../../services/ProfessorService";

const ListProfessor = () => {
  return <FirebaseContext.Consumer>{(value) => <ListProfessorWrapper firebase={value} />}</FirebaseContext.Consumer>;
};

const ListProfessorWrapper = ({ firebase }) => {
  const [professors, setProfessors] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    ProfessorService.list_on_snapshot(firebase.getFirestoreDb(), (professors) => {
      setProfessors(professors);
    });
  }, [firebase]);

  function deleteProfessor(studentId) {
    const callback = () => {
      const updatedProfessors = professors.filter(({ id }) => studentId !== id);
      setProfessors(updatedProfessors);
      setReload(!reload);
    };

    if (window.confirm("Deseja excluir?")) {
      ProfessorService.delete(firebase.getFirestoreDb(), callback, studentId);
    }
  }

  const renderTableBody = () =>
    professors.map(({ id, name, course, salary }) => (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{course}</td>
        <td>{salary}</td>
        <td>
          <Link to={`/editProfessor/${id}`} className="btn btn-primary">
            Editar
          </Link>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteProfessor(id)}>
            Apagar
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="container py-5">
      <h1>Listar Professor</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Curso</th>
            <th>Salário</th>
            <th colSpan={2}>Ações</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default ListProfessor;
