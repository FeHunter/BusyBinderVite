import { useState } from "react"
import PagesRoutes from "../../assets/PagesRoutes"
import { ButtonToFooter } from "../Buttons/Buttons"
import { LinkToPage } from "../Link/LinkToPage"
import { LogoFooter } from "../Logo/Logo"
import style from "./Footer.module.css"
import { firebaseRoutes, loadFromtFirebase } from "../../assets/Firebase"

export function Footer (){

    const [socialLinks, setSocialLinks] = useState({})
    const [contacts, setContacts] = useState({})

    useState(()=>{
        loadLinks()
        loadContacts()
    }, [])

    async function loadLinks (){
        const data = await loadFromtFirebase(firebaseRoutes.socialNetworks, false)
        setSocialLinks(data)
    }

    async function loadContacts (){
        const data = await loadFromtFirebase(firebaseRoutes.contacts, false)
        setContacts(data)
    }

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
                <ButtonToFooter label={contacts.email} />
                <ButtonToFooter label={contacts.phone1} />
                <ButtonToFooter label={contacts.phone2} />
                <div className={style.socialNetworkLinks}>
                    <a href={socialLinks.instagram} target="_blank"><i class="fa-brands fa-instagram"></i></a>
                    <a href={socialLinks.facebook} target="_blank"><i class="fa-brands fa-facebook"></i></a>
                    <a href={socialLinks.tiktok} target="_blank"><i class="fa-brands fa-tiktok"></i></a>
                </div>
            </div>
        </footer>
    )
}