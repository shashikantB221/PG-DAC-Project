import React, { useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { getRole } from "../components/utility/FoodEaseHelper";
import { useEffect, useState } from "react";
import { EasyEatServices } from "../components/FoodEaseServices";

import { useNavigate } from "react-router-dom";
import Alert from "../components/utility/Alert";
import "../styles/disabled-div.css";

import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const LOGIN_END_POINT = "http://localhost:8080/foodease/login";
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {}, []);

  const submitHandler = (e) => {
    setLoader(true);

    e.preventDefault();

    console.log(loader);
    let email = e.target[0].value;
    let password = e.target[1].value;

    let role = getRole(
      e.target[2].checked,
      e.target[3].checked,
      e.target[4].checked
    );

    password = btoa(password);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    fetch(
      LOGIN_END_POINT +
        "?email=" +
        email +
        "&password=" +
        password +
        "&role=" +
        role,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("Done!");
          response.json().then((result) => {
            sessionStorage.setItem("userEmail", result.email);
            sessionStorage.setItem("role", role);
          });
          setWarning(false);
          sessionStorage.setItem("isActive", "true");

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
        console.log(error);
        setWarning(true);
        setWarningMessage(
          "Something went wrong please contact your primary admin"
        );
      });

    setLoader(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <div disabled={loader}>
          <Helmet title="Login">
            <CommonSection title="May I know your identity !" />

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

            <div style={{ paddingTop: "30px" }}>
              <Container>
                <Row>
                  <Col lg="6" md="6" sm="12" className="m-auto text-center">
                    <form className="form mb-5" onSubmit={submitHandler}>
                      <div className="form__group">
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          ref={loginNameRef}
                        />
                      </div>
                      <div className="form__group">
                        <input
                          type="password"
                          placeholder="Password"
                          required
                          ref={loginPasswordRef}
                        />
                      </div>
                      <div>
                        <input type="radio" value="User" name="User" /> User
                        &nbsp;&nbsp;
                        <input type="radio" value="Provider" name="User" />{" "}
                        Provider &nbsp;&nbsp;
                        <input type="radio" value="Admin" name="User" /> Admin
                        &nbsp;&nbsp;
                        <br></br>
                        <br></br>
                      </div>
                      <button type="submit" className="addTOCart__btn">
                        Login
                      </button>
                    </form>
                    <Link to="/register">
                      Don't have an account? Create an account
                    </Link>
                  </Col>
                </Row>
              </Container>
            </div>
          </Helmet>
        </div>
      ) : (
        <Helmet title="Logout">
          {" "}
          <CommonSection title="Would like to sign out ?" />
          <EasyEatServices typeOfButton="logout" />
        </Helmet>
      )}
    </>
  );
};

export default Login;
