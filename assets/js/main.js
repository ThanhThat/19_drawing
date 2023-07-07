const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const drawing = $("#drawing");

const ctx = drawing.getContext("2d");
const rect = drawing.getBoundingClientRect();

let x, y;
let isPressed = false;
let isEraser = false;
let color = $(".draw-color").value;
let size = +$(".draw-size").textContent;

// clear all canvas
$(".draw-eraser-all").addEventListener("click", () => {
  clearCanvas(0, 0, drawing.clientWidth, drawing.clientHeight);
});

// save canvas to img file
$(".draw-save").addEventListener("click", () => {
  const image = drawing.toDataURL("image/png");

  // Create link download
  const link = document.createElement("a");
  link.href = image;
  link.download = "myDrawing.png";
  link.click();
});

// click btn .draw-plus size
$(".draw-plus").addEventListener("click", () => {
  if (size < 50) {
    size += 5;
    $(".draw-size").textContent = size;
  }
});

// click btn .draw-minus size
$(".draw-minus").addEventListener("click", () => {
  if (size > 5) {
    size -= 5;
    $(".draw-size").textContent = size;
  }
});

// click btn chang color .draw-color
$(".draw-color").addEventListener("change", function () {
  color = this.value;
  isPressed = true;
});

// click btn eraser canvas .draw-eraser
$(".draw-eraser").addEventListener("click", (e) => {
  isEraser = true;
  isPressed = false;

  drawing.classList.add("eraser");

  if (isEraser) {
    drawing.addEventListener("mousedown", (e) => {
      x = e.offsetX;
      y = e.offsetY;
    });

    drawing.addEventListener("mouseup", (e) => {
      drawing.classList.remove("eraser");
      isEraser = false;

      x = undefined;
      y = undefined;
    });

    drawing.addEventListener("mousemove", (e) => {
      if (isEraser) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        clearCanvas(x, y, size * 2, size * 2);

        x = x2;
        y = y2;
      }
    });
  }
});

drawing.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

drawing.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

drawing.addEventListener("mousemove", (e) => {
  if (isPressed) {
    e.preventDefault();
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function clearCanvas(x1, y1, width, height) {
  ctx.clearRect(x1, y1, width, height);
}
