import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import ConstructionPage from "./pages/constructionPage/ConstructionPage";
import "./App.css";

function App() {
  return (
    <Router basename='/DRW-helper'>
      <Switch>
        <Route path='/construction-planner' element={<ConstructionPage />} />
      </Switch>
    </Router>
  );
}

export default App;
