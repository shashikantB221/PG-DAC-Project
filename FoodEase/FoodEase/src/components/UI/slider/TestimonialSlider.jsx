import React from "react";
import Slider from "react-slick";

import ava01 from "../../../assets/images/ava-1.jpg";
import ava02 from "../../../assets/images/ava-2.jpg";
import ava03 from "../../../assets/images/ava-3.jpg";

import "../../../styles/slider.css";

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <p className="review__text">
          "The menu is quite extensive, and very accommodating to food
          sensitivities and preferences. The food was delicious and very
          flavorful!"
        </p>
        <div className=" slider__content d-flex align-items-center gap-3 ">
          <img src={ava01} alt="avatar" className=" rounded" />
          <h6>Bhavesh Chaudhari</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "The food was also superbly delicious!!! Everything we ordered was
          succulent, delicate, delicious - it was like magic in every little
          detail!"
        </p>
        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava02} alt="avatar" className=" rounded" />
          <h6>Alexa</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "A wonderful experience. The ingredients are organic & gluten-free.
          The curry was amazing , service was great.!"
        </p>
        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava03} alt="avatar" className=" rounded" />
          <h6>Shashikant Badgujar</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
