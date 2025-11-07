import { Form, Input, Select, Spin, Switch, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Loader, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../../Apis/Api.jsx";
import { useCategory } from "../../../Hook/useCategory.jsx";
import { useDetailProduct } from "../../../Hook/useDetailProduct.jsx";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Chỉ có thể upload file JPG/PNG!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Ảnh phải nhỏ hơn 2MB!");
    return false;
  }
  return true;
};

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const { category, isCategory } = useCategory();
  const { detailProduct, isDetailProduct } = useDetailProduct();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [status, setStatus] = useState();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onChangeStatus = (checked) => {
    setStatus(checked);
  };
  // Load dữ liệu từ detailProduct vào form
  useEffect(() => {
    if (detailProduct && detailProduct.data) {
      const product = detailProduct.data;

      // Set giá trị cho các field trong form
      form.setFieldsValue({
        name: product.name || "",
        price: product.price || "",
        caterori: product.caterori?._id || product.caterori || undefined,
        description: product.description || "",
      });

      // Set ảnh nếu có
      if (product.imageUrl || product.img_thumb || product.image) {
        const productImage =
          product.imageUrl || product.img_thumb || product.image;
        setImageUrl(productImage);
        setUploadedImageUrl(productImage);
      }
      setStatus(product?.status);
    }
   
  }, [detailProduct, form]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Lấy URL từ Cloudinary response
      const cloudinaryUrl =
        info.file.response?.secure_url || info.file.response?.url;
      if (cloudinaryUrl) {
        setUploadedImageUrl(cloudinaryUrl);
      }

      // Hiển thị preview
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    if (info.file.status === "error") {
      setLoading(false);
      message.error("Upload ảnh thất bại!");
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <Loader className="animate-spin" /> : <Plus />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const { id } = useParams();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Thêm sản phẩm thành công!");
      form.resetFields();
      setImageUrl("");
      setUploadedImageUrl("");
      navigate("/products");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error || error?.message || "Có lỗi xảy ra!";
      message.error(errorMessage);
    },
  });

  const onSubmit = (values) => {
    if (!uploadedImageUrl && !imageUrl) {
      message.error("Vui lòng upload ảnh sản phẩm!");
      return;
    }

    const productData = {
     ...values,
      imageUrl: uploadedImageUrl || imageUrl,
      status: status,
    };

    mutate(productData);
  };

  if (isCategory || isDetailProduct) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="grid grid-cols-12 gap-4 px-4">
      <section className="col-span-12">
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <section
            className="bg-white mt-10 px-4 rounded-xl py-4"
            style={{ boxShadow: "0px 0px 4px 1px #d1d1d1" }}
          >
            <div className="text-[1.5rem] font-bold mb-4">Thông tin cơ bản</div>

            {/* Upload Ảnh */}
            <div className="grid grid-cols-12 mb-4 gap-4">
              <div className="flex gap-1 mb-2 col-span-2 justify-end items-start pt-2">
                <span className="text-red-500">*</span>
                <div className="text-[1rem]">Ảnh</div>
              </div>
              <div className="col-span-10">
                <Form.Item
                  name="image"
                  rules={[
                    {
                      validator: () => {
                        if (!imageUrl && !uploadedImageUrl) {
                          return Promise.reject("Vui lòng upload ảnh!");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://api.cloudinary.com/v1_1/dkrcsuwbc/image/upload"
                    data={{ upload_preset: "image1" }}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        draggable={false}
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              </div>
            </div>

            {/* Tên sản phẩm */}
            <div className="grid grid-cols-12 gap-4 mb-2">
              <div className="text-[1rem] col-span-2 text-right pt-2">
                <span className="text-red-500">*</span> Tên
              </div>
              <Form.Item
                className="col-span-10 mb-0"
                name="name"
                rules={[
                  { required: true, message: "Tên sản phẩm là bắt buộc!" },
                  { min: 3, message: "Tên phải có ít nhất 3 ký tự!" },
                  { max: 255, message: "Tên không quá 255 ký tự!" },
                ]}
              >
                <Input size="large" placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </div>

            {/* Giá */}
            <div className="grid grid-cols-12 gap-4 mb-2">
              <div className="text-[1rem] col-span-2 text-right pt-2">
                <span className="text-red-500">*</span> Giá
              </div>
              <Form.Item
                className="col-span-10 mb-0"
                name="price"
                rules={[
                  { required: true, message: "Giá là bắt buộc!" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Giá phải là số!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Nhập giá sản phẩm"
                  type="number"
                />
              </Form.Item>
            </div>

            {/* Ngành hàng */}
            <div className="grid grid-cols-12 gap-4 mb-2">
              <div className="text-[1rem] col-span-2 text-right pt-2">
                <span className="text-red-500">*</span> Ngành hàng
              </div>
              <Form.Item
                className="col-span-10 mb-0"
                name="caterori"
                rules={[
                  { required: true, message: "Vui lòng chọn ngành hàng!" },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Chọn ngành hàng"
                  options={category?.map((item) => ({
                    value: item._id,
                    label: item.name,
                  }))}
                />
              </Form.Item>
            </div>

            {/* Mô tả */}
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="text-[1rem] col-span-2 text-right pt-2">
                <span className="text-red-500">*</span> Mô tả
              </div>
              <Form.Item
                name="description"
                className="col-span-10 mb-0"
                rules={[
                  { required: true, message: "Mô tả là bắt buộc!" },
                  { min: 100, message: "Mô tả phải có ít nhất 100 ký tự!" },
                  { max: 250, message: "Mô tả không quá 250 ký tự!" },
                ]}
              >
                <TextArea
                  rows={5}
                  placeholder="Nhập mô tả sản phẩm"
                  style={{ resize: "none" }}
                  showCount
                  maxLength={250}
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-12 gap-4 ">
              <div className="text-[1rem] col-span-2 text-right ">
                Trạng thái
              </div>
              <div>
                <Switch
                  checked={status}
                  onChange={onChangeStatus}
                />
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div
            className="flex gap-4 justify-end bg-white p-3 rounded-lg mt-4 mb-4"
            style={{ boxShadow: "rgb(209, 209, 209) 0px 0px 4px 1px" }}
          >
            <Link
              to="/products"
              className="py-2 px-6 bg-white border-2 border-[#EBEBEB] rounded-lg text-black hover:bg-gray-50"
            >
              Hủy
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-6 bg-red-600 border-2 border-red-400 rounded-lg text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Spin size="small" /> : "Lưu"}
            </button>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default UpdateProduct;
