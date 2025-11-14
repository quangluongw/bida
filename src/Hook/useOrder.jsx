import { useMutation, useQuery, useQueryClient } from "react-query";

import { message } from "antd";
import { useParams } from "react-router-dom";
import {
  detailOrder,
  getOrdersAdmin,
  orderUpdate,
  udateStatusOrder,
} from "../Apis/Api.jsx";

const UseDetailOrder = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["order_id", id],
    queryFn: () => detailOrder(id),
    enabled: !!id,
    staleTime: 0, // Đảm bảo luôn fetch dữ liệu mới
    cacheTime: 0, // Không cache dữ liệu
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch, // Cho phép refetch thủ công khi cần
  };
};

const useOrder = (page, filters = {}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["order", page, filters],
    queryFn: () => getOrdersAdmin(page || 1, filters),
  });
  return { data, isLoading };
};
// const deleteOrder=()=>{
//   const {mutate,isLoading}=useMutation({
//     mutationFn:(id)=>deleteOrder(id),
//   })
// }

const useStatusOrderAdmin = (id) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => udateStatusOrder(id, data),
    onSuccess: () => {
      message.success("Status update successful");
      queryClient.invalidateQueries({ queryKey: ["order_id", id] });
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
const useOrderUpdate = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, data }) => orderUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  return { mutate, isLoading };
};
export {
  UseDetailOrder,
  useOrder,
  useOrderUpdate,
  useStatusOrder,
  useStatusOrderAdmin,

};
