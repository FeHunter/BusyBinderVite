import style from "./LinkToPage.module.css";
import { Link } from "react-router-dom";

export function LinkToPage ({ children, to }){
    const fixScroll = () => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }
    return <Link className={style.link} onClick={fixScroll} to={to}>{children}</Link>
}