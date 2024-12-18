import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import ConstructionPage from "./pages/constructionPage/ConstructionPage.jsx";
import HelloWorld from "./pages/homePage/HelloWorld.jsx";
import Navbar from "./pages/navBar/NavBar.jsx";

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
