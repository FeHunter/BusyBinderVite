import Slider from "react-slick"
import { Footer } from "../components/Footer/Footer"
import { Header } from "../components/Header/Header"
import style from "./AboutMe.module.css"

export function AboutMe (){
    return (
        <>
            <Header/>
            <section className={style.aboutMe}>
                <div className={style.presentationContent}>
                    <img className={style.presentationImage} src="src/Images/About_Pic.jpg" alt="busy binder image" />
                    <div className={style.presentationTextContent}>
                        <h2>A few words about me</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint earum, architecto ex, voluptate perspiciatis accusantium nemo, ea sed molestias dolorum ad reiciendis. Repellat nemo quibusdam fugiat aliquid veritatis deserunt. Laborum!</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint earum, architecto ex, voluptate perspiciatis accusantium nemo, ea sed molestias dolorum ad reiciendis. Repellat nemo quibusdam fugiat aliquid veritatis deserunt. Laborum!</p>
                    </div>
                </div>
                <div className={style.sliderContent}>
                    <h2>Photo Gallery</h2>
                    <Slider
                        className={style.sliderComponent}
                        settings={{
                            dots: true,
                            infinite: true,
                            speed: 50,
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }}
                    >
                        {
                            
                        }
                        <img className={style.sliderImage} src="src/Images/aux_book_1.png" />
                        <img className={style.sliderImage} src="src/Images/aux_book_2.png" />
                        <img className={style.sliderImage} src="src/Images/About_Pic.jpg" />
                    </Slider>
                </div>
            </section>
            <Footer/>
        </>
    )
}