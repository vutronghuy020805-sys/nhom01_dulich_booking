"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeInUp, viewportOnce } from "@/lib/motion";

// Reveal on scroll — fade + slide up nhẹ khi vào viewport. Một lần.
// Tôn trọng `prefers-reduced-motion`.
export default function MotionReveal({
  as: Tag = "div",
  variants,
  className,
  children,
  delay = 0,
  viewport = viewportOnce,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Comp = motion[Tag] || motion.div;
  const effective = variants || fadeInUp;

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={effective}
      transition={delay ? { ...effective.visible?.transition, delay } : undefined}
      {...rest}
    >
      {children}
    </Comp>
  );
}
