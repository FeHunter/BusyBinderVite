import style from "./LinkToPage.module.css";
import { Link } from "react-router-dom";

export function LinkToPage ({ children, to }){
    return <Link className={style.link} to={to}>{children}</Link>
}