import style from "./Header.module.css";
import { motion } from "framer-motion";
import PagesRoutes from "../../assets/PagesRoutes";
import { Logo } from "../Logo/Logo";
import { LinkToPage } from "../Link/LinkToPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartIcon } from "../Cart/CartIcon/CartIcon";

export function Header () {

    const navigate = useNavigate();

    const [mobileMenu, setMobileMenu] = useState(false);

    // floating menu animation
    const menuVariants = {
        hidden: { x: "100%" },
        visible: { x: 0 },
    };

    const cartIconSVG = <svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>

    return (
        <header className={style.header}>
            {/* Logo */}
            <Logo onClick={()=>{ navigate(PagesRoutes.HomePage) }} />
            {/* button mobile */}
            <div className={style.mobileContent}>
                <CartIcon/>
                <div className={style.buttons} onClick={() => { setMobileMenu(!mobileMenu) }}>
                    =
                </div>
            </div>
            <div className={style.buttonsDesktop}>
                <LinkToPage to={PagesRoutes.HomePage}>Home</LinkToPage>
                <LinkToPage to={PagesRoutes.HomePage}>Albums</LinkToPage>
                <LinkToPage to={PagesRoutes.HomePage}>About Us</LinkToPage>
                <LinkToPage to={PagesRoutes.HomePage}>Contacts</LinkToPage>
                <LinkToPage to={PagesRoutes.RegisterProduct}>Add new Product</LinkToPage>
            </div>
            {/* cart */}
            <div className={style.cart}>
                <CartIcon/>
            </div>

            {/* floating window */}
            <motion.div
                className={style.floatWindow}
                style={{
                    position: 'absolute',
                    display: mobileMenu ? 'flex' : 'none',
                    flexDirection: 'column',
                    width: '90%',
                    height: '100%',
                    top: 0,
                    right: 0,
                    background: 'whitesmoke'
                }}
                initial="hidden"
                animate={mobileMenu ? "visible" : "hidden"}
                variants={menuVariants}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 150,
                }}
            >
                <div className={style.buttons} onClick={() => { setMobileMenu(!mobileMenu) }}>
                    =
                </div>
                <div className={style.buttonsMobileMenu}>
                    <span className={style.buttonsMobileMenuLink}><LinkToPage to={PagesRoutes.HomePage}>Home</LinkToPage></span>
                    <span className={style.buttonsMobileMenuLink}><LinkToPage to={PagesRoutes.HomePage}>Albums</LinkToPage></span>
                    <span className={style.buttonsMobileMenuLink}><LinkToPage to={PagesRoutes.HomePage}>About Us</LinkToPage></span>
                    <span className={style.buttonsMobileMenuLink}><LinkToPage to={PagesRoutes.HomePage}>Contacts</LinkToPage></span>
                    <span className={style.buttonsMobileMenuLink}><LinkToPage to={PagesRoutes.RegisterProduct}>Add new Product</LinkToPage></span>
                </div>
            </motion.div>
        </header>
    );
}
