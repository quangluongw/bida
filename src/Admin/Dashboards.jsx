import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { TotalOrder, NumberOrder } from "./Char";
import useDashboard from "../Hook/useDashboard";
import { Spin } from "antd";
import useAuth from "../Hook/useAuth";
import { FormatPrice } from "../Format";

const Dashboards = () => {
  const { search } = useLocation();
const [searchParams] = useSearchParams();

const startdate = searchParams.get("startdate") || null;

let enddateRaw = searchParams.get("enddate");

if (!enddateRaw) {
  // không có enddate => dùng hiện tại +7h
  const now = new Date();
  now.setHours(now.getHours() + 7);
  enddateRaw = now.toISOString().split("T")[0];
} else {
  // nếu có => cũng convert sang Date và cộng +7h để fix lệch giờ
  const temp = new Date(enddateRaw);
  temp.setHours(temp.getHours() + 7);
  enddateRaw = temp.toISOString().split("T")[0];
}

const enddate = enddateRaw;
const { data, isLoading } = useDashboard({ startdate, enddate });
  const [startDateValue, setstartDateValue] = useState();
  const [endDateValue, setendDateValue] = useState();

  const makeLink = (key, value) => {
    const updatedParams = new URLSearchParams(searchParam.toString());
    updatedParams.set(key, value);
    return `/admin?${updatedParams.toString()}`;
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
  console.log(data);
  if (isLoading ) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full"
      />
    );
  }
  return (
    // <div className="">
    //   <div className="row mb-3 pb-1">
    //     <div className="col-12">
    //       <div className="d-flex align-items-lg-center flex-lg-row flex-column">
    //         <div className="flex-grow-1">
    //           <h4 className="fs-16 mb-1">Good Morning, {auth.name}!</h4>
    //           <p className="text-muted mb-0">
    //             Here's what's happening with your store today.
    //           </p>
    //         </div>
    //         <div className="mt-3 mt-lg-0">
    //           <form>
    //             <div className="row g-3 mb-0 align-items-center">
    //               <div className="col-sm-auto flex gap-3">
    //                 <label htmlFor="">Start-date</label>
    //                 <div className="input-group ">
    //                   <input
    //                     type="date"
    //                     className="form-control border-0 dash-filter-picker shadow"
    //                     onChange={(e) => setstartDateValue(e.target.value)}
    //                     value={startDateValue}
    //                   />
    //                   <Link
    //                     to={makeLink("startdate", startDateValue)}
    //                     className="input-group-text bg-primary border-primary text-white"
    //                   >
    //                     <i className="ri-calendar-2-line" />
    //                   </Link>
    //                 </div>

    //                 <label htmlFor="">End-date</label>
    //                 <div className="input-group">
    //                   <input
    //                     type="date"
    //                     className="form-control border-0 dash-filter-picker shadow"
    //                     onChange={(e) => setendDateValue(e.target.value)}
    //                     value={endDateValue}
    //                   />
    //                   <Link
    //                     to={makeLink("enddate", endDateValue)}
    //                     className="input-group-text bg-primary border-primary text-white"
    //                   >
    //                     <i className="ri-calendar-2-line" />
    //                   </Link>
    //                 </div>
    //               </div>
    //             </div>
    //             {/*end row*/}
    //           </form>
    //         </div>
    //       </div>
    //       {/* end card header */}
    //     </div>
    //     {/*end col*/}
    //   </div>
    //   {/*end row*/}
    //   <div className="row">
    //     <div className="col-xl-3 col-md-6">
    //       {/* card */}
    //       <div className="card card-animate">
    //         <div className="card-body">
    //           <div className="d-flex align-items-center">
    //             <div className="flex-grow-1 overflow-hidden">
    //               <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
    //                 Total Earnings
    //               </p>
    //             </div>
    //           </div>
    //           <div className="d-flex align-items-end justify-content-between mt-4">
    //             <div>
    //               <h4 className="fs-22 fw-semibold ff-secondary mb-4">
    //                 <span className="counter-value" data-target="559.25">
    //                   <FormatPrice price={data.totalRevenue} />
    //                 </span>
    //               </h4>
    //             </div>
    //             <div className="avatar-sm flex-shrink-0">
    //               <span className="avatar-title bg-success-subtle rounded fs-3">
    //                 <i className="bx bx-dollar-circle text-success" />
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //         {/* end card body */}
    //       </div>
    //       {/* end card */}
    //     </div>
    //     {/* end col */}
    //     <div className="col-xl-3 col-md-6">
    //       {/* card */}
    //       <div className="card card-animate">
    //         <div className="card-body">
    //           <div className="d-flex align-items-center">
    //             <div className="flex-grow-1 overflow-hidden">
    //               <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
    //                 Total Orders
    //               </p>
    //             </div>
    //           </div>
    //           <div className="d-flex align-items-end justify-content-between mt-4">
    //             <div>
    //               <h4 className="fs-22 fw-semibold ff-secondary mb-4">
    //                 <span className="counter-value">{data.ordersCount}</span>
    //               </h4>
    //             </div>
    //             <div className="avatar-sm flex-shrink-0">
    //               <span className="avatar-title bg-info-subtle rounded fs-3">
    //                 <i className="bx bx-shopping-bag text-info" />
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //         {/* end card body */}
    //       </div>
    //       {/* end card */}
    //     </div>
    //     {/* end col */}
    //     <div className="col-xl-3 col-md-6">
    //       {/* card */}
    //       <div className="card card-animate">
    //         <div className="card-body">
    //           <div className="d-flex align-items-center">
    //             <div className="flex-grow-1 overflow-hidden">
    //               <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
    //                 Total Customers
    //               </p>
    //             </div>
    //           </div>
    //           <div className="d-flex align-items-end justify-content-between mt-4">
    //             <div>
    //               <h4 className="fs-22 fw-semibold ff-secondary mb-4">
    //                 <span className="counter-value" data-target="183.35">
    //                   {data.usersCount}
    //                 </span>
    //               </h4>
    //             </div>
    //             <div className="avatar-sm flex-shrink-0">
    //               <span className="avatar-title bg-warning-subtle rounded fs-3">
    //                 <i className="bx bx-user-circle text-warning" />
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //         {/* end card body */}
    //       </div>
    //       {/* end card */}
    //     </div>
    //     {/* end col */}
    //     <div className="col-xl-3 col-md-6">
    //       {/* card */}
    //       <div className="card card-animate">
    //         <div className="card-body">
    //           <div className="d-flex align-items-center">
    //             <div className="flex-grow-1 overflow-hidden">
    //               <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
    //                 Total Product
    //               </p>
    //             </div>
    //           </div>
    //           <div className="d-flex align-items-end justify-content-between mt-4">
    //             <div>
    //               <h4 className="fs-22 fw-semibold ff-secondary mb-4">
    //                 <span className="counter-value">{data.productCount}</span>
    //               </h4>
    //             </div>
    //             <div className="avatar-sm flex-shrink-0">
    //               <span className="avatar-title bg-primary-subtle rounded fs-3">
    //                 <img
    //                   src="https://media-public.canva.com/FlQVA/MAFTeAFlQVA/1/tl.png"
    //                   className="bx bx-wallet text-primary"
    //                   width={30}
    //                   alt=""
    //                 />
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //         {/* end card body */}
    //       </div>
    //       {/* end card */}
    //     </div>
    //     {/* end col */}
    //   </div>{" "}
    //   {/* end row*/}
    //   <div className="row">
    //     <div className="col-xl-12">
    //       <div className="card p-2">
    //         <div className="card-header border-0 align-items-center d-flex">
    //           <h4 className="card-title mb-0 flex-grow-1">Order Number</h4>
    //         </div>
    //         <NumberOrder chart={data.chart} />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="col-xl-12">
    //       <div className="card p-2">
    //         <div className="card-header border-0 align-items-center d-flex">
    //           <h4 className="card-title mb-0 flex-grow-1">Total Order </h4>
    //         </div>
    //         <TotalOrder chart={data.chart} />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="col-xl-12">
    //       <div className="card">
    //         <div className="card-header align-items-center d-flex">
    //           <h4 className="card-title mb-0 flex-grow-1">
    //             Best Selling Products
    //           </h4>
    //         </div>
    //         {/* end card header */}
    //         <div className="card-body">
    //           <div className="table-responsive table-card">
    //             <table className="table table-hover table-centered align-middle table-nowrap mb-0">
    //               <tbody>
    //                 {data.topSellingProducts.map((item, index) => (
    //                   <tr key={index}>
    //                     <td>
    //                       <div className="d-flex align-items-center">
    //                         <div className="avatar-sm bg-light rounded p-1 me-2">
    //                           <img
    //                             src={item.product_image}
    //                             alt=""
    //                             className="img-fluid d-block"
    //                           />
    //                         </div>
    //                         <div>
    //                           <h5 className="fs-14 my-1">
    //                             <Link
    //                               to={`product_detail/${item.id}`}
    //                               className="text-reset"
    //                             >
    //                               {item.product_name.length > 20
    //                                 ? item.product_name.slice(0, 20) + "..."
    //                                 : item.product_name}
    //                             </Link>
    //                           </h5>
    //                           <span className="text-muted">
    //                             Phân loại : {item.variant_name}
    //                           </span>
    //                           <br />
    //                           <span className="text-muted">
    //                             {item.last_order_date}
    //                           </span>
    //                         </div>
    //                       </div>
    //                     </td>
    //                     <td>
    //                       <h5 className="fs-14 my-1 fw-normal">
    //                         <FormatPrice price={item.price} />
    //                       </h5>
    //                       <span className="text-muted">Price</span>
    //                     </td>
    //                     <td>
    //                       <h5 className="fs-14 my-1 fw-normal">
    //                         {item.total_orders}
    //                       </h5>
    //                       <span className="text-muted">Orders</span>
    //                     </td>
    //                     <td>
    //                       <h5 className="fs-14 my-1 fw-normal">
    //                         {item.quantity}
    //                       </h5>
    //                       <span className="text-muted">Stock</span>
    //                     </td>
    //                     <td>
    //                       <h5 className="fs-14 my-1 fw-normal">
    //                         {" "}
    //                         <FormatPrice price={item.total_amount} />
    //                       </h5>
    //                       <span className="text-muted">Amount</span>
    //                     </td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* .col*/}
    //   </div>
    //   {/* end row*/}
    //   <div className="row">
    //     <div className="col-xl-12">
    //       <div className="card">
    //         <div className="card-header align-items-center d-flex">
    //           <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
    //         </div>
    //         {/* end card header */}
    //         <div className="card-body">
    //           <div className="table-responsive table-card">
    //             <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
    //               <thead className="text-muted table-light">
    //                 <tr>
    //                   <th scope="col">Order ID</th>
    //                   <th scope="col">Customer</th>
    //                   <th scope="col">Product</th>
    //                   <th scope="col">Amount</th>
    //                   <th scope="col">Status</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {data.recentOrders.map((item, index) => (
    //                   <tr key={index}>
    //                     <td>
    //                       <Link
    //                         to={`order_detail/${item.id}`}
    //                         className="fw-medium link-primary"
    //                       >
    //                         {item.order_code}
    //                       </Link>
    //                     </td>
    //                     <td>
    //                       <div className="d-flex align-items-center">
    //                         <div className="flex-grow-1">{item.user}</div>
    //                       </div>
    //                     </td>
    //                     <td>
    //                       <span>
    //                         {item.items[0]?.product_name?.length > 20
    //                           ? `${item.items[0].product_name.slice(0, 20)}...`
    //                           : item.items[0]?.product_name}
    //                       </span>
    //                     </td>
    //                     <td>
    //                       <span className="text-red-500">
    //                         {<FormatPrice price={item.total_amount} />}
    //                       </span>
    //                     </td>

    //                     <td>
    //                       <span className="badge bg-success-subtle text-success">
    //                         {getOrderStatus(item.status)}
    //                       </span>
    //                     </td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //               {/* end tbody */}
    //             </table>
    //             {/* end table */}
    //           </div>
    //         </div>
    //       </div>{" "}
    //       {/* .card*/}
    //     </div>{" "}
    //     {/* .col*/}
    //   </div>{" "}
    //   {/* end row*/}
    // </div>
    <div></div>
  );
};

export default Dashboards;
