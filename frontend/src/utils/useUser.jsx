import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);

      const getUserInfo = async () => {
        const token = user && (await user.getIdToken())
        const headers = token ? { authtoken: token } : {};
        const response = axios
          .get(`/api/users/userInfo`, { headers })
          .then((data) => {
            setUserInfo(data.data);
          });
      } 
      getUserInfo()
      setIsLoading(false);
    });

    return unsubcribe;
  }, []);

  return { user, userInfo, isLoading };
};

export default useUser;
