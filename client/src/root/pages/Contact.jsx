const Contact = () => {
    return (
        <>
            <section className="breadcrumb-section set-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Thông tin liên hệ</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_phone"></span>
                                <h4>Điện thoại</h4>
                                <p>+01-3-8888-6868</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_pin_alt"></span>
                                <h4>Địa chỉ</h4>
                                <p>Huyện Hoài Đức, Thành Phố Hà Nội</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_clock_alt"></span>
                                <h4>Giờ mở cửa</h4>
                                <p>10:00 am to 23:00 pm</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_mail_alt"></span>
                                <h4>Email</h4>
                                <p>hello@colorlib.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="map container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1862.8034346309478!2d105.72099151562719!3d20.968297071900448!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1718531888567!5m2!1svi!2s"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="map-inside">
                    <i className="icon_pin"></i>
                    <div className="inside-widget">
                        <h4>Hà Nội</h4>
                        <ul>
                            <li>Phone: +12-345-6789</li>
                            <li>Add: Huyện Hoài Đức, Thành Phố Hà Nội</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
