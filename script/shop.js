var shopEquipment = [], shopItems = [];

function populateShop(type) {
    var div, equipment, item, cost;
    for (var i = 0; i < 5; i++) {
        equipment = (type == "Weapon") ? genWeapon() : genArmour();
        equipment.value.cost = ((Math.random()*10 +45)<<0);
        shopEquipment.push(equipment);
        div = document.createElement("div");
        div.className = "item hasHoverBorder";
        div.id = "shop" + type + i;
        div.style.backgroundImage = "url(img/" + equipment.value.type + ".png)";
        id("shopEquipmentContainer").appendChild(div);
    }

    for (i = 0; i < 5; i++) {
        div = document.createElement("div");
        div.className = "shopPrice";
        div.id = "shopPrice" + i;
        div.innerHTML = shopEquipment[i].value.cost + " gold";
        id("shopEquipmentContainer").appendChild(div);
    }

    for (i = 0; i < 6; i++) {
        item = genItem();
        shopItems.push(item);
        div = document.createElement("div");
        div.className = "shopItem hasHoverBorder";
        div.id = "shopItem" + i;
        id("shopItemContainer").appendChild(div);
    }
}

function buyWeapon(e) {
    var triggerDiv = e.target,
        weaponNo = triggerDiv.id.slice(triggerDiv.id.length - 1),
        weapon = shopEquipment[weaponNo];
    if (weapon && player.gold >= weapon.value.cost) {
        player.gold -= weapon.value.cost;
        id("shopWeapon" + weaponNo).style.backgroundImage = "url(img/sold)";
        id("shopWeapon" + weaponNo).classList.remove("hasHoverBorder");
        id("shopPrice" + weaponNo).innerHTML = "Sold";
        pushItemToInventory(weapon);
        shopEquipment.splice(weaponNo, 1, null);
    } else if (weapon) {
        id("shopWeapon" + weaponNo).style.borderColor = "red";
        setTimeout(function() {id("shopWeapon" + weaponNo).style.borderColor = "white";}, 100);
    }
}

function buyItem(e) {
    var triggerDiv = e.target,
        itemNo = triggerDiv.id.slice(triggerDiv.id.length - 1),
        item = shopItems[itemNo];
    if (item && player.gold >= 25) {
        player.gold -= 25;
        id("shopItem" + itemNo).style.backgroundImage = "url(img/sold)";
        id("shopItem" + itemNo).classList.remove("hasHoverBorder");
        pushItemToInventory(item);
        shopItems.splice(itemNo, 1, null);
    } else if (item) {
        id("shopItem" + itemNo).style.borderColor = "red";
        setTimeout(function() {id("shopItem" + itemNo).style.borderColor = "white";}, 100);
    }
}

function equipmentHoverHandler(e) {
    var id = e.target.id;
    if (id.slice(4, id.length-1) == "Armour") armourHover(e);
    else if (id.slice(4, id.length-1) == "Weapon") weaponHover(e);
}

function armourHover(e) {
    var triggerDiv = e.target,
            armour = shopEquipment[triggerDiv.id.slice(triggerDiv.id.length - 1)];
    id("shopItemDescription").innerHTML = armour.value.type + "<br>"
                                        + armour.value.defense;
}

function weaponHover(e) {
    var triggerDiv = e.target,
        weapon = shopEquipment[triggerDiv.id.slice(triggerDiv.id.length - 1)],
        output = "Moves:<br>";
    if (!weapon) return;
    for (var i = 0; i < 4; i++) {
        output += weapon.value.moves[i].name + "<br>";
    }
    output += "Attack: " + weapon.value.attack;
    id("shopItemDescription").innerHTML = output;
}

function itemHover(e) {
    var triggerDiv = e.target,
        item = shopItems[triggerDiv.id.slice(triggerDiv.id.length - 1)],
        output = "";
    if (!item) return;
    output += item.value.name + ":<br>"
            + item.value.description;
    id("shopItemDescription").innerHTML = output;
}

function clearShopHover() {
    id("shopItemDescription").innerHTML = "Hover over an item to get more information";
}