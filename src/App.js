import logo from './logo.svg';
// import './App.css';
import Game from './component/tic-tac-toe';
import Home from './component/final';
import Comp from './component/btn';
import Pvp from './component/Playervsplayer';
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';
function App() {
  return (
    <>
    {/* <div className='body'> */}
      {/* <Router> */}
        <Routes>
          <Route path='/' exact element = {<Home></Home>} />
          <Route path='/vsHuman' exact element = {<Pvp></Pvp>} />
          <Route path='/vsComp' exact element = {<Comp></Comp>} />

        </Routes>
      {/* </Router> */}
    {/* <Game></Game> */}
     {/* <Home></Home> */}
    {/* </div> */}
    </>
  );
}

export default App;
