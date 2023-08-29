import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";
import { EasyEatServices } from "../components/FoodEaseServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "../components/utility/Alert";
import {
  validateNumber,
  validateEmail,
  validateString,
} from "../components/utility/validChecks";

const Checkout = () => {
  const [altName, setAltName] = useState("");
  const [altEmail, setAltEmail] = useState("");
  const [altPhoneNumber, setAltPhoneNumber] = useState("");
  const [altAddress, setAltAddress] = useState("");
  const [altPostalCode, setAltPostalCode] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [subscriptionAmount, setSubscriptionAmount] = useState();
  const [loader, setLoader] = useState(false);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;

  let totalAmount =
    cartTotalAmount + Number(subscriptionAmount) * Number(shippingCost);

  const ORDER_END_POINT = "http://localhost:8080/foodease/save-orders";
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      setLoggedIn(true);
    }
  }, []);

  function prepareProductObject(cartItems) {
    let orderProductDetail = [];

    for (var i = 0; i < cartItems.length; i++) {
      let { title, quantity, price, providerEmail, imgName } = cartItems[i];

      let name = title;
      let obj = {
        name,
        quantity,
        price,
        providerEmail,
        imgName,
      };
      orderProductDetail.push(obj);
    }

    return orderProductDetail;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    let subscription;
    let flag = false;

    if (altPhoneNumber.length !== 10) {
      setWarning(true);
      setWarningMessage("Please add valid phone number");
      flag = true;
    } else if (altPostalCode.length !== 6) {
      setWarning(true);
      setWarningMessage("Please add valid postal code");
      flag = true;
    } else if (!validateEmail(altEmail)) {
      setWarning(true);
      setWarningMessage("Please add valid email address");
      flag = true;
    } else {
      if (e.target[e.target.length - 2].checked) {
        subscription = "Yearly";
        setSubscriptionAmount(300);
      } else if (e.target[e.target.length - 3].checked) {
        subscription = "Monthly";
        setSubscriptionAmount(25);
      } else if (e.target[e.target.length - 4].checked) {
        subscription = "Weekly";
        setSubscriptionAmount(7);
      } else {
        setWarning(true);
        setWarningMessage("Please select subscription");
        flag = true;
      }
    }

    if (!flag) {
      let cartItems = sessionStorage.getItem("cartItems");

      let userEmail = sessionStorage.getItem("userEmail");

      let status = "PENDING";

      let orderProductDetail = prepareProductObject(JSON.parse(cartItems));

      const orderInfo = {
        userEmail,
        altName,
        altEmail,
        altPhoneNumber,
        altAddress,
        altPostalCode,
        instruction,
        status,
        subscription,
        orderProductDetail,
      };

      console.log(orderInfo);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(orderInfo),
      };
      fetch(ORDER_END_POINT, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            console.log("Done!");
            navigate("/home");
          } else {
            response.json().then((error) => {
              setWarning(true);
              setWarningMessage(error.error);
            });
          }
        })

        .catch((error) => {
          console.error("There was an error!", error);
        });
      setLoader(false);
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
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
                <h6 className="mb-4">Shipping Address</h6>
                <form className="checkout__form" onSubmit={submitHandler}>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      onChange={(e) => setAltName(e.target.value)}
                    />
                  </div>

                  <div className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      onChange={(e) => setAltEmail(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      placeholder="Phone number"
                      required
                      onKeyPress={(e) => {
                        validateNumber(e);
                      }}
                      onChange={(e) => setAltPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Complete address"
                      required
                      onChange={(e) => setAltAddress(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      placeholder="Postal code"
                      required
                      onKeyPress={(e) => {
                        validateNumber(e);
                      }}
                      onChange={(e) => setAltPostalCode(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      placeholder="Instructions"
                      required
                      onChange={(e) => setInstruction(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="Weekly"
                      name="Weekly"
                      onChange={(e) =>
                        e.target.checked && setSubscriptionAmount(7)
                      }
                    />{" "}
                    Weekly &nbsp;&nbsp;
                    <input
                      type="radio"
                      value="Monthly"
                      name="Weekly"
                      onChange={(e) =>
                        e.target.checked && setSubscriptionAmount(25)
                      }
                    />{" "}
                    Monthly &nbsp;&nbsp;
                    <input
                      type="radio"
                      value="Yearly"
                      name="Weekly"
                      onChange={(e) =>
                        e.target.checked && setSubscriptionAmount(300)
                      }
                    />{" "}
                    Yearly &nbsp;&nbsp;
                    <br></br>
                    <br></br>
                  </div>
                  <button type="submit" className="addTOCart__btn">
                    Payment
                  </button>
                </form>
              </Col>

              <Col lg="4" md="6">
                <div className="checkout__bill">
                  <h6 className="d-flex align-items-center justify-content-between mb-3">
                    Subtotal: <span>₹{cartTotalAmount}</span>
                  </h6>
                  <h6 className="d-flex align-items-center justify-content-between mb-3">
                    Subscription: <span>X ₹{subscriptionAmount}</span>
                  </h6>
                  <h6 className="d-flex align-items-center justify-content-between mb-3">
                    Shipping: <span>₹{shippingCost}</span>
                  </h6>
                  <div className="checkout__total">
                    <h5 className="d-flex align-items-center justify-content-between">
                      Total: <span>₹{totalAmount}</span>
                    </h5>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <EasyEatServices />
      )}
    </Helmet>
  );
};

export default Checkout;
