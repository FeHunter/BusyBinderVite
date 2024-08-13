import style from "./Buttons.module.css";

export function ButtonToBuy ({label, onclick}){
    return <button className={style.buttonToBuy} onClick={onclick}>{label}</button>
}

export function ButtonToDelete ({icon, onClick}){
    return <button className={style.buttonToDelete} onclick={onClick}>{icon}</button>
}