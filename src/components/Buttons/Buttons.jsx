import { Link } from "react-router-dom";
import style from "./Buttons.module.css";

export function ButtonToBuy ({label, onClick}){
    return <button className={style.buttonToBuy} onClick={onClick}>{label}</button>
}

export function ButtonToDelete ({onClick}){
    return <button className={style.buttonToDelete} onClick={onClick}><i class="fa-solid fa-trash"></i></button>
}

export function ButtonToConfirm ({icon, onClick}){
    return <button className={style.buttonToConfirm} onClick={onClick}>{icon}</button>
}

export function ButtonToFooter ({label, navegateTo}){
    return <Link className={style.buttonToFooter} to={navegateTo}><p>{label}</p></Link>
}

export function ButtonListChange ({label, onClick}){
    return <button className={style.buttonListChange} onClick={onClick}>{label}</button>
}