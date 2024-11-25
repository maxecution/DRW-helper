import { HashRouter as Router, Route, Routes as Switch } from "react-router-dom";
// import "./App.css";
import ConstructionPage from "./pages/constructionPage/ConstructionPage.jsx";
import HelloWorld from "./pages/HomePage/HelloWorld.jsx";
import Navbar from "./pages/components/NavBar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className='pt-20'>
        <Switch>
          <Route path='/' element={<HelloWorld />} />
          <Route path='/construction-planner' element={<ConstructionPage />} />
          <Route path='/level-up-calc' element={<HelloWorld />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
