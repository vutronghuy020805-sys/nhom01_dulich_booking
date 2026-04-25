"use client";

import { useEffect, useRef } from "react";

/*
  Video hero chạy loop liền mạch.

  Kỹ thuật chống khựng khi loop:
  - `timeupdate`: khi còn ~0.15s nữa là hết, chủ động đưa currentTime về 0.
    Browser native `loop` thường có 1 khoảng rebuffer nhỏ ở điểm nối -> nhảy
    sớm hơn 1 tí sẽ giấu được khoảng đó.
  - `ended`: fallback, nếu timeupdate chưa kịp bắt thì seek về 0 và play lại.
  - Component là client-only nhưng KHÔNG có state thay đổi -> video chỉ mount 1
    lần, không re-render, không seek lại.

  Lưu ý: loop thực sự liền mạch chỉ đạt 100% khi file video được cắt seamless
  (khung cuối nối khít khung đầu). Nếu vẫn còn cảm giác "nhảy", nguyên nhân là
  nội dung video, không phải code.

  Gợi ý tối ưu file (ngoài code):
    - Cắt seamless, độ dài 10-20s
    - Nén H.264, bitrate 2-4 Mbps
    - Resolution tối đa 1920x1080
    - Bỏ audio track (đã muted nhưng audio decoder vẫn tốn tài nguyên)
*/
export default function HeroVideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    play();

    const handleTimeUpdate = () => {
      if (!video.duration || !isFinite(video.duration)) return;
      if (video.duration - video.currentTime <= 0.15) {
        video.currentTime = 0;
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      play();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      poster="/nhom01_dulich_booking/videos/hero-poster.jpg"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    >
      <source src="/nhom01_dulich_booking/videos/home-hero.mp4" type="video/mp4" />
    </video>
  );
}
