import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { EasyEatServices } from "../components/FoodEaseServices";
import { Container, Row, Col } from "reactstrap";

import Alert from "../components/utility/Alert";

import {
  ADMIN_PROVIDER_END_POINT,
  ADMIN_DELETE_PROVIDER,
} from "../constants/UrlHelper";
import { AdminCard } from "../components/AdminCard";

export function Admin() {
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      setLoggedIn(true);

      getOrder(ADMIN_PROVIDER_END_POINT);
    }
  }, []);
  function getOrder(url) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log("Done!");

          response.json().then((result) => {
            setProviders(result);
            console.log(result);
          });

          setWarning(false);
        } else {
          setWarning(true);
          setWarningMessage(
            "Something went wrong please contact your primary admin"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setWarning(true);
        setWarningMessage(
          "Something went wrong please contact your primary admin"
        );
      });
  }

  function deleteProvider(email) {
    let deleteProviderRequest = { email };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(deleteProviderRequest),
    };

    fetch(ADMIN_DELETE_PROVIDER, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log("Done!");
          window.location.reload();
          setWarning(false);
        } else {
          setWarning(true);
          setWarningMessage(
            "Something went wrong please contact your primary admin"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setWarning(true);
        setWarningMessage(
          "Something went wrong please contact your primary admin"
        );
      });
  }

  return (
    <Helmet title="Notifications">
      <CommonSection title="Ding Dong !" />

      {isLoggedIn ? (
        <section>
          {warning && (
            <div style={{ padding: "20px" }}>
              <Alert variant="danger" message={warningMessage} />
            </div>
          )}

          <Container>
            {/* <Row>
              <Col lg="3" md="4" sm="6" xs="6" className="mt-5">
                <p style={{ height: "40px" }}>
                  <SwitchSelector
                    onChange={onChange}
                    options={options}
                    initialSelectedIndex={initialSelectedIndex}
                    backgroundColor={"#353b48"}
                    fontColor={"#f5f6fa"}
                  />
                </p>
              </Col>
            </Row> */}
            <Row>
              {providers.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                  <AdminCard item={item} deleteProvider={deleteProvider} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      ) : (
        <EasyEatServices />
      )}
    </Helmet>
  );
}
