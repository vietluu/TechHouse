export default function Footer() {
  return (
    <footer>
      <div className="columns-3 sm:columns-1 delivery">
        <div className="delivery_content ">
          <div className="delivery_content-img mg-0 pd-3">
            <img src="./assets/Image/policy_icon_1.png" alt="" />
          </div>

          <div className="delivery_content-tilte ">
            <h5>Giao hàng nhanh chóng.</h5>
            <p>Miễn phí với đơn hàng trên 3 triệu.</p>
          </div>
        </div>
        <div className="delivery_content ">
          <div className="delivery_content-img mg-0 pd-3 ">
            <img src="/assets/Image/policy_icon_2.png" alt="" />
          </div>

          <div className="delivery_content-tilte">
            <h5>Chính sách bảo hành</h5>
            <p>Bảo hành 12 tháng, đổi trả 15 ngày.</p>
          </div>
        </div>
        <div className="delivery_content ">
          <div className="delivery_content-img mg-0 pd-3 ">
            <img src="/assets/Image/policy_icon_3.png" alt="" />
          </div>

          <div className="delivery_content-tilte">
            <h5>Hỗ trợ 24/7</h5>
            <p>Với các kênh chat, email & phone</p>
          </div>
        </div>
      </div>
      <div className="column-1 px-3">
        <div className="grid grid-cols-3 sm:grid-cols-1 sm:w-full text-left">
          <div className="px-4 sm:p-0 footer__content1">
            <h4 className="pd-3 text-main "> Giới thiệu</h4>
            <div className="p-2 columns-1 p-1">
              <p className="px-9 text-center lg:px-2 ">
                Trang mua sắm trực tuyến của thương hiệu Apple ,phụ kiện, giúp
                bạn tiếp cận xu hướng công nghệ mới nhất.
              </p>
              <img
                className="p-1 max-w-xs "
                src="/assets/Image/logo_bocongthuong.png"
                alt=""
              />
            </div>
          </div>

          <div className="sm:w-full  footer__content2">
            <h4 className="text-main">Liên kết</h4>

            <ul className="sm:w-full p-1">
              <li className="p-1">
                <a href="#">
                  {' '}
                  <i className="fas fa-arrow-right"></i> Tìm Kiếm
                </a>
              </li>
              <li className="p-1">
                <a href="#">
                  {' '}
                  <i className="fas fa-arrow-right"></i> Chính sách đổi trả
                </a>
              </li>
              <li className="p-1">
                <a href="#">
                  {' '}
                  <i className="fas fa-arrow-right"></i> Chính sách bảo mật
                </a>
              </li>
              <li className="p-1">
                <a href="#">
                  {' '}
                  <i className="fas fa-arrow-right"></i> Tìm Kiếm
                </a>
              </li>
              <li className="p-1">
                <a href="#">
                  {' '}
                  <i className="fas fa-arrow-right"></i> Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>

          <div className="  sm:w-full  footer__content3">
            <h4 className="pd-1 text-main">Thông tin liên hệ</h4>

            <ul className="p-1 sm:w-full">
              <li className="pd-1">
                <i className="pd-1 fas fa-map-marker-alt"></i>
                <span>TechHouse - Thanh Xuân, Hà Nội</span>
              </li>
              <li className="pd-1">
                <i className="pd-1 fas fa-phone-alt"></i>
                <span>0123.456.789</span>
              </li>
              <li className="pd-1">
                <i className="pd-1 fas fa-envelope"></i>
                <span>hellomyphen@gmail.com</span>
              </li>
            </ul>

            <ul className="social row c-12 pd-3">
              <li className="pd-1">
                <i className="fab fa-facebook-f fa-2x"></i>
              </li>
              <li className="pd-1">
                <i className="fab fa-twitter fa-2x"></i>
              </li>
              <li className="pd-1">
                <i className="fab fa-instagram fa-2x"></i>
              </li>
              <li className="pd-1">
                <i className="fab fa-youtube fa-2x"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <span style={{ color: 'rgb(141, 141, 141)' }}>
          copyright &copy 2022 - design by VNSA
        </span>
      </div>
    </footer>
  );
}
