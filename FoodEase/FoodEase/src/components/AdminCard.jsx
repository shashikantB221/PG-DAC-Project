import React from "react";

import "../styles/product-card.css";

import Vendor from "../assets/images/vendor.jpg";

export const AdminCard = ({ item, deleteProvider }) => {
  let { email, name, address, description } = item;

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={Vendor} alt="product-img" className="w-50" />
      </div>

      <div className="product__content" style={{ padding: "0px" }}>
        <h5>{name}</h5>

        <p>
          <b>Email :</b> {email}
        </p>

        <p>
          <b>Description :</b> {description}
        </p>

        <p>
          <b>Address :</b> {address}
        </p>

        <div className=" d-flex align-items-center justify-content-between ">
          <div className="hero__btns d-flex align-items-center gap-5 mt-4">
            <button
              className="all__foods-btn"
              onClick={() => deleteProvider(email)}
            >
              Delete Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
