import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import ConstructionPage from "./pages/constructionPage/ConstructionPage.jsx";
import HelloWorld from "./pages/homePage/HelloWorld.jsx";
import LevelUpForm from "./pages/levelUpCalc/LevelUpForm.jsx";
import MaxHpCalc from "./pages/maxHpCalc/MaxHpCalc.jsx";
import Navbar from "./pages/navBar/NavBar.jsx";
import Footer from "./pages/footer/Footer.jsx";
import GeneralRules from "./pages/generalRules/GeneralRules.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className='pt-20 bg-gray-900 min-h-screen'>
        <Switch>
          <Route path='/' element={<HelloWorld />} />
          <Route path='/construction-planner' element={<ConstructionPage />} />
          <Route path='/level-up-calc' element={<LevelUpForm />} />
          <Route path='/max-hp-calc' element={<MaxHpCalc />} />
          <Route path='/general-rules' element={<GeneralRules />} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
