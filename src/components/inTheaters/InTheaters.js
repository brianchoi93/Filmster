import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function InTheaters() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/api/movies')
      .then((res) => res.json())
      .then((json)=>{
        setMovies(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error")
        setError('Something went wrong! Please try again.');
      })
  }, []);

  if (loading) {
    return <p>Data is loading...</p>
  }
  
  console.log(movies)
  return (
    <div>
      {movies.map((movie) => {
        return (
          <div key={movie._id}>
            <Link 
            to={`/api/movies/${movie._id}`}>
              <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.original_title} />
              <h3>{movie.original_title}</h3>
            </Link>
          </div>
        )
      })}
      {loading && 'Loading movies'}
      {error && error}
    </div>
  );
}

export default InTheaters;