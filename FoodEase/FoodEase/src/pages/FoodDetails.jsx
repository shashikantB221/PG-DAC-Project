import React, { useState, useEffect } from "react";

// import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

import { useLocation } from "react-router-dom";
import { ImageContainer } from "../constants/ImageContainer";

const FoodDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = location.state.item;

  let placeHolder1 =
    product.image01 !== undefined &&
    product.image01 !== null &&
    product.image01 !== ""
      ? ImageContainer.find((obj) => {
          return obj[1] === product.image01;
        })
      : ImageContainer.find((obj) => {
          return obj[1] === "defaultImg";
        });

  let placeHolder2 =
    product.image02 !== undefined &&
    product.image02 !== null &&
    product.image02 !== ""
      ? ImageContainer.find((obj) => {
          return obj[1] === product.image02;
        })
      : ImageContainer.find((obj) => {
          return obj[1] === "defaultImg";
        });
  let placeHolder3 =
    product.image03 !== undefined &&
    product.image03 !== null &&
    product.image03 !== ""
      ? ImageContainer.find((obj) => {
          return obj[1] === product.image03;
        })
      : ImageContainer.find((obj) => {
          return obj[1] === "defaultImg";
        });

  const [previewImg, setPreviewImg] = useState(product.image01);
  const { title, price, category, desc } = product;

  const addItem = () => {
    let image01 = placeHolder1[0];
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
  };

  useEffect(() => {
    setPreviewImg(placeHolder1[0]);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(placeHolder1[0])}
                >
                  <img src={placeHolder1[0]} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(placeHolder2[0])}
                >
                  <img src={placeHolder2[0]} alt="" className="w-50" />
                </div>

                <div
                  className="img__item"
                  onClick={() => setPreviewImg(placeHolder3[0])}
                >
                  <img src={placeHolder3[0]} alt="" className="w-50" />
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  {" "}
                  Price: <span>₹{price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addTOCart__btn">
                  Add to Cart
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6>Description</h6>
              </div>

              <div className="tab__content">
                <p>{desc}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
