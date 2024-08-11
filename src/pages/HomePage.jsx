import titleText, { contentText } from "../assets/SiteText";
import { Header } from "../components/Header/Header";
import { ImagesContent } from "../components/ImagesContent/ImagesContent";
import { PageTitle } from "../components/PageTitle/PageTitle";
import { ProdcutCard } from "../components/ProdcutCard/ProdcutCard";
import style from "./HomePage.module.css";

export function HomePage (){
    return (
        <>
        <Header/>
        <section>
            <PageTitle title={titleText.pageTitle} />
            
            {/* Cover content - ABOUT */}
            <section>
                <div className={style.aboutUsContent}>
                    <ImagesContent src={"./src/Images/About_Pic.jpg"} alt={"About us image"} />
                    <p>{contentText.aboutUS}</p>
                </div>
            </section>

            {/* products Highlights */}
            <section className={style.highlightsProducts}>
                <ProdcutCard name={"Book 1"} price={12} imageSrc={"./src/Images/aux_book_1.png"} />
                <ProdcutCard name={"Book 2"} price={25} imageSrc={"./src/Images/aux_book_2.png"} />
                <ProdcutCard name={"Book 3"} price={34} imageSrc={"./src/Images/aux_book_3.png"} />
            </section>

        </section>
        </>
    );
}