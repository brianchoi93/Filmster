import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home/Home';
import InTheaters from './components/InTheaters/InTheaters';
import ComingSoon from './components/ComingSoon/ComingSoon';
import InTheatersMovie from './components/InTheatersMovie/InTheatersMovie';
import ComingSoonMovie from './components/ComingSoonMovie/ComingSoonMovie';

function App() {

  return (
      <div>
        <header>
          <h1>Filmster</h1>
          <div>
            <Link to ='/'> Home </Link>
            <Link to ='/movies'> In Theaters </Link>
            <Link to ='/upcoming'> Coming Soon </Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/movies' element={<InTheaters/>}/>
            <Route path='/movies/:id' element={<InTheatersMovie/>}/>
            <Route path='/upcoming' element={<ComingSoon/>}/>
            <Route path='/upcoming/:id' element={<ComingSoonMovie/>}/>
          </Routes>
        </main>
      </div>  
  );
}

export default App;
