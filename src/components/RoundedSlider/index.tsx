import CirclePoint from "@components/CirclePoint";
import gsap from "gsap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import { EventItem } from "../../types";
import "./RoundedSlider.scss";

interface Props {
  events: EventItem[];
  size?: number;
  swiperRef: React.RefObject<SwiperCore>;
  active: number;
  setActive: (idx: number) => void;
}

const OFFSET_ANGLE = 60;
const ANIM_DURATION = 0.3;

export const RoundedSlider: React.FC<Props> = ({
  events,
  size = 530,
  swiperRef,
  active,
  setActive,
}) => {
  const circleSvg = useRef<SVGSVGElement>(null);
  const prevActive = useRef(active);
  const [rotation, setRotation] = useState(0);
  const labelRef = useRef<SVGTextElement>(null);

  const r = size / 2;
  const cx = r;
  const cy = r;

  useEffect(() => {
    const svg = circleSvg.current;
    if (!svg) return;
    const total = events.length;
    const baseAngle = (360 / total) * active - 90;
    const rot = -baseAngle - OFFSET_ANGLE;
    setRotation(rot);
    gsap.to(svg, {
      rotation: rot,
      transformOrigin: "50% 50%",
      ease: "power1.out",
    });

    const groups = svg.querySelectorAll<SVGGElement>("g.circle-point");
    const prev = prevActive.current;
    animatePoint(groups[prev], { r: 3, fill: "#42567A", opacity: 0 });
    animatePoint(groups[active], { r: 28, fill: "#F4F5F9", opacity: 1 });
    prevActive.current = active;
  }, [active, events.length]);

  // Fade-in label
  useEffect(() => {
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.3 }
      );
    }
  }, [active]);

  const handleSlide = useCallback(
    (idx: number) => {
      setActive(idx);
      swiperRef.current?.slideTo(idx);
    },
    [setActive, swiperRef]
  );

  const handleHover = useCallback((idx: number) => {
    const svg = circleSvg.current;
    if (!svg) return;
    animatePoint(svg.querySelectorAll<SVGGElement>("g.circle-point")[idx], {
      r: 28,
      fill: "#F4F5F9",
      opacity: 1,
    });
  }, []);

  const handleUnhover = useCallback(
    (idx: number) => {
      const svg = circleSvg.current;
      if (!svg) return;
      const keep = idx === active;
      animatePoint(svg.querySelectorAll<SVGGElement>("g.circle-point")[idx], {
        r: keep ? 28 : 3,
        fill: keep ? "#F4F5F9" : "#42567A",
        opacity: keep ? 1 : 0,
      });
    },
    [active]
  );

  return (
    <div className="rounded-slider">
      <svg
        ref={circleSvg}
        className="circle-wrapper"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={2} />
        {events.map((evt, i) => {
          const theta = (2 * Math.PI * i) / events.length - Math.PI / 2;
          const x = cx + r * Math.cos(theta);
          const y = cy + r * Math.sin(theta);
          return (
            <CirclePoint
              key={i}
              index={i}
              x={x}
              y={y}
              isActive={i === active}
              rotationAngle={rotation}
              title={evt.title}
              labelRef={
                i === active
                  ? (labelRef as React.RefObject<SVGTextElement>)
                  : undefined
              }
              onClick={() => handleSlide(i)}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleUnhover(i)}
            />
          );
        })}
      </svg>

      <Swiper
        modules={[Navigation]}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.realIndex)}
        slidesPerView={1}
      />
    </div>
  );
};

// Helper for animating one point group
function animatePoint(
  group: SVGGElement | undefined,
  opts: { r: number; fill: string; opacity: number }
) {
  if (!group) return;
  const circle = group.querySelector("circle");
  const text = group.querySelector("text");
  if (circle)
    gsap.to(circle, {
      r: opts.r,
      fill: opts.fill,
      duration: ANIM_DURATION,
      ease: "power1.out",
    });
  if (text) gsap.to(text, { opacity: opts.opacity, duration: ANIM_DURATION });
}
