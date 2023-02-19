import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ViewProperty from "./components/ViewProperty";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ViewProperty />
      </div>
    </BrowserRouter>
  );
}

export default App;
