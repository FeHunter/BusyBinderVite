import PagesRoutes from "../../assets/PagesRoutes";
import { localStorageRoutes } from "../../assets/localStorageRoutes";
import { ButtonAdmHeader } from "../../components/Buttons/Buttons";
import { Footer } from "../../components/Footer/Footer";
import { AddItemForm } from "../../components/Forms/AddItemForm/AddItemForm";
import { Header } from "../../components/Header/Header";
import { LinkToPage } from "../../components/Link/LinkToPage";
import style from "./AdmPage.module.css";

export function AdmPage (){

    return (
        <>
            <Header />
            <section className={style.admPage}>
                <LinkToPage to={PagesRoutes.RegisterProduct}><p>Add new Product</p></LinkToPage>
            </section>
            <Footer/>
        </>
    );
}