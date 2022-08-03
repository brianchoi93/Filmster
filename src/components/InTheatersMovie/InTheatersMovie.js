import React from 'react';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../Comment/Comment';
import './InTheatersMovie.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/joy/Card';

function InTheatersMovie() {
  const [ inTheaterMovie, setInTheaterMovie ] = useState([]);
  const [ inTheaterTrailer, setInTheaterTrailer ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const { id } = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const Item = styled(Paper) (({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  useEffect(() => {
    setLoading(true);
    fetch(`https://filmster-backend.herokuapp.com/movies/${id}`)
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
      <Box component="ul" sx={{display: 'flex', gap: 2, flexWrap: 'wrap', p:0, m:0}}>
          <Card>
            <Item>
              <h2>{inTheaterMovie.original_title}</h2>
              <img src={`https://image.tmdb.org/t/p/w300${inTheaterMovie.poster_path}`} alt={inTheaterMovie.original_title} />
              <h3>{inTheaterMovie.overview}</h3>
              <h5>Release Date: {inTheaterMovie.release_date}</h5>
            </Item>
            <Item className="vid-box">
              {inTheaterTrailer.map((e) => {
                if (e.name === "Official Trailer") {
                  return (
                    <div key={e.id} className="player-wrapper">
                      <ReactPlayer className="react-player" width="100%" height="100%" controls={true} url={`https://www.youtube.com/watch?v=${e.key}`}/>
                    </div>
                  )
                }
              })}
            </Item>
            <Item className="comment-card">
              <Comment />
            </Item>
          </Card>
      {loading && 'Loading Movie'}
      {error && error}
      </Box>
    </div>
  );
}

export default InTheatersMovie;