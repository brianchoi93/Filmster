import axios from "axios";
import { Navigate, useParams } from "react-router-dom";


function DeleteComment(props) {

  const { id } = useParams();

  const handleDelete = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:8000/comments/${id}`
      );
      if (response.status === 204) {
        Navigate(`/comments/${id}`);
      }
    } catch(error) {
      console.log(error, "Somethings not right...")
    }
  };

  return (
    <div>
      <button type='delete' onClick={handleDelete}>Delete Comment</button>
    </div>
  );
}

export default DeleteComment;