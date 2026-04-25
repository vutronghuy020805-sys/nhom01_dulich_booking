"use client";

import { motion, useReducedMotion } from "motion/react";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function MotionStagger({
  as: Tag = "div",
  className,
  children,
  container = staggerContainer,
  viewport = viewportOnce,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Comp = motion[Tag] || motion.div;

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
      variants={container}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function MotionStaggerItem({
  as: Tag = "div",
  className,
  children,
  variants = staggerItem,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Comp = motion[Tag] || motion.div;

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Comp className={className} variants={variants} {...rest}>
      {children}
    </Comp>
  );
}
