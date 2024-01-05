import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { data } from "../mock";
import { isCalculate } from "../mock";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "../redux/slice/api";

function ModalComp() {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [vat, setVat] = useState("Select Option");
  const [quantity, setQuantity] = useState("");
  const [priceNet, setPriceNet] = useState("");
  const [priceGross, setPriceGross] = useState("");
  const [file, setFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setValidationErrors({});
  };

  const dispatch = useDispatch();
  const datas = useSelector((state) => state.api.data);

  useEffect(() => {
    setPriceNet(isCalculate(quantity, vat));
  }, [quantity, vat]);

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const insertData = async () => {
    const errors = {};

    if (!productName.trim()) {
      errors.productName = "Product Name is required";
    }

    if (vat === "Select Option") {
      errors.vat = "Please select a valid VAT option";
    }

    if (!quantity || isNaN(quantity)) {
      errors.quantity = "Please enter a valid quantity";
    }

    if (!priceNet || isNaN(priceNet)) {
      errors.priceNet = "Please enter a valid Price (Net)";
    }

    if (!priceGross || isNaN(priceGross)) {
      errors.priceGross = "Please enter a valid Price (Gross)";
    }

    if (!file) {
      errors.file = "Please select a file";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const productData = {
      ProductName: productName,
      VAT: vat,
      quantity: quantity,
      PricePerQtyNet: priceNet,
      PricePerQtyGross: priceGross,
      image: file,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/users",
        productData
      );
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      handleClose();
      dispatch(fetchApi());
    }
  };

  return (
    <>
      <Button variant="default" onClick={handleShow} className="addButton">
        <PlusOutlined />
        ADD
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Product Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    onChange={(e) => setProductName(e.target.value)}
                    isInvalid={!!validationErrors.productName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.productName}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Vat
                </Form.Label>
                <Col sm="10">
                  <Form.Select
                    aria-label="Default select example"
                    isInvalid={!!validationErrors.vat}
                    onChange={(e) => setVat(e.target.value)}
                  >
                    <option>Select Option</option>
                    {data.map((item, index) => (
                      <option key={item.id} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.vat}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Quantity
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    isInvalid={!!validationErrors.quantity}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.quantity}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Price (net)
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={
                      isNaN(isCalculate(quantity, vat))
                        ? ""
                        : isCalculate(quantity, vat)
                    }
                    readOnly
                    isInvalid={!!validationErrors.priceNet}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.priceNet}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Price (gross)
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    onChange={(e) => setPriceGross(e.target.value)}
                    isInvalid={!!validationErrors.priceGross}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.priceGross}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Select Image
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="file"
                    onChange={handleChange}
                    isInvalid={!!validationErrors.file}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.file}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Form>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <DeleteOutlined />
            Delete
          </Button>
          <Button variant="primary" onClick={insertData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComp;
