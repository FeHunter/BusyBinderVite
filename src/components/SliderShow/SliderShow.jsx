import { useEffect, useState } from "react";
import style from "./SliderShow.module.css";
import { ProdcutCard } from "../ProdcutCard/ProdcutCard";

export function SliderShow({ contentToShow = [], product, gallery }) {
  const [index, setIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState({});
  const [animation, setAnimation] = useState(style.sliderContent);

  useEffect(() => {
    if (Array.isArray(contentToShow)) {
      setCurrentItem(contentToShow[index]);
    }
  }, [contentToShow, index]);

  const previousSlide = () => {
    animateSlider("left");
    setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : contentToShow.length - 1
      );
    }, 300);
  };

  const nextSlider = () => {
    animateSlider("right");
    setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < contentToShow.length - 1 ? prevIndex + 1 : 0
      );
    }, 300);
  };

  const animateSlider = (direction) => {
    setAnimation(
      direction === "left" ? style.animationComingRight : style.animationComingLeft
    );
    setTimeout(() => {
      setAnimation(style.sliderContent);
    }, 300);
  };

  const getNextThreeImages = () => {
    const total = contentToShow.length;
    const firstIndex = index;
    const secondIndex = (index + 1) % total;
    const thirdIndex = (index + 2) % total;

    return Array.isArray(contentToShow) ? [contentToShow[firstIndex], contentToShow[secondIndex], contentToShow[thirdIndex]] : [];
  };

  const handleDotClick = (dotIndex) => {
    setIndex(dotIndex);
  };

  return (
    <section className={style.sliderShow}>
      <div className={style.left} onClick={previousSlide}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div className={style.center}>
        <div className={animation}>
          {currentItem ? (
            product ? (
              <ProdcutCard item={currentItem} />
            ) : gallery ? (
              Array.isArray(getNextThreeImages()) && getNextThreeImages().map((imageSrc, i) => (
                <img key={i} src={imageSrc} className={style.sliderImages} />
              ))
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        {/* Adiciona os Pontinhos de Navegação */}
        <div className={style.navigationDots}>
            {Array.isArray(contentToShow) && contentToShow.map((_, dotIndex) => (
            <span
                key={dotIndex}
                className={`${style.dot} ${index === dotIndex ? style.activeDot : ""}`}
                onClick={() => handleDotClick(dotIndex)}
            ></span>
            ))}
        </div>
      </div>
      <div className={style.right} onClick={nextSlider}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </section>
  );
}
