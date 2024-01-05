import React from "react";
import { TableComp } from "../components/TableComp";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/style.css";
export const HomePage = () => {
  return (
    <div>
      <h1>Products</h1>
      <TableComp />
    </div>
  );
};
