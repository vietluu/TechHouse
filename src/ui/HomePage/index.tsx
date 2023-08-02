'use client';
import AdModal from '@/components/AdModal';
import Image from 'next/image';
import Link from 'next/link';
import Slider, { Settings } from 'react-slick';

export default function Home() {
  const setting: Settings = {
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipe: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    adaptiveHeight: true,
    infinite: true,
    customPaging: () => <span className="dot"></span>,
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AdModal />
      <div className="slideshow-container">
        <Slider {...setting}>
          <div className="img-box">
            <Image
              width={1000}
              height={1000}
              priority
              src="/assets/images/banner/slideshow_1.jpg"
              alt=""
              className="w-full h-full"
              quality={100}
            />
          </div>
          <div className="img-box">
            <Image
              priority
              src="/assets/images/banner/slideshow_2.jpg"
              alt=""
              width={1000}
              height={1000}
              className="w-full h-full"
              quality={100}
            />
          </div>
          <div className="img-box">
            <Image
              width={1000}
              height={1000}
              quality={100}
              priority
              src="/assets/images/banner/slideshow_3.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>
        </Slider>
      </div>

      <div className="news">
        <div className="news-container">
          <div className="tab-news">
            <Link href="#">
              <Image
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_home_1.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="tab-news">
            <Link href="#">
              <Image
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_home_2.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="tab-news">
            <Link href="#">
              <Image
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_home_3.jpg"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="fluid_container">
        <div className="product">
          <section className="news_product">
            <div className="product_title">
              <h2>Sản phẩm mới</h2>
              <h4>Cập nhật những sản phẩm mới nhất</h4>
            </div>

            <div className="device_product" id="product_show">
              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/iphone/ip13-pro_2.jpg"
                  alt=""
                />
                <p className="mobile_name">Iphone 13 ProMax</p>
                <p className="mobile_paid">30.000.000đ</p>
              </Link>
              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/iphone/ipad-pro-12-9-2021-1-0009.jpg"
                  alt=""
                />
                <p className="mobile_name">Ipad pro 2021</p>
                <p className="mobile_paid">30.000.000đ</p>
              </Link>
              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/samsung/samsung-galaxy-s21-fe.jpg"
                  alt=""
                />
                <p className="mobile_name">Samsung s21 fe</p>
                <p className="mobile_paid">
                  25.900.000đ <s> 27.000.000đ</s>
                </p>

                <span className="sale">-5%</span>
              </Link>
              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/xiaomi/xiaomi-mi-10t-pro_2_.jpg"
                  alt=""
                />
                <p className="mobile_name">xiaomi Mi 10t Pro</p>
                <p className="mobile_paid">
                  26.550.000đ <s>28.800.000đ</s>
                </p>
                <span className="sale">-2%</span>
              </Link>
              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/iphone/iphone_11_white_4_.jpg"
                  alt=""
                />
                <p className="mobile_name">Iphone 11</p>
                <p className="mobile_paid">20.000.000đ</p>
              </Link>
              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/samsung/samsung-galaxy-tab-s8-002.jpg"
                  alt=""
                />
                <p className="mobile_name">Samsung galaxy tab S8</p>
                <p className="mobile_paid">30.000.000đ</p>
              </Link>
              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/xiaomi/xiaomi-mi-11-lite-5g-2_10.jpg"
                  alt=""
                />
                <p className="mobile_name">Xiaomi mi11 lite 5g</p>
                <p className="mobile_paid">
                  26.600.000đ <s>28.300.000đ</s>
                </p>
                <span className="sale">-3%</span>
              </Link>
              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/samsung/samsung-galaxy-tab-s7-1.jpg"
                  alt=""
                />
                <p className="mobile_name">Samsung galaxy tab S8</p>
                <p className="mobile_paid">
                  26.600.000đ <s>28.300.000đ</s>
                </p>
                <span className="sale">-5%</span>
              </Link>
              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/iphone/iphone_12_pro_max_white_1.jpg"
                  alt=""
                />
                <p className="mobile_name">Iphone 12 pro max</p>
                <p className="mobile_paid">25.000.000đ</p>
              </Link>

              <Link href="detailCart.aspx" className="mobile_info">
                <Image
                  height={400}
                  width={400}
                  src="/assets/images/sp/iphone/iphoneSE.jpg"
                  alt=""
                />
                <p className="mobile_name">Iphone SE 2</p>
                <p className="mobile_paid">
                  17.550.000đ <s>19.550.000đ</s>
                </p>
                <span className="sale">-10%</span>
              </Link>
            </div>
          </section>
        </div>

        <div className="sale_off">
          <div className="side_left effect">
            <Link href="#">
              <Image
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_center_1.jpg"
                alt=""
              />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Link>
            <Link href="#">
              <Image
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_center_2.jpg"
                alt=""
              />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Link>
          </div>
          <div className="side_right effect++">
            <Link href="#">
              <Image
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_center_3.jpg"
                alt=""
              />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Link>
          </div>
        </div>
        <div className="sale_device">
          <div className="product">
            <section className="news_product">
              <div className="product_title">
                <h2>Sản Phẩm Khuyễn mãi</h2>
                <h4>Giảm giá lên tới 50%</h4>
              </div>
              <div className="device_product_sale">
                <Link href="#" className="mobile_sale">
                  <Image
                    height={400}
                    width={400}
                    src="/assets/images/sp/iphone/ip13-pro_2.jpg"
                    alt=""
                  />
                  <div className="right_info">
                    <p className="mobile_name">Điện thoại Iphone 13 ProMax</p>
                    <p className="mobile_paid">30.000.000đ</p>
                  </div>
                </Link>
                <Link href="#" className="mobile_sale">
                  <Image
                    height={400}
                    width={400}
                    src="/assets/images/sp/iphone/ipad-pro-12-9-2021-1-0009.jpg"
                    alt=""
                  />
                  <div className="right_info">
                    <p className="mobile_name">Máy tính bảng Ipad pro 2021</p>
                    <p className="mobile_paid">30.000.000đ</p>
                  </div>
                </Link>
                <Link href="#" className="mobile_sale">
                  <Image
                    height={400}
                    width={400}
                    src="/assets/images/sp/samsung/samsung-galaxy-s21-fe.jpg"
                    alt=""
                  />
                  <div className="right_info">
                    <p className="mobile_name">Điện thoại Samsung s21 fe</p>
                    <p className="mobile_paid">
                      25.900.000đ <s> 27.000.000đ</s>
                    </p>
                  </div>

                  <span className="sale">-5%</span>
                </Link>
                <Link href="#" className="mobile_sale">
                  <Image
                    height={400}
                    width={400}
                    src="/assets/images/sp/xiaomi/xiaomi-mi-10t-pro_2_.jpg"
                    alt=""
                  />
                  <div className="right_info">
                    <p className="mobile_name">Điện thoại xiaomi Mi 10t Pro</p>
                    <p className="mobile_paid">
                      26.550.000đ <s>28.800.000đ</s>
                    </p>
                  </div>
                  <span className="sale">-2%</span>
                </Link>
                <Link href="#" className="mobile_sale">
                  <Image
                    height={400}
                    width={400}
                    src="/assets/images/sp/iphone/iphone_11_white_4_.jpg"
                    alt=""
                  />
                  <div className="right_info">
                    <p className="mobile_name">Điện thoại Iphone 11</p>
                    <p className="mobile_paid">20.000.000đ</p>
                  </div>
                </Link>
                <Link href="#" className="mobile_sale">
                  <Image
                    height={400}
                    width={400}
                    src="/assets/images/sp/samsung/samsung-galaxy-tab-s8-002.jpg"
                    alt=""
                  />
                  <div className="right_info">
                    <p className="mobile_name">
                      Máy tính bảng Samsung galaxy tab S8
                    </p>
                    <p className="mobile_paid">30.000.000đ</p>
                  </div>
                </Link>
                <Link href="#" className="mobile_sale">
                  <Image
                    height={400}
                    width={400}
                    src="/assets/images/sp/xiaomi/xiaomi-mi-11-lite-5g-2_10.jpg"
                    alt=""
                  />
                  <div className="right_info">
                    <p className="mobile_name">
                      Điện thoại Xiaomi mi11 lite 5g
                    </p>
                    <p className="mobile_paid">
                      26.600.000đ <s>28.300.000đ</s>
                    </p>
                  </div>
                  <span className="sale">-3%</span>
                </Link>
                <Link href="#" className="mobile_sale">
                  <Image
                    height={400}
                    width={400}
                    src="/assets/images/sp/samsung/samsung-galaxy-tab-s7-1.jpg"
                    alt=""
                  />
                  <div className="right_info">
                    <p className="mobile_name">
                      Máy tính bảng Samsung galaxy tab S8
                    </p>
                    <p className="mobile_paid">
                      26.600.000đ <s>28.300.000đ</s>
                    </p>
                  </div>
                  <span className="sale">-5%</span>
                </Link>
                <Link href="#" className="mobile_sale">
                  <Image
                    height={400}
                    width={400}
                    src="/assets/images/sp/iphone/iphoneSE.jpg"
                    alt=""
                  />
                  <div className="right_info">
                    <p className="mobile_name">Điện thoại Iphone SE 2</p>
                    <p className="mobile_paid">
                      17.550.000đ <s>19.550.000đ</s>
                    </p>
                  </div>
                  <span className="sale">-10%</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
