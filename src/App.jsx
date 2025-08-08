import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import ConstructionPage from "./pages/constructionPage/ConstructionPage.jsx";
import HelloWorld from "./pages/homePage/HelloWorld.jsx";
import LevelUpForm from "./pages/levelUpCalc/LevelUpForm.tsx";
import MaxHpCalc from "./pages/maxHpCalc/MaxHpCalc.jsx";
import Navbar from "./pages/navBar/NavBar.jsx";
import Footer from "./pages/footer/Footer.jsx";
import GeneralRules from "./pages/generalRules/GeneralRules.jsx";
import GamesPage from "./pages/macroGeneratorPage/festivalOfGiants.jsx";

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen bg-gray-900 min-w-min'>
        <Navbar />
        <div className='w-full pt-16'>
          <Switch>
            <Route path='/' element={<HelloWorld />} />
            <Route path='/construction-planner' element={<ConstructionPage />} />
            <Route path='/level-up-calc' element={<LevelUpForm />} />
            <Route path='/max-hp-calc' element={<MaxHpCalc />} />
            <Route path='/general-rules' element={<GeneralRules />} />
            <Route path='/festival-of-giants' element={<GamesPage />} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
