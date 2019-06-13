const canvas = document.querySelector("#draw");
const ctx = canvas.getContext('2d');
const attributes = document.querySelector("#attributes");
const inputs = attributes.querySelectorAll("input");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADASS';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
let lineWidth = document.querySelector("#lineWidth").value;
ctx.lineWidth = lineWidth;

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing
// ctx.globalCompositeOperation = 'multiply';
// ctx.globalCompositeOperation = 'source-over';
// ctx.globalCompositeOperation = 'lighter';
// ctx.globalCompositeOperation = 'overlay';
// ctx.globalCompositeOperation = 'color-burn';
// ctx.globalCompositeOperation = 'exclusion';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let saturation = 100;
let lighting = 50;

function draw(e){
    if(isDrawing) {
        ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lighting}%)`;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY]
    }
}

function mouseDown(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
}

function updateAttributes(e){
    console.log(e.target.id);
    switch(e.target.id){
        case "lineWidth":
            ctx.lineWidth = e.target.value;
            break;
        case "hue":
            hue = e.target.value;
            break;
        case "saturation":
            saturation = e.target.value;
            break;
        case "lighting":
            lighting = e.target.value;
            break;
    }
}

canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
inputs.forEach(input => input.addEventListener('change', updateAttributes));
