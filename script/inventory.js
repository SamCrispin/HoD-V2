var inventoryItems = [];

function pickupLoot(e) {
    var triggerDiv = e.target,
        item = loot.splice(triggerDiv.id.slice(triggerDiv.id.length - 1), 1, null)[0];
    pushItemToInventory(item);
    id("lootItemContainer").removeChild(triggerDiv);
}

function pushItemToInventory(item) {
    switch (item.type) {
        case "WEAPON":
            player.inventory.push(item.value);
            break;
        case "ITEM":
            //pickup item
            player.itemSlots.push(item.value);
            break;
        case "ARMOUR":
            player.inventory.push(item.value);
            break;
        case "gold":
            player.changeGold(item.value);
            break;
    }
}

function populateInventory(type) {
    var item, div, x = 0;
    inventoryItems = [];
    id("inventoryItemContainer").innerHTML = "";
    for (var i = 0; i < player.inventory.length; i++) {
        item = player.inventory[i];
        if (type == "all" || item.type == type || (item.value.piece && item.value.piece == type)) {
            inventoryItems.push(item);
            div = document.createElement("div");
            div.className = "item hasHoverBorder";
            div.id = "inventoryItem" + x;
            div.style.backgroundImage = "url(img/" + ((item.type == "weapon") ? "staff" : item.value.piece) + ".png)";
            id("inventoryItemContainer").appendChild(div);
            x++;
        }
    }
}

function equipItem(e) {
    var id = e.target.id,
        item = inventoryItems[id.slice(id.length-1)],
        inventoryItem,
        keys = Object.keys(armourPieces), i;
    if (item.type == "WEAPON") {
        inventoryItem = player.equipped[5];
        player.equipped[5] = item;
    } else if (item.type = "ARMOUR") {
        inventoryItem = player.equipped[keys.indexOf(item.value.piece)];
        player.equipped[keys.indexOf(item.value.piece)] = item;
    }
    var count = 0;
    for (i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].type == item.type) {
            if (count == id.slice(id.length-1)) {
                player.inventory.splice(i, 1);
                break;
            }
            count++;
        }
    }
    player.inventory.push(inventoryItem);
    populateInventory(item.type);
}

function openInventory(e) {
    var id = e.target.id,
        inventory = id.slice(6).toUpperCase();
    nav.open("inventory");
    populateInventory(inventory);
}

function playerHoverHandler(e) {
    var id = e.target.id,
        key = id.slice(6);
    if (key == "Weapon") playerWeaponHover();
    else if (Object.keys(armourPieces).includes(key.toUpperCase())) playerArmourHover(key.toUpperCase());
}

function playerArmourHover(key) {
    var armour = player.equipped[Object.keys(armourPieces).indexOf(key)];
    id("playerItemHover").innerHTML = armour.type + "<br>"
            + armour.value.defense;
}

function playerWeaponHover() {
    var weapon = player.equipped[5],
        output = "Moves:<br>";
    if (!weapon) return;
    for (var i = 0; i < 4; i++) {
        output += weapon.moves[i].name + "<br>";
    }
    output += "Attack: " + weapon.attack;
    id("playerItemHover").innerHTML = output;
}

function playerClearHover() {
    id("playerItemHover").innerHTML = "Hover over an option to get more information";
}