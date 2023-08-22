import { useState, useCallback, useRef, useContext } from "react";
import appearanceContext from "../../utils/Context";
import axios from "axios";
import "animate.css";
import "./MenuCSS.css";

const Menu = ({
  setMenu,
  postID,
  user,
  setDescription,
  setError,
  rerender,
}) => {
  const menu = useRef();
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [deletePost, setDeletePost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { appearance } = useContext(appearanceContext);

  const handleEdit = useCallback(async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    try {
      setIsLoading(true);
      const response = await axios.put(
        `/api/posts/editPost/${postID}`,
        {
          newDescription: editValue,
        },
        { headers }
      );

      setMenu(false);
      setDescription(response.data.description);
    } catch (err) {
      setMenu(false);
      setError(err.response.data.status);
    }
  }, [user, postID, editValue, setMenu, setError, setDescription]);

  const handleDelete = useCallback(async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/posts/deletePost/${postID}`, {
        headers,
      });

      setMenu(false);
      rerender.setRerender(!rerender.rerender);
    } catch (err) {
      setMenu(false);
      setError(err.response.data.status);
    }
  }, [user, postID, setMenu, setError, rerender]);

  if (isLoading) {
    return (
      <div
        className={
          !appearance
            ? "menu-container horizontal"
            : "menu-container horizontal dark"
        }
      >
        <menu>
          <div className="menu-title">Loading...</div>
        </menu>
      </div>
    );
  }

  if (edit) {
    return (
      <div
        className={
          !appearance
            ? "menu-container horizontal"
            : "menu-container horizontal dark"
        }
        ref={menu}
        onClick={(e) => {
          if (e.target === menu.current) {
            setMenu(false);
            rerender.setRerender(!rerender.rerender);
          }
        }}
      >
        <menu>
          <div className="menu-title">
            What would you like to change the description too?
          </div>
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            cols="30"
          />
          <div className="horizontal">
            <div className="menu-item red" onClick={() => setMenu(false)}>
              Cancel
            </div>
            <div className="menu-item" onClick={handleEdit}>
              Edit
            </div>
          </div>
        </menu>
      </div>
    );
  }

  if (deletePost) {
    return (
      <div
        className={
          !appearance
            ? "menu-container horizontal"
            : "menu-container horizontal dark"
        }
        ref={menu}
        onClick={(e) => {
          if (e.target === menu.current) {
            setMenu(false);
          }
        }}
      >
        <menu>
          <div className="menu-title">
            Are you sure you want to delete this post?
          </div>
          <div className="horizontal">
            <div className="menu-item" onClick={() => setMenu(false)}>
              Cancel
            </div>
            <div className="menu-item red" onClick={handleDelete}>
              Delete
            </div>
          </div>
        </menu>
      </div>
    );
  }

  return (
    <div
      className={!appearance ? "menu-container" : "menu-container dark"}
      ref={menu}
      onClick={(e) => {
        if (e.target === menu.current) {
          setMenu(false);
        }
      }}
    >
      <menu className="animate__animated animate__zoomIn animate__faster">
        <div className="menu-item" onClick={() => setEdit(true)}>
          Edit Post
        </div>
        <div className="menu-item red" onClick={() => setDeletePost(true)}>
          Delete Post
        </div>
      </menu>
    </div>
  );
};

export default Menu;
