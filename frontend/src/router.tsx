import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ProductListPage from "pages/ProductListPage";
import LoginPage from "pages/LoginPage";
import axios from "axios";
import Cookies from "js-cookie";
import ImportProductPage from "pages/WareHouse/ImportProductPage";

export const Router: React.FC = () => {
  const [isAuth, setIsAuth] = useState(true);
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
        if (result.data.isAuth) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      }
    };
    checkLogged();
  }, []);
  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage isAuth={isAuth} />
      </Route>
      <Route path="/products" exact>
        <ProductListPage isAuth={isAuth} />
      </Route>
      <Route path="/warehouse/add" exact>
        <ImportProductPage isAuth={isAuth} />
      </Route>
      <Route path="/orders" exact />
    </Switch>
  );
};
