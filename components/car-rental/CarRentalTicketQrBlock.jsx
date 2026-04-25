const SIZE = 21;

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
  return grid;
}

export default function CarRentalTicketQrBlock({ payload, label = "Xác nhận thuê xe" }) {
  const cells = buildCells(seed(payload));
  const cellSize = 8;
  const size = SIZE * cellSize;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative bg-white p-3 border border-slate-200 rounded-lg"
        style={{ width: size + 24, height: size + 24 }}
      >
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
      </div>
      <div className="text-xs font-semibold text-slate-700 text-center max-w-[160px]">
        {label}
      </div>
    </div>
  );
}
