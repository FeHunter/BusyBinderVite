import PagesRoutes from "../../assets/PagesRoutes"
import { ButtonToFooter } from "../Buttons/Buttons"
import { LinkToPage } from "../Link/LinkToPage"
import { LogoFooter } from "../Logo/Logo"
import style from "./Footer.module.css"

export function Footer (){
    return (
        <footer className={style.footerContent}>
            <div className={style.logoContent}>
                <LogoFooter/>
            </div>
            <div className={style.sectionContent}>
                <p className={style.footerTitle}>Informations</p>
                <ButtonToFooter label={"About me"} to={PagesRoutes.HomePage} />
                <ButtonToFooter label={"Contacts"} to={PagesRoutes.HomePage} />
                <ButtonToFooter label={"Delivery and Payment"} to={PagesRoutes.HomePage} />
            </div>
            <div className={style.sectionContent}>
                <p className={style.footerTitle}>Contacts</p>
                <ButtonToFooter label={"busybinder@gmail.com"} />
                <ButtonToFooter label={"+ 00 (00) 100-10-10"} />
                <ButtonToFooter label={"+ 00 (00) 100-10-10"} />
            </div>
        </footer>
    )
}