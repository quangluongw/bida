import useAuth from "../Hook/useAuth";
import Axios from "./Axios";
export const getProducts = async (page, filters = {}) => {
  const params = new URLSearchParams();
  params.append("page", page);
  // Add filters if they exist
  if (filters.price) params.append("price", filters.price);
  if (filters.category_id) params.append("category_id", filters.category_id);
  if (filters.sort) params.append("sort_price", filters.sort);
  if (filters.search) params.append("search", filters.search);
  const res = await Axios.get(`/products?${params.toString()}`);
  return res.data;
};
export const getCategory = async () => {
  const res = await Axios.get(`categorys`);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await Axios.delete(`category/${id}`);
  return res.data;
};
export const updateCategory = async (id, data) => {
  const res = await Axios.patch(`category/${id}`, data);
  return res.data;
};

export const addCategory = async (data) => {
  const res = await Axios.post(`category`, data);
  return res.data;
};
export const DetailProduct = async (id) => {
  const res = await Axios.get(`product/${id}`);
  return res.data;
};
export const forceDeleteProduct = async (id) => {
  const res = await Axios.delete(`products/${id}`);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await Axios.patch(`products/${id}`, data);
  return res.data;
};
export const categoryProduct = async (id) => {
  const res = await Axios.get(`/products/category/${id}`);
  return res.data;
};

export const signin = async (data) => {
  const res = await Axios.post(`login`, data);
  return res.data;
};
export const signup = async (data) => {
  const res = await Axios.post(`api/register`, data);
  return res.data;
};
// export const logout=async ()=>{
//   const res = await Axios.post(`api/logout`, {
//     headers: {
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token")).split("|")[1]}`,
//     },
//   });
//   return res.data.user;
// }

export const logout = async () => {
  const authToken = localStorage.getItem("auth_token");
  if (!authToken) {
    throw new Error("No auth token found");
  }

  const token = JSON.parse(authToken).split("|")[1];
  const res = await Axios.post("/api/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.user;
};

export const getUserToken = async () => {
  const res = await Axios.get(`api/user_token`, {
    // headers: {
    //   Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token")).split("|")[1]}`,
    // },
  });
  return res.data.user;
};
export const categoryForcedelete = async (id) => {
  const res = await Axios.delete(`/category/${id}`);
  return res.data;
};
export const user = async (page, filter = {}) => {
  const param = new URLSearchParams();
  param.append("page", page);
  if (filter.search) param.append("email", filter.search);
  if (filter.role !== undefined && filter.role !== "")
    param.append("role", filter.role);
  const res = await Axios.get(`/user?${param.toString()}`);
  return res.data;
};
export const detailUser = async () => {
  const { data: user } = useAuth();
  const res = await Axios.get(`api/users/${user.id}`);
  return res.data;
};
export const detailUserId = async (id) => {
  const res = await Axios.get(`api/users/${id}`);
  return res.data;
};
export const deleteUser = async (id) => {
  const res = await Axios.delete(`api/users/${id}`);
  return res.data;
};
export const addUsers = async (data) => {
  const res = await Axios.post(`/addUser`, data);
  return res.data;
};
export const updateUsers = async (id, data) => {
  const res = await Axios.put(`api/users/${id}`, data);
  return res.data;
};
export const getOrdersAdmin = async (page, filters = {}) => {
  const params = new URLSearchParams({
    page,
    ...(filters.search && { search: filters.search }),
    ...(filters.statusOrder && { status: filters.statusOrder }),
    ...(filters.paymen && { payment: filters.paymen }),
  });
  const res = await Axios.get(`/orders/?${params.toString()}`);
  return res.data;
};

export const udateStatusOrder = async (id, data) => {
  const res = await Axios.patch(`order/${id}`, {
    status: data,
  });
  return res.data;
};
export const detailOrder = async (id) => {
  const res = await Axios.get(`/order/${id}`);
  return res.data;
};

export const addProduct = async (data) => {
  const res = await Axios.post(`/products`, data);
  return res.data;
};

export const dashboard = async (startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("from", startDate);
    if (endDate) params.append("to", endDate);

    const res = await Axios.get(`/dashboard?${params.toString()}`);
    return res.data;
  } catch (error) {
    // Xử lý lỗi tốt hơn
    console.error("Error fetching dashboard data:", error);
    throw error; // Ném lỗi để component có thể bắt và xử lý
  }
};
export const emailPassword = async (data) => {
  const res = await Axios.post("api/forgot", data);
  return res.data;
};
export const verifytoken = async (data) => {
  const res = await Axios.post("api/verify-token", data);
  return res.data;
};
export const resetpassword = async (data) => {
  const res = await Axios.post("api/reset-password", data);
  return res.data;
};


