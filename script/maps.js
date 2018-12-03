var map, options = [];

function generateMap() {
    var option = getOptionNo(), nextOption;
    options[0] = option;
    map = mapSections.mapSection1[option];
    for (var i = 1; i < 6; i++) {
        nextOption = getOptionNo();
        options[i] = nextOption;
        for (var j = 0; j < 4; j++) {
            if (map[map.length-1][j].content == null) continue;
            map[map.length-1][j].connections = mapSections["mapSection" + i][nextOption][0][j].connections;
        }
        if (i > 1) {
            for (var k = 1; k < 4; k++) {
                map.push(mapSections["mapSection" + i][nextOption][k]);
            }
        }
    }
    map.push([{content: "bossFight"}]);
    renderMap();
}

function getOptionNo() {
    return (Math.random() * 4) << 0;
}

function renderMap() {
    var div, img, top, left;
    for (var i = 0; i < map.length-1; i++) {
        for (var j = 0; j < 4; j++) {
            if (!map[i][j].content) continue;
            div = document.createElement("div");
            div.className = "mapCell";
            div.id = "mapCell" + i + "." + j;
            left = 165 + (j * 80);
            div.style.left = left + "px";
            top = 50 + (i * 80);
            div.style.top = top + "px";
            div.style.backgroundImage = "url(img/map" + map[i][j].content.capitalize() + ".png)";
            map[i][j].layer = i;
            map[i][j].column = j;
            if (map[i][j].content == "interaction") map[i][j].interaction = "openingScreen" + ((Math.random() * 2 + 1) << 0);
            id("mapContainer").appendChild(div);
            for (var k = 0; k < 3; k++) {
                img = document.createElement("div");
                img.className = "mapImg";
                img.id = "mapImg" + i + "." + j + "." + (k-1);
                img.style.left = left - 40 + (40*k) + "px";
                img.style.top = top + 40 + "px";
                id("mapContainer").appendChild(img);
            }
            for (k = 0; k < 3; k++) {
                if (map[i][j].connections && (map[i][j].connections[k] || map[i][j].connections[k] === 0)) {
                    id("mapImg" + i + "." + j + "." + map[i][j].connections[k]).style.backgroundImage =
                            "url(img/mapImgPath" + map[i][j].connections[k] + ".png)";
                    id("mapImg" + i + "." + j + "." + map[i][j].connections[k]).style.zIndex = "5";
                }
            }
        }
    }
}

function cellMoveIsValid(layer, column) {
    if (!player.cell && layer == 0) return true;
    else if (player.cell){
        for (var i = 0; i < player.cell.connections.length; i++) {
            if ((player.cell.column + player.cell.connections[i]) == column &&
                 layer == (player.cell.layer + 1)) return true
        }
    }
    return false;
}

function mapClick(e) {
    var divId = e.target.id,
        layer = divId.slice(divId.length-3, divId.indexOf(".")),
        column = divId.slice(divId.indexOf(".") + 1);
    if (divId.includes("Img")) return;
    if (cellMoveIsValid(layer, column)) {
        player.cell = map[layer][column];
        console.log(player.cell.layer + ", " + player.cell.column);
        nav.open(player.cell.content);
        switch (player.cell.content) {
            case "interaction":
                openInteraction(player.cell.interaction);
                break;
            case "shop":
                break;
            case "inn":
                nav.open("interaction");
                openInteraction("inn");
                break;
        }
    }
}

function mapMouseOverHandler(e) {
    var divId = e.target.id,
        layer = divId.slice(7, divId.indexOf(".")),
        column = divId.slice(divId.indexOf(".") + 1);
    if (divId.includes("Img")) return;
    if(cellMoveIsValid(layer, column)) {
        id("mapCell" + layer + "." + column).style.backgroundImage = "url(img/map" + map[layer][column].content.capitalize() + "Hover.png)";
    }
}

function mapMouseOutHandler(e) {
    var divId = e.target.id,
        layer = divId.slice(7, divId.indexOf(".")),
        column = divId.slice(divId.indexOf(".") + 1);
    if (divId.includes("Img")) return;
    id("mapCell" + layer + "." + column).style.backgroundImage = "url(img/map" + map[layer][column].content.capitalize() + ".png)";
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};