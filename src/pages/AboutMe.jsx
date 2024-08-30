import { useState } from "react"
import { Footer } from "../components/Footer/Footer"
import { Header } from "../components/Header/Header"
import style from "./AboutMe.module.css"
import { firebaseRoutes, loadFromtFirebase } from "../assets/Firebase"
import { useEffect } from "react"
import { SliderShow } from "../components/SliderShow/SliderShow"

export function AboutMe (){

    useEffect(()=>{
        loadAboutMeText()
    },[])

    // ABOUT ME TEXT
    const [aboutMeText, setAboutMeText] = useState(null)
    async function loadAboutMeText (){
        const data = await loadFromtFirebase(firebaseRoutes.aboutMeTxt, false)
        setAboutMeText(data)
        console.log(data)
    }

    return (
        <>
            <Header/>
            <section className={style.aboutMe}>
                <div className={style.presentationContent}>
                    <img className={style.presentationImage} src="src/Images/About_Pic.jpg" alt="busy binder image" />
                    <div className={style.presentationTextContent}>
                        <h2>A few words about me</h2>
                        {
                            aboutMeText ?
                                aboutMeText.description
                            :
                                <p><i class="fa-solid fa-gear"></i> working on that...</p>
                        }
                    </div>
                </div>
                <div className={style.sliderContent}>
                    <h2>Photo Gallery</h2>
                    <SliderShow gallery={true} contentToShow={'f'} />
                </div>
            </section>
            <Footer/>
        </>
    )
}