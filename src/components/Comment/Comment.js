import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Comment.css'
import { ListItem, Sheet, Container } from '@mui/joy';



function Comment() {
  const [ getComment, setGetComment ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const {id} = useParams();
  
  useEffect(() => {
    setLoading(true);
    fetch(`https://filmster-backend.herokuapp.com/movies/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setGetComment(json.comments);
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
        </ListItem>
          )
        })}
      </Container>
      {loading && 'Loading Comments'}
      {error && error}  
    </Sheet>
  );
}

export default Comment;