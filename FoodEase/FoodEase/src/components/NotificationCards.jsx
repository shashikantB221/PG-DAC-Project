import React from "react";

import "../styles/product-card.css";

import { PROVIDER_UPDATE_FLAG_END_POINT } from "../constants/UrlHelper";
import { ImageContainer } from "../constants/ImageContainer";

export const NotificationCards = ({ item, getOrder }) => {
  let {
    productName,
    providerName,
    subscription,
    quantity,
    price,
    status,
    userName,
    userAddress,
    userPhone,
    id,
    image01,
  } = item;
  let img =
    image01 !== undefined && image01 !== null && image01 !== ""
      ? ImageContainer.find((obj) => {
          return obj[1] === image01;
        })
      : ImageContainer.find((obj) => {
          return obj[1] === "defaultImg";
        });
  let totalPrice =
    Number(price) *
    Number(quantity) *
    Number(getSubscriptionDays(subscription));

  function getSubscriptionDays(subscription) {
    if (subscription === "Weekly") return 7;
    else if (subscription === "Monthly") return 25;
    else return 300;
  }

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={img[0]} alt="product-img" className="w-50" />
      </div>

      <div className="product__content" style={{ padding: "0px" }}>
        <h5>{productName}</h5>

        {sessionStorage.getItem("role") === "User" && (
          <p>
            <b>Provider :</b> {providerName}
          </p>
        )}
        {sessionStorage.getItem("role") === "Provider" && (
          <>
            <p>
              <b>User Name :</b> {userName}
            </p>
            <p>
              <b>User Address :</b> {userAddress}
            </p>
            <p>
              <b>Phone Number :</b> {userPhone}
            </p>
          </>
        )}
        <p>
          <b>Subscription :</b> {subscription}
        </p>
        <p>
          <b>Quantity :</b> {quantity}
        </p>
        <p>
          <b>Price :</b> {price}
        </p>

        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">₹{totalPrice} </span>
          &nbsp;&nbsp;&nbsp;
          <div className="hero__btns d-flex align-items-center gap-5 mt-4">
            {sessionStorage.getItem("role") === "User" && (
              <button
                className="order__btn d-flex align-items-center justify-content-between"
                disabled={true}
              >
                {status} <i class="ri-arrow-right-s-line"></i>
              </button>
            )}
            {sessionStorage.getItem("role") === "Provider" &&
              status === "PENDING" && (
                <button
                  className="order__btn d-flex align-items-center justify-content-between"
                  onClick={() =>
                    getOrder(PROVIDER_UPDATE_FLAG_END_POINT + "?id=" + id)
                  }
                >
                  Accept <i class="ri-arrow-right-s-line"></i>
                </button>
              )}
            {sessionStorage.getItem("role") === "Provider" &&
              status === "CLOSED" && (
                <button
                  className="order__btn d-flex align-items-center justify-content-between"
                  disabled={true}
                >
                  {status} <i class="ri-arrow-right-s-line"></i>
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
