// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import ViewProperty from "./components/ViewProperty";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <ViewProperty />
      </div>
    </BrowserRouter>
  );
}

export default App;
