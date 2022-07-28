import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import Main from './components/main/Main';
import InTheaters from './components/inTheaters/InTheaters';
import ComingSoon from './components/comingSoon/ComingSoon';
import Movie from './components/Movie/Movie';
import ComingSoonMovie from './components/comingSoonMovie/ComingSoonMovie';

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
            <Route path='/' element={<Main/>} />
            <Route path='/movies' element={<InTheaters/>}/>
            <Route path='/movies/:id' element={<Movie/>}/>
            <Route path='/upcoming' element={<ComingSoon/>}/>
            <Route path='/upcoming/:id' element={<ComingSoonMovie/>}/>
          </Routes>
        </main>
      </div>  
  );
}

export default App;
