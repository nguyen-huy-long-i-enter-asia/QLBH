import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductListPage from "pages/ProductListPage";
import LoginPage from "pages/LoginPage";
import axios from "axios";
import Cookies from "js-cookie";
import { SemanticClassificationFormat } from "typescript";

type Props = {
  path: string;
  children: React.ReactNode;
};
const ManagerAuth: React.FC<Props> = ({ path, children }) => {
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const position = Cookies.get("position");
  useEffect(() => {
    const checkLogged = async () => {
      const email = Cookies.get("email");
      if (!email) {
        setIsAuth(false);
        setIsLoading(false);
      } else {
        const result = await axios.post(
          `${process.env.REACT_APP_SERVER}users/auth`,
          email,
          { withCredentials: true }
        );
        if (result.data.isAuth && position === "1") {
          setIsAuth(true);
          setIsLoading(false);
        } else {
          setIsAuth(false);
          setIsLoading(false);
        }
      }
    };
    checkLogged();
  }, []);
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
  sessionStorage.setItem("msg", "Your are not a Manager");
  return <Redirect to="login" />;
};

export default ManagerAuth;
