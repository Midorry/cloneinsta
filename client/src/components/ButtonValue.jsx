import $ from "jquery";
import { useState } from "react";

export const ButtonValue = () => {
    const [count, setCount] = useState(0);
    const handleOnClickInc = (e) => {
        const button = $(".value");
        const check = $(".qtybtn");
        const oldValue = button.val();
        let newVal = parseFloat(oldValue);
        if (check.hasClass("inc")) {
            newVal = newVal + 1;
        }
        setCount(newVal);
    };
    const handleOnClickDec = (e) => {
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
        setCount(newVal);
    };
    return (
        <div className="pro-qty">
            <span className="dec qtybtn" onClick={handleOnClickDec}>
                -
            </span>
            <input className="value" type="input" value={count} />
            <span className="inc qtybtn" onClick={handleOnClickInc}>
                +
            </span>
        </div>
    );
};
