"use client";

import { motion, useReducedMotion } from "motion/react";
import { cardHover } from "@/lib/motion";

// Card hover: nâng nhẹ + đổ shadow mượt, không gây vỡ grid.
export default function MotionHoverCard({
  as: Tag = "div",
  className,
  children,
  lift = true,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Comp = motion[Tag] || motion.div;

  if (reduceMotion || !lift) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Comp
      className={className}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      {...rest}
    >
      {children}
    </Comp>
  );
}
