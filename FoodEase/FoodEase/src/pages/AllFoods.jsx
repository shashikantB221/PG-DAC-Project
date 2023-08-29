import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";

import { EasyEatServices } from "../components/FoodEaseServices";
import { useEffect } from "react";
import { PRODUCT_END_POINT } from "../constants/UrlHelper";
import AlertBox from "../components/utility/Alert";

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState([]);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState();

  // console.log(sessionStorage.getItem("Products"));

  const searchedProduct = products.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem("isActive") !== null &&
      sessionStorage.getItem("isActive") === "true"
    ) {
      setLoggedIn(true);
    }

    GetProductDetails();
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

  return (
    <Helmet title="All-Foods">
      <CommonSection title="Meet our partners !" />

      {isLoggedIn ? (
        <section>
          {warning && (
            <div style={{ padding: "20px" }}>
              <AlertBox variant="danger" message={warningMessage} />
            </div>
          )}
          <Container>
            <Row>
              <Col lg="6" md="6" sm="6" xs="12">
                <div className="search__widget d-flex align-items-center justify-content-between ">
                  <input
                    type="text"
                    placeholder="I'm looking for...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span>
                    <i class="ri-search-line"></i>
                  </span>
                </div>
              </Col>
              <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                <div className="sorting__widget text-end">
                  <select className="w-50">
                    <option>Default</option>
                  </select>
                </div>
              </Col>

              {displayPage.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                  <ProductCard item={item} />
                </Col>
              ))}

              <div>
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={changePage}
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  containerClassName=" paginationBttns "
                />
              </div>
            </Row>
          </Container>
        </section>
      ) : (
        <EasyEatServices />
      )}
    </Helmet>
  );
};

export default AllFoods;
