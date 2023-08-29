import { featureData } from "../constants/FeaturedData";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

export function EasyEatServices(typeOfButton) {
  const REDIRECTED_URL_LOGIN = "http://localhost:3000/auth";
  const navigate = useNavigate();
  function logoutHandler() {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      sessionStorage.setItem("isActive", "false");
      Object.keys(sessionStorage).forEach((key) => {
        if (key !== "isActive") {
          sessionStorage.removeItem(key);
        }
      });
      navigate("/home");
      window.location.reload();
    }
  }

  return (
    <>
      <Container>
        <br></br>
        <Row>
          <Col lg="12" className="text-center">
            <h5 className="feature__subtitle mb-4">What we serve</h5>
            <h2 className="feature__title">Just sit back at home</h2>
            <h2 className="feature__title">
              we will <span>take care</span>
            </h2>
          </Col>

          {featureData.map((item, index) => (
            <Col lg="4" md="6" sm="6" key={index} className="mt-5">
              <div className="feature__item text-center px-5 py-3">
                <img
                  src={item.imgUrl}
                  alt="feature-img"
                  className="w-25 mb-3"
                />
                <h5 className=" fw-bold mb-3">{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
        {typeOfButton.typeOfButton === "logout" ? (
          <div className="hero__btns d-flex align-items-center gap-5 mt-4">
            <button
              className="order__btn d-flex align-items-center justify-content-between"
              onClick={logoutHandler}
            >
              Log out <i class="ri-arrow-right-s-line"></i>
            </button>

            <br></br>
            <br></br>
            <br></br>
          </div>
        ) : (
          <div className="hero__btns d-flex align-items-center gap-5 mt-4">
            <a href={REDIRECTED_URL_LOGIN}>
              <button className="order__btn d-flex align-items-center justify-content-between">
                Here is way to get all benefits
                <i class="ri-arrow-right-s-line"></i>
              </button>
            </a>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        )}
      </Container>
    </>
  );
}
