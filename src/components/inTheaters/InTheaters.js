import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InTheaters.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function InTheaters() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/movies')
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
  
  return (
    <>
      {movies.map((movie) => {
        return (
        <Card key={movie._id} sx ={{maxWidth: 345, margin: "20px"}}>
          <CardMedia
            component="img"
            height="500"
            image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.original_title}
          />
          <CardContent className="link-container">
            <Typography className="link-div" gutterBottom component="div">
              <Link className="more-info" to={`/movies/${movie._id}`}>{movie.original_title}</Link>
            </Typography>
          </CardContent>
        </Card>
        )
      })}
      {loading && 'Loading movies'}
      {error && error}
    </>
  );
}

export default InTheaters;