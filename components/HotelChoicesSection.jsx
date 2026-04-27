"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import HotelChoiceCard from "./HotelChoiceCard";

const cityTabs = [
  "Đà Nẵng",
  "Nha Trang",
  "Phan Thiết",
  "TP. Hồ Chí Minh",
  "Vũng Tàu",
  "Hà Nội",
  "Huế",
  "Đà Lạt",
  "Sa Pa",
  "Hội An",
  "Hạ Long",
  "Phú Quốc",
];

const cityToLocationSlug = {
  "Đà Nẵng": "da-nang",
  "Nha Trang": "nha-trang",
  "Phan Thiết": "phan-thiet",
  "Vũng Tàu": "vung-tau",
  "Hà Nội": "ha-noi",
  "Hạ Long": "vinh-ha-long",
};

const hotelsByCity = {
  "Đà Nẵng": [
    {
      id: "dn-1",
      areaLabel: "An Hải Bắc",
      discountText: "Tiết kiệm 70%",
      badgeText: "Sale Lễ",
      name: "The Herriott Hotel & Suite",
      stars: 3,
      rating: 8.7,
      reviews: "1,7k",
      oldPrice: 2160000,
      newPrice: 648000,
      image: "/nhom01_dulich_booking/assets/hotels/danang-1.webp",
    },
    {
      id: "dn-2",
      areaLabel: "Bình Hiên",
      discountText: "Tiết kiệm 41%",
      badgeText: "Sale Lễ",
      name: "Quoc Cuong Center Da Nang Hotel by Haviland",
      stars: 3,
      rating: 8.1,
      reviews: "222",
      oldPrice: 692641,
      newPrice: 407813,
      image: "/nhom01_dulich_booking/assets/hotels/danang-2.webp",
    },
    {
      id: "dn-3",
      areaLabel: "Phước Mỹ",
      discountText: "Tiết kiệm 89%",
      badgeText: "Sale Lễ",
      name: "Orchide'es Ocean Hotel",
      stars: 3,
      rating: 8.8,
      reviews: "418",
      oldPrice: 5977912,
      newPrice: 675325,
      image: "/nhom01_dulich_booking/assets/hotels/danang-3.webp",
    },
    {
      id: "dn-4",
      areaLabel: "Mỹ An",
      discountText: "Tiết kiệm 85%",
      badgeText: "Sale Lễ",
      name: "Davue Hotel Da Nang",
      stars: 4,
      rating: 8.5,
      reviews: "1,1k",
      oldPrice: 3463203,
      newPrice: 507047,
      image: "/nhom01_dulich_booking/assets/hotels/danang-4.webp",
    },
    {
      id: "dn-5",
      areaLabel: "Mỹ Khê",
      discountText: "Tiết kiệm 60%",
      badgeText: "Sale Lễ",
      name: "Sala Danang Beach Hotel",
      stars: 4,
      rating: 8.9,
      reviews: "2,3k",
      oldPrice: 2800000,
      newPrice: 1120000,
      image: "/nhom01_dulich_booking/assets/hotels/danang-5.jpg",
    },
    {
      id: "dn-6",
      areaLabel: "Hải Châu",
      discountText: "Tiết kiệm 55%",
      badgeText: "Sale Lễ",
      name: "Paris Deli Danang Beach Hotel",
      stars: 4,
      rating: 8.6,
      reviews: "1,5k",
      oldPrice: 2500000,
      newPrice: 1125000,
      image: "/nhom01_dulich_booking/assets/hotels/danang-6.jpg",
    },
  ],
  "Nha Trang": [
    {
      id: "nt-1",
      areaLabel: "Vĩnh Hòa",
      discountText: "Tiết kiệm 66%",
      badgeText: "Gần biển",
      name: "Muong Thanh Grand Nha Trang Hotel",
      stars: 4,
      rating: 8.7,
      reviews: "462",
      oldPrice: 1402597,
      newPrice: 477299,
      image: "/nhom01_dulich_booking/assets/hotels/nhatrang-1.webp",
    },
    {
      id: "nt-2",
      areaLabel: "Lộc Thọ",
      discountText: "Tiết kiệm 35%",
      badgeText: "Sale Lễ",
      name: "Brilliant Bay Nha Trang Hotel",
      stars: 4,
      rating: 7.9,
      reviews: "17",
      oldPrice: 606200,
      newPrice: 394030,
      image: "/nhom01_dulich_booking/assets/hotels/nhatrang-2.webp",
    },
    {
      id: "nt-3",
      areaLabel: "Vĩnh Nguyên",
      discountText: "Tiết kiệm 42%",
      badgeText: "Gần biển",
      name: "Ruby Luxury Hotel",
      stars: 4,
      rating: 8.3,
      reviews: "289",
      oldPrice: 623377,
      newPrice: 358788,
      image: "/nhom01_dulich_booking/assets/hotels/nhatrang-3.webp",
    },
    {
      id: "nt-4",
      areaLabel: "Vĩnh Hòa",
      discountText: "Tiết kiệm 45%",
      badgeText: "Sale Lễ",
      name: "Lenid Hotel Nha Trang",
      stars: 4,
      rating: 8.5,
      reviews: "88",
      oldPrice: 457394,
      newPrice: 251567,
      image: "/nhom01_dulich_booking/assets/hotels/nhatrang-4.webp",
    },
    {
      id: "nt-5",
      areaLabel: "Vĩnh Phước",
      discountText: "Tiết kiệm 69%",
      badgeText: "Gần biển",
      name: "Muong Thanh Luxury Vien Trieu Nha Trang",
      stars: 5,
      rating: 8.9,
      reviews: "533",
      oldPrice: 2883117,
      newPrice: 890108,
      image: "/nhom01_dulich_booking/assets/hotels/nhatrang-5.webp",
    },
    {
      id: "nt-6",
      areaLabel: "Lộc Thọ",
      discountText: "Tiết kiệm 28%",
      badgeText: "Gần biển",
      name: "Panorama Nha Trang Sanvilla",
      stars: 3,
      rating: 8.1,
      reviews: "171",
      oldPrice: 955388,
      newPrice: 687879,
      image: "/nhom01_dulich_booking/assets/hotels/nhatrang-6.jpg",
    },
    {
      id: "nt-7",
      areaLabel: "Xương Huân",
      discountText: "Tiết kiệm 68%",
      badgeText: "Gần biển",
      name: "Muong Thanh Luxury Khanh Hoa",
      stars: 5,
      rating: 8.7,
      reviews: "1,1k",
      oldPrice: 2493506,
      newPrice: 796254,
      image: "/nhom01_dulich_booking/assets/hotels/nhatrang-7.jpg",
    },
    {
      id: "nt-8",
      areaLabel: "Lộc Thọ",
      discountText: "Tiết kiệm 18%",
      badgeText: "Sale Lễ",
      name: "Sun City Hotel Nha Trang",
      stars: 3,
      rating: 8.2,
      reviews: "1,3k",
      oldPrice: 402597,
      newPrice: 330966,
      image: "/nhom01_dulich_booking/assets/hotels/nhatrang-8.jpg",
    },
  ],
  "Phan Thiết": [
    { id: "pt-1", areaLabel: "Hàm Tiến", discountText: "Tiết kiệm 50%", badgeText: "Sale Lễ", name: "Seahorse Resort & Spa", stars: 4, rating: 8.6, reviews: "845", oldPrice: 1800000, newPrice: 900000, image: "/nhom01_dulich_booking/assets/hotels/phanthiet-1.jpg" },
    { id: "pt-2", areaLabel: "Hàm Tiến", discountText: "Tiết kiệm 40%", badgeText: "Gần biển", name: "The Cliff Resort Mui Ne", stars: 5, rating: 8.9, reviews: "1,2k", oldPrice: 3500000, newPrice: 2100000, image: "/nhom01_dulich_booking/assets/hotels/phanthiet-2.jpeg" },
    { id: "pt-3", areaLabel: "Hàm Tiến", discountText: "Tiết kiệm 35%", badgeText: "Sale Lễ", name: "Muong Thanh Mui Ne", stars: 4, rating: 8.4, reviews: "687", oldPrice: 1500000, newPrice: 975000, image: "/nhom01_dulich_booking/assets/hotels/phanthiet-3.jpg" },
    { id: "pt-4", areaLabel: "Hàm Tiến", discountText: "Tiết kiệm 60%", badgeText: "Gần biển", name: "Victoria Phan Thiet Beach Resort", stars: 5, rating: 9.0, reviews: "2,1k", oldPrice: 4200000, newPrice: 1680000, image: "/nhom01_dulich_booking/assets/hotels/phanthiet-4.jpg" },
    { id: "pt-5", areaLabel: "Mũi Né", discountText: "Tiết kiệm 45%", badgeText: "Sale Lễ", name: "Allezboo Beach Resort & Spa", stars: 4, rating: 8.3, reviews: "534", oldPrice: 2000000, newPrice: 1100000, image: "/nhom01_dulich_booking/assets/hotels/phanthiet-5.jpg" },
    { id: "pt-6", areaLabel: "Mũi Né", discountText: "Tiết kiệm 38%", badgeText: "Gần biển", name: "Pandanus Resort", stars: 4, rating: 8.5, reviews: "823", oldPrice: 1750000, newPrice: 1085000, image: "/nhom01_dulich_booking/assets/hotels/phanthiet-6.jpg" },
  ],
  "TP. Hồ Chí Minh": [
    { id: "hcm-1", areaLabel: "Quận 1", discountText: "Tiết kiệm 25%", badgeText: "Sale Lễ", name: "The Reverie Saigon", stars: 5, rating: 9.1, reviews: "3,2k", oldPrice: 6500000, newPrice: 4875000, image: "/nhom01_dulich_booking/assets/hotels/hcm-1.jpg" },
    { id: "hcm-2", areaLabel: "Quận 1", discountText: "Tiết kiệm 40%", badgeText: "Sale Lễ", name: "Liberty Central Saigon Citypoint", stars: 4, rating: 8.7, reviews: "1,9k", oldPrice: 2200000, newPrice: 1320000, image: "/nhom01_dulich_booking/assets/hotels/hcm-2.jpg" },
    { id: "hcm-3", areaLabel: "Quận 1", discountText: "Tiết kiệm 30%", badgeText: "Sale Lễ", name: "Sheraton Saigon Hotel & Towers", stars: 5, rating: 9.0, reviews: "4,1k", oldPrice: 5800000, newPrice: 4060000, image: "/nhom01_dulich_booking/assets/hotels/hcm-3.jpg" },
    { id: "hcm-4", areaLabel: "Quận 1", discountText: "Tiết kiệm 45%", badgeText: "Sale Lễ", name: "Silverland Sakyo Hotel & Spa", stars: 4, rating: 8.5, reviews: "892", oldPrice: 1800000, newPrice: 990000, image: "/nhom01_dulich_booking/assets/hotels/hcm-4.jpg" },
    { id: "hcm-5", areaLabel: "Quận 5", discountText: "Tiết kiệm 35%", badgeText: "Sale Lễ", name: "Hotel Nikko Saigon", stars: 5, rating: 8.9, reviews: "2,5k", oldPrice: 4500000, newPrice: 2925000, image: "/nhom01_dulich_booking/assets/hotels/hcm-5.jpg" },
    { id: "hcm-6", areaLabel: "Quận 1", discountText: "Tiết kiệm 55%", badgeText: "Sale Lễ", name: "A&Em Hotel & Spa", stars: 3, rating: 8.2, reviews: "1,4k", oldPrice: 1200000, newPrice: 540000, image: "/nhom01_dulich_booking/assets/hotels/hcm-6.avif" },
  ],
  "Vũng Tàu": [
    { id: "vt-1", areaLabel: "Bãi Sau", discountText: "Tiết kiệm 45%", badgeText: "Gần biển", name: "Imperial Hotel Vung Tau", stars: 5, rating: 8.9, reviews: "2,3k", oldPrice: 3200000, newPrice: 1760000, image: "/nhom01_dulich_booking/assets/hotels/vungtau-1.jpg" },
    { id: "vt-2", areaLabel: "Bãi Sau", discountText: "Tiết kiệm 38%", badgeText: "Gần biển", name: "Pullman Vung Tau", stars: 5, rating: 9.0, reviews: "1,8k", oldPrice: 2800000, newPrice: 1736000, image: "/nhom01_dulich_booking/assets/hotels/vungtau-2.jpg" },
    { id: "vt-3", areaLabel: "Bãi Trước", discountText: "Tiết kiệm 50%", badgeText: "Sale Lễ", name: "The Malibu Hotel Vung Tau", stars: 4, rating: 8.5, reviews: "1,1k", oldPrice: 1600000, newPrice: 800000, image: "/nhom01_dulich_booking/assets/hotels/vungtau-3.jpg" },
    { id: "vt-4", areaLabel: "Phường 1", discountText: "Tiết kiệm 40%", badgeText: "Gần biển", name: "Marina Bay Vung Tau Hotel", stars: 4, rating: 8.6, reviews: "876", oldPrice: 1500000, newPrice: 900000, image: "/nhom01_dulich_booking/assets/hotels/vungtau-4.jpeg" },
    { id: "vt-5", areaLabel: "Bãi Sau", discountText: "Tiết kiệm 55%", badgeText: "Sale Lễ", name: "Beach House Vung Tau Hotel", stars: 3, rating: 8.2, reviews: "543", oldPrice: 1100000, newPrice: 495000, image: "/nhom01_dulich_booking/assets/hotels/vungtau-5.jpg" },
    { id: "vt-6", areaLabel: "Bãi Sau", discountText: "Tiết kiệm 35%", badgeText: "Gần biển", name: "Lan Rung Resort & Spa", stars: 4, rating: 8.4, reviews: "1,2k", oldPrice: 2100000, newPrice: 1365000, image: "/nhom01_dulich_booking/assets/hotels/vungtau-6.jpg" },
  ],
  "Hà Nội": [
    { id: "hn-1", areaLabel: "Hoàn Kiếm", discountText: "Tiết kiệm 25%", badgeText: "Sale Lễ", name: "Sofitel Legend Metropole Hanoi", stars: 5, rating: 9.4, reviews: "5,2k", oldPrice: 8500000, newPrice: 6375000, image: "/nhom01_dulich_booking/assets/hotels/hanoi-1.avif" },
    { id: "hn-2", areaLabel: "Hoàn Kiếm", discountText: "Tiết kiệm 40%", badgeText: "Sale Lễ", name: "Apricot Hotel", stars: 5, rating: 9.1, reviews: "2,1k", oldPrice: 3800000, newPrice: 2280000, image: "/nhom01_dulich_booking/assets/hotels/hanoi-2.jpg" },
    { id: "hn-3", areaLabel: "Hoàn Kiếm", discountText: "Tiết kiệm 35%", badgeText: "Sale Lễ", name: "La Siesta Classic Ma May", stars: 4, rating: 9.0, reviews: "3,5k", oldPrice: 2200000, newPrice: 1430000, image: "/nhom01_dulich_booking/assets/hotels/hanoi-3.jpg" },
    { id: "hn-4", areaLabel: "Ba Đình", discountText: "Tiết kiệm 45%", badgeText: "Sale Lễ", name: "Hanoi Daewoo Hotel", stars: 5, rating: 8.8, reviews: "2,8k", oldPrice: 4500000, newPrice: 2475000, image: "/nhom01_dulich_booking/assets/hotels/hanoi-4.jpg" },
    { id: "hn-5", areaLabel: "Hoàn Kiếm", discountText: "Tiết kiệm 38%", badgeText: "Sale Lễ", name: "Silk Path Grand Hotel & Spa", stars: 4, rating: 8.7, reviews: "1,6k", oldPrice: 2500000, newPrice: 1550000, image: "/nhom01_dulich_booking/assets/hotels/hanoi-5.jpg" },
    { id: "hn-6", areaLabel: "Hoàn Kiếm", discountText: "Tiết kiệm 50%", badgeText: "Sale Lễ", name: "Hanoi Pearl Hotel", stars: 4, rating: 8.6, reviews: "987", oldPrice: 1800000, newPrice: 900000, image: "/nhom01_dulich_booking/assets/hotels/hanoi-6.jpg" },
  ],
  "Huế": [
    { id: "hue-1", areaLabel: "Phú Hội", discountText: "Tiết kiệm 45%", badgeText: "Sale Lễ", name: "Indochine Palace Hue", stars: 5, rating: 9.0, reviews: "1,5k", oldPrice: 3200000, newPrice: 1760000, image: "/nhom01_dulich_booking/assets/hotels/hue-1.jpg" },
    { id: "hue-2", areaLabel: "Thủy Xuân", discountText: "Tiết kiệm 38%", badgeText: "Gần sông", name: "Pilgrimage Village Hue", stars: 4, rating: 8.9, reviews: "876", oldPrice: 2500000, newPrice: 1550000, image: "/nhom01_dulich_booking/assets/hotels/hue-2.jpg" },
    { id: "hue-3", areaLabel: "Phú Hội", discountText: "Tiết kiệm 50%", badgeText: "Sale Lễ", name: "Muong Thanh Holiday Hue", stars: 4, rating: 8.5, reviews: "1,1k", oldPrice: 1600000, newPrice: 800000, image: "/nhom01_dulich_booking/assets/hotels/hue-3.jpg" },
    { id: "hue-4", areaLabel: "Phú Hội", discountText: "Tiết kiệm 35%", badgeText: "Sale Lễ", name: "Eldora Hotel", stars: 4, rating: 8.7, reviews: "723", oldPrice: 1800000, newPrice: 1170000, image: "/nhom01_dulich_booking/assets/hotels/hue-4.jpg" },
    { id: "hue-5", areaLabel: "Phú Hội", discountText: "Tiết kiệm 55%", badgeText: "Gần sông", name: "Century Riverside Hotel", stars: 4, rating: 8.4, reviews: "1,3k", oldPrice: 1500000, newPrice: 675000, image: "/nhom01_dulich_booking/assets/hotels/hue-5.jpg" },
    { id: "hue-6", areaLabel: "Vỹ Dạ", discountText: "Tiết kiệm 42%", badgeText: "Gần sông", name: "Hue Riverside Boutique Resort", stars: 3, rating: 8.3, reviews: "456", oldPrice: 1200000, newPrice: 696000, image: "/nhom01_dulich_booking/assets/hotels/hue-6.jpg" },
  ],
  "Đà Lạt": [
    { id: "dl-1", areaLabel: "Trần Hưng Đạo", discountText: "Tiết kiệm 35%", badgeText: "Sale Lễ", name: "Ana Mandara Villas Dalat", stars: 5, rating: 9.2, reviews: "2,1k", oldPrice: 4500000, newPrice: 2925000, image: "/nhom01_dulich_booking/assets/hotels/dalat-1.webp" },
    { id: "dl-2", areaLabel: "Hồ Tuyền Lâm", discountText: "Tiết kiệm 45%", badgeText: "Gần hồ", name: "Terracotta Hotel & Resort", stars: 4, rating: 8.8, reviews: "1,4k", oldPrice: 2800000, newPrice: 1540000, image: "/nhom01_dulich_booking/assets/hotels/dalat-2.jpg" },
    { id: "dl-3", areaLabel: "Phường 1", discountText: "Tiết kiệm 50%", badgeText: "Sale Lễ", name: "TTC Hotel Premium Ngoc Lan", stars: 4, rating: 8.5, reviews: "1,8k", oldPrice: 1600000, newPrice: 800000, image: "/nhom01_dulich_booking/assets/hotels/dalat-3.jpg" },
    { id: "dl-4", areaLabel: "Hồ Tuyền Lâm", discountText: "Tiết kiệm 40%", badgeText: "Gần hồ", name: "Swiss-Belresort Tuyen Lam", stars: 5, rating: 8.9, reviews: "1,1k", oldPrice: 3500000, newPrice: 2100000, image: "/nhom01_dulich_booking/assets/hotels/dalat-4.jpg" },
    { id: "dl-5", areaLabel: "Phường 8", discountText: "Tiết kiệm 55%", badgeText: "Sale Lễ", name: "Rosa Alpina Dalat Hotel", stars: 3, rating: 8.3, reviews: "567", oldPrice: 1200000, newPrice: 540000, image: "/nhom01_dulich_booking/assets/hotels/dalat-5.jpg" },
    { id: "dl-6", areaLabel: "Phường 1", discountText: "Tiết kiệm 32%", badgeText: "Sale Lễ", name: "Dalat Palace Heritage Hotel", stars: 5, rating: 9.1, reviews: "1,6k", oldPrice: 5200000, newPrice: 3536000, image: "/nhom01_dulich_booking/assets/hotels/dalat-6.jpg" },
  ],
  "Sa Pa": [
    { id: "sp-1", areaLabel: "Trung Tâm", discountText: "Tiết kiệm 40%", badgeText: "Sale Lễ", name: "Hotel de la Coupole MGallery", stars: 5, rating: 9.3, reviews: "2,8k", oldPrice: 5500000, newPrice: 3300000, image: "/nhom01_dulich_booking/assets/hotels/sapa-1.jpg" },
    { id: "sp-2", areaLabel: "Trung Tâm", discountText: "Tiết kiệm 45%", badgeText: "Gần núi", name: "Silk Path Grand Sapa Resort", stars: 5, rating: 9.0, reviews: "1,7k", oldPrice: 3800000, newPrice: 2090000, image: "/nhom01_dulich_booking/assets/hotels/sapa-2.jpg" },
    { id: "sp-3", areaLabel: "Trung Tâm", discountText: "Tiết kiệm 50%", badgeText: "Sale Lễ", name: "Pao's Sapa Leisure Hotel", stars: 4, rating: 8.7, reviews: "1,3k", oldPrice: 2200000, newPrice: 1100000, image: "/nhom01_dulich_booking/assets/hotels/sapa-3.jpg" },
    { id: "sp-4", areaLabel: "Trung Tâm", discountText: "Tiết kiệm 55%", badgeText: "Sale Lễ", name: "Sapa Freesia Hotel", stars: 4, rating: 8.5, reviews: "876", oldPrice: 1500000, newPrice: 675000, image: "/nhom01_dulich_booking/assets/hotels/sapa-4.jpg" },
    { id: "sp-5", areaLabel: "Ngoại ô", discountText: "Tiết kiệm 30%", badgeText: "Gần núi", name: "Topas Ecolodge Sapa", stars: 4, rating: 9.1, reviews: "654", oldPrice: 4800000, newPrice: 3360000, image: "/nhom01_dulich_booking/assets/hotels/sapa-5.jpg" },
    { id: "sp-6", areaLabel: "Trung Tâm", discountText: "Tiết kiệm 48%", badgeText: "Sale Lễ", name: "Chau Long Sapa Hotel", stars: 4, rating: 8.4, reviews: "1,5k", oldPrice: 1800000, newPrice: 936000, image: "/nhom01_dulich_booking/assets/hotels/sapa-6.jpg" },
  ],
  "Hội An": [
    { id: "ha-1", areaLabel: "Cẩm Phô", discountText: "Tiết kiệm 38%", badgeText: "Gần sông", name: "Anantara Hoi An Resort", stars: 5, rating: 9.2, reviews: "2,3k", oldPrice: 4800000, newPrice: 2976000, image: "/nhom01_dulich_booking/assets/hotels/hoian-1.jpg" },
    { id: "ha-2", areaLabel: "Phố cổ", discountText: "Tiết kiệm 45%", badgeText: "Sale Lễ", name: "Hoi An Historic Hotel", stars: 4, rating: 8.8, reviews: "1,6k", oldPrice: 2500000, newPrice: 1375000, image: "/nhom01_dulich_booking/assets/hotels/hoian-2.jpg" },
    { id: "ha-3", areaLabel: "Cẩm Châu", discountText: "Tiết kiệm 50%", badgeText: "Sale Lễ", name: "Allegro Hoi An A Little Luxury Hotel", stars: 4, rating: 8.9, reviews: "1,2k", oldPrice: 2200000, newPrice: 1100000, image: "/nhom01_dulich_booking/assets/hotels/hoian-3.jpg" },
    { id: "ha-4", areaLabel: "Cẩm Châu", discountText: "Tiết kiệm 35%", badgeText: "Sale Lễ", name: "La Siesta Hoi An Resort & Spa", stars: 5, rating: 9.1, reviews: "1,8k", oldPrice: 3500000, newPrice: 2275000, image: "/nhom01_dulich_booking/assets/hotels/hoian-4.jpg" },
    { id: "ha-5", areaLabel: "Cẩm Nam", discountText: "Tiết kiệm 55%", badgeText: "Gần sông", name: "Vinh Hung Emerald Resort", stars: 3, rating: 8.5, reviews: "876", oldPrice: 1400000, newPrice: 630000, image: "/nhom01_dulich_booking/assets/hotels/hoian-5.jpg" },
    { id: "ha-6", areaLabel: "Cẩm Phô", discountText: "Tiết kiệm 42%", badgeText: "Sale Lễ", name: "Little Hoi An Boutique Hotel & Spa", stars: 4, rating: 8.7, reviews: "1,1k", oldPrice: 1800000, newPrice: 1044000, image: "/nhom01_dulich_booking/assets/hotels/hoian-6.jpg" },
  ],
  "Hạ Long": [
    { id: "hl-1", areaLabel: "Bãi Cháy", discountText: "Tiết kiệm 40%", badgeText: "Gần biển", name: "Vinpearl Resort Ha Long", stars: 5, rating: 9.0, reviews: "2,5k", oldPrice: 4500000, newPrice: 2700000, image: "/nhom01_dulich_booking/assets/hotels/halong-1.webp" },
    { id: "hl-2", areaLabel: "Bãi Cháy", discountText: "Tiết kiệm 45%", badgeText: "Gần biển", name: "FLC Grand Hotel Halong", stars: 5, rating: 8.8, reviews: "1,7k", oldPrice: 3800000, newPrice: 2090000, image: "/nhom01_dulich_booking/assets/hotels/halong-2.webp" },
    { id: "hl-3", areaLabel: "Hòn Gai", discountText: "Tiết kiệm 50%", badgeText: "Sale Lễ", name: "Wyndham Legend Halong", stars: 5, rating: 8.9, reviews: "1,4k", oldPrice: 3200000, newPrice: 1600000, image: "/nhom01_dulich_booking/assets/hotels/halong-3.avif" },
    { id: "hl-4", areaLabel: "Bãi Cháy", discountText: "Tiết kiệm 55%", badgeText: "Sale Lễ", name: "Muong Thanh Luxury Ha Long", stars: 4, rating: 8.5, reviews: "1,2k", oldPrice: 1800000, newPrice: 810000, image: "/nhom01_dulich_booking/assets/hotels/halong-4.jpg" },
    { id: "hl-5", areaLabel: "Hòn Gai", discountText: "Tiết kiệm 38%", badgeText: "Gần biển", name: "Novotel Ha Long Bay", stars: 4, rating: 8.7, reviews: "2,1k", oldPrice: 2800000, newPrice: 1736000, image: "/nhom01_dulich_booking/assets/hotels/halong-5.jpg" },
    { id: "hl-6", areaLabel: "Hòn Gai", discountText: "Tiết kiệm 42%", badgeText: "Sale Lễ", name: "Halong Plaza Hotel", stars: 4, rating: 8.4, reviews: "987", oldPrice: 2200000, newPrice: 1276000, image: "/nhom01_dulich_booking/assets/hotels/halong-6.jpg" },
  ],
  "Phú Quốc": [
    { id: "pq-1", areaLabel: "An Thới", discountText: "Tiết kiệm 35%", badgeText: "Gần biển", name: "JW Marriott Phu Quoc Emerald Bay", stars: 5, rating: 9.4, reviews: "3,2k", oldPrice: 8500000, newPrice: 5525000, image: "/nhom01_dulich_booking/assets/hotels/phuquoc-1.jpg" },
    { id: "pq-2", areaLabel: "Bãi Dài", discountText: "Tiết kiệm 45%", badgeText: "Gần biển", name: "Vinpearl Resort & Spa Phu Quoc", stars: 5, rating: 9.0, reviews: "2,8k", oldPrice: 5200000, newPrice: 2860000, image: "/nhom01_dulich_booking/assets/hotels/phuquoc-2.webp" },
    { id: "pq-3", areaLabel: "Bãi Kem", discountText: "Tiết kiệm 40%", badgeText: "Gần biển", name: "Premier Village Phu Quoc Resort", stars: 5, rating: 9.2, reviews: "1,9k", oldPrice: 6800000, newPrice: 4080000, image: "/nhom01_dulich_booking/assets/hotels/phuquoc-3.jpg" },
    { id: "pq-4", areaLabel: "Ông Lang", discountText: "Tiết kiệm 50%", badgeText: "Gần biển", name: "Salinda Resort Phu Quoc Island", stars: 5, rating: 9.1, reviews: "1,5k", oldPrice: 4500000, newPrice: 2250000, image: "/nhom01_dulich_booking/assets/hotels/phuquoc-4.jpg" },
    { id: "pq-5", areaLabel: "Bãi Trường", discountText: "Tiết kiệm 55%", badgeText: "Sale Lễ", name: "Sunset Beach Resort & Spa", stars: 4, rating: 8.6, reviews: "1,2k", oldPrice: 2800000, newPrice: 1260000, image: "/nhom01_dulich_booking/assets/hotels/phuquoc-5.jpg" },
    { id: "pq-6", areaLabel: "Bãi Trường", discountText: "Tiết kiệm 42%", badgeText: "Sale Lễ", name: "Sol by Melia Phu Quoc", stars: 4, rating: 8.8, reviews: "2,1k", oldPrice: 3500000, newPrice: 2030000, image: "/nhom01_dulich_booking/assets/hotels/phuquoc-6.jpeg" },
  ],
};

