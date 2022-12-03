import { Routes as ReactRoutes, Route } from "react-router-dom";

// import Home from '../components/Home';
import CreateStudent from "../components/students/CreateStudent";
import EditStudent from "../components/students/EditStudent";
import ListStudent from "../components/students/ListStudent";

// import SignInUserPage from "../components/users/SignInUser";
// import SignUpUserPage from "../components/users/SignUpUser";

const elementForDefaultRoute = <ListStudent />;

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" redirectTo element={elementForDefaultRoute} />
      <Route path="createStudent" element={<CreateStudent />} />
      <Route path="listStudent" element={<ListStudent />} />
      <Route path="editStudent/:id" element={<EditStudent />} />
      <Route path="*" element={elementForDefaultRoute} />
    </ReactRoutes>
  );
};

export default Routes;
