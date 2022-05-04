// this one spawns all the blocks of cool stuff content idk pls help me Im trapped ahhhhh

//getting the text files into seperate blocks into content array
let text =
    "!NAME - DESCRIPTION - LINK - TYPE - SUBTYPE - DATE - ORDER;" +
    "Guns X Magic | fun game about fighting escaped monsters and controlled robots by an evil entity || Game | Action | May 8, 2022 | 5;" +
    "A* Algorithm | Show the process of the A* algorithm, along with demonstrating cool properties and situations of it || Step by Step | Algorithm | May 4, 2022 | 1;" +
    "Pixel Art | Create Pixel Art with Revolutionary new type of mapping || Tool | Art | May 5, 2022 | 2;" +
    "Boids | Learn a simple AI technique and look at simple visualizations in the process || Step by Step | Visualization | May 9, 2022 | 6;" +
    "Spacebar Spam | Test how quickly you can press your spacebar || Game | Test | May 6, 2022 | 3;" +
    "idk | this is test bruh bruh || Step by Step | Algorithm | May 7, 2022 | 4";
let content = []
let allData = [];
let currentData = [];
function ReadText() {
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

    }
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
    ReadText();
    GenerateContent();
    $('#sortBy').change(function () {
        UpdateCurrentData();
        UpdateElements();
    });
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
        "<div class=\"block\" style=\"right:XPOSpx; top:YPOSpx\">" +
        "                <div width=\"5%\">" +
        "                    <h2>NAME</h2>" +
        "                    <br />" +
        "                    <p style=\" max-width: 300px; overflow-wrap: break-word\">DESC</p>" +
        "                    <br />" +
        "                    <ul style=\"position:absolute; font-size: 12px\">" +
        "                        <li>" +
        "                            TYPE" +
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

    $("#indexGrid").append(obj);

    numberOfCreations++;
}

function UpdateElements() {
    $("#indexGrid").empty();
    numberOfCreations = 0;
    currentData.forEach(function (d) {
        CreateOffData(d);
    });
}
