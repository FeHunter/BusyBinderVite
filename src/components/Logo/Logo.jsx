import style from "./Logo.module.css"

export function Logo ({onClick}){
    return <img src="./src/Images/Busybinder-logo.png" alt="BudyBinder Logo" onClick={onClick} className={style.logo}/>
}

export function LogoFooter ({onClick}){
    return <img src="./src/Images/Busybinder-logo.png" alt="BudyBinder Logo" onClick={onClick} className={style.logoFooter}/>
}