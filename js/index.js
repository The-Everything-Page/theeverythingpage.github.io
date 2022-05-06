// this one spawns all the blocks of cool stuff content idk pls help me Im trapped ahhhhh

//getting the text files into seperate blocks into content array
let text;
let content = []
let allData = [];
let currentData = [];

function ReadText() {
    console.log(text);
    content = text.split(";");
}



function UpdateCurrentData() {
    

    var sortBy = $('input[name="sort"]:checked').val();
    switch (sortBy) {
        case "fav":
            currentData = allData.slice();
            break;
        case "name":
            UpdateCurrentDataByName();
            break;
        case "old":
            UpdateCurrentDataByOldest();
            break;
        case "new":
            UpdateCurrentDataByNewest();
            break;
        case "type":
            UpdateCurrentDataByType();
            break;
        default:
            currentData = allData.slice();
            break;

    }
    var tag = $('input[name="tag"]:checked').val();
    if (tag != "All") {
        var tempData = [];
        currentData.forEach(function (d) {
            if (d[3] != null) {
                if (d[3].includes(tag)) {
                    tempData.push(d);
                }
            }
        })
        currentData = tempData.slice();
    }

    $("#indexGrid").fadeTo(0, 0);
    $("#indexGrid").fadeTo("fast", 1);
}
function UpdateCurrentDataByName() {
    currentData = allData.slice();
    currentData.sort();

}
function UpdateCurrentDataByOldest() {
    currentData = allData.slice();
    currentData.sort(function (a, b) {
        return a[5] === b[5] ? 0 : a[5] < b[5] ? -1 : 1;
    });
}
function UpdateCurrentDataByNewest() {
    currentData = allData.slice().reverse();
    currentData.sort(function (a, b) {
        return a[5] === b[5] ? 0 : a[5] > b[5] ? -1 : 1;
    });
}
function UpdateCurrentDataByType() {
    currentData = allData.slice().reverse();
    currentData.sort(function (a, b) {
        return a[3] === b[3] ? 0 : a[3] < b[3] ? -1 : 1;
    });

}
//the actual process
$(document).ready(function () {
    var req = new XMLHttpRequest();
    req.onload = function () {
        text = (this.responseText);
    };
    req.open('GET', 'content.txt',false);
    req.send();
    ReadText();
    GenerateContent();

    $('#sortBy').change(function () {
        UpdateCurrentData();
        UpdateElements();
    });
    $('#tags').change(function () {
        UpdateCurrentData();
        UpdateElements();
    });
    $("#indexGrid").fadeTo(0, 0);
    $("#indexGrid").fadeTo("fast", 1);
});
function GenerateContent() {
    content.forEach(function (block) {
        var data = block.split("|");
        if (data[0][0] != "!") {
            for (var i = 0; i < data.length; i++) {
                data[i].trim();
                data[i] = data[i].replace(/(\r\n|\n|\r)/gm, "");
                data.splice(i, 1, data[i]);

            }
        }
        if (block[0] != "\r\n" & block[0][0] != "!") {
            CreateOffData(data);
            
        }
        allData.push(data);
        
    });
    currentData = allData;
    console.log(allData);
}
let numberOfCreations = 0;
function CreateOffData(data) {
    if (data[0][0] == "!") { return;}
    // complex html bs
    var obj = "" +
        "<div class=\"block\" style=\"right:XPOSpx; top:YPOSpx;     border: 3px solid TCOL;\" onclick=\"window.location = 'LINK';\">" +
        "                <div width=\"5%\">" +
        "                    <h2>NAME</h2>" +
        "                    <br />" +
        "                    <p style=\" max-width: 300px; overflow-wrap: break-word\">DESC</p>" +
        "                    <br />" +
        "                    <ul style=\"position:absolute; font-size: 12px\">" +
        "                        <li style=\"color:TCOL\">" +
        "                           TYPE" +
        "                        </li>" +
        "                        <li>" +
        "                            SUBT" +
        "                        </li>" +
        "                    </ul>" +
        "                    <br />" +
        "                    " +
        "                    <div style=\"text-align:right; padding-right:50px; color: gray\">" +
        "                        DATE" +
        "                    </div>" +
        "                    " +
        "                </div>" +
        "                " +
        "" +
        "                <div>" +
        "                    IMAGE" +
        "                </div>" +
        "            </div>" +
        "";

    //!NAME - DESCRIPTION - LINK - TYPE - SUBTYPE - DATE - ORDER;
    obj = obj.replace("NAME", data[0]);
    obj = obj.replace("DESC", data[1]);
    obj = obj.replace("LINK", data[2]);
    obj = obj.replace("TYPE", data[3]);
    obj = obj.replace("SUBT", data[4]);
    obj = obj.replace("DATE", data[5]);
    obj = obj.replace("ORDR", data[6]);
    obj = obj.replace("XPOS", -(numberOfCreations % 2)* 600+300);
    obj = obj.replace("YPOS", Math.floor(numberOfCreations / 2)* 320 + 250);
    obj = obj.replace("TCOL", TypeColor(data[3]) );
    obj = obj.replace("TCOL", TypeColor(data[3]) );
    $("#indexGrid").append(obj);

    numberOfCreations++;
}
function TypeColor(type) {
    if (type.includes("Game")) { return "green"; }
    if (type.includes("Algorithm")){ return "blue"; }
    if (type.includes("Visualization")) { return "purple"; }
    if (type.includes("Tool")) { return "#AB7A00"; }
    return "black";
}
function UpdateElements() {
    $("#indexGrid").empty();
    numberOfCreations = 0;
    currentData.forEach(function (d) {
        CreateOffData(d);
    });
}
