import React from "react";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

function ProductListScreen() {
  const {pageNumber} = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.date?.message || err.error);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete Product?")) {
      try {
        await deleteProduct(id);
        toast.success('Product Deleted')
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className=" align-items-center ">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Add New Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={danger}>{error.data.message}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>PDT ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.products.map((pdt) => (
                <tr key={pdt._id}>
                  <td>{pdt._id}</td>
                  <td>
                    <LinkContainer to={`/product/${pdt._id}`}>
                      <a>{pdt.name}</a>
                    </LinkContainer>
                  </td>
                  <td>${pdt.price}</td>
                  <td>{pdt.category}</td>
                  <td>{pdt.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${pdt._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteProduct(pdt._id)}
                    >
                      <FaTrash color="white" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
      <Toaster />
    </>
  );
}

export default ProductListScreen;
