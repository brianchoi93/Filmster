import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Comment() {
  const [ getComment, setGetComment ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/movies/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setGetComment(json.comments);
        setLoading(false);
      })
      .catch((err) => {
        setError(err, 'something went wrong')
      })
  }, [id])

  const [comment, setComment] = useState({
    title: '',
    body: '',
  });

  const handleChange = (event) => {
    setComment({...comment, [event.target.id]: event.target.value});
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/comments', {...comment, movieId: `${id}`});
      console.log(response);
      if (response.status === 200) {
        navigate('/');
      }
    } catch(error) {
      console.log(error, "Somethings not right.");
    }
  }

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
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment">Comment</label>
          <input
            onChange={handleChange}
            id='title'
            value={comment.title}
            placeholder='Title'
            required
          />
          <input
            onChange={handleChange}
            id='body'
            value={comment.body}
            placeholder='Message'
            required
          />
          <button type='submit'>Submit Comment</button>
        </form>
      {loading && 'Loading Comments'}
      {error && error}
    </div>
  );
}

export default Comment;