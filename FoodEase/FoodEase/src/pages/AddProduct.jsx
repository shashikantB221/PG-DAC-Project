import React, { useState } from "react";

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "../components/utility/Alert";

import {
  validateString,
  validObjectCheck,
} from "../components/utility/validChecks";
import { productCategory } from "../constants/ProductCategoryHelper";

import Select from "react-select";
import { useLocation } from "react-router-dom";

import { validateNumber } from "../components/utility/validChecks";

import { PROVIDER_ADD_PROD_END_POINT } from "../constants/UrlHelper";
import { EasyEatServices } from "../components/FoodEaseServices";

export function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [placeholder1, setPlaceholder1] = useState("");
  const [placeholder2, setPlaceholder2] = useState("");
  const [placeholder3, setPlaceholder3] = useState("");
  const [id, setId] = useState();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [loader, setLoader] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const indexCat = (val) =>
    productCategory.find((obj) => {
      return obj.value === val;
    });

  useEffect(() => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      setLoggedIn(true);
    }
    if (
      location.state !== undefined &&
      location.state !== null &&
      location.state.item !== null
    ) {
      setInitialValues(location.state.item);
    }
  }, []);

  function setInitialValues(item) {
    setCategory(item.category);
    setDescription(item.description);
    setId(item.id);
    setPrice(item.price);
    setTitle(item.title);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validObjectCheck(category)) {
      setWarning(true);
      setWarningMessage("Please select the category");
    } else if (!validateString(title)) {
      setWarning(true);
      setWarningMessage("Product title can not have number");
    } else {
      let providers = { email: sessionStorage.getItem("userEmail") };
      const products = {
        id,
        category,
        title,
        description,
        placeholder1,
        placeholder2,
        placeholder3,
        price,
        providers,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(products),
      };
      fetch(PROVIDER_ADD_PROD_END_POINT, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            console.log("Done!");
            navigate("/home");
            window.location.reload();
          } else {
            response.json().then((error) => {
              setWarning(true);
              setWarningMessage(error.error);
            });
          }
        })

        .catch((error) => {
          console.error("There was an error!", error);
          setWarning(true);
          setWarningMessage(
            "Something went wrong please contact your primary admin"
          );
        });
      setLoader(false);
    }
  };

  const handleDropDownCategory = (val, setter) => {
    setter(val.value);
  };

  function handleFileChange(e, setter) {
    if (e.target.files) {
      setter(e.target.files[0].name);
    }
  }

  return (
    <>
      <Helmet title="AddItem">
        <CommonSection title="Let's Introduce New Product !" />
        {isLoggedIn ? (
          <section>
            {warning && (
              <div style={{ padding: "20px" }}>
                <Alert variant="danger" message={warningMessage} />
              </div>
            )}
            {loader && (
              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="primary" />
              </div>
            )}
            <Container>
              <Row>
                <Col lg="8" md="6">
                  <h6 className="mb-4">Product Details</h6>
                  <form className="checkout__form" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your  product name"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Container>
                        <Row>
                          <Col
                            lg="6"
                            md="4"
                            sm="6"
                            xs="6"
                            style={{ padding: "0px" }}
                          >
                            <Select
                              options={productCategory}
                              value={indexCat(category)}
                              onChange={(e) =>
                                handleDropDownCategory(e, setCategory)
                              }
                            />
                          </Col>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                        </Row>
                      </Container>
                    </div>
                    <br></br>

                    <div className="form__group">
                      <input
                        placeholder="Enter your product description"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                    </div>
                    <div className="form__group">
                      <input
                        type="number"
                        placeholder="Product price"
                        required
                        onKeyPress={(e) => {
                          validateNumber(e);
                        }}
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                    <br></br>

                    <div>
                      <Row>
                        <Col
                          lg="6"
                          md="4"
                          sm="6"
                          xs="6"
                          className="addTOCart__btn"
                          style={{ width: "40%" }}
                        >
                          <input
                            type="file"
                            onChange={(e) =>
                              handleFileChange(e, setPlaceholder1)
                            }
                          />
                        </Col>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Col
                          lg="6"
                          md="4"
                          sm="6"
                          xs="6"
                          className="addTOCart__btn"
                          style={{ width: "40%" }}
                        >
                          <input
                            type="file"
                            onChange={(e) =>
                              handleFileChange(e, setPlaceholder2)
                            }
                          />
                        </Col>
                        <br></br>
                      </Row>
                      <br></br>
                      <Row>
                        <Col
                          lg="6"
                          md="4"
                          sm="6"
                          xs="6"
                          className="addTOCart__btn"
                          style={{ width: "40%" }}
                        >
                          <input
                            type="file"
                            onChange={(e) =>
                              handleFileChange(e, setPlaceholder3)
                            }
                          />
                        </Col>
                      </Row>
                    </div>
                    <br></br>
                    <button
                      type="submit"
                      className="addTOCart__btn"
                      style={{ background: "#316462" }}
                    >
                      Add Product
                    </button>
                  </form>
                </Col>
              </Row>
            </Container>
          </section>
        ) : (
          <EasyEatServices />
        )}
      </Helmet>
    </>
  );
}
