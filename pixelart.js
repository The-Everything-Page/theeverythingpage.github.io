let ctxmap;
const canvasSize = 450;
let sizeMap = 32;


$(document).ready(function () {
    $("#canvas-map")[0].width = canvasSize;
    $("#canvas-map")[0].height = canvasSize;
    ctxmap = $("#canvas-map")[0].getContext("2d");
    CreatePixelDataMap();
    setInterval(function () {
        Update();
    }, 5);
})

function Update() {
    ctxmap.clearRect(0, 0, canvasSize, canvasSize);
    var pixelSize = canvasSize / sizeMap;

    if (mouseDown) {
        DrawOnMap();
    }


    DrawPixelDataMap();

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

var pixelDataMap = [];
function CreatePixelDataMap() {
    for (var x = 0; x < sizeMap; x++) {
        pixelDataMap.push([]);
        for (var y = 0; y < sizeMap; y++) {
            pixelDataMap[x].push([""]);
        }
    }
    console.log(pixelDataMap);
}
function DrawPixelDataMap() {
    var pixelSize = canvasSize / sizeMap;

    var rowNum = 0;
    pixelDataMap.forEach(function (row) {
        var pixNum = 0;
        row.forEach(function (pix) {

            if (pix != "") {
                DrawRectMap(rowNum * pixelSize, pixNum * pixelSize, pixelSize + 1, pixelSize + 1, 1, pix);
            } else {
                DrawRectMap(rowNum * pixelSize, pixNum * pixelSize, pixelSize / 2 + 1, pixelSize / 2 + 1, 1, "white");
                DrawRectMap(rowNum * pixelSize + pixelSize / 2, pixNum * pixelSize, pixelSize / 2 + 1, pixelSize / 2 + 1, 1, "lightgray");
                DrawRectMap(rowNum * pixelSize, pixNum * pixelSize + pixelSize / 2, pixelSize / 2 + 1, pixelSize / 2 + 1, 1, "lightgray");
                DrawRectMap(rowNum * pixelSize + pixelSize / 2, pixNum * pixelSize + pixelSize / 2, pixelSize / 2 + 1, pixelSize / 2 + 1, 1, "white");


            }
            pixNum++;
        })
        rowNum++;
    })
}
function DrawOnMap() {
    var pixelSize = canvasSize / sizeMap;

    pixelDataMap[Math.floor(mouseX / pixelSize)][Math.floor(mouseY / pixelSize)] = color;
}

function DrawRectMap(x, y, w, h, a, c) {
    ctxmap.save();
    ctxmap.fillStyle = c;
    if (a != null) {
        ctxmap.globalAlpha = a;
    } else {
        ctxmap.globalAlpha = 1.0;
    }
    ctxmap.fillRect(x, y, w, h);
    ctxmap.globalAlpha = 1.0;
    ctxmap.restore();
}

















//Input
let mouseX = 0;
let mouseY = 0;
let mlbMode = "brush";
let mrbMode = "erase";
let color = "black";
var mouseDown = 0;
window.onload = () => {
    document.body.onmousedown = function () {
        ++mouseDown;
    }
    document.body.onmouseup = function () {
        --mouseDown;
    }
}
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

