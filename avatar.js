import cnvs from "canvas";
import { getInitials, getColour, drawCircle } from "./helper.js";
const canvas = cnvs.createCanvas(50, 50);
const ctx = canvas.getContext("2d");
ctx.font = '600 24px "Courier New", Courier, monospace';

const name = "Thomas MacLean";

const initials = getInitials(name);
const myColour = getColour(name);

drawCircle(ctx, 25, 25, 25, myColour);

ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText(initials, 25, 32);
console.log(canvas.toDataURL());
