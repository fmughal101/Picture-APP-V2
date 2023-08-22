import { useState, useEffect } from "react";
import appearanceContext from "../utils/Context";
import Post from "../components/Post/Post";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
import CreateNewPost from "../components/CreateNewPost/CreateNewPost";

const HomePage = () => {
  const [postData, setPostData] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [appearance, setAppearance] = useState(false);
  const [createPost, setCreatePost] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/posts");
      setPostData(response.data);
    };

    getData();
  }, [rerender]);

  return (
    <appearanceContext.Provider value={{ appearance, setAppearance }}>
      {createPost && <CreateNewPost post={{createPost, setCreatePost}} rerender={{rerender, setRerender}}/>}
      
      <NavBar post={setCreatePost}/>
      <div className={!appearance ? "post-container" : "post-container dark"}>
        {postData.map((post) => (
          <Post
            key={post._id}
            postInfo={post}
            rerender={{ rerender, setRerender }}
          />
        ))}
      </div>
    </appearanceContext.Provider>
  );
};

export default HomePage;
