import axios from 'axios';
import { useEffect, useState } from 'react';

export default () => {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    const token = localStorage.getItem('accessToken');
    // console.log(token,'token');
    try {
      const res = await axios.get(`${process.env.React_APP_BACKEND_URL}/api/v1/users/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // console.log(res, "sauth");
      return res?.data;
    } catch (err) {
      // console.log(err);
      return false;
    }
  };

  useEffect(() => {
    (
      async () => {
        const data = await verifyAuth();
        setAuth(data);
      }
    )();
  }, []);

  return { auth };
};
