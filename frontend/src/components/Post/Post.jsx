import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import useUser from "../../utils/useUser";
import axios from "axios";
import Menu from "../Menu/Menu";
import CommentView from "../CommentsView/CommentView";
import LikeAndComment from "../LikeAndComment/LikeAndComment";
import "./PostCSS.css";

const Post = ({ postInfo, rerender }) => {
  const [liked, setLiked] = useState(false);
  const [menu, setMenu] = useState(false);
  const [commentView, setCommentView] = useState(false);
  const [likes, setLikes] = useState(postInfo.likedby.length);
  const [comments, setComments] = useState({
    comments: postInfo.comments,
    commentsCount: postInfo.comments.length,
  });
  const [description, setDescription] = useState(postInfo.description);
  const [error, setError] = useState("");
  const { user, userInfo, isLoading } = useUser();

  useEffect(() => {
    const getPostInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/posts/liked/${postInfo._id}`, {
        headers,
      });
      setLiked(response.data.liked);
    };

    if (!isLoading) {
      getPostInfo();
    }
  }, [isLoading, user, postInfo._id]);

  return (
    <>
      {error && (
        <div className="post-error">
          <div>{error}</div>
          <div className="x" onClick={() => setError("")}>
            &#x2715;
          </div>
        </div>
      )}
      {menu && (
        <Menu
          setMenu={setMenu}
          postID={postInfo._id}
          user={user}
          setDescription={setDescription}
          setError={setError}
          rerender={rerender}
        />
      )}

      {commentView && (
        <CommentView
          postInfo={postInfo}
          liked={{ liked, setLiked }}
          likes={{ likes, setLikes }}
          user={{ user, userInfo }}
          comments={comments}
          setComments={setComments}
          setCommentView={setCommentView}
          setMenu={setMenu}
        />
      )}
      <div className="post">
        <div className="header-section">
          {postInfo.user}{" "}
          <BsThreeDots
            onClick={() => {
              setMenu(true);
            }}
          />{" "}
        </div>
        <div className="img-section">
          <img src={postInfo.imgURL} alt="Post Img" />
        </div>
        <div className="like-comment-description-section">
          <LikeAndComment
            postId={postInfo._id}
            liked={{ liked, setLiked }}
            likes={{ likes, setLikes }}
            user={user}
            comments={{ commentView, setCommentView }}
          />
          <div className="post-description">
            <span className="post-id">{postInfo.user}</span>{" "}
            <span>{description}</span>
          </div>
          <div className="comment-section" onClick={() => setCommentView(true)}>
            View all {comments.commentsCount} comments
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