function useItemsPerView() {
  const [items, setItems] = useState(4);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      if (w < 1280) return 3;
      return 4;
    };

    const onResize = () => setItems(compute());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return items;
}

export default function HotelChoicesSection() {
  const [activeCity, setActiveCity] = useState("Đà Nẵng");
  const [index, setIndex] = useState(0);
  const itemsPerView = useItemsPerView();

  const hotels = useMemo(() => hotelsByCity[activeCity] || [], [activeCity]);

  const maxIndex = Math.max(0, hotels.length - itemsPerView);
  const safeIndex = Math.min(index, maxIndex);
  const canPrev = safeIndex > 0;
  const canNext = safeIndex < maxIndex;

  const slideWidthPct = hotels.length ? 100 / itemsPerView : 100;
  const translatePct = safeIndex * slideWidthPct;

  const handlePrev = () => canPrev && setIndex((i) => Math.max(0, i - 1));
  const handleNext = () => canNext && setIndex((i) => Math.min(maxIndex, i + 1));

  const handleTabClick = (city) => {
    setActiveCity(city);
    setIndex(0);
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-350 mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v4h3a2 2 0 0 1 2 2v10h-2v-2h-4v2H3zm2-2h4v-2H5v2zm0-4h4v-2H5v2zm0-4h4V9H5v2zm0-4h4V5H5v2zm6 12h3v-2h-3v2zm0-4h3v-2h-3v2zm0-4h3V9h-3v2zm0-4h3V5h-3v2zm6 12h2v-2h-2v2zm0-4h2v-2h-2v2z" />
            </svg>
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Nhiều lựa chọn khách sạn
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1 scrollbar-thin">
          {cityTabs.map((city) => {
            const isActive = city === activeCity;
            return (
              <button
                key={city}
                type="button"
                onClick={() => handleTabClick(city)}
                className={
                  "shrink-0 px-5 py-2 rounded-full text-sm font-medium transition " +
                  (isActive
                    ? "bg-blue-700 text-white shadow"
                    : "bg-gray-100 text-slate-700 hover:bg-gray-200")
                }
              >
                {city}
              </button>
            );
          })}
        </div>

        {hotels.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            Chưa có khách sạn cho địa điểm này. Hãy thử chọn tab khác.
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              aria-label="Khách sạn trước"
              onClick={handlePrev}
              disabled={!canPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${translatePct}%)` }}
              >
                {hotels.map((hotel) => {
                  const locationSlug = cityToLocationSlug[activeCity];
                  const href = locationSlug
                    ? `/hotels/${locationSlug}`
                    : "/hotels";
                  return (
                    <div
                      key={hotel.id}
                      className="shrink-0 px-2"
                      style={{ width: `${slideWidthPct}%` }}
                    >
                      <Link href={href} className="block h-full">
                        <HotelChoiceCard hotel={hotel} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              aria-label="Khách sạn tiếp theo"
              onClick={handleNext}
              disabled={!canNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-md transition"
          >
            Xem thêm ưu đãi khách sạn
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
