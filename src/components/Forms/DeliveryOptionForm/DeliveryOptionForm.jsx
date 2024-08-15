import { useState } from "react";
import style from "./DeliveryOptionForm.module.css"

export function DeliveryOptionForm ({getOption}){

    const [delivery, setDelivery] = useState(true);

    const ChangeState = () => {
        setDelivery(!delivery);
        getOption(!delivery);
    }

    return (
        <div className={style.formContent}>
            <div className={style.optionContent}>
                <label htmlFor="delivery">Delivery</label>
                <input type="checkbox" name="delivery" id="delivery"
                    checked={delivery}
                    onClick={ChangeState}
                />
            </div>
            <div className={style.optionContent}>
                <label htmlFor="pickUp">Pick Up</label>
                <input type="checkbox" name="pickUp" id="pickUp"
                    checked={!delivery}
                    onClick={ChangeState}
                />
            </div>
        </div>
    );
}