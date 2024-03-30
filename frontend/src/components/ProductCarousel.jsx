import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetTopProductsQuery } from "../slices/productsSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return (
    <Carousel pause="hover" className="mb-4">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="d-block w-100"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
              <Carousel.Caption className="carousel-caption">
                <h2 className="text-white">{product.name}</h2>
                <p className="text-white">${product.price}</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
};

export default ProductCarousel;
