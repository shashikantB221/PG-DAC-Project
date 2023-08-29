import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { EasyEatServices } from "../components/FoodEaseServices";
import { Container, Row, Col } from "reactstrap";
import { NotificationCards } from "../components/NotificationCards";
import Alert from "../components/utility/Alert";
import {
  ORDER_END_POINT,
  PROVIDER_ORDER_END_POINT,
} from "../constants/UrlHelper";
import SwitchSelector from "react-switch-selector";

export function Notification() {
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("PENDING");

  const options = [
    {
      label: "Pending",
      value: "PENDING",
      selectedBackgroundColor: "#1c8f89",
      innerHeight: 50,
    },
    {
      label: "Closed",
      value: "CLOSED",
      selectedBackgroundColor: "#1c8f89",
    },
  ];

  const onChange = (newValue) => {
    setStatus(newValue);
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "PENDING"
  );

  useEffect(() => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      setLoggedIn(true);
      if (sessionStorage.getItem("role") === "Provider") {
        getOrder(
          PROVIDER_ORDER_END_POINT +
            "?providerEmail=" +
            sessionStorage.getItem("userEmail") +
            "&status=" +
            status
        );
      } else if (sessionStorage.getItem("role") === "User")
        getOrder(
          ORDER_END_POINT +
            "?userEmail=" +
            sessionStorage.getItem("userEmail") +
            "&status=" +
            status
        );
    }
  }, [status]);
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
            </Row>
            <Row>
              {orders.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                  <NotificationCards item={item} getOrder={getOrder} />
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
