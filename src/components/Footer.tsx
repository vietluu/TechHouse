export default function Footer() {
    return (
        <footer>
        <div className="row delivery">
            <div className="delivery_content col c-4 ">
                <div className="delivery_content-img mg-0 pd-3">
                    <img src="./assets/Image/policy_icon_1.png" alt=""/>
                </div>

                <div className="delivery_content-tilte ">
                    <h5>Giao hàng nhanh chóng.</h5>
                    <p>Miễn phí với đơn hàng trên 3 triệu.</p>
                </div>

            </div>
            <div className="delivery_content col c-4 ">
                <div className="delivery_content-img mg-0 pd-3 ">
                    <img src="/assets/Image/policy_icon_2.png" alt=""/>
                </div>

                <div className="delivery_content-tilte">
                    <h5>Chính sách bảo hành</h5>
                    <p>Bảo hành 12 tháng, đổi trả 15 ngày.</p>
                </div>
            </div>
            <div className="delivery_content col c-4 ">
                <div className="delivery_content-img mg-0 pd-3 ">
                    <img src="/assets/Image/policy_icon_3.png" alt=""/>
                </div>

                <div className="delivery_content-tilte">
                    <h5>Hỗ trợ 24/7</h5>
                    <p>Với các kênh chat, email & phone</p>
                </div>
            </div>
        </div>
        <div className="">
            <div className="row text-left">
                <div className="col c-4  pd-3 footer__content1">
                    <h4 className="pd-3 text-main"> Giới thiệu</h4>
                    <div className="pd-1 ">
                        <p className="pd-1 ">Trang mua sắm trực tuyến của thương hiệu Apple ,phụ kiện, giúp bạn tiếp cận xu
                            hướng công nghệ mới nhất.</p>
                        <img className="pd-1 c-5" src="/assets/Image/logo_bocongthuong.png" alt=""/>
                    </div>
                </div>

                <div className="col c-4  pd-3  footer__content2">
                    <h4 className="pd-1 text-main">Liên kết</h4>

                    <ul className="mg-auto  pd-1">
                        <li className="pd-1"><a href="#"> <i className="fas fa-arrow-right"></i> Tìm Kiếm</a></li>
                        <li className="pd-1"><a href="#"> <i className="fas fa-arrow-right"></i> Chính sách đổi trả</a></li>
                        <li className="pd-1"><a href="#"> <i className="fas fa-arrow-right"></i> Chính sách bảo mật</a></li>
                        <li className="pd-1"><a href="#"> <i className="fas fa-arrow-right"></i> Tìm Kiếm</a></li>
                        <li className="pd-1"><a href="#"> <i className="fas fa-arrow-right"></i> Điều khoản dịch vụ</a></li>
                    </ul>

                </div>

                <div className="col c-4  pd-3  footer__content3">
                    <h4 className="pd-1 text-main">Thông tin liên hệ</h4>

                    <ul className="pd-1">
                        <li className="pd-1"><i className="pd-1 fas fa-map-marker-alt"></i><span>Khoa CNTT - 96 Định Công</span>
                        </li>
                        <li className="pd-1"><i className="pd-1 fas fa-phone-alt"></i><span>0123.456.789</span></li>
                        <li className="pd-1"><i className="pd-1 fas fa-envelope"></i><span>hellomyphen@gmail.com</span></li>
                    </ul>

                    <ul className="social row c-12 pd-3">
                        <li className="pd-1"><i className="fab fa-facebook-f fa-2x"></i></li>
                        <li className="pd-1"><i className="fab fa-twitter fa-2x"></i></li>
                        <li className="pd-1"><i className="fab fa-instagram fa-2x"></i></li>
                        <li className="pd-1"><i className="fab fa-youtube fa-2x"></i></li>
                    </ul>

                </div>


            </div>
        </div>
        <div className="copyright">
            <span style={{color: "rgb(141, 141, 141)"}}>copyright &copy 2022 - design by VNSA</span>
        </div>
    </footer>
    )
};
