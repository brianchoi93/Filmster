import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Comment(props) {
  const [ getComment, setGetComment ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/movies/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setGetComment(json.comments);
        console.log(json.comments)
        setLoading(false);
      })
      .catch((err) => {
        setError(err, 'something went wrong')
      })
  }, [id])

  if(loading) {
    return <p>Data is loading...</p>
  }

  return (
    <div>
        {getComment.map((comments) => {
          return (
            <>
              <h3>{comments.title}</h3>
              <p>{comments.body}</p>
              <h4>{comments.createdAt}</h4>
            </>
          )
        })}
      {loading && 'Loading Comments'}
      {error && error}
    </div>
  );
}

export default Comment;