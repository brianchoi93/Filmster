import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ComingSoon() {

  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/upcoming')
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
    <>
      {upcoming.map((movie) => {
        return (
        <Card key={movie._id} sx ={{maxWidth: 345, margin: "20px"}}>
          <CardMedia
            component="img"
            height="500"
            image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.original_title}
          />
          <CardContent>
            <Typography gutterBottom component="div">
              {movie.original_title}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/upcoming/${movie._id}`}> More Info </Link>
          </CardActions>
        </Card>
        )
      })}
      {loading && 'Loading movies'}
      {error && error}
    </>
  );
}

export default ComingSoon;