import { HashRouter as Router, Route, Routes as Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./pages/components/NavBar.jsx";

const ConstructionPage = lazy(() => import("./pages/constructionPage/ConstructionPage.jsx"));
const HelloWorld = lazy(() => import("./pages/HomePage/HelloWorld.jsx"));
// const LevelUpCalc = lazy(() => import("./pages/LevelUpCalc.jsx"));

function App() {
  return (
    <Router>
      <Navbar />
      <div className='pt-20'>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/' element={<HelloWorld />} />
            <Route path='/construction-planner' element={<ConstructionPage />} />
            {/* <Route path='/level-up-calc' element={<LevelUpCalc />} /> */}
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
