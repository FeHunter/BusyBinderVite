import style from "./Buttons.module.css";

export function ButtonToBuy ({label, onclick}){
    return <button className={style.buttonToBuy} onClick={onclick}>{label}</button>
}