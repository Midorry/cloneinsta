import $ from "jquery";

export const ShoppingCart = () => {
    const handleOnClickInc1 = () => {
        const button1 = $(".value1");
        const check1 = $(".qtybtn1");
        const oldValue1 = button1.val();
        let newVal1 = parseFloat(oldValue1);
        if (check1.hasClass("inc")) {
            newVal1 = newVal1 + 1;
            button1.val(newVal1);
        }
    };
    const handleOnClickDec1 = () => {
        const button = $(".value");
        const check = $(".qtybtn");
        const oldValue = button.val();
        let newVal = parseFloat(oldValue);
        if (check.hasClass("dec")) {
            if (oldValue > 0) {
                newVal = newVal - 1;
            } else {
                newVal = 0;
            }
        }
        button.val(newVal);
    };
    const handleOnClickInc2 = () => {
        const button2 = $(".value2");
        const check2 = $(".qtybtn2");
        const oldValue2 = button2.val();
        let newVal2 = parseFloat(oldValue2);
        if (check2.hasClass("inc")) {
            newVal2 = newVal2 + 1;
            button2.val(newVal2);
        }
    };
    const handleOnClickDec2 = () => {
        const button = $(".value");
        const check = $(".qtybtn");
        const oldValue = button.val();
        let newVal = parseFloat(oldValue);
        if (check.hasClass("dec")) {
            if (oldValue > 0) {
                newVal = newVal - 1;
            } else {
                newVal = 0;
            }
        }
        button.val(newVal);
    };
    const handleOnClickInc3 = () => {
        const button3 = $(".value3");
        const check3 = $(".qtybtn3");
        const oldValue3 = button3.val();
        let newVal3 = parseFloat(oldValue3);
        if (check3.hasClass("inc")) {
            newVal3 = newVal3 + 1;
            button3.val(newVal3);
        }
    };
    const handleOnClickDec3 = () => {
        const button = $(".value");
        const check = $(".qtybtn");
        const oldValue = button.val();
        let newVal = parseFloat(oldValue);
        if (check.hasClass("dec")) {
            if (oldValue > 0) {
                newVal = newVal - 1;
            } else {
                newVal = 0;
            }
        }
        button.val(newVal);
    };
    return (
        <div>
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">
                                                Products
                                            </th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="shoping__cart__item">
                                                <img
                                                    src="img/cart/cart-1.jpg"
                                                    alt=""
                                                />
                                                <h5>Vegetable’s Package</h5>
                                            </td>
                                            <td className="shoping__cart__price">
                                                $55.00
                                            </td>
                                            <td className="shoping__cart__quantity">
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <span
                                                            className="dec qtybtn1"
                                                            onClick={
                                                                handleOnClickDec1
                                                            }
                                                        >
                                                            -
                                                        </span>
                                                        <input
                                                            className="value1"
                                                            type="input"
                                                            value="1"
                                                        />
                                                        <span
                                                            className="inc qtybtn1"
                                                            onClick={
                                                                handleOnClickInc1
                                                            }
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="shoping__cart__total">
                                                $110.00
                                            </td>
                                            <td className="shoping__cart__item__close">
                                                <span className="icon_close"></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="shoping__cart__item">
                                                <img
                                                    src="img/cart/cart-2.jpg"
                                                    alt=""
                                                />
                                                <h5>Fresh Garden Vegetable</h5>
                                            </td>
                                            <td className="shoping__cart__price">
                                                $39.00
                                            </td>
                                            <td className="shoping__cart__quantity">
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <span
                                                            className="dec qtybtn2"
                                                            onClick={
                                                                handleOnClickDec2
                                                            }
                                                        >
                                                            -
                                                        </span>
                                                        <input
                                                            className="value2"
                                                            type="input"
                                                            value="1"
                                                        />
                                                        <span
                                                            className="inc qtybtn2"
                                                            onClick={
                                                                handleOnClickInc2
                                                            }
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="shoping__cart__total">
                                                $39.99
                                            </td>
                                            <td className="shoping__cart__item__close">
                                                <span className="icon_close"></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="shoping__cart__item">
                                                <img
                                                    src="img/cart/cart-3.jpg"
                                                    alt=""
                                                />
                                                <h5>Organic Bananas</h5>
                                            </td>
                                            <td className="shoping__cart__price">
                                                $69.00
                                            </td>
                                            <td className="shoping__cart__quantity">
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <span
                                                            className="dec qtybtn3"
                                                            onClick={
                                                                handleOnClickDec3
                                                            }
                                                        >
                                                            -
                                                        </span>
                                                        <input
                                                            className="value3"
                                                            type="input"
                                                            value="1"
                                                        />
                                                        <span
                                                            className="inc qtybtn3"
                                                            onClick={
                                                                handleOnClickInc3
                                                            }
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="shoping__cart__total">
                                                $69.99
                                            </td>
                                            <td className="shoping__cart__item__close">
                                                <span className="icon_close"></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__btns">
                                <a href="#" className="primary-btn cart-btn">
                                    CONTINUE SHOPPING
                                </a>
                                <a
                                    href="#"
                                    className="primary-btn cart-btn cart-btn-right"
                                >
                                    <span className="icon_loading"></span>
                                    Upadate Cart
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__continue">
                                <div className="shoping__discount">
                                    <h5>Discount Codes</h5>
                                    <form action="#">
                                        <input
                                            type="text"
                                            placeholder="Enter your coupon code"
                                        />
                                        <button
                                            type="submit"
                                            className="site-btn"
                                        >
                                            APPLY COUPON
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>Cart Total</h5>
                                <ul>
                                    <li>
                                        Subtotal <span>$454.98</span>
                                    </li>
                                    <li>
                                        Total <span>$454.98</span>
                                    </li>
                                </ul>
                                <a href="#" className="primary-btn">
                                    PROCEED TO CHECKOUT
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
