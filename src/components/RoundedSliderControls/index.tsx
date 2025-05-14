import React from "react";
import SwiperCore from "swiper";
import { EventItem } from "../../types";
import "./RoundedSliderControls.scss";

interface RoundedSliderControlsProps {
  activeYears: number;
  events: EventItem[];
  setActiveYears: (years: number) => void;
  swiperRef: React.RefObject<SwiperCore>;
}

const RoundedSliderControls = ({
  activeYears,
  events,
  setActiveYears,
  swiperRef,
}: RoundedSliderControlsProps) => {
  return (
    <div className="slider-controls">
      <div className="slider-controls-text">
        0{activeYears + 1}/0{events.length}
      </div>
      <div className="slider-controls-buttons">
        <button
          className="prev"
          disabled={activeYears === 0}
          onClick={() => {
            swiperRef.current?.slidePrev();
            setActiveYears(activeYears - 1);
          }}
        >
          <svg
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" />
          </svg>
        </button>
        <button
          className="next"
          disabled={activeYears === events.length - 1}
          onClick={() => {
            swiperRef.current?.slideNext();
            setActiveYears(activeYears + 1);
          }}
        >
          <svg
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RoundedSliderControls;
