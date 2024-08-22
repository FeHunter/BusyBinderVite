import { useEffect, useState } from "react"
import style from "./SliderShow.module.css"
import { ProdcutCard } from "../ProdcutCard/ProdcutCard"

export function SliderShow ({contentToShow}) {

    const [index, setIndex] = useState(0)
    const [currentItem, setCurrentItem] = useState({})
    const [animation, setAnimation] = useState(style.sliderContent)

    useEffect(()=>{
        setCurrentItem(contentToShow[index])
        // console.log(contentToShow)
    }, [contentToShow, index])

    const previousSlide = () => {
        if (index > 0){
            setIndex((index) => index -= 1)
        }else {
            setIndex(contentToShow.length-1)
        }
        animationSliderLeft()
    }
    const nextSlider = () => {
        if (index < contentToShow.length-1){
            setIndex((index) => index += 1)
        } else {
            setIndex(0)
        }
        animationSliderRight()
    }

    const animationSliderLeft = () => {
        // Start Animation
        setAnimation(style.animaitonComingRight)
        setTimeout(() => {
            setTimeout(() => {
                // End Animation
                setAnimation(style.sliderContent)
            }, 200);
        }, 200);
    }
    const animationSliderRight = () => {
        // Start Animation
        setAnimation(style.animaitonComingLeft)
        setTimeout(() => {
            setTimeout(() => {
                // End Animation
                setAnimation(style.sliderContent)
            }, 200);
        }, 200);
    }

    return (
        <section className={style.sliderShow}>
            <div className={style.left} onClick={previousSlide}><i class="fa-solid fa-chevron-left"></i></div>
            <div className={style.center}>
              <div className={animation}>
                {
                    currentItem ?
                        <ProdcutCard item={currentItem} />
                    :
                        <></>
                }
              </div>
            </div>
            <div className={style.right} onClick={nextSlider}><i class="fa-solid fa-chevron-right"></i></div>
        </section>
    )
}
