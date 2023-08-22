import { useRef, useState, useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import LikeAndComment from "../LikeAndComment/LikeAndComment";
import appearanceContext from "../../utils/Context";
import axios from "axios";
import "./CommentViewCSS.css";

const CommentView = ({
  postInfo,
  liked,
  likes,
  user,
  comments,
  setComments,
  setCommentView,
  setMenu,
}) => {
  const commentView = useRef();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { appearance } = useContext(appearanceContext);
  const navigate = useNavigate();

  return (
    <div
      className="comment-container"
      ref={commentView}
      onClick={(e) => {
        if (e.target === commentView.current) {
          setCommentView(false);
        }
      }}
    >
      <div
        className={
          !appearance
            ? "comment-view animate__animated animate__zoomIn animate__faster"
            : "comment-view dark animate__animated animate__zoomIn animate__faster"
        }
      >
        <div className="comment-img-section">
          <img src={postInfo.imgURL} alt="post-img" />
        </div>
        <div className="comment-comment-section">
          <div className="header-section user">
            {postInfo.user}{" "}
            <BsThreeDots
              onClick={() => {
                setMenu(true);
              }}
            />{" "}
          </div>
          <div className="comments">
            <div className="post-description comment">
              <span className="post-id">{postInfo.user}</span>{" "}
              <span>{postInfo.description}</span>
            </div>{" "}
            {comments.comments.map((comment, i) => (
              <div className="comment" key={i + comment.comment}>
                <span className="post-id">{comment.user}</span>{" "}
                {comment.comment}
              </div>
            ))}
          </div>
          <div className="comment-like-container">
            <div className="like-comment-description-section">
              <LikeAndComment
                postId={postInfo._id}
                liked={liked}
                likes={likes}
                user={user.user}
              />
            </div>
            <form
              className="new-comment"
              onSubmit={
                !isLoading ?
                (async (e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  if (user.user === null) {
                    return navigate("/login");
                  }
                  setComment("");
                  const token = user.user && (await user.user.getIdToken());
                  const headers = token ? { authtoken: token } : {};
                  const response = await axios.post(
                    `/api/posts/comment/${postInfo._id}`,
                    {
                      user: user.userInfo.user,
                      comment,
                    },
                    { headers }
                  );

                  const newComments = {
                    comments: response.data.comments,
                    commentsCount: response.data.comments.length,
                  };

                  setIsLoading(false);
                  setComments(newComments);
                }) : () => {}
              }
            >
              <button type="submit">POST</button>
              <textarea
                placeholder="Type a Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentView;
