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
const ManagerAuth: React.FC<Props> = ({ path, children }) => {
  const [isAuth, setIsAuth] = useState(true);
  const position = Cookies.get("position");
  useEffect(() => {
    const checkLogged = async () => {
      const email = Cookies.get("email");
      if (!email) {
        setIsAuth(false);
      } else {
        const result = await axios.post(
          `${process.env.REACT_APP_SERVER}users/auth`,
          email
        );
        if (result.data.isAuth && position === "1") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      }
    };
    checkLogged();
  }, []);
  if (isAuth) {
    return (
      <Route path={path} exact>
        {children}
      </Route>
    );
  }
  return <Redirect to="login" />;
};

export default ManagerAuth;
