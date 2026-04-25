"use client";

import { useEffect, useState } from "react";
import { formatVnd } from "@/data/carRentalRental";

const SIZE = 25;

function seed(str) {
  let h = 2166136261;
  for (const c of String(str || "")) {
    h ^= c.charCodeAt(0);
    h = (h * 16777619) >>> 0;
  }
  return h;
}

function makeRng(seedValue) {
  let s = seedValue >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s;
  };
}

function buildCells(seedValue) {
  const rng = makeRng(seedValue);
  const grid = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => false)
  );

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      grid[y][x] = rng() % 2 === 0;
    }
  }

  const drawFinder = (cx, cy) => {
    for (let dy = 0; dy < 7; dy++) {
      for (let dx = 0; dx < 7; dx++) {
        const isRing = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const isCenter = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        grid[cy + dy][cx + dx] = isRing || isCenter;
      }
    }
    for (let i = -1; i <= 7; i++) {
      for (let j = -1; j <= 7; j++) {
        if (i === -1 || i === 7 || j === -1 || j === 7) {
          const y = cy + i;
          const x = cx + j;
          if (y >= 0 && y < SIZE && x >= 0 && x < SIZE) grid[y][x] = false;
        }
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(SIZE - 7, 0);
  drawFinder(0, SIZE - 7);

  const centerSize = 7;
  const start = Math.floor((SIZE - centerSize) / 2);
  for (let dy = 0; dy < centerSize; dy++) {
    for (let dx = 0; dx < centerSize; dx++) {
      grid[start + dy][start + dx] = false;
    }
  }

  return grid;
}

function QrCodePlaceholder({ seedText }) {
  const cells = buildCells(seed(seedText));
  const cellSize = 10;
  const size = SIZE * cellSize;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        <rect width={size} height={size} fill="white" />
        {cells.map((row, y) =>
          row.map((filled, x) =>
            filled ? (
              <rect
                key={`${x}-${y}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#0f172a"
              />
            ) : null
          )
        )}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-lg px-2.5 py-1 shadow-sm">
        <span className="text-sm font-bold text-sky-600 tracking-wide">
          VieGo
        </span>
      </div>
    </div>
  );
}

export default function CarRentalPaymentQrCard({
  vehicleId,
  bookingCode,
  subtotal,
}) {
  const [total, setTotal] = useState(subtotal);
  const [methodId, setMethodId] = useState("vietqr");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(
        `viego:car-rental:payment:selection:${vehicleId}`
      );
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.total === "number" && parsed.total >= 0) {
          setTotal(parsed.total);
        }
        if (parsed.methodId) setMethodId(parsed.methodId);
      }
    } catch {
      // ignore
    }
  }, [vehicleId]);

  const payload = `VIEGO|CAR|BOOKING:${bookingCode}|VEHICLE:${vehicleId}|AMOUNT:${total}|METHOD:${methodId.toUpperCase()}`;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold text-slate-900">
          Scan mã QR để thanh toán
        </h2>
      </div>

      <div className="mx-5 mt-4 border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-sky-50">
          <div className="inline-flex items-center gap-1 text-sm font-bold text-red-600">
            VietQR<sup className="text-[9px]">™</sup>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 rounded-md border border-sky-200 text-sky-700 hover:bg-sky-100 text-xs font-semibold transition"
          >
            Lưu mã QR
          </button>
        </div>

        <div className="py-6 px-4 flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-slate-700">VieGo</p>
          <QrCodePlaceholder seedText={payload} />
          <p className="text-xs text-slate-400 font-mono break-all max-w-xs text-center">
            {payload}
          </p>
        </div>

        <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Tổng số tiền cần thanh toán
          </span>
          <span className="text-lg font-bold text-orange-500">
            {formatVnd(total)}
          </span>
        </div>
      </div>
      <div className="h-5" />
    </section>
  );
}
