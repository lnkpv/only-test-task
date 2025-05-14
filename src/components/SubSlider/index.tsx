import React, { useEffect, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventItemData } from "../../types";
import "./SubSlider.scss";

interface SubSliderProps {
  subSwiperDivRef: React.RefObject<HTMLDivElement>;
  subSwiperRef: React.RefObject<SwiperCore>;
  data: EventItemData[];
}

const SubSlider = ({ subSwiperDivRef, subSwiperRef, data }: SubSliderProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={subSwiperDivRef}>
      <Swiper
        navigation={!isMobile}
        pagination={isMobile ? { clickable: true } : false}
        modules={[Navigation, Pagination]}
        slidesPerView={"auto"}
        grabCursor={true}
        spaceBetween={isMobile ? 25 : 80}
        onSwiper={(swiper) => {
          subSwiperRef.current = swiper;
        }}
      >
        {data.map((e, idx) => (
          <SwiperSlide key={idx} className={idx % 2 !== 0 ? "odd" : ""}>
            <h3 className="year-item">{e.year}</h3>
            <p className="desc-item">{e.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SubSlider;
