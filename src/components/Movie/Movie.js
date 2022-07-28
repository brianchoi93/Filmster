import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useContext } from 'react';
// import { DataContext } from '../../dataContext';

function Movie() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/movies/${id}`)
      .then((res) => res.json())
      .then((json)=>{
        setMovie(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error")
        setError('Something went wrong! Please try again.');
      })
  }, [id]);

  if (loading) {
    return <p>Data is loading...</p>
  }
  
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.original_title} />
      <h2>{movie.original_title}</h2>
      <h3>{movie.overview}</h3>
      <h5>Release Date: {movie.release_date}</h5>

      {loading && 'Loading Movie!'}
      {error && error}

    </div>
  );
}

export default Movie;