import { Link } from "react-router-dom";
import style from "./Buttons.module.css";

export function ButtonToBuy ({label, onclick}){
    return <button className={style.buttonToBuy} onClick={onclick}>{label}</button>
}

export function ButtonToDelete ({onClick}){
    return <button className={style.buttonToDelete} onclick={onClick}><i class="fa-solid fa-trash"></i></button>
}

export function ButtonToConfirm ({icon, onClick}){
    return <button className={style.buttonToConfirm} onclick={onClick}>{icon}</button>
}

export function ButtonToFooter ({label, navegateTo}){
    return <Link className={style.buttonToFooter} to={navegateTo}><p>{label}</p></Link>
}