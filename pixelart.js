let ctxmap;
const canvasSize = 450;
let sizeMap = 32;


$(document).ready(function () {
    $("#canvas-map")[0].width = canvasSize;
    $("#canvas-map")[0].height = canvasSize;
    ctxmap = $("#canvas-map")[0].getContext("2d");
    setInterval(function () {
        Update();
    }, 50);
})
function Update() {
    ctxmap.clearRect(0, 0, canvasSize, canvasSize);
    var pixelSize = canvasSize / sizeMap;
    if (I_SeeLines()) {
        DrawLines();
    }
    if (I_MouseInBoundsMap()) {
        //console.log(mouseY);
        DrawRectMap(Math.floor(mouseX / pixelSize) * pixelSize, Math.floor(mouseY / (pixelSize)) * pixelSize, pixelSize, pixelSize, 0.2)
    }
}




function DrawLines() {
    for (var x = 1; x < sizeMap; x++) {
        DrawRectMap(x * canvasSize / sizeMap, 0, 1, canvasSize);
    }
    for (var y = 1; y < sizeMap; y++) {
        DrawRectMap(0, y * canvasSize / sizeMap, canvasSize, 1);
    }
}

function DrawRectMap(x, y, w, h, a) {
    if (a != null) {
        ctxmap.globalAlpha = a;
    } else {
        ctxmap.globalAlpha = 1.0;
    }
    ctxmap.fillRect(x, y, w, h);
    ctxmap.globalAlpha = 1.0;
}
















//Input
let mouseX = 0;
let mouseY = 0;
function GetMousePosMap(evt) {
    var rect = $("#canvas-map")[0].getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
    console.log(mouseY);
}
function I_MouseInBoundsMap() {
    return (mouseX > 0 & mouseX < canvasSize & mouseY > 0 & mouseY < canvasSize);
}
function On_SizeMapButton() {
    sizeMap = I_SizeMap();
    console.log(sizeMap);
}

function I_SizeMap() {
    return $("#size-map").val();
}

function I_SeeLines() {
    return $("#switch-seeLines").is(":checked");
    
}
