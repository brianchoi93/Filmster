import React from 'react';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../Comment/Comment';

function InTheatersMovie() {
  const [ inTheaterMovie, setInTheaterMovie ] = useState([]);
  const [ inTheaterTrailer, setInTheaterTrailer ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {id} = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY;
  
 useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/movies/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setInTheaterMovie(json);
        return fetch(`https://api.themoviedb.org/3/movie/${json.id}/videos?api_key=${API_KEY}&language=en-US`);
      })
      .then((res) => res.json())
      .then((json) => {
        setInTheaterTrailer(json.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err,'Something went wrong!')
      })
  }, [id, inTheaterMovie.id, API_KEY])

  if (loading) {
    return <p>Data is loading...</p>
  }

  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w300${inTheaterMovie.poster_path}`} alt={inTheaterMovie.original_title} />
      <h2>{inTheaterMovie.original_title}</h2>
      <h3>{inTheaterMovie.overview}</h3>
      <h5>Release Date: {inTheaterMovie.release_date}</h5>
      {inTheaterTrailer.map((e) => {
        if (e.name === "Official Trailer") {
          return (
            <div key={e.id}>
              <ReactPlayer controls={true} url={`https://www.youtube.com/watch?v=${e.key}`}/>
            </div>
          )
        }
      })}
      <Comment />
      {loading && 'Loading Movie'}
      {error && error}
    </div>
  );
}

export default InTheatersMovie;