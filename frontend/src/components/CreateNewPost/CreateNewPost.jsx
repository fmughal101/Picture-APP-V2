import { BsThreeDots, BsHeart } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { useState, useRef, useContext } from "react";
import useUser from "../../utils/useUser";
import axios from "axios";
import appearanceContext from "../../utils/Context";
import "./CreateNewPostCSS.css";

const CreateNewPost = ({ post, rerender }) => {
  const [imgURL, setImgURL] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, userInfo } = useUser();
  const { appearance } = useContext(appearanceContext);
  const container = useRef();

  const handlePost = async () => {
    if (imgURL !== "" && description !== "") {
      setIsLoading(true)
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const userName = userInfo.user;
      const response = await axios.post(
        "/api/posts/createNewPost",
        {
          user: userName,
          imgURL,
          description,
        },
        { headers }
      );
      post.setCreatePost(false);
      rerender.setRerender(!rerender.rerender);
    } else {
      setError("Missing Post Content");
      post.setCreatePost(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className={
          !appearance
            ? "menu-container horizontal"
            : "menu-container horizontal dark"
        } >
        <menu>
          <div className="menu-title">Loading...</div>
        </menu>
      </div>
    );
  }

  return (
    <div
      className={
        !appearance
          ? "create-new-post-container"
          : "create-new-post-container dark"
      }
      ref={container}
      onClick={(e) => {
        if (e.target === container.current)
          post.setCreatePost(!post.createPost);
      }}
    >
      {error && (
        <div className="post-error">
          <div>{error}</div>
          <div className="x" onClick={() => setError("")}>
            &#x2715;
          </div>
        </div>
      )}

      <div className="post create">
        <div className="header-section">
          {userInfo.user} <BsThreeDots />{" "}
        </div>
        <div className="create-img-section">
          <input
            type="text"
            placeholder="IMG URL"
            value={imgURL}
            onChange={(e) => setImgURL(e.target.value)}
          />
        </div>
        <div className="like-comment-description-section">
          <div className="like-comment">
            <BsHeart />
            <BiCommentDetail />
          </div>
          <div className="like-counter">0 likes</div>
          <div className="post-description">
            <span className="post-id">rick</span>{" "}
          </div>
          <textarea
            className="create-description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="comment-section">View all 0 comments</div>
          <button className="post-btn" onClick={handlePost}>
            Make New Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPost;
