import React from "react";
import { useDetailProduct } from "../../../Hook/useDetailProduct";
import { Spin } from "antd";
import { FormatDate, FormatPrice } from "../../../Format";

const Detail = () => {
  const { detailProduct, isDetailProduct } = useDetailProduct();
    if (isDetailProduct) {
      return (
        <Spin
          size="large"
          className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
        />
      );
  }
  console.log(detailProduct);
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="row gx-lg-5">
              <div className="col-xl-4 col-md-8 mx-auto">
                <div className="product-img-slider sticky-side-div">
                  <div className="swiper product-thumbnail-slider p-2 rounded bg-light">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img
                          src="assets/images/products/img-8.png"
                          alt=""
                          className="img-fluid d-block"
                        />
                      </div>
                      <div className="swiper-slide">
                        <img
                          src="assets/images/products/img-6.png"
                          alt=""
                          className="img-fluid d-block"
                        />
                      </div>
                      <div className="swiper-slide">
                        <img
                          src="assets/images/products/img-1.png"
                          alt=""
                          className="img-fluid d-block"
                        />
                      </div>
                      <div className="swiper-slide">
                        <img
                          src="assets/images/products/img-8.png"
                          alt=""
                          className="img-fluid d-block"
                        />
                      </div>
                    </div>
                    <div className="swiper-button-next" />
                    <div className="swiper-button-prev" />
                  </div>
                  {/* end swiper thumbnail slide */}
                  <div className="swiper product-nav-slider mt-2">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="nav-slide-item">
                          <img
                            src="assets/images/products/img-8.png"
                            alt=""
                            className="img-fluid d-block"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="nav-slide-item">
                          <img
                            src="assets/images/products/img-6.png"
                            alt=""
                            className="img-fluid d-block"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="nav-slide-item">
                          <img
                            src="assets/images/products/img-1.png"
                            alt=""
                            className="img-fluid d-block"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="nav-slide-item">
                          <img
                            src="assets/images/products/img-8.png"
                            alt=""
                            className="img-fluid d-block"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end swiper nav slide */}
                </div>
              </div>
              {/* end col */}
              <div className="col-xl-8">
                <div className="mt-xl-0 mt-5">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <h4 className="text-2xl mb-2">
                        {detailProduct.data.name}
                      </h4>
                      <div className="hstack text-[16px] mb-3 gap-3 flex-wrap">
                        <div className="text-muted">
                          Danh mục :
                          <span className="text-body fw-medium">
                            {detailProduct?.data.caterori.name}
                          </span>
                        </div>
                        <div className="vr" />
                        <div className="text-muted">
                          Ngày công khai :
                          <span className="text-body fw-medium">
                            {FormatDate({ date: detailProduct.data.createdAt })}
                          </span>
                        </div>
                      </div>
                    </div> 
                  </div>
                  <div>
                    <h4 className="text-xl">
                      Giá : {FormatPrice({ price: detailProduct.data.price })}
                    </h4>
                  </div>

                  {/* end row */}
                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">Mô tả :</h5>
                    <p>{detailProduct.data.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
