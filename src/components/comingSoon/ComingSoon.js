import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      {upcoming.map((a) => {
        return(
          <div key={a._id}>
            <Link
            to={`/upcoming/${a._id}`}>
              <img src={`https://image.tmdb.org/t/p/w300${a.poster_path}`} alt={a.original_title} />
              <h3>{a.original_title}</h3>
            </Link>
          </div>
        )
      })}
      {loading && 'Loading Movie'}
      {error && error}
    </div>
  );
}

export default ComingSoon;