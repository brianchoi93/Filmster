import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Comment.css'
import { Box, Button, FormLabel, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


function CommentForm() {
  const {id} = useParams();
  const navigate = useNavigate();


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

  return (
    <Box sx={{
      width: '100%',
      height: 400,
      maxWidth: 380,
      bgcolor: "background.paper"}}
    >
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
        >
          Submit Comment
        </Button>
      </form>
    </Box>
  );
}

export default CommentForm;