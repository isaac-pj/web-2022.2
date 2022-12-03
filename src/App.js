import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import FirebaseContext from "./contexts/FirebaseContext";
import FirebaseService from "./services/FirebaseService";

function App() {
  return (
    <FirebaseContext.Provider value={new FirebaseService()}>
      <Router>
        <NavBar />
        {/* <Routes />  */}
      </Router>
    </FirebaseContext.Provider>
  );
}
export default App;
