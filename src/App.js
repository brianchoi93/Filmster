import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import Main from './components/main/Main';

function App() {
  return (
    <div>
      <header>
        <h1>Filmster</h1>
        <ul>
          <li> <Link to ='/'> Home </Link></li>
          <li>In Theaters</li>
          <li>Coming Soon</li>
          {/* <li><Link to ='/'>Home</Link></li> */}
        </ul>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Main/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
