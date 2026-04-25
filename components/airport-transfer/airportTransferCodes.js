function hash32(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seedFrom({ vehicleId, fromId, toId, date, time }) {
  return `${vehicleId}|${fromId}|${toId}|${date}|${time}`;
}

function ddmmyy(date) {
  if (!date) return "000000";
  const [y, m, d] = date.split("-");
  if (!y || !m || !d) return "000000";
  return `${d}${m}${y.slice(-2)}`;
}

export function buildBookingCode({ vehicleId, fromId, toId, date, time }) {
  const h = hash32(seedFrom({ vehicleId, fromId, toId, date, time }));
  const seq = String(h % 1000).padStart(3, "0");
  return `AT${ddmmyy(date)}${seq}`;
}

export function buildEticketCode({ vehicleId, fromId, toId, date, time }) {
  const h = hash32(`eticket|${seedFrom({ vehicleId, fromId, toId, date, time })}`);
  const seq = String(h % 10000).padStart(4, "0");
  return `VGO-AT-${seq}`;
}

export function buildQrPayload({
  bookingCode,
  eticketCode,
  fromId,
  toId,
  vehicleId,
}) {
  return [
    "VIEGO",
    "AIRPORT_TRANSFER",
    "ETICKET",
    `BOOKING:${bookingCode}`,
    `ETICKET:${eticketCode}`,
    `FROM:${fromId || "-"}`,
    `TO:${toId || "-"}`,
    `VEHICLE:${vehicleId || "-"}`,
  ].join("|");
}
