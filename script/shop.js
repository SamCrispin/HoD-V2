var shopWeapons = [], shopItems = [];

function populateShop() {
    var div, weapon, item, cost;
    for (var i = 0; i < 5; i++) {
        weapon = genWeapon();
        weapon.value.cost = ((Math.random()*10 +45)<<0);
        shopWeapons.push(weapon);
        div = document.createElement("div");
        div.className = "shopWeapon hasHoverBorder";
        div.id = "shopWeapon" + i;
        div.style.backgroundImage = "url(img/" + weapon.value.type + ".png)";
        id("shopWeaponContainer").appendChild(div);
    }

    for (i = 0; i < 5; i++) {
        div = document.createElement("div");
        div.className = "shopPrice";
        div.id = "shopPrice" + i;
        div.innerHTML = shopWeapons[i].value.cost + " gold";
        id("shopWeaponContainer").appendChild(div);
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
        weapon = shopWeapons[weaponNo];
    if (weapon && player.gold >= weapon.value.cost) {
        player.gold -= weapon.value.cost;
        id("shopWeapon" + weaponNo).style.backgroundImage = "url(img/sold)";
        id("shopWeapon" + weaponNo).classList.remove("hasHoverBorder");
        id("shopPrice" + weaponNo).innerHTML = "Sold";
        pushItemToInventory(weapon);
        shopWeapons.splice(weaponNo, 1, null);
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
        pushItemToInventory(item);
    } else if (item) {
        id("shopItem" + itemNo).style.borderColor = "red";
        setTimeout(function() {id("shopItem" + itemNo).style.borderColor = "white";}, 100);
    }
}

function weaponHover(e) {
    var triggerDiv = e.target,
        weapon = shopWeapons[triggerDiv.id.slice(triggerDiv.id.length - 1)],
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

function clearShopHover(e) {
    id("shopItemDescription").innerHTML = "Hover over an item to get more information";
}