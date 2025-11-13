import { Empty, Pagination, Spin } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormatDate, FormatDateTime, FormatPrice } from "../../../Format";
import { useOrder } from "../../../Hook/useOrder";

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;
  // const [search, setSearch] = useState("");
  // const [statusOrder, setstatusOrder] = useState("");
  // const [paymen, setPaymen] = useState("");
  // const [filters, setFilters] = useState({});
  const { data, isLoading } = useOrder(page);
  // const handleOpen = (id) => {
  //   setIdOpen(id);
  //   setStatus(id.status);
  //   setIsOpen(true);
  // };
  const onShowSizeChange = (current) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", current);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const getOrderStatusColor = (status) => {
    const statusMapping = {
      "Xác nhận": "#FFC107",
      "Đang giao hàng": "#2196F3",
      "Thành công": "#2E7D32",
      "Hủy": "#F44336",
    };

    return statusMapping[status] || "#9E9E9E"; // Màu mặc định nếu không tìm thấy
  };
  // const handleFilter = () => {
  //   setFilters({
  //     search,
  //     statusOrder,
  //     paymen,
  //   });
  // };
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card" id="orderList">
          <div className="card-body border border-dashed border-end-0 border-start-0">
            {/* <form>
              <div className="row g-3">
                <div className="col-xxl-5 col-sm-5">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      value={search}
                      placeholder="Search for order ID, customer, order status or something..."
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <i className="ri-search-line search-icon" />
                  </div>
                </div>
                <div className="col-xxl-3 col-sm-2">
                  <div>
                    <select
                      className="form-control"
                      name="choices-single-default"
                      id="idStatus"
                      value={statusOrder}
                      onChange={(e) => setstatusOrder(e.target.value)}
                    >
                      <option value="">Trang thái đơn hàng</option>
                      <option value="" selected="">
                        All
                      </option>
                      <option value="1">Xác nhận</option>
                      <option value="2">Đang Giao Hàng</option>
                      <option value="3">Thành công</option>
                      <option value="3">Hủy</option>
                    </select>
                  </div>
                </div>
           
                <div className="col-xxl-3 col-sm-2">
                  <div>
                    <select
                      className="form-control"
                      id="idPayment"
                      value={paymen}
                      onChange={(e) => setPaymen(e.target.value)}
                    >
                      <option value="">Select Payment</option>
                      <option value="" selected="">
                        All
                      </option>
                      <option value="COD">COD</option>
                      <option value="MOMO">MOMO</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-1 ">
                  <div onClick={handleFilter}>
                    <button
                      type="button"
                      className="py-2 bg-[#5671cc] text-white rounded-md btn-primary w-100"
                    >
                      <i className="ri-equalizer-fill me-2 align-bottom"></i>
                      Filters
                    </button>
                  </div>
                </div>
              </div>
         
            </form> */}
          </div>
          {data?.data.length > 0 ? (
            <div className="card-body pt-0">
              <div>
                <div className="table-responsive table-card mb-1 mt-3">
                  <table
                    className="table table-nowrap align-middle"
                    id="orderTable"
                  >
                    <thead className="text-muted table-light">
                      <tr className="text-uppercase">
                        <th scope="col" style={{ width: 25 }}>
                          <div className="form-check">#</div>
                        </th>
                        <th data-sort="id">Mã đh</th>
                        <th data-sort="customer_name">Tên người mua</th>
                        <th data-sort="date">Thời gian mua</th>
                        <th data-sort="amount">Tổng tiền</th>
                        <th data-sort="payment">
                          Phương thức thanh toán
                        </th>
                        <th data-sort="status">Trạng thái đơn hàng</th>
                        <th data-sort="city"></th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {data?.data.map((order, index) => (
                        <tr key={order._id}>
                          <th scope="row">
                            <div className="form-check">{index + 1}</div>
                          </th>
                          <td className="id">
                            <a
                              href="apps-ecommerce-order-details.html"
                              className="fw-medium link-primary"
                            >
                              {order.madh}
                            </a>
                          </td>
                          <td className="customer_name">
                            {order.customerName}
                          </td>

                          <td className="date">
                            {<FormatDate date={order.createdAt} />}
                            <small className="text-muted">
                              {<FormatDateTime dateString={order.createdAt} />}
                            </small>
                          </td>
                          <td className="amount">
                            {<FormatPrice price={order.totalPrice} />}
                          </td>
                          <td className="payment">
                            {order.payment}
                          </td>
                          <td className="status">
                            <span
                              className={`badge  uppercase px-2 py-1 rounded`}
                              style={{
                                backgroundColor: getOrderStatusColor(
                                  order.status
                                ),
                              }}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li className="list-inline-item" title="View">
                                <Link
                                  to={`/order_detail/${order._id}`}
                                  className="text-primary d-inline-block"
                                >
                                  <i className="ri-eye-fill fs-16" />
                                </Link>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        trigger="loop"
                        colors="primary:#405189,secondary:#0ab39c"
                        style={{ width: 75, height: 75 }}
                      />
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted">
                        We've searched more than 150+ Orders We did not find any
                        orders for you search.
                      </p>
                    </div>
                  </div>
                </div>
                <Pagination
                  showSizeChanger
                  onChange={onShowSizeChange}
                  current={data.current_page}
                  total={data.total}
                  pageSize={data.per_page}
                  align="center"
                />
              </div>
              <div
                className="modal fade"
                id="showModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header bg-light p-3">
                      <h5 className="modal-title" id="exampleModalLabel">
                        &nbsp;
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        id="close-modal"
                      />
                    </div>
                    <form className="tablelist-form" autoComplete="off">
                      <div className="modal-body">
                        <input type="hidden" id="id-field" />
                        <div className="mb-3" id="modal-id">
                          <label htmlFor="orderId" className="form-label">
                            ID
                          </label>
                          <input
                            type="text"
                            id="orderId"
                            className="form-control"
                            placeholder="ID"
                            readOnly=""
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                            Customer Name
                          </label>
                          <input
                            type="text"
                            id="customername-field"
                            className="form-control"
                            placeholder="Enter name"
                            required=""
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="productname-field"
                            className="form-label"
                          >
                            Product
                          </label>
                          <select
                            className="form-control"
                            data-trigger=""
                            name="productname-field"
                            id="productname-field"
                            required=""
                          >
                            <option value="">Product</option>
                            <option value="Puma Tshirt">Puma Tshirt</option>
                            <option value="Adidas Sneakers">
                              Adidas Sneakers
                            </option>
                            <option value="350 ml Glass Grocery Container">
                              350 ml Glass Grocery Container
                            </option>
                            <option value="American egale outfitters Shirt">
                              American egale outfitters Shirt
                            </option>
                            <option value="Galaxy Watch4">Galaxy Watch4</option>
                            <option value="Apple iPhone 12">
                              Apple iPhone 12
                            </option>
                            <option value="Funky Prints T-shirt">
                              Funky Prints T-shirt
                            </option>
                            <option value="USB Flash Drive Personalized with 3D Print">
                              USB Flash Drive Personalized with 3D Print
                            </option>
                            <option value="Oxford Button-Down Shirt">
                              Oxford Button-Down Shirt
                            </option>
                            <option value="Classic Short Sleeve Shirt">
                              Classic Short Sleeve Shirt
                            </option>
                            <option value="Half Sleeve T-Shirts (Blue)">
                              Half Sleeve T-Shirts (Blue)
                            </option>
                            <option value="Noise Evolve Smartwatch">
                              Noise Evolve Smartwatch
                            </option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="date-field" className="form-label">
                            Order Date
                          </label>
                          <input
                            type="date"
                            id="date-field"
                            className="form-control"
                            data-provider="flatpickr"
                            required=""
                            data-date-format="d M, Y"
                            data-enable-time=""
                            placeholder="Select date"
                          />
                        </div>
                        <div className="row gy-4 mb-3">
                          <div className="col-md-6">
                            <div>
                              <label
                                htmlFor="amount-field"
                                className="form-label"
                              >
                                Amount
                              </label>
                              <input
                                type="text"
                                id="amount-field"
                                className="form-control"
                                placeholder="Total amount"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div>
                              <label
                                htmlFor="payment-field"
                                className="form-label"
                              >
                                Payment Method
                              </label>
                              <select
                                className="form-control"
                                data-trigger=""
                                name="payment-method"
                                required=""
                                id="payment-field"
                              >
                                <option value="">Payment Method</option>
                                <option value="Mastercard">Mastercard</option>
                                <option value="Visa">Visa</option>
                                <option value="COD">COD</option>
                                <option value="Paypal">Paypal</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="delivered-status"
                            className="form-label"
                          >
                            Delivery Status
                          </label>
                          <select
                            className="form-control"
                            data-trigger=""
                            name="delivered-status"
                            required=""
                            id="delivered-status"
                          >
                            <option value="">Delivery Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Inprogress">Inprogress</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Pickups">Pickups</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Returns">Returns</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success"
                            id="add-btn"
                          >
                            Add Order
                          </button>
                          {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Modal */}
              <div
                className="modal fade flip"
                id="deleteOrder"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body p-5 text-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/gsqxdxog.json"
                        trigger="loop"
                        colors="primary:#405189,secondary:#f06548"
                        style={{ width: 90, height: 90 }}
                      />
                      <div className="mt-4 text-center">
                        <h4>You are about to delete a order ?</h4>
                        <p className="text-muted fs-15 mb-4">
                          Deleting your order will remove all of your
                          information from our database.
                        </p>
                        <div className="hstack gap-2 justify-content-center remove">
                          <button
                            className="btn btn-link link-success fw-medium text-decoration-none"
                            id="deleteRecord-close"
                            data-bs-dismiss="modal"
                          >
                            <i className="ri-close-line me-1 align-middle" />{" "}
                            Close
                          </button>
                          <button className="btn btn-danger" id="delete-record">
                            Yes, Delete It
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*end modal */}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>

      {/*end col*/}
    </div>
  );
};

export default Orders;
