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
                <LinkToPage children={<p>About me</p>} to={PagesRoutes.AboutMe} />
                <LinkToPage children={<p>Contacts</p>} to={PagesRoutes.Contacts} />
                <LinkToPage children={<p>Delivery and Payment</p>} to={PagesRoutes.AboutMe} />
            </div>
            <div className={style.sectionContent}>
                <p className={style.footerTitle}>Contacts</p>
                <ButtonToFooter label={"busybinder@gmail.com"} />
                <ButtonToFooter label={"+ 00 (00) 100-10-10"} />
                <ButtonToFooter label={"+ 00 (00) 100-10-10"} />
                <div className={style.socialNetworkLinks}>
                    <a href="" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                    <a href="" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                    <a href="" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
                </div>
            </div>
        </footer>
    )
}