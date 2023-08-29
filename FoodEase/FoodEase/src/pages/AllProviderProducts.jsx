import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { EasyEatServices } from "../components/FoodEaseServices";
import { Container, Row, Col } from "reactstrap";

import Alert from "../components/utility/Alert";
import {
  PROVIDERS_PRODUCT,
  PROVIDER_DELETE_PRODUCT,
} from "../constants/UrlHelper";

import { ProviderProductCard } from "../components/ProviderProductCard";

export function AllProviderProducts() {
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      setLoggedIn(true);

      getOrder(
        PROVIDERS_PRODUCT +
          "?providerEmail=" +
          sessionStorage.getItem("userEmail")
      );
    }
  }, [status]);

  function deleteProduct(id) {
    let providerProductDelete = { id };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(providerProductDelete),
    };

    fetch(PROVIDER_DELETE_PRODUCT, requestOptions)
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
          if (!url.includes("?id=")) {
            response.json().then((result) => {
              setOrders(result);
              console.log(result);
            });
          } else {
            window.location.reload();
          }
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
            <Row>
              {orders.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                  <ProviderProductCard
                    item={item}
                    deleteProduct={deleteProduct}
                  />
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
