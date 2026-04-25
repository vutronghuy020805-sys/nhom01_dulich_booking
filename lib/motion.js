// Motion language dùng chung cho VieGo.
// Giữ tất cả variants / timing ở một chỗ để toàn site có cùng cảm giác.

export const EASE_OUT = [0.16, 1, 0.3, 1]; // smooth out cho reveal
export const EASE_IN_OUT = [0.45, 0, 0.55, 1];

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export const slideDown = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

export const staggerItem = fadeInUp;

// Hover cho card: nâng nhẹ + tăng shadow. Dùng cùng `whileHover` trên `<motion.*>`.
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.015,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
};

// Tap feedback cho CTA.
export const buttonTap = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.18, ease: EASE_OUT },
};

// Viewport options mặc định — animate một lần khi vào viewport.
export const viewportOnce = { once: true, amount: 0.15 };
