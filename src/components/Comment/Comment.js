import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Comment.css'
import Box from '@mui/material/Box';
import { Button, FormLabel, TextField } from '@mui/material';
import { ListItem, Sheet, Container } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


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
        // console.log(json.comments)
        setLoading(false);
      })
      .catch((err) => {
        setError(err, 'something went wrong')
      })
  }, [id])
  // console.log('this is the getComment ===>', getComment)

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
        navigate(`/movies`);
      }
    } catch(error) {
      console.log(error, "Somethings not right.");
    }
  }

  const handleDelete = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:8000/comments`);
      console.log(response);
      if (response.status === 204) {
        navigate(`/`);
      }
    } catch(error) {
      console.log(error, "Somethings not right...")
    }
  };

  if(loading) {
    return <p>Data is loading...</p>
  }

  return (
    <Box sx={{
      width: '100%',
      height: 400,
      maxWidth: 380,
      bgcolor: "background.paper"}}
    >
      <Sheet
        sx={{
          width: 'auto',
          maxHeight: 400,
          overflow: 'auto',
        }}
      >
        <Container className="comment-container">
          {getComment.map((comments) => {
            return(
          <ListItem key={comments._id} component="div" className="list-container">
            <h4>{comments.title}</h4>
            <p>{comments.body}</p>
            <h6>Posted On: {comments.createdAt}</h6>
            <Button className="delete-btn" variant="outlined" startIcon={<DeleteIcon/>} type='delete' onClick={handleDelete}> Delete</Button>
          </ListItem>
            )
          })}
        </Container>
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
        <Button 
          className="submit-btn"
          variant="contained" 
          endIcon={<SendIcon/>} 
          type='submit' 
          onClick={() => {alert('Success!')}}
        >
          Submit Comment
        </Button>
      </form>
      {loading && 'Loading Comments'}
      {error && error}  
    </Box>
  );
}

export default Comment;