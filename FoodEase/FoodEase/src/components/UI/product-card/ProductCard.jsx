import React from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";
import { ImageContainer } from "../../../constants/ImageContainer";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  let { id, title, image01, price, providerName, providerEmail } = props.item;
  let imgg =
    image01 !== undefined && image01 !== null && image01 !== ""
      ? ImageContainer.find((obj) => {
          return obj[1] === image01;
        })
      : ImageContainer.find((obj) => {
          return obj[1] === "defaultImg";
        });
  const dispatch = useDispatch();

  const addToCart = () => {
    let image01 = imgg[0];
    let imgName = imgg[1];
    dispatch(
      cartActions.addItem({
        id,
        title,
        image01,
        price,
        providerName,
        providerEmail,
        imgName,
      })
    );
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={imgg[0]} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`} state={{ item: props.item }}>
            {title}
          </Link>
        </h5>
        <p>Provider: {providerName}</p>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">₹{price} </span>&nbsp;
          <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
