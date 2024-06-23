export const Footer = () => {
    return (
        <footer className="footer spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__about__logo">
                                <a href="./index.html">
                                    <img src="img/logo.png" alt=""></img>
                                </a>
                            </div>
                            <ul>
                                <li>Địa chỉ: Hoài Đức, Hà Nội, Việt Nam</li>
                                <li>Phone: +65 11.188.888</li>
                                <li>Email: hello@colorlib.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                        <div className="footer__widget">
                            <h6>Useful Links</h6>
                            <ul>
                                <li>
                                    <a href="#">About Us</a>
                                </li>
                                <li>
                                    <a href="#">About Our Shop</a>
                                </li>
                                <li>
                                    <a href="#">Secure Shopping</a>
                                </li>
                                <li>
                                    <a href="#">Delivery infomation</a>
                                </li>
                                <li>
                                    <a href="#">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#">Our Sitemap</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Who We Are</a>
                                </li>
                                <li>
                                    <a href="#">Our Services</a>
                                </li>
                                <li>
                                    <a href="#">Projects</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                                <li>
                                    <a href="#">Innovation</a>
                                </li>
                                <li>
                                    <a href="#">Testimonials</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="footer__widget">
                            <h6>Join Our Newsletter Now</h6>
                            <p>
                                Get E-mail updates about our latest shop and
                                special offers.
                            </p>
                            <div className="footer__widget__social">
                                <a href="#">
                                    <i className="fa fa-facebook"></i>
                                </a>
                                <a href="#">
                                    <i className="fa fa-instagram"></i>
                                </a>
                                <a href="#">
                                    <i className="fa fa-twitter"></i>
                                </a>
                                <a href="#">
                                    <i className="fa fa-pinterest"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
