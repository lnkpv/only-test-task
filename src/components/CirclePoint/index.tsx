import React from "react";
import "./CirclePoint.scss";

export interface CirclePointProps {
  index: number;
  x: number;
  y: number;
  isActive: boolean;
  rotationAngle: number;
  title: string;
  labelRef?: React.RefObject<SVGTextElement>;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CirclePoint: React.FC<CirclePointProps> = ({
  index,
  x,
  y,
  isActive,
  rotationAngle,
  title,
  labelRef,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <g
    className="circle-point"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ cursor: "pointer" }}
  >
    <circle
      cx={x}
      cy={y}
      r={isActive ? 28 : 3}
      fill={isActive ? "#F4F5F9" : "#42567A"}
      className={isActive ? "circle-point active" : "circle-point"}
    />
    <text
      x={x}
      y={y}
      dy=".35em"
      textAnchor="middle"
      fontSize="20px"
      pointerEvents="none"
      fill="#42567A"
      opacity={isActive ? 1 : 0}
      transform={`rotate(${-rotationAngle}, ${x}, ${y})`}
    >
      {index + 1}
    </text>
    {isActive && (
      <text
        ref={labelRef}
        x={x + 42}
        y={y}
        dy=".35em"
        className="label"
        fontSize="20px"
        fontWeight="700"
        fill="#42567A"
        transform={`rotate(${-rotationAngle}, ${x}, ${y})`}
      >
        {title}
      </text>
    )}
  </g>
);

export default CirclePoint;
