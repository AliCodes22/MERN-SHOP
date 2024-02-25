import { Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";

const HomePage = () => {
  return (
    <>
      <h1>Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomePage;
