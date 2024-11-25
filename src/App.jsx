import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import "./App.css";
import ConstructionPage from "./pages/constructionPage/ConstructionPage";
import HelloWorld from "./pages/levelUpPage/HelloWorld";

function App() {
  return (
    <Router basename='/DRW-helper'>
      <Switch>
        <Route path='/construction-planner' element={<ConstructionPage />} />
        <Route path='/level-up-calc' element={<HelloWorld />} />
      </Switch>
    </Router>
  );
}

export default App;
