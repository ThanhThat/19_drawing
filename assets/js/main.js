const drawing = document.getElementById("drawing");

const ctx = drawing.getContext("2d");

let x, y;
let isPressed = false;

drawing.addEventListener("mousedown", (e) => {
  if (e.buttons === 1) {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
  }
});

document.addEventListener("mouseup", (e) => {
  if (e.buttons === 0) {
    isPressed = false;

    x = undefined;
    y = undefined;
  }
});

drawing.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 5;
  ctx.stroke();
}
