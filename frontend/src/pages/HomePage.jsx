import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsSlice";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomePage = () => {
  const { number } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ number });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Products</h1>
          <Row>
            {data.products.map((product) => {
              return (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
};

export default HomePage;
