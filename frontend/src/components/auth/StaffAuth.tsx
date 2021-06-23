import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductListPage from "pages/ProductListPage";
import LoginPage from "pages/LoginPage";
import axios from "axios";
import Cookies from "js-cookie";

type Props = {
  path: string;
  children: React.ReactNode;
};
const StaffAuth: React.FC<Props> = ({ path, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const position = Cookies.get("position");
  useEffect(() => {
    const checkLogged = async () => {
      const email = Cookies.get("email");

      if (!email) {
        setIsAuth(false);
        setIsLoading(false);
      } else {
        const formData = new FormData();
        formData.append("email", email);
        const result = await axios.post(
          `${process.env.REACT_APP_SERVER}users/auth`,
          formData,
          {
            withCredentials: true,
          }
        );

        if (result.data.isAuth && (position === "2" || position === "1")) {
          console.log("Auth true");
          setIsAuth(true);
          setIsLoading(false);
        } else {
          console.log("Auth false");
          setIsAuth(false);
          setIsLoading(false);
        }
      }
    };
    checkLogged();
  }, []);
  // const checkAuth = async () => {
  //   const position = Cookies.get("position");
  //   const email = Cookies.get("email");
  //   if (!email) {
  //     return false;
  //   }
  //   const formData = new FormData();
  //   formData.append("email", email);
  //   const result = await axios.post(
  //     `${process.env.REACT_APP_SERVER}users/auth`,
  //     formData,
  //     {
  //       withCredentials: true,
  //     }
  //   );

  //   if (result.data.isAuth && (position === "2" || position === "1")) {
  //     return true;
  //   }
  //   return false;
  // };
  // checkAuth().then((result) => {
  //   if (result === true) {
  //     return (
  //       <Route path={path} exact>
  //         {children}
  //       </Route>
  //     );
  //   }
  //   sessionStorage.setItem("msg", "Your are not a Staff");
  //   return <Redirect to="/login" />;
  // });
  // const auth = checkAuth();
  if (isLoading) {
    return <></>;
  }
  if (isAuth) {
    return (
      <Route path={path} exact>
        {children}
      </Route>
    );
  }
  sessionStorage.setItem("msg", "Your are not a Staff");
  console.log("xyz");
  return <Redirect to="login" />;
};

export default StaffAuth;
