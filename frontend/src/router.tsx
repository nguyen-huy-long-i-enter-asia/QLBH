import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ProductListPage from "pages/ProductListPage";
import LoginPage from "pages/LoginPage";
import axios from "axios";
import Cookies from "js-cookie";
import ReceiptFormPage from "pages/Receipts/ReceiptFormPage";
import ReceiptListPage from "pages/Receipts/ReceiptListPage";
import OrderListPage from "pages/Orders/OrderListPage";
import ManagerAuth from "components/auth/ManagerAuth";
import StaffAuth from "components/auth/StaffAuth";
import CustomerAuth from "components/auth/CustomerAuth";

export const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <ManagerAuth path="/products">
        <ProductListPage />
      </ManagerAuth>

      <StaffAuth path="/receipts/add">
        <ReceiptFormPage />
      </StaffAuth>
      <StaffAuth path="/receipts/update/:id">
        <ReceiptFormPage />
      </StaffAuth>

      <StaffAuth path="/receipts">
        <ReceiptListPage />
      </StaffAuth>
      <StaffAuth path="/orders">
        <OrderListPage />
      </StaffAuth>
    </Switch>
  );
};
