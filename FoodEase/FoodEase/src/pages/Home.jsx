import React, { useState, useEffect } from "react";

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import heroImg from "../assets/images/hero.png";
import "../styles/hero-section.css";

import { Link } from "react-router-dom";

import Category from "../components/UI/category/Category.jsx";

import "../styles/home.css";

import ProductCard from "../components/UI/product-card/ProductCard.jsx";

import whyImg from "../assets/images/location.png";

import networkImg from "../assets/images/network.png";

import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";
import { featureData } from "../constants/FeaturedData.js";
import AlertBox from "../components/utility/Alert.jsx";

import { PRODUCT_END_POINT } from "../constants/UrlHelper.js";

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState();
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      setLoggedIn(true);
      GetProductDetails();
    }

    if (sessionStorage.getItem("role") !== null) {
      setRole(sessionStorage.getItem("role"));
    }
  }, []);

  async function GetProductDetails() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    await fetch(PRODUCT_END_POINT, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log("Done!");
          response.json().then((result) => {
            setAllProducts(result);
            setProducts(result);
          });
          setWarning(false);
          console.log("Test2");
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
  }

  useEffect(() => {
    if (category === "ALL") {
      setAllProducts(products);
    }

    if (category === "DIET") {
      const filteredProducts = products.filter(
        (item) => item.category === "DIET"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "KETO") {
      const filteredProducts = products.filter(
        (item) => item.category === "KETO"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "THALI") {
      const filteredProducts = products.filter(
        (item) => item.category === "THALI"
      );

      setAllProducts(filteredProducts);
    }
  }, [category]);

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              {warning && (
                <div style={{ padding: "20px" }}>
                  <AlertBox variant="danger" message={warningMessage} />
                </div>
              )}
              <div className="hero__content  ">
                <h5 className="mb-3">Easy way to make an order</h5>
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY?</span> Just wait <br /> food at
                  <span> your door</span>
                </h1>

                <p>
                  We serve fresh, nutritious and home-made Indian meals in
                  disposable tiffin packs. If you are a Student or a Working
                  Professional or any Individual, who is looking out for healthy
                  food, then we would love to be your daily meal partner
                </p>

                {isLoggedIn && role === "User" && (
                  <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                    <button className="order__btn d-flex align-items-center justify-content-between">
                      <Link to="/foods">
                        Order now <i class="ri-arrow-right-s-line"></i>
                      </Link>
                    </button>

                    <button className="all__foods-btn">
                      <Link to="/notifications">Order history</Link>
                    </button>
                  </div>
                )}

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-car-line"></i>
                    </span>{" "}
                    Home Cooked Meal
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-shield-check-line"></i>
                    </span>{" "}
                    Affordable Price
                  </p>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What we serve</h5>
              <h2 className="feature__title">Just sit back at home</h2>
              <h2 className="feature__title">
                we will <span>take care</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                We serve fresh, nutritious and home-made Indian meals in
                disposable tiffin packs. If you are a Student or a Working
                Professional or any Individual, who is looking out for healthy
                food, then we would love to be your daily meal partner
              </p>
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
        </Container>
      </section>

      {isLoggedIn && role === "User" && (
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2>Popular Foods</h2>
              </Col>

              <Col lg="12">
                <div className="food__category d-flex align-items-center justify-content-center gap-4">
                  <button
                    className={`all__btn  ${
                      category === "ALL" ? "foodBtnActive" : ""
                    } `}
                    onClick={() => setCategory("ALL")}
                  >
                    <h6> All</h6>
                  </button>
                  <button
                    className={`d-flex align-items-center gap-2 ${
                      category === "DIET" ? "foodBtnActive" : ""
                    } `}
                    onClick={() => setCategory("DIET")}
                  >
                    <h6> Diet Meals</h6>
                  </button>

                  <button
                    className={`d-flex align-items-center gap-2 ${
                      category === "KETO" ? "foodBtnActive" : ""
                    } `}
                    onClick={() => setCategory("KETO")}
                  >
                    <h6>Keto</h6>
                  </button>

                  <button
                    className={`d-flex align-items-center gap-2 ${
                      category === "THALI" ? "foodBtnActive" : ""
                    } `}
                    onClick={() => setCategory("THALI")}
                  >
                    <h6> Thalis's</h6>
                  </button>
                </div>
              </Col>

              {allProducts.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                  <ProductCard item={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>FoodEase?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Our Tiffin box service is designed to deliver our premium
                  quality food to your doorstep in affordable prices. We prepare
                  and deliver healthy meals everyday. Inspired by our Indian
                  roots we have drafted a menu that is a perfect blend of the
                  traditional cooking methods and recipes paired with fresh and
                  local produce. For our monthly plan subscription we never
                  repeat our menu, that means you get different menus for a
                  monthly plan.
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Fresh and tasty
                      foods
                    </p>
                    <p className="choose__us-desc">
                      We use only fresh & locally sourced vegetables and
                      grass-fed protein.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Quality support
                    </p>
                    <p className="choose__us-desc">
                      The best of traditional cooking methods and modern healthy
                      standards.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i>Order from any
                      location{" "}
                    </p>
                    <p className="choose__us-desc">
                      Search Tiffin Service in your area by different filters
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                  Our customers are from diverse backgrounds, ranging from
                  college students to employees of multinational companies. Few
                  of them are shown here.
                </p>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
