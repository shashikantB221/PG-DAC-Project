import React, { useRef, useEffect, useState } from "react";

import { Container } from "reactstrap";
import logo from "../../assets/images/logo.jpg";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";

import "../../styles/header.css";
let nav__links = [];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const [role, setRole] = useState();

  if (role === "Provider") {
    nav__links = [
      {
        display: "Home",
        path: "/home",
      },
      {
        display: "Products",
        path: "/provider-products",
      },
      {
        display: "Alerts",
        path: "/notifications",
      },
      {
        display: "Contact Us",
        path: "/contact",
      },
    ];
  } else if (role === "Admin") {
    nav__links = [
      {
        display: "Home",
        path: "/home",
      },
      {
        display: "Providers",
        path: "/admin-provider",
      },

      {
        display: "Contact Us",
        path: "/contact",
      },
    ];
  } else {
    nav__links = [
      {
        display: "Home",
        path: "/home",
      },
      {
        display: "Meals",
        path: "/foods",
      },
      {
        display: "Cart",
        path: "/cart",
      },
      {
        display: "Contact Us",
        path: "/contact",
      },
    ];
  }

  const toggleCart = () => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      dispatch(cartUiActions.toggle());
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("role") !== null) {
      setRole(sessionStorage.getItem("role"));
    }
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <img src={logo} alt="logo" />
            {/* <h5>Food Ease</h5> */}
            <h5> </h5>
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="nav__right d-flex align-items-center gap-4">
            {role === "User" && (
              <>
                <span className="user">
                  <Link to="/notifications">
                    <i class="ri-notification-3-fill"></i>
                  </Link>
                </span>

                <span className="cart__icon" onClick={toggleCart}>
                  <i class="ri-shopping-basket-line"></i>
                  <span className="cart__badge">{totalQuantity}</span>
                </span>
              </>
            )}

            {role === "Provider" && (
              <span className="user">
                <Link to="/add-products">
                  <i class="ri-add-circle-fill"></i>
                </Link>
              </span>
            )}

            <span className="user">
              <Link to="/auth">
                <i class="ri-user-line"></i>
              </Link>
            </span>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
