import { Link } from "react-router-dom";
import style from "./Buttons.module.css";

export function ButtonToBuy ({label, onClick}){
    return <button className={style.buttonToBuy} onClick={onClick}>{label}</button>
}

export function ButtonToDelete ({onClick}){
    return <button className={style.buttonToDelete} onClick={onClick}><i class="fa-solid fa-trash"></i></button>
}

export function ButtonToConfirm ({icon, type, onClick}){
    return <button className={style.buttonToConfirm} type={type} onClick={onClick}>{icon}</button>
}

export function ButtonToFooter ({label, navegateTo}){
    return <Link className={style.buttonToFooter} to={navegateTo}><p>{label}</p></Link>
}

export function ButtonListChange ({label, onClick}){
    return <button className={style.buttonListChange} onClick={onClick}>{label}</button>
}

export function ButtonAdmHeader ({label, onClick}){
    return <button className={style.buttonAdmHeader} onClick={onClick} >{label}</button>
}

export function ButtonFormValidation ({isValid, onClick}){
    return <button className={style.ButtonFormValidation} type="submit">{
        !isValid
        ? <><i class="fa-regular fa-circle-xmark"></i> <p>Validate information</p></>
        : <i class="fa-regular fa-circle-check"></i>
    }</button>
}

export function ButtonWebLink ({label, icon, link}){
    return <a className={style.buttonWebLink} href={link} target="_blank">{icon}{label}</a>
}