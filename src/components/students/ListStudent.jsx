import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FirebaseContext from "../../contexts/FirebaseContext";
import StudentService from "../../services/StudentService";

const ListStudent = () => {
  return <FirebaseContext.Consumer>{(value) => <ListStudentWrapper firebase={value} />}</FirebaseContext.Consumer>;
};

const ListStudentWrapper = ({ firebase }) => {
  const [students, setStudents] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    StudentService.list_on_snapshot(firebase.getFirestoreDb(), (students) => {
      setStudents(students);
    });
  }, [firebase]);

  function deleteStudent(studentId) {
    const callback = () => {
      const updatedStudents = students.filter(({ id }) => studentId !== id);
      setStudents(updatedStudents);
      setReload(!reload);
    };

    if (window.confirm("Deseja excluir?")) {
      StudentService.delete(firebase.getFirestoreDb(), callback, studentId);
    }
  }

  const renderTableBody = () =>
    students.map(({ id, name, course, ira }) => (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{course}</td>
        <td>{ira}</td>
        <td>
          <Link to={`/editStudent/${id}`} className="btn btn-primary">
            Editar
          </Link>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteStudent(id)}>
            Apagar
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="container py-5">
      <h1>Listar Estudante</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Curso</th>
            <th>IRA</th>
            <th colSpan={2}>Ações</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default ListStudent;
