
//https://dev.to/admitkard/auto-generate-avatar-colors-randomly-138j
const createColour = (username) => {
  console.log("generation");
  const hls = generateHSL(username);
  return HSLtoString(hls);
};

const getInitials = (username) => {
  return username
    .split(" ")
    .map((x) => x[0])
    .slice(0, 3)
    .join("");
};

const hRange = [0, 360];
const sRange = [50, 75];
const lRange = [25, 60];

const normalizeHash = (hash, min, max) => {
  return Math.floor((hash % (max - min)) + min);
};

const getHashOfString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};
const generateHSL = (name) => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0], sRange[1]);
  const l = normalizeHash(hash, lRange[0], lRange[1]);
  return [h, s, l];
};

const HSLtoString = (hsl) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};
