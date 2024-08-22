import { useState } from "react"
import style from "./SliderShow.module.css"

export function SliderShow ({contentToShow}) {

    const [itens, setItens] = useState(contentToShow ? contentToShow : [])
    const [index, setIndex] = useState(0)

    const previusSlider = () => {
        
    }

    return (
        <section className={style.sliderShow}>
            <div className={style.left}><i class="fa-solid fa-chevron-left"></i></div>
            <div className={style.center}>
                {
                    itens != null ?
                        itens[index]
                    :
                        <></>
                }
            </div>
            <div className={style.right}><i class="fa-solid fa-chevron-right"></i></div>
        </section>
    )
}
