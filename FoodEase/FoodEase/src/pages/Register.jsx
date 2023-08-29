import React, { useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EasyEatServices } from "../components/FoodEaseServices";

import Spinner from "react-bootstrap/Spinner";
import Alert from "../components/utility/Alert";
import { validateEmail } from "../components/utility/validChecks";

const Register = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [warning, setWarning] = useState(false);
  const [role, setRole] = useState();

  useEffect(() => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      setLoggedIn(true);
    }
  }, []);

  const REGISTER_END_POINT = "http://localhost:8080/foodease/add";

  const submitHandler = (e) => {
    e.preventDefault();

    setLoader(true);

    console.log(role);

    let name = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let address = e.target[3].value;
    let description = e.target[4].value;

    if (!validateEmail(email)) {
      setWarning(true);
      setWarningMessage("Please add valid email address");
    } else {
      password = btoa(password);

      const userInfo = { name, email, password, address, role, description };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(userInfo),
      };
      fetch(REGISTER_END_POINT, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            console.log("Done!");

            sessionStorage.setItem("isActive", "true");
            sessionStorage.setItem("userEmail", email);
            sessionStorage.setItem("role", role);
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
    }
    setLoader(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <div disabled={loader}>
          <Helmet title="Signup">
            <CommonSection title="Who are you ?" />
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
            <section>
              <Container>
                <Row>
                  <Col lg="6" md="6" sm="12" className="m-auto text-center">
                    <form className="form mb-5" onSubmit={submitHandler}>
                      <div className="form__group">
                        <input
                          type="text"
                          placeholder="How should I call you"
                          required
                        />
                      </div>
                      <div className="form__group">
                        <input
                          type="email"
                          placeholder="Your Email Address"
                          required
                        />
                      </div>
                      <div className="form__group">
                        <input
                          type="password"
                          minlength="4"
                          placeholder="Have strong Password"
                          required
                        />
                      </div>
                      {role === "Provider" && (
                        <>
                          <div className="form__group">
                            <input placeholder="Your Address" required />
                          </div>
                          <div className="form__group">
                            <input placeholder="About yourself" required />
                          </div>
                        </>
                      )}

                      <div>
                        <input
                          type="radio"
                          value="User"
                          name="User"
                          onClick={(e) => e.target.checked && setRole("User")}
                        />{" "}
                        User &nbsp;&nbsp;
                        <input
                          type="radio"
                          value="Provider"
                          name="User"
                          onClick={(e) =>
                            e.target.checked && setRole("Provider")
                          }
                        />{" "}
                        Provider &nbsp;&nbsp;
                        <br></br>
                        <br></br>
                      </div>
                      <button type="submit" className="addTOCart__btn">
                        Sign Up
                      </button>
                    </form>
                    <Link to="/auth">Already have an account? Login</Link>
                  </Col>
                </Row>
              </Container>
            </section>
          </Helmet>
        </div>
      ) : (
        <Helmet title="Signout">
          <CommonSection title="Would like to sign out ?" />
          <EasyEatServices typeOfButton="logout" />
        </Helmet>
      )}
    </>
  );
};

export default Register;