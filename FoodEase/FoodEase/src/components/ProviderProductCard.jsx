import React from "react";

import "../styles/product-card.css";

import { Link } from "react-router-dom";

import { ImageContainer } from "../constants/ImageContainer";

export const ProviderProductCard = ({ item, deleteProduct }) => {
  //   let { id, title, image01, price, providerName, providerEmail } = props.item;
  //   props.item[("abc", "abc", "abc", "abc", "abc")];
  let { image01, description, price, id, title, category } = item;

  image01 =
    image01 !== undefined && image01 !== null && image01 !== ""
      ? ImageContainer.find((obj) => {
          return obj[1] === image01;
        })
      : ImageContainer.find((obj) => {
          return obj[1] === "defaultImg";
        });

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={image01[0]} alt="product-img" className="w-50" />
      </div>

      <div className="product__content" style={{ padding: "0px" }}>
        <h5>{title}</h5>

        <p>
          <b>Description :</b> {description}
        </p>

        <p>
          <b>Price :</b> {price}
        </p>
        <p>
          <b>Category :</b> {category}
        </p>

        <div className=" d-flex align-items-center justify-content-between ">
          {/* <span className="product__price">₹{totalPrice} </span>
          &nbsp;&nbsp;&nbsp; */}
          {/* <p>
            <b>Status :</b> {providerName}
          </p> */}
          <div className="hero__btns d-flex align-items-center gap-5 mt-4">
            <button className="order__btn d-flex align-items-center justify-content-between">
              <Link to="/add-products" state={{ item: item }}>
                {" "}
                Edit<i class="ri-arrow-right-s-line"></i>{" "}
              </Link>
            </button>

            <button
              className="all__foods-btn"
              onClick={() => deleteProduct(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
