const circles = [];
const fps = 60;
var stage = new createjs.Stage("canvas");
var timer = null;

const resizeCanvas = () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    stage.canvas.width = document.body.offsetWidth;
    stage.canvas.height = document.body.offsetHeight;
  }, 50);
};

function randomColor() {
  return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, 0.3)`;
}

function trueOrFalse() {
  return Math.random() > 0.5;
}

function draw() {
  for (let i = 0; i < 100; i++) {
    var circle = new createjs.Shape();
    circle.graphics
      .beginFill(randomColor())
      .drawCircle(0, 0, [3, 4, 5][Math.trunc(Math.random() * 3)]);
    circle.x = Math.random() * stage.canvas.width;
    circle.y = Math.random() * stage.canvas.height;
    circle.speed_x = (Math.random() * (trueOrFalse() ? 1 : -1)) / 4;
    circle.speed_y = (Math.random() * (trueOrFalse() ? 1 : -1)) / 4;
    stage.addChild(circle);
    circles.push(circle);
  }
  stage.update();
  setInterval(() => {
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      if (circle.x > stage.canvas.width || circle.x < 0) {
        circle.speed_x = -circle.speed_x;
      }
      if (circle.y > stage.canvas.height || circle.y < 0) {
        circle.speed_y = -circle.speed_y;
      }
      circle.x += circle.speed_x;
      circle.y += circle.speed_y;
    }
    stage.update();
  }, 1000 / fps);
}

window.addEventListener("resize", resizeCanvas, false);
resizeCanvas();
setTimeout(draw, 1000);
