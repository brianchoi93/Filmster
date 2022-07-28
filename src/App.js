import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import Main from './components/main/Main';
import InTheaters from './components/inTheaters/InTheaters';
import ComingSoon from './components/comingSoon/ComingSoon';
import Movie from './components/Movie/Movie';

function App() {
  return (
    <div>
      <header>
        <h1>Filmster</h1>
        <div>
          <Link to ='/'> Home </Link>
          <Link to ='/intheaters'> In Theaters </Link>
          <Link to ='/comingsoon'> Coming Soon </Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/intheaters' element={<InTheaters/>}/>
          <Route path='/intheaters/:id' element={<Movie/>}/>
          <Route path='/comingsoon' elemnent={<ComingSoon/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
