import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Comment.css'
import Box from '@mui/material/Box';
import { Button, FormLabel, TextField, Typography } from '@mui/material';
import { List, ListItem, Sheet } from '@mui/joy';


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
        navigate(`/movies/${String(id)}`);
      }
    } catch(error) {
      console.log(error, "Somethings not right.");
    }
  }

  if(loading) {
    return <p>Data is loading...</p>
  }

  return (
    <Box sx={{
      width: '100%',
      height: 400,
      maxWidth: 360,
      bgcolor: "background.paper"}}
    >
      <Sheet
        sx={{
          width: 'auto',
          maxHeight: 400,
          overflow: 'auto',
          border: 1,
          borderColor: 'black',
        }}
      >
        <List>
          {getComment.map((comments) => {
            return(
          <ListItem component="div">
            <Typography>
              <>
                <h4>{comments.title}</h4>
                <p>{comments.body}</p>
                <p className='created'>Posted On: {comments.createdAt}</p>
              </>
            </Typography>
          </ListItem>
            )
          })}
        </List>
      </Sheet>
      <form className="form" onSubmit={handleSubmit}>
        <FormLabel className="label" htmlFor="comment">Comment</FormLabel>
        <TextField
          fullWidth
          onChange={handleChange}
          id='title'
          value={comment.title}
          placeholder='Title'
          required
        />
        <TextField
          fullWidth
          onChange={handleChange}
          id='body'
          value={comment.body}
          placeholder='Message'
          required
        />
        <Button type='submit'>Submit Comment</Button>
      </form>
      {loading && 'Loading Comments'}
      {error && error}  
    </Box>
  );
}

export default Comment;