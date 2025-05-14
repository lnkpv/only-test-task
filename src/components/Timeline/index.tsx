import { RoundedSlider } from "@components/RoundedSlider";
import RoundedSliderControls from "@components/RoundedSliderControls";
import SubSlider from "@components/SubSlider";
import events from "@data/events";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "./Timeline.scss";

export const Timeline: React.FC = () => {
  const [activeYears, setActiveYears] = useState(0);
  const subSwiperRef = useRef<SwiperCore | null>(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const subSwiperDivRef = useRef<HTMLDivElement>(null);

  const yearFrom = events[activeYears].yearFrom;
  const yearTo = events[activeYears].yearTo;

  const [displayFrom, setDisplayFrom] = useState(yearFrom);
  const [displayTo, setDisplayTo] = useState(yearTo);

  useEffect(() => {
    if (subSwiperDivRef.current) {
      gsap.fromTo(
        subSwiperDivRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.3, ease: "power1.out" }
      );
    }
  }, [activeYears]);

  useEffect(() => {
    const obj1 = { val: displayFrom };
    gsap.to(obj1, {
      val: yearFrom,
      duration: 0.5,
      roundProps: "val",
      ease: "none",
      onUpdate: () => setDisplayFrom(obj1.val),
    });

    const obj2 = { val: displayTo };
    gsap.to(obj2, {
      val: yearTo,
      duration: 0.5,
      roundProps: "val",
      ease: "none",
      onUpdate: () => setDisplayTo(obj2.val),
    });
  }, [yearFrom, yearTo]);

  return (
    <div className="timeline-container">
      <div className="grid-lines" />
      <div className="timeline">
        <div className="title-block">
          <div className="gradient-bar" />
          <h2 className="main-title">{"Исторические\nдаты"}</h2>
        </div>
        <div className="timeline-content">
          <RoundedSlider
            events={events}
            swiperRef={swiperRef as React.RefObject<SwiperCore>}
            active={activeYears}
            setActive={setActiveYears}
          />
          <div className="timeline-years">
            <span>{displayFrom}</span> <span>{displayTo}</span>
          </div>
          <div className="timeline-divider"></div>
        </div>
        <div className="timeline-controls">
          <RoundedSliderControls
            activeYears={activeYears}
            events={events}
            setActiveYears={setActiveYears}
            swiperRef={swiperRef as React.RefObject<SwiperCore>}
          />
          <SubSlider
            subSwiperDivRef={subSwiperDivRef as React.RefObject<HTMLDivElement>}
            subSwiperRef={subSwiperRef as React.RefObject<SwiperCore>}
            data={events[activeYears].data}
          />
        </div>
      </div>
    </div>
  );
};
