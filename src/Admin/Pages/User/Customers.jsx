import React, { useState } from "react";
import { useQuery } from "react-query";
import { user } from "../../../Apis/Api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Pagination, Spin } from "antd";
import { FormatDate } from "../../../Format";
import { useAddUser, useUpdateUser } from "../../../Hook/useUser";
import { useForm } from "react-hook-form";
const Customers = () => {
  const { mutate: updateuser } = useUpdateUser();
  const { mutate } = useAddUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;
  const [filter, setfilter] = useState();
  const [search, setsearch] = useState();
  const [role, setrole] = useState();
  const [updaterole, setupdaterole] = useState();
  const onShowSizeChange = (current) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", current);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const showModal = (id, role) => {
    setId(id);
    setupdaterole(role);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [block, setBlock] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["customers", page, filter],
    queryFn: () => user(page, filter),
  });
  const handleOk = () => {
    updateuser({
      id,
      data: {
        role: updaterole,
      },
    });
    setIsModalOpen(false);
    setId("");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const user = {
      ...data,
      "password": "Abcd@123",
      "role":"admin"
    };
    mutate(user);
    setBlock(false);
  };
  const handleFilter = () => {
    setfilter({
      search,
      role,
    });
  };
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }

  return (
    <div className="row px-4">
      <div className="col-lg-12">
        <div className="card" id="customerList">
          <div className="card-body border-bottom-dashed border-bottom">
            <form>
              <div className="row g-3">
                <div className="col-xl-6">
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search for email"
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
                    />

                    <i className="ri-search-line search-icon" />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="row g-3">
                    <div className="col-sm-4">
                      <div>
                        <select
                          className="form-control"
                          value={role}
                          onChange={(e) => setrole(e.target.value)}
                        >
                          <option value="" selected="">
                            All
                          </option>
                          <option value="1">Admin</option>
                          <option value="0">User</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <button
                          type="button"
                          className="py-2 bg-[#5671cc] text-white rounded-md btn-primary w-100"
                          onClick={() => handleFilter()}
                        >
                          <i className="ri-equalizer-fill me-2 align-bottom" />
                          Filters
                        </button>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex flex-wrap align-items-start gap-2">
                        <button
                          className="btn btn-soft-danger"
                          id="remove-actions"
                        >
                          <i className="ri-delete-bin-2-line" />
                        </button>
                        <button
                          type="button"
                          className=" text-white text-[0.9rem] bg-[#03A9F4] px-4
                           py-[0.4rem] rounded-md "
                          onClick={() => setBlock(true)}
                        >
                          <i className="ri-add-line align-bottom " /> Thêm admin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="card-body">
            <div>
              <div className="table-responsive table-card mb-1">
                <table className="table align-middle" id="customerTable">
                  <thead className="table-light text-muted">
                    <tr>
                      <th scope="col" style={{ width: 50 }}>
                        #
                      </th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Ngày tạo tài khoản</th>
                      <th>Trạng thái</th>
                      <th>Vai trò</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    {data?.data?.map((item, index) => (
                      <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td className="id" style={{ display: "none" }}>
                          <Link to="#" className="fw-medium link-primary">
                            #VZ2101
                          </Link>
                        </td>
                        <td className="customer_name"> {item.name}</td>
                        <td className="email">{item.username}</td>
                        <td className="phone">{item.phone}</td>
                        <td className="date">
                          {FormatDate({ date: item.createdAt })}
                        </td>
                        <td className="status">
                          <span
                            className={`badge ${item.active === true ? "bg-success-subtle text-success" : "bg-red-500 "}   text-uppercase`}
                          >
                            {item.active === true ? "Hoạt động" : "Khóa"}
                          </span>
                        </td>
                        <td className="role">
                          <span className={`text-sm text-uppercase`}>
                            {item.role == 0 ? "User" : "Admin"}
                          </span>
                        </td>
                        <td className="text-center">
                          <li
                            className="list-inline-item edit"
                            onClick={() => showModal(item._id, item.role)}
                          >
                            <div className="text-primary d-inline-block edit-item-btn">
                              <i className="ri-pencil-fill fs-16" />
                            </div>
                          </li>
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
                      colors="primary:#121331,secondary:#08a88a"
                      style={{ width: 75, height: 75 }}
                    />
                    <h5 className="mt-2">Sorry! No Result Found</h5>
                    <p className="text-muted mb-0">
                      We've searched more than 150+ customer We did not find any
                      customer for you search.
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-center mb-4">
                <Pagination
                  showSizeChanger
                  onChange={onShowSizeChange}
                  current={data.currentPage}
                  total={data.totalPages}
                  pageSize={data.itemsPerPage}
                  align="center"
                />
              </div>
            </div>

            <div
              className={`modal fade  ${block ? "block opacity-100" : ""} `}
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              <div
                className="modal-dialog modal-dialog-centered "
                style={{ transform: "none" }}
              >
                <div className="modal-content">
                  <div className="modal-header bg-light p-3">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Thêm admin
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setBlock(false)}
                    />
                  </div>
                  <form
                    className="tablelist-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="modal-body">
                      <div className="mb-3">
                        <label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          Tên
                        </label>
                        <input
                          type="text"
                          id="customername-field"
                          className="form-control"
                          placeholder="Enter name"
                          {...register("username", { required: true })}
                        />
                        <div className="text-red-500 mt-1">
                          {errors.name && "Please enter a customer name."}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email-field"
                          className="form-control"
                          placeholder="Enter email"
                          {...register("email", {
                            required: "Please enter a email.",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                              message: "Please enter a valid email.",
                            },
                          })}
                        />
                        <div className="text-red-500 mt-1">
                          {errors.email && errors.email.message}
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="px-3 py-2 mt-2 rounded-md bg-[#F3F6F9]"
                          onClick={() => setBlock(false)}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-2 mt-2 rounded-md btn-success"
                          id="add-btn"
                        >
                          Add Customer
                        </button>
                        {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              // className="modal fade zoomIn"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-none">
                  <div className="radio-inputs-order my-6">
                    {[
                      { label: "Admin", value: "1" },
                      { label: "User", value: "0" },
                    ].map((item) => (
                      <label className="radio" key={item.value}>
                        <input
                          type="radio"
                          name="radio"
                          value={item.value}
                          checked={updaterole === item.value}
                          onChange={() => setupdaterole(item.value)}
                        />
                        <span className="name">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      {/*end col*/}
    </div>
  );
};

export default Customers;
