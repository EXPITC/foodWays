function toMinutes(n) {
  let m = Math.floor((n % 3600) / 60)
    .toString()
    .padStart(2, "0");
  let s = Math.floor(n % 60)
    .toString()
    .padStart(2, "0");
  return m + ":" + s;
}

export default toMinutes;
