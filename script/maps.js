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

