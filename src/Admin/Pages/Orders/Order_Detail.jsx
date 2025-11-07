import { Modal, Spin } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { FormatDate, FormatDateTime, FormatPrice } from "../../../Format";
import { useDetailUserId } from "../../../Hook/useDetailUser";
import { UseDetailOrder, useStatusOrderAdmin } from "../../../Hook/useOrder";
const Order_Detail = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const { isLoading: isLoadingorder, mutate } = useStatusOrderAdmin(id);
  const { data, isLoading } = UseDetailOrder(id);
  const [idOpen, setIdOpen] = useState("");
  const [status, setStatus] = useState();
  const { data: user, isLoading: isLoadingUser } = useDetailUserId(
    data?.[0]?.order?.user_id
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmitUpdate = () => {
    mutate({ id: idOpen, data: status });
    if (!isLoadingorder) {
      setIdOpen("");
      setIsOpen(false);
    }
  };
  const handleCancel = (id) => {
    setIdOpen("");
    setIsOpen(false);
    setIsOpenOrder(false);
  };

  const handleOpen = (id) => {
    setIdOpen(id[0].order.id);
    setStatus(id[0].order.status);
    setIsOpen(true);
  };
  const handleCancelOrder = (id, status) => {
    setIdOpen(id[0].order.id);
    setStatus(status);
    setIsOpenOrder(true);
  };
  const getOrderStatus = (status) => {
    const statusMapping = {
      1: "Pending",
      2: "Processing",
      3: "Shipping",
      4: "Delivered",
      5: "Completed",
      6: "Cancelled",
    };
    return statusMapping[status] || "Status Unknown";
  };
  if (isLoading || isLoadingUser) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  const total =
    Number(data?.[0]?.order?.total_amount || 0) +
    Number(data?.[0]?.order?.voucher?.discount || 0);
  return (
    <div>
      <div className="row">
        <div className="col-xl-9">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h5 className="card-title flex-grow-1 items-center mb-0 text-uppercase">
                  Order #{data?.[0]?.order?.order_code || "N/A"}
                </h5>
                <div className="flex-shrink-0">
                  <a
                    href="apps-invoices-details.html"
                    className="px-3 py-2 rounded-md btn-success btn-sm"
                  >
                    <i className="ri-download-2-fill align-middle me-1" />
                    Invoice
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive table-card">
                <table className="table table-nowrap align-middle table-borderless mb-0">
                  <thead className="table-light text-muted">
                    <tr>
                      <th scope="col">Product Details</th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Item Price
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Quantity
                      </th>

                      <th scope="col" className="text-end">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr>
                        <td>
                          <div className="d-flex">
                            <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
                              <img
                                src={item.product_variant?.product?.img_thumb}
                                alt=""
                                className="img-fluid d-block"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h5 className="fs-15">
                                <Link
                                  to={`/product_detail/${item.product_variant.product.id}`}
                                  className="link-primary"
                                >
                                  {item.product_name.length > 20
                                    ? item.product_name.slice(0, 40) + "..."
                                    : item.product_name}
                                </Link>
                              </h5>
                              <p className="text-muted mb-0">
                                Color:{" "}
                                <span className="fw-medium">
                                  {item.color_name}
                                </span>
                              </p>
                              <p className="text-muted mb-0">
                                Size:{" "}
                                <span className="fw-medium">
                                  {item.size_name}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          {<FormatPrice price={item.price} />}
                        </td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="fw-medium text-end">
                          {<FormatPrice price={item.price * item.quantity} />}
                        </td>
                      </tr>
                    ))}

                    <tr className="border-top border-top-dashed">
                      <td colSpan={3} />
                      <td colSpan={2} className="fw-medium p-0">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <td>Sub Total :</td>
                              <td className="text-end">
                                {<FormatPrice price={total} />}
                              </td>
                            </tr>
                            {data[0]?.order?.voucher !== null ? (
                              <tr>
                                <td>
                                  Discount
                                  <span className="text-muted mx-1">
                                    ({data[0]?.order?.voucher?.code})
                                  </span>
                                  :
                                </td>
                                <td className="text-end">
                                  {data.voucher === null ? (
                                    0
                                  ) : (
                                    <FormatPrice
                                      price={data[0]?.order?.voucher?.discount}
                                    />
                                  )}
                                </td>
                              </tr>
                            ) : undefined}

                            <tr>
                              <td>Shipping Charge :</td>
                              <td className="text-end">30.000 đ</td>
                            </tr>
                            <tr className="border-top border-top-dashed">
                              <th scope="row">Total :</th>
                              <th className="text-end">
                                {
                                  <FormatPrice
                                    price={data[0].order.total_amount + 30000}
                                  />
                                }
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/*end card*/}
          <div className="card">
            <div className="card-header">
              <div className="d-sm-flex align-items-center">
                <h5 className="card-title flex-grow-1 mb-0">Order Status</h5>
                {data[0].order.status !== 5 && (
                  <div className="flex mt-2 mt-sm-0 gap-2">
                    <div
                      className="px-3 py-1 bg-[#dff0fa] hover:text-white hover:bg-blue-500 cursor-pointer rounded-md btn-sm mt-2 mt-sm-0"
                      style={{ color: "white !important" }}
                      onClick={() => handleOpen(data)}
                    >
                      <i className="ri-map-pin-line align-middle me-1" />
                      Order Status
                    </div>
                    {(data[0].order.status == 1 ||
                      data[0].order.status == 2) && (
                      <div
                        className="px-3 py-1 bg-[#fadbd5] hover:text-white  hover:bg-red-500 cursor-pointer rounded-md btn-sm mt-2 mt-sm-0"
                        onClick={() => handleCancelOrder(data, 6)}
                        style={{ color: "white !important" }}
                      >
                        <i className="mdi mdi-archive-remove-outline align-middle me-1" />
                        Cancel Order
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="card-body">
              <div className="profile-timeline">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item border-0">
                    <div className="accordion-header" id="headingOne">
                      <div className="accordion-button p-2 shadow-none">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 avatar-xs">
                            <div className="avatar-title bg-success rounded-circle">
                              <i className="ri-shopping-bag-line" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3 ">
                            <h6 className="fs-15 mb-0 fw-semibold flex ">
                              {getOrderStatus(data[0]?.order?.status)}
                              <span className="fw-normal ml-2 flex gap-1">
                                {
                                  <FormatDate
                                    date={data[0]?.order?.updated_at}
                                  />
                                }
                                {
                                  <FormatDateTime
                                    dateString={data[0]?.order?.updated_at}
                                  />
                                }
                              </span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*end accordion*/}
              </div>
            </div>
          </div>
          {/*end card*/}
        </div>
        {/*end col*/}
        <div className="col-xl-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="ri-map-pin-line align-middle me-1 text-muted" />
                Shipping Address
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled vstack gap-2 fs-15 mb-0">
                <li className="fw-medium fs-14">Name : {user.name}</li>
                <li>Phone : {data[0].order.user_phone}</li>
                <li>Address : {data[0].order.user_address}</li>
              </ul>
            </div>
          </div>
        </div>
        {/*end col*/}
      </div>
      <Modal
        open={isOpen}
        onOk={handleSubmit(onSubmitUpdate)}
        onCancel={handleCancel}
        title="Order status"
        width={800}
        // className="modal fade zoomIn"
      >
        <>
          <div className="radio-inputs-order my-6">
            {[
              { label: "Chờ xử lý", value: 1 },
              { label: "Đang xử lý", value: 2 },
              { label: "Đang vận chuyển", value: 3 },
              { label: "Đã giao hàng", value: 4 },
              { label: "Hoàn thành", value: 5 },
            ].map((item) => (
              <label className="radio" key={item.value}>
                <input
                  type="radio"
                  name="radio"
                  value={item.value}
                  checked={status === item.value}
                  onChange={() => setStatus(item.value)}
                />
                <span className="name">{item.label}</span>
              </label>
            ))}
          </div>
        </>
      </Modal>
      <Modal
        open={isOpenOrder}
        onOk={handleSubmit(onSubmitUpdate)}
        onCancel={handleCancel}
        title="Order status"
        width={800}
        // className="modal fade zoomIn"
      >
        <>
          <div className="">Are you sure to cancel this order?</div>
        </>
      </Modal>
    </div>
  );
};

export default Order_Detail;
