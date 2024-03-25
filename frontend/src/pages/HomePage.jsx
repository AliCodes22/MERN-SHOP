import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsSlice";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomePage = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });

  return (
    <>
      <ProductCarousel />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Meta />
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
