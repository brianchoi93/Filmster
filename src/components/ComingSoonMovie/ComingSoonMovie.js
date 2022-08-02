import React from 'react';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ComingSoonMovie(props) {
  const [ comingSoonMovie, setComingSoonMovie ] = useState([]);
  const [ comingSoonTrailer, setComingSoonTrailer ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {id} = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY;
  
 useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/upcoming/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setComingSoonMovie(json);
        return fetch(`https://api.themoviedb.org/3/movie/${json.id}/videos?api_key=${API_KEY}&language=en-US`);
      })
      .then((res) => res.json())
      .then((json) => {
        setComingSoonTrailer(json.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err,'Something went wrong!')
      })
  }, [id, comingSoonMovie.id, API_KEY])

  if (loading) {
    return <p>Data is loading...</p>
  }

  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w300${comingSoonMovie.poster_path}`} alt={comingSoonMovie.original_title} />
      <h2>{comingSoonMovie.original_title}</h2>
      <h3>{comingSoonMovie.overview}</h3>
      <h5>Release Date: {comingSoonMovie.release_date}</h5>
      {comingSoonTrailer.map((e) => {
        if (e.name === "Official Trailer") {
          return (
            <div key={e.id}>
              <ReactPlayer controls={true} url={`https://www.youtube.com/watch?v=${e.key}`}/>
            </div>
          )
        }
      })}
      {loading && 'Loading Movie'}
      {error && error}
    </div>
  );
}

export default ComingSoonMovie;
