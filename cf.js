const { createCanvas, loadImage } = require('canvas')

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getAvatar = (req, res) => {
  let name = req.query.name || req.body.name || 'Thomas MacLean';
 

const initials = getInitials(name);
const colour = getColour(name);


const canvas = createCanvas(50, 50);
const ctx = canvas.getContext("2d");
ctx.font = '600 24px "Courier New", Courier, monospace';
drawCircle(ctx, 25, 25, 25, myColour);

ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText(initials, 25, 32);
const base64 = canvas.toDataURL();

  res.status(200).json({initials, colour,base64});
};





//https://dev.to/admitkard/auto-generate-avatar-colors-randomly-138j
const getColour = (username) => {
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


function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = stroke
    ctx.stroke()
  }
}