import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import ModalComp from "./ModalComp";
import { Image } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "../redux/slice/api";

export const TableComp = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const datas = useSelector((state) => state.api.data);
  useEffect(() => {
    dispatch(fetchApi());
    setData(datas);
  }, [dispatch]);

  const deleteData = async (item) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/users/${item._id}`
      );
      if (response.data.message === "User deleted successfully") {
        alert("User deleted successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(fetchApi());
    }
  };

  return (
    <>
      <ModalComp className="addButton" />
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price per Qty (Gross)</th>
              <th>VAT</th>
              <th>Price per Qty (net)</th>
              <th>Total Stock</th>
              <th>Product Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {datas?.length !== 0 ? (
              datas?.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{item.ProductName}</td>
                  <td>{item.PricePerQtyGross}</td>
                  <td>{item.VAT}%</td>
                  <td>{item.PricePerQtyNet}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Image width={50} src={item.image} />
                  </td>
                  <td>
                    <div className="action">
                      <EditOutlined
                        style={{ fontSize: "16px", color: "#08c" }}
                      />
                      <DeleteOutlined
                        onClick={() => deleteData(item)}
                        style={{ fontSize: "16px", color: "#FF0000" }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <img
                    width={300}
                    height={300}
                    src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-488.jpg"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
