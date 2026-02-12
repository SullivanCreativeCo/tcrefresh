"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)");

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };

  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <a href={href || "#"} className={cn("relative group cursor-pointer", containerClassName)}>
      <div
        className={cn("relative w-full h-full", className)}
        style={{
          perspective: "1000px",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          style={{
            transform: transform,
            transformStyle: "preserve-3d",
            transition: "transform 400ms cubic-bezier(0.23, 1, 0.320, 1)",
          }}
          className="relative w-full h-full"
        >
          <div
            style={{
              transform: "translateZ(75px)",
              transformStyle: "preserve-3d",
            }}
          >
            {children}
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backfaceVisibility: "hidden",
              transform: "rotateX(90deg)",
              transformOrigin: "center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
      </div>
    </a>
  );
};
