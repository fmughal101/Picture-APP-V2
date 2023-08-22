import { BsHeartFill, BsHeart } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'animate.css';

const LikeAndComment = ({ postId, liked, likes, user, comments }) => {
  const navigate = useNavigate();

  const handleLike = useCallback(async () => {
    if (user === null) {
      return navigate("/login");
    }
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(`/api/posts/likeUnlike/${postId}`, null, {
      headers,
    });
    likes.setLikes(response.data.length);
    liked.setLiked(!liked.liked);
  }, [user, liked, likes, postId, navigate]);

  return (
    <>
      <div className="like-comment">
        {!liked.liked ? (
          <BsHeart className="animate__animated animate__bounceIn" onClick={handleLike} />
        ) : (
          <BsHeartFill
            className="animate__animated animate__bounceIn"
            onClick={handleLike}
            style={{ color: "rgb(245, 65, 65)"}}
          />
        )}
        <BiCommentDetail
          onClick={() => comments.setCommentView(!comments.commentView)}
        />
      </div>
      <div className="like-counter">{likes.likes} likes</div>
    </>
  );
};

export default LikeAndComment;
