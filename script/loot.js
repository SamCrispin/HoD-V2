var loot;

function Weapon(type, moves, attack, bgImage) {
    this.type = type;
    this.moves = moves;
    this.attack = attack;
    this.bgImage = bgImage;
}

function Item(name, description, effect, bgImage) {
    this.name = name;
    this.description = description;
    this.effect = effect;
    this.bgImage = bgImage;
}

function Armour(type, piece, defense, bgImage) {
    this.type = type;
    this.piece = piece;
    this.defense = defense;
    this.bgImage = bgImage;
}

function genWeapon() {
    var type = getRandomType(),
        thisMoves = [],
        attack = (Math.random() * 5 + 5) << 0,
        moveTypes = [type];

    for (var i = 0; i < 2; i++) {
        moveTypes.push(getRandomType(moveTypes));
    }
    for (var x in moveTypes) {
        thisMoves.push(moves[moveTypes[x]][0])
    }
    thisMoves.push(moves["BARRIER"][0]);
    return {
        type: "WEAPON",
        value: new Weapon(type, thisMoves, attack, "staff")
    }
}

function genItem() {
    var keys = Object.keys(items), item;
    item = items[keys[(Math.random() * keys.length) << 0]];
    return {
        type: "ITEM",
        value: new Item(item.name, item.description, item.effect, item.bgImage)
    };
}

function genArmour() {
    var type = getRandomType(),
        piece = getRandomArmourPiece(),
        defense = (Math.random() * 3 + 5) << 0;
    return {
        type: "ARMOUR",
        value: new Armour(type, piece, defense, piece)
    }
}

function getRandomType(blackList) {
    var keys = Object.keys(types),
        type;
    do {
        type = types[keys[(Math.random() * keys.length) << 0]];
        for (var x in blackList) {
            if (type == blackList[x]) {
                type = null;
                break;
            }
        }
    } while (!type);
    return type;
}

function getRandomArmourPiece() {
    var keys = Object.keys(armourPieces);
    return armourPieces[keys[(Math.random() * keys.length) << 0]];
}

function genLoot() {
    loot = [];
    id("lootItemContainer").innerHTML = "";

    loot.push(genWeapon());
    if (Math.random() < 0.5) loot.push(genItem());
    if (Math.random() < 0.5) loot.push(genArmour());
    loot.push({
        type: "gold",
        value: (Math.random() * 20 + 10) << 0
    });

    var bgImage, output, div;
    for (var item in loot) {
        output = "";
        switch (loot[item].type) {
            case "WEAPON":
                bgImage = "url(img/staff.png)";
                output += loot[item].value.type + "<br>"
                        + loot[item].value.moves[1].name + "<br>"
                        + loot[item].value.moves[2].name + "<br>"
                        + loot[item].value.attack;
                break;
            case "ITEM":
                bgImage = "url(img/" + loot[item].value.bgImage + ".png)";
                output += loot[item].value.name + "<br>"
                        + loot[item].value.description;
                break;
            case "ARMOUR":
                bgImage = "url(img/" + loot[item].value.piece + ".png)";
                output += loot[item].value.piece + "<br>"
                        + loot[item].value.type + "<br>"
                        + loot[item].value.defense;
                break;
            case "gold":
                bgImage = "url(img/gold.png)";
                output += loot[item].value
                        + " Gold";
                break;
        }
        div = document.createElement("div");
        div.className = "lootItem hasHoverBorder";
        div.id = "lootItem" + item;
        div.style.backgroundImage = bgImage;
        div.innerHTML = output;
        id("lootItemContainer").appendChild(div);
    }
    nav.open("loot");
}

function lootForward() {
    nav.open("map")
}