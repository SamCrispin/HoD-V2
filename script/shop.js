var shopWeapons = [], shopArmour = [], weaponShopItems = [], armourShopItems = [], shopType = false;

function populateShops() {
    var weapon, armour, cost;
    shopWeapons = [];
    shopArmour = [];
    weaponShopItems = [];
    armourShopItems = [];
    for (var i = 0; i < 5; i++) {
        weapon = genWeapon();
        weapon.value.cost = ((Math.random()*10 +45)<<0);
        shopWeapons.push(weapon);

        armour = genArmour();
        armour.value.cost = ((Math.random()*10 +45)<<0);
        shopArmour.push(armour);
    }

    for (i = 0; i < 6; i++) {
        weaponShopItems.push(genItem());
        armourShopItems.push(genItem());
    }
}

function renderShop() {
    var div, equipment, items;

    id("shopEquipmentContainer").innerHTML = "";
    id("shopItemContainer").innerHTML = "";

    if (shopType == "Weapon") {
        equipment = shopWeapons;
        items = weaponShopItems;
    } else {
        equipment = shopArmour;
        items = armourShopItems;
    }

    for (var i = 0; i < 5; i++) {
        div = document.createElement("div");
        div.className = "item hasHoverBorder";
        div.id = "shop" + shopType + i;
        div.style.backgroundImage = "url(img/" + equipment[i].value.bgImage + ".png)";
        id("shopEquipmentContainer").appendChild(div);
    }

    for (i = 0; i < 5; i++) {
        div = document.createElement("div");
        div.className = "shopPrice";
        div.id = "shopPrice" + i;
        div.innerHTML = equipment[i].value.cost + " gold";
        id("shopEquipmentContainer").appendChild(div);
    }

    for (i = 0; i < 6; i++) {
        div = document.createElement("div");
        div.className = "shopItem hasHoverBorder";
        div.id = "shopItem" + i;
        div.style.backgroundImage = "url(img/" + items[i].value.bgImage + ".png)";
        id("shopItemContainer").appendChild(div);
    }
}

function buyWeapon(e) {
    var triggerDiv = e.target,
        weaponNo = triggerDiv.id.slice(triggerDiv.id.length - 1),
        weapon = shopWeapons[weaponNo];
    if (weapon && player.gold >= weapon.value.cost) {
        player.changeGold(weapon.value.cost);
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
        items = (shopType == "Weapons") ? weaponShopItems : armourShopItems,
        item = items[itemNo];
    if (item && player.gold >= 25) {
        player.changeGold(25);
        id("shopItem" + itemNo).style.backgroundImage = "url(img/sold)";
        id("shopItem" + itemNo).classList.remove("hasHoverBorder");
        pushItemToInventory(item);
        items.splice(itemNo, 1, null);
    } else if (item) {
        id("shopItem" + itemNo).style.borderColor = "red";
        setTimeout(function() {id("shopItem" + itemNo).style.borderColor = "white";}, 100);
    }
}

function shopEquipmentMouseOverHandler(e) {
    var id = e.target.id;
    if (id.slice(4, id.length-1) == "Armour") armourHover(e);
    else if (id.slice(4, id.length-1) == "Weapon") weaponHover(e);
}

function armourHover(e) {
    var triggerDiv = e.target,
        armour = shopArmour[triggerDiv.id.slice(triggerDiv.id.length - 1)];
    id("shopItemDescription").innerHTML = armour.value.type + "<br>"
                                        + armour.value.defense;
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

function shopItemMouseOverHandler(e) {
    var triggerDiv = e.target,
        items = (shopType == "Weapons") ? weaponShopItems : armourShopItems,
        item = items[triggerDiv.id.slice(triggerDiv.id.length - 1)],
        output = "";
    if (!item) return;
    output += item.value.name + ":<br>"
            + item.value.description;
    id("shopItemDescription").innerHTML = output;
}

function shopMouseOutHandler() {
    id("shopItemDescription").innerHTML = "Hover over an item to get more information";
}

function openWeaponsShop() {
    nav.open("shop");
    shopType = "Weapon";
    renderShop();
    id("shopBack").style.display = "block";
}

function openArmourShop() {
    nav.open("shop");
    shopType = "Armour";
    renderShop();
    id("shopBack").style.display = "block";
}

function shopBack() {
    nav.back();
    id("shopBack").style.display = "none";
}

function shopForward() {
    nav.open("map");
}