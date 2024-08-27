import { useEffect, useState } from "react"
import style from "./SliderShow.module.css"
import { ProdcutCard } from "../ProdcutCard/ProdcutCard"

/*
product = bool
gallery = bool
*/

export function SliderShow ({contentToShow, product, gallery}) {

    const [index, setIndex] = useState(0)
    const [currentItem, setCurrentItem] = useState({})
    const [animation, setAnimation] = useState(style.sliderContent)

    useEffect(()=>{
        setCurrentItem(contentToShow[index])
        // console.log(contentToShow)
    }, [contentToShow, index])

    const previousSlide = () => {
        setTimeout(() => {
            if (index > 0){
                setIndex((index) => index -= 1)
            }else {
                setIndex(contentToShow.length-1)
            }
        }, 300);
        animationSliderLeft()
    }
    const nextSlider = () => {
        setTimeout(() => {
            if (index < contentToShow.length-1){
                setIndex((index) => index += 1)
            } else {
                setIndex(0)
            }
        }, 300);
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
                        product == true ? <ProdcutCard item={currentItem} />
                        : gallery == true ? (<>
                            <img src={contentToShow[index]} className={style.sliderImages}  />
                            <img src={contentToShow[index+1]} className={style.sliderImages}  />
                            <img src={contentToShow[index+2]} className={style.sliderImages}  />
                        </>) : <></>
                    :
                        <></>
                }
              </div>
            </div>
            <div className={style.right} onClick={nextSlider}><i class="fa-solid fa-chevron-right"></i></div>
        </section>
    )
}
