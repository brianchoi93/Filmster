import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../InTheaters/InTheaters.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ComingSoon() {

  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://filmster-backend.herokuapp.com/upcoming')
      .then((res) => res.json())
      .then((json)=>{
        setUpcoming(json);
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

  return (
    <div className="movie-container">
      <title>Coming Soon</title>
      {upcoming.map((movie) => {
        return (
        <Card className="poster-card" key={movie._id} sx ={{maxWidth: 345, margin: "20px"}}>
          <CardMedia
            component="poster-img"
            height="500"
            image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.original_title}
          />
          <CardContent className="link-container">
            <Typography className="link-div" gutterBottom component="div">
              <Link className="more-info" to={`/upcoming/${movie._id}`}>{movie.original_title}</Link>
            </Typography>
          </CardContent>
        </Card>
        )
      })}
      {loading && 'Loading movies'}
      {error && error}
    </div>
  );
}

export default ComingSoon;
